import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import path from 'node:path';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
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
await sleep(8_000);
const data = await page.evaluate(() => {
  const bodyText = document.body?.innerText || '';
  const candidates = Array.from(document.querySelectorAll('*'))
    .map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
        className: String(el.className || '').slice(0, 100),
        role: el.getAttribute('role') || '',
        disabled: el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        visible: rect.width > 0 && rect.height > 0,
      };
    })
    .filter((item) => item.visible && item.text.includes('发布'))
    .sort((a, b) => a.y - b.y || a.x - b.x);
  return {
    url: location.href,
    bodyTextSample: bodyText.slice(0, 600),
    viewport: { w: window.innerWidth, h: window.innerHeight },
    candidates,
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
