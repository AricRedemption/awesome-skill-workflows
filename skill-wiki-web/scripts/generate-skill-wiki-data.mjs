import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(webRoot, "..");
const skillWikiDir = path.join(repoRoot, "skills", "wiki");
const outputPath = path.join(webRoot, "data", "skills.generated.js");

function listMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((entry) => entry.endsWith(".md"))
    .sort()
    .map((entry) => path.join(directory, entry));
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function splitSections(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sections = [];
  let currentTitle = "Overview";
  let currentLines = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentLines.length > 0) {
        sections.push({
          title: currentTitle,
          body: currentLines.join("\n").trim(),
        });
      }
      currentTitle = line.slice(3).trim();
      currentLines = [];
      continue;
    }

    if (line.startsWith("# ")) {
      continue;
    }

    currentLines.push(line);
  }

  if (currentLines.length > 0) {
    sections.push({
      title: currentTitle,
      body: currentLines.join("\n").trim(),
    });
  }

  return sections.filter((section) => section.body.length > 0);
}

function parseBulletList(body) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => {
      const value = line.slice(2).trim();
      const fullyWrapped = value.match(/^`([^`]+)`$/);
      return fullyWrapped ? fullyWrapped[1] : value;
    })
    .filter(Boolean);
}

function parseNumberedList(body) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line) => line.replace(/^\d+\.\s+/, "").trim())
    .filter(Boolean);
}

function parseParagraphs(body) {
  return body
    .split(/\n\s*\n/)
    .map((chunk) => normalizeWhitespace(chunk))
    .filter(Boolean);
}

function formatSection(section) {
  if (!section) {
    return {
      title: "",
      bullets: [],
      steps: [],
      paragraphs: [],
      raw: "",
    };
  }

  return {
    title: section.title,
    bullets: parseBulletList(section.body),
    steps: parseNumberedList(section.body),
    paragraphs: parseParagraphs(section.body),
    raw: section.body,
  };
}

function getSection(sections, title) {
  return sections.find((section) => section.title.toLowerCase() === title.toLowerCase());
}

function buildSkillRecord(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const sections = splitSections(markdown);
  const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(filePath, ".md");
  const slug = path.basename(filePath, ".md");

  const overview = formatSection(getSection(sections, "Summary"));
  const whenToUse = formatSection(getSection(sections, "When to use"));
  const whenNotToUse = formatSection(getSection(sections, "When not to use"));
  const inputs = formatSection(getSection(sections, "Inputs"));
  const outputs = formatSection(getSection(sections, "Outputs"));
  const steps = formatSection(getSection(sections, "Steps"));
  const failureModes = formatSection(getSection(sections, "Failure Modes"));
  const evidenceRefs = formatSection(getSection(sections, "Evidence Refs"));
  const relatedSkills = formatSection(getSection(sections, "Related Skills"));
  const tags = formatSection(getSection(sections, "Tags"));
  const riskLevel = formatSection(getSection(sections, "Risk Level"));
  const scope = formatSection(getSection(sections, "Scope"));
  const nonScope = formatSection(getSection(sections, "Non-Scope"));
  const updatedAt = formatSection(getSection(sections, "Updated At"));
  const provenance = formatSection(getSection(sections, "Provenance"));

  return {
    slug,
    title,
    sourcePath: path.relative(repoRoot, filePath).replace(/\\/g, "/"),
    summary: overview.paragraphs[0] ?? whenToUse.bullets[0] ?? "Not specified in wiki.",
    tags: tags.bullets,
    riskLevel: riskLevel.bullets[0] ?? riskLevel.paragraphs[0] ?? "not specified",
    updatedAt: updatedAt.bullets[0] ?? updatedAt.paragraphs[0] ?? "Not specified",
    searchText: normalizeWhitespace(markdown.toLowerCase()),
    overview,
    whenToUse,
    whenNotToUse,
    inputs,
    outputs,
    steps,
    failureModes,
    evidenceRefs,
    relatedSkills,
    scope,
    nonScope,
    provenance,
    sections: sections.map((section) => formatSection(section)),
  };
}

function buildPayload() {
  const skills = listMarkdownFiles(skillWikiDir).map(buildSkillRecord);
  const tagCount = new Set(skills.flatMap((skill) => skill.tags)).size;
  const evidenceRefCount = skills.reduce((count, skill) => count + skill.evidenceRefs.bullets.length, 0);

  return {
    generatedAt: new Date().toISOString(),
    sourceDirectory: "skills/wiki",
    stats: {
      skillCount: skills.length,
      tagCount,
      evidenceRefCount,
    },
    skills,
  };
}

const payload = buildPayload();
const moduleSource = `export const skillWikiPayload = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(outputPath, moduleSource);
console.log(`Generated ${outputPath}`);
