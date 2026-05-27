import { scenario } from "../content";

export function ScenarioBoundary() {
  return (
    <section className="mx-auto mt-6 grid w-full max-w-[1240px] grid-cols-[0.72fr_1fr] gap-7 rounded-[22px] border border-[#d1bf94]/15 bg-[radial-gradient(ellipse_55%_70%_at_10%_0%,rgba(122,170,119,0.18),transparent_72%),rgba(25,31,23,0.85)] p-7 max-[980px]:grid-cols-1 max-[700px]:p-6">
      <div>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {scenario.eyebrow}
        </p>
        <h2 className="text-[clamp(1.65rem,3.2vw,2.75rem)] font-bold leading-[1.08] text-[#f8f3e8]">{scenario.title}</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {scenario.examples.map((example) => (
            <span key={example} className="rounded-full border border-[#d6ad69]/16 bg-[#d6ad69]/8 px-3 py-1.5 text-xs font-semibold text-[#f2d59e]">
              {example}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-base leading-[1.72] text-[#ebe1c8]/75">{scenario.body}</p>
        <div className="mt-5 grid gap-3">
          <div className="rounded-[16px] border border-[#7aa677]/18 bg-[#7aa677]/8 p-4">
            <div className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#b9d5a9]">What this validates</div>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#ebe1c8]/74">
              {scenario.validates.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[16px] border border-[#d1bf94]/14 bg-[#0f120e]/72 p-4">
            <div className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">What it does not mean</div>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#ebe1c8]/70">
              {scenario.doesNotClaim.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
