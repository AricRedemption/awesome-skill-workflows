# OpenClaw Medical Skills Catalog

## Provenance

- Source type: `external_official_source_skill_seed`
- Source name: `FreedomIntelligence/OpenClaw-Medical-Skills`
- Source URL: `https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills`
- Source path hint: `README / official open-source medical skills library`
- Import status: `validated_official_source_import`
- Validation basis: `official_repo_catalog`
- Market signal: `official source-owned GitHub repo with 869 medical skills`
- Validation run: `runs/024-skill-wiki-official-gapfill-pack/`
- Imported at: `2026-06-05`

## Summary

Official OpenClaw Medical catalog page. The public repo describes itself as a comprehensive open-source library of 869 medical MCPs and agent skills, covering domains such as biomedical search, pharmacovigilance, clinical trials, genomics, and drug discovery.

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
- `https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills`

## Tags

- `external`
- `official-source`
- `medical-and-healthcare`
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
