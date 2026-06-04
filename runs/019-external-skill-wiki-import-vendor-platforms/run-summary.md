# Run Summary

## Scenario

- `external-skill-wiki-import`
- slice: `vendor platforms`

## Validated Pages

- `skills/wiki/nvidia-agent-skills-catalog.md`
- `skills/wiki/vercel-agent-skills.md`

## Verification

- confirmed vendor repos are public
- confirmed imported wiki pages document platform scope and non-scope
- `node scripts/find-skill.mjs "nvidia gpu cuda official"` returns the NVIDIA page
- `node scripts/find-skill.mjs "vercel deployment agent skills"` returns the Vercel page

## Decision

These two pages are valid searchable external imports and may be marked
`validated_external_import`.
