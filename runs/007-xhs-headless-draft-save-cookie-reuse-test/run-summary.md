# Run 007: XHS Headless Draft Save Cookie Reuse Test

## Status

- Scenario: Xiaohongshu creator workflow
- Mode tested: `headless_browser`
- Live publish allowed: `false`
- Clicked publish: `false`
- Sensitive data included: `false`

## Objective

Validate whether a Xiaohongshu draft can be saved without a visible browser window.

This run explicitly distinguishes:

- `headless_browser`: a browser engine runs without a visible GUI window.
- `browserless_http`: no browser engine runs and direct HTTP calls create a draft.

Only `headless_browser` was tested successfully. `browserless_http` remains unsupported and unverified.

## Result

The headless browser live-session path passed:

- A headless browser session opened the creator page.
- MCP cookies were reused without storing cookie contents in this run record.
- The draft-only action was clicked.
- The draft box was detected.
- The target title was found in the draft box.
- No live publish action was clicked.

The close-and-reopen path did not pass:

- Reopening the same external persistent profile preserved account access and the draft box could open.
- The target draft title was not found after reopening the browser process.

The same-browser live-session recheck passed:

- The first draft-box check found the target title.
- The same browser process stayed open.
- A second draft-box check 60 seconds later found the same target title.

## Evidence Files

- `headless-live-session-proof.json`
- `headless-reopen-verify-proof.json`
- `headless-same-browser-reverify-proof.json`

Screenshots and debug artifacts are intentionally not committed because they may contain account UI, private platform state, or visual identifiers.

## Reusable Finding

For Xiaohongshu web drafts, the supported no-GUI path is a managed long-running headless browser session:

1. Start headless browser.
2. Reuse authenticated cookies.
3. Save draft.
4. Verify draft box in the same browser session.
5. Keep the browser process alive for handoff or downstream confirmation.

Do not treat a close-and-reopen persistent profile as verified draft persistence.

