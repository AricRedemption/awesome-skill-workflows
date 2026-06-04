# Evolution Note: XHS Visible-Browser Fast Path

## What Went Wrong

During the SkillOpt-paper Xiaohongshu post run, execution slowed down because Chrome focus repeatedly landed on unrelated windows. A broad attempt to enumerate Chrome tabs was blocked because it could expose unrelated private browsing data.

## What Was Learned

For user-visible Xiaohongshu work, the fastest safe path is not to search through all browser state. The agent should open or create a target tab directly at the Xiaohongshu image publish URL, confirm the creator page, upload the prepared images through the macOS file chooser, and then continue from the editor state.

If the user manually publishes during the run, record the state as `human_performed_publish`. Do not convert that into automated draft proof or automated publish proof.

## What Changed

- Added a fast visible-browser path to `workflow-kb/composition-patterns/xhs-draft-execution-checklist.md`.
- Added run evidence at `runs/010-xhs-skillopt-paper-reproduction-human-published/run-summary.md`.

## Evidence

- User reported the post was already published.
- The agent reached the Xiaohongshu image editor with four uploaded images and visible preview before the user manually published.

## Remaining Unverified

- No draft-box proof was captured for this run.
- No automated publish proof was captured for this run.
- This run should not be promoted to `verified-recipes/`.
