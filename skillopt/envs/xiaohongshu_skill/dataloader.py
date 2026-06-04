from __future__ import annotations

import json
from pathlib import Path
from typing import Any


class XiaohongshuSkillDataLoader:
    def __init__(self, split_dir: str | Path, split_mode: str = "split_dir") -> None:
        self.split_dir = Path(split_dir)
        self.split_mode = split_mode
        self.train_items: list[dict[str, Any]] = []
        self.val_items: list[dict[str, Any]] = []
        self.test_items: list[dict[str, Any]] = []
        self.out_root: Path | None = None
        self.env: str = "xiaohongshu_skill"

    def setup(self, options: dict[str, Any]) -> None:
        self.out_root = Path(options["out_root"])
        self.env = str(options.get("env", "xiaohongshu_skill"))
        self.train_items = self._load_split("train")
        self.val_items = self._load_split("val")
        self.test_items = self._load_split("test")

    def _load_split(self, split_name: str) -> list[dict[str, Any]]:
        items_path = self.split_dir / split_name / "items.json"
        if not items_path.exists():
            raise FileNotFoundError(f"missing Xiaohongshu skill split file: {items_path}")
        items = json.loads(items_path.read_text(encoding="utf-8"))
        if not isinstance(items, list):
            raise ValueError(f"{items_path} must contain a JSON array")
        return items
