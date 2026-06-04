import { searchSkillWiki } from './lib/find-skill.mjs';

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const limitFlagIndex = args.indexOf('--limit');

let limit = 5;
if (limitFlagIndex >= 0) {
  limit = Number.parseInt(args[limitFlagIndex + 1] ?? '5', 10);
  args.splice(limitFlagIndex, 2);
}

const filteredArgs = args.filter((arg) => arg !== '--json');
const query = filteredArgs.join(' ').trim();

if (!query) {
  console.error('Usage: node scripts/find-skill.mjs [--limit N] [--json] <query>');
  process.exit(1);
}

const results = searchSkillWiki(query, { limit });

if (jsonMode) {
  console.log(JSON.stringify({ query, results }, null, 2));
  process.exit(0);
}

if (results.length === 0) {
  console.log(`No Skill Wiki matches for "${query}".`);
  process.exit(0);
}

console.log(`Skill Wiki matches for "${query}":`);
for (const result of results) {
  console.log('');
  console.log(`- ${result.title} [${result.id}]`);
  console.log(`  path: ${result.path}`);
  if (result.tags.length > 0) {
    console.log(`  tags: ${result.tags.join(', ')}`);
  }
  console.log(`  summary: ${result.summary}`);
  if (result.snippet) {
    console.log(`  snippet: ${result.snippet}`);
  }
}
