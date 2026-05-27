import { lifecycle } from "../content";

export function WorkflowLoop() {
  return (
    <section id="lifecycle" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mx-auto mb-6 max-w-[760px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {lifecycle.eyebrow}
        </p>
        <h2 className="text-[clamp(1.65rem,3.2vw,2.75rem)] font-bold leading-[1.08] text-[#f8f3e8]">{lifecycle.title}</h2>
        <p className="mt-4 text-base leading-[1.72] text-[#ebe1c8]/75">{lifecycle.description}</p>
      </div>
      <figure className="mx-auto mb-4 w-[min(980px,100%)] overflow-hidden rounded-[22px] border border-[#d1bf94]/16 bg-[#0b1018] p-3 shadow-[0_0_0_1px_rgba(122,170,119,0.10),0_24px_80px_rgba(0,0,0,0.28)]">
        <img className="block h-auto w-full rounded-[16px]" src={lifecycle.visual.src} alt={lifecycle.visual.alt} />
      </figure>
    </section>
  );
}
