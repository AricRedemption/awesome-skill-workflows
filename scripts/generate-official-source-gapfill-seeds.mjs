import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'configs/official-source-gapfill-seeds.json');
const wikiDir = path.join(root, 'skills/wiki');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function tagsFor(seed) {
  return [
    'external',
    'official-source',
    seed.group,
    seed.evidence_type,
    'seed',
  ];
}

function renderMarkdown(seed) {
  const tags = tagsFor(seed).map((tag) => `- \`${tag}\``).join('\n');

  return `# ${seed.title}

## Provenance

- Source type: \`external_official_source_skill_seed\`
- Source name: \`${seed.source_name}\`
- Source URL: \`${seed.source_url}\`
- Source path hint: \`${seed.source_path_hint}\`
- Import status: \`validated_official_source_import\`
- Validation basis: \`${seed.evidence_type}\`
- Market signal: \`${seed.market_signal}\`
- Validation run: \`${seed.validation_run}\`
- Imported at: \`2026-06-05\`

## Summary

${seed.summary}

## When to use

- When the user asks for this official skill or source family by name
- When Skill Wiki needs broader coverage from source-owned public catalogs
- When search should return an official-source landing page before deeper runtime validation

## When not to use

- When the upstream skill body must be reproduced exactly
- When repo-local runtime proof is required
- When the page would be mistaken for a verified internal workflow

## Inputs

- public official source repo
- skill or catalog name
- local search query

## Outputs

- searchable official-source final wiki page
- provenance and category evidence
- import boundary notes

## Failure Modes

- treating official-source status as local execution proof
- assuming catalog visibility means complete operational coverage
- skipping upstream source review before workflow use

## Evidence Refs

- \`${seed.validation_run}\`
- \`${seed.source_url}\`

## Tags

${tags}

## Risk Level

- low

## Scope

- official-source skill discovery
- final searchable seed entry
- query coverage expansion

## Non-Scope

- repo-local runtime certification
- verified recipe promotion
- account-bound automation approval

## Updated At

- 2026-06-05
`;
}

const seeds = readJson(configPath);
for (const seed of seeds) {
  fs.writeFileSync(path.join(wikiDir, `${seed.id}.md`), renderMarkdown(seed), 'utf8');
}

console.log(`Generated ${seeds.length} official source gap-fill pages.`);
