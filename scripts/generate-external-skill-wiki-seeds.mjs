import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const seedConfigPath = path.join(root, 'configs/external-skill-wiki-seeds.json');
const wikiDir = path.join(root, 'skills/wiki');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function renderMarkdown(seed) {
  const tags = (seed.tags ?? []).map((tag) => `- \`${tag}\``).join('\n');

  return `# ${seed.title}

## Provenance

- Source type: \`external_github_skill_seed\`
- Source repo: \`${seed.source_repo}\`
- Source URL: \`${seed.source_url}\`
- Source path hint: \`${seed.source_path}\`
- Import status: \`validated_external_import\`
- Validation basis: \`listed_in_validated_source_catalog\`
- Validation run: \`${seed.validation_run}\`
- Imported at: \`2026-06-05\`

## Summary

${seed.summary}

## When to use

- When the user asks for \`${seed.title}\` by name
- When searching a known external skill catalog for matching capabilities
- When a skill-level wiki seed is more useful than a repo-level catalog page

## When not to use

- When repo-local functional verification is required
- When local promotion-gate evidence is required
- When the source skill body has not yet been read from the upstream repository

## Inputs

- upstream source repo
- source path hint
- local skill wiki search query

## Outputs

- searchable skill wiki seed
- source provenance
- import boundary notes

## Failure Modes

- treating this page as proof of local runtime validation
- assuming the upstream skill body is fully represented here
- skipping upstream source review before operational use

## Evidence Refs

- \`${seed.validation_run}\`
- \`${seed.source_url}\`

## Tags

${tags}

## Risk Level

- low

## Scope

- external skill discovery
- searchable seed entry
- source-provenance capture

## Non-Scope

- repo-local runtime verification
- workflow promotion
- scenario approval

## Updated At

- 2026-06-05
`;
}

const seeds = readJson(seedConfigPath);
for (const seed of seeds) {
  const targetPath = path.join(wikiDir, `${seed.id}.md`);
  fs.writeFileSync(targetPath, renderMarkdown(seed), 'utf8');
}

console.log(`Generated ${seeds.length} external skill wiki seed pages.`);
