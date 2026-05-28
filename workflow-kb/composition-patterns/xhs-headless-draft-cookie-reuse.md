# XHS Headless Draft Cookie Reuse

## Status

- Type: composition pattern
- Scenario: Xiaohongshu creator workflow
- Status: experimental capability evidence, not a verified workflow
- Source run: `runs/007-xhs-headless-draft-save-cookie-reuse-test`

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

## Reproduction Environment

The successful path assumes this environment and state:

- Execution mode: `headless_browser`, not `browserless_http`.
- Browser engine: Chromium/Puppeteer or equivalent browser automation that can run the creator page JavaScript.
- Browser visibility: no GUI window is required, but one browser process must remain alive through draft save and same-session verification.
- Browser profile: protected external profile or equivalent local sensitive state. The full path must not be recorded in durable proof.
- Cookie source: MCP/login cookies already created by an approved human login path. Cookie contents and cookie file paths must stay outside git evidence.
- Viewport used by the successful run: desktop-sized headless viewport, `1440x1000`.
- Target page state: creator image-publish page loaded with `target=image`, upload input present, and no login/verification prompt blocking the editor.
- Content state before draft click: images uploaded, title filled, body/hashtags filled, and editor preview/render has had enough time to update.
- Handoff state: keep the same browser process alive until proof is accepted.

Do not count a reproduction as successful if the browser process exits before the same-browser draft-box recheck.

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

Therefore this pattern can be used as evidence that a no-visible-window draft-save action is possible only as a live-session handoff. It must not be promoted as a fully verified server workflow until post-restart draft visibility is proven.

## Current Fix Strategy

Treat headless draft save as a long-running browser-session workflow:

1. Start a dedicated headless browser process with a persistent, protected profile.
2. Inject MCP cookies at session start.
3. Save the draft and verify the draft box in the same live session.
4. Keep the headless browser process alive until the human or downstream verifier explicitly accepts the proof.
5. Do not close and reopen the browser as part of the success path until post-restart persistence is separately proven.

For server operation, the supported improvement path is a managed live browser session, optionally with remote debugging or a controlled screenshot/proof endpoint. The current evidence does not support a close-and-reopen batch job as a verified draft handoff.

A protected external persistent profile is still useful for login/session reuse, but current evidence shows it is not sufficient by itself to preserve Xiaohongshu web drafts after process shutdown.

## Successful Experience Runbook

Use this as the reusable successful path for no-GUI Xiaohongshu draft handoff:

1. Prepare a sanitized content package and images outside the browser.
2. Confirm human review and risk approval before any account-state-changing action.
3. Start one headless browser process with a protected external profile.
4. Reuse MCP cookies from local sensitive state; never write cookie contents into run evidence.
5. Open the creator image-publish page and verify upload UI readiness.
6. Upload images, fill title, and fill body/hashtags.
7. Click the draft-only action area (`xhs-publish-btn`, left-side draft action); never click the publish action.
8. Open the draft box in the same browser process.
9. Verify the target title appears in the draft box.
10. Keep the same browser process alive.
11. Recheck the same draft box in the same browser process before handoff or downstream confirmation.
12. Record only sanitized proof fields: `headless=true`, `clicked_publish=false`, `draftbox_detected=true`, `title_found_in_draftbox=true`, and whether this was a same-browser live-session check.

Do not mark the run successful if the only proof is editor-filled state, a stale draft title, or a proof captured after closing and reopening the browser.

## Draft Action Identification

The draft action is the most important reproduction detail.

In the successful environment, the bottom action surface can render as one `xhs-publish-btn` composite component:

- The component box may cover both the left draft action and the right publish action.
- The DOM may not expose a separate button whose text is `存草稿`, `暂存离开`, or similar.
- The component may expose `is-publish="true"` even though the left side of the same visual component is the draft-only action.

Therefore, do not require an independent draft DOM node as the only valid reproduction path.

Safe reproduction rule:

1. Prefer a clear draft-only DOM target if one exists.
2. If no draft DOM target exists and a single bottom `xhs-publish-btn` composite component is present, use the known left-side draft action area from the successful run.
3. Do not click the right-side publish action area.
4. Treat the click as successful only if the draft box opens and the unique target title appears.
5. If the title does not appear in the draft box, mark the run failed even if the editor was filled.

The known successful click evidence used the bottom `xhs-publish-btn` region and a left-side draft coordinate around `x=602, y=955` with a `1440x1000` viewport. Future reproductions should prefer relative positioning within the component over hard-coded absolute coordinates, but they must preserve the same safety property: left draft side only, never right publish side.

The presence of `is-publish="true"` on `xhs-publish-btn` is not sufficient by itself to classify the entire composite component as publish-only. It is a warning signal that must be handled with the composite-button rule above.

## Successful Evidence Contract

The current successful evidence is:

```json
{
  "mode": "headless_same_browser_live_session",
  "clicked_publish": false,
  "first_check": {
    "draftbox_detected": true,
    "title_found_in_draftbox": true
  },
  "second_check_same_browser_after_ms": 60000,
  "second_check": {
    "draftbox_detected": true,
    "title_found_in_draftbox": true
  },
  "saved_draft_visible_in_same_browser": true
}
```

This is successful no-GUI draft handoff evidence, not successful live publish evidence and not browserless HTTP evidence.

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

## Proof Requirements

The proof must include:

- `headless=true`
- `clicked_publish=false`
- draft-only mode
- cookie source class such as `mcp_cookie_file`, without cookie contents or paths
- account-state pass/fail
- draft box detected
- target title found in draft box
- whether the draft was rechecked after browser restart
- whether the headless browser session was kept alive for handoff
- no account names, cookies, personal identifiers, or profile paths
- if `xhs-publish-btn` was used, whether the composite-button left-side draft rule was used
- first same-browser draft-box check result
- second same-browser draft-box check result after a delay

## Known Limitation

The current evidence only proves a same-run headless draft-save and draft-box check in a live browser session.

It does not yet prove:

- the saved draft remains visible after the headless browser process is closed and reopened,
- the saved draft is visible in the user's daily GUI browser,
- live publish,
- pure HTTP draft creation without a browser engine.

## Promotion Rule

Do not promote this pattern to `verified-recipes/` or `workflow-kb/verified-workflows/` until a future run proves:

1. headless draft save passes,
2. the same draft remains visible after reopening the same persistent profile,
3. human review and risk approval occurred before the draft action,
4. `clicked_publish=false`,
5. proof contains no sensitive cookie, account, or profile data.
