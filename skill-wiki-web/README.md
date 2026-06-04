# Skill Wiki Web

Independent SkillHub-style frontend for this repository's canonical Skill Wiki.

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
- `#/skills`
- `#/skills/:slug`
