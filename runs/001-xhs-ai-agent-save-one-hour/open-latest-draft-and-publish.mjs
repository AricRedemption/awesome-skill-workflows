import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const resultPath = path.join(runDir, 'xhs-skill-workflow-draft-publish-result.json');
const screenshotPath = path.join(runDir, 'xhs-skill-workflow-draft-publish.png');
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

async function state() {
  return page.evaluate(() => {
    const bodyText = document.body?.innerText || '';
    const items = Array.from(document.querySelectorAll('*')).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
        tag: el.tagName.toLowerCase(),
        className: String(el.className || '').slice(0, 100),
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        visible: rect.width > 0 && rect.height > 0,
      };
    }).filter((x) => x.visible && (x.text.includes('草稿') || x.text === '发布'));
    return { url: location.href, bodyTextSample: bodyText.slice(0, 1000), items };
  });
}

// Open draft box.
const draftTarget = await page.evaluateHandle(() => {
  const candidates = Array.from(document.querySelectorAll('*'))
    .map((el) => ({ el, text: (el.textContent || '').trim(), rect: el.getBoundingClientRect() }))
    .filter((x) => x.text.includes('草稿箱') && x.rect.width > 0 && x.rect.height > 0)
    .sort((a, b) => (b.rect.width * b.rect.height) - (a.rect.width * a.rect.height));
  return candidates[0]?.el || null;
});
if (!draftTarget.asElement()) throw new Error('找不到草稿箱入口');
await draftTarget.asElement().click();
await sleep(5_000);

// Open the newest draft by clicking the first visible card-like element that mentions the title or recent edit.
const draftCard = await page.evaluateHandle(() => {
  const candidates = Array.from(document.querySelectorAll('*'))
    .map((el) => ({ el, text: (el.textContent || '').trim(), rect: el.getBoundingClientRect() }))
    .filter((x) =>
      x.rect.width > 80 &&
      x.rect.height > 40 &&
      (x.text.includes('别再囤Skill了') || x.text.includes('刚刚') || x.text.includes('编辑于'))
    )
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);
  return candidates[0]?.el || null;
});
if (!draftCard.asElement()) {
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await fs.writeFile(resultPath, JSON.stringify({ status: 'failed', error: '找不到最新草稿卡片', state: await state(), screenshotPath }, null, 2));
  throw new Error('找不到最新草稿卡片');
}
await draftCard.asElement().click();
await sleep(8_000);

// Click the bottom publish button if the editor is open.
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
