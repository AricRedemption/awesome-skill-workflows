import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from '/Users/aricredemption/.npm/_npx/2b1491c8b2764d40/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const runDir = '/Users/aricredemption/Projects/awesome-skill-workflows/runs/001-xhs-ai-agent-save-one-hour';
const userDataDir = path.join(runDir, '.xhs-creator-profile');
const cookiesPath = path.join(runDir, 'xhs-creator-cookies.json');
const screenshotPath = path.join(runDir, 'xhs-creator-login-result.png');
const publishUrl = 'https://creator.xiaohongshu.com/publish/publish?source=official&from=menu&target=image';

await fs.mkdir(userDataDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: false,
  userDataDir,
  defaultViewport: { width: 1440, height: 1000 },
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.goto(publishUrl, { waitUntil: 'domcontentloaded', timeout: 90_000 });

console.log(JSON.stringify({
  status: 'waiting_for_creator_login',
  instruction: 'localized text.localized text.',
  target: publishUrl,
}, null, 2));

const deadline = Date.now() + 10 * 60 * 1000;
let lastState = null;

while (Date.now() < deadline) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  lastState = await page.evaluate(() => {
    const bodyText = document.body?.innerText || '';
    return {
      url: location.href,
      title: document.title,
      hasLoginText: bodyText.includes('localized text') || bodyText.includes('localized text localized text'),
      hasPublishText: bodyText.includes('localized text') || bodyText.includes('localized text') || bodyText.includes('localized text'),
      bodyTextSample: bodyText.slice(0, 500),
    };
  }).catch((error) => ({ error: String(error), url: page.url() }));

  if (
    lastState.url?.includes('/publish/publish') &&
    !lastState.hasLoginText &&
    lastState.hasPublishText
  ) {
    const cookies = await page.cookies();
    await fs.writeFile(cookiesPath, JSON.stringify(cookies, null, 2));
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(JSON.stringify({
      status: 'creator_login_ready',
      url: lastState.url,
      cookiesPath,
      screenshotPath,
      cookieDomains: [...new Set(cookies.map((cookie) => cookie.domain))],
    }, null, 2));
    await browser.close();
    process.exit(0);
  }
}

await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
console.error(JSON.stringify({
  status: 'creator_login_timeout',
  lastState,
  screenshotPath,
}, null, 2));
await browser.close();
process.exit(1);
