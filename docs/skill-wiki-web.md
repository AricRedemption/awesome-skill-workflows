# Skill Wiki Web

## Purpose

`skill-wiki-web/` is an independent frontend surface for browsing the repository
Skill Wiki as a standalone product, rather than embedding that experience inside
the existing `landing-page/` site.

## Data Boundary

- Canonical source of truth: `skills/wiki/*.md`
- Generated browser data module: `skill-wiki-web/data/skills.generated.js`
- Forbidden product data sources:
  - `skills/index.json`
  - `workflow-kb/retrieval-index.json`
  - `runs/`
  - scenario-specific assets

The generated module is a build artifact only. The product data contract remains
anchored to `skills/wiki/*.md`.

## App Shape

The independent site currently provides:

- `#/` for the platform homepage
- `#/skills` for searchable skill discovery
- `#/skills/:slug` for markdown-derived skill detail pages

Hash routes are used so the site stays reliable as a standalone static app
without requiring deployment rewrites.

## Local Commands

```bash
node skill-wiki-web/scripts/generate-skill-wiki-data.mjs
node skill-wiki-web/scripts/verify.mjs
node skill-wiki-web/scripts/serve.mjs
```

## Verification Contract

`skill-wiki-web/scripts/verify.mjs` checks:

- every `skills/wiki/*.md` file is represented in generated data,
- required parsed fields exist,
- detail routes can resolve by slug,
- and generated source paths stay inside `skills/wiki/`.

## Non-Scope

- remote APIs
- login or account state
- installation flows
- ranking claims not supported by local wiki data
- reuse of non-wiki repository indexes as product content
