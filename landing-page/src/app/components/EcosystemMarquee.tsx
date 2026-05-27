import { ecosystem } from "../content";

function LogoItem({ item, rank }: { item: (typeof ecosystem.logos)[number]; rank: number }) {
  const isLockup = item.kind === "lockup";
  const isHermes = item.id === "hermes-agent";
  const isUnranked = item.metric === "N/A";

  return (
    <div
      className={`flex min-h-[128px] flex-col items-center justify-center rounded-[16px] border px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(244,230,200,0.07)] ${
        isHermes
          ? "border-[#51431f]/70 bg-[#0a0a0a]"
          : "border-[#d1bf94]/14 bg-[#f4e6c8]/6"
      }`}
    >
      <span className="mb-2 text-[10px] font-mono text-[#ebe1c8]/44">{isUnranked ? "unranked" : `#${rank}`}</span>
      <img
        className={`object-contain opacity-90 ${
          isLockup ? (isHermes ? "h-9 max-w-[11rem]" : "h-8 max-w-[8.5rem]") : "h-10 w-10 rounded-[10px]"
        }`}
        src={item.logo}
        alt={item.label}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
      />
      <span className="mt-3 text-[12px] font-semibold text-[#ebe1c8]/80">{item.label}</span>
      <div className="mt-3 rounded-full border border-[#d1bf94]/14 bg-[#0e120e]/58 px-3 py-1.5">
        <span className="text-[12px] font-bold text-[#f7f1df]">{item.metric}</span>
        <span className="ml-2 text-[10px] uppercase tracking-[0.06em] text-[#d6ad69]">{item.metricLabel}</span>
      </div>
    </div>
  );
}

export function EcosystemMarquee() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 py-6" aria-labelledby="ecosystem-title">
      <div className="overflow-hidden rounded-[22px] border border-[#d1bf94]/15 bg-[radial-gradient(ellipse_70%_80%_at_10%_0%,rgba(122,170,119,0.16),transparent_70%),rgba(17,19,15,0.72)] px-6 py-6 shadow-[0_0_0_1px_rgba(122,170,119,0.1),0_24px_74px_rgba(0,0,0,0.34)]">
        <div className="mx-auto mb-6 max-w-[760px] text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
            {ecosystem.eyebrow}
          </p>
          <h2 id="ecosystem-title" className="text-[clamp(1.45rem,2.6vw,2.2rem)] font-bold leading-[1.08] text-[#f8f3e8]">
            {ecosystem.title}
          </h2>
          <p className="mt-3 text-[0.95rem] leading-[1.7] text-[#ebe1c8]/72">{ecosystem.description}</p>
        </div>
        <div className="mx-auto grid max-w-[980px] grid-cols-3 gap-3 max-[920px]:grid-cols-2 max-[520px]:grid-cols-1">
          {ecosystem.logos.map((item, index) => (
            <LogoItem key={item.id} item={item} rank={index + 1} />
          ))}
        </div>
        <div className="mx-auto mt-5 grid max-w-[980px] gap-3">
          {ecosystem.lanes.map((lane) => (
            <div
              className="rounded-[16px] border border-[#d1bf94]/12 bg-[#0f120e]/58 p-4"
              key={lane.title}
            >
              <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">{lane.title}</div>
              <div className="flex flex-wrap gap-2.5">
                {lane.items.map((item) => (
                  <span
                    className="rounded-full border border-[#8eaf79]/16 bg-[#8eaf79]/8 px-3 py-1.5 text-[12px] font-semibold text-[#e7edd7]"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-5 max-w-[860px] rounded-[16px] border border-[#d1bf94]/12 bg-[#0f120e]/58 px-4 py-3 text-center text-sm leading-6 text-[#ebe1c8]/68">
          This framework does not replace your agent runtime. It gives those tools a shared evidence model, promotion gates, and a path to reusable workflow assets.
        </div>
      </div>
    </section>
  );
}
