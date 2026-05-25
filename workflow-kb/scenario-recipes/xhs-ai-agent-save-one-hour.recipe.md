# Scenario Recipe: XHS AI Agent Save One Hour

This recipe is verified for the v0.1 MVP compliant draft path. It does not claim live publish success.

```yaml
recipe_id: xhs-ai-agent-save-one-hour
name: XHS AI Agent Save One Hour
scenario: xiaohongshu-creator
verification_level: draft_verified
status: draft_verified
goal: Turn an AI tools / efficiency topic into a Xiaohongshu-ready note package with scoring, human review, draft verification, and KB writeback evidence.
input:
  account_direction: AI 工具 / 效率提升
  target_users:
    - 职场人
    - 独立创作者
    - 小团队创业者
  topic: 普通人如何用 AI Agent 每天省 1 小时
  platform: xiaohongshu
  requested_publish_mode: human_review_then_draft
workflow_used: xhs-ai-tool-topic-to-post.v1
verified_run: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun
source_runs:
  - runs/001-xhs-ai-agent-save-one-hour
  - runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun
skills_used:
  - skill-discoverer
  - skill-normalizer
  - capability-mapper
  - workflow-composer
  - xhs-topic-generator
  - audience-painpoint-extractor
  - reference-discovery
  - title-cover-copy-generator
  - xhs-note-writer
  - xhs-style-rewriter
  - save-worthiness-checker
  - hashtag-generator
  - engagement-hook-generator
  - compliance-risk-checker
  - quality-scorer
  - human-review-gate
  - human-feedback-intake
  - account-state-check
  - xhs-publish-or-draft
  - post-publish-verifier
  - evolution-recorder
  - workflow-kb-writer
  - verified-recipe-generator
execution_trace:
  - Created v1 run artifacts under runs/001-xhs-ai-agent-save-one-hour.
  - Generated note and scorecard; numeric score passed with total_score 95.
  - Step 7 self-evolution added save-worthiness and title-cover strengthening; rescored to total_score 98.
  - Historical live publish fact existed, but compliant publish proof failed because pre-publish approval ordering was not proven.
  - Re-ran Step 8 as draft-only under runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun.
  - Human review, risk approval, and account-state check passed before the draft action.
  - Draft save was verified in the creator draft box; no live publish was attempted.
output:
  title: AI Agent每天省1小时
  content_package: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/publish-package.json
  draft_proof: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json
  gate_ledger: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json
scores:
  first_run_score: 95
  evolved_run_score: 98
  compliance_score: 96
  platform_fit_score: 93
human_review:
  passed: true
  evidence: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/human-review.json
  approved_action: save_draft_only
  final_publish_mode: human_review_then_draft
risk_approval:
  passed: true
  evidence: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/risk-approval.json
account_state:
  passed: true
  account_name: 沐光
  evidence: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json
draft_verification:
  platform: xiaohongshu
  publish_mode: human_review_then_draft
  status: draft_saved
  compliance_status: passed
  publish_fact_status: not_published
  saved_draft: true
  clicked_publish: false
  draft_title: AI Agent每天省1小时
  draft_saved_text: AI Agent每天省1小时 保存于2026-05-25 14:15:36
  screenshot: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/xhs-draft-save-proof.png
  browser_log: runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json
historical_publish_failure:
  status: retained_as_failure_case
  evidence: failed-recipes/xhs-ai-agent-save-one-hour.recipe.md
  note: The earlier publish fact remains useful failure evidence but is not used for MVP pass.
risks:
  - Do not claim live publish verification from this recipe.
  - Keep failed live-publish proof separate from compliant draft verification.
  - Do not upgrade human_review_then_draft to human_review_then_publish without fresh explicit approval.
reproduction_steps:
  - Generate and score the post package.
  - Require pre-draft human approval and risk approval.
  - Run account-state-check before platform handoff.
  - Save draft only within human_review_then_draft mode.
  - Verify draft box evidence, screenshot, gate ledger ordering, and clicked_publish=false.
  - Write successful draft-verified runs to verified recipes and workflow KB.
knowledge_base_entries:
  - workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md
  - workflow-kb/scenario-recipes/xhs-ai-agent-save-one-hour.recipe.md
  - workflow-kb/composition-patterns/content-platform-posting-pattern.md
  - workflow-kb/evaluation-rubrics/xhs-content-rubric.md
  - workflow-kb/failure-cases/xhs-content-failure-cases.md
  - workflow-kb/fallback-strategies/xhs-publish-fallbacks.md
  - workflow-kb/reusable-prompts/xhs-content-workflow-prompts.md
```

## Status Note

This recipe is verified for compliant draft save only. Live publish remains unverified.
