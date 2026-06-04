#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from skillopt.envs.searchqa.dataloader import SearchQADataLoader
from skillopt.evaluation.gate import score_selection_gate
from skillopt.model.codex_harness import run_agent_batch, select_backend, summarize_agent_results


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="eval_only.py",
        description="Project-local SkillOpt smoke evaluation helper."
    )
    parser.add_argument("--split_dir", required=True)
    parser.add_argument("--out_root", required=True)
    return parser


def main(argv: list[str]) -> int:
    args = build_parser().parse_args(argv)
    loader = SearchQADataLoader(args.split_dir)
    loader.setup({"out_root": args.out_root, "env": "searchqa"})
    backend = select_backend(args)
    results = run_agent_batch(loader.val_items, args, backend)
    summary = summarize_agent_results(results)
    payload = {
        "status": "passed",
        "train_count": len(loader.train_items),
        "val_count": len(loader.val_items),
        "test_count": len(loader.test_items),
        "selection_gate": score_selection_gate(0, summary["score"]),
        "backend": backend,
        "summary": summary,
        "results": results,
    }
    print(json.dumps(payload, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
