# Failed Recipe: XHS AI Agent Save One Hour

```yaml
recipe_id: xhs-ai-agent-save-one-hour
name: XHS AI Agent Save One Hour
scenario: xiaohongshu-creator
goal: Turn an AI-tools productivity topic into a Xiaohongshu-ready content package with scoring, human review, proof capture, and KB writeback.
input:
  account_direction: AI tools / productivity
  target_users:
    - knowledge workers
    - independent creators
    - small startup teams
  topic: How ordinary users can save one hour per day with AI agents
  platform: xiaohongshu
  requested_publish_mode: human_review_then_draft
workflow_used: xhs-ai-tool-topic-to-post.v1
status: failed
verification_level: failed_publish_proof
generic_action_verification_level: failed_with_evidence
human_review:
  passed: false
publish_verification:
  platform: xiaohongshu
  publish_mode: human_review_then_publish
  status: failed
  human_review_passed: false
  risk_check_passed: false
  evidence:
    browser_log: runs/001-xhs-ai-agent-save-one-hour/xhs-mcp-publish-result.json
    manual_note: Publish fact exists, but compliant publish proof is missing because approval ordering, risk approval, account-state pass, and mode escalation approval were not proven before publish.
```

## Why This Recipe Failed

The content workflow produced useful evidence, but it cannot be treated as a verified successful recipe. A later publish fact existed, yet the proof chain did not establish compliant pre-publish ordering.

Required evidence was missing for:

- human review before publish,
- risk approval before publish,
- account-state pass before publish,
- explicit mode escalation from draft to publish,
- compliant publish proof.

Generic action-verification mapping:

- action fact: verified
- compliance proof: failed
- promotion status: not promotable
- normalized record: `runs/001-xhs-ai-agent-save-one-hour/action-verification.json`

## Reusable Lessons

- Do not upgrade `human_review_then_draft` to `human_review_then_publish` without explicit approval.
- Do not treat a high content score as human approval.
- Do not treat a publish fact as compliant publish proof.
- Keep failed publish evidence outside `verified-recipes/`.
- Reuse this record only as failure evidence and workflow-shape evidence.

## Next Valid Promotion Path

A future run may promote a recipe only after it proves:

1. the exact content artifact passed human review,
2. risk approval passed,
3. account state passed before platform handoff,
4. the requested mode was approved,
5. draft or publish proof matches the approved mode,
6. gate ordering is recorded in a gate ledger.
