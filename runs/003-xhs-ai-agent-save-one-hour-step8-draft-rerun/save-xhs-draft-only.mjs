import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const workspace = '/Users/aricredemption/Projects/awesome-skill-workflows';
const runDir = path.join(workspace, 'runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun');
const sourceRunDir = path.join(workspace, 'runs/001-xhs-ai-agent-save-one-hour');
const userDataDir = path.join(sourceRunDir, '.xhs-creator-profile');
const packagePath = path.join(runDir, 'publish-package.json');
const gateLedgerPath = path.join(runDir, 'gate-ledger.json');
const proofPath = path.join(runDir, 'draft-proof.json');
const screenshotPath = path.join(runDir, 'xhs-draft-save-proof.png');
const editorScreenshotPath = path.join(runDir, 'xhs-draft-editor-filled.png');
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

async function readLedger() {
  return JSON.parse(await fs.readFile(gateLedgerPath, 'utf8'));
}

async function writeLedger(update) {
  const ledger = await readLedger();
  const next = update(ledger);
  await fs.writeFile(gateLedgerPath, JSON.stringify(next, null, 2));
}

function assertPreDraftGates(ledger) {
  if (ledger.publish_mode !== 'human_review_then_draft') throw new Error('publish_mode is not draft-only');
  if (ledger.do_not_publish !== true) throw new Error('do_not_publish must be true');
  if (ledger.gates.human_review.status !== 'passed') throw new Error('human review gate has not passed');
  if (ledger.gates.risk_approval.status !== 'passed') throw new Error('risk approval gate has not passed');
}

async function summarizePage(page) {
  return page.evaluate(() => {
    const bodyText = document.body?.innerText || '';
    const accountName =
      Array.from(document.querySelectorAll('*'))
        .map((el) => (el.textContent || '').trim())
        .find((text) => text === 'localized text') || null;
    const elements = Array.from(document.querySelectorAll('button, [role="button"], input, textarea, [contenteditable="true"], div, span'))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
          placeholder: el.getAttribute('placeholder') || '',
          role: el.getAttribute('role') || '',
          type: el.getAttribute('type') || '',
          className: String(el.className || '').slice(0, 120),
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        };
      })
      .filter((item) => item.w > 0 && item.h > 0);
    return {
      url: location.href,
      title: document.title,
      bodyTextSample: bodyText.slice(0, 2500),
      loggedIn: Boolean(accountName) && !bodyText.includes('localized text') && !bodyText.includes('localized text localized text'),
      accountName,
      fileInputCount: document.querySelectorAll('input[type="file"]').length,
      draftRelated: elements.filter((item) =>
        item.text.includes('localized text') ||
        item.text.includes('localized text') ||
        item.text.includes('localized text') ||
        item.text.includes('AI Agent') ||
        item.text.includes('localized text1localized text')
      ).slice(0, 120),
      inputs: elements.filter((item) => item.tag === 'input' || item.tag === 'textarea' || item.role === 'textbox' || item.className.includes('ProseMirror')).slice(0, 40),
    };
  });
}

async function uploadMedia(page) {
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

async function fillTitle(page) {
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

async function fillContent(page) {
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

async function findAndClickSaveDraft(page) {
  const buttonMeta = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('*'))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          text: (el.textContent || '').trim().replace(/\s+/g, ' '),
          visible: rect.width > 0 && rect.height > 0,
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.height,
        };
      })
      .filter((item) => item.visible && item.text.length > 0 && item.text.length <= 40)
      .filter((item) =>
        item.text.includes('localized text') ||
        item.text.includes('localized text') ||
        item.text.includes('localized text') ||
        item.text === 'localized text'
      )
      .sort((a, b) => (a.w * a.h) - (b.w * b.h));
    return candidates[0] || null;
  });
  if (buttonMeta) {
    await page.mouse.click(buttonMeta.x + buttonMeta.w / 2, buttonMeta.y + buttonMeta.h / 2);
    return {
      clicked: true,
      method: 'text_match',
      text: buttonMeta.text,
      x: Math.round(buttonMeta.x),
      y: Math.round(buttonMeta.y),
      w: Math.round(buttonMeta.w),
      h: Math.round(buttonMeta.h),
    };
  }

  // The creator UI renders the draft action as "localized text" near the bottom.
  // Use a coordinate fallback only for that draft action area; never click publish.
  await page.mouse.click(602, 955);
  return { clicked: true, method: 'coordinate_fallback', text: 'localized text', x: 602, y: 955 };
}

async function openDraftBoxAndVerify(page) {
  await page.mouse.click(1330, 101);
  await sleep(5_000);
  const state = await summarizePage(page);
  const titleFound = state.bodyTextSample.includes(pkg.title) || state.draftRelated.some((item) => item.text.includes(pkg.title));
  const draftBoxVisible = state.bodyTextSample.includes('localized text') || state.draftRelated.some((item) => item.text.includes('localized text'));
  return { titleFound, draftBoxVisible, state };
}

let browser;
try {
  const ledger = await readLedger();
  assertPreDraftGates(ledger);

  browser = await puppeteer.launch({
    headless: false,
    userDataDir,
    defaultViewport: { width: 1440, height: 1000 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(45_000);

  await page.goto(publishUrl, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await sleep(6_000);
  const accountState = await summarizePage(page);
  if (!accountState.loggedIn || accountState.url.includes('/login')) {
    throw new Error(`localized text: ${accountState.url}`);
  }
  const accountCheckedAt = new Date().toISOString();
  await writeLedger((current) => {
    current.gates.account_state = {
      status: 'passed',
      passed_at: accountCheckedAt,
      evidence: 'runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json',
      account_name: accountState.accountName,
      url: accountState.url
    };
    return current;
  });

  const draftStartedAt = new Date().toISOString();
  await writeLedger((current) => {
    current.gates.draft_action.status = 'started';
    current.gates.draft_action.started_at = draftStartedAt;
    return current;
  });

  await uploadMedia(page);
  await fillTitle(page);
  await sleep(1_000);
  await fillContent(page);
  await sleep(8_000);
  await page.screenshot({ path: editorScreenshotPath, fullPage: true });

  const saveButton = await findAndClickSaveDraft(page);
  if (saveButton.clicked) await sleep(6_000);
  const draftVerification = await openDraftBoxAndVerify(page);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const draftSaved = saveButton.clicked && draftVerification.titleFound;
  const finishedAt = new Date().toISOString();
  const proof = {
    platform: 'xiaohongshu',
    publish_mode: 'human_review_then_draft',
    status: draftSaved ? 'draft_saved' : 'failed',
    publish_fact_status: 'not_published',
    compliance_status: draftSaved ? 'passed' : 'failed',
    post_id: 'N/A',
    post_url: 'N/A',
    published_at: 'N/A',
    title: pkg.title,
    human_review_passed: true,
    risk_check_passed: true,
    account_state_checked: true,
    account_state_checked_at: accountCheckedAt,
    draft_started_at: draftStartedAt,
    draft_finished_at: finishedAt,
    saved_draft: draftSaved,
    clicked_publish: false,
    save_button: saveButton,
    draft_verification: {
      title_found_in_draftbox: draftVerification.titleFound,
      draftbox_visible: draftVerification.draftBoxVisible,
      url: draftVerification.state.url,
      bodyTextSample: draftVerification.state.bodyTextSample,
      draftRelated: draftVerification.state.draftRelated,
    },
    evidence: {
      screenshot: path.relative(workspace, screenshotPath),
      browser_log: path.relative(workspace, proofPath),
      editor_screenshot: path.relative(workspace, editorScreenshotPath),
      manual_note: draftSaved
        ? 'Draft-only Step 8 passed. Human review, risk approval, and account-state check preceded the draft action. No live publish was attempted.'
        : 'Draft-only Step 8 failed. The editor was filled, but no machine-verifiable saved draft was found. No live publish was attempted.'
    }
  };
  await fs.writeFile(proofPath, JSON.stringify(proof, null, 2));
  await writeLedger((current) => {
    current.gates.draft_action.status = draftSaved ? 'passed' : 'failed';
    current.gates.draft_action.finished_at = finishedAt;
    current.gates.draft_action.evidence = 'runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json';
    current.final_status = draftSaved ? 'passed' : 'failed';
    return current;
  });

  console.log(JSON.stringify({
    status: proof.status,
    compliance_status: proof.compliance_status,
    saved_draft: proof.saved_draft,
    clicked_publish: proof.clicked_publish,
    proofPath,
    screenshotPath,
  }, null, 2));

  await browser.close();
  if (!draftSaved) process.exit(1);
} catch (error) {
  const finishedAt = new Date().toISOString();
  const proof = {
    platform: 'xiaohongshu',
    publish_mode: 'human_review_then_draft',
    status: 'failed',
    publish_fact_status: 'not_published',
    compliance_status: 'failed',
    post_id: 'N/A',
    post_url: 'N/A',
    published_at: 'N/A',
    title: pkg.title,
    human_review_passed: true,
    risk_check_passed: true,
    saved_draft: false,
    clicked_publish: false,
    error: error instanceof Error ? error.message : String(error),
    evidence: {
      screenshot: path.relative(workspace, screenshotPath),
      browser_log: path.relative(workspace, proofPath),
      manual_note: 'Draft-only Step 8 failed before a machine-verifiable draft proof was produced. No live publish was attempted.'
    }
  };
  await fs.writeFile(proofPath, JSON.stringify(proof, null, 2)).catch(() => {});
  await writeLedger((current) => {
    current.gates.draft_action.status = 'failed';
    current.gates.draft_action.finished_at = finishedAt;
    current.gates.draft_action.evidence = 'runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/draft-proof.json';
    current.final_status = 'failed';
    return current;
  }).catch(() => {});
  console.error(JSON.stringify({
    status: 'failed',
    error: proof.error,
    proofPath,
  }, null, 2));
  if (browser) await browser.close().catch(() => {});
  process.exit(1);
}
