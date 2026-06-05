import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(webRoot, "..");
const reportDir = path.join(repoRoot, "reports", "skill-wiki-web-qa");
const port = 4179;
const baseUrl = `http://127.0.0.1:${port}`;
const systemChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

fs.mkdirSync(reportDir, { recursive: true });

function runNodeScript(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(new Error(`Command failed (${args.join(" ")}):\n${stdout}\n${stderr}`));
    });
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["skill-wiki-web/scripts/serve.mjs"], {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error("Timed out waiting for local server to start."));
    }, 10000);

    const onData = (chunk) => {
      const text = chunk.toString();
      if (text.includes(`http://127.0.0.1:${port}`)) {
        clearTimeout(timeout);
        resolve(child);
      }
    };

    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Server exited before ready with code ${code ?? "unknown"}.`));
    });
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function collectCatalogCards(page) {
  return page.$$eval("#catalogGrid .card", (nodes) =>
    nodes.map((node) => ({
      text: node.innerText,
      tags: [...node.querySelectorAll(".tag")].map((tag) => tag.textContent?.trim().toLowerCase() ?? ""),
      riskBadges: [...node.querySelectorAll(".badge")].map((badge) => badge.textContent?.trim().toLowerCase() ?? ""),
    })),
  );
}

async function replaceInputValue(page, selector, value) {
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.press("Backspace");
  if (value.length > 0) {
    await page.type(selector, value);
  }
}

async function screenshot(page, name) {
  const target = path.join(reportDir, `${name}.png`);
  await page.screenshot({ path: target, fullPage: true });
  return target;
}

async function textIncludes(page, expected) {
  const text = await page.evaluate(() => document.body.innerText);
  return text.includes(expected);
}

async function getMetaContent(page, selector) {
  return page.$eval(selector, (node) => node.getAttribute("content") ?? "");
}

const results = [];
function record(name, status, details) {
  results.push({ name, status, details });
}

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: fs.existsSync(systemChromePath) ? systemChromePath : undefined,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
let server;

try {
  const generate = await runNodeScript(["skill-wiki-web/scripts/generate-skill-wiki-data.mjs"]);
  record("generate-data", "pass", generate.stdout.trim());

  const verify = await runNodeScript(["skill-wiki-web/scripts/verify.mjs"]);
  record("verify-data", "pass", verify.stdout.trim());

  server = await startServer();
  record("start-server", "pass", `Listening on ${baseUrl}`);

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });

  await page.goto(`${baseUrl}/#/`, { waitUntil: "networkidle0" });
  await screenshot(page, "home-desktop");
  assert(
    (await page.title()) === "Runwiser Wiki | AI Agent Skills and Workflow Library",
    "Unexpected home page title.",
  );
  assert(
    (await getMetaContent(page, 'meta[name="description"]')).includes("English-first skill wiki"),
    "Home page description meta was not updated.",
  );
  assert(
    (await page.$eval('link[rel="canonical"]', (node) => node.getAttribute("href") ?? "")) ===
      "https://runwiser-wiki.vercel.app/",
    "Home page canonical URL is incorrect.",
  );
  assert(
    await page.$('link[rel="icon"][sizes="16x16"][type="image/png"]'),
    "16x16 PNG favicon link is missing.",
  );
  assert(
    await page.$('link[rel="icon"][sizes="32x32"][type="image/png"]'),
    "32x32 PNG favicon link is missing.",
  );
  assert(await textIncludes(page, "Open the wiki and find reusable skills faster."), "Home hero copy missing.");
  assert(await textIncludes(page, "skills"), "Home stats count missing.");
  assert(await textIncludes(page, "evidence references"), "Home evidence summary missing.");
  const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(homeOverflow, "Home page has horizontal overflow.");
  record("home-page", "pass", "Hero, title, stats, and desktop layout verified.");

  await page.goto(`${baseUrl}/#/skills`, { waitUntil: "networkidle0" });
  await screenshot(page, "skills-desktop");
  assert(await textIncludes(page, "Search the Skill Wiki like a product."), "Skills page intro missing.");
  const hiddenTagCountBefore = await page.$$eval(".tag-hidden", (nodes) =>
    nodes.filter((node) => getComputedStyle(node).display === "none").length,
  );
  assert(hiddenTagCountBefore > 0, "Expected some tags to be collapsed by default.");
  await page.click("#tagToggle");
  await page.waitForFunction(() => {
    const tags = [...document.querySelectorAll(".tag-hidden")];
    return tags.some((node) => getComputedStyle(node).display !== "none");
  });
  const hiddenTagCountAfter = await page.$$eval(".tag-hidden", (nodes) =>
    nodes.filter((node) => getComputedStyle(node).display === "none").length,
  );
  assert(hiddenTagCountAfter < hiddenTagCountBefore, "Tag toggle did not reveal additional tags.");
  record("catalog-tag-toggle", "pass", "Tag wall is collapsed by default and expands on demand.");
  const initialCountText = await page.$eval("#catalogCount", (node) => node.textContent ?? "");
  assert(/\d+ skills? available/.test(initialCountText), "Catalog count did not render.");
  await replaceInputValue(page, "#searchInput", "selection-gated");
  await page.waitForFunction(() => {
    const grid = document.querySelector("#catalogGrid");
    return !!grid && grid.innerText.toLowerCase().includes("selection-gated");
  });
  const filteredText = await page.$eval("#catalogGrid", (node) => node.innerText);
  assert(filteredText.toLowerCase().includes("selection-gated"), "Search did not return the expected skill.");
  record("catalog-search", "pass", "Search query returns the expected wiki-backed skill.");

  await replaceInputValue(page, "#searchInput", "___no_match___");
  await page.waitForFunction(() => {
    const empty = document.querySelector("#catalogEmpty");
    return !!empty && !empty.hasAttribute("hidden");
  });
  const emptyVisible = await page.$eval("#catalogEmpty", (node) => !node.hasAttribute("hidden"));
  assert(emptyVisible, "Empty state did not appear for impossible query.");
  record("catalog-empty-state", "pass", "Empty state appears for an impossible query.");

  await replaceInputValue(page, "#searchInput", "");
  await page.select("#riskSelect", "high");
  await page.waitForFunction(() => {
    const grid = document.querySelector("#catalogGrid");
    return !!grid && grid.innerText.toLowerCase().includes("risk: high");
  });
  const highRiskCards = await collectCatalogCards(page);
  assert(highRiskCards.length > 0, "Risk filter returned no cards.");
  assert(
    highRiskCards.every((card) => card.riskBadges.some((badge) => badge.includes("risk: high"))),
    "Risk filter left non-high cards visible.",
  );
  record("catalog-risk-filter", "pass", "High-risk filter narrows results correctly.");

  await page.select("#riskSelect", "all");
  const xhsButton = await page.$('[data-tag="xhs"]');
  assert(xhsButton, "Expected xhs tag filter not found.");
  await xhsButton.click();
  await page.waitForFunction(() => {
    const grid = document.querySelector("#catalogGrid");
    return !!grid && grid.innerText.toLowerCase().includes("xhs");
  });
  const xhsCards = await collectCatalogCards(page);
  assert(xhsCards.length > 0, "Tag filter returned no cards.");
  assert(xhsCards.every((card) => card.tags.includes("xhs")), "Tag filter left non-xhs cards visible.");
  record("catalog-tag-filter", "pass", "Tag filter is present and updates the catalog.");

  await page.goto(`${baseUrl}/#/skills/xhs-kb-reuse-selection-gated-safety`, { waitUntil: "networkidle0" });
  await screenshot(page, "detail-desktop");
  assert(
    (await page.title()) === "XHS KB Reuse With Selection-Gated Safety Rules | Runwiser Wiki",
    "Detail page title was not updated.",
  );
  assert(
    (await page.$eval('link[rel="canonical"]', (node) => node.getAttribute("href") ?? "")) ===
      "https://runwiser-wiki.vercel.app/#/skills/xhs-kb-reuse-selection-gated-safety",
    "Detail page canonical URL is incorrect.",
  );
  assert(
    await textIncludes(page, "XHS KB Reuse With Selection-Gated Safety Rules"),
    "Detail page heading missing.",
  );
  assert(await textIncludes(page, "Execution path from the wiki page"), "Detail steps section missing.");
  assert(await textIncludes(page, "Evidence refs"), "Detail evidence section missing.");
  const detailOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(detailOverflow, "Detail page has horizontal overflow.");
  record("detail-page", "pass", "Skill detail route renders canonical wiki sections.");

  await page.goto(`${baseUrl}/#/skills/does-not-exist`, { waitUntil: "networkidle0" });
  assert(await textIncludes(page, "Skill not found."), "Missing-skill route did not show fallback.");
  record("missing-route", "pass", "Missing skill route shows the fallback state.");

  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto(`${baseUrl}/#/skills`, { waitUntil: "networkidle0" });
  await screenshot(page, "skills-mobile");
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(mobileOverflow, "Mobile skills page has horizontal overflow.");
  record("mobile-layout", "pass", "Mobile layout renders without horizontal overflow.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  record("acceptance-failure", "fail", message);
  throw error;
} finally {
  if (server) {
    server.kill("SIGTERM");
  }
  await browser.close();
}

const timestamp = new Date().toISOString();
const reportPath = path.join(reportDir, "acceptance-report.md");
const reportBody = [
  "# Skill Wiki Web Acceptance Report",
  "",
  `- Generated at: ${timestamp}`,
  `- Base URL: ${baseUrl}`,
  "",
  "## Checks",
  "",
  ...results.map((result) => `- ${result.status.toUpperCase()}: ${result.name} — ${result.details}`),
  "",
  "## Screenshots",
  "",
  "- `reports/skill-wiki-web-qa/home-desktop.png`",
  "- `reports/skill-wiki-web-qa/skills-desktop.png`",
  "- `reports/skill-wiki-web-qa/detail-desktop.png`",
  "- `reports/skill-wiki-web-qa/skills-mobile.png`",
  "",
].join("\n");

fs.writeFileSync(reportPath, `${reportBody}\n`);
console.log(`Acceptance report written to ${reportPath}`);
