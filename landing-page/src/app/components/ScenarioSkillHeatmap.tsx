import { useState } from "react";
import { scenarioHeatmap } from "../content";

type HeatStatus = (typeof scenarioHeatmap.scenarios)[number]["rows"][number]["cells"][number];

const statusClassName: Record<HeatStatus, string> = {
  verified: "border-[#9cc08b]/42 bg-[#9cc08b]/24 text-[#f4f7ea] shadow-[inset_0_1px_0_rgba(244,247,234,0.08)]",
  partial: "border-[#d6ad69]/34 bg-[#d6ad69]/18 text-[#f2ebd6]",
  emerging: "border-[#7f8c67]/28 bg-[#7f8c67]/13 text-[#dde2cf]",
  none: "border-[#d1bf94]/10 bg-[#0c100c]/72 text-[#ebe1c8]/38",
};

const statusDotClassName: Record<HeatStatus, string> = {
  verified: "bg-[#9cc08b]",
  partial: "bg-[#d6ad69]",
  emerging: "bg-[#7f8c67]",
  none: "bg-[#3c4037]",
};

export function ScenarioSkillHeatmap() {
  const [activeKey, setActiveKey] = useState(scenarioHeatmap.scenarios[0].key);
  const active = scenarioHeatmap.scenarios.find((scenario) => scenario.key === activeKey) ?? scenarioHeatmap.scenarios[0];

  return (
    <section id="skill-heatmap" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mb-7 border-b border-[#d1bf94]/12 pb-7">
        <h2 className="asw-display-serif max-w-[760px] text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.02] text-[#f8f3e8]">
          {scenarioHeatmap.title}
        </h2>
        <p className="mt-3 max-w-[560px] text-[0.98rem] leading-[1.7] text-[#ebe1c8]/66">{scenarioHeatmap.description}</p>
      </div>

      <article className="overflow-hidden rounded-[28px] border border-[#d1bf94]/15 bg-[linear-gradient(180deg,rgba(27,34,26,0.98),rgba(12,15,12,0.98))] shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_30px_90px_rgba(0,0,0,0.34)]">
        <div className="grid grid-cols-[300px_1fr] max-[980px]:grid-cols-1">
          <aside className="border-r border-[#d1bf94]/12 bg-[#0e120e]/68 p-4 max-[980px]:border-r-0 max-[980px]:border-b">
            <div className="grid gap-2 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
              {scenarioHeatmap.scenarios.map((scenario) => {
                const selected = scenario.key === active.key;
                return (
                  <button
                    className={`rounded-[16px] border px-4 py-3 text-left transition ${
                      selected
                        ? "border-[#d6ad69]/42 bg-[#d6ad69]/14 shadow-[0_0_28px_rgba(214,173,105,0.12)]"
                        : "border-[#d1bf94]/12 bg-[#111511]/82 hover:border-[#d6ad69]/26 hover:bg-[#d6ad69]/7"
                    }`}
                    key={scenario.key}
                    onClick={() => setActiveKey(scenario.key)}
                    type="button"
                  >
                    <span className={`mb-2 block h-1.5 w-10 rounded-full ${selected ? "bg-[#d6ad69]" : "bg-[#3f4738]"}`} />
                    <span className="block text-sm font-bold leading-tight text-[#f8f3e8]">{scenario.tag}</span>
                    <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#ebe1c8]/48">
                      {scenario.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="p-5 max-[700px]:p-4">
            <div className="mb-5 grid grid-cols-[1fr_0.76fr] gap-4 max-[900px]:grid-cols-1">
              <div className="rounded-[22px] border border-[#d1bf94]/12 bg-[#111511]/82 p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#9cc08b]/22 bg-[#9cc08b]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#b9d5a9]">
                    {active.tag}
                  </span>
                  <span className="rounded-full border border-[#d6ad69]/20 bg-[#d6ad69]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#f2d18d]">
                    {active.status}
                  </span>
                </div>
                <h3 className="asw-display-serif text-[clamp(1.55rem,2.8vw,2.25rem)] leading-[1.03] text-[#f8f3e8]">{active.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-[1.7] text-[#ebe1c8]/68">{active.description}</p>
                <div className="mt-5 rounded-[18px] border border-[#d1bf94]/10 bg-[#0d110d]/78 p-4">
                  <p className="mt-2 text-sm font-semibold leading-[1.6] text-[#f4f0df]/86">{active.boundary}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[22px] border border-[#d1bf94]/12 bg-[#111511]/82 p-5">
                  <ul className="mt-3 space-y-2 text-sm leading-[1.62] text-[#ebe1c8]/72">
                    {active.evidence.map((item) => (
                      <li className="flex gap-2" key={item}>
                        <span className="mt-[0.36rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#9cc08b]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[22px] border border-[#d1bf94]/12 bg-[#111511]/82 p-5">
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.assets.map((asset) => (
                      <span className="rounded-lg border border-[#d6ad69]/15 bg-[#d6ad69]/10 px-2.5 py-2 font-mono text-xs text-[#f2d59e]" key={asset}>
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {scenarioHeatmap.legend.map((item) => (
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${statusClassName[item.status]}`} key={item.status}>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[20px] border border-[#d1bf94]/12">
              <div className="grid grid-cols-[1.18fr_repeat(4,minmax(0,1fr))] border-b border-[#d1bf94]/10 bg-[#121712]/86 max-[780px]:hidden">
                <div className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Skill / capability</div>
                {scenarioHeatmap.columns.map((column) => (
                  <div className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]" key={column}>
                    {column}
                  </div>
                ))}
              </div>

              <div className="divide-y divide-[#d1bf94]/10">
                {active.rows.map((row) => (
                  <div className="grid grid-cols-[1.18fr_repeat(4,minmax(0,1fr))] bg-[#0f130f]/82 max-[780px]:grid-cols-1" key={row.skill}>
                    <div className="px-4 py-4">
                      <h4 className="text-[0.95rem] font-bold leading-tight text-[#f8f3e8]">{row.skill}</h4>
                    </div>
                    {row.cells.map((status, index) => (
                      <div className="px-4 py-4 max-[780px]:pt-0" key={`${row.skill}-${scenarioHeatmap.columns[index]}`}>
                        <div className="mb-2 hidden text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69] max-[780px]:block">
                          {scenarioHeatmap.columns[index]}
                        </div>
                        <div className={`flex min-h-11 items-center gap-2 rounded-[15px] border px-3 py-2 ${statusClassName[status]}`}>
                          <span className={`h-2 w-2 shrink-0 rounded-full ${statusDotClassName[status]}`} aria-hidden="true" />
                          <span className="text-xs font-bold uppercase tracking-[0.04em]">{status === "none" ? "not claimed" : status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
