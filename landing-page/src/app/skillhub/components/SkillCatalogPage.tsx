import { useMemo, useState } from "react";

import type { SkillWikiPayload } from "../types";
import { filterSkills, getAllTags, sortSkills } from "../utils";
import { SectionBlock } from "./SectionBlock";
import { SkillCard } from "./SkillCard";

export function SkillCatalogPage({ payload }: { payload: SkillWikiPayload }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [activeRisk, setActiveRisk] = useState("all");
  const [sortKey, setSortKey] = useState("title");

  const tags = useMemo(() => getAllTags(payload.skills), [payload.skills]);
  const filteredSkills = useMemo(() => {
    return sortSkills(filterSkills(payload.skills, query, activeTag, activeRisk), sortKey);
  }, [activeRisk, activeTag, payload.skills, query, sortKey]);

  const riskOptions = ["all", ...new Set(payload.skills.map((skill) => skill.riskLevel.toLowerCase()))];

  return (
    <div className="space-y-8">
      <SectionBlock
        eyebrow="Find Skills"
        title="Search the Skill Wiki like a product, not a folder."
        description="The catalog is intentionally sourced from the repository's promoted wiki entries only. Search and filters narrow the markdown-backed skill set without inventing extra records."
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
          <label className="rounded-[22px] border border-[rgba(60,60,67,0.08)] bg-white px-4 py-3 shadow-[0_12px_36px_rgba(17,24,39,0.05)]">
            <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#6b6b70]">Search</span>
            <input
              className="mt-2 w-full bg-transparent text-base font-medium text-[#1c1c1e] outline-none placeholder:text-[#8e8e93]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, summary, tags, or section text"
              value={query}
            />
          </label>

          <label className="rounded-[22px] border border-[rgba(60,60,67,0.08)] bg-white px-4 py-3 shadow-[0_12px_36px_rgba(17,24,39,0.05)]">
            <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#6b6b70]">Risk</span>
            <select
              className="mt-2 min-w-[150px] bg-transparent text-base font-medium text-[#1c1c1e] outline-none"
              onChange={(event) => setActiveRisk(event.target.value)}
              value={activeRisk}
            >
              {riskOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All risks" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="rounded-[22px] border border-[rgba(60,60,67,0.08)] bg-white px-4 py-3 shadow-[0_12px_36px_rgba(17,24,39,0.05)]">
            <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#6b6b70]">Sort</span>
            <select
              className="mt-2 min-w-[150px] bg-transparent text-base font-medium text-[#1c1c1e] outline-none"
              onChange={(event) => setSortKey(event.target.value)}
              value={sortKey}
            >
              <option value="title">Title</option>
              <option value="updated">Updated time</option>
              <option value="risk">Risk level</option>
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
              activeTag === "all" ? "bg-[#1c1c1e] text-white" : "bg-white text-[#4a4a4f] hover:text-[#007aff]"
            }`}
            onClick={() => setActiveTag("all")}
            type="button"
          >
            All tags
          </button>
          {tags.map((tag) => (
            <button
              className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
                activeTag === tag
                  ? "border-[#007aff] bg-[#007aff] text-white"
                  : "border-[rgba(60,60,67,0.1)] bg-white text-[#4a4a4f] hover:border-[rgba(0,122,255,0.24)] hover:text-[#007aff]"
              }`}
              key={tag}
              onClick={() => setActiveTag(tag)}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      </SectionBlock>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#6b6b70]">Catalog result</p>
            <h2 className="mt-2 text-[1.5rem] font-black tracking-[-0.04em] text-[#1c1c1e]">
              {filteredSkills.length} skill{filteredSkills.length === 1 ? "" : "s"} available
            </h2>
          </div>
          <p className="max-w-[46ch] text-right text-sm leading-6 text-[#4a4a4f]">
            The interface remains complete even when the canonical wiki is small. No synthetic filler records are added.
          </p>
        </div>

        {filteredSkills.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[rgba(60,60,67,0.18)] bg-white/75 p-8 text-center shadow-[0_18px_56px_rgba(17,24,39,0.04)]">
            <p className="text-lg font-bold text-[#1c1c1e]">No wiki skill matches this filter.</p>
            <p className="mt-2 text-sm leading-7 text-[#4a4a4f]">
              Try a broader query or clear the active tag and risk filter.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
