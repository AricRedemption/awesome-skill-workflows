# Sensitive Artifact Migration

## Status

- Run: `003-xhs-ai-agent-save-one-hour-step8-draft-rerun`
- Migration status: sensitive local artifacts moved out of tracked run evidence
- Local archive: `user-sensitive-state/archive/runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/`
- Archive tracking: ignored by git

## What Moved

- Draft execution script moved to `scripts/`.
- Authenticated draft screenshots moved to `screenshots/`.

## What Remains In This Run

This run keeps sanitized proof evidence needed for the verified draft chain:

- `draft-proof.json`,
- `draft-proof.md`,
- `gate-ledger.json`,
- `human-review.json`,
- `risk-approval.json`,
- `publish-package.json`.

## Boundary

The local screenshots remain useful for private inspection, but they are no
longer promoted as reusable proof. Reusable assets should cite `draft-proof.json`,
`draft-proof.md`, and `gate-ledger.json` instead.
