# Evolution Drafts

This directory stores human-approved upgrade proposals for long-lived project
rules.

It is inspired by the Hermes Evolution pattern, but adapted for this repository:
the project can create proposal drafts, yet it must not require unavailable
desktop tools or automatically overwrite `AGENTS.md`, `TOOLS.md`, `MEMORY.md`,
or any managed `SKILL.md`.

## Purpose

Use `evolution/` for run-level learning:

- what went wrong,
- what was learned,
- what changed,
- what evidence and validation support the change.

Use `evolution-drafts/` only when a run-level lesson should become a durable
agent rule, tool note, memory note, or reusable skill workflow.

## Lifecycle

- `pending/`: proposal drafted, waiting for human approval.
- `approved/`: proposal accepted and applied to the target file.
- `rejected/`: proposal rejected or superseded.

Do not apply a pending proposal to its target file until the user approves it.

## Proposal Gate

Create a proposal only when the evidence includes at least one strong signal:

- the user corrected the workflow or agent behavior,
- the user stated a stable future preference,
- a reusable multi-step workflow emerged,
- the task required obvious failure/retry before success.

Skip and write no draft when the evidence is weak, one-off, already covered, or
only useful inside the current run record.

## Target Routing

- `AGENTS.md`: future behavior, safety, collaboration, or execution rules.
- `TOOLS.md`: tool, command, environment, path, or platform usage notes.
- `MEMORY.md`: stable user preference or durable fact.
- managed `SKILL.md`: reusable multi-step workflow with clear trigger,
  steps, inputs, outputs, and pitfalls.

Run-specific lessons should stay in `evolution/`. Reusable workflow knowledge
should stay in `workflow-kb/`. Promotion evidence belongs in `runs/` and recipes.

## Duplicate Check

Before writing a draft, check:

- the target file,
- existing `pending/`, `approved/`, and `rejected/` drafts,
- relevant `workflow-kb/` entries,
- relevant managed skills.

If the rule already exists, do not create another draft.

## Apply Rule

After approval:

1. apply the proposal to the target file,
2. move the draft to `approved/`,
3. record the validation command used,
4. keep the original evidence references intact.

If rejected, move it to `rejected/` and do not modify the target file.
