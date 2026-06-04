from __future__ import annotations


def build_slow_update(best_skill: str) -> str:
    return "\n".join(
        [
            "# Slow Update",
            "",
            "This project-local smoke layer keeps slow-update memory deterministic.",
            "",
            "## Best Skill Snapshot",
            "",
            best_skill.strip(),
        ]
    )
