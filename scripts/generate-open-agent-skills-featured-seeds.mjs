import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'configs/open-agent-skills-featured-seeds.json');
const wikiDir = path.join(root, 'skills/wiki');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function toTags(seed) {
  return [
    'external',
    'marketplace',
    'open-agent-skills',
    seed.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    seed.evidence_type,
    'seed',
  ];
}

function renderMarkdown(seed) {
  const tags = toTags(seed).map((tag) => `- \`${tag}\``).join('\n');

  return `# ${seed.title}

## Provenance

- Source type: \`external_marketplace_featured_skill_seed\`
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

- When the user asks for a known featured marketplace skill by name
- When category hubs need strong public representative skills
- When Skill Wiki should reflect what is visibly curated on public skill registries

## When not to use

- When the exact upstream skill body is needed
- When local runtime verification is required
- When the page would be mistaken for a verified internal workflow

## Inputs

- featured marketplace listing
- skill name
- local search query

## Outputs

- searchable featured-skill wiki page
- category and provenance evidence
- import boundary notes

## Failure Modes

- treating featured placement as execution proof
- assuming the homepage blurb is a full specification
- skipping upstream source review before operational reuse

## Evidence Refs

- \`${seed.validation_run}\`
- \`${seed.source_url}\`

## Tags

${tags}

## Risk Level

- low

## Scope

- featured-skill discovery
- searchable seed entry
- category enrichment

## Non-Scope

- local execution proof
- scenario approval
- compliance certification

## Updated At

- 2026-06-05
`;
}

const seeds = readJson(configPath);
for (const seed of seeds) {
  const targetPath = path.join(wikiDir, `${seed.id}.md`);
  fs.writeFileSync(targetPath, renderMarkdown(seed), 'utf8');
}

console.log(`Generated ${seeds.length} Open Agent Skills featured skill pages.`);
