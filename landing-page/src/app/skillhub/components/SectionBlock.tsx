import type { ReactNode } from "react";

export function SectionBlock({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-[rgba(60,60,67,0.08)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_18px_56px_rgba(17,24,39,0.06)] md:p-7">
      <p className="text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#007aff]">{eyebrow}</p>
      <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[1.45rem] font-black tracking-[-0.04em] text-[#1c1c1e] md:text-[1.75rem]">{title}</h2>
          {description ? <p className="mt-2 max-w-[60ch] text-sm leading-7 text-[#4a4a4f]">{description}</p> : null}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
