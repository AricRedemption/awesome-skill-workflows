# XHS Local Draft Profile And Proof Gap

## Status

- Type: failure case
- Scenario: Xiaohongshu creator workflow
- Source runs: `runs/004-xhs-awesome-skill-workflows-layer1-draft`, `runs/005-xhs-awesome-skill-workflows-layer1-draft-relogin`, `runs/006-xhs-awesome-skill-workflows-layer1-retagged-draft`
- Promotion status: verified failure evidence only, not a verified workflow or recipe

## What Happened

The workflow reused a draft-only automation path and reported draft saves, but user verification exposed two execution-layer gaps:

1. The draft was saved in the automation browser profile, while the user checked a different browser profile whose Xiaohongshu draft box was empty.
2. One run treated an editor-filled page as a successful draft save even though the page still showed the draft action button and had not yet proven the latest saved draft contents.

The content and tags were generated correctly, but the handoff proof was too weak for user-facing confidence.

## Human Feedback

The reviewer identified several practical requirements that were missing from the reusable rules:

- Reuse the previously verified Xiaohongshu draft workflow instead of restarting from ad hoc browser interaction.
- Keep the browser open after draft or publish handoff so the human can inspect and continue.
- State which browser profile contains a local draft, because Xiaohongshu web drafts are browser-local.
- Do not treat automation output as sufficient proof when the visible platform state contradicts it.
- Distinguish actual body hashtags from platform-suggested topic chips.

## Root Cause

- The knowledge base captured scenario gates but not enough execution runbook detail for browser-profile-local draft behavior.
- The proof contract checked `titleFound` too loosely and did not require a visible draft-box save timestamp.
- The script closed the browser after proof capture, which removed the human's immediate inspection path.
- Account identity, creator display name, browser profile, and draft storage location were not modeled as separate evidence fields.
- Hashtag verification did not separate body content from platform recommendation UI.

## Prevention Rules

For Xiaohongshu draft handoff, a run is not draft-verified unless all of these are true:

1. The proof records the browser profile class used for the handoff, such as `automation_profile` or `user_visible_profile`, without storing sensitive paths or account data.
2. The final proof shows the draft box, the target title, and a visible `saved at` timestamp or equivalent platform save marker.
3. If tags changed, the latest saved draft must be opened or previewed and the body hashtags must be checked separately from platform-suggested topic chips.
4. The browser must remain open after draft or publish handoff unless the human explicitly asks to close it.
5. A script must not mark `draft_saved=true` while the editor still shows an unsaved draft action state.
6. A draft saved in one browser profile must not be presented as visible in another browser profile.

## Reuse Guidance

Retrieve this failure case whenever a workflow includes Xiaohongshu draft creation, local browser automation, tag revision, proof verification, or user handoff.

Use it as an execution-layer guardrail. Do not promote these failed or partial runs to `verified-recipes/` or `workflow-kb/verified-workflows/`.

## Sensitive Information Boundary

Do not store account names, cookies, profile paths, browser history, personal identifiers, or platform private state in reusable knowledge. Store only generic profile classes, timestamps, evidence file references, and non-sensitive UI-state requirements.
