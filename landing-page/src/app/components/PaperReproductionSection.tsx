import { paperReproduction } from "../content";

export function PaperReproductionSection() {
  return (
    <section id="skillopt" className="mx-auto w-full max-w-[1240px] px-4 py-12">
      <div className="mb-6 grid grid-cols-[0.9fr_1fr] gap-6 max-[980px]:grid-cols-1">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
            {paperReproduction.eyebrow}
          </p>
          <h2 className="asw-display-serif max-w-[780px] text-[clamp(2rem,3.8vw,3.35rem)] leading-[1] text-[#f8f3e8]">
            {paperReproduction.title}
          </h2>
        </div>
        <p className="self-end text-base leading-[1.72] text-[#ebe1c8]/75">{paperReproduction.description}</p>
      </div>

      <article className="overflow-hidden rounded-[30px] border border-[#d1bf94]/18 bg-[linear-gradient(180deg,rgba(25,30,29,0.98),rgba(10,13,13,0.98))] shadow-[0_0_0_1px_rgba(122,170,119,0.14),0_36px_120px_rgba(0,0,0,0.42)]">
        <div className="grid grid-cols-[0.58fr_0.42fr] gap-0 max-[980px]:grid-cols-1">
          <figure className="relative overflow-hidden border-r border-[#d1bf94]/12 bg-[#070c10] p-3 max-[980px]:border-r-0 max-[980px]:border-b">
            <img
              alt={paperReproduction.image.alt}
              className="block aspect-[16/9] w-full rounded-[22px] object-cover"
              src={paperReproduction.image.src}
            />
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1 text-xs font-bold text-[#efe5c7]/58">
              <span>Generated with GPT Image 2</span>
              <span className="rounded-full border border-[#d6ad69]/18 bg-[#d6ad69]/10 px-3 py-1 text-[#f2d18d]">
                {paperReproduction.claim}
              </span>
            </figcaption>
          </figure>

          <div className="p-6 max-[700px]:p-4">
            <div className="grid gap-3">
              {paperReproduction.steps.map((step, index) => (
                <div className="rounded-[20px] border border-[#d1bf94]/12 bg-[#111511]/82 p-4" key={step.title}>
                  <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
                    0{index + 1}
                  </div>
                  <h3 className="asw-display-serif mt-2 text-[1.25rem] leading-tight text-[#f8f3e8]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-[1.68] text-[#ebe1c8]/72">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[20px] border border-[#d1bf94]/12 bg-[#0d110d]/78 p-4">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">Artifacts</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {paperReproduction.artifacts.map((artifact) => (
                  <a
                    className="rounded-lg border border-[#d6ad69]/15 bg-[#d6ad69]/10 px-3 py-2 text-sm font-bold text-[#f2d59e] transition hover:border-[#d6ad69]/36 hover:bg-[#d6ad69]/16"
                    href={artifact.href}
                    key={artifact.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {artifact.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
