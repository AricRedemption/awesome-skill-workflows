import { useCases } from "../content";

export function UseCasesSection() {
  return (
    <section id="use-cases" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mb-6 grid grid-cols-[0.72fr_1fr] gap-6 max-[900px]:grid-cols-1">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
            {useCases.eyebrow}
          </p>
          <h2 className="text-[clamp(1.65rem,3.2vw,2.75rem)] font-bold leading-[1.08] text-[#f8f3e8]">{useCases.title}</h2>
        </div>
        <p className="self-end text-base leading-[1.72] text-[#ebe1c8]/75">{useCases.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3.5 max-[700px]:grid-cols-1">
        {useCases.items.map((item, index) => (
          <article
            className="relative min-h-[220px] overflow-hidden rounded-[22px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95 p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)]"
            key={item.title}
          >
            <span className="font-mono text-[11px] font-bold text-[#d6ad69]">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-[1.08rem] font-bold leading-tight text-[#f8f3e8]">{item.title}</h3>
            <p className="mt-4 text-[0.95rem] leading-[1.65] text-[#ebe1c8]/72">{item.fit}</p>
            <div className="mt-5 rounded-[14px] border border-[#8eaf79]/18 bg-[#8eaf79]/8 p-3.5">
              <strong className="mb-1 block text-xs uppercase tracking-[0.06em] text-[#b9d5a9]">What gets captured</strong>
              <p className="text-sm leading-[1.62] text-[#ebe1c8]/70">{item.proof}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
