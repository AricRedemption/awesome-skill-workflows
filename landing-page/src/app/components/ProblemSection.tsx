import { problem } from "../content";

export function ProblemSection() {
  return (
    <section id="problem" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mb-6 grid gap-6 min-[980px]:grid-cols-[0.82fr_1fr] min-[980px]:items-end">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {problem.eyebrow}
          </p>
          <h2 className="asw-display-serif max-w-[700px] text-[clamp(2rem,3.8vw,3.3rem)] leading-[1.02] text-[#f8f3e8]">{problem.title}</h2>
        </div>
        <p className="max-w-[720px] text-base leading-[1.78] text-[#ebe1c8]/75">{problem.description}</p>
      </div>

      <div className="grid gap-3.5 min-[900px]:grid-cols-[1.05fr_0.95fr_0.95fr]">
        {problem.cards.map((card, index) => (
          <article
            className={`min-h-[230px] rounded-[22px] border p-6 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_28px_90px_rgba(0,0,0,0.42)] ${
              index === 0
                ? "border-[#d6ad69]/18 bg-[linear-gradient(180deg,rgba(34,39,29,0.98),rgba(15,18,14,0.98))]"
                : "border-[#d1bf94]/15 bg-gradient-to-b from-[#1e241d]/95 to-[#10120f]/95"
            }`}
            key={card.title}
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">0{index + 1}</span>
            <h3 className="asw-display-serif mt-4 max-w-[290px] text-[1.42rem] leading-tight text-[#f8f3e8]">{card.title}</h3>
            <p className="mt-5 max-w-[32ch] text-base leading-[1.72] text-[#ebe1c8]/75">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
