# Anthropic DOCX Skill

## Provenance

- Source type: `external_github_skill_seed`
- Source repo: `anthropics/skills`
- Source URL: `https://github.com/anthropics/skills`
- Source path hint: `skills/docx`
- Import status: `validated_external_import`
- Validation basis: `listed_in_validated_source_catalog`
- Validation run: `runs/018-external-skill-wiki-import-official-catalogs/`
- Imported at: `2026-06-05`

## Summary

Imported external DOCX skill seed from Anthropic's validated official catalog. The source repository explicitly exposes `docx` among production document skills.

## When to use

- When the user asks for `Anthropic DOCX Skill` by name
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

- `runs/018-external-skill-wiki-import-official-catalogs/`
- `https://github.com/anthropics/skills`

## Tags

- `external`
- `anthropic`
- `docx`
- `document-skill`
- `official`
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
