# Verified Workflow: XHS AI Tool Topic To Post v1

## Status

- Type: verified workflow record
- Scenario: `xiaohongshu-creator`
- Source workflow: `workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md`
- Verified run: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun`
- Verified status: `draft_verified`

This workflow is verified for compliant draft save. It does not claim live publish verification.

## Reusable Workflow Shape

1. Discover and normalize candidate skills.
2. Map scenario capabilities to concrete skills.
3. Compose the workflow with explicit gates and fallbacks.
4. Generate topic angle, audience pain points, title, cover copy, body, hashtags, and comment hook.
5. Run compliance and quality scoring.
6. Require human review before draft or publish handoff.
7. Check account login and authorization before platform handoff.
8. Select the approved browser profile class and tell the reviewer where the draft will be visible.
9. Save draft or publish only within the approved mode.
10. Verify draft or publish fact separately from compliance proof.
11. For draft mode, verify draft box title, save timestamp, profile class, and changed body fields such as hashtags.
12. Keep the browser open after handoff unless the reviewer explicitly asks to close it.
13. Record evolution, KB entries, and recipe status.

## Verified Draft Gates

- Human review passed before draft action.
- Risk approval passed before draft action.
- Account-state check passed before draft action.
- `human_review_then_draft` stayed draft-only.
- `clicked_publish` is `false`.
- Draft box evidence contains `AI Agent saves one hour per day, saved at 2026-05-25 14:15:36`.

## Execution Checklist

Before any future Xiaohongshu draft handoff, retrieve and follow `workflow-kb/composition-patterns/xhs-draft-execution-checklist.md`.

The checklist is not a new verified workflow by itself. It is a hard execution guardrail derived from later failure evidence and human feedback.

## Evidence

- Draft proof: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json`
- Gate ledger: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json`
- Screenshot: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/xhs-draft-save-proof.png`

## Boundary

The earlier live publish attempt remains a failure case because it lacked pre-publish ordering proof. Future live publish promotion still requires explicit `human_review_then_publish` approval before the publish command starts.
