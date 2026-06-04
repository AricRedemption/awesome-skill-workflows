# Top Scenario: AI Agent Workflow Builder

## Provenance

- Source type: `market_taxonomy_cluster`
- Primary sources: `https://skills-hub.ai/`, `https://openagentskills.dev/`
- Import status: `validated_scenario_bundle_import`
- Validation basis: `public taxonomy plus representative skill mapping`
- Validation run: `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- Imported at: `2026-06-05`

## Summary

Workflow composition and skill orchestration are a distinct marketplace need. Skills Hub highlights workflow-builder, Skill Finder, and cross-tool installation, while this repo itself centers on reusable workflow assets.

## Scenario Fit

- This page clusters a high-signal public workflow scenario into a reusable Skill Wiki bundle.
- The bundle is intended to make Find Skill return scenario-level starting points, not only isolated skill names.
- Representative skills are chosen from already landed final Skill Wiki pages.

## Market Evidence

- Skills Hub engineer workflow: workflow-builder
- Skills Hub popular orchestrator: Skill Finder
- Skills Hub claims cross-tool skill install and composition on homepage

## Representative Skills

- `skillshub-workflow-builder` via `skills/wiki/skillshub-workflow-builder.md`
- `skillshub-skill-finder` via `skills/wiki/skillshub-skill-finder.md`
- `openai-skill-installer` via `skills/wiki/openai-skill-installer.md`
- `composio-mcp-builder` via `skills/wiki/composio-mcp-builder.md`
- `anthropic-template-skill` via `skills/wiki/anthropic-template-skill.md`

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

- `ai`
- `agent`
- `workflow`
- `orchestration`
- `skill-composition`

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
