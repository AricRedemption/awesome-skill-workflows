# Reused Workflow Plan

## Reused Workflow ID

- Primary workflow: `xhs-ai-tool-topic-to-post.v1`
- Supporting pattern: `content-platform-posting-pattern`
- Rubric: `xhs-content-rubric`

## Reused Step List

1. KB-backed skill/workflow retrieval.
2. Scenario capability mapping.
3. Workflow composition with explicit gates and fallbacks.
4. Topic angle generation.
5. Audience pain point extraction.
6. Title and cover copy generation.
7. Xiaohongshu note writing.
8. Xiaohongshu style rewrite.
9. Save-worthiness check.
10. Hashtag generation.
11. Engagement hook generation.
12. Compliance risk check.
13. Quality scoring.
14. Human review gate.
15. Account-state gate as a precondition for future handoff.
16. Approved-mode-only handoff rule.
17. KB writeback.

## Modified Step List

1. Discovery is replaced by retrieval from `workflow-kb/retrieval-index.json`.
2. Topic generation is constrained to "AI 自动整理会议纪要并减少加班".
3. Compliance check adds workplace confidentiality and meeting-recording consent risks.
4. Handoff execution is not performed because this run is content package only.
5. Verification records content generation and scoring only, not publish proof.

## New Topic Adaptation

- Original reusable angle: ordinary users use AI Agent to save one hour daily.
- New angle: ordinary employees use AI to turn meeting audio, transcripts, and scattered action items into a usable meeting note, task list, and follow-up message.
- Reader pain: meetings end late, notes are messy, action items are unclear, and people spend after-hours time rewriting records.
- Promise boundary: reduce repetitive整理 work, not guarantee zero overtime.
- Safety boundary: remove confidential content before using external AI tools.

## Selected Skills

- `source-intake-and-discovery`: used only to interpret existing KB records, not to restart discovery.
- `topic-generation`: reused for topic angle selection.
- `audience-painpoint-extraction`: reused for workplace pain mapping.
- `title-generation`: reused for title candidates.
- `cover-copy-generation`: reused for cover copy.
- `note-writing`: reused for draft body.
- `platform-style-rewrite`: reused for Xiaohongshu tone.
- `hashtag-generation`: reused for metadata.
- `compliance-risk-checker`: reused with added confidentiality checks.
- `quality-scoring`: reused with `xhs-content-rubric`.
- `workflow-kb-writer`: reused for this second-run writeback.

## Fallback

- If KB retrieval fails, stop and report missing workflow evidence instead of starting from scratch.
- If title and cover feel too broad, return to pain point extraction and make the meeting-note scenario more specific.
- If compliance risk is high because the copy encourages uploading confidential meeting data, revise the note to include anonymization and local/company-approved tool constraints.
- If score is below 80, revise the body before any handoff.
- If future draft or publish is requested, require human review and account-state precheck before platform action.

## Scoring Criteria

- `total_score >= 80`
- `compliance_score >= 85`
- `xhs_style_fit >= 80`
- The note must include a copyable meeting-note prompt/template.
- The note must avoid unsupported claims such as "permanently eliminate overtime".
- The note must separate content quality pass from publish readiness.

## Human Review Gate

Current run status: `content_package_ready_for_human_review`.

Human review is required before any draft or publish action. A reviewer should check:

1. Whether the advice is realistic for normal employees.
2. Whether the confidentiality warning is strong enough.
3. Whether the title over-promises overtime reduction.
4. Whether the template can be copied and used immediately.
