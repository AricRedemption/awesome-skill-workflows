# XHS Headless Draft Reproduction Experience

## Conclusion

Headless Xiaohongshu draft saving is reproducible as a live browser-session
workflow, not as a browserless HTTP workflow.

The successful path is:

1. reuse an authenticated XHS MCP cookie file,
2. launch Chromium with `headless=true`,
3. open the creator image publish page,
4. upload the approved images,
5. fill the reviewed title and body,
6. click the draft-only action,
7. verify the draft box in the same browser session,
8. record `clicked_publish=false`.

This does not prove live publishing and does not prove persistence after closing
and reopening the browser process.

## Current Evidence

Source run:

- `runs/007-xhs-headless-draft-save-cookie-reuse-test/run-summary.md`
- `runs/007-xhs-headless-draft-save-cookie-reuse-test/headless-live-session-proof.json`
- `runs/007-xhs-headless-draft-save-cookie-reuse-test/headless-same-browser-reverify-proof.json`
- `runs/007-xhs-headless-draft-save-cookie-reuse-test/headless-reopen-verify-proof.json`

Confirmed successful evidence:

- `headless=true`
- `clicked_publish=false`
- draft-only action clicked
- draft box detected
- target title found in the draft box in the same live session
- same browser process recheck after 60 seconds still found the target title

Known failed or unverified evidence:

- close-and-reopen verification did not find the target title
- browserless HTTP draft creation is unsupported
- the public `xhs-mcp@0.8.13` CLI exposes publish-oriented commands, not a
  verified save-draft command

## Reproduction Script

This repo now has a gated reproduction entrypoint:

```bash
XHS_DRAFT_REPRO_ACK=save-draft-only \
XHS_PUPPETEER_PACKAGE=<local-puppeteer-package> \
node scripts/reproduce-xhs-headless-draft.mjs
```

The script refuses to run unless `XHS_DRAFT_REPRO_ACK=save-draft-only` is set.
It writes only a sanitized proof file and does not write cookie contents,
account names, or profile paths.

Default behavior:

- uses the XHS MCP cookie file outside the repository,
- uses a protected headless profile outside the repository,
- uses existing test images from the original XHS run,
- writes proof to a fresh timestamped run directory under `runs/`, unless
  `XHS_OUTPUT_DIR` is set explicitly.

## Required Gates Before Live Reproduction

Before running the script against the real creator account, capture these gates
for the exact test content:

1. `publish_mode=human_review_then_draft`
2. `do_not_publish=true`
3. human review passed for title, body, images, and hashtags
4. risk approval passed
5. account-state check passed
6. runner confirms this is `headless_browser`, not `browserless_http`

Without those gates, a live rerun should be blocked even if the technical path
is known to work.

## Successful Operating Pattern

The practical lesson is to keep the headless browser alive long enough for proof
capture:

1. Start a dedicated headless Chromium session.
2. Inject or reuse MCP cookies without logging their values.
3. Save the draft from the live creator page.
4. Open the draft box before closing the browser.
5. Verify the unique title in the same session.
6. Recheck in the same browser process if stronger proof is needed.
7. Mark close-and-reopen persistence as unverified unless it is separately
   proven.

## What Not To Claim

Do not claim:

- `xhs-mcp publish` can save drafts,
- browserless HTTP draft creation works,
- the draft is visible after process restart,
- the draft is visible in the user's daily Chrome profile,
- live publish is verified,
- the headless pattern is ready for `verified-recipes/`.

## Status Of This Turn

The live rerun was not executed in this turn because it would change a real XHS
account state and the exact test content did not have a fresh human-review and
risk-approval record in the run evidence.

The safe outcome of this turn is:

- current evidence was rechecked,
- the public `xhs-mcp` command surface was inspected from the local cached
  package,
- a gated reproduction script was added,
- the successful headless live-session pattern was documented here.
