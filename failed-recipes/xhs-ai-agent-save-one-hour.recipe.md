# Failed Recipe: XHS AI Agent Save One Hour

```yaml
recipe_id: xhs-ai-agent-save-one-hour
name: XHS AI Agent Save One Hour
scenario: xiaohongshu-creator
goal: Turn an AI tools / efficiency topic into a Xiaohongshu-ready note package with scoring, human review, publish verification, and KB writeback evidence.
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
prompts_used:
  - Generate a Xiaohongshu note for AI tools / efficiency users from the topic seed.
  - Extract audience pain points for workers, independent creators, and small startup teams.
  - Produce at least three title candidates and one cover copy line with clear click rationale.
  - Rewrite the note in a useful, low-hype Xiaohongshu voice.
  - Add one copyable Agent task template to increase save-worthiness.
  - Score the output for topic attraction, pain point clarity, title and cover, XHS voice, body structure, save value, hashtags, hook, and compliance.
  - Require human review before draft or publish handoff.
  - Verify publish fact and compliant publish proof separately.
execution_trace:
  - Created v1 run artifacts under runs/001-xhs-ai-agent-save-one-hour.
  - Generated note and scorecard; numeric score passed with total_score 95.
  - Human review requested changes and blocked publish readiness.
  - Step 7 self-evolution recorded account-state precheck as a workflow gap.
  - v2 workflow added save-worthiness-checker and strengthened title-cover generation.
  - Regenerated content as generated-note.v2.md and rescored to total_score 98.
  - A publish fact was later observed, but compliant Step 8 proof failed because pre-publish approval ordering was not proven.
  - Step 9 writes this as reusable KB evidence, not as a verified successful recipe.
output:
  title: 别再让 AI Agent 乱帮忙了
  cover_copy: 这 1 个模板，先省 1 小时
  body: |
    先说结论：AI Agent 最适合接走的，不是“替你做决定”，而是那些重复、低价值、每天都在消耗注意力的小事。

    我以前也会把 AI Agent 想得太大：自动完成一整套工作、自动判断优先级、自动写出完美内容、自动替我推进所有任务。后来发现，这样反而容易失控。

    真正省时间的做法，是先让 Agent 接一个很小、很稳定、很容易检查的环节。

    先找每天重复 3 次以上的事，比如整理会议纪要、从聊天记录里提炼待办、把资料变成摘要、把零散想法整理成大纲、把初稿改成更清楚的版本。

    不要直接说“帮我做完”。更稳定的写法是：你是我的工作整理助手。请根据下面的材料，帮我提炼 5 条行动项。每条行动项包含任务、负责人、截止时间、风险提醒。如果材料里没有明确截止时间，就写“待确认”。不要编造没有出现的信息。

    最推荐收藏的 Agent 任务模板：

    你是我的任务整理助手。
    目标：把我提供的零散信息整理成可执行清单。
    输入：会议记录、聊天记录、想法草稿或资料摘录。
    输出格式：
    1. 关键结论：不超过 3 条
    2. 行动项：任务 / 负责人 / 截止时间 / 下一步
    3. 风险或待确认：只写材料里能支持的内容
    限制：不要编造数据；不要替我做最终决定；不确定的地方标记为“待确认”。

    判断有没有真的省时间：这件事是不是从 20 分钟变成 5 分钟；我是不是少做了重复整理；输出是不是能直接进入下一步。满足其中 2 个，就值得保留。

    AI Agent 省时间的关键，不是让它看起来很聪明，而是让它稳定接住那些你不想每天重复做的小环节。
  hashtags:
    - AI工具
    - AIAgent
    - 效率提升
    - 职场效率
    - 工作流
    - 内容创作
    - 自我提升
  comment_hook: 你最想交给 AI Agent 的重复工作是什么？可以留言一个场景，我帮你拆成一段可直接复制的 Agent 指令。
scores:
  scenario_test_score: 98
  compliance_score: 96
  platform_fit_score: 93
human_review:
  passed: false
  comments: Numeric content quality passed, but initial human review requested changes and no valid pre-publish approval was proven before the later publish action.
publish_verification:
  platform: xiaohongshu
  publish_mode: human_review_then_publish
  status: failed
  post_id: 6a139f0d0000000037035783
  post_url: https://www.xiaohongshu.com/explore/6a139f0d0000000037035783
  published_at: 2026-05-25T09:00:07+08:00
  title: 别再囤Skill了
  human_review_passed: false
  risk_check_passed: false
  evidence:
    screenshot: runs/001-xhs-ai-agent-save-one-hour/xhs-skill-workflow-diagnose-publish.png
    browser_log: runs/001-xhs-ai-agent-save-one-hour/xhs-mcp-publish-result.json
    manual_note: Publish fact exists, but it does not prove compliant publication because human review, risk approval, account-state pass, and draft-to-publish mode escalation were not proven before publish.
risks:
  - Do not claim everyone can reliably save one hour per day.
  - Do not imply AI Agent can replace human judgment.
  - Do not publish or save draft without account-state check.
  - Do not upgrade human_review_then_draft to human_review_then_publish without explicit approval.
  - Do not promote this run as verified while Step 8 proof is failed.
reproduction_steps:
  - Read runs/001-xhs-ai-agent-save-one-hour/input.json for scenario input.
  - Use workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md as the base workflow.
  - Generate title, cover copy, body, hashtags, and comment hook.
  - Run quality scoring and require numeric score >= configured threshold.
  - Send the exact output to human review and record approval before draft or publish.
  - Run account-state-check before any platform handoff.
  - If human review or account state fails, stop at draft-only package and record the failure.
  - If publish is allowed, verify post_id, post_url, timestamp, screenshot, browser log, human-review ordering, risk approval, and mode approval.
  - Write successful runs to verified recipes only when compliant publish proof passes.
evolution_log:
  - Added account-state-check as a pre-handoff gate after the initial workflow gap.
  - Added save-worthiness-checker between xhs-style-rewriter and quality-scorer.
  - Strengthened title-cover-copy-generator to require multiple candidates and explicit selection rationale.
  - Score improved from 95 to 98, but verified promotion remains blocked by Step 8 proof failure.
knowledge_base_entries:
  - workflow-kb/failed-workflows/xhs-ai-tool-topic-to-post.v1.md
  - workflow-kb/scenario-recipes/xhs-ai-agent-save-one-hour.recipe.md
  - workflow-kb/composition-patterns/content-platform-posting-pattern.md
  - workflow-kb/evaluation-rubrics/xhs-content-rubric.md
  - workflow-kb/failure-cases/xhs-content-failure-cases.md
  - workflow-kb/fallback-strategies/xhs-publish-fallbacks.md
  - workflow-kb/reusable-prompts/xhs-content-workflow-prompts.md
status: failed
```

## Status Note

This recipe is intentionally stored with `status: failed`. The content workflow produced reusable evidence, but the run cannot be treated as a verified successful recipe because compliant publish proof failed.
