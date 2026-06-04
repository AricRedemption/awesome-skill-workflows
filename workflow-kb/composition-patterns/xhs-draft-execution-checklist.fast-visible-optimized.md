# XHS Draft Execution Checklist - Fast Visible Optimized Copy

## Classification

- Type: platform UI execution aid optimized copy
- Scenario: Xiaohongshu creator workflow
- Source checklist: `workflow-kb/composition-patterns/xhs-draft-execution-checklist.md`
- Scope: faster visible Chrome draft-box operation and proof capture
- Not scope: `xhs-mcp` skill validation, MCP tool correctness, skill promotion evidence, automated publish proof, or generic workflow architecture
- Verification status: structure-validated copy; requires a future run record before promotion

## Purpose

This copy keeps the original draft-only handoff contract but removes avoidable
latency from the visible Chrome path.

Use it only when the reviewer wants the draft prepared in their daily visible
Chrome profile. It is still a platform UI operation path, not a reusable skill
validation path.

## Speed Assumptions

Before opening the platform, prepare the run inputs so the browser step does not
pay setup cost:

1. The approved image directory already exists.
2. The directory contains only the intended ordered upload images.
3. No generated intermediate files are present in that directory.
4. The final title, body, and hashtags are ready before editor fill starts.
5. The title and body can be applied directly to the field value, or pasted in
   one operation per field when direct value setting is unavailable.
6. The expected image count is known before the file chooser opens.
7. The prepared image directory contains no non-upload files, so file chooser
   selection can use one `Cmd+A` operation after the file list is focused.
8. The run timer starts only when the browser handoff begins, not while creating
   assets.

If these assumptions are false, fix the prepared inputs first. Do not hide input
setup time inside browser execution timing.

## One-Pass Preconditions

Before opening the platform:

1. Confirm requested mode is `human_review_then_draft`.
2. Confirm `do_not_publish=true`.
3. Confirm human review passed for the exact title, body, images, and hashtags.
4. Confirm risk approval passed.
5. Confirm account state passed for the target browser profile class.
6. Confirm the target profile class is `user_visible_profile`.
7. Tell the reviewer that the draft will be stored in the visible Chrome profile.
8. Keep the browser open after handoff unless the reviewer explicitly asks to close it.

Do not start the draft handoff if the reviewer expects a different browser
profile than the one automation will operate.

## Fast Visible-Browser Path

1. Record `start_time` immediately before opening the creator URL.
2. Open the target image publish URL directly:
   `https://creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image`.
3. Reuse the current visible Chrome window. Set the active tab URL directly when
   possible; do not create a new Chrome window for a normal validation run.
4. If Chrome focus drifts, do not enumerate Chrome tabs. Focus a known active
   Chrome window and set its active tab to the target URL.
5. Avoid full Chrome accessibility-tree scans before navigation. Use the
   minimum visible-state check needed to confirm:
   - Xiaohongshu creator page is loaded,
   - logged-in creator state is visible,
   - `上传图片` is available.
6. Click `上传图片`.
7. In the macOS file chooser:
   - use `Cmd+Shift+G`,
   - enter the prepared image directory,
   - focus the file list by clicking any intended image,
   - send one `Cmd+A` to select every file in the clean prepared directory,
   - the expected selected count is `expected_image_count`,
   - inspect selection once,
   - use `shift+Down` range selection only as a fallback when `Cmd+A` does not
     select the expected count,
   - click `打开`.
8. Wait for the editor to show `图片编辑` and the expected image count, such as
   `4/18`.
9. Record `editor_ready_at` as soon as that editor state is visible.
10. Fill the title field before the body field with the fastest reliable method:
    - prefer direct field-value assignment when the title field is exposed as a
      settable accessibility element,
    - otherwise set the clipboard to the exact title, click the title field, and
      paste once with `Cmd+V`,
    - never paste into a non-empty title field without first confirming or
      replacing the existing value.
11. Fill the body field with final copy and hashtags using the same rule:
    - prefer direct field-value assignment when the body field is exposed as a
      settable accessibility element,
    - otherwise set the clipboard to the exact body, click the body field, and
      paste once with `Cmd+V`,
    - do not rely on Xiaohongshu suggested topic chips as saved body content.
12. After title and body fill, perform at most one editor-state check to verify
    the preview contains the intended title and body hashtags.
13. Click `暂存离开` only.
14. Record `draft_save_clicked_at` when the draft-only action has been clicked
    or when the platform shows the save-success transition.
15. Verify the draft box shows the latest image draft containing:
    - target title,
    - visible save timestamp,
    - image thumbnail.
16. Record `draft_verified_at` only after the title and save timestamp are
    visible in the draft box.
17. Record `clicked_publish=false`.

## Timing Report Contract

Every run using this optimized copy must report:

- `start_time`
- `editor_ready_at`
- `draft_save_clicked_at`
- `draft_verified_at`
- `total_duration_seconds`
- duration from `start_time` to `editor_ready_at`
- duration from `editor_ready_at` to `draft_save_clicked_at`
- duration from `draft_save_clicked_at` to `draft_verified_at`
- `clicked_publish=false`

When timing is slow, classify the bottleneck as one of:

- browser open or focus recovery,
- file chooser navigation,
- file selection,
- upload/editor readiness,
- title/body fill,
- redundant state verification,
- draft save,
- draft-box verification.

## Passing Proof

`draft_saved=true` is allowed only when all of these are true:

- human review passed before draft action,
- risk approval passed before draft action,
- account state passed before draft action,
- live publish was not clicked,
- draft box shows the target title and a visible save timestamp,
- proof records `browser_profile_class=user_visible_profile`,
- proof records `clicked_publish=false`,
- browser remains open after handoff,
- saved body or preview contains intended hashtags when hashtags changed,
- platform-suggested topic chips are not mistaken for body hashtags.

Passing this checklist means the UI handoff evidence is acceptable for the
approved draft mode. It does not mean the underlying Xiaohongshu MCP skill or
any reusable skill asset passed validation.

## Failure Conditions

Mark the run failed, preserve evidence, and do not promote it if:

- the browser profile differs from reviewer expectation,
- Chrome focus drifts and the agent starts operating on a non-Xiaohongshu page,
- the editor is filled but draft-box proof is missing,
- proof only shows preview/editor state but not a saved draft list item,
- latest saved draft cannot be opened or previewed after body/tag changes,
- suggested topic chips are confused with saved body hashtags,
- browser is closed before human inspection without explicit approval,
- publish is clicked in draft mode,
- timing fields are missing or internally inconsistent.

## Sensitive Information Boundary

Do not write account names, cookies, full local profile paths, browser history,
private URLs, or personal identifiers into reusable knowledge. Use generic
labels such as `user_visible_profile` and `prepared_image_directory`.

## Copy Validation Notes

This copy is intentionally narrower than the source checklist:

- It optimizes only the visible Chrome path.
- It keeps `暂存离开` as the only allowed platform action for draft mode.
- It avoids Chrome tab enumeration.
- It reuses the current Chrome window instead of creating duplicate validation
  windows.
- It moves image generation and intermediate-file cleanup outside timed browser
  execution.
- It treats the prepared image directory as a clean upload set and uses one
  `Cmd+A` after focusing the file list; range selection is only a fallback.
- It verifies the file chooser selected count once before `打开`.
- It prefers direct field-value assignment for title and body, falling back to
  one clipboard paste per field only when direct assignment is unavailable.
- It keeps browser window-count inspection outside the timed draft-save path;
  window reuse is enforced by setting the active tab URL, not by opening new
  validation windows during the run.
- It keeps text-entry verification tied to the preview so input-method or
  paste failures are caught before `暂存离开`, with no repeated full state scans
  after text entry unless the first verification fails.

Do not add this copy to the retrieval index or promote it as verified until a
future run stores durable evidence under `runs/` and the relevant validators
pass.
