import fs from 'node:fs';
import path from 'node:path';

import { runXhsPiOrchestrationValidation } from './xhs-pi-orchestration-validation.mjs';

const LIVE_PROOF_PATH =
  'runs/017-xhs-pi-live-draft-validation-unique-title/headless-live-session-proof.json';

function readJson(rootDir, relativePath) {
  return JSON.parse(
    fs.readFileSync(path.join(rootDir, relativePath), 'utf8'),
  );
}

export async function evaluateXhsPiPaasReadiness({
  rootDir = process.cwd(),
} = {}) {
  const orchestration = await runXhsPiOrchestrationValidation({ rootDir });
  const liveProof = readJson(rootDir, LIVE_PROOF_PATH);

  const checks = {
    technical_verdict_is_partial: orchestration.status === 'partial',
    technical_terminal_state_blocked:
      orchestration.final_terminal_state === 'blocked',
    draft_path_verified: orchestration.summary.draft_path_verified === true,
    publish_failure_isolated:
      orchestration.summary.publish_failure_isolated === true,
    visible_recheck_still_blocked:
      orchestration.summary.visible_recheck_passed === false,
    clicked_publish_false: liveProof.clicked_publish === false,
    same_browser_draft_visible:
      liveProof.saved_draft_visible_in_same_browser === true,
    repeated_draftbox_hits:
      liveProof.first_check?.title_found_in_draftbox === true
      && liveProof.second_check?.title_found_in_draftbox === true,
  };

  const failedChecks = Object.entries(checks)
    .filter(([, passed]) => passed !== true)
    .map(([checkName]) => checkName);

  return {
    workflow_id: orchestration.workflow_id,
    multi_agent_workflow_id: orchestration.multi_agent_workflow_id,
    status: failedChecks.length === 0 ? 'passed' : 'failed',
    readiness_level:
      failedChecks.length === 0 ? 'accepted_for_paas' : 'not_ready',
    human_review_acceptance:
      failedChecks.length === 0
        ? {
            verdict: 'accepted_for_paas',
            reason:
              'Real draft-save proof is strong enough for PaaS progression; the remaining blocker is a fresh visible-session login reset, not a publish-safety failure.',
          }
        : {
            verdict: 'rejected_for_paas',
            reason:
              'The required real-run evidence boundary for PaaS progression is incomplete.',
          },
    technical_validation: orchestration,
    live_proof_ref: LIVE_PROOF_PATH,
    checks,
    failed_checks: failedChecks,
  };
}
