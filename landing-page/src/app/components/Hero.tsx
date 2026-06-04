import { hero, links } from "../content";

export function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-[1240px] px-4 py-[56px] pb-[40px] max-[980px]:pt-12 max-[980px]:pb-20">
      <div className="grid gap-8 min-[980px]:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.82fr)] min-[980px]:items-end">
        <div className="max-w-[720px]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/26 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
            {hero.eyebrow}
          </p>
          <h1 className="asw-display-serif max-w-[680px] text-[clamp(2.8rem,5.8vw,5.15rem)] leading-[0.98] text-[#f8f3e8]">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-[640px] text-[1.02rem] leading-[1.78] text-[#ebe1c8]/76">{hero.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {hero.proofStrip.map((item) => (
              <span
                className="rounded-full border border-[#d1bf94]/14 bg-[#f4e6c8]/6 px-3 py-1.5 text-[12px] font-semibold text-[#efe5c7]/72"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="inline-flex min-h-[48px] items-center justify-center rounded-[10px] border border-[#d1bf94]/18 bg-[#f4e6c8] px-5 font-bold text-[#11130f] shadow-[0_0_28px_rgba(174,132,68,0.18)]" href="/proof">
              {hero.primaryCta}
            </a>
            <a
              className="inline-flex min-h-[48px] items-center justify-center rounded-[10px] border border-[#d1bf94]/18 bg-[#f4e6c8]/7 px-5 font-bold text-[#f2f0e8]"
              href={links.docs}
              rel="noreferrer"
              target="_blank"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[26px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95 p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_62%_58%_at_50%_0%,rgba(122,170,119,0.16),transparent_72%)]">
          <div className="relative flex items-center justify-between gap-3 text-xs font-extrabold uppercase tracking-[0.06em] text-[#efe5c7]/60">
            <span>Proof boundary</span>
            <span className="before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-[#9cc88c] before:shadow-[0_0_14px_rgba(156,200,140,0.56)]">
              evidence-backed
            </span>
          </div>
          <div className="relative mt-4 rounded-[20px] border border-[#d1bf94]/12 bg-[linear-gradient(180deg,rgba(18,24,20,0.94),rgba(11,14,12,0.98))] p-4 shadow-[inset_0_1px_0_rgba(244,230,200,0.05)]">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{hero.support.title}</span>
            <p className="mt-3 text-[1rem] leading-[1.7] text-[#f4f0df]/84">{hero.support.body}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {hero.signals.map((signal) => (
                <div
                  className="rounded-[16px] border border-[#d1bf94]/12 bg-[linear-gradient(180deg,rgba(13,18,13,0.92),rgba(12,18,25,0.72))] p-3.5"
                  key={signal.label}
                >
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{signal.label}</span>
                  <p className="mt-2 text-[0.98rem] font-semibold leading-[1.5] text-[#f8f3e8]">{signal.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[18px] border border-[#d1bf94]/10 bg-[linear-gradient(180deg,rgba(22,34,47,0.74),rgba(13,22,31,0.82))] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Promotion flow</span>
                <span className="rounded-full border border-[#8eaf79]/18 bg-[#8eaf79]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#b9d5a9]">
                  explicit gates
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {hero.consoleSteps.map((step, index) => (
                  <div className="rounded-[14px] border border-[#d1bf94]/12 bg-[#101621]/84 px-3 py-3" key={step}>
                    <div className="font-mono text-[11px] font-bold text-[#d6ad69]">{String(index + 1).padStart(2, "0")}</div>
                    <strong className="mt-2 block text-[0.98rem] leading-tight text-[#f8f3e8]">{step}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
