# Skill Wiki Web

Independent SkillHub-style frontend for this repository's canonical Skill Wiki.
The current goal is product-shaped discovery first, repository detail second.

## Data Contract

- Final source of truth: `skills/wiki/*.md`
- Generated browser module: `data/skills.generated.js`
- No remote API or backend dependency

## Local Commands

```bash
node skill-wiki-web/scripts/generate-skill-wiki-data.mjs
node skill-wiki-web/scripts/verify.mjs
node skill-wiki-web/scripts/serve.mjs
```

Routes use hashes for static reliability:

- `#/`
- `#/workflows`
- `#/workflows/:slug`

## UX Direction

- Homepage should feel like a skills product or marketplace, not a markdown
  document index.
- Homepage and discovery should prefer complete workflow bundles over isolated
  single-skill entries.
- Each domain should expose only a small number of stronger workflow entry
  points before the user drills into lower-level skills.
- CTA cards and entry panels must always have complete click-through targets.
- Homepage copy should emphasize discoverability, navigation, and selection.
- Provenance, evidence, and source-path detail belong mainly on workflow detail
  routes.
