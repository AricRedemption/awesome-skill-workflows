# 001-xhs-ai-agent-save-one-hour Workflow Plan

## 为什么选这些 skills

这条 workflow 的主线不是“直接写文案”，而是先用仓库内的 skill 索引把场景拆成可验证的能力链，再把能力链压成一条可执行的内容生产路径。

选 skill 的原则很直接：

1. 先用 `skill-discovery`、`source-intake-and-discovery` 把候选技能和能力边界固定下来，避免后面编排离开仓库事实。
2. 用 `topic-generation`、`audience-painpoint-extraction`、`title-generation`、`cover-copy-generation` 形成前半段内容决策链，先定“写什么、写给谁、怎么勾人”。
3. 用 `note-writing`、`platform-style-rewrite`、`hashtag-generation`、`engagement-hook-generation` 形成正文和包装链，产出能进入审核的草稿，并明确落到 `generated-note.md`。
4. 用 `compliance-checker`、`quality-scoring` 作为硬门槛，确保内容先过风险和质量，再进入 human review。
5. 用 `human-feedback-intake` 把人工反馈结构化成可复用证据，用 `account-state-check` 把小红书登录和授权状态作为场景级前置门槛，再用 `publish-draft-creation`、`post-verification`、`evolution-recording`、`knowledge-base-writeback` 把一次运行变成可验证、可回放、可进化的资产。
6. 最后用 `quality-scoring` 的 `verified-recipe-generation` 能力把闭环沉淀成 recipe，方便下一次复用。

## 哪些步骤是 mock

这条 workflow 里有 3 个步骤属于 synthetic / mock 层，不依赖单独的生产 skill：

1. `workflow-composer`
2. `human-review-gate`
3. `verified-recipe-generator`

其余步骤都能在 `skills/index.json` 里找到直接或近似的实现 skill。

## 哪些步骤是 high risk

高风险步骤不是指“技术难”，而是指一旦出错就会把错误放大、或者会影响后续发布和知识库资产质量：

1. `xhs-note-writer`
2. `compliance-risk-checker`
3. `human-review-gate`
4. `xhs-publish-or-draft`
5. `post-publish-verifier`
6. `workflow-kb-writer`

其中 `xhs-note-writer`、`xhs-publish-or-draft` 和 `workflow-kb-writer` 是最需要保守处理的三个环节。`account-state-check` 不是顶层架构能力，而是小红书场景进入草稿或发布交付前的账号态门槛。

## Human Review Gate 位置

human review gate 放在 `quality-scorer` 之后、`human-feedback-intake` 之前；`human-feedback-intake` 负责结构化人工反馈，`account-state-check` 再放在 `xhs-publish-or-draft` 之前。

原因是：

1. 先用 `compliance-risk-checker` 和 `quality-scorer` 把明显不合格的内容挡掉。
2. 再由人确认最终方向、措辞、风险点和发布策略。
3. reviewer 的批准、修改意见或 hold 决策必须先进入 `human-feedback-intake`，变成结构化证据。
4. 只有 reviewer 通过，才允许检查账号登录和授权状态。
5. 只有账号态确认可操作，才允许进入 draft 创建或发布包装。

这符合 `human_review_then_draft` 的运行模式。

## Fallback 路径

### 1. 发现与编排失败

如果 `skill-discoverer`、`skill-normalizer` 或 `capability-mapper` 出现缺口：

1. 退回 `skills/index.json` 的原始候选清单。
2. 只保留能明确映射到场景要求的技能。
3. 对无法映射的能力做人工标注，不做猜测。

### 2. 选题和痛点失败

如果 `xhs-topic-generator` 或 `audience-painpoint-extractor` 失败：

1. 直接使用输入里的 topic 作为主线。
2. 以目标用户角色补足痛点。
3. 先生成保守版本，再做二次改写。

### 3. 标题、封面、正文失败

如果 `title-cover-copy-generator`、`xhs-note-writer` 或 `xhs-style-rewriter` 表现不稳：

1. 降级到更保守、直接的表达。
2. 先停在 outline 或 draft package，不进入发布。
3. 让 human review 决定是否继续，而不是自动补写。

### 4. 合规或质量失败

如果 `compliance-risk-checker` 或 `quality-scorer` 不通过：

1. 立即回到 `workflow-improver`，再进入重写阶段。
2. 不进入 human review 之后的发布动作。
3. 把失败原因写入 evolution 记录。

### 5. 发布或验证失败

如果 `account-state-check`、`xhs-publish-or-draft` 或 `post-publish-verifier` 失败：

1. 保留 draft-only 状态。
2. 不写入 verified knowledge base。
3. 只输出可回放的失败证据和后续修复建议。

### 6. 知识库写回失败

如果 `workflow-kb-writer` 失败：

1. 先保留 `evolution-recorder` 的结果。
2. 不生成 verified recipe。
3. 等下次有完整证据后再补写。

## Success Criteria

这条 workflow 只有在下面条件同时满足时才算成功：

1. 22 个 step 都存在，且字段完整。
2. 前半段能产出一个明确的 topic-angle、painpoint map、title-cover pair、draft body 和 `generated-note.md`。
3. `compliance-risk-checker` 与 `quality-scorer` 都通过。
4. human review 明确通过。
5. `human-feedback-intake` 把人工反馈结构化为 review notes、failure cases 或 evolution candidates。
6. `account-state-check` 明确返回未登录、未授权或可操作状态，且未登录/未授权时不得继续交付。
7. `xhs-publish-or-draft` 至少生成 draft package 或可追踪的发布包。
8. `post-publish-verifier` 返回可验证状态。
9. `evolution-recorder` 和 `workflow-kb-writer` 都写回成功。
10. `verified-recipe-generator` 只能在前述证据齐全时输出 verified recipe。

## 如何触发 self-evolution

self-evolution 不是自动“越跑越聪明”，而是证据驱动的闭环触发：

1. 一次运行完成后，`post-publish-verifier` 产出验证结果。
2. `evolution-recorder` 收集 run evidence、review comments、failure cases 和 reusable patterns。
3. `workflow-kb-writer` 把已验证的内容写回 workflow KB。
4. `verified-recipe-generator` 在 evidence 完整、human review 通过、验证结果确认后，把这次路径升级成 recipe。
5. 下一次 run 先查询 workflow KB，再决定是否沿用、调整或淘汰这个 recipe。

触发条件必须满足“有证据、有验证、有复用价值”。如果只有想法，没有验证，就不能进入 self-evolution。

## 是否可进入内容生成

可以，但只到 draft 级别。

当前输入已经足够驱动 `xhs-topic-generator` 之后的内容生产链，所以上游内容生成是可进入的；但因为 `publish_mode` 是 `human_review_then_draft`，所以最终只能进入 human review 后的账号态检查和 draft 交付，不能直接跳过审核或账号态门槛发布。
