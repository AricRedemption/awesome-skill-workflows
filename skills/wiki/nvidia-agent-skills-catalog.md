# NVIDIA Agent Skills Catalog

## Provenance

- Source type: `external_github_import`
- Source repo: `NVIDIA/skills`
- Source URL: `https://github.com/NVIDIA/skills`
- Import status: `imported_external_unverified`
- Imported via: `manual_market_sync`
- Imported at: `2026-06-05`

## Summary

NVIDIA's public `NVIDIA/skills` catalog is an official skills distribution for
CUDA-X libraries, AI Blueprints, and developer tooling. The latest crawl shows
`983 stars`, and the repo emphasizes daily sync, verified publishing, and
signed skills for NVIDIA-authored capabilities.

## When to use

- When searching for GPU, CUDA, optimization, or NVIDIA platform skills
- When looking for vendor-authored technical skill packs with explicit product mapping
- When importing patterns for skill signing, sync pipelines, or product catalogs

## When not to use

- When a repository-local verified skill is required
- When local environment constraints make NVIDIA tooling irrelevant
- When account, credential, or infrastructure actions need separate validation

## Inputs

- `https://github.com/NVIDIA/skills`
- NVIDIA skills docs and quickstart instructions

## Outputs

- vendor skill catalog reference
- technical skill shortlist
- packaging patterns for signed and synced skill catalogs

## Notable Included Skills

- `aiq-research`
- `aiq-deploy`
- `cudaq-guide`
- `accelerated-computing-cudf`
- `cuopt-developer`
- `cuopt-numerical-optimization-api-python`

## Failure Modes

- importing hardware- or stack-specific skills into unrelated projects
- assuming signed vendor skills equal local scenario approval
- confusing product docs with validated workflow evidence

## Evidence Refs

- `https://github.com/NVIDIA/skills`
- `https://docs.nvidia.com/holoscan/sdk-user-guide/ai_skills.html`

## Tags

- `external`
- `github`
- `nvidia`
- `gpu`
- `cuda`
- `official`

## Risk Level

- medium

## Scope

- external skill discovery
- NVIDIA platform skill reference
- imported wiki search surface

## Non-Scope

- repo-local validation
- promotion gating
- hardware availability proof

## Updated At

- 2026-06-05
