from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from skillopt.engine.trainer import load_simple_yaml


class SkillOptTrainerConfigTests(unittest.TestCase):
    def test_load_simple_yaml_accepts_flat_scalar_config(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            config_path = Path(tmp_dir) / "config.yaml"
            config_path.write_text("env: searchqa\ntrain_size: 2\nselection_gate_required: false\n", encoding="utf-8")
            config = load_simple_yaml(config_path)
        self.assertEqual(
            config,
            {
                "env": "searchqa",
                "train_size": 2,
                "selection_gate_required": False,
            },
        )

    def test_load_simple_yaml_rejects_indented_nested_yaml(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            config_path = Path(tmp_dir) / "config.yaml"
            config_path.write_text("env: searchqa\nnested:\n  child: value\n", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "only supports flat top-level scalar YAML"):
                load_simple_yaml(config_path)

    def test_load_simple_yaml_rejects_yaml_lists(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            config_path = Path(tmp_dir) / "config.yaml"
            config_path.write_text("env: searchqa\nitems:\n- one\n", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "does not support"):
                load_simple_yaml(config_path)


if __name__ == "__main__":
    unittest.main()
