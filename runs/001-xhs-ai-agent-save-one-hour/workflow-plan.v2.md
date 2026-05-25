# 001-xhs-ai-agent-save-one-hour Workflow Plan v2

## 改进结论

v2 不是只改正文，而是改 workflow 编排：在 `xhs-style-rewriter` 和 `quality-scorer` 之间新增 `save-worthiness-checker`，并强化 `title-cover-copy-generator` 的标题候选和封面文案选择规则。

这次自进化的触发原因不是 Step 6 低分，而是 MVP 需要证明 workflow 能根据评分信号主动改进。v1 总分 95 已达标，但 `title_cover_clickability=14/15`、`save_value=9/10` 说明标题点击感和收藏价值仍有可提升空间。

## v2 Skill 编排

1. `skill-discoverer`
2. `skill-normalizer`
3. `capability-mapper`
4. `workflow-composer`
5. `xhs-topic-generator`
6. `audience-painpoint-extractor`
7. `reference-discovery`
8. `title-cover-copy-generator`
9. `xhs-note-writer`
10. `xhs-style-rewriter`
11. `save-worthiness-checker`
12. `hashtag-generator`
13. `engagement-hook-generator`
14. `compliance-risk-checker`
15. `quality-scorer`
16. `human-review-gate`
17. `human-feedback-intake`
18. `account-state-check`
19. `xhs-publish-or-draft`
20. `post-publish-verifier`
21. `evolution-recorder`
22. `workflow-kb-writer`
23. `verified-recipe-generator`

## v2 Changes

### 1. 强化 `title-cover-copy-generator`

v1 只要求生成可用标题和封面文案。v2 要求：

1. 生成至少 3 个标题候选。
2. 每个标题必须标注点击理由。
3. 最终标题优先选择更口语、更低术语密度、更有反差的版本。
4. 封面文案必须和标题形成互补，不能重复同一句话。

本次选择：

- 标题：`别再让 AI Agent 乱帮忙了`
- 封面文案：`这 1 个模板，先省 1 小时`

### 2. 新增 `save-worthiness-checker`

新增位置：`xhs-style-rewriter` 之后、`quality-scorer` 之前。

新增检查项：

1. 正文是否有可复制动作。
2. 是否有清晰步骤。
3. 是否有可收藏模板。
4. 是否避免夸大承诺。
5. 是否能让读者当天试一次。

如果检查不通过，workflow 必须回到 `xhs-note-writer` 补模板或清单，不能直接进入评分。

### 3. 保留账号态门槛

v2 继续保留 v1 修复后的账号态顺序：

1. human review 通过后，进入 `human-feedback-intake`。
2. 再进入 `account-state-check`。
3. 只有账号已登录且授权状态可操作，才允许 `xhs-publish-or-draft`。
4. 未登录或未授权时，只能输出草稿包和阻断原因。

### 4. 增加 v1/v2 对比评分

`quality-scorer` 在 v2 必须输出：

1. v1 score reference。
2. v2 score。
3. 分数变化。
4. 是否回归。
5. 是否需要 rollback。

本次 v2 结果：

- score_before: `95`
- score_after: `98`
- status: `improved`
- final_status: `ready_for_review`

## Self-Evolution Trace

Run workflow
-> Evaluate output
-> Diagnose failure
-> Search better skill / adjust workflow
-> Recompose workflow
-> Re-run
-> Compare score
-> Record evolution event
-> Write to workflow knowledge base if useful

本次 trace 的具体落点：

1. Run workflow: v1 已产出 `generated-note.md` 和 `quality-score.json`。
2. Evaluate output: v1 总分 95，通过发布阈值。
3. Diagnose failure: 标题点击和收藏价值不是满分，缺少模板化保存点。
4. Search better skill / adjust workflow: 选择强化 `title-cover-copy-generator`，并新增 `save-worthiness-checker`。
5. Recompose workflow: 形成本文件的 23 步 v2 编排。
6. Re-run: 产出 `generated-note.v2.md`。
7. Compare score: 产出 `quality-score.v2.json`，总分从 95 提升到 98。
8. Record evolution event: 产出 `evolution/xhs-ai-tool-topic-to-post-evolution-log.md`。
9. Write to workflow knowledge base if useful: 暂不升级为 verified KB；先等待 human review 或下一次复用验证。

## Human Review Gate

v2 最终状态是 `ready_for_review`。

需要 human review 的原因：

1. 标题更强，需确认不会变成过度承诺。
2. 新增模板提升收藏价值，但需确认小红书语感是否自然。
3. 这次 workflow 改进还没有经过第二次真实发布验证，不应直接写入 verified recipe。

## KB Writeback Decision

本次改进应该记录在 `evolution/`，但暂不写入 verified workflow knowledge base。

原因：

1. v2 分数提升有评分证据。
2. v2 尚未经过 human review。
3. v2 尚未完成第二次发布或复用验证。
4. 因此它是 `evolution_evidence`，不是 `verified_recipe`。
