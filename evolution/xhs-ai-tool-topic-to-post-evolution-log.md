# XHS AI Tool Topic To Post Evolution Log

## v0.1 Initial Workflow

- Version: `v0.1`
- Scenario: `小红书创作者 v0.1`
- Run: `runs/001-xhs-ai-agent-save-one-hour`
- Initial scorecard: `runs/001-xhs-ai-agent-save-one-hour/quality-score.json`
- Initial output: `runs/001-xhs-ai-agent-save-one-hour/generated-note.md`
- Initial workflow: `runs/001-xhs-ai-agent-save-one-hour/workflow-plan.md`
- Latest published evidence:
  - Title: `别再囤Skill了`
  - noteId: `6a139f0d0000000037035783`
  - Link: `https://www.xiaohongshu.com/explore/6a139f0d0000000037035783`
  - Status: public
  - Verification source: `xhs-mcp usernote list -l 5` returned the current account note list successfully.

The v0.1 workflow already passed numeric scoring after the account-state workflow gap was resolved. It still left one useful MVP self-evolution opportunity: the content was good enough to publish, but the output could be more reusable and more save-worthy. The improvement below is intentionally workflow-level, not only copy editing.

## Self-Evolution Loop

1. Run workflow: executed the v0.1 XHS topic-to-post workflow and produced `generated-note.md`.
2. Evaluate output: `quality-score.json` scored 95/100 and marked content quality as passed.
3. Diagnose failure or improvement gap: title/cover clickability and save value were both strong but not maximal; the note had useful advice but lacked a compact copyable Agent task template.
4. Search better skill or adjust workflow: selected a workflow adjustment using existing `title-cover-copy-generator`, `xhs-style-rewriter`, and a new explicit `save-worthiness-checker` gate.
5. Recompose workflow: inserted `save-worthiness-checker` after `xhs-style-rewriter` and before `quality-scorer`; strengthened `title-cover-copy-generator` to require 3 title variants and a save-oriented cover line.
6. Re-run: produced `workflow-plan.v2.md`, `generated-note.v2.md`, and `quality-score.v2.json`.
7. Compare score: score increased from 95 to 98.
8. Record evolution event: this file records the workflow change and comparison.
9. Write to workflow knowledge base if useful: do not promote to verified KB yet; keep as an evolution event until a human reviewer confirms the v2 content or the pattern repeats in another run.

## Evolution Events

### Event 1: Save-Worthiness And Title-Cover Strengthening

- version: `v0.2`
- timestamp: `2026-05-25T11:18:00+08:00`
- trigger: `MVP self-evolution proof even though Step 6 numeric score passed`
- problem_detected:
  - `title_cover_clickability` was 14/15, so the title was good but not the strongest possible hook.
  - `save_value` was 9/10, because the note gave advice but did not yet include a compact copyable Agent task template.
  - The workflow had no explicit save-worthiness gate between platform rewrite and quality scoring.
- previous_workflow:
  - `xhs-topic-generator`
  - `audience-painpoint-extractor`
  - `title-cover-copy-generator`
  - `xhs-note-writer`
  - `xhs-style-rewriter`
  - `hashtag-generator`
  - `engagement-hook-generator`
  - `compliance-risk-checker`
  - `quality-scorer`
  - `human-review-gate`
  - `human-feedback-intake`
  - `account-state-check`
  - `xhs-publish-or-draft`
  - `post-publish-verifier`
  - `evolution-recorder`
  - `workflow-kb-writer`
- change_made:
  - Strengthened `title-cover-copy-generator` so it must produce three title candidates and select the one with the clearest click reason.
  - Added `save-worthiness-checker` before `quality-scorer`.
  - Required the note body to include one copyable Agent task template when the topic is productivity or workflow education.
  - Required `quality-scorer` to compare v1 and v2 scorecards before marking the evolution event complete.
- reason: `The workflow needed a visible self-evolution step that improves reusable reader value without increasing compliance risk or changing the publishing contract.`
- score_before:
  - total_score: 95
  - title_cover_clickability: 14
  - save_value: 9
  - compliance_score: 95
  - xhs_style_fit: 90
- score_after:
  - total_score: 98
  - title_cover_clickability: 15
  - save_value: 10
  - compliance_score: 96
  - xhs_style_fit: 93
- status: `improved`
- final_state: `ready_for_review`
- rollback_or_fallback: `Not needed because score_after is greater than score_before. If human review rejects the stronger hook, fall back to v0.1 title and keep the save-worthiness template only.`
- workflow_knowledge_base_writeback: `Not promoted yet. This should be written to the workflow knowledge base only after human review or a second run verifies that the save-worthiness gate consistently improves output quality.`

## Result

- score_before: `95`
- score_after: `98`
- score_delta: `+3`
- final_status: `ready_for_review`
- human_review_required: `true`
- human_review_reason: `The v2 copy changes the title/cover and adds a reusable task template, so a reviewer should confirm platform fit before reuse or promotion to the workflow knowledge base.`
