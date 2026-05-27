import { ArchitectureSection } from "./components/ArchitectureSection";
import { EcosystemMarquee } from "./components/EcosystemMarquee";
import { EvidenceGates } from "./components/EvidenceGates";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { ProblemSection } from "./components/ProblemSection";
import { ScenarioBoundary } from "./components/ScenarioBoundary";
import { UseCasesSection } from "./components/UseCasesSection";
import { ValidatedProofSection } from "./components/ValidatedProofSection";
import { WorkflowLoop } from "./components/WorkflowLoop";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_72%_44%_at_50%_0%,rgba(78,121,91,0.28),transparent_68%),radial-gradient(ellipse_42%_32%_at_80%_14%,rgba(178,115,57,0.16),transparent_70%),linear-gradient(180deg,#10120f_0%,#131912_46%,#171512_100%)] text-[#f2f0e8] antialiased before:pointer-events-none before:fixed before:inset-0 before:bg-[linear-gradient(rgba(183,167,129,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(183,167,129,0.08)_1px,transparent_1px)] before:bg-[size:44px_44px] before:opacity-35 before:[mask-image:linear-gradient(to_bottom,#fff_0%,transparent_76%)]">
      <Header />
      <main>
        <Hero />
        <ValidatedProofSection />
        <ProblemSection />
        <ArchitectureSection />
        <WorkflowLoop />
        <EvidenceGates />
        <KnowledgeBase />
        <EcosystemMarquee />
        <UseCasesSection />
        <ScenarioBoundary />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
