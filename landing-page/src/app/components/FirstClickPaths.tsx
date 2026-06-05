import { firstClickPaths } from "../content";

export function FirstClickPaths() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 py-8">
      <div className="mx-auto mb-6 max-w-[840px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {firstClickPaths.eyebrow}
        </p>
        <h2 className="asw-display-serif text-[clamp(1.75rem,3.4vw,2.8rem)] leading-[1.04] text-[#f8f3e8]">
          {firstClickPaths.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[660px] text-[0.98rem] leading-[1.7] text-[#ebe1c8]/68">{firstClickPaths.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {firstClickPaths.paths.map((path, index) => (
          <a
            className="group flex h-full flex-col rounded-[24px] border border-[#d1bf94]/14 bg-[linear-gradient(180deg,rgba(24,30,25,0.96),rgba(12,15,12,0.98))] p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.08),0_22px_70px_rgba(0,0,0,0.28)] transition hover:border-[#d6ad69]/30 hover:bg-[linear-gradient(180deg,rgba(29,36,30,0.98),rgba(14,17,13,1))]"
            href={path.href}
            key={path.title}
            rel={"external" in path && path.external ? "noreferrer" : undefined}
            target={"external" in path && path.external ? "_blank" : undefined}
          >
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.1em] text-[#d6ad69]">
              0{index + 1}
            </div>
            <h3 className="asw-display-serif mt-4 min-h-[2.625rem] text-[1.25rem] leading-snug text-[#f8f3e8]">{path.title}</h3>
            <p className="mt-4 min-h-[4.75rem] flex-1 text-[0.94rem] leading-[1.66] text-[#ebe1c8]/72">{path.body}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#f2d18d] transition group-hover:text-[#f7e1af]">
              <span>{path.cta}</span>
              <span aria-hidden="true">›</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
