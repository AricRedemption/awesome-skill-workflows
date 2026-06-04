import { brand, links } from "../content";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-5 border-t border-[#d1bf94]/15 px-4 py-8 pb-11 text-[#ebe1c8]/60 max-[700px]:flex-col max-[700px]:items-start">
      <span>{brand.name}: reusable, measurable, evidence-backed agent workflows.</span>
      <nav className="flex flex-wrap items-center gap-4 font-bold" aria-label="Footer links">
        <a href={links.directoryMap} rel="noreferrer" target="_blank">Directory map</a>
        <a href={links.workflowKb} rel="noreferrer" target="_blank">Workflow KB</a>
        <a href={links.agentRules} rel="noreferrer" target="_blank">Agent rules</a>
      </nav>
    </footer>
  );
}
