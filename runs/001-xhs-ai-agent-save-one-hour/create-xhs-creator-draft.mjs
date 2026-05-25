import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const packagePath = path.join(runDir, 'publish-package.json');
const resultPath = path.join(runDir, 'xhs-draft-status.json');
const screenshotPath = path.join(runDir, 'xhs-draft-filled.png');
const publishUrl = 'https://creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));
const tagText = pkg.tags
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean)
  .map((tag) => `#${tag}`)
  .join(' ');
const fullContent = `${pkg.content}\n\n${tagText}`;

const browser = await puppeteer.launch({
  headless: false,
  userDataDir,
  defaultViewport: { width: 1440, height: 1000 },
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
page.setDefaultTimeout(45_000);

async function summarizePage() {
  return page.evaluate(() => {
    const bodyText = document.body?.innerText || '';
    const summarize = (el) => ({
      tag: el.tagName.toLowerCase(),
      text: (el.innerText || el.textContent || '').trim().slice(0, 120),
      placeholder: el.getAttribute('placeholder') || '',
      role: el.getAttribute('role') || '',
      type: el.getAttribute('type') || '',
      className: String(el.className || '').slice(0, 160),
      disabled: Boolean(el.disabled),
    });
    return {
      url: location.href,
      title: document.title,
      bodyTextSample: bodyText.slice(0, 1500),
      buttons: Array.from(document.querySelectorAll('button, [role="button"], xhs-publish-btn')).map(summarize),
      inputs: Array.from(document.querySelectorAll('input, textarea, [contenteditable="true"]')).map(summarize),
      fileInputCount: document.querySelectorAll('input[type="file"]').length,
      hasLoginText: bodyText.includes('localized text') || bodyText.includes('localized text localized text'),
    };
  });
}

async function clickImageTabIfNeeded() {
  await page.goto(publishUrl, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await sleep(6_000);
  const tabs = await page.$$('div, span, button, [role="tab"]');
  for (const tab of tabs) {
    const text = await tab.evaluate((el) => (el.textContent || '').trim()).catch(() => '');
    if (text.includes('localized text') || text === 'localized text') {
      const visible = await tab.isIntersectingViewport().catch(() => false);
      if (visible) {
        await tab.click().catch(() => {});
        await sleep(2_000);
        break;
      }
    }
  }
}

async function uploadMedia() {
  let fileInput = await page.$('input[type="file"]');
  if (!fileInput) {
    const uploadCandidates = await page.$$('div, button, [role="button"]');
    for (const candidate of uploadCandidates) {
      const text = await candidate.evaluate((el) => (el.textContent || '').trim()).catch(() => '');
      if (text.includes('localized text') || text.includes('localized text')) {
        await candidate.click().catch(() => {});
        await sleep(1_000);
        fileInput = await page.$('input[type="file"]');
        if (fileInput) break;
      }
    }
  }
  if (!fileInput) throw new Error('localized text input[type=file]');

  await fileInput.uploadFile(...pkg.media_paths);
  await page.evaluate((el) => el.dispatchEvent(new Event('change', { bubbles: true })), fileInput);
  await sleep(18_000);
}

async function fillTitle() {
  const selectors = [
    'input[placeholder*="localized text"]',
    'input[placeholder*="localized text"]',
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
  throw new Error('localized text');
}

async function fillContent() {
  const selectors = [
    'div[contenteditable="true"][role="textbox"]',
    '.tiptap.ProseMirror',
    'div[contenteditable="true"]',
    'textarea[placeholder*="localized text"]',
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
  throw new Error('localized text');
}

async function findDraftButton() {
  return page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('button, [role="button"], div, span'));
    return candidates
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          text: (el.textContent || '').trim(),
          tag: el.tagName.toLowerCase(),
          className: String(el.className || '').slice(0, 120),
          visible: rect.width > 0 && rect.height > 0,
        };
      })
      .filter((item) => item.visible && item.text && item.text.length <= 30)
      .filter((item) => item.text.includes('localized text') || item.text.includes('localized text') || item.text.includes('localized text'));
  });
}

try {
  await clickImageTabIfNeeded();
  let state = await summarizePage();
  if (state.hasLoginText || state.url.includes('/login')) {
    throw new Error(`localized text: ${state.url}`);
  }

  await uploadMedia();
  await fillTitle();
  await sleep(1_000);
  await fillContent();
  await sleep(3_000);

  const draftButtons = await findDraftButton();
  const finalState = await summarizePage();
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await fs.writeFile(resultPath, JSON.stringify({
    status: 'filled_publish_page',
    mode: 'draft_or_manual_review',
    published: false,
    clickedPublish: false,
    savedDraft: false,
    reason: draftButtons.length
      ? 'localized text,localized text/localized text,localized text.'
      : 'localized text,localized text;localized text.',
    url: finalState.url,
    title: pkg.title,
    mediaCount: pkg.media_paths.length,
    contentLength: fullContent.length,
    draftButtons,
    screenshotPath,
    checkedAt: new Date().toISOString(),
  }, null, 2));

  console.log(JSON.stringify({
    status: 'filled_publish_page',
    published: false,
    savedDraft: false,
    draftButtonCount: draftButtons.length,
    resultPath,
    screenshotPath,
  }, null, 2));

  await sleep(60_000);
  await browser.close();
} catch (error) {
  const state = await summarizePage().catch((summaryError) => ({ summaryError: String(summaryError), url: page.url() }));
  await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
  await fs.writeFile(resultPath, JSON.stringify({
    status: 'failed',
    error: error instanceof Error ? error.message : String(error),
    state,
    screenshotPath,
    checkedAt: new Date().toISOString(),
  }, null, 2));
  console.error(JSON.stringify({
    status: 'failed',
    error: error instanceof Error ? error.message : String(error),
    resultPath,
    screenshotPath,
  }, null, 2));
  await browser.close();
  process.exit(1);
}
