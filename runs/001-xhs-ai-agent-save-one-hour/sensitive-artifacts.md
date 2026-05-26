# Sensitive Artifact Migration

## Status

- Run: `001-xhs-ai-agent-save-one-hour`
- Migration status: sensitive local artifacts moved out of tracked run evidence
- Local archive: `user-sensitive-state/archive/runs/001-xhs-ai-agent-save-one-hour/`
- Archive tracking: ignored by git

## What Moved

- Browser profile state moved to `browser-state/`.
- Cookie export moved to `browser-state/`.
- Account-bound execution scripts moved to `scripts/`.
- Authenticated UI screenshots moved to `screenshots/`.
- Page inspection dump moved to `page-dumps/`.

## What Remains In This Run

This run keeps sanitized or non-secret evidence needed for historical review:

- generated content,
- quality scores,
- human review records,
- gate ledger,
- failed publish proof summary,
- reusable public media assets,
- workflow plans and package metadata.

## Boundary

The moved files are local runtime evidence only. Do not copy their contents into
`workflow-kb/`, `verified-recipes/`, `reports/`, or `evolution/`. Reusable
knowledge should cite sanitized JSON or Markdown evidence from this run and
summarize only non-sensitive facts.
