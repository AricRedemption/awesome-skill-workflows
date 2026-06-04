# Composio Artifacts Builder

## Provenance

- Source type: `external_github_skill_seed`
- Source repo: `ComposioHQ/awesome-claude-skills`
- Source URL: `https://github.com/ComposioHQ/awesome-claude-skills`
- Source path hint: `artifacts-builder`
- Import status: `validated_external_import`
- Validation basis: `listed_in_validated_source_catalog`
- Validation run: `runs/021-external-skill-wiki-import-community-catalogs/`
- Imported at: `2026-06-05`

## Summary

Imported external artifacts-builder skill seed from Composio's validated community catalog. The source repo lists `artifacts-builder` as a skill folder.

## When to use

- When the user asks for `Composio Artifacts Builder` by name
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

- `runs/021-external-skill-wiki-import-community-catalogs/`
- `https://github.com/ComposioHQ/awesome-claude-skills`

## Tags

- `external`
- `composio`
- `artifacts`
- `builder`
- `community`
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
