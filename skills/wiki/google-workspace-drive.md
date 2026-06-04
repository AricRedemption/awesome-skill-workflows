# Google Workspace Drive Skill

## Provenance

- Source type: `external_official_source_skill_seed`
- Source name: `googleworkspace/cli`
- Source URL: `https://github.com/googleworkspace/cli/tree/main/gwcli/skills/drive`
- Source path hint: `gwcli/skills/drive`
- Import status: `validated_official_source_import`
- Validation basis: `official_repo_skill_entry`
- Market signal: `official skill directory visible in repo`
- Validation run: `runs/024-skill-wiki-official-gapfill-pack/`
- Imported at: `2026-06-05`

## Summary

Official Drive skill seed from Google Workspace CLI. The public repo exposes a `drive` skill directory for file retrieval, organization, and sharing automation.

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
- `https://github.com/googleworkspace/cli/tree/main/gwcli/skills/drive`

## Tags

- `external`
- `official-source`
- `workspace-automation`
- `official_repo_skill_entry`
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
