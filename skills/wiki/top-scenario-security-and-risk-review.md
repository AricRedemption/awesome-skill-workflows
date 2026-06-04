# Top Scenario: Security And Risk Review

## Provenance

- Source type: `market_taxonomy_cluster`
- Primary sources: `https://skills-hub.ai/`, `https://openagentskills.dev/`
- Import status: `validated_scenario_bundle_import`
- Validation basis: `public taxonomy plus representative skill mapping`
- Validation run: `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- Imported at: `2026-06-05`

## Summary

Security is one of the largest public skill categories. Open Agent Skills shows `408` Security skills, and Skills Hub ships a dedicated Security Hardening Kit centered on review and scanning workflows.

## Scenario Fit

- This page clusters a high-signal public workflow scenario into a reusable Skill Wiki bundle.
- The bundle is intended to make Find Skill return scenario-level starting points, not only isolated skill names.
- Representative skills are chosen from already landed final Skill Wiki pages.

## Market Evidence

- Open Agent Skills category count: Security 408
- Skills Hub category coverage: Security
- Skills Hub featured stack skill: security-review

## Representative Skills

- `skillshub-security-review` via `skills/wiki/skillshub-security-review.md`
- `skillshub-code-review` via `skills/wiki/skillshub-code-review.md`
- `openai-create-plan-skill` via `skills/wiki/openai-create-plan-skill.md`

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

- `security`
- `risk`
- `compliance`
- `review`
- `hardening`

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
