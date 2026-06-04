# Run Summary: XHS SkillOpt-Style KB Reuse Minimal Validation

## Status

- Run id: `008-xhs-skillopt-kb-reuse-minimal`
- Scenario: `xiaohongshu-creator`
- Mode: `manual_skillopt_style`
- Result: `accepted_candidate`
- Promotion target: `none`
- Edit generator: `scripts/generate-skill-optimization-edits.mjs`
- Scorer: `scripts/score-skill-optimization-run.mjs`
- Training entrypoint: `scripts/train-skill-optimization-run.mjs`
- Rollout runner: `scripts/run-skill-optimization-rollouts.mjs`
- Optimizer reflection: `scripts/reflect-skill-optimization-run.mjs`
- Rejected buffer: `rejected-001-draft-as-publish-proof`
- Exported best skill: `best_skill.md`

## Purpose

Validate the project-local SkillOpt-style architecture on the Xiaohongshu
workflow without using official SkillOpt code, browser automation, account
state changes, draft creation, or live publish.

The target is a narrow Layer 1 behavior: improve the reusable instruction for
KB-first workflow reuse by adding bounded safety edits derived from prior run
evidence.

## Evidence Split

Training evidence used to propose edits:

- `runs/001-xhs-ai-agent-save-one-hour/step-7-self-evolution-result.json`
- `workflow-kb/failure-cases/xhs-account-state-precheck-missing.md`
- `workflow-kb/failure-cases/xhs-content-failure-cases.md`

Held-out selection evidence used to accept the candidate:

- `runs/002-xhs-meeting-notes-productivity/run-summary.md`
- `workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md`

Optional test evidence checked for gate compatibility:

- `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json`
- `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json`

## Bounded Edits

Edit budget: `3`

Generated edit artifact:

- `runs/008-xhs-skillopt-kb-reuse-minimal/generated-edits.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/steps/step_0002/generate/generated-edits.json`

Accepted edits:

1. Add failed-proof boundary: failed publish evidence is negative evidence, not compliant publish proof.
2. Add account-state gate: unknown account state stops before draft or publish handoff.
3. Add selection gate: candidate workflow changes need held-out improvement and cannot weaken scenario gates.

Rejected candidate:

- `runs/008-xhs-skillopt-kb-reuse-minimal/rejected-candidate-publish-proof-skill.md`
- Reason: draft proof, content quality, and human review cannot be reused as
  live publish proof.
- Rejection stage: `risk_gate`

## Selection Result

- Metric: `xhs_kb_reuse_safety_score`
- Score artifact: `runs/008-xhs-skillopt-kb-reuse-minimal/score-result.json`
- Baseline score: `30`
- Candidate score: `100`
- Improvement: `70`
- Selection gate: `passed`
- Risk gate: `passed`

The candidate is accepted for this experimental run because it preserves the
existing KB-first reuse behavior while making the historical safety failures
explicit. It does not change verified recipe status.

The rejected candidate is preserved because it records a realistic unsafe edit:
collapsing draft proof into publish proof. This is negative evidence for future
optimizer runs.

## Exported Artifacts

- `runs/008-xhs-skillopt-kb-reuse-minimal/best_skill.md`
- `runs/008-xhs-skillopt-kb-reuse-minimal/history.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/runtime_state.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/config.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/train-run.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/steps/step_0001/rollout/rollouts.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/steps/step_0002/generate/generated-edits.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/steps/step_0003/reflect/optimizer-reflection.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/steps/step_0004/evaluate/score-result.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/steps/step_0005/export/best_skill.md`
- `runs/008-xhs-skillopt-kb-reuse-minimal/steps/step_0005/export/history.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/steps/step_0005/export/runtime_state.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/epochs/epoch_01/batch_001/generated-edits.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/epochs/epoch_01/batch_001/rollouts.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/epochs/epoch_01/batch_001/optimizer-reflection.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/epochs/epoch_01/batch_001/score-result.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/epochs/epoch_01/batch_001/best_skill.md`
- `runs/008-xhs-skillopt-kb-reuse-minimal/epochs/epoch_02/batch_001/convergence-check.json`
- `runs/008-xhs-skillopt-kb-reuse-minimal/slow_update/epoch_01/summary.md`
- `runs/008-xhs-skillopt-kb-reuse-minimal/meta_skill/epoch_01/meta-skill.md`

These are local equivalents of the official SkillOpt output structure. They do
not imply official SkillOpt code integration or external benchmark parity.

The local training config records two epochs with batch size 1. Epoch 1 accepts
the bounded candidate; epoch 2 records deterministic convergence with no
additional update.

## Boundary

This run does not prove official SkillOpt integration.

This run does not authorize:

- direct Xiaohongshu draft creation,
- live publish,
- browserless HTTP publishing,
- account-state automation,
- verified recipe promotion,
- or storing sensitive runtime state in reusable assets.

## Validation

Required validator:

```bash
node scripts/validate-skill-optimization.mjs
```

Expected result: `status: passed`.
