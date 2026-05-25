# v0.1 MVP Validation Report

## 1. MVP Summary

`awesome-skill-workflows` v0.1 validates a reusable Agent Skill workflow loop. The goal is not to publish one platform-specific post. The goal is to prove that the system can discover skills, compose a workflow, run a scenario, capture evidence, promote verified assets, preserve failed evidence, and reuse the resulting knowledge in a second run.

The current validation scenario is Xiaohongshu AI-tool content publishing. Xiaohongshu is a scenario wrapper, not the long-term product boundary. It is useful because it exercises common content-platform constraints: platform style, title and cover fit, compliance risk, human review, account state, draft or publish handoff, proof capture, and second-run reuse.

## 2. Validated Loop

The current MVP validates this loop:

1. Discover candidate skills from public sources.
2. Normalize candidate skills into structured capability assets.
3. Build a scenario capability map.
4. Compose a workflow for the scenario.
5. Generate content and score it.
6. Capture human review, risk approval, account-state, draft proof, and failed publish evidence.
7. Write reusable workflow, recipe, rubric, failure case, fallback, and prompt assets into the workflow knowledge base.
8. Retrieve the knowledge base in a second scenario run and reuse the workflow shape.

Final scope: `compliant draft MVP`.

Not claimed: live publish MVP.

## 3. Artifact Checklist

| Artifact | Status | Note |
| --- | --- | --- |
| `skills/raw-discovery/github-xhs-skills.md` | present | Public source discovery record. |
| `skills/index.json` | present | 18 normalized skill records. |
| `skills/capability-map.md` | present | Capability map covering the required semantic bundles. |
| `workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md` | present | v0.1 scenario workflow. |
| `runs/001-xhs-ai-agent-save-one-hour/generated-note.md` | present | First generated content package. |
| `runs/001-xhs-ai-agent-save-one-hour/quality-score.json` | present | First run score: 95. |
| `evolution/xhs-ai-tool-topic-to-post-evolution-log.md` | present | Workflow improvement evidence. |
| `runs/001-xhs-ai-agent-save-one-hour/human-review.md` | present | Historical review evidence. |
| `runs/001-xhs-ai-agent-save-one-hour/publish-proof.md` | present | Historical publish-fact evidence that is not compliant publish proof. |
| `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json` | present | Draft rerun proof: `draft_saved`, `compliance_status: passed`. |
| `runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json` | present | Gate ordering evidence for review, risk, account state, and draft action. |
| `failed-recipes/xhs-ai-agent-save-one-hour.recipe.md` | present | Failed live-publish recipe isolated from verified promotion paths. |
| `verified-recipes/xhs-ai-agent-save-one-hour.recipe.md` | present | Draft-verified recipe. |
| `workflow-kb/verified-workflows/xhs-ai-tool-topic-to-post.v1.md` | present | Draft-verified workflow. |
| `workflow-kb/retrieval-index.json` | present | Knowledge-base retrieval index. |
| `runs/002-xhs-meeting-notes-productivity/kb-retrieval.md` | present | Second-run KB retrieval evidence. |
| `runs/002-xhs-meeting-notes-productivity/generated-note.md` | present | Second generated content package. |
| `runs/002-xhs-meeting-notes-productivity/quality-score.json` | present | Second run score: 95. |

## 4. Metrics

| Metric | Value | Evidence |
| --- | ---: | --- |
| discovered source count | 12 | `skills/raw-discovery/github-xhs-skills.md` |
| raw candidate count | 18 | `skills/raw-discovery/raw_skill_candidates.json` |
| normalized skill count | 18 | `skills/index.json` |
| required capability coverage | 13 / 13 | `skills/capability-map.md` |
| workflow step count | 22 base / 23 evolved | `workflows/...workflow.md`, `runs/.../workflow-plan.v2.md` |
| first run score | 95 | `quality-score.json` |
| improved run score | 98 | `quality-score.v2.json` |
| draft rerun status | draft saved / passed | `runs/003.../draft-proof.json` |
| compliance score | 95 first / 96 improved / 92 second | scorecards |
| XHS style score | 90 first / 93 improved / 88 second | scorecards |
| evolution event count | 1 | `evolution/xhs-ai-tool-topic-to-post-evolution-log.md` |
| KB entry count | 10 | `workflow-kb/retrieval-index.json` |
| second run reuse ratio | 80% | `runs/002-xhs-meeting-notes-productivity/kb-retrieval.md` |
| second run score | 95 | `runs/002-xhs-meeting-notes-productivity/quality-score.json` |

## 5. What Is Proven

- Skill discovery and normalization work for the validation scenario.
- The capability map covers the required semantic bundles.
- The scenario workflow can generate and score a content package.
- Self-evolution can be triggered from run evidence.
- Human review and risk approval can be represented as gate evidence.
- Account state is treated as a pre-handoff gate.
- Draft proof and publish fact are separate evidence types.
- Failed publish evidence is preserved without being promoted as verified success.
- Draft-verified workflow and recipe assets exist.
- The second run can retrieve and reuse the knowledge base.

## 6. What Is Not Proven

- Live publish is not verified.
- Human review and risk approval are still manually recorded.
- The current proof chain validates draft save, not compliant live publication.
- The second run validates content reuse, not account-bound platform handoff.

## 7. Risks And Next Steps

- Keep publish fact separate from compliant publish proof.
- Keep failed live-publish assets outside verified namespaces.
- Make gate ledgers more machine-checkable with input hashes, reviewer decisions, allowed actions, and timestamps.
- Treat `human_review_then_draft` and `human_review_then_publish` as non-upgradable modes.
- Split future recipe status into clearer levels such as `content_verified`, `draft_verified`, `publish_fact_verified`, and `compliant_publish_verified`.
- Revalidate the `save-worthiness-checker` across more runs before treating it as a stable workflow improvement.

## Final Verdict

- MVP: pass.
- Pass scope: compliant draft MVP.
- Not claimed: live publish MVP.
- Residual risk: human review and risk approval are manually recorded, and live publish remains unverified.

The v0.1 accepted loop is:

`skill discovery -> normalization -> workflow composition -> content generation -> scoring -> evolution -> compliant draft proof -> KB writeback -> second-run retrieval/reuse`
