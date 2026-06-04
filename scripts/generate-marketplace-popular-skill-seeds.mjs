import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'configs/marketplace-popular-skill-seeds.json');
const wikiDir = path.join(root, 'skills/wiki');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function toTags(seed) {
  return [
    'external',
    'marketplace',
    'skills-hub',
    seed.category.toLowerCase().replace(/\s+/g, '-'),
    seed.evidence_type,
    'seed',
  ];
}

function renderMarkdown(seed) {
  const tags = toTags(seed).map((tag) => `- \`${tag}\``).join('\n');

  return `# ${seed.title}

## Provenance

- Source type: \`external_marketplace_skill_seed\`
- Source name: \`${seed.source_name}\`
- Source URL: \`${seed.source_url}\`
- Source path hint: \`${seed.source_path_hint}\`
- Import status: \`validated_marketplace_import\`
- Validation basis: \`${seed.evidence_type}\`
- Market signal: \`${seed.market_signal}\`
- Validation run: \`${seed.validation_run}\`
- Imported at: \`2026-06-05\`

## Summary

${seed.summary}

## When to use

- When the goal matches a currently visible marketplace-popular workflow
- When scenario classification needs a representative public skill anchor
- When a searchable final Skill Wiki page is needed before deeper runtime verification

## When not to use

- When local runtime proof is required
- When the upstream skill body must be reproduced exactly
- When promotion as a fully verified repo-local workflow is required

## Inputs

- marketplace source page
- skill name
- scenario or search query

## Outputs

- searchable marketplace-derived Skill Wiki page
- popularity and taxonomy provenance
- import boundary notes

## Failure Modes

- confusing marketplace popularity with local runtime verification
- assuming the homepage snippet fully describes the upstream skill body
- using this page as compliance proof

## Evidence Refs

- \`${seed.validation_run}\`
- \`${seed.source_url}\`

## Tags

${tags}

## Risk Level

- low

## Scope

- marketplace-driven skill discovery
- scenario enrichment
- searchable seed entry

## Non-Scope

- repo-local execution proof
- scenario approval
- account-bound automation

## Updated At

- 2026-06-05
`;
}

const seeds = readJson(configPath);
for (const seed of seeds) {
  const targetPath = path.join(wikiDir, `${seed.id}.md`);
  fs.writeFileSync(targetPath, renderMarkdown(seed), 'utf8');
}

console.log(`Generated ${seeds.length} marketplace popular skill pages.`);
