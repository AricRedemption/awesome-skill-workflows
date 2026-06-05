import { brand, footer } from "../content";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-[#d1bf94]/15 px-4 py-8 pb-11 text-sm text-[#ebe1c8]/60">
      <a className="flex items-center gap-2.5 transition hover:text-[#f7f1df]" href="/" aria-label={`${brand.name} home`}>
        <img
          alt=""
          aria-hidden="true"
          className="h-8 w-8 rounded-[8px] border border-[#d1bf94]/15 bg-[#05080d] object-cover shadow-[0_0_18px_rgba(34,211,238,0.12)]"
          height="32"
          src={brand.logo}
          width="32"
        />
        <span className="min-w-0 leading-tight">
          <span className="block font-bold text-[#f7f1df]">{brand.name}</span>
          <span className="block text-[11px] font-semibold text-[#ebe1c8]/48">{brand.repositoryName}</span>
        </span>
      </a>

      <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 font-bold text-[#ebe1c8]/70" aria-label="Footer links">
        {footer.links.map((link) => (
          <a
            href={link.href}
            key={link.href}
            rel={link.external ? "noreferrer" : undefined}
            target={link.external ? "_blank" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
