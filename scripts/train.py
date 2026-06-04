#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from skillopt.engine.trainer import SkillOptTrainer, load_simple_yaml


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="train.py",
        description="Project-local SkillOpt smoke trainer."
    )
    parser.add_argument("--config", required=True)
    parser.add_argument("--split_dir", required=True)
    parser.add_argument("--azure_openai_endpoint", default="")
    parser.add_argument("--azure_openai_api_key", default="")
    parser.add_argument("--azure_openai_auth_mode", default="")
    parser.add_argument("--openai_base_url", default="")
    parser.add_argument("--openai_api_key", default="")
    parser.add_argument("--anthropic_base_url", default="")
    parser.add_argument("--anthropic_api_key", default="")
    parser.add_argument("--qwen_chat_base_url", default="")
    parser.add_argument("--qwen_chat_model", default="")
    parser.add_argument("--optimizer_model", default="openai_chat")
    parser.add_argument("--target_model", default="openai_chat")
    parser.add_argument("--num_epochs", type=int, default=1)
    parser.add_argument("--batch_size", type=int, default=1)
    parser.add_argument("--workers", type=int, default=1)
    parser.add_argument("--analyst_workers", type=int, default=1)
    parser.add_argument("--minibatch_size", type=int, default=1)
    parser.add_argument("--merge_batch_size", type=int, default=1)
    parser.add_argument("--sel_env_num", type=int, default=1)
    parser.add_argument("--test_env_num", type=int, default=1)
    parser.add_argument("--train_size", type=int, default=2)
    parser.add_argument("--out_root", required=True)
    parser.add_argument("--use_gate", action="store_true")
    parser.add_argument("--use_slow_update", action="store_true")
    parser.add_argument("--use_meta_skill", action="store_true")
    return parser


def main(argv: list[str]) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    config_path = Path(args.config)
    if config_path.exists():
        try:
            config = load_simple_yaml(config_path)
        except ValueError as error:
            parser.error(str(error))
    else:
        config = {}
    trainer = SkillOptTrainer(
        args=args,
        config=config,
        config_path=config_path,
        split_dir=Path(args.split_dir),
        out_root=Path(args.out_root),
    )
    result = trainer.run()
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
