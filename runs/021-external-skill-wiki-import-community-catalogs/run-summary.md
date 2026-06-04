# Run Summary

## Scenario

- `external-skill-wiki-import`
- slice: `community catalogs`

## Validated Pages

- `skills/wiki/composio-awesome-claude-skills.md`
- `skills/wiki/heilcheng-awesome-agent-skills.md`

## Verification

- confirmed both repos are public and discovery-oriented
- confirmed imported pages distinguish directory/catalog behavior from direct skill validation
- `node scripts/find-skill.mjs "composio claude skills catalog"` returns the Composio page
- `node scripts/find-skill.mjs "marketplace discovery agent skills"` returns the Heilcheng page

## Decision

These two pages are valid searchable external imports and may be marked
`validated_external_import`.
