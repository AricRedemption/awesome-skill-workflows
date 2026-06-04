import type { SkillWikiSkill } from "../types";
import { navigateTo } from "../utils";

export function SkillCard({ skill, featured = false }: { skill: SkillWikiSkill; featured?: boolean }) {
  return (
    <article
      className={`group rounded-[28px] border border-[rgba(60,60,67,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,248,255,0.84))] p-5 shadow-[0_20px_60px_rgba(17,24,39,0.07)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(17,24,39,0.12)] ${
        featured ? "md:p-7" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#007aff]/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#007aff]">
          {featured ? "Featured wiki skill" : "Skill Wiki"}
        </span>
        <span className="rounded-full bg-[#1c1c1e]/6 px-3 py-1 text-[0.72rem] font-semibold text-[#4a4a4f]">
          Risk: {skill.riskLevel}
        </span>
      </div>

      <h3 className="mt-4 text-[1.3rem] font-black tracking-[-0.04em] text-[#1c1c1e] md:text-[1.5rem]">
        {skill.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#4a4a4f]">{skill.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {skill.tags.length > 0 ? (
          skill.tags.map((tag) => (
            <span
              className="rounded-full border border-[rgba(0,122,255,0.14)] bg-white/80 px-3 py-1 text-[0.78rem] font-medium text-[#2263c7]"
              key={tag}
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="rounded-full border border-dashed border-[rgba(60,60,67,0.16)] px-3 py-1 text-[0.78rem] text-[#6b6b70]">
            No tags specified
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-xs text-[#6b6b70]">
          <span className="block font-semibold text-[#1c1c1e]">{skill.updatedAt}</span>
          <span>Updated from Skill Wiki</span>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-full bg-[#1c1c1e] px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#007aff]"
          onClick={() => navigateTo(`/skills/${skill.slug}`)}
          type="button"
        >
          查看详情
        </button>
      </div>
    </article>
  );
}
