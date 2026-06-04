import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(webRoot, "..");
const skillWikiDir = path.join(repoRoot, "skills", "wiki");
const generateScriptPath = path.join(webRoot, "scripts", "generate-skill-wiki-data.mjs");

const regenerate = spawnSync(process.execPath, [generateScriptPath], {
  cwd: repoRoot,
  encoding: "utf8",
});

if (regenerate.status !== 0) {
  throw new Error(`Failed to regenerate Skill Wiki data before verify:\n${regenerate.stdout}\n${regenerate.stderr}`);
}

const { skillWikiPayload } = await import(`../data/skills.generated.js?ts=${Date.now()}`);

const wikiFiles = fs
  .readdirSync(skillWikiDir)
  .filter((entry) => entry.endsWith(".md"))
  .map((entry) => path.basename(entry, ".md"))
  .sort();

const generatedSlugs = skillWikiPayload.skills.map((skill) => skill.slug).sort();

if (wikiFiles.length !== generatedSlugs.length) {
  throw new Error(`Skill count mismatch: wiki=${wikiFiles.length}, generated=${generatedSlugs.length}`);
}

for (const slug of wikiFiles) {
  if (!generatedSlugs.includes(slug)) {
    throw new Error(`Missing generated skill for slug: ${slug}`);
  }
}

for (const skill of skillWikiPayload.skills) {
  if (!skill.title || !skill.sourcePath || !skill.summary) {
    throw new Error(`Missing required parsed field for slug: ${skill.slug}`);
  }

  const detailRoute = `#/skills/${skill.slug}`;
  if (!detailRoute.includes(skill.slug)) {
    throw new Error(`Unresolvable detail route for slug: ${skill.slug}`);
  }

  if (!skill.sourcePath.startsWith("skills/wiki/")) {
    throw new Error(`Unexpected source path outside Skill Wiki: ${skill.sourcePath}`);
  }
}

console.log("Skill Wiki web verification passed.");
console.log(`Verified ${generatedSlugs.length} skills from skills/wiki/*.md.`);
