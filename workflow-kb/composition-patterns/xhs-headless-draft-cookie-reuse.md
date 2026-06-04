# XHS Headless Draft Cookie Reuse

## Status

- Type: composition pattern
- Scenario: Xiaohongshu creator workflow
- Status: experimental capability evidence, not a verified workflow
- Source runs:
  - `runs/007-xhs-headless-draft-save-cookie-reuse-test`
  - `runs/015-xhs-headless-visible-draft-verification`

## Purpose

This pattern supports Xiaohongshu draft-save handoff in an environment without a visible browser window.

It does not mean browserless HTTP publishing. It still uses a browser engine in headless mode so the creator page can run its JavaScript, upload controls, session checks, and draft action UI.

## Supported Mode

Supported technical path:

1. Human logs in once through an approved login path.
2. `xhs-mcp` persists an authenticated cookie file outside the repository.
3. A headless Chromium/Puppeteer process starts with `headless=true`.
4. The script injects the MCP cookie file into the page session.
5. The script opens the creator publish page.
6. The script verifies account-state and upload UI readiness.
7. The script fills images, title, body, and hashtags.
8. The script clicks the draft-only action area.
9. The script opens the draft box and verifies the target title.
10. The proof records `clicked_publish=false`.

## Executable Entry Point

This experience must be reproduced by running the existing repository script. Do not write a temporary runner, browser script, CDP script, or helper implementation during reproduction.

Required headless reproduction command shape:

```bash
npm install

XHS_DRAFT_REPRO_ACK=save-draft-only \
XHS_VISIBLE_VERIFY=1 \
XHS_SECOND_CHECK_DELAY_MS=60000 \
XHS_DRAFT_TITLE="<unique approved test title>" \
XHS_DRAFT_CONTENT="<approved test body and hashtags>" \
XHS_OUTPUT_DIR="runs/<unique-xhs-headless-draft-run-id>" \
npm run xhs:headless-draft
```

Required executable source:

- Package command: `npm run xhs:headless-draft`
- Headless save and same-profile visible verification: `scripts/reproduce-xhs-headless-draft.mjs`
- Dependency declaration: `package.json` dependency `puppeteer`
- Optional manual visible opener for the same protected profile: `scripts/open-xhs-visible-with-cookie.mjs`

Optional environment handles, when local defaults are not valid:

- `XHS_COOKIE_FILE`: sensitive local MCP/login cookie file handle. Do not print or store the value.
- `XHS_PROFILE_DIR`: sensitive protected browser profile handle. Do not print or store the value.
- `PUPPETEER_EXECUTABLE_PATH`: local Chrome/Chromium executable, if the default Puppeteer browser is unavailable.
- `XHS_PUPPETEER_PACKAGE`: local Puppeteer-compatible package name, if needed by the runtime.
- `XHS_MEDIA_DIR`: directory containing approved non-sensitive test images.

The runner must treat this as the only executable entry point. If `package.json` is missing, `npm install` cannot install the declared dependency, the script is missing, the script cannot be loaded, or the command cannot be run without writing new code, stop with:

```json
{
  "status": "failed",
  "failed_gate": "missing_executable_dependency_or_implementation",
  "clicked_publish": false
}
```

Do not convert this runbook into new code during reproduction. Fixing or changing the executable script is a separate maintenance task, not a valid reproduction.

## Reproduction Environment

The successful path assumes this environment and state:

- Execution mode: `headless_browser`, not `browserless_http`.
- Browser engine: Chromium/Puppeteer or equivalent browser automation that can run the creator page JavaScript.
- Browser visibility: no GUI window is required for the save action, but visible verification must reopen the same protected browser profile, not a different profile with the same cookies.
- Browser profile: protected external profile or equivalent local sensitive state. The full path must not be recorded in durable proof. Xiaohongshu image drafts are browser-profile-local; cookies alone are not enough to make a saved draft appear in another profile.
- Cookie source: MCP/login cookies already created by an approved human login path. Cookie contents and cookie file paths must stay outside git evidence.
- Viewport used by the successful run: desktop-sized headless viewport, `1440x1000`.
- Target page state: creator image-publish page loaded with `target=image`, upload input present, and no login/verification prompt blocking the editor.
- Content state before draft click: images uploaded, title filled, body/hashtags filled, and editor preview/render has had enough time to update.
- Handoff state: either keep the same browser process alive until proof is accepted, or close the headless browser and reopen the same protected profile visibly before handoff proof.

Do not count a reproduction as successful if the browser process exits before either the same-browser draft-box recheck or a same-profile visible-browser recheck passes.

## Executable Preflight

Run preflight before opening the creator editor or changing account state. A reproducer that only reads this file must either produce the sanitized preflight proof below or stop with the exact missing gate.

This section is written as a reusable skill pattern: prove the environment contract first, then prove the scenario binding, then prove the authenticated account state. Do not skip directly to browser automation because a cookie, profile, URL, or upload input happened to exist.

### Generic Environment Contract

For any headless account-bound draft workflow, the runner must prove these non-sensitive facts before upload:

1. **Automation capability**: a real browser engine can run the target web app JavaScript in headless mode. HTTP-only requests do not satisfy this gate.
2. **Execution mode**: the requested run mode is draft-only headless browser automation, not live publish, not browserless API creation, and not a visible-only manual flow.
3. **Executable implementation**: `package.json` declares `npm run xhs:headless-draft`, `puppeteer`, and `scripts/reproduce-xhs-headless-draft.mjs`. Do not create a new implementation.
4. **Sensitive state handles**: the run has opaque handles for any protected local state it must reuse, such as a persistent browser profile and login cookie source. A handle may be discovered by the local runtime, but raw paths, cookie values, account identifiers, and authenticated screenshots must not enter durable proof.
5. **Same-state verification path**: visible verification is enabled with `XHS_VISIBLE_VERIFY=1`, so the existing runner opens a visible browser with the same protected profile used by headless save. Recreating cookies in another profile is not equivalent.
6. **Target surface binding**: the target editor entrypoint, viewport, and expected upload/editor readiness signals are known before the browser step.
7. **Content artifact readiness**: sanitized test content and media exist before account interaction. If the user did not provide media, the runner may generate non-sensitive media with no people, logos, readable text, or account identifiers.
8. **Fast-fail behavior**: if any preflight gate is missing, stop before upload and report the failed gate. Do not continue and turn an environment gap into an account action failure.

### Xiaohongshu Binding

This composition pattern binds the generic contract as follows:

- Browser capability: Chromium, Puppeteer, Playwright, or equivalent browser automation that can start Chrome/Chromium headless.
- Sandbox handling: if the automation package exists but its bundled browser is missing, use a locally installed Chrome/Chromium executable. If local sandboxing blocks Chrome startup, rerun the browser process through the approved non-sandbox execution path instead of changing the workflow.
- Execution mode: `headless_browser` and `draft_only`.
- Protected state: one persistent protected browser profile handle and one MCP/login cookie source handle. The same profile handle must be reused for visible-browser verification.
- Target surface: `https://creator.xiaohongshu.com/publish/publish?target=image`.
- Viewport: `1440x1000`.
- Editor readiness: at least one `input[type=file]` exists and no login, QR-code login, verification, or account-safety prompt blocks the editor.

Recommended preflight proof:

```json
{
  "preflight": {
    "browser_engine_available": true,
    "headless_chrome_start_pass": true,
    "package_json_available": true,
    "dependency_install_command": "npm install",
    "puppeteer_dependency_available": true,
    "package_command": "npm run xhs:headless-draft",
    "executable_entrypoint": "scripts/reproduce-xhs-headless-draft.mjs",
    "executable_entrypoint_available": true,
    "temporary_runner_created": false,
    "execution_mode": "headless_browser",
    "draft_only_mode": true,
    "protected_profile_handle_available": true,
    "cookie_source_handle_available": true,
    "same_profile_required_for_visible_check": true,
    "test_image_available": true,
    "creator_entrypoint": "https://creator.xiaohongshu.com/publish/publish?target=image",
    "viewport": "1440x1000",
    "failed_gate": null,
    "profile_path_recorded": false,
    "cookie_path_recorded": false,
    "cookie_contents_recorded": false
  }
}
```

If `package_json_available=false`, `puppeteer_dependency_available=false`, `executable_entrypoint_available=false`, `protected_profile_handle_available=false`, or `cookie_source_handle_available=false`, do not continue. A visible browser opened with a different profile is not valid proof.

### Cookie Source Check

The runner must resolve an approved MCP/login cookie source before opening the editor.

Allowed resolution methods:

1. Use an explicit sensitive handle provided by the local environment, if one exists.
2. Otherwise, discover a local MCP/login cookie source outside the repository by looking only for a parseable cookie container that includes Xiaohongshu creator cookies. The proof may record cookie source class, cookie count, and domain class. It must not record cookie values, cookie names, or the cookie file path.

Required cookie proof:

```json
{
  "cookie_check": {
    "cookie_source_class": "mcp_cookie_file",
    "cookie_source_available": true,
    "cookie_domains_include_xiaohongshu": true,
    "cookie_contents_recorded": false,
    "cookie_path_recorded": false
  }
}
```

If `cookie_source_available=false`, stop before opening the editor and report `failed_missing_cookie_source`.

### Account-State Check

Account-state check is not an environment check. Run it only after the generic environment contract and cookie source check pass.

After injecting cookies into the protected profile, open the creator entrypoint and verify account state before uploading:

1. The page must load the creator image-publish editor at `target=image`.
2. At least one `input[type=file]` upload control must be present.
3. No login, QR-code login, verification, or account-safety prompt may block the editor.
4. The proof must not include account name, avatar, user id, screenshots of authenticated UI, raw DOM dumps, or cookies.

Required account proof:

```json
{
  "account_check": {
    "account_state_pass": true,
    "upload_ui_ready": true,
    "login_or_verification_prompt_blocking": false,
    "account_name_recorded": false,
    "auth_screenshot_recorded": false
  }
}
```

If `account_state_pass=false` or `upload_ui_ready=false`, stop before upload and report `failed_account_or_upload_not_ready`.

## Evidence From Run 007

Run 007 produced this result:

- `server_headless_persistent_cookie_profile`: `draft_saved`
- `clicked_publish`: `false`
- `headless`: `true`
- draft box detected: `true`
- target title found in draft box: `true`

The stricter rerun used a unique title and proved that the draft-save action is visible in the same live headless session, but the same title was not verified after the headless browser process closed and reopened:

- `server_headless_persistent_cookie_profile_reopen`: `persisted_draft_not_verified_after_reopen`
- `external_persistent_profile` reopen verification: `saved_draft_visible_after_reopen=false`
- `headless_same_browser_live_session` 60-second recheck: `saved_draft_visible_in_same_browser=true`

Therefore run 007 can be used as evidence that a no-visible-window draft-save action is possible as a live-session handoff. It did not prove post-restart visibility.

## Evidence From Run 015

Run 015 fixed the proof gap from run 007 by using the same protected browser profile for the headless save and the visible-browser recheck. It also fixed the draft-box navigation by opening `草稿箱` and switching to the `图文笔记` tab before checking the unique title.

Run 015 produced this result:

- `status`: `draft_saved_verified_visible_browser`
- `clicked_publish`: `false`
- first same-browser check: `draftbox_count=1`, `image_draft_count=1`, `title_found_in_draftbox=true`
- second same-browser check after delay: `draftbox_count=1`, `image_draft_count=1`, `title_found_in_draftbox=true`
- visible-browser recheck after closing the headless browser: `draftbox_count=1`, `image_draft_count=1`, `title_found_in_draftbox=true`
- sensitive proof fields: `cookie_contents_recorded=false`, `profile_path_recorded=false`

The important lesson is that Xiaohongshu web drafts are local to the browser profile. A visible browser opened with the same cookies but a different profile can still show `草稿箱(0)`. A visible browser opened with the same protected profile and injected cookies can see the saved image draft after switching to `图文笔记`.

## Current Fix Strategy

Treat headless draft save as a profile-bound browser workflow:

1. Start a dedicated headless browser process with a persistent, protected profile.
2. Inject MCP cookies at session start.
3. Save the draft and verify `草稿箱 -> 图文笔记` in the same live session.
4. For human inspection, close the headless process only after proof is written, then reopen a visible browser with the same protected profile and injected cookies.
5. Verify the same unique title under `草稿箱 -> 图文笔记` in the visible browser.

For server operation, the supported improvement path is a managed profile-bound browser session, optionally with remote debugging or a controlled screenshot/proof endpoint. A different profile with the same cookies is not an equivalent handoff target.

A protected external persistent profile is required for durable local draft visibility across headless and visible browser modes. Cookie reuse is still required for login/session state, but cookie reuse alone does not carry browser-local drafts across profiles.

## Evidence From 2026-05-28 Reproduction

A later reproduction confirmed the run 015 path with a unique test title, generated non-sensitive image, MCP cookie reuse, a protected same-profile headless session, and same-profile visible-browser verification.

Sanitized result:

- `status`: `draft_saved_verified_visible_browser`
- `mode`: `headless_same_profile_visible_browser`
- `clicked_publish`: `false`
- `headless`: `true`
- `account_state_pass`: `true`
- `upload_ui_ready`: `true`
- first same-browser check: `draftbox_detected=true`, `image_draft_count=1`, `title_found_in_draftbox=true`
- second same-browser check after delay: `draftbox_detected=true`, `image_draft_count=1`, `title_found_in_draftbox=true`
- visible-browser same-profile check: `draftbox_detected=true`, `image_draft_count=1`, `title_found_in_draftbox=true`
- sensitive proof fields: `cookie_contents_recorded=false`, `profile_path_recorded=false`

The failed attempt immediately before the successful reproduction is also useful negative evidence: clicking a percentage inside an inferred bottom component did not produce valid same-profile visible-browser title verification. The successful reproduction used the known left-side draft area at the `1440x1000` viewport, then relied on `草稿箱 -> 图文笔记 -> unique title` as the success gate. This means the coordinate is evidence for locating the draft action surface, not a reusable success proof by itself.

## Successful Experience Runbook

Use this as the reusable successful path for no-GUI Xiaohongshu draft handoff:

1. Prepare a sanitized content package and images outside the browser.
2. Confirm human review, risk approval, requested mode, and `do_not_publish=true` before any account-state-changing action. For a test reproduction where the user explicitly asks the agent to generate a non-sensitive test topic and image, that instruction may satisfy this gate only if the runner records the generated title, body, image class, and hashtags as approved test content without recording sensitive account data.
3. Run the executable preflight above and confirm `package.json`, `puppeteer`, `npm run xhs:headless-draft`, and `scripts/reproduce-xhs-headless-draft.mjs` are available. If not, stop with `missing_executable_dependency_or_implementation`.
4. Run the cookie source check above and inject MCP cookies from local sensitive state; never write cookie contents into run evidence.
5. Execute `npm run xhs:headless-draft` as shown in `Executable Entry Point` with `XHS_VISIBLE_VERIFY=1` and a unique `XHS_OUTPUT_DIR`.
6. Use the runner output proof at `<XHS_OUTPUT_DIR>/headless-live-session-proof.json` as the reproduction evidence.
7. Require the proof to show `clicked_publish=false`, same-browser first check, same-browser second check after `60000ms`, and same-profile visible-browser title verification.
8. Record only sanitized proof fields: `headless=true`, `clicked_publish=false`, `draftbox_detected=true`, `image_draft_count`, `title_found_in_draftbox=true`, whether this was a same-browser live-session check, and whether same-profile visible-browser verification passed.

Do not mark the run successful if the only proof is editor-filled state, `草稿箱(n)` without title verification, a stale draft title, or a proof captured in a different browser profile.

## Draft Box Navigation

After the draft action, the page may show `草稿箱(1)` while still displaying the editor or the default video-draft subtab.

Safe verification rule:

1. Click the shortest visible node matching `草稿箱(<number>)`.
2. After the draft box opens, click the shortest visible node matching `图文笔记(<number>)`.
3. Only then search for the unique title.
4. Treat `视频笔记(0)` plus `暂无草稿` as the wrong subtab, not as proof that the image draft is missing.
5. Treat `草稿箱(1)` without title verification as insufficient proof.

## Draft Action Identification

The draft action is the most important reproduction detail.

In the successful environment, the bottom action surface can render as one `xhs-publish-btn` composite component:

- The component box may cover both the left draft action and the right publish action.
- The DOM may not expose a separate button whose text is `存草稿`, `暂存离开`, or similar.
- The component may expose `is-publish="true"` even though the left side of the same visual component is the draft-only action.

Therefore, do not require an independent draft DOM node as the only valid reproduction path.

Safe draft-action identification ladder:

1. Prefer a clear draft-only DOM target if one exists.
2. If no draft DOM target exists, identify the bottom action surface at runtime. Prefer a visible bottom `xhs-publish-btn` bounding box when present; otherwise locate the visible bottom action container that covers the draft/publish action area.
3. Click the left-side draft segment of the runtime action surface, not a hard-coded page coordinate.
4. Use the known successful `1440x1000` point around `x=602, y=955` only as a calibration seed for finding or sanity-checking the bottom action surface. Do not record it as the primary click strategy and do not treat the coordinate click itself as proof.
5. Do not click the right-side publish action area.
6. Treat the click as successful only if the draft box opens, the `图文笔记` tab is selected, and the unique target title appears.
7. If the title does not appear in the draft box, mark the run failed even if the editor was filled.

The known successful click evidence used the bottom action surface and a left-side draft coordinate around `x=602, y=955` with a `1440x1000` viewport. Future reproductions should report a runtime click basis such as `explicit_draft_dom`, `bottom_action_surface_left_segment`, or `calibrated_left_draft_area`, rather than only reporting a global coordinate. They must preserve the same safety property: left draft side only, never right publish side.

The presence of `is-publish="true"` on `xhs-publish-btn` is not sufficient by itself to classify the entire composite component as publish-only. It is a warning signal that must be handled with the composite-button rule above.

Recommended sanitized click proof fields:

```json
{
  "draft_click_strategy": "bottom_action_surface_left_segment",
  "viewport": "1440x1000",
  "global_coordinate_recorded": false,
  "action_surface_detected": true,
  "draft_click_target_basis": "runtime_action_surface_bounding_box",
  "composite_left_side_rule_used": true,
  "clicked_publish": false,
  "success_gate": "draftbox_image_tab_unique_title"
}
```

Do not store a screenshot of the account page or a raw DOM dump if it exposes account identity. Use booleans, counts, and sanitized strategy labels.

## Timing And Wait Optimization

The successful reproduction can be slow if it relies on fixed sleeps. Keep the required second draft-box recheck delay, but replace other fixed waits with condition-based waits wherever possible.

Recommended timing fields:

```json
{
  "timing_ms": {
    "total": 0,
    "page_ready": 0,
    "upload_and_fill": 0,
    "draft_click_to_first_check": 0,
    "second_check_delay": 60000,
    "second_check_navigation": 0,
    "visible_browser_check": 0
  }
}
```

Use these fields for performance comparison only. They are not proof that the draft was saved.

Condition waits should replace fixed waits for:

- creator page readiness: wait until `input[type=file]` exists and no login or verification prompt blocks the editor.
- upload completion: wait until the image upload UI shows a stable uploaded/preview state, or until the title/body fields remain editable after the image is attached.
- editor fill completion: wait until the unique title is visible in the editor state before clicking draft.
- draft action completion: wait until `草稿箱` becomes visible or the page state changes toward the draft box.
- draft-box navigation: wait until the shortest visible `草稿箱(<number>)` node is clickable, then wait until the shortest visible `图文笔记(<number>)` node is clickable.
- visible-browser verification: wait only until the same protected profile shows `草稿箱 -> 图文笔记 -> unique title`.

Do not shorten the `second_check_same_browser_after_ms` value below `60000` unless new evidence explicitly changes the success contract. The speed target is to remove unnecessary waits around page readiness, upload, editor fill, draft-box navigation, and visible-browser verification, not to weaken the recheck gate.

## Successful Evidence Contract

The current successful evidence is:

```json
{
  "mode": "headless_same_profile_visible_browser",
  "preflight": {
    "browser_engine_available": true,
    "headless_chrome_start_pass": true,
    "execution_mode": "headless_browser",
    "draft_only_mode": true,
    "protected_profile_handle_available": true,
    "cookie_source_handle_available": true,
    "same_profile_required_for_visible_check": true,
    "test_image_available": true,
    "failed_gate": null,
    "profile_path_recorded": false,
    "cookie_path_recorded": false,
    "cookie_contents_recorded": false
  },
  "cookie_check": {
    "cookie_source_available": true,
    "cookie_domains_include_xiaohongshu": true,
    "cookie_contents_recorded": false,
    "cookie_path_recorded": false
  },
  "account_check": {
    "account_state_pass": true,
    "upload_ui_ready": true,
    "login_or_verification_prompt_blocking": false,
    "account_name_recorded": false,
    "auth_screenshot_recorded": false
  },
  "clicked_publish": false,
  "draft_click_strategy": "bottom_action_surface_left_segment",
  "global_coordinate_recorded": false,
  "first_check": {
    "draftbox_detected": true,
    "image_draft_count": 1,
    "title_found_in_draftbox": true
  },
  "second_check_same_browser_after_ms": 60000,
  "second_check": {
    "draftbox_detected": true,
    "image_draft_count": 1,
    "title_found_in_draftbox": true
  },
  "visible_browser_check": {
    "draftbox_detected": true,
    "image_draft_count": 1,
    "title_found_in_draftbox": true
  },
  "saved_draft_visible_in_same_browser": true,
  "rechecked_after_browser_restart": true,
  "timing_ms": {
    "total": 0,
    "page_ready": 0,
    "upload_and_fill": 0,
    "draft_click_to_first_check": 0,
    "second_check_delay": 60000,
    "second_check_navigation": 0,
    "visible_browser_check": 0
  }
}
```

This is successful no-GUI draft handoff evidence with same-profile visible-browser verification. It is not successful live publish evidence and not browserless HTTP evidence.

## Failure Evidence From Reproduction Attempt

A later reproduction attempt failed because it required a separate draft-only DOM control and refused to use the composite-button left-side rule. The page had:

- upload input present,
- title/body filling passed,
- one visible bottom `xhs-publish-btn`,
- no publish click,
- no independent draft-only DOM node discovered.

This is a documentation gap in this pattern, not proof that headless draft save is impossible. A reproducer must implement the composite-button rule and then rely on draft-box title verification as the success gate.

## Required Gates

Before using this pattern:

1. Human review must pass for the exact title, body, images, and hashtags.
2. Risk approval must pass.
3. Requested mode must be `human_review_then_draft`.
4. `do_not_publish=true` must be recorded.
5. Account-state must pass before upload or draft action.
6. The runner must confirm this is `headless_browser`, not `browserless_http`.

For test reproduction, a user instruction that explicitly authorizes agent-generated non-sensitive test content can satisfy gates 1-4. The runner must still record the exact generated content package as test-approved before opening the account page, keep `clicked_publish=false`, and stop if the user did not approve draft-only account interaction.

## Proof Requirements

The proof must include:

- `headless=true`
- `clicked_publish=false`
- draft-only mode
- human review, risk approval, requested mode, and `do_not_publish=true` gate result
- executable preflight result, including any `failed_gate`
- cookie source check result
- cookie source class such as `mcp_cookie_file`, without cookie contents or paths
- account-state check result
- draft box detected
- target title found in draft box
- whether the draft was rechecked after browser restart
- whether the headless browser session was kept alive for handoff
- no account names, cookies, personal identifiers, or profile paths
- if `xhs-publish-btn` was used, whether the composite-button left-side draft rule was used
- first same-browser draft-box check result
- second same-browser draft-box check result after a delay
- image-draft tab count and title check after opening `草稿箱 -> 图文笔记`
- visible-browser check result using the same protected profile, if human inspection is required

## Known Limitation

The current evidence proves a same-run headless draft-save, same-browser `图文笔记` draft-box checks, and same-profile visible-browser verification after closing the headless browser.

It does not yet prove:

- the saved draft is visible in the user's daily GUI browser,
- live publish,
- pure HTTP draft creation without a browser engine.

It also does not prove that a different browser profile with the same cookies can see the draft. Current evidence shows the opposite: the draft is browser-profile-local.

## Promotion Rule

Do not promote this pattern to `verified-recipes/` or `workflow-kb/verified-workflows/` until a future run proves:

1. headless draft save passes,
2. the same draft remains visible after reopening the same protected profile and switching to `图文笔记`,
3. human review and risk approval occurred before the draft action,
4. `clicked_publish=false`,
5. proof contains no sensitive cookie, account, or profile data.
