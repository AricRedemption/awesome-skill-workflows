import { hero, links } from "../content";

const stepHints = [
  "Execution starts",
  "Quality check",
  "Human decision",
  "Proof boundary",
  "Memory update",
  "Promotion ready",
] as const;

export function Hero() {
  return (
    <section id="top" className="mx-auto min-h-[640px] w-full max-w-[1240px] px-4 py-[56px] pb-[32px] max-[980px]:min-h-0 max-[980px]:pt-12 max-[980px]:pb-24">
      <div className="mx-auto max-w-[940px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{hero.eyebrow}</p>
        <h1 className="mx-auto mb-5 max-w-[940px] text-[clamp(2.45rem,6.6vw,5.15rem)] font-[780] leading-[0.98] tracking-normal text-[#f8f3e8]">{hero.title}</h1>
        <p className="mx-auto max-w-[780px] text-base leading-[1.72] text-[#ebe1c8]/75">{hero.description}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a className="inline-flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#d1bf94]/20 bg-[#f4e6c8] px-4.5 font-bold text-[#11130f] shadow-[0_0_28px_rgba(174,132,68,0.18)]" href="#model">
            {hero.primaryCta}
          </a>
          <a className="inline-flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#d1bf94]/20 bg-[#f4e6c8]/7 px-4.5 font-bold text-[#f2f0e8]" href={links.verifiedRecipe}>
            {hero.secondaryCta}
          </a>
        </div>
      </div>
      <div className="relative mx-auto mt-8 max-w-[1040px] overflow-hidden rounded-[22px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95 p-4.5 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(122,170,119,0.18),transparent_68%)]" aria-label="Workflow framework summary">
        <div className="relative mb-3.5 flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.06em] text-[#efe5c7]/65">
          <span>Architecture preview</span>
          <span className="before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-[#9cc88c] before:shadow-[0_0_14px_rgba(156,200,140,0.56)]">evidence-backed</span>
        </div>
        <div className="relative overflow-hidden rounded-[18px] border border-[#d1bf94]/20 bg-[#11130f]/80 p-4">
          <div className="grid gap-3">
            <div className="rounded-[18px] border border-[#d1bf94]/15 bg-[linear-gradient(180deg,rgba(22,28,21,0.94),rgba(12,14,12,0.98))] p-4 shadow-[inset_0_1px_0_rgba(244,230,200,0.05)]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Promotion flow</span>
                <span className="rounded-full border border-[#8eaf79]/18 bg-[#8eaf79]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#b9d5a9]">
                  {hero.signals[1].value}
                </span>
              </div>

              <div className="relative rounded-[18px] border border-[#d1bf94]/12 bg-[linear-gradient(180deg,rgba(26,40,53,0.72),rgba(16,28,40,0.82))] p-4 max-[979px]:bg-transparent max-[979px]:p-0">
                <div
                  className="pointer-events-none absolute left-[8.5%] right-[8.5%] top-[43px] hidden h-px bg-gradient-to-r from-[#8eaf79]/15 via-[#d6ad69]/65 to-[#8eaf79]/15 min-[980px]:block"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-2 gap-3 min-[980px]:grid-cols-6">
                  {hero.consoleSteps.map((step, index) => {
                    const isReview = step === "Review";
                    const isVerify = step === "Verify";
                    const isPromote = step === "Promote";
                    const cardClassName = isPromote
                      ? "border-[#d6ad69]/26 bg-[linear-gradient(180deg,rgba(84,61,31,0.78),rgba(47,34,21,0.9))] shadow-[inset_0_1px_0_rgba(255,230,182,0.18),0_12px_36px_rgba(118,80,25,0.2)]"
                      : isVerify
                        ? "border-[#9cc88c]/24 bg-[linear-gradient(180deg,rgba(30,67,59,0.78),rgba(21,43,40,0.9))] shadow-[inset_0_1px_0_rgba(219,245,217,0.14),0_12px_36px_rgba(31,88,71,0.18)]"
                        : isReview
                          ? "border-[#cdb48a]/22 bg-[linear-gradient(180deg,rgba(63,58,79,0.8),rgba(38,35,54,0.9))] shadow-[inset_0_1px_0_rgba(240,226,201,0.12),0_12px_36px_rgba(56,39,87,0.18)]"
                          : "border-[#d1bf94]/14 bg-[linear-gradient(180deg,rgba(38,61,84,0.82),rgba(24,42,59,0.9))] shadow-[inset_0_1px_0_rgba(244,230,200,0.06),0_12px_36px_rgba(0,0,0,0.18)]";
                    const dotWrapClassName = isPromote
                      ? "border-[#f0d798]/68 bg-[#2a2013]"
                      : isVerify
                        ? "border-[#bce3b5]/68 bg-[#182620]"
                        : isReview
                          ? "border-[#dec9a0]/68 bg-[#241e2e]"
                          : "border-[#d6ad69]/60 bg-[#17212b]";
                    const dotInnerClassName = isPromote ? "bg-[#f0d798]" : isVerify ? "bg-[#bce3b5]" : "bg-[#d6ad69]";
                    const titleClassName = isPromote ? "text-[#fff1cf]" : isVerify ? "text-[#eefbe9]" : "text-[#f8f3e8]";
                    const hintClassName = isPromote ? "text-[#f0d798]/52" : isVerify ? "text-[#d8f0d1]/50" : "text-[#ebe1c8]/45";

                    return (
                      <div className={`relative min-h-[132px] rounded-[18px] border p-4 ${cardClassName}`} key={step}>
                        <div className={`absolute left-4 top-[35px] hidden h-4 w-4 -translate-y-1/2 rounded-full border min-[980px]:block ${dotWrapClassName}`} aria-hidden="true">
                          <div className={`absolute inset-[3px] rounded-full ${dotInnerClassName}`} />
                        </div>
                        <span className="ml-0 font-mono text-[11px] font-bold text-[#d6ad69] min-[980px]:ml-6">{String(index + 1).padStart(2, "0")}</span>
                        <strong className={`mt-6 block text-[16px] leading-tight ${titleClassName}`}>{step}</strong>
                        <span className={`mt-4 block text-[11px] uppercase tracking-[0.08em] ${hintClassName}`}>{stepHints[index]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-3 min-[760px]:grid-cols-3">
              {hero.signals.map((signal) => (
                <div
                  className="rounded-[15px] border border-[#d1bf94]/12 bg-[linear-gradient(180deg,rgba(13,18,13,0.9),rgba(12,18,25,0.72))] p-3.5"
                  key={signal.label}
                >
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{signal.label}</span>
                  <p className="mt-2 text-[1rem] font-semibold leading-[1.45] text-[#f8f3e8]">{signal.label}</p>
                  <p className="mt-2 text-sm leading-[1.6] text-[#ebe1c8]/72">{signal.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
