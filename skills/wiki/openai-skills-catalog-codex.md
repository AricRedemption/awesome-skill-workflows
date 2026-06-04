# OpenAI Skills Catalog For Codex

## Provenance

- Source type: `external_github_import`
- Source repo: `openai/skills`
- Source URL: `https://github.com/openai/skills`
- Import status: `imported_external_unverified`
- Imported via: `manual_market_sync`
- Imported at: `2026-06-05`

## Summary

OpenAI's public `openai/skills` repository is the official Codex-oriented
skills catalog. The latest crawl shows `20.5k stars` and `1.4k forks`. The repo
packages `.system`, `.curated`, and `.experimental` skills and documents the
`$skill-installer` workflow for installing GitHub-backed skills into Codex.

## When to use

- When looking for official Codex-native skill packaging patterns
- When importing reusable engineering and workflow skills into a Codex-first setup
- When comparing curated versus experimental skill distribution models

## When not to use

- When a skill must already be proven in this repository's evidence chain
- When scenario-specific risk approval is required
- When repository-local canonical wiki guidance already exists

## Inputs

- `https://github.com/openai/skills`
- Codex skill installation documentation

## Outputs

- official Codex skill catalog reference
- candidate imported skills shortlist
- Codex packaging and installer patterns

## Notable Included Skills

- `.system` built-in skills
- `.curated` installable skills
- `.experimental/create-plan`
- `skill-installer`

## Failure Modes

- assuming all experimental skills are production-ready
- confusing bundled system skills with locally validated wiki entries
- importing a skill without checking license or support assets

## Evidence Refs

- `https://github.com/openai/skills`
- `https://github.com/openai/skills/tree/main/skills/.curated`
- `https://github.com/openai/skills/tree/main/skills/.experimental`

## Tags

- `external`
- `github`
- `openai`
- `codex`
- `official`
- `agent-skills`

## Risk Level

- low

## Scope

- external skill discovery
- official Codex skill reference
- imported wiki search surface

## Non-Scope

- repo-local validation
- promotion gating
- scenario approval

## Updated At

- 2026-06-05
