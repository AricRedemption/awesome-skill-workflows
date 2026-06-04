# Hot Scenario: Testing QA And Release Readiness

## Provenance

- Source type: `market_taxonomy_cluster`
- Primary sources: `https://skills-hub.ai/`, `https://openagentskills.dev/`
- Import status: `validated_scenario_bundle_import`
- Validation basis: `public taxonomy plus representative skill mapping`
- Validation run: `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- Imported at: `2026-06-05`

## Summary

Testing and QA deserve their own scenario instead of being hidden inside generic development. Skills Hub explicitly breaks out Test and QA categories and includes unit-test and preflight in its starter bundles.

## Scenario Fit

- This page clusters a high-signal public workflow scenario into a reusable Skill Wiki bundle.
- The bundle is intended to make Find Skill return scenario-level starting points, not only isolated skill names.
- Representative skills are chosen from already landed final Skill Wiki pages.

## Market Evidence

- Skills Hub category coverage: Test, QA
- Skills Hub featured stack skills: unit-test, preflight
- Skills Hub engineering starter bundles combine test, review, security, deploy

## Representative Skills

- `skillshub-unit-test` via `skills/wiki/skillshub-unit-test.md`
- `skillshub-preflight` via `skills/wiki/skillshub-preflight.md`
- `skillshub-code-review` via `skills/wiki/skillshub-code-review.md`

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

- `testing`
- `qa`
- `release-readiness`
- `preflight`
- `quality`

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
