from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from skillopt.envs.searchqa.dataloader import SearchQADataLoader
from skillopt.envs.xiaohongshu_skill.dataloader import XiaohongshuSkillDataLoader
from skillopt.evaluation.gate import score_selection_gate
from skillopt.gradient.reflect import reflect_rollouts
from skillopt.model.codex_harness import (
    credential_status,
    run_agent_batch_with_progress,
    select_backend,
    summarize_agent_results,
)
from skillopt.optimizer.meta_skill import build_meta_skill
from skillopt.optimizer.slow_update import build_slow_update


def load_simple_yaml(path: Path) -> dict[str, Any]:
    data: dict[str, Any] = {}
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = _parse_scalar(value.strip())
    return data


def _parse_scalar(value: str) -> Any:
    if value.lower() in {"true", "false"}:
        return value.lower() == "true"
    try:
        return int(value)
    except ValueError:
        return value.strip('"').strip("'")


class SkillOptTrainer:
    def __init__(
        self,
        *,
        args: Any,
        config: dict[str, Any],
        config_path: Path,
        split_dir: Path,
        out_root: Path,
    ) -> None:
        self.args = args
        self.config = config
        self.config_path = config_path
        self.split_dir = split_dir
        self.out_root = out_root
        self.progress_path = self.out_root / "progress.json"
        self.split_totals = {"train": 0, "val": 0, "test": 0}
        self.evaluation_mode = "smoke"
        self.env_name = str(self.config.get("env", "searchqa"))

    def run(self) -> dict[str, Any]:
        loader = self._build_loader()
        loader.setup({"out_root": str(self.out_root), "env": self.env_name})
        self.split_totals = {
            "train": len(loader.train_items),
            "val": len(loader.val_items),
            "test": len(loader.test_items),
        }
        evaluation_mode = str(self.config.get("evaluation_mode", "smoke"))
        self.evaluation_mode = evaluation_mode
        selection_gate_required = bool(self.config.get("selection_gate_required", evaluation_mode != "smoke"))

        self.out_root.mkdir(parents=True, exist_ok=True)
        (self.out_root / "selection_eval_baseline").mkdir(exist_ok=True)
        (self.out_root / "test_eval").mkdir(exist_ok=True)

        backend = select_backend(self.args)
        cred = credential_status()
        if backend == "local_stub":
            raise RuntimeError("No configured real model backend is available for an actual agent run")

        config_json = {
            "env": self.env_name,
            "benchmark": self.config.get("benchmark", "SearchQA"),
            "metric": self.config.get("metric", "exact_match"),
            "evaluation_mode": evaluation_mode,
            "selection_gate_required": selection_gate_required,
            "train_size": self.args.train_size,
            "num_epochs": self.args.num_epochs,
            "batch_size": self.args.batch_size,
            "workers": self.args.workers,
            "analyst_workers": self.args.analyst_workers,
            "minibatch_size": self.args.minibatch_size,
            "merge_batch_size": self.args.merge_batch_size,
            "sel_env_num": self.args.sel_env_num,
            "test_env_num": self.args.test_env_num,
            "split_dir": str(self.split_dir),
            "config_path": str(self.config_path),
            "selected_backend": backend,
            "credential_status": cred,
            "actual_agent_run": True,
        }
        self._write_json(self.out_root / "config.json", config_json)
        self._write_progress(
            status="running",
            current_step="train",
            backend=backend,
            credential_status=cred,
            split_status={
                "train": {"status": "running", "completed": 0, "total": self.split_totals["train"]},
                "val": {"status": "pending", "completed": 0, "total": self.split_totals["val"]},
                "test": {"status": "pending", "completed": 0, "total": self.split_totals["test"]},
            },
        )

        train_results = run_agent_batch_with_progress(
            self._items_for_variant(loader.train_items, "candidate"),
            self.args,
            backend,
            variant=self._variant("candidate"),
            on_item_complete=self._split_progress_callback("train", self.out_root / "train_eval.json"),
        )
        train_summary = summarize_agent_results(train_results)
        self._write_json(
            self.out_root / "train_eval.json",
            {"status": "passed", "summary": train_summary, "results": train_results},
        )
        self._write_progress(
            status="running",
            current_step="val",
            split_status={
                "train": {"status": "completed", "completed": len(train_results), "total": self.split_totals["train"]},
                "val": {"status": "running", "completed": 0, "total": self.split_totals["val"]},
                "test": {"status": "pending", "completed": 0, "total": self.split_totals["test"]},
            },
        )

        if evaluation_mode == "selection":
            val_baseline_results = run_agent_batch_with_progress(
                self._items_for_variant(loader.val_items, "baseline"),
                self.args,
                backend,
                variant=self._variant("baseline"),
                on_item_complete=self._split_progress_callback(
                    "val_baseline",
                    self.out_root / "selection_eval_baseline" / "summary.json",
                ),
            )
            val_baseline_summary = summarize_agent_results(val_baseline_results)
            self._write_json(
                self.out_root / "selection_eval_baseline" / "summary.json",
                {"status": "passed", "summary": val_baseline_summary, "results": val_baseline_results},
            )
            self._write_progress(
                status="running",
                current_step="val_candidate",
                split_status={
                    "train": {"status": "completed", "completed": len(train_results), "total": self.split_totals["train"]},
                    "val_baseline": {"status": "completed", "completed": len(val_baseline_results), "total": self.split_totals["val"]},
                    "val_candidate": {"status": "running", "completed": 0, "total": self.split_totals["val"]},
                    "test": {"status": "pending", "completed": 0, "total": self.split_totals["test"]},
                },
            )
            val_results = run_agent_batch_with_progress(
                self._items_for_variant(loader.val_items, "candidate"),
                self.args,
                backend,
                variant=self._variant("candidate"),
                on_item_complete=self._split_progress_callback(
                    "val_candidate",
                    self.out_root / "selection_eval_candidate" / "summary.json",
                ),
            )
            val_summary = summarize_agent_results(val_results)
            self._write_json(
                self.out_root / "selection_eval_candidate" / "summary.json",
                {"status": "passed", "summary": val_summary, "results": val_results},
            )
        else:
            val_results = run_agent_batch_with_progress(
                self._items_for_variant(loader.val_items, "candidate"),
                self.args,
                backend,
                variant=self._variant("candidate"),
                on_item_complete=self._split_progress_callback(
                    "val",
                    self.out_root / "selection_eval_baseline" / "summary.json",
                ),
            )
            val_summary = summarize_agent_results(val_results)
            self._write_json(
                self.out_root / "selection_eval_baseline" / "summary.json",
                {"status": "passed", "summary": val_summary, "results": val_results},
            )
            val_baseline_results = val_results
            val_baseline_summary = val_summary
        self._write_progress(
            status="running",
            current_step="test",
            split_status={
                "train": {"status": "completed", "completed": len(train_results), "total": self.split_totals["train"]},
                "val": {"status": "completed", "completed": len(val_results), "total": self.split_totals["val"]},
                "test": {"status": "running", "completed": 0, "total": self.split_totals["test"]},
            },
        )

        test_results = run_agent_batch_with_progress(
            self._items_for_variant(loader.test_items, "candidate"),
            self.args,
            backend,
            variant=self._variant("candidate"),
            on_item_complete=self._split_progress_callback(
                "test",
                self.out_root / "test_eval" / "summary.json",
            ),
        )
        test_summary = summarize_agent_results(test_results)
        self._write_json(
            self.out_root / "test_eval" / "summary.json",
            {"status": "passed", "summary": test_summary, "results": test_results},
        )

        rollouts = reflect_rollouts(
            baseline_items=val_baseline_results if evaluation_mode == "selection" else train_results,
            candidate_items=val_results,
            config={
                "train_size": self.args.train_size,
                "num_epochs": self.args.num_epochs,
                "backend": backend,
            },
        )
        raw_selection = score_selection_gate(
            val_baseline_summary["score"] if evaluation_mode == "selection" else train_summary["score"],
            val_summary["score"],
        )
        if selection_gate_required:
            selection = {
                "applicable": True,
                "status": "passed" if raw_selection["passed"] else "failed",
                **raw_selection,
            }
        else:
            selection = {
                "applicable": False,
                "status": "not_applicable",
                **raw_selection,
                "reason": "Smoke evaluation validates runtime wiring only; it does not prove skill improvement.",
            }

        history = [
            {
                "epoch": 1,
                "status": "completed",
                "evaluation_mode": evaluation_mode,
                "train": train_summary,
                "val_baseline": val_baseline_summary,
                "val": val_summary,
                "test": test_summary,
                "selection_gate": selection,
            }
        ]

        runtime_state = {
            "status": "complete",
            "current_step": "export",
            "can_resume": False,
            "best_skill_path": "best_skill.md",
            "evaluation_mode": evaluation_mode,
            "backend": backend,
            "credential_status": cred,
            "actual_agent_run": True,
            "rollout_summary": {
                "baseline_passed": rollouts["baseline_passed"],
                "candidate_passed": rollouts["candidate_passed"],
                "baseline_total": rollouts["baseline_total"],
                "candidate_total": rollouts["candidate_total"],
            },
        }

        best_skill = build_meta_skill(
            env=config_json["env"],
            selection_gate=selection,
            rollouts=rollouts,
        )
        slow_update = build_slow_update(best_skill)

        self._write_json(self.out_root / "history.json", history)
        self._write_json(self.out_root / "runtime_state.json", runtime_state)
        (self.out_root / "best_skill.md").write_text(best_skill, encoding="utf-8")
        (self.out_root / "slow_update.md").write_text(slow_update, encoding="utf-8")
        self._write_progress(
            status="complete",
            current_step="export",
            selection_gate=selection,
            split_status={
                "train": {"status": "completed", "completed": len(train_results), "total": self.split_totals["train"]},
                "val": {"status": "completed", "completed": len(val_results), "total": self.split_totals["val"]},
                "test": {"status": "completed", "completed": len(test_results), "total": self.split_totals["test"]},
            },
        )

        return {
            "status": "passed",
            "out_root": str(self.out_root),
            "config": config_json,
            "history_entries": len(history),
            "best_skill_path": str(self.out_root / "best_skill.md"),
        }

    def _build_loader(self) -> SearchQADataLoader | XiaohongshuSkillDataLoader:
        if self.env_name == "searchqa":
            return SearchQADataLoader(self.split_dir)
        if self.env_name == "xiaohongshu_skill":
            return XiaohongshuSkillDataLoader(self.split_dir)
        raise ValueError(f"Unsupported SkillOpt env: {self.env_name}")

    def _items_for_variant(self, items: list[dict[str, Any]], label: str) -> list[dict[str, Any]]:
        if self.env_name != "xiaohongshu_skill":
            return items
        skill_text = self._skill_text_for_variant(label)
        enriched_items: list[dict[str, Any]] = []
        for item in items:
            enriched_item = dict(item)
            case_context = str(item.get("case_context", "") or "").strip()
            if case_context:
                enriched_item["context"] = f"Skill Text:\n{skill_text}\n\nCase Evidence:\n{case_context}"
            else:
                enriched_item["context"] = skill_text
            enriched_items.append(enriched_item)
        return enriched_items

    def _skill_text_for_variant(self, label: str) -> str:
        config_key = "baseline_skill_path" if label == "baseline" else "candidate_skill_path"
        relative_path = str(self.config.get(config_key, "") or "").strip()
        if not relative_path:
            raise ValueError(f"{config_key} is required for xiaohongshu_skill env")
        skill_path = Path(relative_path)
        if not skill_path.is_absolute():
            skill_path = Path.cwd() / skill_path
        if not skill_path.exists():
            raise FileNotFoundError(f"missing skill file for {label}: {skill_path}")
        return skill_path.read_text(encoding="utf-8")

    def _split_progress_callback(self, split_name: str, output_path: Path):
        def callback(result: dict[str, Any], completed: int, split_total: int) -> None:
            self._write_json(
                output_path,
                {
                    "status": "running",
                    "split": split_name,
                    "completed": completed,
                    "total": split_total,
                    "last_result": result,
                },
            )
            split_status = {
                "train": {"status": "pending", "completed": 0, "total": self.split_totals["train"]},
                "val": {"status": "pending", "completed": 0, "total": self.split_totals["val"]},
                "test": {"status": "pending", "completed": 0, "total": self.split_totals["test"]},
            }
            if split_name in split_status:
                split_status[split_name] = {"status": "running", "completed": completed, "total": split_total}
            else:
                split_status[split_name] = {"status": "running", "completed": completed, "total": split_total}
            self._write_progress(
                status="running",
                current_step=split_name,
                split_status=split_status,
                last_completed_item={
                    "split": split_name,
                    "completed": completed,
                    "total": split_total,
                    "id": result["id"],
                    "passed": result["passed"],
                },
            )

        return callback

    def _write_json(self, path: Path, payload: Any) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")

    def _write_progress(self, **updates: Any) -> None:
        current: dict[str, Any] = {}
        if self.progress_path.exists():
            current = json.loads(self.progress_path.read_text(encoding="utf-8"))
        current.update(updates)
        self._write_json(self.progress_path, current)

    def _variant(self, label: str) -> dict[str, str]:
        if label == "baseline":
            return {
                "label": "baseline",
                "system_prompt": str(self.config.get("baseline_system_prompt", "You are a helpful QA agent.")),
                "user_instruction": str(
                    self.config.get(
                        "baseline_user_instruction",
                        "Answer the question using only the provided context. Return one short explanatory sentence.",
                    )
                ),
            }
        return {
            "label": "candidate",
            "system_prompt": str(self.config.get("candidate_system_prompt", "You are a precise QA agent.")),
            "user_instruction": str(
                self.config.get(
                    "candidate_user_instruction",
                    "Answer the question using only the provided context. Return only the exact minimal answer span required by the task.",
                )
            ),
        }
