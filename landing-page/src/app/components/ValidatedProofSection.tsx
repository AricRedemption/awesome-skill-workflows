import { validatedProof } from "../content";

const heatLevelClassName: Record<number, string> = {
  1: "border-[#7f8c67]/22 bg-[#7f8c67]/12 text-[#dde2cf]",
  2: "border-[#b39f68]/28 bg-[#b39f68]/16 text-[#f2ebd6]",
  3: "border-[#9cc08b]/34 bg-[#9cc08b]/22 text-[#f4f7ea]",
};

export function ValidatedProofSection() {
  return (
    <section id="validated" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mb-6 grid grid-cols-[0.86fr_1fr] gap-6 max-[980px]:grid-cols-1">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
            {validatedProof.eyebrow}
          </p>
          <h2 className="max-w-[760px] text-[clamp(1.75rem,3.2vw,3rem)] font-bold leading-[1.04] text-[#f8f3e8]">
            {validatedProof.title}
          </h2>
        </div>
        <p className="self-end text-base leading-[1.72] text-[#ebe1c8]/75">{validatedProof.description}</p>
      </div>

      <article className="mb-4 overflow-hidden rounded-[30px] border border-[#d1bf94]/18 bg-[linear-gradient(180deg,rgba(27,34,26,0.98),rgba(12,15,12,0.98))] p-6 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_36px_120px_rgba(0,0,0,0.42)]">
        <div className="grid gap-6 min-[960px]:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-[#9ac98d]/20 bg-[#8eaf79]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#b9d5a9]">
                verification board
              </span>
              <a className="text-sm font-bold text-[#f2d18d] transition hover:text-[#f7e1af]" href={validatedProof.spotlight.href}>
                Inspect workflow
              </a>
            </div>

            <h3 className="text-[1.5rem] font-bold leading-tight text-[#f8f3e8]">{validatedProof.spotlight.scenario}</h3>
            <p className="mt-4 max-w-[720px] text-[0.98rem] leading-[1.74] text-[#ebe1c8]/76">{validatedProof.spotlight.problem}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
              {validatedProof.stats.map((item) => (
                <div
                  className="rounded-[20px] border border-[#d1bf94]/12 bg-[linear-gradient(180deg,rgba(21,28,20,0.92),rgba(13,16,13,0.94))] p-4"
                  key={item.label}
                >
                  <div className="text-[1.75rem] font-black tracking-[-0.04em] text-[#f8f3e8]">{item.value}</div>
                  <div className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{item.label}</div>
                  <p className="mt-3 text-sm leading-[1.62] text-[#ebe1c8]/70">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[20px] border border-[#d1bf94]/12 bg-[#111511]/82 p-4">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Outcome boundary</span>
              <p className="mt-3 text-[1rem] font-semibold leading-[1.58] text-[#f8f3e8]">{validatedProof.spotlight.outcome}</p>
            </div>

            <div className="rounded-[20px] border border-[#d1bf94]/12 bg-[#111511]/82 p-4">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Validated skills</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {validatedProof.spotlight.skills.map((skill) => (
                  <span
                    className="rounded-full border border-[#8eaf79]/18 bg-[#8eaf79]/10 px-3 py-1.5 text-[12px] font-semibold text-[#e7edd7]"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[#d1bf94]/12 bg-[#111511]/82 p-4">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Proof assets</span>
              <ul className="mt-3 space-y-2 text-sm leading-[1.65] text-[#ebe1c8]/76">
                {validatedProof.spotlight.evidence.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <span className="mt-[0.32rem] h-1.5 w-1.5 rounded-full bg-[#8eaf79]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 max-[980px]:grid-cols-1">
        <article className="overflow-hidden rounded-[28px] border border-[#d1bf94]/18 bg-[linear-gradient(180deg,rgba(27,33,26,0.98),rgba(11,14,11,0.98))] p-6 shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_32px_100px_rgba(0,0,0,0.42)]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{validatedProof.heatmap.eyebrow}</span>
              <h3 className="mt-2 text-[1.35rem] font-bold leading-tight text-[#f8f3e8]">{validatedProof.heatmap.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {validatedProof.heatmap.legend.map((item) => (
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${heatLevelClassName[item.level]}`}
                  key={item.label}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#d1bf94]/12">
            <div className="grid grid-cols-[1.18fr_repeat(3,minmax(0,1fr))] border-b border-[#d1bf94]/10 bg-[#121712]/86 max-[780px]:hidden">
              <div className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Skill lane</div>
              {validatedProof.heatmap.columns.map((column) => (
                <div className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]" key={column}>
                  {column}
                </div>
              ))}
            </div>

            <div className="divide-y divide-[#d1bf94]/10">
              {validatedProof.heatmap.rows.map((row) => (
                <div className="grid grid-cols-[1.18fr_repeat(3,minmax(0,1fr))] bg-[#0f130f]/82 max-[780px]:grid-cols-1" key={row.skill}>
                  <div className="px-4 py-4">
                    <h4 className="text-[0.98rem] font-bold leading-tight text-[#f8f3e8]">{row.skill}</h4>
                  </div>
                  {row.cells.map((cell, index) => (
                    <div className="px-4 py-4 max-[780px]:pt-0" key={`${row.skill}-${validatedProof.heatmap.columns[index]}`}>
                      <div className="mb-2 hidden text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69] max-[780px]:block">
                        {validatedProof.heatmap.columns[index]}
                      </div>
                      <div className={`rounded-[16px] border p-3 ${heatLevelClassName[cell.level]}`}>
                        <div className="text-sm font-semibold leading-[1.4]">{cell.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="grid gap-4">
          {validatedProof.cards.map((card) => (
            <article
              className="rounded-[24px] border border-[#d1bf94]/15 bg-gradient-to-b from-[#1a2019]/96 to-[#0f120f]/98 p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_24px_80px_rgba(0,0,0,0.36)]"
              key={card.title}
            >
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{card.proofLabel}</span>
              <h3 className="mt-3 text-[1.12rem] font-bold leading-tight text-[#f8f3e8]">{card.title}</h3>
              <p className="mt-2 text-[1rem] font-semibold text-[#b9d5a9]">{card.stat}</p>
              <p className="mt-4 text-[0.94rem] leading-[1.68] text-[#ebe1c8]/73">{card.body}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#d1bf94]/10 pt-4">
                <span className="text-sm text-[#efe5c7]/66">{card.proofValue}</span>
                <a className="text-sm font-bold text-[#f2d18d] transition hover:text-[#f7e1af]" href={card.href}>
                  Open proof
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
