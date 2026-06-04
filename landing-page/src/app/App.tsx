import { ArchitectureSection } from "./components/ArchitectureSection";
import { EcosystemMarquee } from "./components/EcosystemMarquee";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PaperReproductionSection } from "./components/PaperReproductionSection";
import { ProblemSection } from "./components/ProblemSection";
import { ScenarioSkillHeatmap } from "./components/ScenarioSkillHeatmap";
import { ValidatedProofSection } from "./components/ValidatedProofSection";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_58%_34%_at_50%_0%,rgba(111,91,60,0.22),transparent_70%),radial-gradient(ellipse_36%_28%_at_82%_12%,rgba(97,122,79,0.14),transparent_72%),linear-gradient(180deg,#0b0c0b_0%,#11120f_48%,#14120f_100%)] text-[#f2f0e8] antialiased before:pointer-events-none before:fixed before:inset-0 before:bg-[linear-gradient(rgba(183,167,129,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(183,167,129,0.055)_1px,transparent_1px)] before:bg-[size:44px_44px] before:opacity-30 before:[mask-image:linear-gradient(to_bottom,#fff_0%,transparent_76%)]">
      <Header />
      <main>
        <Hero />
        <EcosystemMarquee />
        <ProblemSection />
        <ValidatedProofSection />
        <PaperReproductionSection />
        <ArchitectureSection />
        <ScenarioSkillHeatmap />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
