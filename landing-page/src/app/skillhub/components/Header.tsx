import { navigateTo } from "../utils";

export function Header({ pathname }: { pathname: string }) {
  const links = [
    { href: "/", label: "首页" },
    { href: "/skills", label: "Find Skills" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(60,60,67,0.08)] bg-[rgba(255,255,255,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3">
        <button
          className="flex items-center gap-3 rounded-full border border-[rgba(60,60,67,0.08)] bg-white/90 px-3.5 py-2 text-left shadow-[0_10px_30px_rgba(17,24,39,0.06)]"
          onClick={() => navigateTo("/")}
          type="button"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#007aff,#4cc2ff)] text-sm font-black tracking-[0.06em] text-white">
            SW
          </span>
          <span>
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#007aff]">
              SkillWorkflow
            </span>
            <span className="block text-[0.96rem] font-semibold text-[#1c1c1e]">Wiki + Workflow API</span>
          </span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#1c1c1e] text-white shadow-[0_10px_24px_rgba(28,28,30,0.18)]"
                    : "text-[#3a3a3c] hover:bg-white hover:text-[#007aff]"
                }`}
                key={link.href}
                onClick={() => navigateTo(link.href)}
                type="button"
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-full bg-[#007aff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(0,122,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#006fe0]"
          onClick={() => navigateTo("/skills")}
          type="button"
        >
          打开技能库
        </button>
      </div>
    </header>
  );
}
