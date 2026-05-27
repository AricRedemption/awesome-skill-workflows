import { links, navItems } from "../content";

export function Header() {
  return (
    <header className="sticky top-3 z-10 mx-auto mt-3 grid w-full max-w-[1240px] grid-cols-[auto_1fr_auto] items-center gap-6 rounded-[14px] border border-[#d1bf94]/20 bg-[#10120f]/80 px-3.5 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-[18px] max-[1272px]:w-[calc(100%-32px)] max-[700px]:grid-cols-[1fr_auto]">
      <a className="flex items-center gap-2.5 font-bold text-[#f7f1df]" href="#top" aria-label="awesome-skill-workflows home">
        <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-gradient-to-br from-[#f5dfad] to-[#7baa77] text-[11px] font-black tracking-[0.04em] text-[#11130f] shadow-[0_0_26px_rgba(174,132,68,0.28)]" aria-hidden="true">
          ASW
        </span>
        <span className="max-[700px]:hidden">awesome-skill-workflows</span>
      </a>
      <nav className="flex justify-center gap-5 text-[13px] text-[#efe5c7]/65 max-[980px]:hidden" aria-label="Main navigation">
        {navItems.map((item) => (
          <a className="transition hover:text-[#f7f1df]" key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="rounded-[9px] bg-[#f4e6c8] px-4 py-2.5 text-sm font-bold text-[#11130f]" href={links.repository}>
        GitHub
      </a>
    </header>
  );
}
