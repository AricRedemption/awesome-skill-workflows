import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  validateMultiAgentWorkflow,
  validateMultiAgentWorkflowFile,
} from '../scripts/lib/multi-agent-workflow-validation.mjs';

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(
    fs.readFileSync(path.join(root, relativePath), 'utf8'),
  );
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test('schema exposes the multi-agent workflow contract', () => {
  const schema = readJson('schemas/multi-agent-skill-workflow.schema.json');

  assert.equal(schema.title, 'MultiAgentSkillWorkflow');
  assert.deepEqual(schema.required, [
    'id',
    'workflow_type',
    'goal',
    'roles',
    'nodes',
    'review_gate',
    'writeback',
    'success_criteria',
  ]);
  assert.deepEqual(schema.properties.workflow_type.enum, [
    'multi_agent_skill_workflow',
  ]);
  assert.deepEqual(schema.$defs.node.properties.node_type.enum, [
    'spawn',
    'sequence',
    'fork',
    'join',
    'loop',
  ]);
});

test('repository multi-agent workflow asset validates cleanly', () => {
  const result = validateMultiAgentWorkflowFile(
    path.join(root, 'workflows/multi-agent/pi-single-problem-review-gated.workflow.json'),
  );

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test('validator rejects workflows that omit the verifier role', () => {
  const workflow = readJson(
    'workflows/multi-agent/pi-single-problem-review-gated.workflow.json',
  );

  workflow.roles = workflow.roles.filter((role) => role.role_id !== 'verifier');

  const result = validateMultiAgentWorkflow(workflow, 'missing-verifier');

  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /verifier role/i);
});

test('validator rejects non-hard review gates', () => {
  const workflow = clone(
    readJson('workflows/multi-agent/pi-single-problem-review-gated.workflow.json'),
  );

  workflow.review_gate.mode = 'advisory';

  const result = validateMultiAgentWorkflow(workflow, 'soft-review');

  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /hard gate/i);
});

test('validator rejects unbounded loop nodes', () => {
  const workflow = clone(
    readJson('workflows/multi-agent/pi-single-problem-review-gated.workflow.json'),
  );

  workflow.nodes.push({
    node_id: 'unbounded-review-loop',
    node_type: 'loop',
    body: {
      node_id: 'retry-worker',
      node_type: 'spawn',
      role_id: 'worker',
      skill_refs: ['workflow-execution'],
      handoff_contract: 'revision package',
      evidence_required: ['updated artifacts'],
      gate_effect: 'rework_only',
      run_mode_effect: 'none',
    },
  });

  const result = validateMultiAgentWorkflow(workflow, 'unbounded-loop');

  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /loop_cap/i);
});

test('validator rejects writeback on non-passed terminal states', () => {
  const workflow = clone(
    readJson('workflows/multi-agent/pi-single-problem-review-gated.workflow.json'),
  );

  workflow.writeback.allowed_terminal_states = ['passed', 'revision_required'];

  const result = validateMultiAgentWorkflow(workflow, 'invalid-writeback');

  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /allowed_terminal_states/i);
});
