import { skillWikiPayload } from "./data/skills.generated.js";

const app = document.getElementById("app");
const SITE_URL = "https://runwiser-wiki.vercel.app/";
const SITE_NAME = "Runwiser Wiki";
const SITE_DEFAULT_TITLE = "Runwiser Wiki | AI Agent Skills and Workflow Library";
const SITE_DEFAULT_DESCRIPTION =
  "Browse by Claude, Codex, Office, Media, DevOps, Automation, Research, and Collections — reusable AI agent skills, workflow playbooks, and evidence-backed execution patterns in an English-first skill wiki.";
const SITE_OG_IMAGE = "https://runwiser.vercel.app/brand/runwise-icon-512.png";

function getRoute() {
  const raw = window.location.hash.slice(1) || "/";
  const normalized = raw.startsWith("/") ? raw : `/${raw}`;

  if (normalized === "/") {
    return { name: "home" };
  }

  if (normalized === "/skills") {
    return { name: "skills" };
  }

  const skillMatch = normalized.match(/^\/skills\/([^/]+)$/);
  if (skillMatch) {
    try {
      return { name: "skill-detail", slug: decodeURIComponent(skillMatch[1]) };
    } catch {
      return { name: "skills" };
    }
  }

  return { name: "skills" };
}

function navigate(path) {
  window.location.hash = path;
}

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);

  if (!(node instanceof HTMLMetaElement) && !(node instanceof HTMLLinkElement)) {
    node = selector.startsWith("link") ? document.createElement("link") : document.createElement("meta");
    document.head.appendChild(node);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
}

function updateStructuredData({ title, description, url }) {
  const script = document.getElementById("structured-data");
  if (!(script instanceof HTMLScriptElement)) {
    return;
  }

  script.textContent = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url,
      inLanguage: "en",
      description,
      headline: title,
    },
    null,
    2,
  );
}

function setPageMeta({ title, description, path }) {
  const url = new URL(path, SITE_URL).toString();
  document.title = title;

  upsertMeta('meta[name="description"]', { name: "description", content: description });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: SITE_OG_IMAGE });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: SITE_OG_IMAGE });
  upsertMeta('link[rel="canonical"]', { rel: "canonical", href: url });
  updateStructuredData({ title, description, url });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const CATEGORY_COLORS = {
  claude: "#4a9eff",
  codex: "#2dd4bf",
  office: "#f59e0b",
  media: "#ec4899",
  devops: "#8b5cf6",
  automation: "#06b6d4",
  research: "#3b82f6",
  collections: "#6b7280",
};

function getCategoryColor(slug) {
  return CATEGORY_COLORS[slug] ?? "#6b7280";
}

function truncateText(value, length = 180) {
  return value.length <= length ? value : `${value.slice(0, length - 1)}…`;
}

function getStats() {
  const highRisk = skillWikiPayload.skills.filter((skill) => skill.riskLevel.toLowerCase() === "high").length;
  const latestUpdated = skillWikiPayload.skills
    .map((skill) => skill.updatedAt)
    .find((value) => value && value !== "Not specified");

  return [
    {
      label: "Wiki skills",
      value: String(skillWikiPayload.stats.skillCount),
      description: "Canonical entries sourced directly from skills/wiki/*.md",
    },
    {
      label: "Evidence refs",
      value: String(skillWikiPayload.stats.evidenceRefCount),
      description: "Proof links preserved and converted into repository-aware references",
    },
    {
      label: "Categories",
      value: String(skillWikiPayload.categories.length),
      description: "Editorial board structure layered over raw wiki tags",
    },
    {
      label: "Latest update",
      value: latestUpdated ?? "Not specified",
      description: "Newest visible wiki timestamp in the current catalog",
    },
    {
      label: "High-risk skills",
      value: String(highRisk),
      description: "Entries that require tighter review before operational use",
    },
  ];
}

function scoreSkill(skill) {
  return (
    skill.tags.length +
    skill.evidenceLinks.filter((link) => link.href).length * 2 +
    skill.steps.steps.length * 2 +
    skill.whenToUse.bullets.length +
    skill.failureModes.bullets.length +
    skill.relatedSkillLinks.filter((link) => link.href).length
  );
}

function getFeaturedSkill() {
  return [...skillWikiPayload.skills]
    .sort((left, right) => scoreSkill(right) - scoreSkill(left) || left.title.localeCompare(right.title))[0] ?? null;
}

function getSkillsByCategory(categorySlug) {
  return skillWikiPayload.skills
    .filter((skill) => skill.category.slug === categorySlug)
    .sort((left, right) => scoreSkill(right) - scoreSkill(left) || left.title.localeCompare(right.title));
}

function getCategorySections() {
  return skillWikiPayload.categories
    .map((category) => ({
      ...category,
      skills: getSkillsByCategory(category.slug),
    }))
    .filter((category) => category.skills.length > 0);
}

function getAllTags() {
  return [...new Set(skillWikiPayload.skills.flatMap((skill) => skill.tags))].sort((left, right) =>
    left.localeCompare(right),
  );
}

function filterSkills(skills, query, activeCategory, activeTag, activeRisk) {
  const normalizedQuery = query.trim().toLowerCase();

  return skills.filter((skill) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      skill.title.toLowerCase().includes(normalizedQuery) ||
      skill.summary.toLowerCase().includes(normalizedQuery) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
      skill.searchText.includes(normalizedQuery);
    const matchesCategory = activeCategory === "all" || skill.category.slug === activeCategory;
    const matchesTag = activeTag === "all" || skill.tags.includes(activeTag);
    const matchesRisk = activeRisk === "all" || skill.riskLevel.toLowerCase() === activeRisk;

    return matchesQuery && matchesCategory && matchesTag && matchesRisk;
  });
}

function sortSkills(skills, sortKey) {
  const next = [...skills];

  switch (sortKey) {
    case "updated":
      return next.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    case "risk":
      return next.sort((left, right) => left.riskLevel.localeCompare(right.riskLevel) || left.title.localeCompare(right.title));
    case "signal":
      return next.sort((left, right) => scoreSkill(right) - scoreSkill(left) || left.title.localeCompare(right.title));
    default:
      return next.sort((left, right) => left.title.localeCompare(right.title));
  }
}

function renderTagList(tags, limit = 5) {
  if (tags.length === 0) {
    return `<span class="chip chip-muted">No tags specified</span>`;
  }

  const visible = tags.slice(0, limit);
  const hiddenCount = tags.length - visible.length;

  return [
    ...visible.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`),
    hiddenCount > 0 ? `<span class="chip chip-muted">+${hiddenCount}</span>` : "",
  ].join("");
}

function renderList(items) {
  if (items.length === 0) {
    return `<p class="empty-copy">Not specified in wiki.</p>`;
  }

  return `
    <ul class="detail-list">
      ${items
        .map(
          (item) => `
            <li>
              <span class="list-dot"></span>
              <span>${escapeHtml(item)}</span>
            </li>`,
        )
        .join("")}
    </ul>
  `;
}

function renderParagraphs(items) {
  if (items.length === 0) {
    return `<p class="empty-copy">Not specified in wiki.</p>`;
  }

  return items.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

function renderLinkList(links, emptyLabel = "No linked evidence available.") {
  if (links.length === 0) {
    return `<p class="empty-copy">${escapeHtml(emptyLabel)}</p>`;
  }

  return `
    <ul class="detail-list">
      ${links
        .map((link) => {
          const label = escapeHtml(link.label);
          const meta = escapeHtml(link.kind.replaceAll("-", " "));
          const isGitHubExternal = link.kind === "external" && link.href && link.href.includes("github.com");
          const githubBadge = isGitHubExternal ? `<span class="link-badge link-badge-github">GitHub</span>` : "";
          if (!link.href) {
            return `
              <li>
                <span class="list-dot"></span>
                <span>${label}</span>
                <span class="link-kind">${meta}</span>
              </li>`;
          }

          const external = /^https?:\/\//.test(link.href);
          return `
            <li>
              <span class="list-dot"></span>
              <a class="evidence-link" href="${escapeHtml(link.href)}" ${external ? 'target="_blank" rel="noreferrer"' : ""}>${label}</a>
              <span class="link-kind">${meta}${githubBadge}</span>
            </li>`;
        })
        .join("")}
    </ul>
  `;
}

function renderHeader(route) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/skills", label: "Browse" },
  ];

  return `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#/">
          <span class="brand-mark">RW</span>
          <span class="brand-copy">
            <small>Runwiser</small>
            <strong>Wiki</strong>
          </span>
        </a>
        <nav class="nav">
          ${links
            .map((link) => {
              const isActive =
                route.name === "home"
                  ? link.href === "/"
                  : link.href === "/skills" && (route.name === "skills" || route.name === "skill-detail");
              return `<a class="${isActive ? "active" : ""}" href="#${link.href}">${link.label}</a>`;
            })
            .join("")}
        </nav>
        <a class="cta" href="#/skills">Open catalog</a>
      </div>
    </header>
  `;
}

function renderCategoryRail() {
  return `
    <div class="category-rail">
      ${getCategorySections()
        .map(
          (category) => `
            <button class="category-jump" data-category-jump="${escapeHtml(category.slug)}" type="button">
              <span class="category-dot" style="background:${getCategoryColor(category.slug)}"></span>
              <span>${escapeHtml(category.label)}</span>
              <strong>${escapeHtml(String(category.count))}</strong>
            </button>`,
        )
        .join("")}
    </div>
  `;
}

function renderHomePage() {
  const featured = getFeaturedSkill();
  const stats = getStats();
  const categorySections = getCategorySections();
  const latestSkills = sortSkills([...skillWikiPayload.skills], "updated").slice(0, 4);

  return `
    <div class="stack">
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">Editorial skill hub</span>
          <h1>Browse AI agent skills like a real product, not a markdown dump.</h1>
          <p class="lede">
            Runwiser Wiki turns repository-owned skill pages into a browsable board of categories, evidence, and reusable workflows. Browse by Claude, Codex, Office, Media, DevOps, Automation, Research, and Collections, then drill into canonical skill detail pages with source and proof links intact.
          </p>
          <div class="hero-actions">
            <button class="cta" data-nav="/skills" type="button">Browse all skills</button>
            ${
              featured
                ? `<button class="cta ghost" data-nav="/skills/${escapeHtml(featured.slug)}" type="button">Open featured skill</button>`
                : ""
            }
          </div>
        </div>
        <div class="hero-panel">
          <div class="hero-panel-kicker">Category board</div>
          ${renderCategoryRail()}
          <div class="hero-note">
            <strong>${escapeHtml(String(skillWikiPayload.stats.evidenceRefCount))}</strong>
            evidence references are preserved as navigable repo or GitHub links.
          </div>
        </div>
      </section>

      <section class="section section-tinted">
        <div class="section-head">
          <div>
            <span class="eyebrow">Overview</span>
            <h2>The wiki now reads as an organized board, not a loose tag wall.</h2>
          </div>
          <p class="section-intro">
            Categories give the first layer of orientation. Tags still exist, but they now refine the catalog instead of defining the whole product.
          </p>
        </div>
        <div class="stats-grid">
          ${stats
            .map(
              (stat) => `
                <article class="stat-card">
                  <span class="stat-label">${escapeHtml(stat.label)}</span>
                  <strong>${escapeHtml(stat.value)}</strong>
                  <p>${escapeHtml(stat.description)}</p>
                </article>`,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="eyebrow">Primary boards</span>
            <h2>Start from a stable category, then narrow down with filters.</h2>
          </div>
          <p class="section-intro">Eight boards cover Claude, Codex, Office, Media, DevOps, Automation, Research, and Collections.</p>
        </div>
        <div class="board-grid">
          ${categorySections
            .map(
              (category) => `
                <article class="board-card" id="home-category-${escapeHtml(category.slug)}" data-category-color="${getCategoryColor(category.slug)}" style="border-top:3px solid ${getCategoryColor(category.slug)}">
                  <div class="board-head">
                    <div>
                      <span class="board-kicker">${escapeHtml(category.label)}</span>
                      <h3>${escapeHtml(String(category.count))} skills</h3>
                    </div>
                    <button class="text-action" data-category-open="${escapeHtml(category.slug)}" type="button">See board</button>
                  </div>
                  <p>${escapeHtml(category.description)}</p>
                  <div class="board-preview">
                    ${category.skills
                      .slice(0, 3)
                      .map(
                        (skill) => `
                          <button class="preview-link" data-nav="/skills/${escapeHtml(skill.slug)}" type="button">
                            <strong>${escapeHtml(skill.title)}</strong>
                            <span>${escapeHtml(truncateText(skill.summary, 92))}</span>
                          </button>`,
                      )
                      .join("")}
                  </div>
                </article>`,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="eyebrow">Featured</span>
            <h2>High-signal skills worth opening first.</h2>
          </div>
          <p class="section-intro">Recent or rich entries surface first so the front page feels curated instead of exhaustive.</p>
        </div>
        <div class="cards-grid cards-grid-wide">
          ${latestSkills.map((skill) => renderSkillCard(skill, featured && skill.slug === featured.slug)).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderSkillCard(skill, featured = false) {
  const upstreamLinkHtml = skill.upstreamSourceUrl
    ? `<a class="upstream-link" href="${escapeHtml(skill.upstreamSourceUrl)}" target="_blank" rel="noreferrer">
        <svg class="upstream-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        ${escapeHtml(skill.upstreamSourceRepo ?? "Source")}
      </a>`
    : "";

  return `
    <article class="skill-card ${featured ? "skill-card-featured" : ""}">
      <div class="card-topline">
        <span class="pill pill-brand" style="border-color:${getCategoryColor(skill.category.slug)};background:${getCategoryColor(skill.category.slug)}22;color:${getCategoryColor(skill.category.slug)}">${featured ? "Featured" : escapeHtml(skill.category.label)}</span>
        <span class="pill">${escapeHtml(`Risk: ${skill.riskLevel}`)}</span>
      </div>
      <h3>${escapeHtml(skill.title)}</h3>
      <p class="card-summary">${escapeHtml(skill.summary)}</p>
      <div class="chip-row">${renderTagList(skill.tags, featured ? 6 : 4)}</div>
      <div class="card-meta">
        <div>
          <strong>${escapeHtml(skill.updatedAt)}</strong>
          <small>${escapeHtml(skill.sourcePath.replace("skills/wiki/", ""))}</small>
          ${upstreamLinkHtml}
        </div>
        <button class="cta dark" data-nav="/skills/${escapeHtml(skill.slug)}" type="button">Open detail</button>
      </div>
    </article>
  `;
}

function renderSkillsPage() {
  const tags = getAllTags();
  const categories = getCategorySections();
  const riskOptions = ["all", ...new Set(skillWikiPayload.skills.map((skill) => skill.riskLevel.toLowerCase()))];

  return `
    <div class="stack">
      <section class="section section-hero-lite">
        <div class="section-head">
          <div>
            <span class="eyebrow">Catalog</span>
            <h2>Move from category board to precise skill detail.</h2>
          </div>
          <p class="section-intro">
            Start with an editorial board. Then layer risk, tags, or raw text search when you know what you're looking for.
          </p>
        </div>
        <div class="catalog-layout">
          <aside class="catalog-sidebar">
            <div class="sidebar-block">
              <span class="sidebar-label">Boards</span>
              <div class="sidebar-buttons">
                <button class="sidebar-chip active" data-category="all" type="button">All boards</button>
                ${categories
                  .map(
                    (category) => `
                      <button class="sidebar-chip" data-category="${escapeHtml(category.slug)}" type="button" style="border-left:3px solid ${getCategoryColor(category.slug)}">
                        ${escapeHtml(category.label)} <strong>${escapeHtml(String(category.count))}</strong>
                      </button>`,
                  )
                  .join("")}
              </div>
            </div>
            <div class="sidebar-block">
              <span class="sidebar-label">Filters</span>
              <div class="field-stack">
                <label class="field">
                  <span>Search</span>
                  <input id="searchInput" placeholder="Search title, summary, tags, or section text" />
                </label>
                <label class="field">
                  <span>Risk</span>
                  <select id="riskSelect">
                    ${riskOptions
                      .map(
                        (option) => `<option value="${escapeHtml(option)}">${option === "all" ? "All risks" : escapeHtml(option)}</option>`,
                      )
                      .join("")}
                  </select>
                </label>
                <label class="field">
                  <span>Sort</span>
                  <select id="sortSelect">
                    <option value="signal">Signal</option>
                    <option value="updated">Updated time</option>
                    <option value="title">Title</option>
                    <option value="risk">Risk level</option>
                  </select>
                </label>
              </div>
            </div>
          </aside>
          <div class="catalog-main">
            <div class="tag-toolbar">
              <div class="tag-toolbar-copy">
                <span class="eyebrow">Tags</span>
                <h3>Secondary filter layer</h3>
              </div>
              <button class="text-action" id="clearFilters" type="button">Clear all</button>
            </div>
            <div class="tag-cloud" id="tagFilters">
              <button class="chip active" data-tag="all" type="button">All tags</button>
              ${tags.map((tag) => `<button class="chip" data-tag="${escapeHtml(tag)}" type="button">${escapeHtml(tag)}</button>`).join("")}
            </div>
            <div class="catalog-results-head">
              <div>
                <span class="eyebrow">Result</span>
                <h3 id="catalogCount">0 skills available</h3>
              </div>
              <p class="section-intro">Every result maps back to a canonical markdown skill page and keeps its repo evidence visible.</p>
            </div>
            <div class="cards-grid cards-grid-wide" id="catalogGrid"></div>
            <div class="empty-state" id="catalogEmpty" hidden>
              <h3>No wiki skill matches this filter.</h3>
              <p>Broaden the board, clear the tag, or search with a higher-level workflow term.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderInfoPanel(title, content) {
  return `
    <article class="info-panel">
      <h3>${escapeHtml(title)}</h3>
      <div>${content}</div>
    </article>
  `;
}

function renderSkillDetailPage(skill) {
  const overviewIsDuplicate = skill.overview.paragraphs.length === 0 || skill.overview.paragraphs[0] === skill.summary;
  const primaryCards = [
    { title: "When to use", content: renderList(skill.whenToUse.bullets) },
    { title: "When not to use", content: renderList(skill.whenNotToUse.bullets) },
    { title: "Inputs", content: renderList(skill.inputs.bullets) },
    { title: "Outputs", content: renderList(skill.outputs.bullets) },
    { title: "Failure modes", content: renderList(skill.failureModes.bullets) },
  ];

  const upstreamSourceHtml = skill.upstreamSourceUrl
    ? `<a class="evidence-link" href="${escapeHtml(skill.upstreamSourceUrl)}" target="_blank" rel="noreferrer">
        <svg class="upstream-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" style="vertical-align:middle;margin-right:4px"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        ${escapeHtml(skill.upstreamSourceRepo ?? skill.upstreamSourceUrl)}
      </a>`
    : `<strong>Not available</strong>`;

  return `
    <div class="stack">
      <section class="detail-hero">
        <article class="detail-main">
          <button class="text-back" data-nav="/skills" type="button">Back to catalog</button>
          <div class="detail-topline">
            <span class="pill pill-brand" style="border-color:${getCategoryColor(skill.category.slug)};background:${getCategoryColor(skill.category.slug)}22;color:${getCategoryColor(skill.category.slug)}">${escapeHtml(skill.category.label)}</span>
            <span class="pill">${escapeHtml(`Risk: ${skill.riskLevel}`)}</span>
          </div>
          <h1>${escapeHtml(skill.title)}</h1>
          <p class="detail-lede">${escapeHtml(skill.summary)}</p>
          <div class="chip-row">${renderTagList(skill.tags, 7)}</div>
          <div class="detail-actions">
            <a class="cta dark" href="${escapeHtml(skill.sourceUrl)}" target="_blank" rel="noreferrer">Open source file</a>
            ${
              skill.evidenceLinks.find((link) => link.href)
                ? `<a class="cta ghost" href="${escapeHtml(skill.evidenceLinks.find((link) => link.href).href)}" target="_blank" rel="noreferrer">Open first evidence</a>`
                : ""
            }
          </div>
        </article>
        <aside class="detail-sidebar">
          <div class="detail-fact">
            <span>Category</span>
            <strong>${escapeHtml(skill.category.label)}</strong>
            <p>${escapeHtml(skill.category.description)}</p>
          </div>
          <div class="detail-fact">
            <span>Updated</span>
            <strong>${escapeHtml(skill.updatedAt)}</strong>
            <p>Canonical wiki freshness timestamp.</p>
          </div>
          <div class="detail-fact">
            <span>Source path</span>
            <a class="evidence-link" href="${escapeHtml(skill.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(skill.sourcePath)}</a>
            <p>Repository-owned markdown entry.</p>
          </div>
          <div class="detail-fact">
            <span>Source repo</span>
            ${upstreamSourceHtml}
            <p>Upstream GitHub repository where the skill originated.</p>
          </div>
        </aside>
      </section>

      ${
        skill.steps.steps.length > 0
          ? `
            <section class="section">
              <div class="section-head">
                <div>
                  <span class="eyebrow">Execution path</span>
                  <h2>Workflow steps preserved from the wiki.</h2>
                </div>
              </div>
              <ol class="step-list">
                ${skill.steps.steps
                  .map(
                    (step, index) => `
                      <li class="step-card">
                        <span class="step-index">${index + 1}</span>
                        <p>${escapeHtml(step)}</p>
                      </li>`,
                  )
                  .join("")}
              </ol>
            </section>`
          : ""
      }

      <section class="detail-grid">
        ${primaryCards.map((section) => renderInfoPanel(section.title, section.content)).join("")}
      </section>

      <section class="detail-grid detail-grid-large">
        ${renderInfoPanel("Evidence refs", renderLinkList(skill.evidenceLinks, "No linked evidence references."))}
        ${renderInfoPanel("Related skills", renderLinkList(skill.relatedSkillLinks, "No related skills specified."))}
        ${renderInfoPanel("Provenance", renderLinkList(skill.provenanceLinks, "No provenance links available."))}
        ${renderInfoPanel("Scope", renderLinkList(skill.scopeLinks, "No linked scope references."))}
        ${renderInfoPanel("Non-scope", renderLinkList(skill.nonScopeLinks, "No linked non-scope references."))}
      </section>

      ${
        overviewIsDuplicate
          ? ""
          : `
            <section class="section">
              <div class="section-head">
                <div>
                  <span class="eyebrow">Overview</span>
                  <h2>Narrative from the canonical wiki entry.</h2>
                </div>
              </div>
              <div class="prose">${renderParagraphs(skill.overview.paragraphs)}</div>
            </section>`
      }
    </div>
  `;
}

function renderNotFound() {
  return `
    <div class="empty-state">
      <h3>Skill not found.</h3>
      <p>The requested slug does not exist in the current Skill Wiki dataset.</p>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <span class="eyebrow">Runwiser Wiki</span>
          <h2>Skills, categories, and evidence all stay attached to the repository.</h2>
          <p class="section-intro">
            This web surface is a navigable reading layer over canonical markdown skills. It does not invent marketplace records or hide the proof behind generic cards.
          </p>
        </div>
        <div class="footer-panel">
          <h3>Source of truth</h3>
          <ul class="detail-list">
            <li><span class="list-dot"></span><span>Only reads canonical wiki markdown entries.</span></li>
            <li><span class="list-dot"></span><span>Evidence, provenance, and related references stay linkable.</span></li>
            <li><span class="list-dot"></span><span>Boards are derived from repo content, not from remote APIs.</span></li>
          </ul>
        </div>
      </div>
    </footer>
  `;
}

function renderApp() {
  const route = getRoute();
  let content = "";

  if (route.name === "home") {
    setPageMeta({
      title: SITE_DEFAULT_TITLE,
      description: SITE_DEFAULT_DESCRIPTION,
      path: "/",
    });
    content = renderHomePage();
  } else if (route.name === "skills") {
    setPageMeta({
      title: "Browse Skills | Runwiser Wiki",
      description:
        "Browse the Runwiser Wiki by category board, then refine with risk, tags, and text search across AI agent skills and evidence-backed workflows.",
      path: "/#/skills",
    });
    content = renderSkillsPage();
  } else {
    const skill = skillWikiPayload.skills.find((item) => item.slug === route.slug);
    setPageMeta(
      skill
        ? {
            title: `${skill.title} | Runwiser Wiki`,
            description: skill.summary,
            path: `/#/skills/${skill.slug}`,
          }
        : {
            title: "Skill detail | Runwiser Wiki",
            description:
              "Open a canonical Runwiser Wiki skill entry to inspect scope, risk level, execution steps, and evidence references.",
            path: "/#/skills",
          },
    );
    content = skill ? renderSkillDetailPage(skill) : renderNotFound();
  }

  app.innerHTML = `
    <div class="shell">
      ${renderHeader(route)}
      <main class="main">
        <div class="container">${content}</div>
      </main>
      ${renderFooter()}
    </div>
  `;

  bindInteractions();
}

function bindInteractions() {
  const catalogGrid = document.getElementById("catalogGrid");
  const catalogCount = document.getElementById("catalogCount");
  const catalogEmpty = document.getElementById("catalogEmpty");
  const searchInput = document.getElementById("searchInput");
  const riskSelect = document.getElementById("riskSelect");
  const sortSelect = document.getElementById("sortSelect");
  const tagButtons = [...document.querySelectorAll("[data-tag]")];
  const categoryButtons = [...document.querySelectorAll("[data-category]")];
  const clearFilters = document.getElementById("clearFilters");
  const categoryJumpButtons = [...document.querySelectorAll("[data-category-jump]")];
  const categoryOpenButtons = [...document.querySelectorAll("[data-category-open]")];

  categoryJumpButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category-jump");
      navigate("/skills");
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const target = document.querySelector(`[data-category="${category}"]`);
          if (target instanceof HTMLElement) {
            target.click();
          }
        });
      });
    });
  });

  categoryOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category-open");
      navigate("/skills");
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const target = document.querySelector(`[data-category="${category}"]`);
          if (target instanceof HTMLElement) {
            target.click();
          }
        });
      });
    });
  });

  if (!(catalogGrid instanceof HTMLElement) || !(catalogCount instanceof HTMLElement) || !(catalogEmpty instanceof HTMLElement)) {
    return;
  }

  let activeTag = "all";
  let activeCategory = "all";

  const updateCatalog = () => {
    const query = searchInput instanceof HTMLInputElement ? searchInput.value : "";
    const activeRisk = riskSelect instanceof HTMLSelectElement ? riskSelect.value : "all";
    const activeSort = sortSelect instanceof HTMLSelectElement ? sortSelect.value : "signal";
    const filtered = sortSkills(
      filterSkills(skillWikiPayload.skills, query, activeCategory, activeTag, activeRisk),
      activeSort,
    );

    catalogCount.textContent = `${filtered.length} skill${filtered.length === 1 ? "" : "s"} available`;
    catalogGrid.innerHTML = filtered.map((skill) => renderSkillCard(skill)).join("");
    catalogEmpty.hidden = filtered.length > 0;
  };

  if (searchInput instanceof HTMLInputElement) {
    searchInput.addEventListener("input", updateCatalog);
  }

  if (riskSelect instanceof HTMLSelectElement) {
    riskSelect.addEventListener("change", updateCatalog);
  }

  if (sortSelect instanceof HTMLSelectElement) {
    sortSelect.addEventListener("change", updateCatalog);
  }

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTag = button.getAttribute("data-tag") ?? "all";
      tagButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      updateCatalog();
    });
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.getAttribute("data-category") ?? "all";
      categoryButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      updateCatalog();
    });
  });

  if (clearFilters instanceof HTMLButtonElement) {
    clearFilters.addEventListener("click", () => {
      activeTag = "all";
      activeCategory = "all";
      tagButtons.forEach((item) => item.classList.toggle("active", item.getAttribute("data-tag") === "all"));
      categoryButtons.forEach((item) =>
        item.classList.toggle("active", item.getAttribute("data-category") === "all"),
      );
      if (searchInput instanceof HTMLInputElement) {
        searchInput.value = "";
      }
      if (riskSelect instanceof HTMLSelectElement) {
        riskSelect.value = "all";
      }
      if (sortSelect instanceof HTMLSelectElement) {
        sortSelect.value = "signal";
      }
      updateCatalog();
    });
  }

  updateCatalog();
}

app.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target.closest("[data-nav]") : null;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const nextPath = target.dataset.nav;
  if (nextPath) {
    navigate(nextPath);
  }
});

window.addEventListener("hashchange", renderApp);

renderApp();
