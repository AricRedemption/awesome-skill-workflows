import { hero, links } from "../content";

const stepTones = [
  "border-[#d1bf94]/16 bg-[linear-gradient(180deg,rgba(38,61,84,0.86),rgba(24,42,59,0.92))] text-[#f8f3e8]",
  "border-[#d1bf94]/16 bg-[linear-gradient(180deg,rgba(38,61,84,0.86),rgba(24,42,59,0.92))] text-[#f8f3e8]",
  "border-[#cdb48a]/20 bg-[linear-gradient(180deg,rgba(63,58,79,0.84),rgba(38,35,54,0.92))] text-[#f8f3e8]",
  "border-[#9cc88c]/22 bg-[linear-gradient(180deg,rgba(30,67,59,0.82),rgba(21,43,40,0.92))] text-[#eefbe9]",
  "border-[#d1bf94]/16 bg-[linear-gradient(180deg,rgba(38,61,84,0.86),rgba(24,42,59,0.92))] text-[#f8f3e8]",
  "border-[#d6ad69]/28 bg-[linear-gradient(180deg,rgba(84,61,31,0.82),rgba(47,34,21,0.94))] text-[#fff1cf]",
] as const;

export function Hero() {
  return (
    <section id="top" className="mx-auto min-h-[620px] w-full max-w-[1240px] px-4 py-[40px] pb-[24px] max-[980px]:min-h-0 max-[980px]:pt-8 max-[980px]:pb-16">
      <div className="mx-auto max-w-[960px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {hero.eyebrow}
        </p>
        <h1 className="asw-display-serif text-[clamp(2.6rem,4.5vw,4rem)] leading-[0.96] tracking-normal text-[#f8f3e8] max-[700px]:text-[clamp(2rem,8vw,2.6rem)]">
          {hero.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[680px] text-[1rem] leading-[1.72] text-[#ebe1c8]/72">{hero.description}</p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            className="inline-flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#d1bf94]/20 bg-[#f4e6c8] px-4.5 font-bold text-[#11130f] shadow-[0_0_28px_rgba(174,132,68,0.18)]"
            href={hero.primaryHref ?? "/proof"}
          >
            {hero.primaryCta}
          </a>
          <a
            className="inline-flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#d1bf94]/20 bg-[#f4e6c8]/7 px-4.5 font-bold text-[#f2f0e8]"
            href={hero.secondaryHref ?? links.docs}
            rel={hero.secondaryExternal === false ? undefined : "noreferrer"}
            target={hero.secondaryExternal === false ? undefined : "_blank"}
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[24px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95 p-4.5 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(122,170,119,0.18),transparent_68%)]" aria-label="Workflow flow diagram">
        <div className="relative mb-3.5 flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.06em] text-[#efe5c7]/65">
          <span>Flow at a glance</span>
          <span className="before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-[#9cc88c] before:shadow-[0_0_14px_rgba(156,200,140,0.56)]">proof kept separate</span>
        </div>
        <div className="relative grid gap-3">
          <div className="rounded-[18px] border border-[#d1bf94]/15 bg-[linear-gradient(180deg,rgba(22,28,21,0.94),rgba(12,14,12,0.98))] p-4 shadow-[inset_0_1px_0_rgba(244,230,200,0.05)]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Run to asset</span>
              <span className="rounded-full border border-[#8eaf79]/18 bg-[#8eaf79]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#b9d5a9]">
                {hero.signals[1].value}
              </span>
            </div>

            <div className="relative rounded-[18px] border border-[#d1bf94]/12 bg-[linear-gradient(180deg,rgba(26,40,53,0.72),rgba(16,28,40,0.82))] p-4 max-[979px]:bg-transparent max-[979px]:p-0">
              <div
                className="pointer-events-none absolute left-[9%] right-[9%] top-[50%] hidden h-px -translate-y-1/2 bg-gradient-to-r from-[#8eaf79]/10 via-[#d6ad69]/70 to-[#8eaf79]/10 min-[980px]:block"
                aria-hidden="true"
              />
              <div className="grid grid-cols-2 gap-3 min-[980px]:grid-cols-6">
                {hero.consoleSteps.map((step, index) => (
                  <div
                    className={`relative flex min-h-[108px] flex-col justify-between rounded-[18px] border p-4 shadow-[inset_0_1px_0_rgba(244,230,200,0.06),0_12px_36px_rgba(0,0,0,0.18)] ${stepTones[index]}`}
                    key={step}
                  >
                    <span className="font-mono text-[11px] font-bold text-[#d6ad69]">{String(index + 1).padStart(2, "0")}</span>
                    <strong className="asw-display-serif block text-[20px] leading-tight">{step}</strong>
                  </div>
                ))}
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
                <p className="mt-2 text-[0.98rem] font-semibold leading-[1.45] text-[#f8f3e8]">{signal.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
