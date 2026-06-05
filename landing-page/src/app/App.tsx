import { useEffect, useState, type MouseEvent } from "react";
import { ArchitectureSection } from "./components/ArchitectureSection";
import { DifferentiationSection } from "./components/DifferentiationSection";
import { FinalCta } from "./components/FinalCta";
import { FirstClickPaths } from "./components/FirstClickPaths";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { OrchestrationArchitecture } from "./components/OrchestrationArchitecture";
import { PaperReproductionSection } from "./components/PaperReproductionSection";
import { PaasReadinessExplainer, ProofStackMap, SelfEvolutionCaseStudy } from "./components/PublicMessagingExplainers";
import { ProblemSection } from "./components/ProblemSection";
import { ScenarioSkillHeatmap } from "./components/ScenarioSkillHeatmap";
import { UseCasesSection } from "./components/UseCasesSection";
import { ValidatedProofSection } from "./components/ValidatedProofSection";
import { brand, orchestrationPage, sitePages } from "./content";

type RoutePath = "/" | "/proof" | "/cases" | "/evolution" | "/orchestration";

const validRoutes = new Set<RoutePath>(["/", "/proof", "/cases", "/evolution", "/orchestration"]);

const pageMeta: Record<RoutePath, { eyebrow: string; title: string; description: string }> = {
  "/proof": {
    eyebrow: "Why it works",
    title: "Prove clearer, trust stronger.",
    description: "Evidence, gates, and promotion stay in separate lanes.",
  },
  "/cases": {
    eyebrow: "Where it applies",
    title: "Prove deeper, scale cleaner.",
    description: "One deep scenario proof plus a broader structured case surface.",
  },
  "/evolution": {
    eyebrow: "How it gets better",
    title: "Learn tighter, drift lighter.",
    description: "Evidence-backed writeback—no silent prompt drift.",
  },
  "/orchestration": {
    eyebrow: orchestrationPage.eyebrow,
    title: orchestrationPage.title,
    description: orchestrationPage.description,
  },
};

function normalizeRoute(pathname: string): RoutePath {
  if (validRoutes.has(pathname as RoutePath)) {
    return pathname as RoutePath;
  }

  return "/";
}

function navigate(path: RoutePath) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function PageHero({ route }: { route: Exclude<RoutePath, "/"> }) {
  const meta = pageMeta[route];

  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-4 pt-10">
      <div className="mx-auto max-w-[820px] border-b border-[#d1bf94]/12 pb-8 text-center max-[700px]:pb-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6ad69]/30 bg-[#ae8444]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#d6ad69]">
          {meta.eyebrow}
        </p>
        <h1 className="asw-display-serif text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.02] text-[#f8f3e8]">
          {meta.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[620px] text-[0.98rem] leading-[1.7] text-[#ebe1c8]/68">{meta.description}</p>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ArchitectureSection />
      <ValidatedProofSection variant="compact" />
      <ProofStackMap variant="compact" />
      <DifferentiationSection />
      <FirstClickPaths />
      <FinalCta />
    </>
  );
}

function ProofPage() {
  return (
    <>
      <PageHero route="/proof" />
      <ValidatedProofSection />
      <ProofStackMap />
      <PaasReadinessExplainer />
    </>
  );
}

function CasesPage() {
  return (
    <>
      <PageHero route="/cases" />
      <UseCasesSection />
      <ScenarioSkillHeatmap />
    </>
  );
}

function EvolutionPage() {
  return (
    <>
      <PageHero route="/evolution" />
      <SelfEvolutionCaseStudy />
      <PaperReproductionSection />
    </>
  );
}

function OrchestrationPage() {
  return (
    <>
      <PageHero route="/orchestration" />
      <OrchestrationArchitecture />
    </>
  );
}

export default function App() {
  const [route, setRoute] = useState<RoutePath>(() => normalizeRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = normalizeRoute(window.location.pathname);
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    handlePopState();

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const currentPage = sitePages.find((page) => page.href === route);
    document.title = currentPage ? `${currentPage.label} | ${brand.name}` : `${brand.name}`;
  }, [route]);

  function onClickCapture(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const anchor = target.closest("a");
    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) {
      return;
    }

    const url = new URL(anchor.href, window.location.origin);
    const path = normalizeRoute(url.pathname);

    if (!validRoutes.has(path)) {
      return;
    }

    event.preventDefault();
    if (path !== route) {
      navigate(path);
    }
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_58%_34%_at_50%_0%,rgba(111,91,60,0.22),transparent_70%),radial-gradient(ellipse_36%_28%_at_82%_12%,rgba(97,122,79,0.14),transparent_72%),linear-gradient(180deg,#0b0c0b_0%,#11120f_48%,#14120f_100%)] text-[#f2f0e8] antialiased before:pointer-events-none before:fixed before:inset-0 before:bg-[linear-gradient(rgba(183,167,129,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(183,167,129,0.055)_1px,transparent_1px)] before:bg-[size:44px_44px] before:opacity-30 before:[mask-image:linear-gradient(to_bottom,#fff_0%,transparent_76%)]"
      onClickCapture={onClickCapture}
    >
      <Header currentPath={route} />
      <main>
        {route === "/" && <HomePage />}
        {route === "/proof" && <ProofPage />}
        {route === "/cases" && <CasesPage />}
        {route === "/evolution" && <EvolutionPage />}
        {route === "/orchestration" && <OrchestrationPage />}
      </main>
      <Footer />
    </div>
  );
}
