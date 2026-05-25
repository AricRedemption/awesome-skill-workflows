import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const screenshotPath = path.join(runDir, 'xhs-draftbox-open.png');
const statePath = path.join(runDir, 'xhs-draftbox-open.json');
const publishUrl = 'https://creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
  headless: false,
  userDataDir,
  defaultViewport: { width: 1440, height: 1000 },
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.goto(publishUrl, { waitUntil: 'domcontentloaded', timeout: 90_000 });
await sleep(5_000);
await page.mouse.click(1330, 101);
await sleep(5_000);
const state = await page.evaluate(() => {
  const bodyText = document.body?.innerText || '';
  return {
    url: location.href,
    bodyTextSample: bodyText.slice(0, 2500),
    elements: Array.from(document.querySelectorAll('*')).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
        className: String(el.className || '').slice(0, 120),
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      };
    }).filter((e) => e.w > 0 && e.h > 0 && (
      e.text.includes('别再囤') ||
      e.text.includes('草稿') ||
      e.text.includes('编辑') ||
      e.text.includes('发布')
    )).slice(0, 120),
  };
});
await page.screenshot({ path: screenshotPath, fullPage: true });
await fs.writeFile(statePath, JSON.stringify(state, null, 2));
console.log(JSON.stringify({ screenshotPath, statePath, sample: state.bodyTextSample.slice(0, 500) }, null, 2));
await browser.close();
