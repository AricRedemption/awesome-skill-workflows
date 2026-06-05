import { problem } from "../content";

export function ProblemSection() {
  return (
    <section id="problem" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mx-auto mb-6 max-w-[780px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {problem.eyebrow}
        </p>
        <h2 className="asw-display-serif text-[clamp(1.9rem,3.7vw,3.25rem)] leading-[1.02] text-[#f8f3e8]">{problem.title}</h2>
        <p className="mt-4 text-base leading-[1.72] text-[#ebe1c8]/75">{problem.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
        {problem.cards.map((card) => (
          <article
            className="min-h-[220px] rounded-[22px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95 p-6 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)]"
            key={card.title}
          >
            <h3 className="asw-display-serif max-w-[260px] text-[1.38rem] leading-tight text-[#f8f3e8]">{card.title}</h3>
            <p className="mt-5 text-base leading-[1.72] text-[#ebe1c8]/75">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
