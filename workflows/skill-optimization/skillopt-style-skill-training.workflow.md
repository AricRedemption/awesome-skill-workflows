# SkillOpt-Style Skill Training Workflow

## Status

- Type: Layer 1 workflow asset
- Scope: scenario-agnostic skill optimization
- Status: experimental
- Related doc: `docs/skillopt-integration.md`

## Goal

Optimize one reusable skill or workflow skill document from scored run evidence
without changing the target model, bypassing scenario gates, or promoting
unverified candidates.

## Inputs

- `source_skill_path`: the baseline skill or workflow artifact.
- `train_refs`: evidence used to propose bounded edits.
- `selection_refs`: held-out evidence used only to accept or reject the
  candidate.
- `test_refs`: optional final-report evidence not used for candidate selection.
- `baseline_score`: measured score for the baseline artifact.
- `scenario_risk_gate`: local scenario gate, when the evidence comes from a
  scenario.

## Outputs

- `candidate_skill_path`: candidate skill or workflow artifact.
- `skill-optimization-run.json`: structured optimization record.
- Accepted or rejected candidate status.
- Rejected-edit evidence when an edit is unsafe or does not improve selection
  score.

## Workflow

1. Select one baseline skill artifact.
2. Separate evidence into train and selection references.
3. Score the baseline on the selection references.
4. Propose bounded candidate edits from train evidence.
5. Apply only `add`, `delete`, or `replace` edits within the edit budget.
6. Score the candidate on the held-out selection references.
7. Check scenario risk gates without weakening or replacing them.
8. Accept the candidate only when selection score improves and risk gates pass.
9. Store rejected candidates with a concrete rejected reason.
10. Validate the run with `node scripts/validate-skill-optimization.mjs`.

## Required Gates

- Train and selection evidence must not be the same files.
- Candidate score must be greater than baseline score before `accepted=true`.
- Candidate evidence must include references to run evidence, not only model
  judgment.
- Scenario-specific gates remain scenario-specific. This workflow cannot turn a
  content score into account-state proof, human approval, draft proof, or
  publish proof.
- Direct promotion to `verified-recipes/` is forbidden. Promotion requires the
  normal project-specific recipe and workflow gates.

## First Validation Scenario

The first validation target is the Xiaohongshu KB-first reuse path because it
does not require account-bound draft or publish actions.

Valid optimization target:

- Improve the reusable instruction for retrieving and reusing workflow-KB
  entries before composing a new Xiaohongshu content workflow.

Invalid optimization targets:

- Bypassing human review.
- Bypassing account-state checks.
- Reclassifying draft evidence as publish evidence.
- Treating generated content quality as recipe promotion proof.
