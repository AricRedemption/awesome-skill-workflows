export function Footer() {
  return (
    <footer className="border-t border-[rgba(60,60,67,0.08)] bg-white/70">
      <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-[0.76rem] font-bold uppercase tracking-[0.16em] text-[#007aff]">SkillWorkflow</p>
          <h2 className="mt-3 text-[1.55rem] font-black tracking-[-0.04em] text-[#1c1c1e]">
            Skill Wiki is the discovery surface. Workflow API is the execution surface.
          </h2>
          <p className="mt-3 max-w-[48ch] text-sm leading-7 text-[#4a4a4f]">
            What you browse here is derived directly from <code>skills/wiki/*.md</code>, while the repository now
            also exposes a thin PaaS-ready workflow API for evidence-backed readiness checks. No separate marketing
            truth layer is introduced.
          </p>
        </div>

        <div className="rounded-[28px] border border-[rgba(60,60,67,0.08)] bg-[rgba(255,255,255,0.82)] p-5 shadow-[0_16px_48px_rgba(17,24,39,0.06)]">
          <p className="text-sm font-semibold text-[#1c1c1e]">Source of truth</p>
          <ul className="mt-4 space-y-3 text-sm text-[#4a4a4f]">
            <li>Only reads canonical wiki markdown entries.</li>
            <li>Search, tags, and detail pages all derive from generated local wiki data.</li>
            <li>Workflow execution status stays tied to repo validators and run evidence.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
