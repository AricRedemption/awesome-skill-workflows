# XHS Content Failure Cases

## Failure 1: Publish Fact Mistaken For Compliant Proof

- Run: `runs/001-xhs-ai-agent-save-one-hour`
- Symptom: A public Xiaohongshu post existed, but Step 8 still failed.
- Root cause: The proof chain did not establish human review, risk approval, account-state pass, or mode escalation approval before publish.
- Improvement: Store publish fact and compliant proof as separate fields. Verified recipe promotion requires compliant proof.

## Failure 2: Requested Draft Mode Upgraded To Publish Mode

- Symptom: Input requested `human_review_then_draft`, but later evidence used `human_review_then_publish`.
- Root cause: No explicit pre-publish approval for changing handoff mode.
- Improvement: Treat handoff mode as immutable unless a human approval record changes it before action start.

## Failure 3: Account-State Check Treated As Advice

- Symptom: Login and authorization were initially described as publishing notes rather than a blocking gate.
- Root cause: The workflow placed content scoring ahead of account-state proof without a hard pre-handoff gate.
- Improvement: Require `account-state-check` before draft or publish. If not ready, stop before platform handoff.

## Failure 4: Numeric Score Treated As Publish Approval

- Symptom: Content scored 95 then 98, but publish readiness remained false.
- Root cause: Quality score measured content quality, not authorization to publish.
- Improvement: Keep separate statuses for `content_quality_passed`, `human_review_passed`, `account_state_passed`, and `publish_verification_passed`.

## Failure 5: Save Value Not Explicitly Gated

- Symptom: v1 content was good but did not include a compact copyable Agent task template.
- Root cause: The workflow had no `save-worthiness-checker` before scoring.
- Improvement: Add a save-worthiness gate for productivity and education posts; route failures back to note writing.

## Step 10 Reuse Note: Failed Publish Workflow Still Reusable For Content

- Run: `runs/002-xhs-meeting-notes-productivity`
- Symptom avoided: The second task could have restarted discovery and composition from zero even though the KB already contained a close matching Xiaohongshu AI productivity workflow.
- Root cause avoided: Treating `verified_status: failed` as "do not use anything" would discard useful content-generation, scoring, human-review, and account-boundary structure.
- Improvement: Reuse failed publish workflow records only for the parts they proved useful for: content generation, gate design, rubric reuse, and failure avoidance. Do not reuse them as compliant publish proof.
- Additional risk captured: Meeting-note and workplace productivity content must include a confidentiality check before scoring or handoff because raw meeting notes can contain client names, internal financials, personal data, and project code names.
- Reuse evidence: `xhs-ai-tool-topic-to-post.v1` plus `content-platform-posting-pattern` supported an 80% reuse ratio for the second task while avoiding broad discovery.
