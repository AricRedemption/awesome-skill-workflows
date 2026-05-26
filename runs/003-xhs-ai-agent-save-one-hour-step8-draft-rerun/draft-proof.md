# Step 8 Draft Proof Rerun

## Verdict

- status: `draft_saved`
- compliance_status: `passed`
- publish_mode: `human_review_then_draft`
- saved_draft: `true`
- clicked_publish: `false`
- live publish attempted: `false`

## Gate Ordering

| gate | status | timestamp | evidence |
| --- | --- | --- | --- |
| human review | passed | `2026-05-25T14:11:11+08:00` | `human-review.json` |
| risk approval | passed | `2026-05-25T14:11:12+08:00` | `risk-approval.json` |
| account-state check | passed | `2026-05-25T06:15:06.234Z` | `draft-proof.json` |
| draft action started | passed | `2026-05-25T06:15:06.236Z` | `gate-ledger.json` |
| draft action finished | passed | `2026-05-25T06:15:47.416Z` | `draft-proof.json` |

The required ordering is satisfied: human review and risk approval existed before account-state check and before the draft action. Account-state check passed before the draft action started.

## Draft Evidence

- draft title: `AI Agentlocalized text1localized text`
- creator account detected: `localized text`
- draft box count after save: `localized text(5)`
- proof text found: `AI Agentlocalized text1localized text localized text2026-05-25 14:15:36`
- screenshot: `user-sensitive-state/archive/runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/screenshots/xhs-draft-save-proof.png`
- machine proof: `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json`

## Boundary

This rerun only validates compliant draft save. It does not claim live publication. `post_id`, `post_url`, and `published_at` are intentionally `N/A`.
