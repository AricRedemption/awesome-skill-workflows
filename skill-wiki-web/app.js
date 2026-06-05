import { skillWikiPayload } from "./data/skills.generated.js";

const app = document.getElementById("app");
const SITE_URL = "https://runwiser-wiki.vercel.app/";
const SITE_NAME = "Runwiser Wiki";
const SITE_DEFAULT_TITLE = "Runwiser Wiki | AI Agent Skills and Workflow Library";
const SITE_DEFAULT_DESCRIPTION =
  "Browse reusable AI agent skills, workflow playbooks, and evidence-backed execution patterns in an English-first skill wiki.";
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
    node = selector.startsWith("link")
      ? document.createElement("link")
      : document.createElement("meta");
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

  upsertMeta('meta[name="description"]', {
    name: "description",
    content: description,
  });
  upsertMeta('meta[property="og:title"]', {
    property: "og:title",
    content: title,
  });
  upsertMeta('meta[property="og:description"]', {
    property: "og:description",
    content: description,
  });
  upsertMeta('meta[property="og:url"]', {
    property: "og:url",
    content: url,
  });
  upsertMeta('meta[property="og:image"]', {
    property: "og:image",
    content: SITE_OG_IMAGE,
  });
  upsertMeta('meta[name="twitter:title"]', {
    name: "twitter:title",
    content: title,
  });
  upsertMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: description,
  });
  upsertMeta('meta[name="twitter:image"]', {
    name: "twitter:image",
    content: SITE_OG_IMAGE,
  });
  upsertMeta('link[rel="canonical"]', {
    rel: "canonical",
    href: url,
  });
  updateStructuredData({ title, description, url });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderTagList(tags) {
  if (tags.length === 0) {
    return `<span class="tag">No tags specified</span>`;
  }

  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderCompactTagList(tags, limit = 5) {
  if (tags.length === 0) {
    return `<span class="tag">No tags specified</span>`;
  }

  const visible = tags.slice(0, limit);
  const hiddenCount = tags.length - visible.length;

  return [
    ...visible.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`),
    hiddenCount > 0 ? `<span class="tag muted">+${hiddenCount} more</span>` : "",
  ].join("");
}

function renderList(items) {
  if (items.length === 0) {
    return `<p>Not specified in wiki.</p>`;
  }

  return `
    <ul class="list">
      ${items
        .map(
          (item) => `
            <li>
              <span class="dot"></span>
              <span>${escapeHtml(item)}</span>
            </li>`,
        )
        .join("")}
    </ul>
  `;
}

function renderParagraphs(items) {
  if (items.length === 0) {
    return `<p>Not specified in wiki.</p>`;
  }

  return items.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
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
      description: "Repository proof links preserved from the wiki pages",
    },
    {
      label: "High-risk skills",
      value: String(highRisk),
      description: "Entries marked high risk in the Skill Wiki",
    },
    {
      label: "Latest update",
      value: latestUpdated ?? "Not specified",
      description: "Newest visible wiki timestamp in the current catalog",
    },
  ];
}

function getFeaturedSkill() {
  const scored = [...skillWikiPayload.skills].map((skill) => {
    const richnessScore =
      skill.tags.length +
      skill.evidenceRefs.bullets.length * 2 +
      skill.steps.steps.length * 2 +
      skill.whenToUse.bullets.length +
      skill.failureModes.bullets.length +
      skill.relatedSkills.bullets.length;

    const externalPenalty = skill.tags.includes("external") ? -2 : 0;
    return {
      skill,
      score: richnessScore + externalPenalty,
    };
  });

  scored.sort((left, right) => right.score - left.score || left.skill.title.localeCompare(right.skill.title));
  return scored[0]?.skill ?? null;
}

function getAllTags() {
  return [...new Set(skillWikiPayload.skills.flatMap((skill) => skill.tags))].sort((left, right) =>
    left.localeCompare(right),
  );
}

function getTopTags(limit = 18) {
  const counts = new Map();
  for (const skill of skillWikiPayload.skills) {
    for (const tag of skill.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}

function filterSkills(skills, query, activeTag, activeRisk) {
  const normalizedQuery = query.trim().toLowerCase();

  return skills.filter((skill) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      skill.title.toLowerCase().includes(normalizedQuery) ||
      skill.summary.toLowerCase().includes(normalizedQuery) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
      skill.searchText.includes(normalizedQuery);
    const matchesTag = activeTag === "all" || skill.tags.includes(activeTag);
    const matchesRisk = activeRisk === "all" || skill.riskLevel.toLowerCase() === activeRisk;

    return matchesQuery && matchesTag && matchesRisk;
  });
}

function sortSkills(skills, sortKey) {
  const next = [...skills];

  switch (sortKey) {
    case "updated":
      return next.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    case "risk":
      return next.sort((left, right) => left.riskLevel.localeCompare(right.riskLevel) || left.title.localeCompare(right.title));
    default:
      return next.sort((left, right) => left.title.localeCompare(right.title));
  }
}

function renderHeader(route) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/skills", label: "Find Skills" },
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
        <a class="cta" href="#/skills">Open Wiki</a>
      </div>
    </header>
  `;
}

function renderHomePage() {
  const featured = getFeaturedSkill();
  const stats = getStats();
  const previewSkills = sortSkills([...skillWikiPayload.skills], "updated").slice(0, 6);

  return `
    <div class="stack">
      <section class="hero hero-centered">
        <div class="hero-stack">
          <span class="eyebrow hero-pill">English-first AI agent skill wiki</span>
          <h1 class="hero-title-centered">Open the wiki and find reusable skills faster.</h1>
          <p class="lede hero-lede-centered">
            More like a product catalog than a document dump. Search first, scan faster, then open the detail page for scope, workflow boundaries, and evidence.
          </p>
          <div class="hero-actions hero-actions-centered">
            <button class="cta hero-cta-dark" data-nav="/skills" type="button">Browse all skills</button>
            ${
              featured
                ? `<button class="cta ghost" data-nav="/skills/${escapeHtml(featured.slug)}" type="button">Open featured skill</button>`
                : ""
            }
          </div>
          <div class="hero-command-card">
            <div class="hero-command-tabs">
              <span class="hero-command-tab active">Quick entry</span>
              <span class="hero-command-tab">Skill Wiki data</span>
            </div>
            <div class="hero-command-body">
              <div class="hero-command-line">
                <span>Search, filter, and open skill details directly from <code>skills/wiki/*.md</code></span>
              </div>
              <div class="hero-command-meta">
                <span>${escapeHtml(String(skillWikiPayload.stats.skillCount))} skills</span>
                <span>${escapeHtml(String(skillWikiPayload.stats.evidenceRefCount))} evidence references</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="home-search-row">
          <div>
            <span class="eyebrow">Explore</span>
            <h2>Start with high-signal skills, then move into the full catalog.</h2>
          </div>
          <button class="cta hero-cta-dark" data-nav="/skills" type="button">Enter the catalog</button>
        </div>
        <p class="section-intro">
          Keep the home page lightweight. Real filtering, search, and skill evaluation all happen inside the catalog.
        </p>
        <div class="stats-strip">
          ${stats
            .map(
              (stat) => `
                <article class="mini-stat">
                  <span class="mini-stat-label">${escapeHtml(stat.label)}</span>
                  <strong>${escapeHtml(stat.value)}</strong>
                </article>`,
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        <div class="catalog-head">
          <div>
            <span class="eyebrow">Featured skills</span>
            <h2>Start with recent high-signal entries.</h2>
          </div>
          <p class="filter-note">Show the 6 most recently updated skills first to reduce first-visit overload.</p>
        </div>
        <div class="cards-grid">
          ${previewSkills.map((skill) => renderSkillCard(skill, featured && skill.slug === featured.slug)).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderSkillCard(skill, featured = false) {
  return `
    <article class="card ${featured ? "featured-card" : ""}">
      <div class="card-head">
        <span class="badge blue">${featured ? "Featured wiki skill" : "Skill Wiki"}</span>
        <span class="badge neutral">Risk: ${escapeHtml(skill.riskLevel)}</span>
      </div>
      <h3>${escapeHtml(skill.title)}</h3>
      <p class="card-summary">${escapeHtml(skill.summary)}</p>
      <div class="tags">${renderCompactTagList(skill.tags, featured ? 6 : 4)}</div>
      <div class="meta-row">
        <div>
          <strong>${escapeHtml(skill.updatedAt)}</strong>
          <small>${escapeHtml(skill.sourcePath.replace("skills/wiki/", ""))}</small>
        </div>
        <button class="cta" data-nav="/skills/${escapeHtml(skill.slug)}" type="button">View details</button>
      </div>
    </article>
  `;
}

function renderSkillsPage() {
  const tags = getAllTags();
  const topTags = new Set(getTopTags());
  const riskOptions = ["all", ...new Set(skillWikiPayload.skills.map((skill) => skill.riskLevel.toLowerCase()))];

  return `
    <div class="stack">
      <section class="section">
        <span class="eyebrow">Find Skills</span>
        <h2>Search the Skill Wiki like a product.</h2>
        <p class="section-intro">
          Search, filter, and open canonical wiki entries. The catalog stays derived-only from <code>skills/wiki/*.md</code>.
        </p>
        <div class="filter-grid">
          <div class="field">
            <label for="searchInput">Search</label>
            <input id="searchInput" placeholder="Search title, summary, tags, or section text" />
          </div>
          <div class="select">
            <label for="riskSelect">Risk</label>
            <select id="riskSelect">
              ${riskOptions
                .map(
                  (option) =>
                    `<option value="${escapeHtml(option)}">${option === "all" ? "All risks" : escapeHtml(option)}</option>`,
                )
                .join("")}
            </select>
          </div>
          <div class="select">
            <label for="sortSelect">Sort</label>
            <select id="sortSelect">
              <option value="title">Title</option>
              <option value="updated">Updated time</option>
              <option value="risk">Risk level</option>
            </select>
          </div>
        </div>
        <div class="filter-tags-head">
          <p class="filter-note">Popular tags first. Expand the full tag set when you need deeper filtering.</p>
          <button class="pill filter-toggle" id="tagToggle" type="button" aria-expanded="false">Show all tags</button>
        </div>
        <div class="pill-row" id="tagFilters">
          <button class="pill active" data-tag="all" type="button">All tags</button>
          ${tags
            .map((tag) => {
              const hiddenClass = topTags.has(tag) ? "" : " tag-hidden";
              return `<button class="pill${hiddenClass}" data-tag="${escapeHtml(tag)}" type="button">${escapeHtml(tag)}</button>`;
            })
            .join("")}
        </div>
      </section>

      <section class="stack">
        <div class="catalog-head">
          <div>
            <span class="eyebrow">Catalog result</span>
            <h2 id="catalogCount">0 skills available</h2>
          </div>
          <p class="filter-note">No synthetic filler records. Every result resolves to a real wiki page.</p>
        </div>
        <div class="cards-grid" id="catalogGrid"></div>
        <div class="empty-state" id="catalogEmpty" hidden>
          <h3>No wiki skill matches this filter.</h3>
          <p>Try a broader query or clear the active tag and risk filter.</p>
        </div>
      </section>
    </div>
  `;
}

function renderSkillDetailPage(skill) {
  const primaryCards = [
    { title: "When to use", content: renderList(skill.whenToUse.bullets) },
    { title: "When not to use", content: renderList(skill.whenNotToUse.bullets) },
    { title: "Inputs", content: renderList(skill.inputs.bullets) },
    { title: "Outputs", content: renderList(skill.outputs.bullets) },
    { title: "Failure modes", content: renderList(skill.failureModes.bullets) },
  ];
  const overviewIsDuplicate =
    skill.overview.paragraphs.length === 0 ||
    skill.overview.paragraphs[0] === skill.summary;

  return `
    <div class="stack">
      <section class="detail-hero">
        <article class="section">
          <button class="cta ghost" data-nav="/skills" type="button">Back to catalog</button>
          <div class="card-head" style="margin-top: 22px;">
            <span class="badge blue">Skill Wiki detail</span>
            <span class="badge neutral">Risk: ${escapeHtml(skill.riskLevel)}</span>
          </div>
          <h1 class="detail-title">${escapeHtml(skill.title)}</h1>
          <p class="detail-lede">${escapeHtml(skill.summary)}</p>
          <div class="tags">${renderCompactTagList(skill.tags, 6)}</div>
        </article>
        <aside class="detail-sidebar section">
          <span class="eyebrow">Quick facts</span>
          <dl>
            <div>
              <dt>Updated at</dt>
              <dd>${escapeHtml(skill.updatedAt)}</dd>
            </div>
            <div>
              <dt>Source path</dt>
              <dd>${escapeHtml(skill.sourcePath)}</dd>
            </div>
            <div>
              <dt>Workflow summary</dt>
              <dd>${escapeHtml(skill.overview.paragraphs[0] ?? "Not specified in wiki.")}</dd>
            </div>
          </dl>
        </aside>
      </section>

      ${
        skill.steps.steps.length > 0
          ? `
            <section class="section">
              <span class="eyebrow">Steps</span>
              <h2>Execution path from the wiki page</h2>
              <div class="steps">
                ${skill.steps.steps
                  .map(
                    (step, index) => `
                      <article class="step">
                        <span class="step-index">${index + 1}</span>
                        <p>${escapeHtml(step)}</p>
                      </article>`,
                  )
                  .join("")}
              </div>
            </section>`
          : ""
      }

      <section class="detail-grid">
        ${primaryCards
          .map(
            (section) => `
              <article class="detail-box">
                <h3>${escapeHtml(section.title)}</h3>
                <div>${section.content}</div>
              </article>`,
          )
          .join("")}
      </section>

      <section class="detail-disclosures">
        <details class="disclosure">
          <summary>Evidence refs</summary>
          <div class="disclosure-body">${renderList(skill.evidenceRefs.bullets)}</div>
        </details>
        <details class="disclosure">
          <summary>Related skills</summary>
          <div class="disclosure-body">${renderList(skill.relatedSkills.bullets)}</div>
        </details>
        <details class="disclosure">
          <summary>Scope, non-scope, and provenance</summary>
          <div class="disclosure-body disclosure-stack">
            <div>
              <h3>Scope</h3>
              ${renderList(skill.scope.bullets)}
            </div>
            <div>
              <h3>Non-scope</h3>
              ${renderList(skill.nonScope.bullets)}
            </div>
            <div>
              <h3>Provenance</h3>
              ${renderList(skill.provenance.bullets)}
            </div>
          </div>
        </details>
      </section>

      ${
        overviewIsDuplicate
          ? ""
          : `
            <section class="section">
              <span class="eyebrow">Overview</span>
              <h2>Narrative from the canonical wiki entry</h2>
              <div>${renderParagraphs(skill.overview.paragraphs)}</div>
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
          <h2>AI agent skills with evidence, not filler.</h2>
          <p class="section-intro">
            This standalone site turns repository skill pages into an English-first product surface for AI agent skills, reusable workflows, and evidence-backed playbooks.
          </p>
        </div>
        <div class="section footer-card">
          <h3>Source of truth</h3>
          <ul class="list">
            <li><span class="dot"></span><span>Only reads canonical wiki markdown entries.</span></li>
            <li><span class="dot"></span><span>Search, tags, and detail pages derive from generated local wiki data.</span></li>
            <li><span class="dot"></span><span>No login, no remote API, no synthetic marketplace claims.</span></li>
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
      title: "Find Skills | Runwiser Wiki",
      description:
        "Search the Runwiser Wiki catalog for AI agent skills, reusable workflows, evidence-backed playbooks, tags, and risk-scoped execution patterns.",
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
  const tagToggle = document.getElementById("tagToggle");
  const tagFilters = document.getElementById("tagFilters");

  if (!(catalogGrid instanceof HTMLElement) || !(catalogCount instanceof HTMLElement) || !(catalogEmpty instanceof HTMLElement)) {
    return;
  }

  let activeTag = "all";

  const updateCatalog = () => {
    const query = searchInput instanceof HTMLInputElement ? searchInput.value : "";
    const activeRisk = riskSelect instanceof HTMLSelectElement ? riskSelect.value : "all";
    const activeSort = sortSelect instanceof HTMLSelectElement ? sortSelect.value : "title";
    const filtered = sortSkills(filterSkills(skillWikiPayload.skills, query, activeTag, activeRisk), activeSort);

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
      if (!(button instanceof HTMLElement)) {
        return;
      }

      activeTag = button.dataset.tag ?? "all";
      tagButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      updateCatalog();
    });
  });

  if (tagToggle instanceof HTMLButtonElement && tagFilters instanceof HTMLElement) {
    tagToggle.addEventListener("click", () => {
      const expanded = tagFilters.classList.toggle("expanded");
      tagToggle.setAttribute("aria-expanded", String(expanded));
      tagToggle.textContent = expanded ? "Collapse tags" : "Show all tags";
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

if (!window.location.hash) {
  window.location.hash = "/";
} else {
  renderApp();
}
