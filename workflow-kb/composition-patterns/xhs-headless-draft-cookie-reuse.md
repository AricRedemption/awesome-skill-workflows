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
