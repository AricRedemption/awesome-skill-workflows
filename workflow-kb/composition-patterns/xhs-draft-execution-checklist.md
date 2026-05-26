# XHS Draft Execution Checklist

## Purpose

This is the execution checklist for making the Xiaohongshu draft workflow work in one pass after content, images, review, and risk approval are ready.

It is an execution-layer companion to the verified content workflow. It must be retrieved before any Xiaohongshu draft handoff.

## One-Pass Preconditions

Before opening the platform:

1. Confirm requested mode is `human_review_then_draft`.
2. Confirm `do_not_publish=true`.
3. Confirm human review passed for the exact title, body, images, and hashtags.
4. Confirm risk approval passed.
5. Confirm the target browser profile class:
   - `automation_profile` if the draft only needs to be visible in the automation browser.
   - `user_visible_profile` if the human must see the draft in their daily browser.
   - `headless_browser` if the run can use a browser engine without a visible window.
6. Tell the reviewer which profile class will contain the draft before handoff.
7. Keep the browser open after handoff unless the reviewer explicitly asks to close it.

If the reviewer asks for a server or no-GUI run, clarify that the supported experimental path is `headless_browser`, not `browserless_http`.

Do not start the draft handoff if the reviewer expects a different browser profile than the one the automation will use.

## Execution Steps

1. Open the Xiaohongshu creator image-publish page in the approved browser profile.
2. Confirm the creator page is logged in and ready before upload.
3. Upload images.
4. Fill title.
5. Fill body and hashtags.
6. Verify the editor preview contains the intended body hashtags.
7. Click the draft-only action such as `暂存离开`; never click publish in draft mode.
8. Open the draft box.
9. Verify the latest draft list item contains:
   - target title,
   - current run save timestamp,
   - image thumbnail.
10. Open or preview the latest saved draft when body content, hashtags, or images changed.
11. Verify body hashtags separately from Xiaohongshu suggested topic chips.
12. Capture screenshot and proof JSON.
13. Leave the browser open for human inspection.

For `headless_browser`, replace the visible-browser inspection step with a machine proof plus an explicit caveat:

- the browser engine still runs in the background,
- the proof must show `headless=true`,
- the proof must show `clicked_publish=false`,
- the proof must state whether the draft remains visible after reopening the same persistent profile.

## Passing Proof

`draft_saved=true` is allowed only when all of these are true:

- human review passed before draft action,
- risk approval passed before draft action,
- account state passed before draft action,
- live publish was not clicked,
- draft box shows the target title and a visible save timestamp,
- proof records the browser profile class,
- the browser remains open after handoff,
- if hashtags changed, the saved draft body or preview contains the intended hashtags,
- platform-suggested topic chips are not mistaken for body hashtags.

For `headless_browser`, same-run draft proof is only experimental until post-restart draft visibility is also proven.

## Failure Conditions

Mark the run failed, preserve evidence, and do not promote it if:

- the browser profile differs from the reviewer expectation,
- the editor is filled but the draft box proof is missing,
- the proof only shows preview/editor state but not a saved draft list item,
- the latest saved draft cannot be opened or previewed after body/tag changes,
- suggested topic chips are confused with saved body hashtags,
- the browser is closed before human inspection without explicit approval.
- a `browserless_http` request is treated as supported without verified evidence.

## Sensitive Information Boundary

Do not write account names, cookies, full local profile paths, browser history, private URLs, or personal identifiers into reusable knowledge. Use generic labels such as `automation_profile` and `user_visible_profile`.
