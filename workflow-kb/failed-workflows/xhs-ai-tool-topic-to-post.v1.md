# Failed Workflow: XHS AI Tool Topic To Post v1

## Status

- Type: failed workflow record
- Scenario: `xiaohongshu-creator`
- Source workflow: `workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md`
- Source run: `runs/001-xhs-ai-agent-save-one-hour`
- Verified status: `failed`

This record is kept outside the verified workflow namespace because compliant publish verification failed. It can be reused as workflow shape and failure evidence, but it must not be treated as a verified successful workflow.

## Reusable Workflow Shape

1. Discover and normalize candidate skills.
2. Map scenario capabilities to concrete skills.
3. Compose the workflow with explicit gates and fallbacks.
4. Generate topic angle, audience pain points, title, cover copy, body, hashtags, and comment hook.
5. Run compliance and quality scoring.
6. Require human review before draft or publish handoff.
7. Check account login and authorization before platform handoff.
8. Save draft or publish only within the approved mode.
9. Verify publish fact and compliant proof separately.
10. Record evolution, KB entries, and recipe status.

## Gates

- Human review must pass before draft or publish.
- Account state must be `ready_for_handoff`.
- Risk check must pass before publish.
- `human_review_then_draft` cannot become `human_review_then_publish` without explicit approval.
- A successful publish fact is not enough for verified promotion; ordering evidence is required.

## Failure Learned This Run

The run produced good content and a public post was found, but the proof chain did not establish pre-publish human approval, risk approval, account-state pass, or mode escalation approval. Future agents must stop at draft-only when those proofs are missing.

Generic action-verification mapping:

- normalized record: `runs/001-xhs-ai-agent-save-one-hour/action-verification.json`
- action fact: verified
- compliance proof: failed
- promotion status: not promotable

## Promotion Criteria

Promote this workflow to `verified` only after a future run proves:

- pre-publish human approval timestamp;
- account-state check before platform handoff;
- explicit publish mode approval;
- screenshot and browser log;
- post ID or draft ID;
- no forbidden platform automation such as like, comment, follow, or account warming.
