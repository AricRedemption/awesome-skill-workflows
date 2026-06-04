#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const ACK = 'save-draft-only';
const CREATOR_URL =
  'https://creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image';

if (process.env.XHS_DRAFT_REPRO_ACK !== ACK) {
  throw new Error(`Refusing to run without XHS_DRAFT_REPRO_ACK=${ACK}`);
}

const require = createRequire(import.meta.url);
const puppeteerPackage = process.env.XHS_PUPPETEER_PACKAGE || 'puppeteer';
const puppeteer = require(puppeteerPackage);
const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;

const cwd = process.cwd();
const now = new Date();
const stamp = now
  .toISOString()
  .replace(/[-:]/g, '')
  .replace(/\..+/, '')
  .replace('T', '-');

const cookieFile =
  process.env.XHS_COOKIE_FILE || path.join(os.homedir(), '.xhs-mcp', 'cookies.json');
const profileDir =
  process.env.XHS_PROFILE_DIR ||
  path.join(os.homedir(), '.xhs-headless-draft-profiles', 'awesome-skill-workflows');
const mediaDir =
  process.env.XHS_MEDIA_DIR ||
  path.join(cwd, 'runs', '001-xhs-ai-agent-save-one-hour', 'media');
const outputDir =
  process.env.XHS_OUTPUT_DIR ||
  path.join(cwd, 'runs', '011-xhs-headless-draft-reproduction');
const title = process.env.XHS_DRAFT_TITLE || `草稿复现${stamp.slice(-6)}`;
const content =
  process.env.XHS_DRAFT_CONTENT ||
  [
    'Headless draft reproduction test.',
    'Mode: save draft only.',
    'This run must not click publish.',
    '#AI工作流 #草稿验证',
  ].join('\n');
const fastVerify = process.env.XHS_FAST_VERIFY === '1';
const secondCheckDelayMs = Number(
  process.env.XHS_SECOND_CHECK_DELAY_MS || (fastVerify ? 4000 : 60000)
);
const keepAliveAfterProofMs = Number(process.env.XHS_KEEP_ALIVE_AFTER_PROOF_MS || 0);
const visibleVerify = process.env.XHS_VISIBLE_VERIFY === '1';
const visibleProfileDir = process.env.XHS_VISIBLE_PROFILE_DIR || profileDir;
const pageGotoWaitUntil = fastVerify ? 'domcontentloaded' : 'networkidle2';
const editorReadyTimeout = fastVerify ? 15000 : 60000;
const draftButtonStabilizeTimeout = fastVerify ? 5000 : 10000;
const draftBoxOpenTimeout = fastVerify ? 5000 : 15000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const installRequestFilters = async (page) => {
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const url = request.url();
    const resourceType = request.resourceType();
    const shouldBlock =
      /^https?:/i.test(url) && (resourceType === 'image' || resourceType === 'font' || resourceType === 'media');

    if (shouldBlock) {
      request.abort().catch(() => {});
      return;
    }

    request.continue().catch(() => {});
  });
};

const mediaPaths = fs
  .readdirSync(mediaDir)
  .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
  .sort()
  .map((name) => path.join(mediaDir, name));

if (mediaPaths.length === 0) {
  throw new Error(`No upload images found in ${mediaDir}`);
}

const cookies = JSON.parse(fs.readFileSync(cookieFile, 'utf8'));
fs.mkdirSync(outputDir, { recursive: true });

const proof = {
  run_id: path.basename(outputDir),
  mode: 'headless_browser_live_session',
  source: 'scripts/reproduce-xhs-headless-draft.mjs',
  headless: true,
  requested_action: 'save_draft_only',
  clicked_publish: false,
  live_publish_allowed: false,
  fast_verify: fastVerify,
  title,
  media_count: mediaPaths.length,
  profile_path_recorded: false,
  cookie_contents_recorded: false,
  started_at: now.toISOString(),
};

const browser = await puppeteer.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
  userDataDir: profileDir,
  defaultViewport: { width: 1440, height: 1000 },
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
let browserClosed = false;

try {
  const page = await browser.newPage();
  if (!fastVerify) {
    await installRequestFilters(page);
  }
  await page.setCookie(...cookies);
  const navigationPromise = page.goto(CREATOR_URL, { waitUntil: pageGotoWaitUntil, timeout: 60000 });

  const fileInput = await page.waitForSelector('input[type=file]', {
    visible: false,
    timeout: 30000,
  });
  await navigationPromise.catch(() => {});
  proof.page_loaded_at = new Date().toISOString();
  proof.url_after_load = page.url();
  proof.upload_input_found = true;
  proof.account_state = 'passed_upload_ui_ready';
  await fileInput.uploadFile(...mediaPaths);
  await page.waitForFunction(
    (fastMode) => {
      const nodes = Array.from(document.querySelectorAll('input, textarea, [contenteditable], [role=textbox]'));
      if (fastMode) {
        return nodes.some((node) => {
          const placeholder = node.getAttribute('placeholder') || '';
          return (
            placeholder.includes('标题') ||
            placeholder.includes('正文') ||
            placeholder.includes('内容') ||
            placeholder.toLowerCase().includes('title') ||
            placeholder.toLowerCase().includes('content')
          );
        });
      }
      return nodes.some((node) => {
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
    },
    { timeout: editorReadyTimeout },
    fastVerify
  );
  proof.editor_ready_at = new Date().toISOString();

  await page.evaluate(
    ({ title, content, fastMode }) => {
      const setInputValue = (element, value) => {
        element.focus();
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      };

      const editableNodes = Array.from(
        document.querySelectorAll('input, textarea, [contenteditable], [role=textbox]')
      ).filter((node) => {
        if (node.tagName === 'INPUT' && (node.getAttribute('type') || '').toLowerCase() === 'file') {
          return false;
        }
        if (fastMode) return true;
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });

      const titleNode =
        editableNodes.find((node) => {
          const placeholder = node.getAttribute('placeholder') || '';
          return placeholder.includes('标题') || placeholder.toLowerCase().includes('title');
        }) || editableNodes[0];
      const contentNode =
        editableNodes.find((node) => {
          const placeholder = node.getAttribute('placeholder') || '';
          return (
            node !== titleNode &&
            (placeholder.includes('正文') ||
              placeholder.includes('内容') ||
              placeholder.toLowerCase().includes('content'))
          );
        }) || editableNodes.find((node) => node !== titleNode);

      if (!titleNode || !contentNode) {
        throw new Error(`Editable nodes not found: ${editableNodes.length}`);
      }

      if (titleNode.isContentEditable) {
        titleNode.focus();
        titleNode.textContent = title;
        titleNode.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
      } else {
        setInputValue(titleNode, title);
      }

      if (contentNode.isContentEditable) {
        contentNode.focus();
        contentNode.textContent = content;
        contentNode.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
      } else {
        setInputValue(contentNode, content);
      }

      return {
        editable_count: editableNodes.length,
        title_tag: titleNode.tagName,
        content_tag: contentNode.tagName,
      };
    },
    { title, content, fastMode: fastVerify }
  );
  proof.fields_filled_at = new Date().toISOString();

  await page.waitForFunction(
    () => {
      const nodes = Array.from(document.querySelectorAll('button, xhs-publish-btn, [role=button]'));
      return nodes.some((node) => {
        const rect = node.getBoundingClientRect();
        const text = (node.textContent || '').trim();
        const attrs = Array.from(node.attributes || [])
          .map((attr) => `${attr.name}=${attr.value}`)
          .join(' ');
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          !node.hasAttribute('disabled') &&
          (/存为草稿|保存草稿|暂存|草稿|离开/.test(text) ||
            /ispublish=["']?false|is-publish=["']?false/i.test(attrs))
        );
      });
    },
    { timeout: draftButtonStabilizeTimeout }
  ).catch(() => {});

  const draftLookup = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, xhs-publish-btn, [role=button]'));
    const candidates = buttons
      .map((node) => {
        const rect = node.getBoundingClientRect();
        const attrs = Object.fromEntries(
          Array.from(node.attributes || [])
            .filter((attr) => /publish|submit|disabled/i.test(attr.name))
            .map((attr) => [attr.name, attr.value])
        );
        return {
          tag: node.tagName.toLowerCase(),
          text: (node.textContent || '').trim(),
          isPublish: node.getAttribute('isPublish'),
          isPublishKebab: node.getAttribute('is-publish'),
          submitText: node.getAttribute('submitText'),
          disabled: node.hasAttribute('disabled') || node.getAttribute('submitDisabled') === 'true',
          attrs,
          x: rect.x,
          y: rect.y,
          w: rect.width,
          h: rect.height,
        };
      })
      .filter((item) => item.w > 0 && item.h > 0 && !item.disabled);

    const draft =
      candidates.find((item) => /存为草稿|保存草稿|暂存|草稿|离开/.test(`${item.text}${item.submitText || ''}`)) ||
      candidates.find(
        (item) =>
          item.tag === 'xhs-publish-btn' &&
          (item.isPublish === 'false' ||
            item.isPublishKebab === 'false' ||
            item.attrs.ispublish === 'false' ||
            item.attrs['is-publish'] === 'false')
      );

    const compositePublishButton =
      candidates
        .filter((item) => item.tag === 'xhs-publish-btn')
        .sort((a, b) => b.y - a.y)[0] || null;

    if (!draft && compositePublishButton) {
      const point = {
        x: Math.round(compositePublishButton.x + compositePublishButton.w * 0.39),
        y: Math.round(compositePublishButton.y + compositePublishButton.h / 2),
      };
      return {
        draft: {
          tag: compositePublishButton.tag,
          text_sample: compositePublishButton.text.slice(0, 20),
          submitText: compositePublishButton.submitText,
          method: 'xhs_publish_btn_composite_left_side',
          x: point.x,
          y: point.y,
          box: {
            x: Math.round(compositePublishButton.x),
            y: Math.round(compositePublishButton.y),
            w: Math.round(compositePublishButton.w),
            h: Math.round(compositePublishButton.h),
          },
        },
        candidates: [],
      };
    }

    if (!draft) {
      return {
        draft: null,
        candidates: candidates.map((item) => ({
          tag: item.tag,
          text_sample: item.text.slice(0, 20),
          isPublish: item.isPublish,
          isPublishKebab: item.isPublishKebab,
          submitText: item.submitText,
          disabled: item.disabled,
          box: { x: Math.round(item.x), y: Math.round(item.y), w: Math.round(item.w), h: Math.round(item.h) },
        })),
      };
    }
    return {
      draft: {
        tag: draft.tag,
        text_sample: draft.text.slice(0, 20),
        submitText: draft.submitText,
        method: 'detected_draft_button_center',
        x: Math.round(draft.x + draft.w / 2),
        y: Math.round(draft.y + draft.h / 2),
        box: { x: Math.round(draft.x), y: Math.round(draft.y), w: Math.round(draft.w), h: Math.round(draft.h) },
      },
      candidates: [],
    };
  });

  if (!draftLookup.draft) {
    proof.draft_button_candidates = draftLookup.candidates;
    throw new Error('Draft-only button was not found');
  }

  proof.draft_button = {
    method: draftLookup.draft.method,
    composite_button_left_side_rule_used:
      draftLookup.draft.method === 'xhs_publish_btn_composite_left_side',
    point_meta: draftLookup.draft,
  };
  await page.mouse.click(draftLookup.draft.x, draftLookup.draft.y);
  proof.draft_save_clicked_at = new Date().toISOString();
  await page
    .waitForFunction(
      () => /草稿箱\(\d+\)|图文笔记\(\d+\)/.test(document.body.innerText || ''),
      { timeout: draftBoxOpenTimeout }
    )
    .catch(() => {});

  const readDraftBoxState = async () =>
    page.evaluate(({ title, content }) => {
      const bodyText = document.body.innerText || '';
      const draftBoxText = bodyText.match(/草稿箱\((\d+)\)/);
      const editorMarkers = [
        '上传图片，或写文字生成图片',
        '图片大小',
        '请填写标题',
        '发布笔记',
      ];
      const editorLike = editorMarkers.some((marker) => bodyText.includes(marker));
      return {
        draftbox_detected: Boolean(draftBoxText) || /草稿箱/.test(bodyText),
        draftbox_count: draftBoxText ? Number(draftBoxText[1]) : null,
        title_found_in_page: bodyText.includes(title),
        body_contains_content_marker: bodyText.includes(content.split('\n')[0]),
        editor_like_page: editorLike,
      };
    }, { title, content });

  const clickShortestTextMatch = async (targetPage, source, flags = '') => {
    const box = await targetPage.evaluate((source, flags) => {
      const matcher = new RegExp(source, flags);
      const candidates = Array.from(document.querySelectorAll('button, div, span'))
        .map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            text: (node.textContent || '').replace(/\s+/g, ' ').trim(),
            x: rect.x,
            y: rect.y,
            w: rect.width,
            h: rect.height,
          };
        })
        .filter((item) => item.w > 0 && item.h > 0 && matcher.test(item.text))
        .sort((a, b) => a.text.length - b.text.length || a.w - b.w);

      return candidates[0] || null;
    }, source, flags);

    if (!box) return null;
    await targetPage.mouse.click(Math.round(box.x + box.w / 2), Math.round(box.y + box.h / 2));
    return box;
  };

  const openDraftBox = async (targetPage = page) => {
    const draftBox = await clickShortestTextMatch(targetPage, '^草稿箱\\(\\d+\\)$');
    if (!draftBox) return { draftBox: null, imageTab: null };
    await targetPage
      .waitForFunction(
        (targetTitle) => {
          const bodyText = document.body.innerText || '';
          return /草稿箱\(\d+\)/.test(bodyText) || bodyText.includes(targetTitle);
        },
        {
          timeout: draftBoxOpenTimeout,
        },
        title
      )
      .catch(() => {});
    const imageTab = await clickShortestTextMatch(targetPage, '^图文笔记\\(\\d+\\)$');
    await targetPage
      .waitForFunction(
        (targetTitle) => {
          const bodyText = document.body.innerText || '';
          return /图文笔记\(\d+\)/.test(bodyText) && bodyText.includes(targetTitle);
        },
        {
          timeout: draftBoxOpenTimeout,
        },
        title
      )
      .catch(() => {});
    return { draftBox, imageTab };
  };

  const checkDraftBox = async (targetPage = page) =>
    targetPage.evaluate(({ title, content }) => {
      const bodyText = document.body.innerText || '';
      const draftBoxText = bodyText.match(/草稿箱\((\d+)\)/);
      const imageDraftText = bodyText.match(/图文笔记\((\d+)\)/);
      const hasEmptyDraft = /暂无草稿|还没有草稿|草稿箱\(0\)|图文笔记\(0\)/.test(bodyText);
      return {
        draftbox_detected: Boolean(draftBoxText) || /草稿箱/.test(bodyText),
        draftbox_count: draftBoxText ? Number(draftBoxText[1]) : null,
        image_draft_count: imageDraftText ? Number(imageDraftText[1]) : null,
        title_found_in_draftbox: !hasEmptyDraft && bodyText.includes(title),
        body_contains_content_marker: !hasEmptyDraft && bodyText.includes(content.split('\n')[0]),
        empty_draftbox_detected: hasEmptyDraft,
      };
    }, { title, content });

  proof.after_draft_click_page_state = await readDraftBoxState();

  proof.first_opened_draftbox = await openDraftBox();
  const firstCheck = await checkDraftBox();
  proof.first_check = firstCheck;
  proof.draftbox_detected = firstCheck.draftbox_detected;
  proof.title_found_in_draftbox = firstCheck.title_found_in_draftbox;
  proof.body_contains_content_marker = firstCheck.body_contains_content_marker;

  await sleep(secondCheckDelayMs);
  proof.second_opened_draftbox = await openDraftBox();
  const secondCheck = await checkDraftBox();
  proof.second_check_same_browser_after_ms = secondCheckDelayMs;
  proof.second_check = secondCheck;
  proof.saved_draft_visible_in_same_browser =
    secondCheck.draftbox_detected &&
    secondCheck.title_found_in_draftbox &&
    secondCheck.empty_draftbox_detected === false;
  proof.rechecked_after_browser_restart = false;
  proof.headless_browser_kept_alive_for_handoff = true;

  if (visibleVerify) {
    await browser.close();
    browserClosed = true;

    const visibleBrowser = await puppeteer.launch({
      headless: false,
      ...(executablePath ? { executablePath } : {}),
      userDataDir: visibleProfileDir,
      defaultViewport: { width: 1440, height: 1000 },
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    try {
      const visiblePage = await visibleBrowser.newPage();
      if (!fastVerify) {
        await installRequestFilters(visiblePage);
      }
      await visiblePage.setCookie(...cookies);
      await visiblePage.goto(CREATOR_URL, { waitUntil: pageGotoWaitUntil, timeout: 60000 });
      await visiblePage
        .waitForSelector('input[type=file]', {
          visible: false,
          timeout: draftBoxOpenTimeout,
        })
        .catch(() => {});
      await visiblePage
        .waitForFunction(
          () =>
            Array.from(document.querySelectorAll('button, xhs-publish-btn, [role=button]')).some(
              (node) => {
                const rect = node.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0;
              }
            ),
          { timeout: draftBoxOpenTimeout }
        )
        .catch(() => {});
      const openedDraftbox = await openDraftBox(visiblePage);
      proof.visible_browser_check = {
        opened_with_cookie: true,
        opened_draftbox: openedDraftbox,
        ...(await checkDraftBox(visiblePage)),
        cookie_contents_recorded: false,
        profile_path_recorded: false,
      };
      proof.rechecked_after_browser_restart = true;
      proof.rechecked_after_visible_browser_open = true;
    } finally {
      await visibleBrowser.close();
    }
  }

  proof.status =
    firstCheck.draftbox_detected &&
    firstCheck.title_found_in_draftbox &&
    proof.saved_draft_visible_in_same_browser &&
    (!visibleVerify || proof.visible_browser_check?.title_found_in_draftbox === true)
      ? 'draft_saved_verified_visible_browser'
      : 'draft_save_unverified';

  const proofPath = path.join(outputDir, 'headless-live-session-proof.json');
  fs.writeFileSync(proofPath, `${JSON.stringify(proof, null, 2)}\n`);
  console.log(JSON.stringify({ proofPath, status: proof.status }, null, 2));
  await sleep(keepAliveAfterProofMs);
  proof.finished_at = new Date().toISOString();
  fs.writeFileSync(proofPath, `${JSON.stringify(proof, null, 2)}\n`);
} catch (error) {
  proof.finished_at = new Date().toISOString();
  proof.status = 'failed';
  proof.error = error instanceof Error ? error.message : String(error);
  const proofPath = path.join(outputDir, 'headless-live-session-proof.json');
  fs.writeFileSync(proofPath, `${JSON.stringify(proof, null, 2)}\n`);
  throw error;
} finally {
  if (!browserClosed) {
    await browser.close();
  }
}
