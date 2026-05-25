# Xiaohongshu Creator Scenario

- scenario_id: `xiaohongshu-creator-v0.1`
- scenario name: `小红书创作者 v0.1`
- platform: `Xiaohongshu`
- account direction: `AI 工具 / 效率提升`
- target users: `职场人、独立创作者、小团队创业者`
- task 001: `普通人如何用 AI Agent 每天省 1 小时`
- task 002: `普通职场人如何用 AI 自动整理会议纪要并减少加班`
- publish mode: `human_review_then_draft_or_publish`

## Description

This scenario validates a Xiaohongshu content workflow for practical AI-tool and productivity content. The workflow must produce human-reviewable outputs, support draft creation when live publishing is not possible, and keep all risky actions behind explicit review.

## Goal

Create useful, platform-native Xiaohongshu content packages that can be reviewed, saved as draft, or published only after human approval.

## Validation Scope

- reference discovery
- audience painpoint extraction
- topic angle generation
- title and cover copy generation
- note drafting
- style checking
- compliance checking
- human feedback intake
- account-state checking
- publish or draft creation
- post-publish verification
- workflow evolution recording
- knowledge-base writeback

## Constraints

- do not auto-publish real content
- human review is required before publish or draft save
- login and authorization state must be checked before publish or draft save
- do not auto-like, comment, or follow
- do not perform large-scale crawling
- do not collect privacy data
- fail into revision when compliance risk is not acceptable
- fall back to draft-only when publish fails

## Success Criteria

- each task can be converted into a reviewable Xiaohongshu draft package
- the title, cover, and note body stay aligned with the target audience
- compliance checks run before any publish or draft action
- account-state checks run before any publish or draft action
- post-publish verification or draft-state verification is recorded
- verified learning is written back into the workflow knowledge base
