import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const resultPath = path.join(runDir, 'xhs-skill-workflow-coordinate-publish-result.json');
const screenshotPath = path.join(runDir, 'xhs-skill-workflow-coordinate-after-publish.png');
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

await page.mouse.move(750, 955);
await sleep(300);
await page.mouse.down();
await sleep(120);
await page.mouse.up();

let state = {};
const started = Date.now();
while (Date.now() - started < 180_000) {
  await sleep(3_000);
  state = await page.evaluate(() => {
    const bodyText = document.body?.innerText || '';
    return {
      url: location.href,
      bodyTextSample: bodyText.slice(0, 1200),
      hasSuccessText: bodyText.includes('发布成功') || bodyText.includes('审核中') || bodyText.includes('发布完成'),
      stillOnPublishPage: location.href.includes('/publish/publish'),
    };
  });
  if (state.hasSuccessText || !state.stillOnPublishPage) break;
}

await page.screenshot({ path: screenshotPath, fullPage: true });
const status = state.hasSuccessText || !state.stillOnPublishPage ? 'published_or_submitted' : 'publish_not_confirmed';
await fs.writeFile(resultPath, JSON.stringify({
  status,
  state,
  clickedCoordinate: { x: 750, y: 955 },
  screenshotPath,
  checkedAt: new Date().toISOString(),
}, null, 2));
console.log(JSON.stringify({ status, state, resultPath, screenshotPath }, null, 2));
await browser.close();
if (status !== 'published_or_submitted') process.exit(1);
