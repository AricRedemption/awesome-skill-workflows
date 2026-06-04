from __future__ import annotations

from typing import Any


def reflect_rollouts(
    *,
    baseline_items: list[dict[str, Any]],
    candidate_items: list[dict[str, Any]],
    config: dict[str, Any],
) -> dict[str, Any]:
    baseline_passed = sum(1 for item in baseline_items if item.get("passed"))
    candidate_passed = sum(1 for item in candidate_items if item.get("passed"))
    return {
        "baseline_passed": baseline_passed,
        "candidate_passed": candidate_passed,
        "baseline_total": len(baseline_items),
        "candidate_total": len(candidate_items),
        "config": config,
        "recommendation": "accept_candidate" if candidate_passed > 0 else "reject_candidate",
        "notes": "Project-local smoke reflection over real agent outputs.",
    }
