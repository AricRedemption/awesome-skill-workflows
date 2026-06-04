# Top Scenario: Office Document Automation

## Provenance

- Source type: `market_taxonomy_cluster`
- Primary sources: `https://skills-hub.ai/`, `https://openagentskills.dev/`
- Import status: `validated_scenario_bundle_import`
- Validation basis: `public taxonomy plus representative skill mapping`
- Validation run: `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- Imported at: `2026-06-05`

## Summary

Office and document workflows are one of the clearest marketplace categories. Open Agent Skills shows `181` skills in Document Processing, and Skills Hub prominently surfaces MarkItDown plus docs and accessibility workflows.

## Scenario Fit

- This page clusters a high-signal public workflow scenario into a reusable Skill Wiki bundle.
- The bundle is intended to make Find Skill return scenario-level starting points, not only isolated skill names.
- Representative skills are chosen from already landed final Skill Wiki pages.

## Market Evidence

- Open Agent Skills category count: Document Processing 181
- Skills Hub category coverage: Docs, Accessibility, Productivity
- Skills Hub popular skills: markitdown

## Representative Skills

- `skillshub-markitdown` via `skills/wiki/skillshub-markitdown.md`
- `anthropic-pdf-skill` via `skills/wiki/anthropic-pdf-skill.md`
- `anthropic-docx-skill` via `skills/wiki/anthropic-docx-skill.md`
- `anthropic-pptx-skill` via `skills/wiki/anthropic-pptx-skill.md`
- `anthropic-xlsx-skill` via `skills/wiki/anthropic-xlsx-skill.md`

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

- `office`
- `documents`
- `automation`
- `docx`
- `pdf`
- `xlsx`

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
