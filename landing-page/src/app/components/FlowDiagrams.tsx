import type { ReactNode } from "react";

import { coreModel, gates, lifecycle } from "../content";

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[18px] border border-[#d1bf94]/18 bg-[#151913]/92 shadow-[inset_0_1px_0_rgba(244,230,200,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ArchitectureDiagram() {
  const registrySteps = [
    { title: "Local Skills", icon: "●" },
    { title: "External Skills", icon: "◉" },
    { title: "Tool Capabilities", icon: "✦" },
    { title: "Candidate Capabilities", icon: "◎" },
  ];
  const orchestrationSteps = [
    "Select",
    "Plan",
    "Run",
    "Score",
    "Human Review",
    "Scenario Check",
  ];
  const evolutionSteps = ["Run Evidence", "Failure Analysis", "Verified Recipe", "KB Writeback", "Self-Improve"];

  return (
    <div className="mx-auto mb-4 w-[min(980px,100%)] rounded-[26px] border border-[#d5e3fb] bg-[radial-gradient(ellipse_at_top,rgba(106,163,255,0.22),transparent_58%),linear-gradient(180deg,#fbfdff_0%,#eef5ff_62%,#e9f0ff_100%)] p-4 text-[#1c2d4a] shadow-[0_0_0_1px_rgba(183,205,240,0.72),0_24px_80px_rgba(0,0,0,0.16)]">
      <div className="mb-5 text-center">
        <h3 className="text-[clamp(1.4rem,2.9vw,2.3rem)] font-black tracking-[-0.04em] text-[#17386f]">
          Skill Workflow: Three-Layer Architecture
        </h3>
        <p className="mt-2 text-[0.98rem] leading-6 text-[#4c6287]">
          Use validation to turn isolated skills into reusable workflow assets.
        </p>
      </div>

      <div className="relative grid gap-3">
        <div className="pointer-events-none absolute right-5 top-5 hidden h-[calc(100%-76px)] w-[126px] xl:block">
          <div className="absolute right-0 top-[54px] h-[2px] w-[82px] bg-[#2565d8]" />
          <div className="absolute right-0 top-[54px] h-[310px] w-[2px] bg-[#2565d8]" />
          <div className="absolute right-0 top-[362px] h-[2px] w-[82px] bg-[#2565d8]" />
          <div className="absolute right-[74px] top-[44px] h-0 w-0 border-y-[10px] border-l-[14px] border-y-transparent border-l-[#2565d8]" />
          <div className="absolute right-[74px] top-[352px] h-0 w-0 border-y-[10px] border-l-[14px] border-y-transparent border-l-[#2565d8]" />
          <div className="absolute right-0 top-[142px] w-[110px] text-right text-[1.1rem] font-bold leading-tight text-[#2565d8]">
            Update
            <br />
            what
            <br />
            actually
            <br />
            ran
          </div>
        </div>

        <div className="relative rounded-[22px] border border-[#c8d8f1] bg-white/78 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-3 max-[900px]:grid-cols-1">
            <div className="flex min-h-[140px] gap-3 rounded-[16px] border border-[#7dacff] bg-[linear-gradient(180deg,#0c67df_0%,#1e77ec_100%)] px-4 py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <div className="flex flex-col items-center justify-between">
                <div className="text-[2rem] font-black leading-none">01</div>
                <div className="grid h-12 w-12 place-items-center rounded-[12px] border border-white/22 text-2xl">◫</div>
              </div>
              <div>
                <p className="text-[1.7rem] font-bold leading-tight">Skill Registry</p>
                <p className="mt-3 text-sm leading-6 text-white/85">Unify capability sources and collect reusable assets.</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
              {registrySteps.map((item) => (
                <div
                  key={item.title}
                  className="flex min-h-[140px] flex-col items-center justify-center rounded-[16px] border border-[#91b6ef] bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)] px-3 py-5 text-center text-[#29416d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  <div className="text-[2.4rem] leading-none text-[#2565d8]">{item.icon}</div>
                  <div className="mt-4 text-[0.95rem] font-semibold">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-[22px] border border-[#c8d8f1] bg-white/78 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
          <div className="pointer-events-none absolute left-1/2 top-[-18px] h-[18px] w-[2px] -translate-x-1/2 bg-[#2565d8]" />
          <div className="pointer-events-none absolute left-1/2 top-[-2px] h-0 w-0 -translate-x-1/2 border-x-[11px] border-t-[14px] border-x-transparent border-t-[#2565d8]" />
          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-3 max-[900px]:grid-cols-1">
            <div className="flex min-h-[140px] gap-3 rounded-[16px] border border-[#7dacff] bg-[linear-gradient(180deg,#0c67df_0%,#1e77ec_100%)] px-4 py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <div className="flex flex-col items-center justify-between">
                <div className="text-[2rem] font-black leading-none">02</div>
                <div className="grid h-12 w-12 place-items-center rounded-[12px] border border-white/22 text-2xl">⌘</div>
              </div>
              <div>
                <p className="text-[1.55rem] font-bold leading-tight">Workflow Orchestration</p>
                <p className="mt-3 text-sm leading-6 text-white/85">Plan and execute, combining capabilities into verifiable workflows.</p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 max-[980px]:grid-cols-3 max-[520px]:grid-cols-2">
              {orchestrationSteps.map((item, index) => (
                <div
                  key={item}
                  className={`relative flex min-h-[140px] flex-col items-center justify-center rounded-[16px] border px-3 py-4 text-center ${
                    item === "Human Review"
                      ? "border-[#f1bb96] bg-[#fff6f0] text-[#bb6426]"
                      : "border-[#c8d8f1] bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)] text-[#29416d]"
                  }`}
                >
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#c18a46]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-4 text-[0.95rem] font-semibold leading-tight">{item}</div>
                  {index < orchestrationSteps.length - 1 ? (
                    <div className="pointer-events-none absolute -right-[14px] top-1/2 hidden h-[2px] w-[18px] -translate-y-1/2 bg-[#2565d8] xl:block" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-[22px] border border-[#c8d8f1] bg-white/78 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
          <div className="pointer-events-none absolute left-1/2 top-[-18px] h-[18px] w-[2px] -translate-x-1/2 bg-[#2565d8]" />
          <div className="pointer-events-none absolute left-1/2 top-[-2px] h-0 w-0 -translate-x-1/2 border-x-[11px] border-t-[14px] border-x-transparent border-t-[#2565d8]" />
          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-3 max-[900px]:grid-cols-1">
            <div className="flex min-h-[140px] gap-3 rounded-[16px] border border-[#7dacff] bg-[linear-gradient(180deg,#0c67df_0%,#1e77ec_100%)] px-4 py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <div className="flex flex-col items-center justify-between">
                <div className="text-[2rem] font-black leading-none">03</div>
                <div className="grid h-12 w-12 place-items-center rounded-[12px] border border-white/22 text-2xl">↻</div>
              </div>
              <div>
                <p className="text-[1.55rem] font-bold leading-tight">Validation & Evolution</p>
                <p className="mt-3 text-sm leading-6 text-white/85">Verify results, keep improving, and form a reusable loop.</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 max-[980px]:grid-cols-3 max-[520px]:grid-cols-2">
              {evolutionSteps.map((item) => (
                <div
                  key={item}
                  className="flex min-h-[140px] items-center justify-center rounded-[16px] border border-[#c8d8f1] bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)] px-3 py-5 text-center text-[0.95rem] font-semibold text-[#29416d]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 max-[820px]:grid-cols-1">
        {coreModel.pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-[16px] border border-[#c8d8f1] bg-white/72 px-4 py-4">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#c18a46]">{pillar.subtitle}</div>
            <div className="mt-3 text-base font-bold text-[#1f3160]">{pillar.title}</div>
            <div className="mt-2 text-sm leading-6 text-[#5a6f91]">{pillar.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LifecycleDiagram() {
  const positions = [
    "left-[7%] top-[10%]",
    "left-[36%] top-[3%]",
    "right-[7%] top-[10%]",
    "right-[7%] bottom-[10%]",
    "left-[36%] bottom-[3%]",
    "left-[7%] bottom-[10%]",
  ];

  return (
    <div className="rounded-[24px] border border-[#d1bf94]/20 bg-[linear-gradient(180deg,rgba(25,31,23,0.92)_0%,rgba(14,17,13,0.94)_100%)] p-4 shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="relative hidden min-h-[560px] rounded-[20px] border border-[#d1bf94]/10 bg-[#0e110d]/55 lg:block">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d6ad69]/18" />
        <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7aa677]/8" />
        <div className="absolute left-1/2 top-1/2 w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-[#d1bf94]/16 bg-[radial-gradient(ellipse_at_top,rgba(122,170,119,0.14),transparent_62%),#161b15] px-6 py-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Loop closes here</div>
          <div className="mt-3 text-[1.15rem] font-bold leading-tight text-[#f8f3e8]">Reusable workflow asset</div>
          <div className="mt-3 text-sm leading-6 text-[#ebe1c8]/68">
            A workflow becomes durable only after selection, execution, review, verification, and writeback connect into one loop.
          </div>
        </div>
        {lifecycle.steps.map((step, index) => (
          <div key={step.title} className={`absolute w-[250px] ${positions[index]}`}>
            <Panel className={`p-4 ${index === lifecycle.steps.length - 1 ? "border-[#7aa677]/28 bg-[#7aa677]/10" : ""}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl font-extrabold text-[#d6ad69]">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="text-[1rem] font-bold text-[#f8f3e8]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#ebe1c8]/68">{step.body}</p>
                  <code className="mt-3 inline-flex rounded-md border border-[#d6ad69]/14 bg-[#d6ad69]/8 px-2 py-1 font-mono text-[11px] text-[#f2d59e]">
                    {step.path}
                  </code>
                </div>
              </div>
            </Panel>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:hidden max-[820px]:grid-cols-1">
        {lifecycle.steps.map((step, index) => (
          <Panel key={step.title} className={`relative p-4 ${index === lifecycle.steps.length - 1 ? "border-[#7aa677]/28 bg-[#7aa677]/10" : ""}`}>
            <div className="flex items-start gap-3">
              <div className="text-2xl font-extrabold text-[#d6ad69]">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-[1rem] font-bold text-[#f8f3e8]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#ebe1c8]/68">{step.body}</p>
                <code className="mt-3 inline-flex rounded-md border border-[#d6ad69]/14 bg-[#d6ad69]/8 px-2 py-1 font-mono text-[11px] text-[#f2d59e]">
                  {step.path}
                </code>
              </div>
            </div>
          </Panel>
        ))}
        <div className="rounded-[20px] border border-[#d1bf94]/14 bg-[#0f120e]/72 px-5 py-5 text-center max-[820px]:col-span-1">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Loop closes here</div>
          <div className="mt-3 text-[1.1rem] font-bold text-[#f8f3e8]">Reusable workflow asset</div>
        </div>
      </div>
    </div>
  );
}

export function ValidationPipelineDiagram() {
  const lane = ["Unverified skill pool", "Validation pipeline", "Reusable workflow assets"];

  return (
    <div className="mx-auto mb-4 w-[min(980px,100%)] rounded-[24px] border border-[#d1bf94]/20 bg-[linear-gradient(180deg,rgba(26,32,24,0.98)_0%,rgba(17,19,15,0.96)_100%)] p-4 shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_24px_80px_rgba(0,0,0,0.32)]">
      <div className="mb-4 text-center">
        <h3 className="text-[clamp(1.2rem,2.4vw,1.95rem)] font-bold tracking-[-0.03em] text-[#f8f3e8]">
          Stop Hoarding Skills. Validate Workflows First.
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#ebe1c8]/65">Turn experience into reusable, verifiable workflow assets.</p>
      </div>

      <div className="grid grid-cols-[220px_minmax(0,1fr)_220px] items-start gap-3 max-[980px]:grid-cols-1">
        <Panel className="p-4">
          <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{lane[0]}</div>
          <div className="grid gap-2">
            {["Web capture", "Data clean", "SQL query", "Writing aid", "Analytics", "API call"].map((item) => (
              <div key={item} className="rounded-[12px] border border-[#7aa677]/16 bg-[#f4e6c8]/5 px-3 py-2 text-sm font-semibold text-[#f3efe5]">
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="mb-3 text-center text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{lane[1]}</div>
          <div className="grid grid-cols-6 gap-2 max-[760px]:grid-cols-3 max-[520px]:grid-cols-2">
            {["Select", "Compose", "Run", "Score", "Human review", "Verify"].map((item, index) => (
              <div
                key={item}
                className={`rounded-[14px] border px-3 py-4 text-center ${
                  item === "Human review"
                    ? "border-[#d78a4a]/45 bg-[#d78a4a]/10 text-[#ffd7b1]"
                    : "border-[#7aa677]/16 bg-[#f4e6c8]/5 text-[#f3efe5]"
                }`}
              >
                <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm font-semibold">{item}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 max-[700px]:grid-cols-1">
            {["Run evidence", "Improve", "Update capability map"].map((item) => (
              <div key={item} className="rounded-[14px] border border-[#7aa677]/16 bg-[#0f120e]/72 px-3 py-3 text-center text-sm font-semibold text-[#f3efe5]">
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{lane[2]}</div>
          <div className="grid gap-2">
            {["Market research workflow", "Competitor analysis workflow", "Report generation workflow", "Data monitor workflow"].map((item) => (
              <div key={item} className="rounded-[12px] border border-[#7aa677]/16 bg-[#f4e6c8]/5 px-3 py-2 text-sm font-semibold text-[#f3efe5]">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
        {gates.cards.map((card) => (
          <div key={card.title} className="rounded-[16px] border border-[#d1bf94]/15 bg-[#0f120e]/75 px-4 py-4">
            <div className="text-base font-bold text-[#f8f3e8]">{card.title}</div>
            <div className="mt-2 text-sm leading-6 text-[#ebe1c8]/68">{card.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
