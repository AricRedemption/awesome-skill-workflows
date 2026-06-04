# Run Summary: XHS SkillOpt Paper Reproduction Human Published

```yaml
run_id: 010-xhs-skillopt-paper-reproduction-human-published
scenario: xiaohongshu-creator
platform: xiaohongshu
requested_mode: human_review_then_draft
final_observed_state: human_performed_publish
automated_publish_clicked: false
draft_proof_status: not_captured
publish_proof_status: human_reported
created_at: 2026-05-28T10:24:41+08:00
```

## Outcome

The agent prepared the Xiaohongshu image-post editor using the visible Chrome creator profile. The user then manually published the post before an automated draft-box proof was captured.

This run is useful execution evidence, but it is not a verified draft recipe and not verified automated publish proof.

## What Worked

1. Directly opened the image publish URL: `creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image`.
2. Avoided broad Chrome tab enumeration after the safety reviewer rejected it as too privacy-invasive.
3. Created/focused a new target tab instead of searching unrelated tabs.
4. Confirmed the creator image page and visible logged-in state before upload.
5. Uploaded four prepared images from `/private/tmp/xhs-skillopt-post`.
6. Used macOS file chooser fast path: `Cmd+Shift+G` to target directory, ordered multi-select, `打开`.
7. Verified editor transition to `图片编辑` with `4/18` and visible preview.

## Friction

- Chrome had many open windows and repeatedly focused unrelated pages. The reusable fix is to create/focus a target URL directly, not to inspect all windows or tabs.
- The publish handoff moved from draft preparation to user-performed live publish, so the agent did not capture the normal draft-box proof.

## Reusable Lesson

For future visible-browser Xiaohongshu runs, retrieve `workflow-kb/composition-patterns/xhs-draft-execution-checklist.md` and use its fast visible-browser path before starting. Treat manual user publish as `human_performed_publish`; it can be recorded as run evidence, but it must not be promoted as automated draft proof or automated publish proof.

## Sensitive Boundary

No cookies, browser profile paths, personal account identifiers, browser history, or private URLs are stored here.
