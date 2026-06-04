# Jwynia Command Creator

## Provenance

- Source type: `external_github_skill_seed`
- Source repo: `jwynia/agent-skills`
- Source URL: `https://github.com/jwynia/agent-skills`
- Source path hint: `codex/command-creator`
- Import status: `validated_external_import`
- Validation basis: `listed_in_validated_source_catalog`
- Validation run: `runs/020-external-skill-wiki-import-engineering-workflows/`
- Imported at: `2026-06-05`

## Summary

Imported external command-creator seed from Jwynia's validated skill library. The README explicitly documents `command-creator` among Codex-compatible skills.

## When to use

- When the user asks for `Jwynia Command Creator` by name
- When searching a known external skill catalog for matching capabilities
- When a skill-level wiki seed is more useful than a repo-level catalog page

## When not to use

- When repo-local functional verification is required
- When local promotion-gate evidence is required
- When the source skill body has not yet been read from the upstream repository

## Inputs

- upstream source repo
- source path hint
- local skill wiki search query

## Outputs

- searchable skill wiki seed
- source provenance
- import boundary notes

## Failure Modes

- treating this page as proof of local runtime validation
- assuming the upstream skill body is fully represented here
- skipping upstream source review before operational use

## Evidence Refs

- `runs/020-external-skill-wiki-import-engineering-workflows/`
- `https://github.com/jwynia/agent-skills`

## Tags

- `external`
- `jwynia`
- `command-creator`
- `codex`
- `engineering`
- `seed`

## Risk Level

- low

## Scope

- external skill discovery
- searchable seed entry
- source-provenance capture

## Non-Scope

- repo-local runtime verification
- workflow promotion
- scenario approval

## Updated At

- 2026-06-05
