import { orchestrationPage } from "../content";

const toneClassName = {
  amber: "border-[#d6ad69]/24 bg-[#d6ad69]/10 text-[#f2d18d]",
  blue: "border-[#8cb7da]/24 bg-[#8cb7da]/10 text-[#d6e7f7]",
  plum: "border-[#b39ad8]/24 bg-[#b39ad8]/10 text-[#ece1fb]",
  green: "border-[#8eaf79]/24 bg-[#8eaf79]/10 text-[#e0edd8]",
} as const;

export function OrchestrationArchitecture() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 py-8">
      <div className="mx-auto mb-7 max-w-[920px] rounded-[24px] border border-[#d6ad69]/18 bg-[linear-gradient(180deg,rgba(39,30,19,0.42),rgba(18,16,12,0.72))] p-5 text-center shadow-[inset_0_1px_0_rgba(244,230,200,0.05)]">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{orchestrationPage.substrate.label}</div>
        <h2 className="asw-display-serif mt-3 text-[clamp(1.45rem,2.8vw,2.2rem)] leading-[1.04] text-[#f8f3e8]">
          {orchestrationPage.substrate.title}
        </h2>
        <p className="mx-auto mt-3 max-w-[760px] text-[0.97rem] leading-[1.68] text-[#ebe1c8]/72">{orchestrationPage.substrate.body}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {orchestrationPage.substrate.chips.map((chip) => (
            <span
              className="rounded-full border border-[#d6ad69]/16 bg-[#d6ad69]/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#f2d59e]"
              key={chip}
            >
              {chip}
            </span>
          ))}
        </div>
        <a
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#d6ad69]/22 bg-[#d6ad69]/12 px-4 py-2.5 text-sm font-bold text-[#f2d59e] transition hover:border-[#d6ad69]/40 hover:bg-[#d6ad69]/18"
          href={orchestrationPage.substrate.github.href}
          rel="noreferrer"
          target="_blank"
        >
          {orchestrationPage.substrate.github.label}
          <span className="font-mono text-[12px] font-semibold text-[#ebe1c8]/72">{orchestrationPage.substrate.github.repo}</span>
        </a>
      </div>

      <article className="overflow-hidden rounded-[30px] border border-[#d1bf94]/15 bg-[radial-gradient(ellipse_at_top_left,rgba(122,170,119,0.14),transparent_42%),linear-gradient(180deg,rgba(27,34,26,0.96),rgba(10,13,10,0.98))] p-5 shadow-[0_0_0_1px_rgba(122,170,119,0.12),0_32px_100px_rgba(0,0,0,0.36)]">
        <figure className="mb-5 overflow-hidden rounded-[26px] border border-[#d1bf94]/12 bg-[#0b110f] shadow-[inset_0_1px_0_rgba(244,230,200,0.05)]">
          <img
            alt="PI Agent orchestration diagram showing the closed-loop flow from research to writeback"
            className="block w-full"
            src="/architecture/pi-agent-orchestration.png"
          />
        </figure>

        <div className="rounded-[24px] border border-[#d1bf94]/12 bg-[linear-gradient(180deg,rgba(12,18,22,0.92),rgba(10,13,10,0.86))] p-5 shadow-[inset_0_1px_0_rgba(244,230,200,0.05)]">
          <div className="mx-auto max-w-[880px] text-center">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{orchestrationPage.teamView.label}</div>
            <h3 className="asw-display-serif mt-3 text-[clamp(1.9rem,4vw,3.45rem)] leading-[0.98] text-[#f8f3e8]">
              {orchestrationPage.teamView.title}
            </h3>
            <p className="mx-auto mt-4 max-w-[700px] text-[0.98rem] leading-[1.7] text-[#ebe1c8]/68">{orchestrationPage.teamView.body}</p>
          </div>

          <div className="mt-6 grid gap-4 min-[1180px]:grid-cols-[minmax(0,1fr)_190px]">
            <div className="relative rounded-[24px] border border-[#d1bf94]/10 bg-[#0c1012]/72 p-4 max-[1179px]:overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[12%] right-[12%] top-[38%] hidden h-px bg-gradient-to-r from-[#d6ad69]/25 via-[#d6ad69]/78 to-[#8eaf79]/25 min-[960px]:block"
              />
              <div className="grid gap-4 min-[960px]:grid-cols-4">
                {orchestrationPage.roles.map((role, index) => (
                  <div className="relative" key={`team-${role.id}`}>
                    <div className={`min-h-[214px] rounded-[22px] border p-5 shadow-[inset_0_1px_0_rgba(244,230,200,0.06),0_16px_44px_rgba(0,0,0,0.18)] ${toneClassName[role.color]}`}>
                      <div className="font-mono text-[11px] font-black uppercase tracking-[0.1em]">{role.label}</div>
                      <h4 className="asw-display-serif mt-4 text-[1.55rem] leading-tight text-[#f8f3e8]">{role.title}</h4>
                      <p className="mt-4 text-[0.95rem] leading-[1.66] text-[#f2f0e8]/78">{role.body}</p>
                    </div>

                    {index === 0 ? (
                      <div className="absolute -right-4 top-[44%] hidden rounded-full border border-[#d6ad69]/18 bg-[#d6ad69]/10 px-2.5 py-1 text-[11px] font-bold text-[#f2d59e] min-[960px]:block">
                        plan
                      </div>
                    ) : null}
                    {index === 1 ? (
                      <div className="absolute -right-9 top-[44%] hidden rounded-full border border-[#8cb7da]/18 bg-[#8cb7da]/10 px-2.5 py-1 text-[11px] font-bold text-[#d6e7f7] min-[960px]:block">
                        candidate
                      </div>
                    ) : null}
                    {index === 2 ? (
                      <div className="absolute -right-7 top-[44%] hidden rounded-full border border-[#b39ad8]/18 bg-[#b39ad8]/10 px-2.5 py-1 text-[11px] font-bold text-[#ece1fb] min-[960px]:block">
                        review gate
                      </div>
                    ) : null}
                    {index === 3 ? (
                      <div className="absolute -right-6 top-[44%] hidden rounded-full border border-[#8eaf79]/18 bg-[#8eaf79]/10 px-2.5 py-1 text-[11px] font-bold text-[#e0edd8] min-[960px]:block">
                        proof check
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="relative mt-4 hidden min-[960px]:block">
                <div className="mx-auto h-12 w-[44%] rounded-b-[28px] border-b border-x border-dashed border-[#b39ad8]/42" />
                <div className="absolute left-[28%] top-0 rounded-full border border-[#b39ad8]/18 bg-[#b39ad8]/10 px-3 py-1 text-[11px] font-bold text-[#ece1fb]">
                  rework
                </div>
              </div>

              <div className="mt-4 grid gap-3 min-[820px]:grid-cols-4">
                <div className="rounded-[18px] border border-[#d6ad69]/12 bg-[#111511]/82 p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Hard review gate</div>
                  <p className="mt-2 text-sm leading-[1.58] text-[#ebe1c8]/70">Required before forward handoff.</p>
                </div>
                <div className="rounded-[18px] border border-[#8cb7da]/12 bg-[#111511]/82 p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#8cb7da]">Verifier required</div>
                  <p className="mt-2 text-sm leading-[1.58] text-[#ebe1c8]/70">Outcome and proof are checked separately.</p>
                </div>
                <div className="rounded-[18px] border border-[#b39ad8]/12 bg-[#111511]/82 p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#b39ad8]">Bounded rework</div>
                  <p className="mt-2 text-sm leading-[1.58] text-[#ebe1c8]/70">Rework is allowed, but the topology stays fixed.</p>
                </div>
                <div className="rounded-[18px] border border-[#8eaf79]/12 bg-[#111511]/82 p-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#8eaf79]">Writeback last</div>
                  <p className="mt-2 text-sm leading-[1.58] text-[#ebe1c8]/70">Durable writeback starts only from a passed terminal state.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#d6ad69]/14 bg-[linear-gradient(180deg,rgba(39,30,19,0.58),rgba(18,16,12,0.86))] p-5">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Terminal state</div>
              <h4 className="asw-display-serif mt-4 text-[1.7rem] leading-tight text-[#fff1cf]">Writeback / promote</h4>
              <p className="mt-4 text-[0.96rem] leading-[1.68] text-[#efe5c7]/76">
                The run does not create durable knowledge in the middle of execution. Writeback begins only after verification and a passed terminal state.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 min-[960px]:grid-cols-4">
          {orchestrationPage.roles.map((role, index) => (
            <div className="relative" key={role.id}>
              <div className={`min-h-[220px] rounded-[24px] border p-5 ${toneClassName[role.color]}`}>
                <div className="font-mono text-[11px] font-black uppercase tracking-[0.1em]">{role.label}</div>
                <h3 className="asw-display-serif mt-4 text-[1.45rem] leading-tight text-[#f8f3e8]">{role.title}</h3>
                <p className="mt-4 text-[0.96rem] leading-[1.65] text-[#f2f0e8]/78">{role.body}</p>
                <div className="mt-5 rounded-full border border-current/20 bg-[#0b0f0b]/24 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em]">
                  {role.path}
                </div>
              </div>
              {index < orchestrationPage.roles.length - 1 ? (
                <div className="pointer-events-none absolute left-[calc(100%-8px)] top-1/2 hidden h-px w-4 bg-[#d6ad69]/42 min-[960px]:block" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 min-[980px]:grid-cols-[0.58fr_0.42fr]">
          <div className="rounded-[24px] border border-[#d1bf94]/12 bg-[#0e130f]/74 p-5">
            <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Flow view</div>
            <div className="grid gap-3">
              {orchestrationPage.flow.map((step, index) => (
                <div className="grid gap-3 rounded-[18px] border border-[#d1bf94]/10 bg-[#111511]/82 p-4 min-[720px]:grid-cols-[72px_minmax(0,1fr)]" key={step.title}>
                  <div className="font-mono text-[1.4rem] font-black tracking-[-0.05em] text-[#d6ad69]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="asw-display-serif text-[1.15rem] leading-tight text-[#f8f3e8]">{step.title}</h4>
                    <p className="mt-2 text-sm leading-[1.62] text-[#ebe1c8]/70">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-[#d1bf94]/12 bg-[#0e130f]/74 p-5">
              <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Node types</div>
              <div className="grid grid-cols-2 gap-3">
                {orchestrationPage.nodes.map((node) => (
                  <div className="rounded-[18px] border border-[#d1bf94]/10 bg-[#111511]/82 p-4" key={node.title}>
                    <div className="font-mono text-[12px] font-black uppercase tracking-[0.08em] text-[#d6ad69]">{node.title}</div>
                    <p className="mt-2 text-sm leading-[1.58] text-[#ebe1c8]/68">{node.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#d1bf94]/12 bg-[#0e130f]/74 p-5">
              <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Hard rules</div>
              <ul className="grid gap-2">
                {orchestrationPage.rules.map((rule) => (
                  <li className="flex gap-2 text-sm leading-[1.6] text-[#ebe1c8]/74" key={rule}>
                    <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8eaf79]" aria-hidden="true" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {orchestrationPage.links.map((link) => (
                  <a
                    className="rounded-lg border border-[#d6ad69]/15 bg-[#d6ad69]/10 px-3 py-2 text-sm font-bold text-[#f2d59e] transition hover:border-[#d6ad69]/36 hover:bg-[#d6ad69]/16"
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
