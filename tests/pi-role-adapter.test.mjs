import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { runMultiAgentWorkflow } from '../scripts/lib/multi-agent-workflow-runtime.mjs';
import {
  createPiFauxHarness,
  createPiRoleExecutor,
} from '../scripts/lib/pi-role-adapter.mjs';

const root = process.cwd();

function readWorkflow() {
  return JSON.parse(
    fs.readFileSync(
      path.join(
        root,
        'workflows/multi-agent/pi-single-problem-review-gated.workflow.json',
      ),
      'utf8',
    ),
  );
}

test('Pi faux adapter executes a single role prompt through real Pi session', async () => {
  const harness = createPiFauxHarness();

  try {
    harness.enqueueJsonResponse({
      role_id: 'planner',
      decision: 'planned',
      handoff: {
        plan: 'use selected skills',
      },
      evidence: ['plan summary', 'selected skills', 'handoff package'],
    });

    const executor = createPiRoleExecutor({
      harness,
      roleId: 'planner',
      systemPrompt: 'You are the planner role.',
      taskBuilder: () => 'Build a bounded plan.',
    });

    const result = await executor({
      state: {
        review_requested: false,
        worker_runs: 0,
      },
      events: [],
      node: {
        node_id: 'plan-work',
      },
    });

    assert.equal(result.role_id, 'planner');
    assert.equal(result.decision, 'planned');
    assert.equal(result.handoff.plan, 'use selected skills');
  } finally {
    harness.dispose();
  }
});

test('Pi faux adapter drives the full workflow through real Pi sessions', async () => {
  const workflow = readWorkflow();
  const harness = createPiFauxHarness();

  try {
    harness.enqueueJsonResponse({
      role_id: 'planner',
      decision: 'planned',
      handoff: { plan: 'bounded plan' },
      evidence: ['plan summary', 'selected skills', 'handoff package'],
    });
    harness.enqueueJsonResponse({
      role_id: 'worker',
      decision: 'implemented',
      handoff: { artifact_version: 1 },
      evidence: ['primary artifacts', 'execution notes', 'worker handoff'],
    });
    harness.enqueueJsonResponse({
      role_id: 'reviewer',
      decision: 'revision_required',
      handoff: { findings: ['tighten evidence'] },
      evidence: ['review report', 'revision decision'],
    });
    harness.enqueueJsonResponse({
      role_id: 'worker',
      decision: 'implemented',
      handoff: { artifact_version: 2 },
      evidence: ['revised artifacts', 'revision notes'],
    });
    harness.enqueueJsonResponse({
      role_id: 'reviewer',
      decision: 'approved',
      handoff: { findings: [] },
      evidence: ['review report', 'revision decision'],
    });
    harness.enqueueJsonResponse({
      role_id: 'verifier',
      decision: 'passed',
      terminal_state: 'passed',
      handoff: { summary: 'gates passed' },
      evidence: ['verification report', 'terminal state', 'gate ledger'],
    });

    const executors = {
      planner: createPiRoleExecutor({
        harness,
        roleId: 'planner',
        systemPrompt: 'You are the planner role.',
        taskBuilder: () => 'Plan the workflow.',
      }),
      worker: createPiRoleExecutor({
        harness,
        roleId: 'worker',
        systemPrompt: 'You are the worker role.',
        taskBuilder: ({ state }) => `Execute the workflow. Worker runs: ${state.worker_runs}.`,
      }),
      reviewer: createPiRoleExecutor({
        harness,
        roleId: 'reviewer',
        systemPrompt: 'You are the reviewer role.',
        taskBuilder: ({ state }) => `Review the latest artifact. Revision requested: ${state.review_requested}.`,
      }),
      verifier: createPiRoleExecutor({
        harness,
        roleId: 'verifier',
        systemPrompt: 'You are the verifier role.',
        taskBuilder: () => 'Verify terminal state and writeback eligibility.',
      }),
    };

    const result = await runMultiAgentWorkflow(workflow, executors);

    assert.equal(result.terminal_state, 'passed');
    assert.equal(result.writeback_allowed, true);
    assert.equal(result.state.worker_runs, 2);
  } finally {
    harness.dispose();
  }
});
