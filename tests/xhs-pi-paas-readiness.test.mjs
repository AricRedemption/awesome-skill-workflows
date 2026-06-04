import test from 'node:test';
import assert from 'node:assert/strict';

import { evaluateXhsPiPaasReadiness } from '../scripts/lib/xhs-pi-paas-readiness.mjs';

test('accepts the XHS workflow for PaaS progression from real-run evidence', async () => {
  const result = await evaluateXhsPiPaasReadiness({
    rootDir: process.cwd(),
  });

  assert.equal(result.status, 'passed');
  assert.equal(result.readiness_level, 'accepted_for_paas');
  assert.equal(result.human_review_acceptance.verdict, 'accepted_for_paas');
  assert.equal(result.technical_validation.status, 'partial');
  assert.equal(result.technical_validation.final_terminal_state, 'blocked');
  assert.equal(result.checks.clicked_publish_false, true);
  assert.equal(result.checks.same_browser_draft_visible, true);
  assert.equal(result.checks.repeated_draftbox_hits, true);
  assert.deepEqual(result.failed_checks, []);
});
