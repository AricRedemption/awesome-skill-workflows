# Evolution Log: XHS AI Tool Topic To Post

## Event 1: Add Save-Worthiness And Account-State Gates

- Scenario: `xiaohongshu-creator v0.1`
- Source run: `runs/001-xhs-ai-agent-save-one-hour`
- Trigger: The generated content scored well, but review and proof evidence showed workflow gaps around save value and account-state ordering.
- Problem: The workflow could produce usable content before proving that the content was worth saving and before treating account state as a blocking handoff gate.
- Change:
  - add `save-worthiness-checker`,
  - strengthen title and cover generation,
  - keep `account-state-check` before platform handoff,
  - keep failed publish evidence outside verified recipe paths.
- Result: The improved content score increased from 95 to 98, but promotion remained limited to draft verification until the gate ledger and draft proof passed.

## Detailed Review

The detailed evolution review for this run is recorded in
`evolution/xhs-ai-agent-save-one-hour-detailed-evolution-review.md`.
