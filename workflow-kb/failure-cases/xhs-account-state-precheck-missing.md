# XHS Account-State Precheck Missing

## Status
- Type: failure case
- Scenario: Xiaohongshu creator workflow
- Run: `runs/001-xhs-ai-agent-save-one-hour`
- Source evolution note: `evolution/001-xhs-ai-agent-save-one-hour-login-gap.md`
- Promotion status: evolution evidence only, not a verified recipe

## What Happened
Step 6 generated and scored a Xiaohongshu note successfully, but the first execution treated account login and authorization as a publishing note instead of a pre-handoff gate.

## Human Feedback
The reviewer pointed out that Xiaohongshu posting requires the account login and authorization state to be considered before draft or publish flow, not as an afterthought.

## Root Cause
- The scorecard trigger treated self-evolution as a low-score path only.
- The Step 6 definition of done required content and score outputs, but did not require a workflow KB failure-case writeback.
- The scoring schema did not match the actual scorecard shape, so contract drift could not be caught mechanically.

## Prevention Rule
Any workflow that hands content to a platform-specific draft or publish operation must model account state as a pre-handoff gate:

1. `not_logged_in`
2. `logged_in_but_unauthorized`
3. `ready_for_handoff`

If the state is not `ready_for_handoff`, the workflow must halt before draft or publish action and record the failure as run evidence.

## Reuse Guidance
- Retrieve this failure case when a workflow includes platform publishing, draft creation, account-bound automation, or human-reviewed handoff.
- Do not promote platform-specific account checks into generic architecture docs.
- Keep the generic rule in self-evolution docs; keep this Xiaohongshu-specific instance in the workflow KB.

## Verification
- `runs/001-xhs-ai-agent-save-one-hour/quality-score.json` now records `workflow_gap_detected: true`.
- `runs/001-xhs-ai-agent-save-one-hour/quality-score.json` now records `should_trigger_evolution: true`.
- `workflow-kb/retrieval-index.json` indexes this failure case for future retrieval.
