import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { runMultiAgentWorkflow } from '../scripts/lib/multi-agent-workflow-runtime.mjs';

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

function createHappyPathExecutors() {
  let reviewCalls = 0;

  return {
    planner: async () => ({
      role_id: 'planner',
      decision: 'planned',
      handoff: {
        plan: 'use the selected skills',
      },
      evidence: ['plan summary', 'selected skills', 'handoff package'],
    }),
    worker: async ({ state }) => ({
      role_id: 'worker',
      decision: 'implemented',
      handoff: {
        artifact_version: state.worker_runs + 1,
      },
      evidence: state.review_requested
        ? ['revised artifacts', 'revision notes']
        : ['primary artifacts', 'execution notes', 'worker handoff'],
    }),
    reviewer: async () => {
      reviewCalls += 1;
      if (reviewCalls === 1) {
        return {
          role_id: 'reviewer',
          decision: 'revision_required',
          handoff: {
            findings: ['tighten evidence package'],
          },
          evidence: ['review report', 'revision decision'],
        };
      }

      return {
        role_id: 'reviewer',
        decision: 'approved',
        handoff: {
          findings: [],
        },
        evidence: ['review report', 'revision decision'],
      };
    },
    verifier: async () => ({
      role_id: 'verifier',
      decision: 'passed',
      terminal_state: 'passed',
      handoff: {
        summary: 'all gates passed',
      },
      evidence: ['verification report', 'terminal state', 'gate ledger'],
    }),
  };
}

test('runtime executes review loop and allows writeback only after passed', async () => {
  const result = await runMultiAgentWorkflow(
    readWorkflow(),
    createHappyPathExecutors(),
  );

  assert.equal(result.terminal_state, 'passed');
  assert.equal(result.writeback_allowed, true);
  assert.equal(result.state.review_requested, false);
  assert.equal(result.state.worker_runs, 2);
  assert.equal(
    result.events.filter((event) => event.role_id === 'reviewer').length,
    2,
  );
});

test('runtime blocks writeback when verifier does not pass', async () => {
  const executors = createHappyPathExecutors();
  executors.verifier = async () => ({
    role_id: 'verifier',
    decision: 'blocked',
    terminal_state: 'blocked',
    handoff: {
      summary: 'missing evidence',
    },
    evidence: ['verification report', 'terminal state', 'gate ledger'],
  });

  const result = await runMultiAgentWorkflow(readWorkflow(), executors);

  assert.equal(result.terminal_state, 'blocked');
  assert.equal(result.writeback_allowed, false);
});

test('runtime fails when reviewer never clears within loop cap', async () => {
  const executors = createHappyPathExecutors();
  executors.reviewer = async () => ({
    role_id: 'reviewer',
    decision: 'revision_required',
    handoff: {
      findings: ['still broken'],
    },
    evidence: ['review report', 'revision decision'],
  });

  await assert.rejects(
    () => runMultiAgentWorkflow(readWorkflow(), executors),
    /loop cap/i,
  );
});
