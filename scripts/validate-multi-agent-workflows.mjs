import fs from 'node:fs';
import path from 'node:path';

import { validateMultiAgentWorkflowFile } from './lib/multi-agent-workflow-validation.mjs';

const root = process.cwd();
const workflowDir = path.join(root, 'workflows', 'multi-agent');

function listWorkflowFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.workflow.json'))
    .map((name) => path.join(dir, name));
}

const files = listWorkflowFiles(workflowDir);
const failures = [];

if (files.length === 0) {
  failures.push('no multi-agent workflow assets found under workflows/multi-agent/*.workflow.json');
}

for (const file of files) {
  const result = validateMultiAgentWorkflowFile(file);
  if (!result.ok) {
    failures.push(...result.errors);
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify({
    status: 'failed',
    checked_files: files.map((file) => path.relative(root, file)),
    failures,
  }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  checked_files: files.map((file) => path.relative(root, file)),
}, null, 2));
