# XHS Publish Fallbacks

## Goal

Prevent content workflows from taking irreversible platform actions when proof, account state, or human review is incomplete.

## Fallback Matrix

| Failure point | Required fallback |
| --- | --- |
| Content score below threshold | Return to note generation or workflow improvement. |
| Compliance risk fails | Block publish and request rewrite. |
| Human review requests changes | Block publish, revise, and request re-review. |
| Human review missing | Stop at draft package; do not draft or publish. |
| Account not logged in | Stop before platform handoff and record login-required evidence. |
| Account unauthorized | Stop before platform handoff and record authorization-required evidence. |
| Requested mode is draft-only | Save draft only if all draft gates pass; never publish. |
| Publish fails | Fall back to draft-only when draft is allowed and account state is valid. |
| Publish proof incomplete | Record publish fact separately and mark compliant verification failed. |

## Publish Failed To Draft-Only

If the approved mode includes publish and the platform publish action fails:

1. Do not retry blindly.
2. Capture error text, screenshot, browser log, and timestamp.
3. If human review approved draft fallback and account state is valid, save as draft-only.
4. Record `publish_status: failed` and `draft_status: saved`.
5. If draft fallback is not approved, output a local draft package only.

## Non-Negotiable Rule

The fallback for missing review, missing account state, or missing risk approval is not publish retry. It is draft-only or local draft package, depending on the approved mode.
