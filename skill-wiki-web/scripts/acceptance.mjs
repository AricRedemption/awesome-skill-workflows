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
const port = Number(process.env.PORT || 4100 + Math.floor(Math.random() * 2000));
const baseUrl = `http://127.0.0.1:${port}`;
const systemChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const featuredWorkflowSlug = "top-scenario-development-engineering-delivery";

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
    let settled = false;
    const child = spawn(process.execPath, ["skill-wiki-web/scripts/serve.mjs"], {
      cwd: repoRoot,
      env: { ...process.env, PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"],
    });

    const timeout = setTimeout(() => {
      settled = true;
      child.kill("SIGTERM");
      reject(new Error("Timed out waiting for local server to start."));
    }, 10000);

    const onData = (chunk) => {
      const text = chunk.toString();
      if (text.includes(`http://127.0.0.1:${port}`)) {
        settled = true;
        clearTimeout(timeout);
        resolve(child);
      }
    };

    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) => {
      if (settled) {
        return;
      }
      settled = true;
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

async function getMetaContent(page, selector) {
  return page.$eval(selector, (node) => node.getAttribute("content") ?? "");
}

async function getBodyText(page) {
  return page.evaluate(() => document.body.innerText);
}

async function getCatalogTitles(page) {
  return page.$$eval(".skill-card h3", (nodes) => nodes.map((node) => node.textContent?.trim() ?? ""));
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

  assert((await page.title()) === "Runwiser | AI capabilities organized into reusable workflows", "Unexpected home page title.");
  assert(
    (await getMetaContent(page, 'meta[name="description"]')).includes("workflow"),
    "Home page description should emphasize workflow-first discovery.",
  );
  assert(
    (await page.$eval('link[rel="canonical"]', (node) => node.getAttribute("href") ?? "")) ===
      "https://runwiser-wiki.vercel.app/",
    "Home page canonical URL is incorrect.",
  );

  const homeText = await getBodyText(page);
  assert(homeText.includes("Browse workflows"), "Home page should expose a direct workflow catalog CTA.");
  assert(
    homeText.includes("What do you need to get done?") && homeText.includes("Search by the task in front of you"),
    "Home page should explain the user task entry point.",
  );
  assert(
    homeText.includes("workflow bundles") || homeText.includes("workflow entries"),
    "Home page stats should show workflow-level stats.",
  );
  assert(homeText.includes("Open featured workflow"), "Home page should expose a featured workflow entry.");

  const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(homeOverflow, "Home page has horizontal overflow.");
  record("home-page", "pass", "Workflow-first hero, quick entry, and desktop layout verified.");

  await page.goto(`${baseUrl}/#/workflows`, { waitUntil: "networkidle0" });
  await screenshot(page, "workflows-desktop");

  const workflowsText = await getBodyText(page);
  assert(workflowsText.includes("Find the right workflow first"), "Catalog intro should frame discovery around workflows.");
  assert(workflowsText.includes("0 workflow results") || /\d+ workflow results/.test(workflowsText), "Catalog count text missing.");
  assert(!workflowsText.includes("skills available"), "Catalog still contains stale skill-first copy.");

  const initialTitles = await getCatalogTitles(page);
  assert(initialTitles.length > 0, "Catalog did not render any workflow cards.");
  assert(
    initialTitles.every((title) => title.startsWith("Top Scenario:") || title.startsWith("Hot Scenario:")),
    "Catalog should default to workflow bundle entries only.",
  );
  record("catalog-default-scope", "pass", "Catalog defaults to workflow bundle cards.");

  await replaceInputValue(page, "#searchInput", "engineering");
  await page.waitForFunction(() => {
    const grid = document.querySelector("#catalogGrid");
    return !!grid && grid.innerText.toLowerCase().includes("engineering");
  });
  const engineeringTitles = await getCatalogTitles(page);
  assert(engineeringTitles.some((title) => title.includes("Engineering")), "Search did not surface engineering workflow results.");
  record("catalog-search", "pass", "Search query narrows results to matching workflows.");

  await replaceInputValue(page, "#searchInput", "");
  await page.waitForFunction(() => {
    const search = document.querySelector("#searchInput");
    const count = document.querySelector("#catalogCount");
    return !!search && !!count && search.value === "" && /\d+ workflow results/.test(count.textContent ?? "");
  });

  await page.click('[data-category="office"]');
  await page.waitForFunction(() => {
    const count = document.querySelector("#catalogCount");
    const grid = document.querySelector("#catalogGrid");
    return !!count && !!grid && count.textContent !== "0 workflow results" && grid.innerText.toLowerCase().includes("office");
  });
  const officeTitles = await getCatalogTitles(page);
  assert(officeTitles.length > 0, "Office category returned no workflows.");
  assert(officeTitles.every((title) => title.includes("Office") || title.includes("Business") || title.includes("Product")), "Office category surfaced unrelated workflows.");
  record("catalog-category-filter", "pass", "Category filter keeps discovery at workflow granularity.");

  await page.select("#riskSelect", "low");
  await page.waitForFunction(() => {
    const filter = document.querySelector("#catalogActiveFilter");
    return !!filter && filter.textContent?.toLowerCase().includes("risk: low");
  });
  const activeFilterText = await page.$eval("#catalogActiveFilter", (node) => node.textContent ?? "");
  assert(activeFilterText.toLowerCase().includes("risk: low"), "Risk filter should be reflected in the active filter summary.");
  record("catalog-risk-filter", "pass", "Risk filter still works on workflow cards.");

  await page.click("#clearFilters");
  await page.waitForFunction(() => {
    const search = document.querySelector("#searchInput");
    const count = document.querySelector("#catalogCount");
    return !!search && !!count && search.value === "" && /\d+ workflow results/.test(count.textContent ?? "");
  });
  record("catalog-clear-filters", "pass", "Clear filters resets workflow discovery state.");

  await page.goto(`${baseUrl}/#/workflows/${featuredWorkflowSlug}`, { waitUntil: "networkidle0" });
  await screenshot(page, "detail-desktop");

  assert(
    (await page.title()) === "Top Scenario: Development And Engineering Delivery | Runwiser",
    "Detail page title was not updated.",
  );
  assert(
    (await page.$eval('link[rel="canonical"]', (node) => node.getAttribute("href") ?? "")) ===
      `https://runwiser-wiki.vercel.app/#/workflows/${featuredWorkflowSlug}`,
    "Detail page canonical URL is incorrect.",
  );

  const detailText = await getBodyText(page);
  assert(detailText.includes("Back to workflows"), "Detail page should keep the workflow-level back action.");
  assert(detailText.includes("References"), "Detail page should still expose repository-truth references.");
  assert(detailText.includes("Related skills"), "Detail page should treat skills as subordinate context.");
  const detailOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(detailOverflow, "Detail page has horizontal overflow.");
  record("detail-page", "pass", "Workflow detail route renders product entry plus underlying reference structure.");

  await page.goto(`${baseUrl}/#/workflows/does-not-exist`, { waitUntil: "networkidle0" });
  const missingText = await getBodyText(page);
  assert(missingText.includes("Workflow not found"), "Missing workflow route did not show fallback.");
  record("missing-route", "pass", "Missing workflow route shows the fallback state.");

  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto(`${baseUrl}/#/workflows`, { waitUntil: "networkidle0" });
  await screenshot(page, "workflows-mobile");
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(mobileOverflow, "Mobile workflows page has horizontal overflow.");
  record("mobile-layout", "pass", "Mobile workflow catalog renders without horizontal overflow.");
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
  "- `reports/skill-wiki-web-qa/workflows-desktop.png`",
  "- `reports/skill-wiki-web-qa/detail-desktop.png`",
  "- `reports/skill-wiki-web-qa/workflows-mobile.png`",
  "",
].join("\n");

fs.writeFileSync(reportPath, `${reportBody}\n`);
console.log(`Acceptance report written to ${reportPath}`);
