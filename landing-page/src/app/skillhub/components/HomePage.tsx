import type { SkillWikiPayload } from "../types";
import { createSkillStats, getFeaturedSkill, navigateTo } from "../utils";
import { SectionBlock } from "./SectionBlock";
import { SkillCard } from "./SkillCard";

export function HomePage({ payload }: { payload: SkillWikiPayload }) {
  const stats = createSkillStats(payload);
  const featuredSkill = getFeaturedSkill(payload.skills);
  const highlightedSections = [
    {
      title: "Canonical source only",
      body: "Every surfaced skill comes from skills/wiki markdown, keeping the interface honest to the repository.",
    },
    {
      title: "Evidence-aware detail pages",
      body: "Skill pages preserve summary, steps, failure modes, evidence refs, scope, and provenance instead of flattening them into generic cards.",
    },
    {
      title: "Skill discovery surface",
      body: "Search, tags, and risk filters turn the wiki from a document folder into a findable product surface.",
    },
    {
      title: "PaaS-ready execution shell",
      body: "The repository now ships a thin workflow API that exposes multi-agent validation and readiness checks over HTTP without moving truth out of repo evidence.",
    },
  ];

  const platformSignals = [
    {
      label: "Workflow API",
      value: "PaaS-ready",
      detail: "Thin HTTP layer over repo-owned validators and run evidence.",
    },
    {
      label: "XHS status",
      value: "Accepted for PaaS",
      detail: "Technical verdict stays partial; human-reviewed readiness is explicit.",
    },
    {
      label: "Execution model",
      value: "Pi-backed multi-agent",
      detail: "Planner, worker, reviewer, verifier stay hard-gated before writeback.",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.55)] bg-[radial-gradient(circle_at_top_left,#e8f3ff,transparent_38%),radial-gradient(circle_at_85%_15%,#d8f5ff,transparent_22%),linear-gradient(180deg,#ffffff,#f4f7fb)] px-5 py-12 shadow-[0_28px_90px_rgba(17,24,39,0.08)] md:px-10 md:py-16">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,122,255,0.35),transparent)]" />
        <div className="relative z-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-[rgba(0,122,255,0.12)] bg-white/80 px-4 py-2 text-[0.74rem] font-black uppercase tracking-[0.16em] text-[#007aff]">
              专为 Skill Wiki 优化的 Skill 社区
            </p>
            <h1 className="mt-5 max-w-[12ch] text-[clamp(2.6rem,7vw,5.4rem)] font-black leading-[0.92] tracking-[-0.07em] text-[#1c1c1e]">
              Find usable skills and ship evidence-backed workflows.
            </h1>
            <p className="mt-5 max-w-[62ch] text-[1rem] leading-8 text-[#4a4a4f]">
              A SkillHub-style discovery surface for this repository's promoted Skill Wiki plus a PaaS-ready
              multi-agent workflow service. Browse structured skills, inspect evidence, and move from discovery into
              execution-ready workflow boundaries without leaving the repo context.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                className="inline-flex items-center justify-center rounded-full bg-[#007aff] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(0,122,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#006fe0]"
                onClick={() => navigateTo("/skills")}
                type="button"
              >
                开始 Find Skill
              </button>
              {featuredSkill ? (
                <button
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(60,60,67,0.1)] bg-white/85 px-6 py-3 text-sm font-semibold text-[#1c1c1e] transition hover:border-[rgba(0,122,255,0.28)] hover:text-[#007aff]"
                  onClick={() => navigateTo(`/skills/${featuredSkill.slug}`)}
                  type="button"
                >
                  打开精选技能
                </button>
              ) : null}
            </div>
          </div>

          <div className="rounded-[30px] border border-[rgba(255,255,255,0.75)] bg-white/72 p-5 shadow-[0_18px_50px_rgba(17,24,39,0.08)] backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  className="rounded-[24px] border border-[rgba(60,60,67,0.07)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(242,246,255,0.92))] p-4"
                  key={stat.label}
                >
                  <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#6b6b70]">{stat.label}</p>
                  <p className="mt-3 text-[1.75rem] font-black tracking-[-0.05em] text-[#1c1c1e]">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#4a4a4f]">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionBlock
        eyebrow="Why this surface works"
        title="A platform shell, but grounded in repository truth."
        description="The site keeps the SkillHub discovery shape while staying honest about what this repository actually ships: canonical skill pages, run evidence, and a thin workflow service."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlightedSections.map((section) => (
            <article
              className="rounded-[24px] border border-[rgba(60,60,67,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,248,255,0.88))] p-5"
              key={section.title}
            >
              <h3 className="text-lg font-bold tracking-[-0.03em] text-[#1c1c1e]">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4a4a4f]">{section.body}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Platform status"
        title="The repository can now surface skills and execute readiness checks."
        description="The current public boundary is explicit: knowledge browsing lives in the wiki, while execution status comes from validators and preserved run evidence."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {platformSignals.map((signal) => (
            <article
              className="rounded-[24px] border border-[rgba(60,60,67,0.08)] bg-white/92 p-5 shadow-[0_12px_34px_rgba(17,24,39,0.05)]"
              key={signal.label}
            >
              <p className="text-[0.74rem] font-black uppercase tracking-[0.16em] text-[#007aff]">{signal.label}</p>
              <h3 className="mt-3 text-[1.45rem] font-black tracking-[-0.04em] text-[#1c1c1e]">{signal.value}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4a4a4f]">{signal.detail}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      {featuredSkill ? (
        <SectionBlock
          eyebrow="Featured"
          title="Start from the strongest promoted skill page in the current wiki."
          description="The catalog may be small right now, but the product behavior is complete: discovery, filtering, provenance, and detail rendering already work."
        >
          <SkillCard featured skill={featuredSkill} />
        </SectionBlock>
      ) : null}
    </div>
  );
}
