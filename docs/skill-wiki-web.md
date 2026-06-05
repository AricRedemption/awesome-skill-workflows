# Skill Wiki Web

## Purpose

`skill-wiki-web/` is an independent frontend surface for browsing the repository
Skill Wiki as a standalone product. The current direction is to present that
surface more like a real skills marketplace or community homepage, rather than
like a repository-backed documentation browser.

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
- `#/workflows` for searchable workflow discovery
- `#/workflows/:slug` for markdown-derived workflow detail pages

Hash routes are used so the site stays reliable as a standalone static app
without requiring deployment rewrites.

## Product Direction

- Homepage should behave like a product landing/discovery surface first:
  search, recommendation, category entry, featured workflow, and direct
  navigation to workflow detail.
- The top-level product object should prefer scenario-level workflow bundles such
  as `top-scenario-*` and `hot-scenario-*`, rather than treating isolated skill
  pages as the primary browsing unit.
- For each domain, prefer a small number of high-signal workflow entry points
  over exhaustive low-level skill listing on the homepage.
- Repository-truth language such as markdown provenance, evidence references,
  and source ownership should be de-emphasized on the homepage and discovery
  surface.
- Repository-truth data should still remain available on detail pages where the
  user explicitly drills into a workflow.
- CTA cards on the homepage must be complete navigation actions, not descriptive
  placeholders without a direct target.
- When browser-based QA is needed for this frontend, prefer Codex-provided
  Chrome/Browser capabilities over ad-hoc command-line Chrome flows.

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
