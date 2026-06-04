import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const categoryConfigPath = path.join(root, 'configs/skill-wiki-category-hubs.json');
const industryConfigPath = path.join(root, 'configs/skill-wiki-industry-hubs.json');
const wikiDir = path.join(root, 'skills/wiki');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function renderRepresentativeSkills(ids) {
  return ids.map((id) => `- \`${id}\` via \`skills/wiki/${id}.md\``).join('\n');
}

function renderCategoryHub(entry) {
  return `# ${entry.title}

## Provenance

- Source type: \`market_category_hub\`
- Source name: \`${entry.source_name}\`
- Source URL: \`${entry.source_url}\`
- Import status: \`validated_category_hub_import\`
- Validation basis: \`visible public category count and representative mapping\`
- Category label: \`${entry.category_label}\`
- Category count: \`${entry.category_count}\`
- Validation run: \`runs/023-skill-wiki-category-and-featured-expansion/\`
- Imported at: \`2026-06-05\`

## Summary

${entry.summary}

## Representative Skills

${renderRepresentativeSkills(entry.representative_skills)}

## When to use

- When the user searches by category rather than an exact skill name
- When Skill Wiki should expose marketplace-scale category coverage
- When a scenario needs a category-level landing page

## When not to use

- When only a single canonical skill page is needed
- When local runtime proof is required for every representative skill
- When category browsing would be less useful than a direct skill hit

## Evidence Refs

- \`runs/023-skill-wiki-category-and-featured-expansion/\`
- \`${entry.source_url}\`

## Tags

- \`category-hub\`
- \`${entry.category_label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`
- \`marketplace\`
- \`open-agent-skills\`

## Risk Level

- low

## Scope

- category discovery
- marketplace coverage
- final searchable wiki entry

## Non-Scope

- per-skill runtime validation
- workflow promotion

## Updated At

- 2026-06-05
`;
}

function renderIndustryHub(entry) {
  return `# ${entry.title}

## Provenance

- Source type: \`market_industry_hub\`
- Source name: \`${entry.source_name}\`
- Source URL: \`${entry.source_url}\`
- Import status: \`validated_industry_hub_import\`
- Validation basis: \`visible public industry category and representative mapping\`
- Industry label: \`${entry.industry_label}\`
- Validation run: \`runs/023-skill-wiki-category-and-featured-expansion/\`
- Imported at: \`2026-06-05\`

## Summary

${entry.summary}

## Representative Skills

${renderRepresentativeSkills(entry.representative_skills)}

## When to use

- When the user frames the task as an industry workflow rather than a tool category
- When broad marketplace coverage needs vertical landing pages
- When Find Skill should return healthcare, research, education, game-dev, or marketing entry points

## When not to use

- When the task needs a concrete low-level skill immediately
- When industry framing adds noise instead of narrowing the workflow
- When local scenario evidence should come from dedicated runs instead

## Evidence Refs

- \`runs/023-skill-wiki-category-and-featured-expansion/\`
- \`${entry.source_url}\`

## Tags

- \`industry-hub\`
- \`${entry.industry_label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`
- \`marketplace\`
- \`skills-hub\`

## Risk Level

- low

## Scope

- industry discovery
- vertical landing pages
- final searchable wiki entry

## Non-Scope

- per-skill runtime validation
- verified recipe promotion

## Updated At

- 2026-06-05
`;
}

const categoryEntries = readJson(categoryConfigPath);
for (const entry of categoryEntries) {
  fs.writeFileSync(path.join(wikiDir, `${entry.id}.md`), renderCategoryHub(entry), 'utf8');
}

const industryEntries = readJson(industryConfigPath);
for (const entry of industryEntries) {
  fs.writeFileSync(path.join(wikiDir, `${entry.id}.md`), renderIndustryHub(entry), 'utf8');
}

console.log(
  `Generated ${categoryEntries.length} category hubs and ${industryEntries.length} industry hubs.`,
);
