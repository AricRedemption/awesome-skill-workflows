from __future__ import annotations


def score_selection_gate(baseline_score: int, candidate_score: int) -> dict[str, object]:
    passed = candidate_score > baseline_score
    return {
        "passed": passed,
        "baseline_score": baseline_score,
        "candidate_score": candidate_score,
        "improvement": candidate_score - baseline_score,
    }
