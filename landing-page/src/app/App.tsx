import { useEffect, useMemo, useState } from "react";

import { Footer } from "./skillhub/components/Footer";
import { Header } from "./skillhub/components/Header";
import { HomePage } from "./skillhub/components/HomePage";
import { SkillCatalogPage } from "./skillhub/components/SkillCatalogPage";
import { SkillDetailPage } from "./skillhub/components/SkillDetailPage";
import type { SkillWikiPayload } from "./skillhub/types";

type AppRoute =
  | { name: "home" }
  | { name: "skills" }
  | { name: "skill-detail"; slug: string };

function parseRoute(pathname: string): AppRoute {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/") {
    return { name: "home" };
  }

  if (path === "/skills") {
    return { name: "skills" };
  }

  const match = path.match(/^\/skills\/([^/]+)$/);
  if (match) {
    return { name: "skill-detail", slug: decodeURIComponent(match[1]) };
  }

  return { name: "skills" };
}

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [payload, setPayload] = useState<SkillWikiPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/skill-wiki.json")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Skill Wiki payload: ${response.status}`);
        }

        const nextPayload = (await response.json()) as SkillWikiPayload;
        if (!cancelled) {
          setPayload(nextPayload);
        }
      })
      .catch((nextError: unknown) => {
        if (!cancelled) {
          setError(nextError instanceof Error ? nextError.message : "Unknown Skill Wiki load failure.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const route = useMemo(() => parseRoute(pathname), [pathname]);
  const selectedSkill =
    route.name === "skill-detail" && payload
      ? payload.skills.find((skill) => skill.slug === route.slug) ?? null
      : null;

  useEffect(() => {
    if (route.name === "home") {
      document.title = "SkillWorkflow | Skill Wiki Hub";
      return;
    }

    if (route.name === "skills") {
      document.title = "Find Skills | SkillWorkflow";
      return;
    }

    document.title = selectedSkill ? `${selectedSkill.title} | SkillWorkflow` : "Skill detail | SkillWorkflow";
  }, [route, selectedSkill]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef5ff_0%,#f7f9fc_35%,#ffffff_100%)] text-[#1c1c1e]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(circle_at_top_left,rgba(0,122,255,0.18),transparent_38%),radial-gradient(circle_at_90%_10%,rgba(76,194,255,0.18),transparent_22%)]" />
      <Header pathname={pathname} />

      <main className="mx-auto max-w-[1240px] px-4 py-8 md:py-10">
        {!payload && !error ? (
          <div className="rounded-[28px] border border-[rgba(60,60,67,0.08)] bg-white/82 p-8 text-center shadow-[0_20px_60px_rgba(17,24,39,0.06)]">
            <p className="text-lg font-bold text-[#1c1c1e]">Loading Skill Wiki…</p>
            <p className="mt-2 text-sm leading-7 text-[#4a4a4f]">
              Building the platform directly from canonical wiki markdown.
            </p>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-[28px] border border-[rgba(255,59,48,0.16)] bg-[rgba(255,255,255,0.88)] p-8 text-center shadow-[0_20px_60px_rgba(17,24,39,0.06)]">
            <p className="text-lg font-bold text-[#1c1c1e]">Failed to load Skill Wiki data.</p>
            <p className="mt-2 text-sm leading-7 text-[#4a4a4f]">{error}</p>
          </div>
        ) : null}

        {payload && route.name === "home" ? <HomePage payload={payload} /> : null}
        {payload && route.name === "skills" ? <SkillCatalogPage payload={payload} /> : null}
        {payload && route.name === "skill-detail" && selectedSkill ? <SkillDetailPage skill={selectedSkill} /> : null}
        {payload && route.name === "skill-detail" && !selectedSkill ? (
          <div className="rounded-[28px] border border-dashed border-[rgba(60,60,67,0.18)] bg-white/75 p-8 text-center shadow-[0_18px_56px_rgba(17,24,39,0.04)]">
            <p className="text-lg font-bold text-[#1c1c1e]">Skill not found.</p>
            <p className="mt-2 text-sm leading-7 text-[#4a4a4f]">
              The requested slug does not exist in the current Skill Wiki dataset.
            </p>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
