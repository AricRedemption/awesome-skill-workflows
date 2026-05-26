import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function listTrackedFiles() {
  try {
    return execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
}

const trackedFiles = listTrackedFiles();
const failures = [];
const warnings = [];

const forbiddenTrackedPathPatterns = [
  /(^|\/)\.xhs-creator-profile(\/|$)/,
  /(^|\/)\.xhs-headless-draft-profiles(\/|$)/,
  /(^|\/)[^/]*cookies?[^/]*\.json$/i,
  /(^|\/)\.env(\.|$)/,
  /\.(pem|key)$/i
];

for (const file of trackedFiles) {
  if (forbiddenTrackedPathPatterns.some((pattern) => pattern.test(file))) {
    failures.push(`${file} is tracked but matches a secret or private-runtime path`);
  }
}

const reusableAssetPrefixes = [
  'workflow-kb/',
  'verified-recipes/',
  'failed-recipes/',
  'evolution/',
  'reports/'
];

const reusableAssetFiles = trackedFiles.filter((file) =>
  reusableAssetPrefixes.some((prefix) => file.startsWith(prefix)) &&
  /\.(md|json)$/.test(file)
);

const sensitiveValuePatterns = [
  {
    name: 'cookie assignment',
    pattern: /"?(?:cookie|cookies|session|token|authorization)"?\s*[:=]\s*["'][^"']{12,}/i
  },
  {
    name: 'local browser profile path',
    pattern: /\/Users\/[^/\s]+\/[^"`'\n]*(?:Chrome|\.xhs-creator-profile|\.xhs-headless-draft-profiles|cookies?\.json)/i
  },
  {
    name: 'private key block',
    pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/
  }
];

for (const file of reusableAssetFiles) {
  if (!fs.existsSync(path.join(root, file))) continue;
  const text = readText(file);
  for (const { name, pattern } of sensitiveValuePatterns) {
    if (pattern.test(text)) {
      failures.push(`${file} contains ${name}`);
    }
  }
}

const kbIndexPath = 'workflow-kb/retrieval-index.json';
if (trackedFiles.includes(kbIndexPath)) {
  const kbIndex = readJson(kbIndexPath);
  for (const record of kbIndex.records ?? []) {
    if (!record.sensitive_data_status) {
      warnings.push(`KB record ${record.id} is missing sensitive_data_status`);
    }
    if (!Array.isArray(record.evidence_refs) || record.evidence_refs.length === 0) {
      warnings.push(`KB record ${record.id} is missing evidence_refs`);
    }
  }
}

const legacyRunFiles = trackedFiles.filter((file) =>
  file.startsWith('runs/') &&
  /\.(mjs|json|md)$/.test(file)
);

for (const file of legacyRunFiles) {
  if (!fs.existsSync(path.join(root, file))) continue;
  const text = readText(file);
  if (/\/Users\/[^/\s]+\/[^"`'\n]*(?:cookies?\.json|\.xhs-creator-profile)/i.test(text)) {
    warnings.push(`${file} contains a legacy local path; do not copy it into reusable assets`);
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify({ status: 'failed', failures, warnings }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  checks: [
    'no tracked secret/private-runtime path files',
    'no obvious secret values in reusable assets',
    'knowledge-base records checked for evidence and sensitive-data metadata',
    'legacy run local paths reported as warnings only'
  ],
  warning_count: warnings.length,
  warnings
}, null, 2));
