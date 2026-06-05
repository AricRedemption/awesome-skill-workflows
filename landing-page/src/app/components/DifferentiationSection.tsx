import { differentiation } from "../content";

export function DifferentiationSection() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mx-auto mb-6 max-w-[820px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {differentiation.eyebrow}
        </p>
        <h2 className="asw-display-serif text-[clamp(1.8rem,3.5vw,2.95rem)] leading-[1.04] text-[#f8f3e8]">
          {differentiation.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[680px] text-[0.98rem] leading-[1.7] text-[#ebe1c8]/68">{differentiation.description}</p>
      </div>

      <div className="grid gap-4 min-[960px]:grid-cols-2">
        {differentiation.items.map((item) => (
          <article
            className="rounded-[24px] border border-[#d1bf94]/14 bg-[linear-gradient(180deg,rgba(24,30,25,0.97),rgba(11,14,11,0.98))] p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.08),0_24px_76px_rgba(0,0,0,0.3)]"
            key={item.title}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="asw-display-serif text-[1.35rem] leading-tight text-[#f8f3e8]">{item.title}</h3>
              <span className="rounded-full border border-[#d6ad69]/16 bg-[#d6ad69]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#f2d18d]">
                {item.label}
              </span>
            </div>
            <p className="mt-4 text-[0.96rem] leading-[1.68] text-[#ebe1c8]/72">{item.body}</p>
            <div className="mt-5 rounded-[18px] border border-[#8eaf79]/18 bg-[#8eaf79]/8 p-4">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#b9d5a9]">Where Runwiser differs</div>
              <p className="mt-2 text-sm leading-[1.62] text-[#ebe1c8]/74">{item.contrast}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
