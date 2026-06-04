import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  extractWorkflowJsonFromMarkdown,
  runXhsPiOrchestrationValidation,
  validateXhsWorkflowDefinition,
} from '../scripts/lib/xhs-pi-orchestration-validation.mjs';

const root = process.cwd();

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('extracts the embedded XHS workflow JSON from markdown', () => {
  const workflow = extractWorkflowJsonFromMarkdown(
    readText('workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md'),
  );

  assert.equal(workflow.id, 'xhs-ai-tool-topic-to-post');
  assert.equal(workflow.steps.length, 22);
});

test('validates XHS workflow step count and gate ordering', () => {
  const workflow = extractWorkflowJsonFromMarkdown(
    readText('workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md'),
  );

  const result = validateXhsWorkflowDefinition(workflow);

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test('runs Pi-backed XHS orchestration validation from existing run evidence', async () => {
  const result = await runXhsPiOrchestrationValidation({
    rootDir: root,
  });

  assert.equal(result.status, 'partial');
  assert.equal(result.workflow_id, 'xhs-ai-tool-topic-to-post');
  assert.equal(result.multi_agent_workflow_id, 'pi-single-problem-review-gated');
  assert.equal(result.final_terminal_state, 'blocked');
  assert.equal(result.writeback_allowed, false);
  assert.equal(result.summary.workflow_step_count, 22);
  assert.equal(result.summary.draft_path_verified, true);
  assert.equal(result.summary.publish_failure_isolated, true);
  assert.equal(result.summary.visible_recheck_passed, false);
});
