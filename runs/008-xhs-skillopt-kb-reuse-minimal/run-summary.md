# Run Summary: XHS SkillOpt-Style KB Reuse Minimal Validation

## Status

- Run id: `008-xhs-skillopt-kb-reuse-minimal`
- Scenario: `xiaohongshu-creator`
- Mode: `manual_skillopt_style`
- Result: `accepted_candidate`
- Promotion target: `none`

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

Accepted edits:

1. Add failed-proof boundary: failed publish evidence is negative evidence, not compliant publish proof.
2. Add account-state gate: unknown account state stops before draft or publish handoff.
3. Add selection gate: candidate workflow changes need held-out improvement and cannot weaken scenario gates.

## Selection Result

- Metric: `xhs_kb_reuse_safety_score`
- Baseline score: `80`
- Candidate score: `95`
- Improvement: `15`
- Selection gate: `passed`
- Risk gate: `passed`

The candidate is accepted for this experimental run because it preserves the
existing KB-first reuse behavior while making the historical safety failures
explicit. It does not change verified recipe status.

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
