# v0.1 MVP Validation Report

## 1. MVP Summary

### 项目目标

`awesome-skill-workflows` v0.1 的目标不是只做一篇小红书内容，而是验证一条可复用的 Agent Skill 工作流闭环：

1. 从公开 GitHub / skill source 中发现候选 skills。
2. 将候选 skills 归一化为结构化能力资产。
3. 建立 scenario capability map。
4. 自动或半自动编排 workflow。
5. 执行 workflow 生成内容、评分、进入人审门槛。
6. 记录自进化、发布/草稿证据、失败原因和 fallback。
7. 将可复用 workflow / recipe / rubric / failure case / fallback 写回 workflow knowledge base。
8. 第二次类似任务先检索 KB，并复用已有 workflow。

### 为什么小红书只是 validation scenario

小红书不是项目本身的长期边界，而是 v0.1 的验证场景。选择小红书，是因为它同时具备内容平台常见的核心约束：平台语感、标题/封面点击率、合规风险、人审、账号态、草稿或发布动作、发布证明、二次复用。这个场景足够具体，可以暴露 workflow 编排是否真的可执行；但产物设计没有绑定到小红书单点，后续可以迁移到 LinkedIn、Twitter/X、公众号、Newsletter、社区帖等内容平台。

### 本次验证的核心闭环

本次验证完成了从 skill 获取到二次复用的主闭环：

- 发现并归一化 skill 候选。
- 生成 `skills/index.json` 和 `skills/capability-map.md`。
- 组成小红书 AI 工具内容 workflow。
- 第一轮生成完整笔记并评分。
- 触发 workflow self-evolution，记录改进事件。
- 记录人审门槛和历史发布事实，同时识别早期合规发布证明失败。
- 重跑 Step 8 draft-only 链路，补齐人审、风险审批、账号态检查、草稿保存和 draft proof。
- 生成 draft-verified recipe，并将 workflow、recipe、rubric、failure case、fallback、prompt 等写入 workflow KB。
- 第二轮任务检索 KB，复用 80% workflow steps，并生成分数达标的新内容。

结论：Step 11 最终 MVP 验收通过，范围限定为 `compliant draft MVP`，不包含 live publish 验证。内容生成到 KB 复用闭环通过；合规草稿链路通过；历史 live publish proof 仍保留为失败案例。

## 2. Artifacts Checklist

| artifact | status | note |
| --- | --- | --- |
| `skills/raw-discovery/github-xhs-skills.md` | present | 12 个白名单 source 记录。 |
| `skills/index.json` | present | 18 个归一化 skill records。 |
| `skills/capability-map.md` | present | 62 个 capability rows，覆盖 13 个 xhs v0.1 required semantic bundles。 |
| `workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md` | present | v0.1 基础 workflow，22 个 required steps。 |
| `runs/001-xhs-ai-agent-save-one-hour/generated-note.md` | present | 第一轮生成的小红书笔记。 |
| `runs/001-xhs-ai-agent-save-one-hour/quality-score.json` | present | 第一轮评分：95，总体内容达标。 |
| `evolution/xhs-ai-tool-topic-to-post-evolution-log.md` | present | 记录 1 次 workflow 改进事件。 |
| `runs/001-xhs-ai-agent-save-one-hour/human-review.md` | present | 人审门槛存在，但结论是 `invalid_for_publish`。 |
| `runs/001-xhs-ai-agent-save-one-hour/publish-proof.md` | present | 发布事实存在，合规发布证明失败。 |
| `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json` | present | Step 8 重跑：`draft_saved`，`compliance_status: passed`。 |
| `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json` | present | 人审、风险审批、账号态、草稿动作顺序证据。 |
| `failed-recipes/xhs-ai-agent-save-one-hour.recipe.md` | present | 历史 live publish failure 已从 verified promotion 路径隔离。 |
| `verified-recipes/xhs-ai-agent-save-one-hour.recipe.md` | present | draft-verified recipe 存在。 |
| `workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md` | present | draft-verified workflow 存在。 |
| `workflow-kb/retrieval-index.json` | present | 10 条 KB records。 |
| `runs/002-xhs-meeting-notes-productivity/kb-retrieval.md` | present | 第二轮检索并复用 KB。 |
| `runs/002-xhs-meeting-notes-productivity/generated-note.md` | present | 第二轮生成的小红书笔记。 |
| `runs/002-xhs-meeting-notes-productivity/quality-score.json` | present | 第二轮评分：95，复用达标。 |

## 3. Metrics

| metric | value | evidence |
| --- | ---: | --- |
| discovered source count | 12 | `skills/raw-discovery/github-xhs-skills.md` |
| raw candidate count | 18 | `skills/raw-discovery/raw_skill_candidates.json` |
| normalized skill count | 18 | `skills/index.json` |
| required capability coverage | 13 / 13 | `skills/capability-map.md` |
| workflow step count | 22 base / 23 evolved | `workflows/...workflow.md`, `runs/.../workflow-plan.v2.md` |
| first run score | 95 | `quality-score.json` |
| improved run score | 98 | `quality-score.v2.json` |
| Step 8 draft rerun status | draft_saved / passed | `runs/003.../draft-proof.json` |
| compliance score | 95 first / 96 improved / 92 second | scorecards |
| xhs style score | 90 first / 93 improved / 88 second | scorecards |
| evolution event count | 1 | `evolution/xhs-ai-tool-topic-to-post-evolution-log.md` |
| KB entry count | 10 | `workflow-kb/retrieval-index.json` |
| second run reuse ratio | 80% | `runs/002-xhs-meeting-notes-productivity/kb-retrieval.md` |
| second run score | 95 | `runs/002-xhs-meeting-notes-productivity/quality-score.json` |

## 4. Mock vs Real

### Mock / 半人工部分

- `prompt skill`：内容生成、评分、人审提示等 prompt 能力是 workflow 内部的半自动/模拟 skill，不等同于已发布的独立可执行插件。
- `manual review approval`：人审和风险审批仍是手工记录，但 Step 8 重跑已通过 gate ledger 保留时间顺序证据。
- `screenshot/manual publish evidence`：截图和 MCP 结果能证明发布事实，但不能单独证明合规发布链路。

### 真实跑通部分

- 15+ skills normalization：实际归一化 18 个 skills。
- capability map：实际生成能力映射，覆盖 13/13 required semantic bundles。
- workflow composition：实际生成小红书 topic-to-post workflow。
- content generation：第一轮和第二轮都生成了完整小红书笔记。
- scoring：第一轮 95，改进版 98，第二轮 95。
- self-evolution：记录了 `save-worthiness-checker` 和 title-cover 强化事件。
- human review gate：门槛存在；历史失败能阻断 publish verification；Step 8 重跑人审通过。
- proof：历史 publish fact proof 与 compliant proof 分离；Step 8 draft proof 已通过。
- recipe：failed recipe 保留为历史失败；draft-verified recipe 已生成。
- KB writeback：verified workflow、recipe、rubric、failure case、fallback、prompt、reuse run 已进入 KB index。
- second run retrieval and reuse：第二轮检索 KB，复用 80% workflow steps，内容评分 95。

## 5. Final MVP Checklist

| checklist item | status | evidence / note |
| --- | --- | --- |
| Agent 能从公开 GitHub / skill source 中发现小红书相关 skills | pass | `github-xhs-skills.md` 记录 12 个 source。 |
| 至少归一化 15 个 skills | pass | `skills/index.json` 记录 18 个 skills。 |
| 生成 `skills/index.json` | pass | 文件存在。 |
| 生成 `capability-map.md` | pass | 文件存在。 |
| 自动或半自动组成 1 条小红书内容 workflow | pass | `xhs-ai-tool-topic-to-post.workflow.md`。 |
| workflow 能生成 1 篇完整小红书笔记 | pass | `generated-note.md`。 |
| 内容评分 >= 80 | pass | 第一轮 95。 |
| 合规评分 >= 90 | pass | 第一轮 95，改进版 96，第二轮 92。 |
| 小红书语感 >= 75 | pass | 第一轮 90，改进版 93，第二轮 88。 |
| 如果评分未达标，能触发 workflow self-evolution | pass | 本轮即使评分达标，也触发了自进化 proof。 |
| 至少记录一次 workflow 改进 | pass | Evolution Event 1。 |
| evolution log 包含 trigger、problem、change、reason、score_before、score_after | pass | `evolution/...evolution-log.md`。 |
| 用户人审通过 | pass | Step 8 rerun `human-review.json`：`decision: approved`，`approved_action: save_draft_only`。 |
| 成功发布或保存草稿 | pass | Step 8 rerun `draft-proof.json`：`status: draft_saved`，`saved_draft: true`。 |
| 有 publish proof / draft proof | pass | 有有效 draft proof；历史 publish proof 保留为 failed proof，不用于通过结论。 |
| 生成 verified scenario recipe | pass | `workflow-kb/scenario-recipes/xhs-ai-agent-save-one-hour.recipe.md` 为 `draft_verified`。 |
| 将 verified workflow、recipe、rubric、failure case、fallback 写入 workflow knowledge base | pass | `workflow-kb/retrieval-index.json` 中 workflow / recipe 均为 `draft_verified`，并保留 failure case / fallback。 |
| 第二次类似任务能检索并复用已有 workflow | pass | `runs/002.../kb-retrieval.md`。 |
| 第二次任务复用至少 60% workflow steps | pass | 80%。 |
| 第二次任务生成内容评分 >= 80 | pass | 95。 |

## 6. Risks and Next Steps

### 当前风险

- 发布事实和合规发布证明不能混用。当前 MVP 通过依据是 Step 8 draft proof，不是历史 live publish proof。
- failed live publish workflow / recipe 已从 verified draft promotion 路径隔离；后续检索仍必须读取 `verified_status` / `status`，不能只看路径命名。
- prompt skill 和人审证据仍偏半人工，尚未沉淀为可重复执行的强约束 runner。
- 第二轮验证是 content_package_only，没有覆盖账号态和平台草稿/发布链路；Step 8 rerun 只覆盖第一条场景的草稿链路。

### v0.2 可扩展方向

- 增加 machine-checkable gate ledger：每个 gate 写入时间戳、输入 hash、reviewer decision、账号态结果和 allowed action。
- 将 `human_review_then_draft`、`human_review_then_publish` 做成不可隐式升级的 mode contract。
- 把 recipe promotion 分成 `content_verified`、`draft_verified`、`publish_fact_verified`、`compliant_publish_verified` 四级状态。
- 把 `save-worthiness-checker` 在更多 run 中重复验证，确认是否能稳定提升收藏价值。

### 如何扩展到其他内容平台

- 保留通用 workflow skeleton：discovery -> normalization -> capability map -> composition -> content package -> scoring -> human review -> account-state -> handoff -> verification -> KB writeback。
- 平台差异只替换 platform adapter、rubric、style rewrite、publish verifier。
- 对所有账号绑定平台统一要求账号态前置检查、人审前置证据、proof 与 compliance proof 分离。

### 如何扩展到其他场景

- 用 scenario capability requirements 定义最小能力集合。
- 复用 `workflow-kb/retrieval-index.json` 做 KB-first workflow selection。
- 对非内容场景替换评分 rubric，例如代码变更用 tests / review findings，数据任务用数据完整性和结果复现性，销售/运营任务用目标转化和合规边界。
- 将 failure case 写回 KB，保证第二次任务先避坑再生成。

## Final Verdict

- MVP: pass.
- Pass scope: compliant draft MVP.
- Not claimed: live publish MVP.
- Residual risks: human review and risk approval are still manually recorded; live publish remains unverified.

本报告建议把 v0.1 结论定义为：`skill discovery -> normalization -> workflow composition -> content generation -> scoring -> evolution -> compliant draft proof -> KB writeback -> second-run retrieval/reuse` 闭环通过。v0.1 不声明 live publish 通过；live publish proof、自动 gate runner 和更强机器校验进入 v0.2。
