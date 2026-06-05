import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(webRoot, "..");
const skillWikiDir = path.join(repoRoot, "skills", "wiki");
const outputPath = path.join(webRoot, "data", "skills.generated.js");
const repoGitHubBase = "https://github.com/AricRedemption/awesome-skill-workflows";

const CATEGORY_DEFINITIONS = [
  {
    slug: "claude",
    label: "Claude",
    description: "Claude Code, Anthropic-specific skills, and Claude-oriented execution patterns.",
    keywords: ["claude", "claude-code", "anthropic", "anthropics"],
    tags: ["claude-code", "claude-skills", "anthropic", "document-processing"],
  },
  {
    slug: "codex",
    label: "Codex",
    description: "Codex, OpenAI skills, prompt operators, and code-generation workflows.",
    keywords: ["codex", "openai skills", "gpt", "command-creator"],
    tags: ["codex", "openai", "command-creator"],
  },
  {
    slug: "office",
    label: "Office & Productivity",
    description: "Documents, spreadsheets, workspace automation, and productivity workflows.",
    keywords: [
      "office",
      "docx",
      "xlsx",
      "pptx",
      "pdf",
      "presentation",
      "invoice",
      "resume",
      "productivity",
      "backoffice",
      "calendar",
      "gmail",
      "google workspace",
    ],
    tags: [
      "office",
      "office-assistant",
      "document-processing",
      "document-skill",
      "document-skills",
      "spreadsheet-skill",
      "presentation-skill",
      "productivity",
      "backoffice",
      "workspace-automation",
      "meeting",
      "invoice",
      "todo",
      "tracker",
      "task-management",
      "collaboration",
      "sharing",
    ],
  },
  {
    slug: "media",
    label: "Media & Creative",
    description: "Design, image, video, writing, content, social media, and brand skills.",
    keywords: [
      "media",
      "creative",
      "design",
      "image",
      "video",
      "social media",
      "marketing",
      "copywriting",
      "seo",
      "brand",
      "writing",
      "prose",
      "twitter",
      "content",
      "frontend",
    ],
    tags: [
      "creative-and-media",
      "creative-media",
      "creative",
      "marketing",
      "seo",
      "social-media",
      "brand",
      "writing",
      "writing-style",
      "prose",
      "image",
      "ui",
      "frontend",
      "game-dev",
      "content",
      "twitter",
      "brainstorming",
      "design",
      "artifacts",
    ],
  },
  {
    slug: "devops",
    label: "DevOps & Security",
    description: "Deployment, testing, QA, security, compliance, and infrastructure skills.",
    keywords: [
      "deploy",
      "deployment",
      "testing",
      "qa",
      "release",
      "preflight",
      "security",
      "compliance",
      "hardening",
      "infrastructure",
      "changelog",
    ],
    tags: [
      "deploy",
      "deployment",
      "test",
      "test-automation",
      "testing",
      "qa",
      "quality",
      "code-quality",
      "release-readiness",
      "infra",
      "ops",
      "cloud",
      "security",
      "compliance",
      "hardening",
      "risk",
      "review",
      "changelog",
    ],
  },
  {
    slug: "automation",
    label: "Automation & MCP",
    description: "MCP, browser automation, workflow orchestration, integration, and tooling.",
    keywords: [
      "automation",
      "mcp",
      "browser automation",
      "integration",
      "tooling",
      "skill builder",
      "skill creator",
    ],
    tags: [
      "automation",
      "browser-automation",
      "mcp",
      "integration",
      "tooling",
      "workflow",
      "orchestration",
      "connectors",
      "file-organizer",
      "skill-creator",
      "skill-installer",
      "skill-share",
      "skill-sync",
      "skill-composition",
      "skill-authoring",
      "meta",
      "builder",
      "self-improvement",
      "agent",
      "utility",
      "coaching",
      "setup",
      "install",
      "skill-opt",
      "skillopt",
      "kb-reuse",
      "selection-gated",
      "proof-boundary",
    ],
  },
  {
    slug: "research",
    label: "Research & Data",
    description: "Search, research, analysis, data science, GPU computing, and evidence-gathering.",
    keywords: [
      "research",
      "search",
      "analysis",
      "data analysis",
      "gpu",
      "cuda",
      "numerical",
      "medical",
      "healthcare",
      "clinical",
      "lead research",
      "knowledge graph",
    ],
    tags: [
      "research",
      "search-and-research",
      "lead-research",
      "market-research",
      "insights",
      "data-analysis",
      "data",
      "gpu",
      "gpu-dataframes",
      "cuda",
      "cudaq",
      "cudf",
      "cuopt",
      "nvidia",
      "optimization",
      "optimizer",
      "medical-and-healthcare",
      "knowledge-graph",
      "knowledge-management",
      "education",
      "discovery",
    ],
  },
  {
    slug: "collections",
    label: "Collections & Catalogs",
    description: "Skill catalogs, hubs, repositories, and ecosystem-level collections.",
    keywords: ["catalog", "hub", "collection", "directory", "library"],
    tags: [
      "category-hub",
      "catalog",
      "curated-list",
      "directory",
      "official_repo_catalog",
      "industry-hub",
      "skill-library",
    ],
  },
];

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

function repoPathToUrl(repoPath) {
  const normalized = repoPath.replace(/^\/+/, "");
  const isFile = /\.[a-z0-9]+$/i.test(normalized);
  return `${repoGitHubBase}/${isFile ? "blob" : "tree"}/main/${normalized}`;
}

function detectRepoPath(value) {
  const inlinePathMatch = value.match(/`((?:skills|runs|docs|reports|workflow-kb|schemas|scenarios|verified-recipes|failed-recipes|evolution)[^`]+)`/);
  if (inlinePathMatch) {
    return inlinePathMatch[1];
  }

  const rawPathMatch = value.match(/((?:skills|runs|docs|reports|workflow-kb|schemas|scenarios|verified-recipes|failed-recipes|evolution)\/[^\s,)]+)/);
  return rawPathMatch?.[1] ?? null;
}

function detectHttpUrl(value) {
  const raw = value.match(/https?:\/\/[^\s)]+/i)?.[0] ?? null;
  return raw ? raw.replace(/[`\],.;:]+$/g, "") : null;
}

function extractHttpUrls(value) {
  return [...value.matchAll(/https?:\/\/[^\s)`,]+/gi)].map((match) => match[0].replace(/[`\],.;:]+$/g, ""));
}

function stripBackticks(value) {
  return value.replace(/`([^`]+)`/g, "$1").trim();
}

function humanizeToken(value) {
  return stripBackticks(value)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugToTitle(slug) {
  return slug
    .replace(/\.md$/i, "")
    .split(/[-_/]+/)
    .filter(Boolean)
    .map((word) => {
      if (word.length <= 4 && word === word.toUpperCase()) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const EXTERNAL_HOST_LABELS = {
  "skills-hub.ai": "Skills Hub",
  "openagentskills.dev": "Open Agent Skills",
  "docs.nvidia.com": "NVIDIA Holoscan docs",
};

function formatExternalUrlLabel(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (EXTERNAL_HOST_LABELS[host]) {
      return EXTERNAL_HOST_LABELS[host];
    }

    if (host === "github.com") {
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        const base = `${parts[0]}/${parts[1]}`;
        const markerIndex = parts.findIndex((part) => part === "tree" || part === "blob");
        if (markerIndex >= 0 && parts.length > markerIndex + 2) {
          const subpath = parts.slice(markerIndex + 2).join("/");
          return subpath ? `${base} · ${subpath}` : base;
        }
        return base;
      }
      return "GitHub";
    }

    const hostLabel = host
      .split(".")
      .slice(0, -1)
      .join(" ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return hostLabel || host;
  } catch {
    return url;
  }
}

function formatRepoPathLabel(repoPath) {
  const normalized = repoPath.replace(/\/$/, "");
  const runMatch = normalized.match(/^runs\/(\d+)-(.+)$/);
  if (runMatch) {
    return `Run ${runMatch[1]}: ${humanizeToken(runMatch[2])}`;
  }

  if (normalized.startsWith("skills/wiki/")) {
    const slug = normalized.replace(/^skills\/wiki\//, "").replace(/\.md$/i, "");
    return slugToTitle(slug);
  }

  const parts = normalized.split("/");
  if (parts.length >= 2) {
    return parts.slice(-2).join("/");
  }

  return normalized;
}

function formatPrefixedLabel(value) {
  const cleaned = stripBackticks(value);
  const prefixed = cleaned.match(/^([^:]+):\s*(.+)$/);
  if (!prefixed) {
    return cleaned;
  }

  const field = prefixed[1].trim().toLowerCase();
  const payload = prefixed[2].trim();

  if (field === "source url") {
    const url = detectHttpUrl(payload);
    return url ? formatExternalUrlLabel(url) : humanizeToken(payload);
  }

  if (field === "source repo") {
    return payload.replace(/^`|`$/g, "");
  }

  if (field === "source path hint") {
    return payload;
  }

  if (field === "validation run") {
    const repoPath = detectRepoPath(payload) ?? payload;
    return formatRepoPathLabel(repoPath);
  }

  if (field === "primary sources") {
    const urls = extractHttpUrls(payload);
    if (urls.length > 0) {
      return urls.map((url) => formatExternalUrlLabel(url)).join(" · ");
    }
  }

  if (["source type", "import status", "validation basis", "imported at"].includes(field)) {
    return field === "imported at" ? `Imported ${payload}` : humanizeToken(payload);
  }

  return cleaned;
}

function formatLinkLabel(value, link = {}) {
  const viaMatch = value.match(/^([a-z0-9-]+)\s+via\s+/i);
  if (viaMatch) {
    const slug = viaMatch[1];
    return link.skillTitleBySlug?.get(slug) ?? slugToTitle(slug);
  }

  if (link.kind === "external" && link.href) {
    if (/^https?:\/\//i.test(stripBackticks(value))) {
      return formatExternalUrlLabel(link.href);
    }
    return formatPrefixedLabel(value);
  }

  if (link.repoPath) {
    if (/^[^:]+:\s*/.test(value)) {
      return formatPrefixedLabel(value);
    }
    return formatRepoPathLabel(link.repoPath);
  }

  if (link.kind === "internal-skill" && link.slug) {
    return link.skillTitleBySlug?.get(link.slug) ?? slugToTitle(link.slug);
  }

  if (value.toLowerCase().startsWith("source repo:")) {
    return value.split(":").slice(1).join(":").trim().replace(/^`|`$/g, "");
  }

  return formatPrefixedLabel(value);
}

function expandRefBullet(value) {
  const urls = extractHttpUrls(value);
  if (urls.length > 1 && /primary sources/i.test(value)) {
    return urls;
  }
  return [value];
}

function extractFieldValue(lines, prefix) {
  const line = lines.find((entry) => entry.toLowerCase().startsWith(prefix.toLowerCase()));
  return line ? line.slice(prefix.length).trim().replace(/^`|`$/g, "") : null;
}

function buildRefLink(value, skillSlugSet, context = {}) {
  const viaMatch = value.match(/^([a-z0-9-]+)\s+via\s+/i);
  if (viaMatch && skillSlugSet.has(viaMatch[1])) {
    const slug = viaMatch[1];
    const link = {
      label: "",
      href: `#/workflows/${slug}`,
      kind: "internal-skill",
      slug,
    };
    link.label = formatLinkLabel(value, { ...link, skillTitleBySlug: context.skillTitleBySlug });
    return link;
  }

  const repoPath = detectRepoPath(value);
  const directUrl = detectHttpUrl(value);
  const relatedSkillMatch = value.match(/`([a-z0-9-]+)`/i);
  const relatedSlug = relatedSkillMatch?.[1] ?? null;
  const upstreamRepoUrl = context.upstreamSourceUrl ?? null;

  if (directUrl) {
    const link = {
      label: "",
      href: directUrl,
      kind: "external",
    };
    link.label = formatLinkLabel(value, { ...link, skillTitleBySlug: context.skillTitleBySlug });
    return link;
  }

  if (repoPath) {
    const repoScopedHref =
      upstreamRepoUrl && !repoPath.startsWith("runs/") && !repoPath.startsWith("docs/") && !repoPath.startsWith("reports/")
        ? `${upstreamRepoUrl.replace(/\/$/, "")}/tree/main/${repoPath}`
        : repoPathToUrl(repoPath);
    const link = {
      label: "",
      href: repoScopedHref,
      kind:
        upstreamRepoUrl && !repoPath.startsWith("runs/")
          ? "upstream-path"
          : repoPath.startsWith("skills/wiki/")
            ? "repo-skill-file"
            : "repo-evidence",
      repoPath,
    };
    link.label = formatLinkLabel(value, { ...link, skillTitleBySlug: context.skillTitleBySlug });
    return link;
  }

  if (value.toLowerCase().startsWith("source repo:")) {
    const repoName = value.split(":").slice(1).join(":").trim().replace(/^`|`$/g, "");
    if (/^[\w.-]+\/[\w.-]+$/.test(repoName)) {
      const link = {
        label: "",
        href: `https://github.com/${repoName}`,
        kind: "external",
      };
      link.label = formatLinkLabel(value, link);
      return link;
    }
  }

  if (relatedSlug && skillSlugSet.has(relatedSlug)) {
    const link = {
      label: "",
      href: `#/workflows/${relatedSlug}`,
      kind: "internal-skill",
      slug: relatedSlug,
    };
    link.label = formatLinkLabel(value, { ...link, skillTitleBySlug: context.skillTitleBySlug });
    return link;
  }

  const plainLink = {
    label: formatLinkLabel(value, { kind: "plain-text", skillTitleBySlug: context.skillTitleBySlug }),
    href: null,
    kind: "plain-text",
  };
  return plainLink;
}

function inferCategory({ title, summary, tags, searchText, sourcePath }) {
  const haystack = `${title} ${summary} ${tags.join(" ")}`.toLowerCase();
  const tagSet = new Set(tags.map((tag) => tag.toLowerCase()));

  // Phase 1: Tag-first matching (most reliable signal)
  for (const category of CATEGORY_DEFINITIONS) {
    if (!category.tags) continue;
    if (category.tags.some((tag) => tagSet.has(tag.toLowerCase()))) {
      return category;
    }
  }

  // Phase 2: Keyword matching in title/summary/tags only (not full searchText)
  const hasKeyword = (keywords) => keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));

  // Check specific categories before broad ones
  for (const category of CATEGORY_DEFINITIONS) {
    if (!category.keywords) continue;
    if (hasKeyword(category.keywords)) {
      return category;
    }
  }

  // Fallback: collections
  return CATEGORY_DEFINITIONS.find((category) => category.slug === "collections");
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
  const provenanceLines = provenance.bullets;
  const upstreamSourceRepo = extractFieldValue(provenanceLines, "Source repo:");
  const upstreamSourceUrl = extractFieldValue(provenanceLines, "Source URL:");
  const upstreamSourcePathHint = extractFieldValue(provenanceLines, "Source path hint:");

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
    upstreamSourceRepo,
    upstreamSourceUrl,
    upstreamSourcePathHint,
    sections: sections.map((section) => formatSection(section)),
  };
}

function buildLinkList(bullets, skillSlugSet, context = {}) {
  return bullets
    .flatMap((value) => expandRefBullet(value))
    .map((value) => buildRefLink(value, skillSlugSet, context));
}

function buildPayload() {
  const baseSkills = listMarkdownFiles(skillWikiDir).map(buildSkillRecord);
  const skillSlugSet = new Set(baseSkills.map((skill) => skill.slug));
  const skillTitleBySlug = new Map(baseSkills.map((skill) => [skill.slug, skill.title]));
  const linkContext = (skill) => ({
    upstreamSourceUrl: skill.upstreamSourceUrl,
    skillTitleBySlug,
  });
  const skills = baseSkills.map((skill) => {
    const category = inferCategory(skill);

    return {
      ...skill,
      sourceUrl: repoPathToUrl(skill.sourcePath),
      sourceLabel: formatRepoPathLabel(skill.sourcePath),
      category: {
        slug: category.slug,
        label: category.label,
        description: category.description,
      },
      evidenceLinks: buildLinkList(skill.evidenceRefs.bullets, skillSlugSet, linkContext(skill)),
      relatedSkillLinks: buildLinkList(skill.relatedSkills.bullets, skillSlugSet, linkContext(skill)),
      provenanceLinks: buildLinkList(skill.provenance.bullets, skillSlugSet, linkContext(skill)),
      scopeLinks: buildLinkList(skill.scope.bullets, skillSlugSet, linkContext(skill)),
      nonScopeLinks: buildLinkList(skill.nonScope.bullets, skillSlugSet, linkContext(skill)),
    };
  });

  const tagCount = new Set(skills.flatMap((skill) => skill.tags)).size;
  const evidenceRefCount = skills.reduce((count, skill) => count + skill.evidenceRefs.bullets.length, 0);
  const categoryStats = CATEGORY_DEFINITIONS.map((category) => ({
    slug: category.slug,
    label: category.label,
    description: category.description,
    count: skills.filter((skill) => skill.category.slug === category.slug).length,
  }));

  return {
    generatedAt: new Date().toISOString(),
    sourceDirectory: "skills/wiki",
    repoGitHubBase,
    stats: {
      skillCount: skills.length,
      tagCount,
      evidenceRefCount,
    },
    categories: categoryStats,
    skills,
  };
}

const payload = buildPayload();
const moduleSource = `export const skillWikiPayload = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(outputPath, moduleSource);
console.log(`Generated ${outputPath}`);
