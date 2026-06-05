import { useState } from "react";
import { coreModel } from "../content";

export function ArchitectureSection() {
  const [activeVisual, setActiveVisual] = useState(0);
  const totalVisuals = coreModel.visuals.length;
  const active = coreModel.visuals[activeVisual];

  return (
    <section id="model" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mx-auto mb-6 max-w-[780px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {coreModel.eyebrow}
        </p>
        <h2 className="asw-display-serif text-[clamp(1.9rem,3.7vw,3.25rem)] leading-[1.02] text-[#f8f3e8]">{coreModel.title}</h2>
        <p className="mt-4 text-base leading-[1.72] text-[#ebe1c8]/75">{coreModel.description}</p>
      </div>
      <div className="mb-4 grid grid-cols-[1fr_auto] items-center gap-2 rounded-[22px] border border-[#d1bf94]/15 bg-gradient-to-r from-[#1e241d]/95 to-[#10120f]/95 p-4 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.32)] max-[900px]:grid-cols-1">
        <div className="grid grid-cols-5 gap-2 max-[900px]:grid-cols-1">
          {coreModel.flow.map((step, index) => (
            <div className="relative rounded-[16px] border border-[#d1bf94]/14 bg-[#0f130f]/82 px-4 py-3" key={step}>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">0{index + 1}</div>
              <div className="mt-1 text-sm font-bold text-[#f8f3e8]">{step}</div>
            </div>
          ))}
        </div>
      </div>
      <article className="mx-auto mb-4 overflow-hidden rounded-[24px] border border-[#d1bf94]/16 bg-[#0b1018] shadow-[0_0_0_1px_rgba(122,170,119,0.10),0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="grid grid-cols-[0.36fr_0.64fr] gap-0 max-[900px]:grid-cols-1">
          <div className="border-r border-[#d1bf94]/12 bg-[linear-gradient(180deg,rgba(12,22,27,0.82),rgba(12,16,14,0.9))] p-4 max-[900px]:border-r-0 max-[900px]:border-b">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Diagram selector</div>
              <div className="font-mono text-[11px] font-bold text-[#efe5c7]/42">
                0{activeVisual + 1}/0{totalVisuals}
              </div>
            </div>
            <div className="grid gap-2 rounded-full border border-[#d1bf94]/10 bg-[#05090c]/58 p-1.5 max-[900px]:grid-cols-3 max-[640px]:rounded-[24px] max-[640px]:grid-cols-1">
              {coreModel.visuals.map((visual, index) => {
                const selected = index === activeVisual;
                return (
                  <button
                    aria-pressed={selected}
                    className={`grid min-h-[54px] grid-cols-[auto_1fr] items-center gap-3 rounded-full px-3 py-2 text-left transition max-[640px]:rounded-[18px] ${
                      selected
                        ? "bg-[#f4e6c8] text-[#10130f] shadow-[0_0_26px_rgba(214,173,105,0.2)]"
                        : "text-[#efe5c7]/62 hover:bg-[#f4e6c8]/8 hover:text-[#f8f3e8]"
                    }`}
                    key={visual.label}
                    onClick={() => setActiveVisual(index)}
                    type="button"
                  >
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full border font-mono text-[11px] font-black ${
                        selected
                          ? "border-[#10130f]/14 bg-[#10130f] text-[#f4e6c8]"
                          : "border-[#d1bf94]/16 bg-[#101511] text-[#d6ad69]"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className={`block truncate text-sm font-black leading-tight ${selected ? "text-[#10130f]" : "text-[#f8f3e8]"}`}>
                        {visual.label}
                      </span>
                      <span className={`mt-0.5 block truncate text-[11px] font-semibold uppercase tracking-[0.06em] ${selected ? "text-[#10130f]/58" : "text-[#ebe1c8]/42"}`}>
                        diagram
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-[18px] border border-[#7ea78a]/14 bg-[#091011]/82 p-4 shadow-[inset_0_1px_0_rgba(244,230,200,0.04)]">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{active.label}</div>
              <h3 className="asw-display-serif mt-2 text-[1.35rem] leading-tight text-[#f8f3e8]">{active.title}</h3>
              <p className="mt-3 text-sm leading-[1.65] text-[#ebe1c8]/72">{active.body}</p>
            </div>
          </div>

          <div className="relative overflow-hidden p-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeVisual * 100}%)` }}
            >
              {coreModel.visuals.map((visual) => (
                <figure className="relative w-full shrink-0 overflow-hidden rounded-[18px] bg-[#070c10]" key={visual.src}>
                  <img className="block h-auto w-full" src={visual.src} alt={visual.alt} />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,9,8,0.16),transparent_48%)]" aria-hidden="true" />
                </figure>
              ))}
            </div>

            <button
              aria-label="Previous architecture diagram"
              className="absolute left-6 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#f4e6c8]/22 bg-[#08100b]/84 text-lg font-bold text-[#f4e6c8] transition hover:bg-[#182216]"
              onClick={() => setActiveVisual((current) => (current - 1 + totalVisuals) % totalVisuals)}
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Next architecture diagram"
              className="absolute right-6 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#f4e6c8]/22 bg-[#08100b]/84 text-lg font-bold text-[#f4e6c8] transition hover:bg-[#182216]"
              onClick={() => setActiveVisual((current) => (current + 1) % totalVisuals)}
              type="button"
            >
              ›
            </button>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {coreModel.visuals.map((visual, index) => (
                <button
                  aria-label={`Show ${visual.label}`}
                  className={`h-2.5 rounded-full transition-all ${index === activeVisual ? "w-7 bg-[#f4e6c8]" : "w-2.5 bg-[#f4e6c8]/42 hover:bg-[#f4e6c8]/70"}`}
                  key={visual.label}
                  onClick={() => setActiveVisual(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </article>
      <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
        {coreModel.pillars.map((pillar) => (
          <article
            className="flex h-full flex-col rounded-[22px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95 p-6 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)]"
            key={pillar.title}
          >
            <span className="mb-4 inline-block text-xs font-extrabold uppercase tracking-[0.06em] text-[#d6ad69]">{pillar.subtitle}</span>
            <h3 className="asw-display-serif text-[1.2rem] text-[#f8f3e8]">{pillar.title}</h3>
            <p className="mt-3 flex-1 text-base leading-[1.72] text-[#ebe1c8]/75">{pillar.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {pillar.paths.map((item) => (
                <li className="rounded-lg border border-[#d6ad69]/15 bg-[#d6ad69]/10 px-2.5 py-2 font-mono text-xs text-[#f2d59e]" key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
        {coreModel.rules.map((rule) => (
          <div className="rounded-[18px] border border-[#d6ad69]/16 bg-[#d6ad69]/8 px-4 py-4 text-sm font-semibold leading-6 text-[#efe5c7]/78" key={rule}>
            {rule}
          </div>
        ))}
      </div>
    </section>
  );
}
