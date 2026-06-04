# Hot Scenario: Integration And MCP Tooling

## Provenance

- Source type: `market_taxonomy_cluster`
- Primary sources: `https://skills-hub.ai/`, `https://openagentskills.dev/`
- Import status: `validated_scenario_bundle_import`
- Validation basis: `public taxonomy plus representative skill mapping`
- Validation run: `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- Imported at: `2026-06-05`

## Summary

Integration and connector workflows are a visible hot scenario in skill marketplaces. Skills Hub includes an Integration category, while imported catalogs expose MCP builder and command-creation skills that map directly to toolchain extension work.

## Scenario Fit

- This page clusters a high-signal public workflow scenario into a reusable Skill Wiki bundle.
- The bundle is intended to make Find Skill return scenario-level starting points, not only isolated skill names.
- Representative skills are chosen from already landed final Skill Wiki pages.

## Market Evidence

- Skills Hub category coverage: Integration
- Open Agent Skills popular filters include MCP
- Existing imported skills: mcp-builder, command-creator, skill-installer

## Representative Skills

- `composio-mcp-builder` via `skills/wiki/composio-mcp-builder.md`
- `jwynia-command-creator` via `skills/wiki/jwynia-command-creator.md`
- `openai-skill-installer` via `skills/wiki/openai-skill-installer.md`
- `skillshub-skill-finder` via `skills/wiki/skillshub-skill-finder.md`

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

- `integration`
- `mcp`
- `tooling`
- `connectors`
- `extension`

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
