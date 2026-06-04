import { ecosystem } from "../content";

function LogoItem({ item }: { item: (typeof ecosystem.logos)[number] }) {
  return (
    <div className="mx-6 flex h-[58px] w-[82px] shrink-0 items-center justify-center opacity-72 transition hover:opacity-100">
      <img
        className="block h-10 w-10 rounded-[10px] object-cover opacity-90 grayscale saturate-0 brightness-[1.35] contrast-110"
        src={item.logo}
        alt={item.label}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export function EcosystemMarquee() {
  const logoSet = [...ecosystem.logos, ...ecosystem.logos];
  const items = [...logoSet, ...logoSet];

  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 py-4" aria-label="Agent ecosystem logos">
      <div className="relative overflow-hidden py-3">
        <div className="asw-agent-marquee-track flex w-max items-center">
          {items.map((item, index) => (
            <LogoItem key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
