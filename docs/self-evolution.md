# Self Evolution

The system evolves by turning run evidence into better reusable assets.

## Inputs

- raw discovery notes
- run records
- human review comments
- failure cases
- reusable patterns

## Outputs

- refined skills
- improved workflow definitions
- verified recipes
- updated evaluation rubrics
- updated retrieval index entries

## Rule

Evolution must be evidence-driven. Do not promote a pattern just because it looks useful in theory.

## Trigger Rules

Self-evolution is triggered by any evidence-backed workflow gap, not only by a low content or quality score.

Trigger evolution when:

- a scorecard fails a required quality, compliance, or platform-fit threshold
- human feedback identifies a missing gate, unsafe ordering, unclear handoff, or wrong assumption
- verification shows that the workflow result does not match the action that was requested
- a run produces a reusable failure case or prevention rule

Do not conflate these states:

- content quality passed
- publish threshold passed
- human review passed
- action fact verified
- action compliance verified
- workflow gap detected
- verified recipe promotion approved

A run may have passing content quality and still require self-evolution if a workflow gap is found.

## Writeback Levels

Use the smallest durable writeback level supported by evidence:

- `evolution/`: raw or lightly structured evolution notes from a specific run
- `workflow-kb/failure-cases/`: reusable failure cases with root cause and prevention rules
- `workflow-kb/retrieval-index.json`: retrieval entries for reusable KB assets
- `verified-recipes/`: promoted recipes only after human review, verification, and reuse evidence are complete
- `evolution-drafts/`: human-approved proposals for upgrading repeated lessons into long-lived `AGENTS.md`, `TOOLS.md`, `MEMORY.md`, or managed `SKILL.md` rules

If evidence is incomplete, write a failure case or evolution note, but do not promote it to a verified recipe.

## Event Contract

Each self-evolution event should answer:

- what source run or review triggered it,
- what evidence proves the gap,
- whether the required environment was confirmed before execution,
- which assets changed or should change,
- whether the change is a run-specific note, reusable failure case, pattern, workflow, or recipe,
- whether sensitive data was reviewed before writeback,
- which validator should be run next.

When writing back a successful lesson, include the environment lesson as part of
the reusable contract: what had to be true before the run, how that was checked,
and which environment assumptions are out of scope. Missing environment
precheck evidence should be treated as a workflow gap, even when the visible
output succeeded.

Keep event records small. Use `evolution/` for the human-readable note and, when
machine validation is needed, store the structured event against
`schemas/evolution-event.schema.json`.

## Long-Lived Rule Proposals

Do not automatically rewrite long-lived agent rules from a single run.

When a run-level lesson should change future agent behavior, tool usage, stable
memory, or a managed skill, create a draft under `evolution-drafts/pending/`
instead of directly editing the target file. Use this only for strong signals:

- explicit user correction,
- stable user preference,
- reusable multi-step workflow,
- obvious failure/retry before success.

Skip the proposal when the lesson is one-off, already covered, or only useful as
run evidence. A pending proposal must identify the target file, evidence,
duplicate check, proposed change, apply plan, and validation plan.

After approval, apply the proposal to the target file and move the draft to
`evolution-drafts/approved/`. If rejected, move it to
`evolution-drafts/rejected/`.
