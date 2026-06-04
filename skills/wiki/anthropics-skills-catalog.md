# Anthropic Skills Catalog

## Provenance

- Source type: `external_github_import`
- Source repo: `anthropics/skills`
- Source URL: `https://github.com/anthropics/skills`
- Import status: `imported_external_unverified`
- Imported via: `manual_market_sync`
- Imported at: `2026-06-05`

## Summary

Anthropic's public skills repository is the most visible official Agent Skills
catalog in the current ecosystem. As of the latest repository crawl, it shows
`142k stars` and `16.8k forks`, and it publishes both example skill sets and
document-oriented production skills such as `docx`, `pdf`, `pptx`, and `xlsx`.

## When to use

- When looking for official reference implementations of Agent Skills
- When comparing the open Agent Skills standard against production Claude usage
- When importing document, enterprise, creative, or technical skill patterns

## When not to use

- When a repo-local verified skill is required
- When a skill must already be validated against this repository's promotion gates
- When sensitive or externally visible actions need scenario-local proof

## Inputs

- `https://github.com/anthropics/skills`
- Anthropic skill set and template documentation

## Outputs

- official skill catalog reference
- candidate skills shortlist
- skill structure and packaging patterns

## Notable Included Skills

- `pdf`
- `docx`
- `pptx`
- `xlsx`
- `template-skill`
- skill sets for creative/design, development/technical, enterprise/communication

## Failure Modes

- treating official examples as already verified for this repository
- assuming every included skill is safe for autonomous use without local review
- confusing example skills with scenario-approved workflow assets

## Evidence Refs

- `https://github.com/anthropics/skills`
- `https://github.com/anthropics/skills/tree/main/skills`
- `https://github.com/anthropics/skills/tree/main/template`

## Tags

- `external`
- `github`
- `anthropic`
- `agent-skills`
- `official`
- `document-skills`

## Risk Level

- medium

## Scope

- external skill discovery
- official skill reference
- imported wiki search surface

## Non-Scope

- repo-local validation
- promotion gating
- scenario approval

## Updated At

- 2026-06-05
