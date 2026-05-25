import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const packagePath = path.join(runDir, 'xhs-skill-workflow-post-package.json');
const resultPath = path.join(runDir, 'xhs-skill-workflow-publish-result.json');
const beforeScreenshotPath = path.join(runDir, 'xhs-skill-workflow-before-publish.png');
const afterScreenshotPath = path.join(runDir, 'xhs-skill-workflow-after-publish.png');
const publishUrl = 'https://creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));
const fullContent = `${pkg.content}\n\n${pkg.tags.map((tag) => `#${tag}`).join(' ')}`;

const browser = await puppeteer.launch({
  headless: false,
  userDataDir,
  defaultViewport: { width: 1440, height: 1000 },
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
page.setDefaultTimeout(60_000);

async function pageState() {
  return page.evaluate(() => {
    const bodyText = document.body?.innerText || '';
    return {
      url: location.href,
      title: document.title,
      bodyTextSample: bodyText.slice(0, 2000),
      hasLoginText: bodyText.includes('短信登录') || bodyText.includes('登 录'),
      hasPublishPageText: bodyText.includes('上传图文') || bodyText.includes('发布') || bodyText.includes('拖拽图片'),
      hasSuccessText: bodyText.includes('发布成功') || bodyText.includes('发布完成') || bodyText.includes('审核中'),
      hasFailureText: bodyText.includes('发布失败') || bodyText.includes('失败') || bodyText.includes('错误'),
    };
  });
}

async function openPublishPage() {
  await page.goto(publishUrl, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await sleep(6_000);
  const state = await pageState();
  if (state.hasLoginText || state.url.includes('/login')) {
    throw new Error(`创作者平台登录态失效: ${state.url}`);
  }
}

async function uploadMedia() {
  let fileInput = await page.$('input[type="file"]');
  if (!fileInput) {
    const candidates = await page.$$('div, button, [role="button"]');
    for (const candidate of candidates) {
      const text = await candidate.evaluate((el) => (el.textContent || '').trim()).catch(() => '');
      if (text.includes('上传') || text.includes('拖拽')) {
        await candidate.click().catch(() => {});
        await sleep(1_000);
        fileInput = await page.$('input[type="file"]');
        if (fileInput) break;
      }
    }
  }
  if (!fileInput) throw new Error('找不到图片上传 input[type=file]');

  await fileInput.uploadFile(...pkg.media_paths);
  await page.evaluate((el) => el.dispatchEvent(new Event('change', { bubbles: true })), fileInput);
  await sleep(20_000);
}

async function fillTitle() {
  const selectors = [
    'input[placeholder*="标题"]',
    'input[placeholder*="填写标题"]',
    'input[class*="title"]',
    'input[type="text"]',
  ];
  for (const selector of selectors) {
    const elements = await page.$$(selector);
    for (const el of elements) {
      const visible = await el.isIntersectingViewport().catch(() => false);
      const type = await el.evaluate((node) => node.getAttribute('type') || '').catch(() => '');
      if (!visible || type === 'file' || type === 'hidden') continue;
      await el.click({ clickCount: 3 });
      await el.press('Backspace');
      await el.type(pkg.title, { delay: 10 });
      return;
    }
  }
  throw new Error('找不到标题输入框');
}

async function fillContent() {
  const selectors = [
    'div[contenteditable="true"][role="textbox"]',
    '.tiptap.ProseMirror',
    'div[contenteditable="true"]',
    'textarea[placeholder*="正文"]',
    'textarea',
    '[role="textbox"]',
  ];
  for (const selector of selectors) {
    const elements = await page.$$(selector);
    for (const el of elements) {
      const visible = await el.isIntersectingViewport().catch(() => false);
      if (!visible) continue;
      await el.click();
      await sleep(500);
      await el.type(fullContent, { delay: 5 });
      return;
    }
  }
  throw new Error('找不到正文输入框');
}

async function findPublishTarget() {
  const strictBottomPublish = await page.evaluateHandle(() => {
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
        item.text === '发布' &&
        !item.disabled &&
        item.rect.width >= 40 &&
        item.rect.height >= 25 &&
        item.rect.top > window.innerHeight * 0.55
      )
      .sort((a, b) => b.rect.top - a.rect.top);
    return candidates[0]?.el || null;
  });
  const strictElement = strictBottomPublish.asElement();
  if (strictElement) return strictElement;

  const custom = await page.$('xhs-publish-btn');
  if (custom) {
    const meta = await custom.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        text: (el.getAttribute('submit-text') || el.textContent || '').trim(),
        y: rect.top,
        w: rect.width,
        h: rect.height,
      };
    }).catch(() => null);
    if (meta && meta.text.includes('发布') && meta.y > 500 && meta.w > 40 && meta.h > 25) return custom;
  }

  const candidates = await page.$$('button, [role="button"], div, span');
  for (const candidate of candidates) {
    const meta = await candidate.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        text: (el.textContent || '').trim(),
        width: rect.width,
        height: rect.height,
        disabled: el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
      };
    }).catch(() => null);
    if (!meta || meta.disabled || meta.width <= 0 || meta.height <= 0) continue;
    if ((meta.text === '发布' || meta.text === '发布笔记' || meta.text.includes('发布')) && meta.text.length <= 20) {
      return candidate;
    }
  }
  return null;
}

async function clickPublish() {
  const target = await findPublishTarget();
  if (!target) throw new Error('找不到发布按钮');

  await page.evaluate((el) => {
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }, target);
  await sleep(800);

  await page.evaluate((el) => {
    const htmlEl = el;
    const rect = htmlEl.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const init = { bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y, button: 0, buttons: 1 };
    for (const eventName of ['mouseenter', 'mouseover', 'mousemove', 'mousedown', 'mouseup', 'click']) {
      htmlEl.dispatchEvent(new MouseEvent(eventName, init));
    }
  }, target);

  await sleep(2_000);
  const stateAfterEvent = await pageState();
  if (stateAfterEvent.hasSuccessText || !stateAfterEvent.url.includes('/publish/publish')) return;

  await target.click().catch(() => {});
}

async function waitForResult() {
  const started = Date.now();
  let last = await pageState();
  while (Date.now() - started < 180_000) {
    await sleep(3_000);
    last = await pageState();
    if (last.hasSuccessText || !last.url.includes('/publish/publish')) {
      return { status: 'published_or_submitted', state: last };
    }
    if (last.hasFailureText && !last.hasSuccessText) {
      return { status: 'publish_maybe_failed', state: last };
    }
  }
  return { status: 'publish_timeout', state: last };
}

try {
  await openPublishPage();
  await uploadMedia();
  await fillTitle();
  await sleep(1_000);
  await fillContent();
  await sleep(5_000);
  await page.screenshot({ path: beforeScreenshotPath, fullPage: true });
  await clickPublish();
  const result = await waitForResult();
  await page.screenshot({ path: afterScreenshotPath, fullPage: true });
  await fs.writeFile(resultPath, JSON.stringify({
    ...result,
    title: pkg.title,
    mediaCount: pkg.media_paths.length,
    contentLength: fullContent.length,
    clickedPublish: true,
    beforeScreenshotPath,
    afterScreenshotPath,
    checkedAt: new Date().toISOString(),
  }, null, 2));
  console.log(JSON.stringify({
    status: result.status,
    url: result.state.url,
    hasSuccessText: result.state.hasSuccessText,
    resultPath,
    beforeScreenshotPath,
    afterScreenshotPath,
  }, null, 2));
  await browser.close();
  if (result.status === 'publish_timeout' || result.status === 'publish_maybe_failed') process.exit(1);
} catch (error) {
  const state = await pageState().catch((stateError) => ({ stateError: String(stateError), url: page.url() }));
  await page.screenshot({ path: afterScreenshotPath, fullPage: true }).catch(() => {});
  await fs.writeFile(resultPath, JSON.stringify({
    status: 'failed',
    error: error instanceof Error ? error.message : String(error),
    state,
    afterScreenshotPath,
    checkedAt: new Date().toISOString(),
  }, null, 2));
  console.error(JSON.stringify({
    status: 'failed',
    error: error instanceof Error ? error.message : String(error),
    resultPath,
    afterScreenshotPath,
  }, null, 2));
  await browser.close();
  process.exit(1);
}
