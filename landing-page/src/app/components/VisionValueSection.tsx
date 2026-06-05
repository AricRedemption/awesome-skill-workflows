import { visionValue } from "../content";

export function VisionValueSection() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 py-10">
      <div className="mx-auto mb-6 max-w-[860px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {visionValue.eyebrow}
        </p>
        <h2 className="asw-display-serif text-[clamp(1.8rem,3.5vw,2.95rem)] leading-[1.04] text-[#f8f3e8]">
          {visionValue.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-[0.98rem] leading-[1.7] text-[#ebe1c8]/68">{visionValue.description}</p>
      </div>

      <div className="grid gap-4 min-[980px]:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          {visionValue.pillars.map((pillar) => (
            <article
              className="rounded-[24px] border border-[#d1bf94]/14 bg-[linear-gradient(180deg,rgba(24,30,25,0.97),rgba(11,14,11,0.98))] p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.08),0_24px_76px_rgba(0,0,0,0.3)]"
              key={pillar.title}
            >
              <h3 className="asw-display-serif text-[1.35rem] leading-tight text-[#f8f3e8]">{pillar.title}</h3>
              <p className="mt-4 text-[0.97rem] leading-[1.68] text-[#ebe1c8]/72">{pillar.body}</p>
            </article>
          ))}
        </div>

        <article className="rounded-[24px] border border-[#d1bf94]/14 bg-[radial-gradient(ellipse_at_top_left,rgba(122,170,119,0.12),transparent_38%),linear-gradient(180deg,rgba(24,30,25,0.97),rgba(11,14,11,0.98))] p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.08),0_24px_76px_rgba(0,0,0,0.3)]">
          <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Why current approaches fall short</div>
          <div className="grid gap-3">
            {visionValue.gaps.map((gap) => (
              <div className="rounded-[18px] border border-[#d1bf94]/10 bg-[#111511]/82 p-4" key={gap.title}>
                <h3 className="text-[1rem] font-black leading-tight text-[#f8f3e8]">{gap.title}</h3>
                <p className="mt-2 text-sm leading-[1.62] text-[#ebe1c8]/70">{gap.body}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
