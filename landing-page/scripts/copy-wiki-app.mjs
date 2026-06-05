import { cpSync, existsSync, rmSync } from "fs";
import { resolve } from "path";

const repoRoot = resolve(import.meta.dirname, "../..");
const wikiRoot = resolve(repoRoot, "skill-wiki-web");
const dest = resolve(import.meta.dirname, "../public/wiki-app");

const skip = new Set(["scripts", "package.json", "package-lock.json", "dev-server.mjs", "README.md"]);

if (!existsSync(wikiRoot)) {
  throw new Error(`skill-wiki-web not found at ${wikiRoot}`);
}

rmSync(dest, { recursive: true, force: true });

cpSync(wikiRoot, dest, {
  recursive: true,
  filter: (source) => {
    const relative = source.slice(wikiRoot.length + 1);
    if (!relative) {
      return true;
    }
    const topLevel = relative.split("/")[0];
    return !skip.has(topLevel);
  },
});

console.log(`Copied skill-wiki-web → landing-page/public/wiki-app`);
