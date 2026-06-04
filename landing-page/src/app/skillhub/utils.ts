import type { SkillWikiPayload, SkillWikiSkill } from "./types";

export function createSkillStats(payload: SkillWikiPayload) {
  const highRiskCount = payload.skills.filter((skill) => skill.riskLevel.toLowerCase() === "high").length;
  const latestUpdated = payload.skills
    .map((skill) => skill.updatedAt)
    .find((value) => value && value !== "Not specified");

  return [
    {
      label: "Wiki skills",
      value: String(payload.stats.skillCount),
      description: "Canonical entries sourced directly from skills/wiki/*.md",
    },
    {
      label: "Evidence refs",
      value: String(payload.stats.evidenceRefCount),
      description: "Repository proof links preserved from the wiki pages",
    },
    {
      label: "High-risk skills",
      value: String(highRiskCount),
      description: "Entries marked high risk in the Skill Wiki",
    },
    {
      label: "Latest update",
      value: latestUpdated ?? "Not specified",
      description: "Newest visible wiki timestamp in the current catalog",
    },
  ];
}

export function getFeaturedSkill(skills: SkillWikiSkill[]) {
  return skills[0] ?? null;
}

export function getAllTags(skills: SkillWikiSkill[]) {
  return [...new Set(skills.flatMap((skill) => skill.tags))].sort((left, right) => left.localeCompare(right));
}

export function filterSkills(
  skills: SkillWikiSkill[],
  query: string,
  activeTag: string,
  activeRisk: string,
) {
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

export function sortSkills(skills: SkillWikiSkill[], sortKey: string) {
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

export function navigateTo(path: string) {
  if (window.location.pathname === path) {
    return;
  }

  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
