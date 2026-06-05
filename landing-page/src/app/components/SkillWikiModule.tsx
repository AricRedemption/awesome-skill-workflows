const WIKI_EMBED_SRC = "/wiki-app/index.html?embed=1#/workflows";

export function SkillWikiModule() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-10" aria-label="Skill wiki">
      <div className="overflow-hidden rounded-[24px] border border-[#d1bf94]/15 bg-[#0e130f]/74 shadow-[0_0_0_1px_rgba(122,170,119,0.1),0_24px_80px_rgba(0,0,0,0.32)]">
        <iframe
          className="block min-h-[calc(100vh-240px)] w-full border-0 bg-[#0c0c0c]"
          src={WIKI_EMBED_SRC}
          title="Runwiser Wiki"
        />
      </div>
    </section>
  );
}
