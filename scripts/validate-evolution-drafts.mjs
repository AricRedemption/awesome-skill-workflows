import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const draftRoots = [
  'evolution-drafts/pending',
  'evolution-drafts/approved',
  'evolution-drafts/rejected'
];

const requiredFields = [
  'Proposal-ID',
  'Status',
  'Signature',
  'Target-File',
  'Trigger-Type',
  'Confidence'
];

const requiredSections = [
  '## Why This Matters',
  '## Evidence',
  '## Duplicate Check',
  '## Proposed Change',
  '## Apply Plan',
  '## Validation Plan'
];

function listDrafts(dir) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute)
    .filter((file) => file.endsWith('.md') && file !== '.gitkeep')
    .map((file) => path.join(dir, file));
}

const failures = [];
const signatures = new Map();

for (const dir of draftRoots) {
  for (const file of listDrafts(dir)) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    for (const field of requiredFields) {
      if (!new RegExp(`^- ${field}:\\s*\\S`, 'm').test(text)) {
        failures.push(`${file} missing ${field}`);
      }
    }
    for (const section of requiredSections) {
      if (!text.includes(section)) {
        failures.push(`${file} missing section ${section}`);
      }
    }
    const signature = text.match(/^- Signature:\s*([a-z0-9-]+)/m)?.[1];
    if (signature) {
      const existing = signatures.get(signature);
      if (existing) {
        failures.push(`${file} duplicates signature ${signature} from ${existing}`);
      } else {
        signatures.set(signature, file);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify({ status: 'failed', failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  checked_drafts: signatures.size
}, null, 2));
