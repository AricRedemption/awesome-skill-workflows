import { paasReadinessExplainer, proofStackExplainer, selfEvolutionCaseStudy } from "../content";

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-7 max-w-[820px] text-center">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
        {eyebrow}
      </p>
      <h2 className="asw-display-serif text-[clamp(1.85rem,3.5vw,3rem)] leading-[1.03] text-[#f8f3e8]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[660px] text-[0.98rem] leading-[1.7] text-[#ebe1c8]/68">{description}</p>
    </div>
  );
}

type ProofStackMapProps = {
  variant?: "full" | "compact";
};

export function ProofStackMap({ variant = "full" }: ProofStackMapProps) {
  const isCompact = variant === "compact";

  return (
    <section id="runwiser-proof-stack" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <SectionHeader {...proofStackExplainer} />

      <article className="overflow-hidden rounded-[30px] border border-[#d1bf94]/15 bg-[radial-gradient(ellipse_at_top_left,rgba(122,170,119,0.16),transparent_42%),linear-gradient(180deg,rgba(27,34,26,0.96),rgba(10,13,10,0.98))] p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_32px_100px_rgba(0,0,0,0.36)]">
        <div className={`grid gap-4 ${isCompact ? "" : "min-[980px]:grid-cols-[0.72fr_0.28fr]"}`}>
          <div className="grid gap-3">
            {proofStackExplainer.layers.map((layer, index) => (
              <div
                className={`group relative grid gap-4 rounded-[22px] border border-[#d1bf94]/12 bg-[#0e130f]/78 p-4 transition hover:border-[#d6ad69]/28 hover:bg-[#121812]/90 ${
                  isCompact
                    ? "min-[760px]:grid-cols-[130px_minmax(0,1fr)_160px]"
                    : "min-[760px]:grid-cols-[150px_minmax(0,1fr)_180px]"
                }`}
                key={layer.title}
              >
                {!isCompact && index < proofStackExplainer.layers.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute left-[28px] top-[calc(100%-2px)] h-[18px] w-px bg-[#d6ad69]/22 max-[760px]:hidden"
                  />
                ) : null}
                <div>
                  <div className="font-mono text-[11px] font-black uppercase tracking-[0.1em] text-[#d6ad69]">{layer.label}</div>
                  <div className="mt-2 text-sm font-bold text-[#f8f3e8]">{layer.claim}</div>
                </div>
                <div>
                  <h3 className="asw-display-serif text-[1.22rem] leading-tight text-[#f8f3e8]">{layer.title}</h3>
                  {!isCompact ? <p className="mt-2 text-sm leading-[1.65] text-[#ebe1c8]/70">{layer.body}</p> : null}
                </div>
                <code className="self-start rounded-xl border border-[#d6ad69]/14 bg-[#d6ad69]/9 px-3 py-2 font-mono text-[12px] leading-5 text-[#f2d59e]">
                  {layer.path}
                </code>
              </div>
            ))}
          </div>

          {!isCompact ? (
            <aside className="rounded-[24px] border border-[#d6ad69]/18 bg-[#0a0d0a]/74 p-5">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Trust rule</div>
              <p className="asw-display-serif mt-3 text-[1.6rem] leading-[1.08] text-[#f8f3e8]">
                {proofStackExplainer.principle}
              </p>
              <div className="mt-6 border-t border-[#d1bf94]/12 pt-5">
                <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Kept separate</div>
                <ul className="grid gap-3">
                  {proofStackExplainer.separations.map((item) => (
                    <li className="flex gap-3 text-sm leading-[1.55] text-[#ebe1c8]/75" key={item}>
                      <span className="mt-[0.38rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8eaf79]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : (
            <div className="rounded-[20px] border border-[#d6ad69]/18 bg-[#0a0d0a]/74 p-5 text-center">
              <p className="asw-display-serif text-[1.25rem] leading-[1.2] text-[#f8f3e8]">{proofStackExplainer.principle}</p>
              <a
                className="mt-4 inline-flex text-sm font-bold text-[#f2d18d] transition hover:text-[#f7e1af]"
                href={proofStackExplainer.compactCta.href}
              >
                {proofStackExplainer.compactCta.label} ›
              </a>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

export function SelfEvolutionCaseStudy() {
  return (
    <section id="self-evolution-case-study" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <SectionHeader {...selfEvolutionCaseStudy} />

      <article className="overflow-hidden rounded-[30px] border border-[#d1bf94]/15 bg-[linear-gradient(180deg,rgba(24,30,25,0.97),rgba(10,13,11,0.98))] shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_32px_96px_rgba(0,0,0,0.36)]">
        <div className="grid gap-0 min-[980px]:grid-cols-[0.38fr_0.62fr]">
          <div className="border-b border-[#d1bf94]/12 bg-[radial-gradient(ellipse_at_top,rgba(214,173,105,0.14),transparent_62%),#10150f] p-6 min-[980px]:border-b-0 min-[980px]:border-r">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
              {selfEvolutionCaseStudy.caseLabel}
            </div>
            <h3 className="asw-display-serif mt-3 text-[clamp(1.55rem,2.7vw,2.3rem)] leading-[1.05] text-[#f8f3e8]">
              {selfEvolutionCaseStudy.caseTitle}
            </h3>
            <p className="mt-4 text-[0.98rem] leading-[1.7] text-[#ebe1c8]/70">{selfEvolutionCaseStudy.outcome}</p>
            <div className="mt-6 grid gap-3">
              {selfEvolutionCaseStudy.guardrails.map((guardrail) => (
                <div className="rounded-[18px] border border-[#d1bf94]/12 bg-[#0b0f0b]/72 p-4" key={guardrail.title}>
                  <div className="text-sm font-black text-[#f8f3e8]">{guardrail.title}</div>
                  <p className="mt-2 text-sm leading-[1.58] text-[#ebe1c8]/64">{guardrail.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <div className="grid gap-3">
              {selfEvolutionCaseStudy.timeline.map((step, index) => (
                <div
                  className="grid gap-4 rounded-[20px] border border-[#d1bf94]/12 bg-[#101511]/82 p-4 min-[720px]:grid-cols-[74px_minmax(0,1fr)_180px]"
                  key={step.title}
                >
                  <div className="font-mono text-[1.45rem] font-black tracking-[-0.05em] text-[#d6ad69]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="asw-display-serif text-[1.18rem] leading-tight text-[#f8f3e8]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-[1.64] text-[#ebe1c8]/70">{step.body}</p>
                  </div>
                  <code className="self-start rounded-xl border border-[#d6ad69]/14 bg-[#d6ad69]/9 px-3 py-2 font-mono text-[11px] leading-5 text-[#f2d59e]">
                    {step.artifact}
                  </code>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 rounded-[20px] border border-[#d1bf94]/12 bg-[#0c100c]/82 p-4">
              {selfEvolutionCaseStudy.artifacts.map((artifact) => (
                <a
                  className="rounded-lg border border-[#d6ad69]/15 bg-[#d6ad69]/10 px-3 py-2 text-sm font-bold text-[#f2d59e] transition hover:border-[#d6ad69]/36 hover:bg-[#d6ad69]/16"
                  href={artifact.href}
                  key={artifact.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {artifact.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export function PaasReadinessExplainer() {
  return (
    <section id="paas-readiness" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <SectionHeader {...paasReadinessExplainer} />

      <article className="rounded-[30px] border border-[#d1bf94]/15 bg-[radial-gradient(ellipse_at_80%_0%,rgba(214,173,105,0.12),transparent_45%),linear-gradient(180deg,rgba(24,28,25,0.98),rgba(9,12,10,0.98))] p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_32px_96px_rgba(0,0,0,0.36)]">
        <div className="grid gap-4 min-[920px]:grid-cols-2">
          {paasReadinessExplainer.verdicts.map((verdict) => {
            const isGreen = verdict.tone === "green";
            return (
              <div
                className={`rounded-[24px] border p-5 ${
                  isGreen
                    ? "border-[#8eaf79]/24 bg-[#8eaf79]/10"
                    : "border-[#d6ad69]/24 bg-[#d6ad69]/10"
                }`}
                key={verdict.value}
              >
                <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{verdict.label}</div>
                <h3 className="mt-3 font-mono text-[clamp(1.25rem,2.6vw,2rem)] font-black tracking-[-0.05em] text-[#f8f3e8]">
                  {verdict.value}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-[1.7] text-[#ebe1c8]/70">{verdict.body}</p>
                <ul className="mt-5 grid gap-2">
                  {verdict.keeps.map((item) => (
                    <li className="rounded-xl border border-[#d1bf94]/12 bg-[#0a0e0a]/56 px-3 py-2 text-sm font-semibold text-[#efe5c7]/76" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 rounded-[24px] border border-[#d1bf94]/12 bg-[#0b0f0b]/70 p-5 min-[940px]:grid-cols-[1fr_0.82fr]">
          <div>
            <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Acceptance equation</div>
            <div className="flex flex-wrap items-center gap-2">
              {paasReadinessExplainer.equation.map((item, index) => (
                <span className="contents" key={item}>
                  <span className="rounded-full border border-[#8eaf79]/20 bg-[#8eaf79]/10 px-3 py-2 text-sm font-bold text-[#e7edd7]">
                    {item}
                  </span>
                  {index < paasReadinessExplainer.equation.length - 1 ? (
                    <span className="font-mono text-sm font-black text-[#d6ad69]/70">+</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Still not allowed</div>
            <ul className="grid gap-2">
              {paasReadinessExplainer.notAllowed.map((item) => (
                <li className="flex gap-2 text-sm leading-[1.58] text-[#ebe1c8]/72" key={item}>
                  <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6ad69]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 text-center">
          <a className="text-sm font-bold text-[#f2d18d] transition hover:text-[#f7e1af]" href={paasReadinessExplainer.href} rel="noreferrer" target="_blank">
            Open the readiness contract
          </a>
        </div>
      </article>
    </section>
  );
}
