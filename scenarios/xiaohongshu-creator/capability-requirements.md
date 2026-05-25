# Capability Requirements

## Required Capabilities

These are the 13 semantic capability bundles the Xiaohongshu v0.1 scenario must support.

| semantic capability | implementation mapping | requirement note |
| --- | --- | --- |
| xhs-search / reference discovery | `xhs-reference-discovery` -> `content-research` | Find usable references and platform signals before topic selection. |
| audience-painpoint-extraction | `audience-painpoint-extraction` | Turn references into audience pains, hooks, and need states. |
| topic-angle-generation | `topic-angle-generation` -> `topic-generation` | Produce angles that fit the target audience and task framing. |
| title-cover-copy-generation | `title-generation` + `cover-copy-generation` | Title and cover must be generated together so the hook is coherent. |
| xhs-note-writing | `note-writing` | Draft the Xiaohongshu note body and package it for review. |
| xhs-style-checking | `platform-style-rewrite` + `quality-scoring` | Check platform tone, readability, and local fit before promotion. |
| compliance-risk-checking | `compliance-checker` | Block content that violates platform or safety expectations. |
| human-feedback-intake | `evolution-recording` | Normalize reviewer approval, change requests, and hold decisions into structured run evidence. |
| account-state-check | `post-verification` | Confirm login and authorization state before draft or publish handoff. |
| publish / draft creation | `publish-draft-creation` | Create a draft package or publish package only after review. |
| post-publish-verification | `post-verification` | Confirm the resulting post or draft state after human approval. |
| workflow-evolution-recording | `evolution-recording` | Record what worked, what failed, and what should change next. |
| knowledge-base-writeback | `knowledge-base-writeback` | Persist verified learning into the workflow knowledge base. |

## Optional Capabilities

- `engagement-hook-generation`
- `hashtag-generation`
- `source-intake-and-discovery`
- `workflow-improvement`
- `skill-discovery`
- `login-status-check`

## Risk-Sensitive Capabilities

- `compliance-checker`
- `note-writing`
- `human-feedback-intake`
- `account-state-check`
- `publish-draft-creation`
- `post-verification`
- `quality-scoring`
- `knowledge-base-writeback`

## Minimum Workflow Path

1. `xhs-search / reference discovery`
2. `audience-painpoint-extraction`
3. `topic-angle-generation`
4. `title-cover-copy-generation`
5. `xhs-note-writing`
6. `xhs-style-checking`
7. `compliance-risk-checking`
8. `quality-scoring` gate
9. human review
10. `human-feedback-intake`
11. `account-state-check`
12. `publish / draft creation`
13. `post-publish-verification`
14. `workflow-evolution-recording`
15. `knowledge-base-writeback`

## Scoring Dependency

`quality-scoring` is the promotion gate between content assembly and publish/draft packaging. It runs after style and compliance checks. If the score fails the threshold, the workflow must return to revision instead of advancing.

## KB Writeback Dependency

`workflow-evolution-recording` must happen only after a verified run or an accepted draft state. `knowledge-base-writeback` depends on that recording, plus the human-review result and the post-publish or draft verification result.
