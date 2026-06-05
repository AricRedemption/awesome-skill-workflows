import { repositoryMap } from "../content";

export function KnowledgeBase() {
  return (
    <section id="knowledge-base" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mx-auto mb-6 max-w-[780px] text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {repositoryMap.eyebrow}
        </p>
        <h2 className="asw-display-serif text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.04] text-[#f8f3e8]">{repositoryMap.title}</h2>
        <p className="mt-4 text-[0.98rem] leading-[1.7] text-[#ebe1c8]/66">{repositoryMap.description}</p>
      </div>
      <div className="overflow-hidden rounded-[22px] border border-[#d1bf94]/12 bg-gradient-to-b from-[#1a1f19]/95 to-[#10120f]/95 shadow-[0_0_0_1px_rgba(122,170,119,0.08),0_20px_60px_rgba(0,0,0,0.28)]" role="list">
        {repositoryMap.assets.map((asset) => (
          <div className="flex items-center justify-between gap-6 border-b border-[#d1bf94]/15 px-5.5 py-4.5 last:border-b-0 max-[700px]:flex-col max-[700px]:items-start" role="listitem" key={asset.path}>
            <code className="font-mono font-extrabold text-[#f2d59e]">{asset.path}</code>
            <span className="text-right text-[#ebe1c8]/70 max-[700px]:text-left">{asset.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
