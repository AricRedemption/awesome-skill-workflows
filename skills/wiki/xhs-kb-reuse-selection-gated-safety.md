# XHS KB Reuse With Selection-Gated Safety Rules

## Provenance

- Source run: `runs/008-xhs-skillopt-kb-reuse-minimal/`
- Source skill path: `runs/008-xhs-skillopt-kb-reuse-minimal/best_skill.md`
- Promotion status: `wiki_promoted`
- Promotion target: `skills/wiki/xhs-kb-reuse-selection-gated-safety.md`

## Summary

This skill defines how to reuse XHS workflow knowledge safely after SkillOpt-
style validation. It keeps failed publish evidence, account-state checks, and
held-out selection evidence separate so future workflow composition does not
collapse proof boundaries.

## When to use

- Before composing a new Xiaohongshu content workflow
- When KB-first reuse may otherwise confuse draft proof with publish proof
- When prior evidence can improve a workflow only if the selected metric and
  scenario gates remain intact

## When not to use

- When account state is unknown and no pre-handoff gate has been checked
- When the task is live publish, browser automation, or direct draft creation
- When the only evidence available is a score without a proof boundary

## Inputs

- `workflow-kb/retrieval-index.json`
- verified workflows
- failure cases
- review feedback
- prior run evidence

## Outputs

- safe reuse decision
- selection-gated workflow instructions
- reuse boundary notes

## Steps

1. Query `workflow-kb/retrieval-index.json` before composing a new workflow.
2. Reuse verified workflows, composition patterns, evaluation rubrics, or
   failure cases that match the task.
3. Treat failed publish evidence as negative evidence only.
4. Keep account state as a hard pre-handoff gate.
5. Accept candidate workflow changes only when held-out evidence improves the
   selected metric and required scenario gates remain intact.

## Failure Modes

- draft proof treated as publish proof
- account state ignored before handoff
- selection gate omitted from candidate acceptance
- temporary run notes promoted as durable wiki knowledge

## Evidence Refs

- `runs/008-xhs-skillopt-kb-reuse-minimal/run-summary.md`
- `runs/008-xhs-skillopt-kb-reuse-minimal/score-result.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/best_skill.md`
- `runs/008-xhs-skillopt-kb-reuse-minimal/rejected-candidate-publish-proof-skill.md`
- `workflow-kb/failure-cases/xhs-content-failure-cases.md`
- `workflow-kb/failure-cases/xhs-account-state-precheck-missing.md`

## Related Skills

- `xhs-ai-tool-topic-to-post.v1`
- `xhs-content-failure-cases`
- `xhs-account-state-precheck-missing`
- `knowledge-base-writeback`

## Tags

- `xhs`
- `skillopt`
- `wiki`
- `kb-reuse`
- `selection-gated`
- `proof-boundary`

## Risk Level

- high

## Scope

- KB-first skill reuse
- selection-gated workflow composition
- proof-boundary preservation

## Non-Scope

- live publish
- browser automation
- account-state automation
- recipe promotion

## Updated At

- 2026-06-01
