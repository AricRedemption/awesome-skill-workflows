import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const resultPath = path.join(runDir, 'xhs-skill-workflow-final-publish-result.json');
const screenshotPath = path.join(runDir, 'xhs-skill-workflow-final-publish.png');
const publishUrl = 'https://creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await puppeteer.launch({
  headless: false,
  userDataDir,
  defaultViewport: { width: 1440, height: 1000 },
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
page.setDefaultTimeout(60_000);

async function getState() {
  return page.evaluate(() => {
    const bodyText = document.body?.innerText || '';
    const buttons = Array.from(document.querySelectorAll('button, [role="button"], div, span'))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          text: (el.textContent || '').trim(),
          tag: el.tagName.toLowerCase(),
          className: String(el.className || '').slice(0, 120),
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          visible: rect.width > 0 && rect.height > 0,
          disabled: el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
        };
      })
      .filter((item) => item.visible && item.text && item.text.includes('localized text'))
      .slice(0, 80);
    return {
      url: location.href,
      title: document.title,
      bodyTextSample: bodyText.slice(0, 1200),
      hasSuccessText: bodyText.includes('localized text') || bodyText.includes('localized text') || bodyText.includes('localized text'),
      hasLoginText: bodyText.includes('localized text') || bodyText.includes('localized text localized text'),
      buttons,
    };
  });
}

await page.goto(publishUrl, { waitUntil: 'domcontentloaded', timeout: 90_000 });
await sleep(8_000);

let state = await getState();
if (state.hasLoginText || state.url.includes('/login')) {
  throw new Error(`localized text: ${state.url}`);
}

const target = await page.evaluateHandle(() => {
  const candidates = Array.from(document.querySelectorAll('button, [role="button"], div, span'))
    .map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        el,
        text: (el.textContent || '').trim(),
        rect,
        disabled: el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
      };
    })
    .filter((item) =>
      item.text === 'localized text' &&
      !item.disabled &&
      item.rect.width > 40 &&
      item.rect.height > 25 &&
      item.rect.top > window.innerHeight * 0.55
    )
    .sort((a, b) => b.rect.top - a.rect.top);
  return candidates[0]?.el || null;
});

const targetElement = target.asElement();
if (!targetElement) {
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await fs.writeFile(resultPath, JSON.stringify({
    status: 'failed',
    error: 'localized text',
    state,
    screenshotPath,
    checkedAt: new Date().toISOString(),
  }, null, 2));
  throw new Error('localized text');
}

await page.evaluate((el) => {
  el.scrollIntoView({ behavior: 'instant', block: 'center' });
}, targetElement);
await sleep(500);
await targetElement.click();

let finalState = await getState();
const started = Date.now();
while (Date.now() - started < 180_000) {
  await sleep(3_000);
  finalState = await getState();
  if (finalState.hasSuccessText || !finalState.url.includes('/publish/publish')) break;
}

await page.screenshot({ path: screenshotPath, fullPage: true });
const status = finalState.hasSuccessText || !finalState.url.includes('/publish/publish')
  ? 'published_or_submitted'
  : 'publish_not_confirmed';

await fs.writeFile(resultPath, JSON.stringify({
  status,
  state: finalState,
  clickedBottomPublish: true,
  screenshotPath,
  checkedAt: new Date().toISOString(),
}, null, 2));

console.log(JSON.stringify({
  status,
  url: finalState.url,
  hasSuccessText: finalState.hasSuccessText,
  resultPath,
  screenshotPath,
}, null, 2));

await browser.close();
if (status !== 'published_or_submitted') process.exit(1);
