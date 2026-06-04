# Top Scenario: Cloud Deployment And Ops

## Provenance

- Source type: `market_taxonomy_cluster`
- Primary sources: `https://skills-hub.ai/`, `https://openagentskills.dev/`
- Import status: `validated_scenario_bundle_import`
- Validation basis: `public taxonomy plus representative skill mapping`
- Validation run: `runs/022-skill-wiki-marketplace-taxonomy-scan/`
- Imported at: `2026-06-05`

## Summary

Deployment and operations remain a core engineering scenario. Skills Hub explicitly surfaces Deploy and Ops categories, and the imported vendor catalogs include optimization and deploy-oriented skills from Vercel and NVIDIA.

## Scenario Fit

- This page clusters a high-signal public workflow scenario into a reusable Skill Wiki bundle.
- The bundle is intended to make Find Skill return scenario-level starting points, not only isolated skill names.
- Representative skills are chosen from already landed final Skill Wiki pages.

## Market Evidence

- Skills Hub category coverage: Deploy, Ops
- Skills Hub developer pipelines combine build, deploy, and review
- Existing imported vendor skills: vercel-optimize, aiq-deploy

## Representative Skills

- `vercel-optimize-skill` via `skills/wiki/vercel-optimize-skill.md`
- `nvidia-aiq-deploy-skill` via `skills/wiki/nvidia-aiq-deploy-skill.md`
- `nvidia-cuopt-install-skill` via `skills/wiki/nvidia-cuopt-install-skill.md`

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

- `cloud`
- `deployment`
- `ops`
- `infra`
- `optimization`

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
