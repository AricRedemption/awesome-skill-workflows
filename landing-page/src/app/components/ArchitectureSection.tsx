import { coreModel } from "../content";

export function ArchitectureSection() {
  return (
    <section id="model" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mx-auto mb-6 max-w-[780px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {coreModel.eyebrow}
        </p>
        <h2 className="text-[clamp(1.65rem,3.2vw,2.75rem)] font-bold leading-[1.08] text-[#f8f3e8]">{coreModel.title}</h2>
        <p className="mt-4 text-base leading-[1.72] text-[#ebe1c8]/75">{coreModel.description}</p>
      </div>
      <figure className="mx-auto mb-4 w-[min(980px,100%)] overflow-hidden rounded-[22px] border border-[#d1bf94]/16 bg-[#0b1018] p-3 shadow-[0_0_0_1px_rgba(122,170,119,0.10),0_24px_80px_rgba(0,0,0,0.28)]">
        <img className="block h-auto w-full rounded-[16px]" src={coreModel.visual.src} alt={coreModel.visual.alt} />
      </figure>
      <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
        {coreModel.pillars.map((pillar) => (
          <article
            className="rounded-[22px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95 p-6 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)]"
            key={pillar.title}
          >
            <span className="mb-4 inline-block text-xs font-extrabold uppercase tracking-[0.06em] text-[#d6ad69]">{pillar.subtitle}</span>
            <h3 className="text-[1.05rem] font-bold text-[#f8f3e8]">{pillar.title}</h3>
            <p className="mt-3 text-base leading-[1.72] text-[#ebe1c8]/75">{pillar.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {pillar.paths.map((item) => (
                <li className="rounded-lg border border-[#d6ad69]/15 bg-[#d6ad69]/10 px-2.5 py-2 font-mono text-xs text-[#f2d59e]" key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
