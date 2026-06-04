#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const CREATOR_URL =
  'https://creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image';

const require = createRequire(import.meta.url);
const puppeteerPackage = process.env.XHS_PUPPETEER_PACKAGE || 'puppeteer';
const puppeteer = require(puppeteerPackage);

const cookieFile =
  process.env.XHS_COOKIE_FILE || path.join(os.homedir(), '.xhs-mcp', 'cookies.json');
const profileDir =
  process.env.XHS_PROFILE_DIR ||
  path.join(os.homedir(), '.xhs-headless-draft-profiles', 'awesome-skill-workflows');
const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
const remoteDebuggingPort = Number(process.env.XHS_REMOTE_DEBUGGING_PORT || 9345);
const openViaChromeCli = process.env.XHS_OPEN_VIA_CHROME_CLI === '1';
const openDraftBox = process.env.XHS_OPEN_DRAFTBOX === '1';

const cookies = JSON.parse(fs.readFileSync(cookieFile, 'utf8'));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const waitForDebugEndpoint = async () => {
  const endpoint = `http://127.0.0.1:${remoteDebuggingPort}/json/version`;
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return;
    } catch {}
    await sleep(300);
  }
  throw new Error(`Chrome remote debugging endpoint did not open on port ${remoteDebuggingPort}`);
};

let browser;
if (openViaChromeCli) {
  const chromeArgs = [
    '-na',
    'Google Chrome',
    '--args',
    `--user-data-dir=${profileDir}`,
    `--remote-debugging-port=${remoteDebuggingPort}`,
    '--new-window',
    'about:blank',
  ];
  spawn('open', chromeArgs, { detached: true, stdio: 'ignore' }).unref();
  await waitForDebugEndpoint();
  browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${remoteDebuggingPort}`,
    defaultViewport: { width: 1440, height: 1000 },
  });
} else {
  browser = await puppeteer.launch({
    headless: false,
    ...(executablePath ? { executablePath } : {}),
    userDataDir: profileDir,
    defaultViewport: { width: 1440, height: 1000 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--new-window'],
  });
}

const pages = await browser.pages();
const page = openViaChromeCli && pages.length > 0 ? pages[0] : await browser.newPage();
await page.setCookie(...cookies);
await page.goto(CREATOR_URL, { waitUntil: 'networkidle2', timeout: 60000 });
await page.bringToFront();

const clickShortestTextMatch = async (source, flags = '') => {
  const box = await page.evaluate((source, flags) => {
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
  await page.mouse.click(Math.round(box.x + box.w / 2), Math.round(box.y + box.h / 2));
  return box;
};

let openedDraftbox = null;
if (openDraftBox) {
  const draftBox = await clickShortestTextMatch('^草稿箱\\(\\d+\\)$');
  await sleep(1000);
  const imageTab = await clickShortestTextMatch('^图文笔记\\(\\d+\\)$');
  await sleep(2000);
  openedDraftbox = { draftBox, imageTab };
}

const state = await page.evaluate(() => ({
  url: location.href,
  uploadInputFound: Boolean(document.querySelector('input[type=file]')),
  loginPromptDetected: /登录|验证码|扫码/.test(document.body.innerText || ''),
  draftboxDetected: /草稿箱/.test(document.body.innerText || ''),
}));

console.log(
  JSON.stringify(
    {
      status: 'visible_browser_opened_with_cookie',
      cookie_contents_recorded: false,
      profile_path_recorded: false,
      openedDraftbox,
      ...state,
    },
    null,
    2
  )
);

if (openViaChromeCli) {
  browser.disconnect();
} else {
  await new Promise(() => {});
}
