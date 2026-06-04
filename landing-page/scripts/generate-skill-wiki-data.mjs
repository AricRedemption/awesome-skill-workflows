import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const landingPageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(landingPageRoot, "..");
const skillWikiDir = path.join(repoRoot, "skills", "wiki");
const outputPath = path.join(landingPageRoot, "public", "skill-wiki.json");

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
    .map((line) => line.slice(2).trim())
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

function getSection(sections, title) {
  return sections.find((section) => section.title.toLowerCase() === title.toLowerCase());
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

function slugFromPath(filePath) {
  return path.basename(filePath, ".md");
}

function extractTitle(markdown, filePath) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? slugFromPath(filePath);
}

function buildSkillRecord(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const slug = slugFromPath(filePath);
  const title = extractTitle(markdown, filePath);
  const sections = splitSections(markdown);
  const summarySection = formatSection(getSection(sections, "Summary"));
  const whenToUse = formatSection(getSection(sections, "When to use"));
  const whenNotToUse = formatSection(getSection(sections, "When not to use"));
  const inputs = formatSection(getSection(sections, "Inputs"));
  const outputs = formatSection(getSection(sections, "Outputs"));
  const steps = formatSection(getSection(sections, "Steps"));
  const failureModes = formatSection(getSection(sections, "Failure Modes"));
  const evidenceRefs = formatSection(getSection(sections, "Evidence Refs"));
  const relatedSkills = formatSection(getSection(sections, "Related Skills"));
  const tags = formatSection(getSection(sections, "Tags"));
  const scope = formatSection(getSection(sections, "Scope"));
  const nonScope = formatSection(getSection(sections, "Non-Scope"));
  const riskLevel = formatSection(getSection(sections, "Risk Level"));
  const updatedAt = formatSection(getSection(sections, "Updated At"));
  const provenance = formatSection(getSection(sections, "Provenance"));

  return {
    slug,
    title,
    sourcePath: path.relative(repoRoot, filePath).replace(/\\/g, "/"),
    summary:
      summarySection.paragraphs[0] ??
      whenToUse.bullets[0] ??
      "Not specified in wiki.",
    searchText: normalizeWhitespace(markdown.toLowerCase()),
    tags: tags.bullets,
    riskLevel: riskLevel.bullets[0] ?? riskLevel.paragraphs[0] ?? "not specified",
    updatedAt: updatedAt.bullets[0] ?? updatedAt.paragraphs[0] ?? "Not specified",
    overview: summarySection,
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
  const tagSet = new Set(skills.flatMap((skill) => skill.tags));

  return {
    generatedAt: new Date().toISOString(),
    sourceDirectory: "skills/wiki",
    stats: {
      skillCount: skills.length,
      tagCount: tagSet.size,
      evidenceRefCount: skills.reduce((count, skill) => count + skill.evidenceRefs.bullets.length, 0),
    },
    skills,
  };
}

const payload = buildPayload();
fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Generated ${outputPath}`);
