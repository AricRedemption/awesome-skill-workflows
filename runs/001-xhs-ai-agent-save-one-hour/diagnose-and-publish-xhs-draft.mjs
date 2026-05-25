import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const resultPath = path.join(runDir, 'xhs-skill-workflow-diagnose-publish-result.json');
const screenshotPath = path.join(runDir, 'xhs-skill-workflow-diagnose-publish.png');
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

async function snapshot(label) {
  return page.evaluate((labelValue) => {
    const bodyText = document.body?.innerText || '';
    return {
      label: labelValue,
      url: location.href,
      bodyTextSample: bodyText.slice(0, 1800),
      hasEditor: bodyText.includes('localized text') && bodyText.includes('localized text'),
      hasUploadHome: bodyText.includes('localized text') && bodyText.includes('localized text'),
      hasSuccessText: bodyText.includes('localized text') || bodyText.includes('localized text') || bodyText.includes('localized text'),
      publishCandidates: Array.from(document.querySelectorAll('button, [role="button"], xhs-publish-btn, div, span'))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
            className: String(el.className || '').slice(0, 120),
            id: el.id || '',
            submitText: el.getAttribute('submit-text') || '',
            disabled: el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
            pointerEvents: style.pointerEvents,
            opacity: style.opacity,
            zIndex: style.zIndex,
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            w: Math.round(rect.width),
            h: Math.round(rect.height),
          };
        })
        .filter((item) =>
          item.w > 20 &&
          item.h > 20 &&
          (item.text === 'localized text' || item.text.includes('localized text') || item.submitText.includes('localized text'))
        )
        .sort((a, b) => b.y - a.y),
    };
  }, label);
}

async function openLatestImageDraftIfNeeded() {
  const initial = await snapshot('initial');
  if (initial.hasEditor && initial.bodyTextSample.includes('localized textSkilllocalized text')) return initial;

  await page.goto(publishUrl, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await sleep(5_000);
  const pageAfterGoto = await snapshot('after-goto');
  if (pageAfterGoto.hasEditor && pageAfterGoto.bodyTextSample.includes('localized textSkilllocalized text')) return pageAfterGoto;

  await page.mouse.click(1330, 101);
  await sleep(2_000);
  await page.mouse.click(1032, 88);
  await sleep(3_000);

  const card = await page.evaluateHandle(() => {
    const titleCandidates = Array.from(document.querySelectorAll('*'))
      .map((el) => ({ el, text: (el.textContent || '').trim(), rect: el.getBoundingClientRect() }))
      .filter((item) =>
        item.rect.width > 80 &&
        item.rect.height > 16 &&
        item.rect.left > window.innerWidth * 0.45 &&
        item.rect.top > 180 &&
        item.text.includes('localized textSkilllocalized text')
      )
      .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);
    const latestTitle = titleCandidates[0];
    if (!latestTitle) return null;

    const targetY = latestTitle.rect.top + latestTitle.rect.height / 2;
    const editCandidates = Array.from(document.querySelectorAll('*'))
      .map((el) => ({ el, text: (el.textContent || '').trim(), rect: el.getBoundingClientRect() }))
      .filter((item) =>
        item.text === 'localized text' &&
        item.rect.left > latestTitle.rect.left &&
        Math.abs((item.rect.top + item.rect.height / 2) - targetY) < 40
      )
      .sort((a, b) => a.rect.left - b.rect.left);
    return editCandidates[0]?.el || null;
  });

  if (!card.asElement()) throw new Error('localized text');
  await card.asElement().click();
  await sleep(8_000);
  return snapshot('after-open-draft');
}

async function clickBottomPublish() {
  const target = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('button, [role="button"], xhs-publish-btn, div, span'))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return {
          el,
          text: (el.textContent || '').trim(),
          submitText: el.getAttribute('submit-text') || '',
          rect,
          disabled: el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
          pointerEvents: style.pointerEvents,
        };
      })
      .filter((item) =>
        !item.disabled &&
        item.pointerEvents !== 'none' &&
        item.rect.width >= 40 &&
        item.rect.height >= 25 &&
        item.rect.top > window.innerHeight * 0.65 &&
        (item.text === 'localized text' || item.submitText.includes('localized text'))
      )
      .sort((a, b) => b.rect.top - a.rect.top || b.rect.width - a.rect.width);
    const item = candidates[0];
    if (!item) return null;
    const x = item.rect.left + item.rect.width / 2;
    const y = item.rect.top + item.rect.height / 2;
    const pointEl = document.elementFromPoint(x, y);
    return {
      x,
      y,
      tag: item.el.tagName.toLowerCase(),
      text: item.text,
      submitText: item.submitText,
      pointTag: pointEl?.tagName.toLowerCase() || '',
      pointText: (pointEl?.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
    };
  });

  if (!target) throw new Error('localized text');
  await page.mouse.move(target.x, target.y);
  await sleep(300);
  await page.mouse.down();
  await sleep(120);
  await page.mouse.up();
  await sleep(4_000);
  return target;
}

const result = {
  startedAt: new Date().toISOString(),
  before: null,
  clicked: null,
  afterClick: null,
  final: null,
};

try {
  result.before = await openLatestImageDraftIfNeeded();
  result.clicked = await clickBottomPublish();
  result.afterClick = await snapshot('after-click');

  const started = Date.now();
  while (Date.now() - started < 90_000) {
    await sleep(3_000);
    result.final = await snapshot('poll');
    if (result.final.hasSuccessText || !result.final.url.includes('/publish/publish')) break;
    if (!result.final.hasEditor && result.final.hasUploadHome) break;
  }

  await page.screenshot({ path: screenshotPath, fullPage: true });
  const submitted = Boolean(result.final?.hasSuccessText || (result.final && !result.final.url.includes('/publish/publish')));
  result.status = submitted ? 'published_or_submitted' : 'publish_not_confirmed';
  result.screenshotPath = screenshotPath;
  result.checkedAt = new Date().toISOString();
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ status: result.status, clicked: result.clicked, final: result.final, resultPath, screenshotPath }, null, 2));
  await browser.close();
  if (!submitted) process.exit(1);
} catch (error) {
  result.status = 'failed';
  result.error = error instanceof Error ? error.message : String(error);
  result.final = await snapshot('error').catch((stateError) => ({ stateError: String(stateError), url: page.url() }));
  await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
  result.screenshotPath = screenshotPath;
  result.checkedAt = new Date().toISOString();
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2));
  console.error(JSON.stringify(result, null, 2));
  await browser.close();
  process.exit(1);
}
