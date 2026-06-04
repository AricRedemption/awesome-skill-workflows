# Skills Hub Code Review

## Provenance

- Source type: `external_marketplace_skill_seed`
- Source name: `skills-hub.ai`
- Source URL: `https://skills-hub.ai/`
- Source path hint: `homepage / What developers are installing right now`
- Import status: `validated_marketplace_import`
- Validation basis: `top_installed_visible`
- Market signal: `44 visible installs on homepage snapshot`
- Validation run: `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- Imported at: `2026-06-05`

## Summary

Marketplace-popular code review skill captured from Skills Hub's visible top-installed list. The homepage presents `code-review` as a high-signal developer workflow for correctness, security, performance, readability, and test coverage.

## When to use

- When the goal matches a currently visible marketplace-popular workflow
- When scenario classification needs a representative public skill anchor
- When a searchable final Skill Wiki page is needed before deeper runtime verification

## When not to use

- When local runtime proof is required
- When the upstream skill body must be reproduced exactly
- When promotion as a fully verified repo-local workflow is required

## Inputs

- marketplace source page
- skill name
- scenario or search query

## Outputs

- searchable marketplace-derived Skill Wiki page
- popularity and taxonomy provenance
- import boundary notes

## Failure Modes

- confusing marketplace popularity with local runtime verification
- assuming the homepage snippet fully describes the upstream skill body
- using this page as compliance proof

## Evidence Refs

- `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- `https://skills-hub.ai/`

## Tags

- `external`
- `marketplace`
- `skills-hub`
- `review`
- `top_installed_visible`
- `seed`

## Risk Level

- low

## Scope

- marketplace-driven skill discovery
- scenario enrichment
- searchable seed entry

## Non-Scope

- repo-local execution proof
- scenario approval
- account-bound automation

## Updated At

- 2026-06-05
