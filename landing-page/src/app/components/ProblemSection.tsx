import { problem } from "../content";

export function ProblemSection() {
  return (
    <section id="problem" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mx-auto mb-7 max-w-[760px] text-center">
        <h2 className="asw-display-serif text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.04] text-[#f8f3e8]">{problem.title}</h2>
        <p className="mt-3 text-[0.98rem] leading-[1.7] text-[#ebe1c8]/68">{problem.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
        {problem.cards.map((card) => (
          <article
            className="min-h-[200px] rounded-[22px] border border-[#d1bf94]/12 bg-gradient-to-b from-[#171b16]/95 to-[#10120f]/95 p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.1),0_20px_60px_rgba(0,0,0,0.28)]"
            key={card.title}
          >
            <h3 className="asw-display-serif max-w-[240px] text-[1.22rem] leading-tight text-[#f8f3e8]">{card.title}</h3>
            <p className="mt-4 text-[0.98rem] leading-[1.68] text-[#ebe1c8]/68">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
