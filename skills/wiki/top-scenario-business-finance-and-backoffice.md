# Top Scenario: Business Finance And Backoffice

## Provenance

- Source type: `market_taxonomy_cluster`
- Primary sources: `https://skills-hub.ai/`, `https://openagentskills.dev/`
- Import status: `validated_scenario_bundle_import`
- Validation basis: `public taxonomy plus representative skill mapping`
- Validation run: `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- Imported at: `2026-06-05`

## Summary

Business, finance, and backoffice workflows are explicitly represented in public marketplaces. Open Agent Skills shows `156` Business skills, and Skills Hub groups finance, legal, HR, compliance, and operations under Business.

## Scenario Fit

- This page clusters a high-signal public workflow scenario into a reusable Skill Wiki bundle.
- The bundle is intended to make Find Skill return scenario-level starting points, not only isolated skill names.
- Representative skills are chosen from already landed final Skill Wiki pages.

## Market Evidence

- Open Agent Skills category count: Business 156
- Skills Hub category coverage: Business includes finance, legal, HR, compliance, operations
- Skills Hub featured role skill: data-analyst

## Representative Skills

- `skillshub-data-analyst` via `skills/wiki/skillshub-data-analyst.md`
- `composio-invoice-organizer` via `skills/wiki/composio-invoice-organizer.md`
- `anthropic-xlsx-skill` via `skills/wiki/anthropic-xlsx-skill.md`
- `nvidia-accelerated-computing-cudf-skill` via `skills/wiki/nvidia-accelerated-computing-cudf-skill.md`

## When to use

- When the user asks for a scenario bundle rather than a single isolated skill
- When building a first-pass workflow library from market-proven skill categories
- When Skill Wiki needs richer scenario coverage with evidence-backed grouping

## When not to use

- When exact local runtime guarantees are required for every listed skill
- When scenario-specific run evidence should come from `runs/` instead of the final wiki surface
- When a single canonical skill page is enough

## Evidence Refs

- `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- `https://skills-hub.ai/`
- `https://openagentskills.dev/`

## Tags

- `business`
- `finance`
- `backoffice`
- `ops`
- `reporting`

## Risk Level

- low

## Scope

- scenario discovery
- public taxonomy clustering
- representative workflow bundles

## Non-Scope

- per-skill runtime certification
- account-bound automation
- promotion as a verified recipe

## Updated At

- 2026-06-05
