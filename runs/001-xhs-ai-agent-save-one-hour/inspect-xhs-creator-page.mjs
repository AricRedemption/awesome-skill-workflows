import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const cookiesPath = '/Users/aricredemption/.xhs-mcp/cookies.json';
const outputPath = path.join(runDir, 'xhs-creator-page-inspection.json');
const screenshotPath = path.join(runDir, 'xhs-creator-page.png');

const cookies = JSON.parse(await fs.readFile(cookiesPath, 'utf8'));

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: { width: 1440, height: 1000 },
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  const page = await browser.newPage();
  await page.setCookie(...cookies);
  await page.goto('https://creator.xiaohongshu.com/publish/publish', {
    waitUntil: 'domcontentloaded',
    timeout: 90_000,
  });
  await new Promise((resolve) => setTimeout(resolve, 15_000));

  const inspection = await page.evaluate(() => {
    const summarize = (el) => ({
      tag: el.tagName.toLowerCase(),
      text: (el.innerText || el.textContent || '').trim().slice(0, 120),
      placeholder: el.getAttribute('placeholder') || '',
      ariaLabel: el.getAttribute('aria-label') || '',
      role: el.getAttribute('role') || '',
      type: el.getAttribute('type') || '',
      accept: el.getAttribute('accept') || '',
      className: String(el.className || '').slice(0, 160),
      id: el.id || '',
      disabled: Boolean(el.disabled),
    });

    return {
      url: location.href,
      title: document.title,
      bodyTextSample: document.body.innerText.slice(0, 3000),
      buttons: Array.from(document.querySelectorAll('button, [role="button"]')).map(summarize),
      inputs: Array.from(document.querySelectorAll('input, textarea, [contenteditable="true"]')).map(summarize),
      fileInputs: Array.from(document.querySelectorAll('input[type="file"]')).map(summarize),
    };
  });

  await page.screenshot({ path: screenshotPath, fullPage: true });
  await fs.writeFile(outputPath, JSON.stringify(inspection, null, 2));
  console.log(JSON.stringify({
    ok: true,
    url: inspection.url,
    title: inspection.title,
    buttons: inspection.buttons.length,
    inputs: inspection.inputs.length,
    fileInputs: inspection.fileInputs.length,
    outputPath,
    screenshotPath,
  }, null, 2));
} finally {
  await browser.close();
}
