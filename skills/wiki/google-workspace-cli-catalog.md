# Google Workspace CLI Skills Catalog

## Provenance

- Source type: `external_official_source_skill_seed`
- Source name: `googleworkspace/cli`
- Source URL: `https://github.com/googleworkspace/cli`
- Source path hint: `README / official Google Workspace CLI agent skills`
- Import status: `validated_official_source_import`
- Validation basis: `official_repo_catalog`
- Market signal: `official source-owned GitHub repo`
- Validation run: `runs/024-skill-wiki-official-gapfill-pack/`
- Imported at: `2026-06-05`

## Summary

Official Google Workspace CLI catalog page. The repository states that GWC ships 100+ ready-to-run AI agent skills for Gmail, Calendar, Docs, Drive, Sheets, and admin automation.

## When to use

- When the user asks for this official skill or source family by name
- When Skill Wiki needs broader coverage from source-owned public catalogs
- When search should return an official-source landing page before deeper runtime validation

## When not to use

- When the upstream skill body must be reproduced exactly
- When repo-local runtime proof is required
- When the page would be mistaken for a verified internal workflow

## Inputs

- public official source repo
- skill or catalog name
- local search query

## Outputs

- searchable official-source final wiki page
- provenance and category evidence
- import boundary notes

## Failure Modes

- treating official-source status as local execution proof
- assuming catalog visibility means complete operational coverage
- skipping upstream source review before workflow use

## Evidence Refs

- `runs/024-skill-wiki-official-gapfill-pack/`
- `https://github.com/googleworkspace/cli`

## Tags

- `external`
- `official-source`
- `workspace-automation`
- `official_repo_catalog`
- `seed`

## Risk Level

- low

## Scope

- official-source skill discovery
- final searchable seed entry
- query coverage expansion

## Non-Scope

- repo-local runtime certification
- verified recipe promotion
- account-bound automation approval

## Updated At

- 2026-06-05
