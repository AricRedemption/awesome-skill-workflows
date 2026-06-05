import { finalCta } from "../content";

export function FinalCta() {
  return (
    <section className="mx-auto my-12 w-full max-w-[1240px] px-4 text-center">
      <div className="rounded-[22px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95 p-9 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)] max-[700px]:p-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Next step</p>
        <h2 className="asw-display-serif text-[clamp(1.9rem,3.7vw,3.25rem)] leading-[1.02] text-[#f8f3e8]">{finalCta.title}</h2>
        <p className="mx-auto mt-4 max-w-[720px] text-base leading-[1.72] text-[#ebe1c8]/75">{finalCta.body}</p>
        <div className="mt-7 grid grid-cols-2 gap-3 text-left max-[900px]:grid-cols-1">
          {finalCta.actions.map((action) => (
            <a
              className="flex flex-col rounded-[16px] border border-[#d1bf94]/18 bg-[#f4e6c8]/6 px-4 py-4 shadow-[inset_0_1px_0_rgba(244,230,200,0.05)] transition hover:border-[#d6ad69]/30 hover:bg-[#d6ad69]/8"
              href={action.href}
              key={action.href}
              rel={action.external ? "noreferrer" : undefined}
              target={action.external ? "_blank" : undefined}
            >
              <div className="text-base font-bold text-[#f2f0e8]">{action.label}</div>
              <div className="mt-2 text-sm leading-6 text-[#ebe1c8]/68">{action.detail}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}