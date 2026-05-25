# MVP Remediation Follow-Up

## Conclusion

The tester feedback is technically correct. The historical Step 11 evidence cannot be repaired into a passing MVP because the missing items are human and platform gate evidence, not formatting gaps.

Current status after engineering remediation:

- MVP acceptance: still failed.
- Promotion safety: fixed.
- Historical failed run evidence: preserved and made machine-readable.
- Remaining blocker: a new compliant draft or publish run with valid gate ordering.

## Fixed

1. Failed recipe was moved out of the verified promotion namespace:
   - from `verified-recipes/xhs-ai-agent-save-one-hour.recipe.md`
   - to `failed-recipes/xhs-ai-agent-save-one-hour.recipe.md`

2. Failed workflow was moved out of the verified workflow namespace:
   - from `workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md`
   - to `workflow-kb/failed-workflows/xhs-ai-tool-topic-to-post.v1.md`

3. `workflow-kb/retrieval-index.json` now marks the first workflow as `failed_workflow` and points to the failed workflow path.

4. Added `schemas/gate-ledger.schema.json` to make gate evidence explicit.

5. Added `runs/001-xhs-ai-agent-save-one-hour/gate-ledger.json` so the historical failed run records each blocking gate:
   - human review failed
   - risk approval missing
   - account-state pass missing
   - draft-to-publish mode approval missing
   - compliant proof failed
   - recipe promotion failed

6. Added `scripts/validate-promotion-gates.mjs` to prevent failed recipes or failed workflows from living in verified namespaces.

7. Updated `reports/first-mvp-validation-report.md` so the final verdict remains `MVP: fail`.

## Still Not Fixed

These cannot be honestly fixed by editing historical files:

- User human review has not passed for a compliant draft or publish handoff.
- There is no valid pre-handoff risk approval.
- There is no independent account-state pass before platform handoff.
- There is no compliant draft proof or compliant publish proof.
- There is no verified successful scenario recipe.

## Required Next Run To Pass MVP

A new run must produce this ordered evidence:

1. Content package generated.
2. Quality score passes.
3. Human review explicitly approves the exact content artifact and exact mode.
4. Risk approval passes before account-bound action.
5. Account-state check passes before platform handoff.
6. Mode remains `human_review_then_draft` or has explicit approval for `human_review_then_publish`.
7. Draft is saved or post is published.
8. Proof includes screenshot, browser log, draft/post identifier when available, timestamp, and account-state evidence.
9. Recipe promotion happens only after the gate ledger is fully passed.

Until that new run exists, the correct final MVP status remains failed.
