import { skillWikiPayload } from "./data/skills.generated.js";

const app = document.getElementById("app");
const SITE_URL = "https://runwiser-wiki.vercel.app/";
const SITE_NAME = "Runwiser";
const SITE_OG_IMAGE = "https://runwiser.vercel.app/brand/runwise-icon-512.png";
const BRAND_LOGO_URL = "https://runwiser.vercel.app/brand/runwise-logo.png";
const LOCALE_STORAGE_KEY = "skillhub-locale";
const PRESENTATION_SUMMARY_OVERRIDES = {
  "hot-scenario-documentation-and-knowledge-management":
    "A documentation workflow for collecting notes, shaping them into durable knowledge, and keeping the resulting material easy to reuse across teams.",
  "hot-scenario-education-and-team-enablement":
    "A repeatable enablement workflow for turning rough expertise into workshops, training materials, and team-ready learning assets.",
  "hot-scenario-founder-prototyping-and-no-code-build":
    "A fast prototyping workflow for turning a rough product idea into a working MVP plan, no-code build path, and early delivery checklist.",
  "hot-scenario-integration-and-mcp-tooling":
    "A tooling workflow for connecting systems, shaping MCP extensions, and making agent integrations easier to install, test, and maintain.",
  "hot-scenario-productivity-and-office-assistant":
    "An everyday productivity workflow for handling recurring office tasks, coordination work, and lightweight automation without rebuilding the process each time.",
  "hot-scenario-testing-qa-and-release-readiness":
    "A release-readiness workflow for checking quality, catching risks before launch, and making QA part of the shipping path instead of an afterthought.",
  "top-scenario-ai-agent-workflow-builder":
    "A workflow-design path for composing agent capabilities into a structured system with clear steps, checks, and reusable execution logic.",
  "top-scenario-business-finance-and-backoffice":
    "A backoffice workflow for handling repeatable business operations, reporting, finance-adjacent tasks, and operational follow-through with more structure.",
  "top-scenario-cloud-deployment-and-ops":
    "An infrastructure workflow for taking work from build-ready to deployed, with operational checks, rollout awareness, and follow-up maintenance in view.",
  "top-scenario-design-presentation-and-ui-production":
    "A design-production workflow for moving from rough concepts to polished UI, presentation, and visual assets with clearer review points.",
  "top-scenario-development-engineering-delivery":
    "An engineering delivery workflow for turning coding work into something reviewable, testable, and ready to hand off without losing execution discipline.",
  "top-scenario-marketing-and-content-operations":
    "A content-operations workflow for planning, producing, and packaging brand or growth work with stronger consistency across repeated campaigns.",
  "top-scenario-office-document-automation":
    "A repeatable office-document workflow for taking a messy document request and turning it into a clearer automation path with checks and handoff points.",
  "top-scenario-product-management-and-team-collaboration":
    "A team-operations workflow for aligning product work, collaboration rituals, and recurring coordination without losing track of decisions and follow-up.",
  "top-scenario-research-and-investment-analysis":
    "A research workflow for turning scattered inputs into structured analysis, clearer investment-style reasoning, and more reviewable insight outputs.",
  "top-scenario-security-and-risk-review":
    "A security-review workflow for scanning work before release, surfacing risk early, and making hardening or compliance checks easier to repeat.",
};

const COPY = {
  en: {
    metaDefaultTitle: "Runwiser | AI capabilities organized into reusable workflows",
    metaDefaultDescription: "Find a workflow that fits the task in front of you.",
    metaCatalogTitle: "Browse Workflows | Runwiser",
    metaCatalogDescription: "Browse workflows by category, tag, risk, and keyword.",
    metaDetailFallbackTitle: "Workflow Detail | Runwiser",
    metaDetailFallbackDescription: "Open a workflow and inspect fit, steps, and source.",
    brandTagline: "AI capabilities organized into workflows you can reuse",
    navHome: "Home",
    navWorkflows: "Workflows",
    headerSearchPlaceholder: "Search workflows, industries, or outcomes",
    headerSearchCta: "Browse",
    localeEn: "EN",
    localeZh: "中文",
    homeEyebrow: "",
    homeTitle: "What are you trying to get done?",
    homeLede: "Search by task. Open the closest workflow.",
    homePrimaryCta: "Browse",
    homeFeaturedCta: "Open",
    quickTabPrimary: "Start",
    quickTabSecondary: "Featured",
    quickEntryPrimaryTitle: "Search the catalog",
    quickEntryPrimaryBody: "Start with the task, not the underlying assets.",
    quickEntryPrimaryCta: "Browse",
    quickEntrySecondaryTitle: "Open one example first",
    quickEntrySecondaryBody: "See one full workflow before opening more.",
    statsWorkflows: "workflow bundles",
    statsEvidence: "evidence refs",
    homeExploreEyebrow: "",
    homeExploreTitle: "Start here",
    homeExploreBody: "",
    homeSearchPlaceholder: "Search by workflow, industry, or target outcome",
    homeSearchCta: "Browse",
    shelfRecommended: "Recommended",
    shelfTrending: "Trending",
    shelfNewest: "New",
    categoryEyebrow: "",
    categoryTitle: "Browse by domain",
    categoryBody: "",
    featuredLabel: "Editor’s pick",
    cardOpen: "Open",
    catalogEyebrow: "",
    catalogTitle: "Browse workflows",
    catalogBody: "",
    sidebarCategoryLabel: "Domains",
    sidebarCategoryBody: "",
    sidebarAll: "All workflows",
    sidebarFilterLabel: "Filters",
    sidebarFilterBody: "",
    fieldRisk: "Risk",
    fieldAllRisk: "All risk",
    fieldSort: "Sort",
    sortSignal: "Recommended",
    sortUpdated: "Recently updated",
    sortTitle: "Name",
    sortRisk: "Risk level",
    tagsEyebrow: "",
    tagsTitle: "Tags",
    clearFilters: "Clear filters",
    catalogSearchPlaceholder: "Search workflow titles, summaries, tags, or source text",
    catalogSearchNote: "",
    allTags: "All tags",
    resultsEyebrow: "",
    resultsCount: (count) => `${count} workflow results`,
    resultsBody: "",
    activeFilter: "Scope",
    activeFilterAll: "All workflows",
    activeFilterTag: "Tag",
    activeFilterRisk: "Risk",
    activeFilterSearch: "Search",
    emptyTitle: "No matching workflows.",
    emptyBody: "Try a broader outcome, deliverable, or business scenario.",
    detailBack: "Back",
    detailEyebrow: "",
    detailHeroSummary: "",
    detailBestFor: "Best for",
    detailBestForFallback: "Use this when you need a reusable workflow entry point for the task in front of you.",
    detailHowToUse: "How to use it",
    detailHowStep1Title: "Start with the task",
    detailHowStep1Body:
      "Bring the concrete request, the files or systems involved, and what “done” should look like before you begin.",
    detailHowStep2Title: "Run it as a workflow",
    detailHowStep2Body:
      "Use this page as the structure for planning, checks, and decision points instead of improvising the sequence each time.",
    detailHowStep3Title: "Review before handoff",
    detailHowStep3Body:
      "Check the fit boundaries, references, and risk summary before turning the workflow into an external action or final handoff.",
    detailWatchFor: "Watch for",
    detailWatchForFallback: "If the fit is unclear, read the boundaries and references before using this workflow as an execution source.",
    detailTrustTitle: "",
    detailTrustBody: "",
    detailTrustRisk: "Risk",
    detailTrustUpdated: "Updated",
    detailTrustEvidence: (count) => `${count} references`,
    detailTrustSource: "Source available",
    detailTrustAction: "Open source",
    detailHeroDescriptorTitle: "",
    detailHeroDescriptorBody: "",
    detailSourceFile: "Source",
    detailFirstRef: "Reference",
    detailValidationTitle: "Source",
    detailValidationBody: "",
    detailCategory: "Category",
    detailUpdated: "Updated",
    detailUpdatedBody: "",
    detailSourcePath: "Source path",
    detailSourcePathBody: "",
    detailUpstream: "Upstream source",
    detailUpstreamEmpty: "Not available",
    detailUpstreamBody: "",
    detailStepsEyebrow: "",
    detailStepsTitle: "Steps",
    detailWhenToUse: "When to use",
    detailWhenNotToUse: "When not to use",
    detailInputs: "Inputs",
    detailOutputs: "Outputs",
    detailFailureModes: "Failure modes",
    detailEvidence: "References",
    detailRelatedSkills: "Related skills",
    detailProvenance: "Provenance",
    detailScope: "Scope notes",
    detailNonScope: "Non-scope notes",
    detailOverviewEyebrow: "",
    detailOverviewTitle: "Notes",
    detailMissingTitle: "Workflow not found.",
    detailMissingBody:
      "This workflow slug is not available on the current surface. The entry may be stale, removed, or not yet generated from the source knowledge.",
    footerEyebrow: "",
    footerTitle: "",
    footerBody: "",
    footerQuickTitle: "",
    footerBackHome: "",
    footerBrowse: "",
    footerSourceNote: "",
  },
  zh: {
    metaDefaultTitle: "Runwiser | 把 AI 能力整理成可直接复用的工作流",
    metaDefaultDescription: "先找到适合当前任务的工作流。",
    metaCatalogTitle: "探索全部工作流 | Runwiser",
    metaCatalogDescription: "按领域、标签、风险和关键词浏览工作流。",
    metaDetailFallbackTitle: "工作流详情 | Runwiser",
    metaDetailFallbackDescription: "打开工作流，查看适配、步骤和来源。",
    brandTagline: "把 AI 能力整理成可直接复用的工作流",
    navHome: "首页",
    navWorkflows: "全部工作流",
    headerSearchPlaceholder: "搜索工作流、行业、任务目标",
    headerSearchCta: "探索",
    localeEn: "EN",
    localeZh: "中文",
    homeEyebrow: "",
    homeTitle: "你现在要完成什么任务？",
    homeLede: "按任务来搜。打开最接近的一条。",
    homePrimaryCta: "探索",
    homeFeaturedCta: "打开",
    quickTabPrimary: "开始",
    quickTabSecondary: "示例",
    quickEntryPrimaryTitle: "搜索目录",
    quickEntryPrimaryBody: "先从任务开始，不要先看底层资产。",
    quickEntryPrimaryCta: "探索",
    quickEntrySecondaryTitle: "先打开一个示例看看",
    quickEntrySecondaryBody: "先看一条完整工作流。",
    statsWorkflows: "工作流入口",
    statsEvidence: "参考链接",
    homeExploreEyebrow: "",
    homeExploreTitle: "从这里开始",
    homeExploreBody: "",
    homeSearchPlaceholder: "搜索工作流场景、行业、任务目标",
    homeSearchCta: "探索",
    shelfRecommended: "为你推荐",
    shelfTrending: "近期飙升",
    shelfNewest: "最近上新",
    categoryEyebrow: "",
    categoryTitle: "按领域浏览",
    categoryBody: "",
    featuredLabel: "编辑精选",
    cardOpen: "打开",
    catalogEyebrow: "",
    catalogTitle: "全部工作流",
    catalogBody: "",
    sidebarCategoryLabel: "领域",
    sidebarCategoryBody: "",
    sidebarAll: "全部工作流",
    sidebarFilterLabel: "筛选",
    sidebarFilterBody: "",
    fieldRisk: "风险",
    fieldAllRisk: "全部风险",
    fieldSort: "排序",
    sortSignal: "推荐优先",
    sortUpdated: "最近更新",
    sortTitle: "名称",
    sortRisk: "风险等级",
    tagsEyebrow: "",
    tagsTitle: "标签",
    clearFilters: "清空筛选",
    catalogSearchPlaceholder: "搜索工作流标题、摘要、标签或正文片段",
    catalogSearchNote: "",
    allTags: "全部标签",
    resultsEyebrow: "",
    resultsCount: (count) => `${count} 个工作流结果`,
    resultsBody: "",
    activeFilter: "当前范围",
    activeFilterAll: "全部工作流",
    activeFilterTag: "标签",
    activeFilterRisk: "风险",
    activeFilterSearch: "搜索",
    emptyTitle: "没有匹配的工作流。",
    emptyBody: "试试换一个任务目标、交付物名称，或者更上层一点的业务场景来搜。",
    detailBack: "返回",
    detailEyebrow: "",
    detailHeroSummary: "",
    detailBestFor: "适合什么情况",
    detailBestForFallback: "当你需要一个可复用的任务入口，而不是临时拼动作时，可以先从这条工作流开始。",
    detailHowToUse: "怎么开始用",
    detailHowStep1Title: "先把任务说清楚",
    detailHowStep1Body: "先明确你要处理的请求、涉及的文件或系统，以及你认定“完成”的标准是什么。",
    detailHowStep2Title: "把它当成工作流来跑",
    detailHowStep2Body: "不要临时拼顺序，直接把这页当成计划、检查点和决策节点的骨架来用。",
    detailHowStep3Title: "交付前做一次复核",
    detailHowStep3Body: "在真正外发或交接之前，先看适用边界、参考链接和风险摘要，确认这条工作流确实适合当前场景。",
    detailWatchFor: "使用前注意",
    detailWatchForFallback: "如果你还不确定这条工作流是否适用，先读清边界和参考，再决定要不要拿它当执行入口。",
    detailTrustTitle: "",
    detailTrustBody: "",
    detailTrustRisk: "风险",
    detailTrustUpdated: "最近更新",
    detailTrustEvidence: (count) => `${count} 条参考`,
    detailTrustSource: "源文件可查看",
    detailTrustAction: "查看源文件",
    detailHeroDescriptorTitle: "",
    detailHeroDescriptorBody: "",
    detailSourceFile: "源文件",
    detailFirstRef: "参考",
    detailValidationTitle: "来源",
    detailValidationBody: "",
    detailCategory: "分类",
    detailUpdated: "更新时间",
    detailUpdatedBody: "",
    detailSourcePath: "源路径",
    detailSourcePathBody: "",
    detailUpstream: "上游来源",
    detailUpstreamEmpty: "暂无",
    detailUpstreamBody: "",
    detailStepsEyebrow: "",
    detailStepsTitle: "步骤",
    detailWhenToUse: "适用场景",
    detailWhenNotToUse: "不适用场景",
    detailInputs: "输入",
    detailOutputs: "输出",
    detailFailureModes: "失败模式",
    detailEvidence: "参考链接",
    detailRelatedSkills: "相关技能",
    detailProvenance: "来源链路",
    detailScope: "范围说明",
    detailNonScope: "非范围说明",
    detailOverviewEyebrow: "",
    detailOverviewTitle: "原始说明",
    detailMissingTitle: "工作流不存在。",
    detailMissingBody: "当前前台没有找到这个 workflow slug，对应入口可能已经失效，或者还没有从底层 Skill Wiki 生成出来。",
    footerEyebrow: "",
    footerTitle: "",
    footerBody: "",
    footerQuickTitle: "",
    footerBackHome: "",
    footerBrowse: "",
    footerSourceNote: "",
  },
};

function getLocale() {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "zh" || stored === "en") {
      return stored;
    }
  } catch {}
  return "en";
}

let currentLocale = getLocale();
document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";

function setLocale(locale) {
  currentLocale = locale === "zh" ? "zh" : "en";
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale);
  } catch {}
  document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";
  renderApp();
}

function t(key, ...args) {
  const value = COPY[currentLocale]?.[key] ?? COPY.en[key];
  return typeof value === "function" ? value(...args) : value;
}

function getRoute() {
  const raw = window.location.hash.slice(1) || "/";
  const normalized = raw.startsWith("/") ? raw : `/${raw}`;

  if (normalized === "/") {
    return { name: "home" };
  }

  if (normalized === "/workflows") {
    return { name: "workflows" };
  }

  const workflowMatch = normalized.match(/^\/workflows\/([^/]+)$/);
  if (workflowMatch) {
    try {
      return { name: "workflow-detail", slug: decodeURIComponent(workflowMatch[1]) };
    } catch {
      return { name: "workflows" };
    }
  }

  return { name: "workflows" };
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
      inLanguage: currentLocale === "zh" ? "zh-CN" : "en-US",
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

function formatRiskLevel(level) {
  return String(level || "").trim().toLowerCase() || "not specified";
}

function truncateText(value, length = 180) {
  return value.length <= length ? value : `${value.slice(0, length - 1)}…`;
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

function isWorkflowBundle(skill) {
  return skill.slug.startsWith("top-scenario-") || skill.slug.startsWith("hot-scenario-");
}

function getWorkflowBundles() {
  return skillWikiPayload.skills.filter(isWorkflowBundle);
}

function getFeaturedWorkflow() {
  return [...getWorkflowBundles()]
    .sort((left, right) => scoreSkill(right) - scoreSkill(left) || left.title.localeCompare(right.title))[0] ?? null;
}

function getHomeShelfSkills(mode) {
  const skills = [...getWorkflowBundles()];

  switch (mode) {
    case "trending":
      return skills
        .sort((left, right) => scoreSkill(right) - scoreSkill(left) || right.updatedAt.localeCompare(left.updatedAt))
        .slice(0, 6);
    case "newest":
      return sortSkills(skills, "updated").slice(0, 6);
    case "recommended":
    default: {
      const featured = getFeaturedWorkflow();
      const ranked = skills.sort((left, right) => scoreSkill(right) - scoreSkill(left) || left.title.localeCompare(right.title));
      if (!featured) {
        return ranked.slice(0, 6);
      }
      return [featured, ...ranked.filter((skill) => skill.slug !== featured.slug)].slice(0, 6);
    }
  }
}

function setPendingCatalogQuery(query) {
  try {
    window.sessionStorage.setItem("skillhub-home-query", query);
  } catch {}
}

function consumePendingCatalogQuery() {
  try {
    const value = window.sessionStorage.getItem("skillhub-home-query") ?? "";
    window.sessionStorage.removeItem("skillhub-home-query");
    return value;
  } catch {
    return "";
  }
}

function getWorkflowBundlesByCategory(categorySlug) {
  return getWorkflowBundles()
    .filter((skill) => skill.category.slug === categorySlug)
    .sort((left, right) => scoreSkill(right) - scoreSkill(left) || left.title.localeCompare(right.title));
}

function getWorkflowCategorySections() {
  return skillWikiPayload.categories
    .map((category) => ({
      ...category,
      count: getWorkflowBundlesByCategory(category.slug).length,
      skills: getWorkflowBundlesByCategory(category.slug),
    }))
    .filter((category) => category.skills.length > 0);
}

function getFeaturedTags(limit = 18) {
  const tagCounts = new Map();

  getWorkflowBundles().forEach((skill) => {
    skill.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });

  return [...tagCounts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
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
    return `<p class="empty-copy">${currentLocale === "zh" ? "底层资料里没有明确写出。" : "Not specified in the source notes."}</p>`;
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
    return `<p class="empty-copy">${currentLocale === "zh" ? "底层资料里没有明确写出。" : "Not specified in the source notes."}</p>`;
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

function getWorkflowDisplayTitle(skill) {
  return skill.title.replace(/^(Top|Hot)\s+Scenario:\s*/i, "").trim();
}

function getPresentationSummary(skill) {
  return PRESENTATION_SUMMARY_OVERRIDES[skill.slug] ?? skill.summary;
}

function getTrimmedBullets(section, limit = 3) {
  return (section?.bullets ?? []).filter(Boolean).slice(0, limit);
}

function renderUsageChecklist() {
  return `
    <ol class="usage-list">
      <li>
        <strong>${escapeHtml(t("detailHowStep1Title"))}</strong>
        <p>${escapeHtml(t("detailHowStep1Body"))}</p>
      </li>
      <li>
        <strong>${escapeHtml(t("detailHowStep2Title"))}</strong>
        <p>${escapeHtml(t("detailHowStep2Body"))}</p>
      </li>
      <li>
        <strong>${escapeHtml(t("detailHowStep3Title"))}</strong>
        <p>${escapeHtml(t("detailHowStep3Body"))}</p>
      </li>
    </ol>
  `;
}

function renderTrustSummary(skill) {
  return `
    <div class="trust-list">
      <div class="trust-item">
        <span>${escapeHtml(t("detailTrustRisk"))}</span>
        <strong>${escapeHtml(formatRiskLevel(skill.riskLevel))}</strong>
      </div>
      <div class="trust-item">
        <span>${escapeHtml(t("detailTrustUpdated"))}</span>
        <strong>${escapeHtml(skill.updatedAt)}</strong>
      </div>
      <div class="trust-item">
        <span>${escapeHtml(t("detailTrustEvidence", skill.evidenceLinks.length))}</span>
        <strong>${escapeHtml(t("detailTrustSource"))}</strong>
      </div>
    </div>
  `;
}

function renderHeader(route) {
  const links = [
    { href: "/", label: t("navHome") },
    { href: "/workflows", label: t("navWorkflows") },
  ];

  return `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#/">
          <img class="brand-logo" src="${escapeHtml(BRAND_LOGO_URL)}" alt="${escapeHtml(SITE_NAME)}" />
          <span class="brand-copy">
            <strong>${escapeHtml(SITE_NAME)}</strong>
          </span>
        </a>
        <nav class="nav">
          ${links
            .map((link) => {
              const isActive =
                route.name === "home"
                  ? link.href === "/"
                  : link.href === "/workflows" && (route.name === "workflows" || route.name === "workflow-detail");
              return `<a class="${isActive ? "active" : ""}" href="#${link.href}">${link.label}</a>`;
            })
            .join("")}
        </nav>
        <div class="header-actions">
          <div class="locale-switcher" aria-label="Language switcher">
            <button class="locale-chip ${currentLocale === "en" ? "active" : ""}" data-locale="en" type="button">${escapeHtml(t("localeEn"))}</button>
            <button class="locale-chip ${currentLocale === "zh" ? "active" : ""}" data-locale="zh" type="button">${escapeHtml(t("localeZh"))}</button>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderCategoryRail() {
  return `
    <div class="category-rail">
      ${getWorkflowCategorySections()
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
  const featured = getFeaturedWorkflow();
  const categorySections = getWorkflowCategorySections();
  const recommendedSkills = getHomeShelfSkills("recommended");

  return `
    <div class="stack">
      <section class="hero">
        <div class="hero-copy">
          <h1>${escapeHtml(t("homeTitle"))}</h1>
          <p class="lede">${escapeHtml(t("homeLede"))}</p>
          <div class="hero-actions">
            <button class="cta" data-nav="/workflows" type="button">${escapeHtml(t("homePrimaryCta"))}</button>
            ${
              featured
                ? `<button class="cta ghost" data-nav="/workflows/${escapeHtml(featured.slug)}" type="button">${escapeHtml(t("homeFeaturedCta"))}</button>`
                : ""
            }
          </div>
        </div>
        <div class="hero-panel quick-surface">
          <div class="quick-entry-list">
            <button class="quick-entry-card" data-nav="/workflows" type="button">
              <strong>${escapeHtml(t("quickEntryPrimaryTitle"))}</strong>
              <p>${escapeHtml(t("quickEntryPrimaryBody"))}</p>
              <span>${escapeHtml(t("quickEntryPrimaryCta"))}</span>
            </button>
            ${
              featured
                ? `<button class="quick-entry-card quick-entry-card-muted" data-nav="/workflows/${escapeHtml(featured.slug)}" type="button">
                    <strong>${escapeHtml(t("quickEntrySecondaryTitle"))}</strong>
                    <p>${escapeHtml(t("quickEntrySecondaryBody"))}</p>
                    <span>${escapeHtml(currentLocale === "zh" ? "打开这个工作流" : `Open ${featured.title}`)}</span>
                  </button>`
                : ""
            }
          </div>
          <div class="quick-stats">
            <div>
              <strong>${escapeHtml(String(getWorkflowBundles().length))}</strong>
              <span>${escapeHtml(t("statsWorkflows"))}</span>
            </div>
            <div>
              <strong>${escapeHtml(String(skillWikiPayload.stats.evidenceRefCount))}</strong>
              <span>${escapeHtml(t("statsEvidence"))}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-hero-lite">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(t("homeExploreTitle"))}</h2>
          </div>
        </div>
        <div class="home-search-card">
          <label class="hero-search-field" for="homeSearchInput">
            <input id="homeSearchInput" placeholder="${escapeHtml(t("homeSearchPlaceholder"))}" />
          </label>
          <button class="cta" id="homeSearchGo" type="button">${escapeHtml(t("homeSearchCta"))}</button>
        </div>
        <div class="home-switcher">
          <div class="switcher-tabs">
            <button class="switcher-tab active" data-home-shelf="recommended" type="button">${escapeHtml(t("shelfRecommended"))}</button>
            <button class="switcher-tab" data-home-shelf="trending" type="button">${escapeHtml(t("shelfTrending"))}</button>
            <button class="switcher-tab" data-home-shelf="newest" type="button">${escapeHtml(t("shelfNewest"))}</button>
          </div>
          <div class="cards-grid cards-grid-wide" id="homeShelfGrid">
            ${recommendedSkills.map((skill, index) => renderSkillCard(skill, index === 0)).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(t("categoryTitle"))}</h2>
          </div>
        </div>
        <div class="category-rail category-rail-inline">
          ${categorySections
            .map(
              (category) => `
                <button class="category-jump category-jump-inline" data-category-jump="${escapeHtml(category.slug)}" type="button">
                  <span class="category-dot" style="background:${getCategoryColor(category.slug)}"></span>
                  <span>${escapeHtml(category.label)}</span>
                  <strong>${escapeHtml(String(category.count))}</strong>
                </button>`,
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderSkillCard(skill, featured = false) {
  const summary = getPresentationSummary(skill);
  const upstreamLinkHtml = skill.upstreamSourceUrl
    ? `<a class="upstream-link" href="${escapeHtml(skill.upstreamSourceUrl)}" target="_blank" rel="noreferrer">
        <svg class="upstream-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        ${escapeHtml(skill.upstreamSourceRepo ?? "Source")}
      </a>`
    : "";

  return `
    <article class="skill-card ${featured ? "skill-card-featured" : ""}">
      <div class="card-topline">
        <span class="pill pill-brand card-category" style="border-color:${getCategoryColor(skill.category.slug)};background:${getCategoryColor(skill.category.slug)}12;color:${getCategoryColor(skill.category.slug)}">${featured ? escapeHtml(t("featuredLabel")) : escapeHtml(skill.category.label)}</span>
        
        <span class="pill card-risk">${escapeHtml(formatRiskLevel(skill.riskLevel))}</span>
      </div>
      <h3>${escapeHtml(skill.title)}</h3>
      <p class="card-summary">${escapeHtml(summary)}</p>
      <div class="chip-row chip-row-soft">${renderTagList(skill.tags, featured ? 4 : 3)}</div>
      <div class="card-meta">
        <div class="card-meta-copy">
          <strong>${escapeHtml(skill.updatedAt)}</strong>
        </div>
        <button class="card-cta" data-nav="/workflows/${escapeHtml(skill.slug)}" type="button">
          <span>${escapeHtml(t("cardOpen"))}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  `;
}

function renderSkillsPage() {
  const tags = getFeaturedTags();
  const categories = getWorkflowCategorySections();
  const riskOptions = ["all", ...new Set(getWorkflowBundles().map((skill) => skill.riskLevel.toLowerCase()))];

  return `
    <div class="stack">
      <section class="section section-hero-lite">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(t("catalogTitle"))}</h2>
          </div>
        </div>
        <div class="catalog-layout">
          <aside class="catalog-sidebar">
            <div class="sidebar-block">
              <span class="sidebar-label">${escapeHtml(t("sidebarCategoryLabel"))}</span>
              <div class="sidebar-buttons">
                <button class="sidebar-chip active" data-category="all" type="button">${escapeHtml(t("sidebarAll"))}</button>
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
              <span class="sidebar-label">${escapeHtml(t("sidebarFilterLabel"))}</span>
              <div class="field-stack">
                <label class="field">
                  <span>${escapeHtml(t("fieldRisk"))}</span>
                  <select id="riskSelect">
                    ${riskOptions
                      .map(
                        (option) => `<option value="${escapeHtml(option)}">${option === "all" ? escapeHtml(t("fieldAllRisk")) : escapeHtml(option)}</option>`,
                      )
                      .join("")}
                  </select>
                </label>
                <label class="field">
                  <span>${escapeHtml(t("fieldSort"))}</span>
                  <select id="sortSelect">
                    <option value="signal">${escapeHtml(t("sortSignal"))}</option>
                    <option value="updated">${escapeHtml(t("sortUpdated"))}</option>
                    <option value="title">${escapeHtml(t("sortTitle"))}</option>
                    <option value="risk">${escapeHtml(t("sortRisk"))}</option>
                  </select>
                </label>
              </div>
            </div>
          </aside>
          <div class="catalog-main">
            <div class="tag-toolbar">
              <h3>${escapeHtml(t("tagsTitle"))}</h3>
              <button class="text-action" id="clearFilters" type="button">${escapeHtml(t("clearFilters"))}</button>
            </div>
            <div class="catalog-search-bar">
              <label class="catalog-search-main" for="searchInput">
                <input id="searchInput" placeholder="${escapeHtml(t("catalogSearchPlaceholder"))}" />
              </label>
            </div>
            <div class="tag-cloud" id="tagFilters">
              <button class="chip active" data-tag="all" type="button">${escapeHtml(t("allTags"))}</button>
              ${tags.map((tag) => `<button class="chip" data-tag="${escapeHtml(tag)}" type="button">${escapeHtml(tag)}</button>`).join("")}
            </div>
            <div class="catalog-results-head">
              <div>
                <h3 id="catalogCount">${escapeHtml(t("resultsCount", 0))}</h3>
              </div>
              <p class="catalog-active-filter" id="catalogActiveFilter">${escapeHtml(`${t("activeFilter")}：${t("activeFilterAll")}`)}</p>
            </div>
            <div class="cards-grid cards-grid-wide" id="catalogGrid"></div>
            <div class="empty-state" id="catalogEmpty" hidden>
              <h3>${escapeHtml(t("emptyTitle"))}</h3>
              <p>${escapeHtml(t("emptyBody"))}</p>
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
  const displayTitle = getWorkflowDisplayTitle(skill);
  const summary = getPresentationSummary(skill);
  const bestForBullets = getTrimmedBullets(skill.whenToUse);
  const watchForBullets = getTrimmedBullets(skill.whenNotToUse).length
    ? getTrimmedBullets(skill.whenNotToUse)
    : getTrimmedBullets(skill.failureModes);
  const primaryCards = [
    {
      title: t("detailBestFor"),
      content: bestForBullets.length ? renderList(bestForBullets) : `<p class="empty-copy">${escapeHtml(t("detailBestForFallback"))}</p>`,
    },
    { title: t("detailHowToUse"), content: renderUsageChecklist() },
    {
      title: t("detailWatchFor"),
      content: watchForBullets.length ? renderList(watchForBullets) : `<p class="empty-copy">${escapeHtml(t("detailWatchForFallback"))}</p>`,
    },
  ];
  const secondaryCards = [
    { title: t("detailWhenToUse"), content: renderList(skill.whenToUse.bullets), visible: skill.whenToUse.bullets.length > 0 },
    { title: t("detailWhenNotToUse"), content: renderList(skill.whenNotToUse.bullets), visible: skill.whenNotToUse.bullets.length > 0 },
    { title: t("detailInputs"), content: renderList(skill.inputs.bullets), visible: skill.inputs.bullets.length > 0 },
    { title: t("detailOutputs"), content: renderList(skill.outputs.bullets), visible: skill.outputs.bullets.length > 0 },
    { title: t("detailFailureModes"), content: renderList(skill.failureModes.bullets), visible: skill.failureModes.bullets.length > 0 },
  ].filter((section) => section.visible);

  const upstreamSourceHtml = skill.upstreamSourceUrl
    ? `<a class="evidence-link" href="${escapeHtml(skill.upstreamSourceUrl)}" target="_blank" rel="noreferrer">
        <svg class="upstream-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" style="vertical-align:middle;margin-right:4px"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        ${escapeHtml(skill.upstreamSourceRepo ?? skill.upstreamSourceUrl)}
      </a>`
    : `<strong>${escapeHtml(t("detailUpstreamEmpty"))}</strong>`;

  return `
    <div class="stack">
      <section class="detail-hero">
        <article class="detail-main">
          <div class="detail-utility">
            <button class="text-back" data-nav="/workflows" type="button">
              <span aria-hidden="true">←</span>
              <span>${escapeHtml(t("detailBack"))}</span>
            </button>
          </div>
          <div class="detail-topline">
            <span class="pill pill-brand" style="border-color:${getCategoryColor(skill.category.slug)};background:${getCategoryColor(skill.category.slug)}22;color:${getCategoryColor(skill.category.slug)}">${escapeHtml(skill.category.label)}</span>
            <span class="pill card-risk">${escapeHtml(formatRiskLevel(skill.riskLevel))}</span>
          </div>
          <h1>${escapeHtml(displayTitle)}</h1>
          <p class="detail-lede">${escapeHtml(summary)}</p>
          ${renderTrustSummary(skill)}
        </article>
        <aside class="detail-sidebar">
          <div class="detail-fact">
            <span>${escapeHtml(t("detailCategory"))}</span>
            <strong>${escapeHtml(skill.category.label)}</strong>
          </div>
          <div class="detail-fact">
            <span>${escapeHtml(t("detailSourcePath"))}</span>
            <a class="evidence-link" href="${escapeHtml(skill.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(skill.sourcePath)}</a>
          </div>
          <div class="detail-fact">
            <span>${escapeHtml(t("detailUpstream"))}</span>
            ${upstreamSourceHtml}
          </div>
        </aside>
      </section>

      ${
        skill.steps.steps.length > 0
          ? `
            <section class="section">
              <div class="section-head">
                <div>
                  <span class="eyebrow">${escapeHtml(t("detailStepsEyebrow"))}</span>
                  <h2>${escapeHtml(t("detailStepsTitle"))}</h2>
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

      ${
        secondaryCards.length > 0
          ? `
            <section class="detail-grid">
              ${secondaryCards.map((section) => renderInfoPanel(section.title, section.content)).join("")}
            </section>`
          : ""
      }

      <section class="detail-grid detail-grid-large">
        ${renderInfoPanel(
          t("detailValidationTitle"),
          `
            <p class="empty-copy">${escapeHtml(t("detailValidationBody"))}</p>
            <div class="validation-facts">
              <div><span>${escapeHtml(t("detailCategory"))}</span><strong>${escapeHtml(skill.category.label)}</strong></div>
              <div><span>${escapeHtml(t("detailUpdated"))}</span><strong>${escapeHtml(skill.updatedAt)}</strong></div>
              <div><span>${escapeHtml(t("detailSourcePath"))}</span><a class="evidence-link" href="${escapeHtml(skill.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(skill.sourcePath)}</a></div>
              <div><span>${escapeHtml(t("detailUpstream"))}</span>${upstreamSourceHtml}</div>
            </div>
          `,
        )}
      </section>

      <section class="detail-grid detail-grid-large">
        ${renderInfoPanel(t("detailEvidence"), renderLinkList(skill.evidenceLinks, currentLocale === "zh" ? "暂无参考链接。" : "No references available."))}
        ${renderInfoPanel(t("detailRelatedSkills"), renderLinkList(skill.relatedSkillLinks, currentLocale === "zh" ? "暂无相关技能。" : "No related skills available."))}
        ${renderInfoPanel(t("detailProvenance"), renderLinkList(skill.provenanceLinks, currentLocale === "zh" ? "暂无来源链路。" : "No provenance notes available."))}
        ${renderInfoPanel(t("detailScope"), renderLinkList(skill.scopeLinks, currentLocale === "zh" ? "暂无范围说明。" : "No scope notes available."))}
        ${renderInfoPanel(t("detailNonScope"), renderLinkList(skill.nonScopeLinks, currentLocale === "zh" ? "暂无非范围说明。" : "No non-scope notes available."))}
      </section>

      ${
        overviewIsDuplicate
          ? ""
          : `
            <section class="section">
              <div class="section-head">
                <div>
                  <span class="eyebrow">${escapeHtml(t("detailOverviewEyebrow"))}</span>
                  <h2>${escapeHtml(t("detailOverviewTitle"))}</h2>
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
      <h3>${escapeHtml(t("detailMissingTitle"))}</h3>
      <p>${escapeHtml(t("detailMissingBody"))}</p>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <span class="eyebrow">${escapeHtml(t("footerEyebrow"))}</span>
          <h2>${escapeHtml(t("footerTitle"))}</h2>
          <p class="section-intro">${escapeHtml(t("footerBody"))}</p>
        </div>
        <div class="footer-panel">
          <h3>${escapeHtml(t("footerQuickTitle"))}</h3>
          <ul class="detail-list">
            <li><span class="list-dot"></span><span><a class="evidence-link" href="#/">${escapeHtml(t("footerBackHome"))}</a></span></li>
            <li><span class="list-dot"></span><span><a class="evidence-link" href="#/workflows">${escapeHtml(t("footerBrowse"))}</a></span></li>
            <li><span class="list-dot"></span><span>${escapeHtml(t("footerSourceNote")).replace("`skills/wiki/*.md`", "<code>skills/wiki/*.md</code>")}</span></li>
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
      title: t("metaDefaultTitle"),
      description: t("metaDefaultDescription"),
      path: "/",
    });
    content = renderHomePage();
  } else if (route.name === "workflows") {
    setPageMeta({
      title: t("metaCatalogTitle"),
      description: t("metaCatalogDescription"),
      path: "/#/workflows",
    });
    content = renderSkillsPage();
  } else {
    const skill = skillWikiPayload.skills.find((item) => item.slug === route.slug);
    setPageMeta(
      skill
        ? {
            title: `${skill.title} | ${SITE_NAME}`,
            description: getPresentationSummary(skill),
            path: `/#/workflows/${skill.slug}`,
          }
        : {
            title: t("metaDetailFallbackTitle"),
            description: t("metaDetailFallbackDescription"),
            path: "/#/workflows",
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
  const catalogActiveFilter = document.getElementById("catalogActiveFilter");
  const searchInput = document.getElementById("searchInput");
  const riskSelect = document.getElementById("riskSelect");
  const sortSelect = document.getElementById("sortSelect");
  const tagButtons = [...document.querySelectorAll("[data-tag]")];
  const categoryButtons = [...document.querySelectorAll("[data-category]")];
  const clearFilters = document.getElementById("clearFilters");
  const categoryJumpButtons = [...document.querySelectorAll("[data-category-jump]")];
  const categoryOpenButtons = [...document.querySelectorAll("[data-category-open]")];
  const homeShelfButtons = [...document.querySelectorAll("[data-home-shelf]")];
  const homeShelfGrid = document.getElementById("homeShelfGrid");
  const homeSearchInput = document.getElementById("homeSearchInput");
  const homeSearchGo = document.getElementById("homeSearchGo");
  const localeButtons = [...document.querySelectorAll("[data-locale]")];

  const updateHomeShelf = (mode) => {
    if (!(homeShelfGrid instanceof HTMLElement)) {
      return;
    }

    const skills = getHomeShelfSkills(mode);
    homeShelfGrid.innerHTML = skills.map((skill, index) => renderSkillCard(skill, index === 0)).join("");
  };

  homeShelfButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.getAttribute("data-home-shelf") ?? "recommended";
      homeShelfButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      updateHomeShelf(nextMode);
    });
  });

  const openSearchResults = () => {
    if (!(homeSearchInput instanceof HTMLInputElement)) {
      navigate("/workflows");
      return;
    }

    setPendingCatalogQuery(homeSearchInput.value.trim());
    navigate("/workflows");
  };

  if (homeSearchGo instanceof HTMLButtonElement) {
    homeSearchGo.addEventListener("click", openSearchResults);
  }

  if (homeSearchInput instanceof HTMLInputElement) {
    homeSearchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        openSearchResults();
      }
    });
  }

  localeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextLocale = button.getAttribute("data-locale");
      if (nextLocale === "en" || nextLocale === "zh") {
        setLocale(nextLocale);
      }
    });
  });

  categoryJumpButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category-jump");
      navigate("/workflows");
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
      navigate("/workflows");
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
    const activeCategoryLabel =
      activeCategory === "all"
        ? t("activeFilterAll")
        : categoryButtons.find((button) => button.getAttribute("data-category") === activeCategory)?.textContent?.trim() ?? t("activeFilterAll");
    const filtered = sortSkills(
      filterSkills(getWorkflowBundles(), query, activeCategory, activeTag, activeRisk),
      activeSort,
    );

    catalogCount.textContent = t("resultsCount", filtered.length);
    if (catalogActiveFilter instanceof HTMLElement) {
      const pieces = [`${t("activeFilter")}: ${activeCategoryLabel}`];
      if (activeTag !== "all") {
        pieces.push(`${t("activeFilterTag")}: ${activeTag}`);
      }
      if (activeRisk !== "all") {
        pieces.push(`${t("activeFilterRisk")}: ${activeRisk}`);
      }
      if (query.trim()) {
        pieces.push(`${t("activeFilterSearch")}: ${query.trim()}`);
      }
      catalogActiveFilter.textContent = pieces.join(" / ");
    }
    catalogGrid.innerHTML = filtered.map((skill) => renderSkillCard(skill)).join("");
    catalogEmpty.hidden = filtered.length > 0;
  };

  const pendingQuery = consumePendingCatalogQuery();
  if (pendingQuery && searchInput instanceof HTMLInputElement && searchInput.value.length === 0) {
    searchInput.value = pendingQuery;
  }

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
      activeTag = "all";
      tagButtons.forEach((item) => item.classList.toggle("active", item.getAttribute("data-tag") === "all"));
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
