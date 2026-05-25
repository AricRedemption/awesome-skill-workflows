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
- workflow gap detected
- verified recipe promotion approved

A run may have passing content quality and still require self-evolution if a workflow gap is found.

## Writeback Levels

Use the smallest durable writeback level supported by evidence:

- `evolution/`: raw or lightly structured evolution notes from a specific run
- `workflow-kb/failure-cases/`: reusable failure cases with root cause and prevention rules
- `workflow-kb/retrieval-index.json`: retrieval entries for reusable KB assets
- `verified-recipes/`: promoted recipes only after human review, verification, and reuse evidence are complete

If evidence is incomplete, write a failure case or evolution note, but do not promote it to a verified recipe.
