from __future__ import annotations

from typing import Any


def build_meta_skill(*, env: str, selection_gate: dict[str, Any], rollouts: dict[str, Any]) -> str:
    if selection_gate.get("applicable", True):
        selection_line = f"- selection passed: {selection_gate['passed']}"
    else:
        selection_line = f"- selection passed: n/a ({selection_gate.get('status', 'not_applicable')})"
    return "\n".join(
        [
            "# Meta Skill",
            "",
            f"- env: {env}",
            selection_line,
            f"- baseline passed: {rollouts['baseline_passed']}",
            f"- candidate passed: {rollouts['candidate_passed']}",
            "",
            "This is a project-local SkillOpt artifact, not an external checkout dependency.",
        ]
    )
