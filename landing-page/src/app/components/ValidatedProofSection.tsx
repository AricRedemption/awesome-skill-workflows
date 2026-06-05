import { validatedProof } from "../content";

type ValidatedProofSectionProps = {
  variant?: "full" | "compact";
};

export function ValidatedProofSection({ variant = "full" }: ValidatedProofSectionProps) {
  const isCompact = variant === "compact";

  return (
    <section id="proof-stack" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mb-7 border-b border-[#d1bf94]/12 pb-7">
        {isCompact ? (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
            {validatedProof.eyebrow}
          </p>
        ) : null}
        <h2 className="asw-display-serif max-w-[760px] text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.02] text-[#f8f3e8]">
          {validatedProof.title}
        </h2>
        <p className="mt-3 max-w-[560px] text-[0.98rem] leading-[1.7] text-[#ebe1c8]/66">{validatedProof.description}</p>
      </div>

      {!isCompact ? (
        <article className="overflow-hidden rounded-[28px] border border-[#d1bf94]/15 bg-[linear-gradient(180deg,rgba(27,34,26,0.96),rgba(12,15,12,0.98))] p-6 shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_30px_90px_rgba(0,0,0,0.34)]">
          <div className="grid gap-6 min-[960px]:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <a className="text-sm font-bold text-[#f2d18d] transition hover:text-[#f7e1af]" href={validatedProof.spotlight.href} rel="noreferrer" target="_blank">
                  Open model
                </a>
              </div>

              <h3 className="asw-display-serif text-[1.5rem] leading-tight text-[#f8f3e8]">{validatedProof.spotlight.scenario}</h3>
              <p className="mt-3 max-w-[680px] text-[0.98rem] leading-[1.72] text-[#ebe1c8]/68">{validatedProof.spotlight.problem}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
                {validatedProof.stats.map((item) => (
                  <div
                    className="rounded-[18px] border border-[#d1bf94]/10 bg-[linear-gradient(180deg,rgba(21,28,20,0.86),rgba(13,16,13,0.92))] p-4"
                    key={item.label}
                  >
                    <div className="text-[1.55rem] font-black tracking-[-0.04em] text-[#f8f3e8]">{item.value}</div>
                    <div className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{item.label}</div>
                    <p className="mt-2 text-sm leading-[1.58] text-[#ebe1c8]/66">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[20px] border border-[#d1bf94]/12 bg-[#111511]/82 p-4">
                <p className="text-[1rem] font-semibold leading-[1.58] text-[#f8f3e8]">{validatedProof.spotlight.outcome}</p>
              </div>

              <div className="rounded-[20px] border border-[#d1bf94]/12 bg-[#111511]/82 p-4">
                <div className="mt-3 flex flex-wrap gap-2">
                  {validatedProof.spotlight.skills.map((skill) => (
                    <span
                      className="rounded-full border border-[#8eaf79]/18 bg-[#8eaf79]/10 px-3 py-1.5 text-[12px] font-semibold text-[#e7edd7]"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-[#d1bf94]/12 bg-[#111511]/82 p-4">
                <ul className="mt-3 space-y-2 text-sm leading-[1.65] text-[#ebe1c8]/76">
                  {validatedProof.spotlight.evidence.map((item) => (
                    <li className="flex gap-2" key={item}>
                      <span className="mt-[0.32rem] h-1.5 w-1.5 rounded-full bg-[#8eaf79]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      ) : null}

      <div className={`grid grid-cols-3 gap-4 max-[980px]:grid-cols-1 ${isCompact ? "" : "mt-4"}`}>
        {validatedProof.cards.map((card) => (
          <article
            className="rounded-[22px] border border-[#d1bf94]/12 bg-gradient-to-b from-[#171c17]/96 to-[#0f120f]/98 p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.08),0_18px_54px_rgba(0,0,0,0.28)]"
            key={card.title}
          >
            <h3 className="asw-display-serif text-[1.2rem] leading-tight text-[#f8f3e8]">{card.title}</h3>
            <p className="mt-2 text-[1rem] font-semibold text-[#b9d5a9]">{card.stat}</p>
            <p className="mt-3 text-[0.94rem] leading-[1.66] text-[#ebe1c8]/68">{card.body}</p>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#d1bf94]/10 pt-4">
              <span className="text-sm text-[#efe5c7]/66">{card.proofValue}</span>
              <a className="text-sm font-bold text-[#f2d18d] transition hover:text-[#f7e1af]" href={card.href} rel="noreferrer" target="_blank">
                Open proof
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
