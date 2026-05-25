import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const resultPath = path.join(runDir, 'xhs-skill-workflow-image-draft-publish-result.json');
const screenshotPath = path.join(runDir, 'xhs-skill-workflow-image-draft-publish.png');
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

// Open draft box, switch to image draft tab.
await page.mouse.click(1330, 101);
await sleep(2_000);
await page.mouse.click(1032, 88);
await sleep(4_000);

let debug = await page.evaluate(() => {
  const bodyText = document.body?.innerText || '';
  return {
    url: location.href,
    bodyTextSample: bodyText.slice(0, 2000),
    candidates: Array.from(document.querySelectorAll('*')).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
        tag: el.tagName.toLowerCase(),
        className: String(el.className || '').slice(0, 120),
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      };
    }).filter((x) => x.w > 20 && x.h > 20 && (
      x.text.includes('别再囤') ||
      x.text.includes('Skill') ||
      x.text.includes('刚刚') ||
      x.text.includes('编辑')
    )).slice(0, 120),
  };
});

// Prefer the newest draft card near the upper part of the image draft list.
const card = await page.evaluateHandle(() => {
  const candidates = Array.from(document.querySelectorAll('*'))
    .map((el) => ({ el, text: (el.textContent || '').trim(), rect: el.getBoundingClientRect() }))
    .filter((x) =>
      x.rect.width > 100 &&
      x.rect.height > 50 &&
      x.rect.left > window.innerWidth * 0.55 &&
      x.rect.top > 120 &&
      (x.text.includes('别再囤') || x.text.includes('Skill') || x.text.includes('刚刚') || x.text.includes('编辑'))
    )
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);
  return candidates[0]?.el || null;
});

if (!card.asElement()) {
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await fs.writeFile(resultPath, JSON.stringify({ status: 'failed', error: '找不到图文草稿卡片', debug, screenshotPath }, null, 2));
  throw new Error('找不到图文草稿卡片');
}
await card.asElement().click();
await sleep(8_000);

// Click actual bottom publish button by coordinate after editor opens.
await page.mouse.click(750, 955);
await sleep(3_000);

let finalState = {};
const started = Date.now();
while (Date.now() - started < 180_000) {
  await sleep(3_000);
  finalState = await page.evaluate(() => {
    const bodyText = document.body?.innerText || '';
    return {
      url: location.href,
      bodyTextSample: bodyText.slice(0, 1400),
      hasSuccessText: bodyText.includes('发布成功') || bodyText.includes('审核中') || bodyText.includes('发布完成'),
      stillOnPublishPage: location.href.includes('/publish/publish'),
    };
  });
  if (finalState.hasSuccessText || !finalState.stillOnPublishPage) break;
}

await page.screenshot({ path: screenshotPath, fullPage: true });
const status = finalState.hasSuccessText || !finalState.stillOnPublishPage ? 'published_or_submitted' : 'publish_not_confirmed';
await fs.writeFile(resultPath, JSON.stringify({ status, state: finalState, screenshotPath, checkedAt: new Date().toISOString() }, null, 2));
console.log(JSON.stringify({ status, state: finalState, resultPath, screenshotPath }, null, 2));
await browser.close();
if (status !== 'published_or_submitted') process.exit(1);
