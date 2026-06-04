import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'configs/skill-wiki-top-scenarios.json');
const wikiDir = path.join(root, 'skills/wiki');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function renderScenarioPage(scenario) {
  const evidence = scenario.market_evidence.map((item) => `- ${item}`).join('\n');
  const tags = scenario.scenario_tags.map((tag) => `- \`${tag}\``).join('\n');
  const representativeSkills = scenario.representative_skills
    .map((skillId) => `- \`${skillId}\` via \`skills/wiki/${skillId}.md\``)
    .join('\n');

  return `# ${scenario.title}

## Provenance

- Source type: \`market_taxonomy_cluster\`
- Primary sources: \`https://skills-hub.ai/\`, \`https://openagentskills.dev/\`
- Import status: \`validated_scenario_bundle_import\`
- Validation basis: \`public taxonomy plus representative skill mapping\`
- Validation run: \`runs/022-skill-wiki-marketplace-taxonomy-scan/\`
- Imported at: \`2026-06-05\`

## Summary

${scenario.summary}

## Scenario Fit

- This page clusters a high-signal public workflow scenario into a reusable Skill Wiki bundle.
- The bundle is intended to make Find Skill return scenario-level starting points, not only isolated skill names.
- Representative skills are chosen from already landed final Skill Wiki pages.

## Market Evidence

${evidence}

## Representative Skills

${representativeSkills}

## When to use

- When the user asks for a scenario bundle rather than a single isolated skill
- When building a first-pass workflow library from market-proven skill categories
- When Skill Wiki needs richer scenario coverage with evidence-backed grouping

## When not to use

- When exact local runtime guarantees are required for every listed skill
- When scenario-specific run evidence should come from \`runs/\` instead of the final wiki surface
- When a single canonical skill page is enough

## Evidence Refs

- \`runs/022-skill-wiki-marketplace-taxonomy-scan/\`
- \`https://skills-hub.ai/\`
- \`https://openagentskills.dev/\`

## Tags

${tags}

## Risk Level

- low

## Scope

- scenario discovery
- public taxonomy clustering
- representative workflow bundles

## Non-Scope

- per-skill runtime certification
- account-bound automation
- promotion as a verified recipe

## Updated At

- 2026-06-05
`;
}

const scenarios = readJson(configPath);
for (const scenario of scenarios) {
  const targetPath = path.join(wikiDir, `${scenario.id}.md`);
  fs.writeFileSync(targetPath, renderScenarioPage(scenario), 'utf8');
}

console.log(`Generated ${scenarios.length} top scenario skill wiki pages.`);
