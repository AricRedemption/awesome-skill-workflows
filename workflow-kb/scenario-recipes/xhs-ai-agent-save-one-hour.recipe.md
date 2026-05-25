# Scenario Recipe: XHS AI Agent Save One Hour

```yaml
recipe_id: xhs-ai-agent-save-one-hour
name: XHS AI Agent Save One Hour
scenario: xiaohongshu-creator
verification_level: draft_verified
goal: Turn an AI-tools productivity topic into a reviewed Xiaohongshu draft package with scoring, account-state proof, and KB writeback.
input:
  account_direction: AI tools / productivity
  target_users:
    - knowledge workers
    - independent creators
    - small startup teams
  topic: How ordinary users can save one hour per day with AI agents
  platform: xiaohongshu
  requested_publish_mode: human_review_then_draft
verified_run: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun
```

## Verified Path

1. Reuse the scenario workflow shape.
2. Generate a content package.
3. Pass quality and compliance scoring.
4. Pass human review.
5. Pass risk approval.
6. Confirm account state before platform handoff.
7. Save a draft only.
8. Verify `clicked_publish=false`.
9. Write the outcome back to the workflow knowledge base.

## Evidence

- Gate ledger: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json`
- Draft proof: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json`
- Human review: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/human-review.json`
- Risk approval: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/risk-approval.json`

## Reuse Boundary

This recipe is verified for compliant draft save only. It does not prove compliant live publication.
