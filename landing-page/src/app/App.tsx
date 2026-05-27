import { ArchitectureSection } from "./components/ArchitectureSection";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { ScenarioSkillHeatmap } from "./components/ScenarioSkillHeatmap";
import { ValidatedProofSection } from "./components/ValidatedProofSection";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_72%_44%_at_50%_0%,rgba(78,121,91,0.28),transparent_68%),radial-gradient(ellipse_42%_32%_at_80%_14%,rgba(178,115,57,0.16),transparent_70%),linear-gradient(180deg,#10120f_0%,#131912_46%,#171512_100%)] text-[#f2f0e8] antialiased before:pointer-events-none before:fixed before:inset-0 before:bg-[linear-gradient(rgba(183,167,129,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(183,167,129,0.08)_1px,transparent_1px)] before:bg-[size:44px_44px] before:opacity-35 before:[mask-image:linear-gradient(to_bottom,#fff_0%,transparent_76%)]">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <ValidatedProofSection />
        <ScenarioSkillHeatmap />
        <ArchitectureSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
