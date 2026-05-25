# Evolution Note: Login-First Publishing Gap

## Run
- `runs/001-xhs-ai-agent-save-one-hour`
- Scenario: `小红书创作者 v0.1`
- Topic: `普通人如何用 AI Agent 每天省 1 小时`

## Human Review Feedback
- 这次内容生成里对小红书发帖的账号登录前置条件考虑不够靠前，容易让发布建议看起来默认账号已经可用。

## Failure Case
- 发布建议虽然提到了登录，但没有把“先登录账号 / 完成授权 / 再保存草稿或发布”作为明确前置门槛。

## Improvement Candidate
- 在内容生成链路中增加 `account-state-check` 前置检查，并把它作为独立步骤而不是发布建议附注。
- 在 `publish建议` 和 `风险提示` 中显式区分：
  - 未登录
  - 已登录但未授权
  - 可保存草稿
  - 可进入发布

## Reusable Pattern
- 任何涉及平台发布的内容包，都应先输出账号状态前提，再输出内容建议。
- 发布建议不能默认“已登录”，必须显式写出账号门槛。
