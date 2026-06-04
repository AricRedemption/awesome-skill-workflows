import type { SkillWikiSkill } from "../types";
import { navigateTo } from "../utils";

function DetailList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm leading-7 text-[#6b6b70]">Not specified in wiki.</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li className="flex gap-3 text-sm leading-7 text-[#4a4a4f]" key={item}>
          <span className="mt-2 h-2 w-2 rounded-full bg-[#007aff]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailParagraphs({ paragraphs }: { paragraphs: string[] }) {
  if (paragraphs.length === 0) {
    return <p className="text-sm leading-7 text-[#6b6b70]">Not specified in wiki.</p>;
  }

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => (
        <p className="text-sm leading-7 text-[#4a4a4f]" key={paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function SkillDetailPage({ skill }: { skill: SkillWikiSkill }) {
  const sectionCards = [
    { label: "When to use", body: <DetailList items={skill.whenToUse.bullets} /> },
    { label: "When not to use", body: <DetailList items={skill.whenNotToUse.bullets} /> },
    { label: "Inputs", body: <DetailList items={skill.inputs.bullets} /> },
    { label: "Outputs", body: <DetailList items={skill.outputs.bullets} /> },
    { label: "Failure modes", body: <DetailList items={skill.failureModes.bullets} /> },
    { label: "Evidence refs", body: <DetailList items={skill.evidenceRefs.bullets} /> },
    { label: "Related skills", body: <DetailList items={skill.relatedSkills.bullets} /> },
    { label: "Scope", body: <DetailList items={skill.scope.bullets} /> },
    { label: "Non-scope", body: <DetailList items={skill.nonScope.bullets} /> },
    { label: "Provenance", body: <DetailList items={skill.provenance.bullets} /> },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[30px] border border-[rgba(60,60,67,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,248,255,0.84))] p-6 shadow-[0_24px_72px_rgba(17,24,39,0.08)] md:p-8">
          <button
            className="rounded-full border border-[rgba(60,60,67,0.08)] bg-white px-4 py-2 text-sm font-semibold text-[#4a4a4f] transition hover:border-[rgba(0,122,255,0.24)] hover:text-[#007aff]"
            onClick={() => navigateTo("/skills")}
            type="button"
          >
            返回技能列表
          </button>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#007aff]/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#007aff]">
              Skill Wiki detail
            </span>
            <span className="rounded-full bg-[#1c1c1e]/6 px-3 py-1 text-[0.72rem] font-semibold text-[#4a4a4f]">
              Risk: {skill.riskLevel}
            </span>
          </div>

          <h1 className="mt-4 text-[clamp(2.1rem,4vw,3.5rem)] font-black leading-[0.98] tracking-[-0.06em] text-[#1c1c1e]">
            {skill.title}
          </h1>
          <p className="mt-4 max-w-[65ch] text-[1rem] leading-8 text-[#4a4a4f]">{skill.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {skill.tags.length > 0 ? (
              skill.tags.map((tag) => (
                <span
                  className="rounded-full border border-[rgba(0,122,255,0.14)] bg-white/80 px-3 py-1 text-[0.8rem] font-medium text-[#2263c7]"
                  key={tag}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="rounded-full border border-dashed border-[rgba(60,60,67,0.16)] px-3 py-1 text-[0.8rem] text-[#6b6b70]">
                No tags specified
              </span>
            )}
          </div>
        </article>

        <aside className="rounded-[30px] border border-[rgba(60,60,67,0.08)] bg-[rgba(255,255,255,0.82)] p-6 shadow-[0_24px_72px_rgba(17,24,39,0.06)]">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#007aff]">Quick facts</p>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-sm font-semibold text-[#1c1c1e]">Updated at</dt>
              <dd className="mt-1 text-sm leading-7 text-[#4a4a4f]">{skill.updatedAt}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#1c1c1e]">Source path</dt>
              <dd className="mt-1 break-all text-sm leading-7 text-[#4a4a4f]">{skill.sourcePath}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#1c1c1e]">Workflow summary</dt>
              <dd className="mt-1 text-sm leading-7 text-[#4a4a4f]">
                {skill.overview.paragraphs[0] ?? "Not specified in wiki."}
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      {skill.steps.steps.length > 0 ? (
        <section className="rounded-[30px] border border-[rgba(60,60,67,0.08)] bg-white/82 p-6 shadow-[0_22px_60px_rgba(17,24,39,0.05)] md:p-8">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#007aff]">Steps</p>
          <h2 className="mt-3 text-[1.55rem] font-black tracking-[-0.04em] text-[#1c1c1e]">
            Execution path from the wiki page
          </h2>
          <ol className="mt-6 grid gap-3">
            {skill.steps.steps.map((step, index) => (
              <li
                className="grid gap-3 rounded-[24px] border border-[rgba(60,60,67,0.08)] bg-[linear-gradient(180deg,rgba(249,251,255,0.96),rgba(255,255,255,0.96))] p-4 md:grid-cols-[40px_1fr]"
                key={step}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007aff] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-[#4a4a4f]">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        {sectionCards.map((section) => (
          <article
            className="rounded-[28px] border border-[rgba(60,60,67,0.08)] bg-white/80 p-6 shadow-[0_18px_56px_rgba(17,24,39,0.05)]"
            key={section.label}
          >
            <h3 className="text-lg font-bold tracking-[-0.03em] text-[#1c1c1e]">{section.label}</h3>
            <div className="mt-4">{section.body}</div>
          </article>
        ))}
      </section>

      <section className="rounded-[30px] border border-[rgba(60,60,67,0.08)] bg-white/82 p-6 shadow-[0_22px_60px_rgba(17,24,39,0.05)] md:p-8">
        <p className="text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#007aff]">Overview</p>
        <h2 className="mt-3 text-[1.55rem] font-black tracking-[-0.04em] text-[#1c1c1e]">Narrative from the canonical wiki entry</h2>
        <div className="mt-5">
          <DetailParagraphs paragraphs={skill.overview.paragraphs} />
        </div>
      </section>
    </div>
  );
}
