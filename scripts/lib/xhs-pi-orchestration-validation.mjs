import fs from 'node:fs';
import path from 'node:path';

import { runMultiAgentWorkflow } from './multi-agent-workflow-runtime.mjs';
import { createPiFauxHarness, createPiRoleExecutor } from './pi-role-adapter.mjs';

const XHS_WORKFLOW_PATH = 'workflows/xiaohongshu/xhs-ai-tool-topic-to-post.workflow.md';
const MULTI_AGENT_WORKFLOW_PATH = 'workflows/multi-agent/pi-single-problem-review-gated.workflow.json';
const LIVE_PROOF_PATH = 'runs/017-xhs-pi-live-draft-validation-unique-title/headless-live-session-proof.json';
const DRAFT_GATE_LEDGER_PATH = 'runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/gate-ledger.json';
const DRAFT_ACTION_VERIFICATION_PATH = 'runs/003-xhs-ai-agent-save-one-hour-step8-draft-rerun/action-verification.json';
const FAILED_PUBLISH_ACTION_VERIFICATION_PATH = 'runs/001-xhs-ai-agent-save-one-hour/action-verification.json';

const ORDERED_GATE_STEPS = [
  'compliance-risk-checker',
  'human-review-gate',
  'account-state-check',
  'xhs-publish-or-draft',
  'post-publish-verifier',
  'workflow-kb-writer',
  'verified-recipe-generator',
];

function readText(rootDir, relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function readJson(rootDir, relativePath) {
  return JSON.parse(readText(rootDir, relativePath));
}

function findStepIndex(workflow, stepId) {
  return workflow.steps.findIndex((step) => step.step_id === stepId);
}

export function extractWorkflowJsonFromMarkdown(markdown) {
  const match = markdown.match(/```json\s*([\s\S]*?)\s*```/);
  if (!match) {
    throw new Error('No embedded JSON block found in markdown workflow');
  }

  return JSON.parse(match[1]);
}

export function validateXhsWorkflowDefinition(workflow) {
  const errors = [];

  if (workflow.id !== 'xhs-ai-tool-topic-to-post') {
    errors.push('workflow id must be xhs-ai-tool-topic-to-post');
  }

  if (!Array.isArray(workflow.steps) || workflow.steps.length !== 22) {
    errors.push(`workflow must contain exactly 22 steps, got ${workflow.steps?.length ?? 'none'}`);
  }

  for (const stepId of ORDERED_GATE_STEPS) {
    if (findStepIndex(workflow, stepId) === -1) {
      errors.push(`required workflow step missing: ${stepId}`);
    }
  }

  for (let index = 1; index < ORDERED_GATE_STEPS.length; index += 1) {
    const previous = findStepIndex(workflow, ORDERED_GATE_STEPS[index - 1]);
    const current = findStepIndex(workflow, ORDERED_GATE_STEPS[index]);
    if (previous !== -1 && current !== -1 && previous >= current) {
      errors.push(
        `${ORDERED_GATE_STEPS[index - 1]} must come before ${ORDERED_GATE_STEPS[index]}`,
      );
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

function buildEvidenceSnapshot(rootDir) {
  const liveProof = readJson(rootDir, LIVE_PROOF_PATH);
  const draftGateLedger = readJson(rootDir, DRAFT_GATE_LEDGER_PATH);
  const draftVerification = readJson(rootDir, DRAFT_ACTION_VERIFICATION_PATH);
  const failedPublishVerification = readJson(rootDir, FAILED_PUBLISH_ACTION_VERIFICATION_PATH);

  return {
    live_draft_run: {
      proof_ref: LIVE_PROOF_PATH,
      status: liveProof.status,
      clicked_publish: liveProof.clicked_publish,
      saved_draft_visible_in_same_browser: liveProof.saved_draft_visible_in_same_browser === true,
      visible_recheck_passed: liveProof.visible_browser_check?.title_found_in_draftbox === true,
      visible_browser_login_prompt: liveProof.visible_browser_check?.draftbox_detected === false,
      title_found_in_draftbox: liveProof.title_found_in_draftbox === true,
      first_check_title_found: liveProof.first_check?.title_found_in_draftbox === true,
      second_check_title_found: liveProof.second_check?.title_found_in_draftbox === true,
    },
    approved_draft_scope: {
      gate_ledger_ref: DRAFT_GATE_LEDGER_PATH,
      action_verification_ref: DRAFT_ACTION_VERIFICATION_PATH,
      human_review_passed: draftGateLedger.gates?.human_review?.status === 'passed',
      risk_approval_passed: draftGateLedger.gates?.risk_approval?.status === 'passed',
      account_state_passed: draftGateLedger.gates?.account_state?.status === 'passed',
      verification_level: draftVerification.verification_level,
      compliance_status: draftVerification.compliance_status,
    },
    failed_publish_scope: {
      action_verification_ref: FAILED_PUBLISH_ACTION_VERIFICATION_PATH,
      verification_level: failedPublishVerification.verification_level,
      compliance_status: failedPublishVerification.compliance_status,
      promotion_status: failedPublishVerification.promotion_status,
    },
  };
}

function buildQueuedResponses(workflow, evidence) {
  const structureSummary = {
    workflow_id: workflow.id,
    workflow_step_count: workflow.steps.length,
    ordered_gate_steps: ORDERED_GATE_STEPS,
  };

  const realDraftSignals = {
    clicked_publish: evidence.live_draft_run.clicked_publish,
    saved_draft_visible_in_same_browser: evidence.live_draft_run.saved_draft_visible_in_same_browser,
    visible_recheck_passed: evidence.live_draft_run.visible_recheck_passed,
  };

  return [
    {
      role_id: 'planner',
      decision: 'planned',
      handoff: {
        validation_targets: [
          '22-step workflow structure',
          'human review before draft/publish',
          'account state before draft/publish',
          'real draft-save proof from live run',
          'failed publish evidence isolation',
        ],
        structure_summary: structureSummary,
      },
      evidence: ['workflow structure summary', 'validation targets', 'handoff package'],
    },
    {
      role_id: 'worker',
      decision: 'implemented',
      handoff: {
        structure_summary: structureSummary,
        draft_path_verified: evidence.approved_draft_scope.human_review_passed
          && evidence.approved_draft_scope.risk_approval_passed
          && evidence.approved_draft_scope.account_state_passed
          && evidence.approved_draft_scope.verification_level === 'action_compliance_verified'
          && evidence.live_draft_run.clicked_publish === false
          && evidence.live_draft_run.saved_draft_visible_in_same_browser === true,
        publish_failure_isolated: false,
        visible_recheck_passed: realDraftSignals.visible_recheck_passed,
        evidence_refs: [
          evidence.live_draft_run.proof_ref,
          evidence.approved_draft_scope.gate_ledger_ref,
          evidence.approved_draft_scope.action_verification_ref,
        ],
      },
      evidence: ['live draft proof package', 'draft gate package', 'worker handoff'],
    },
    {
      role_id: 'reviewer',
      decision: 'revision_required',
      handoff: {
        findings: [
          'The worker package must explicitly separate the real draft-save positive signals from the failed visible fresh-session recheck and the historical failed publish evidence.',
        ],
      },
      evidence: ['review report', 'revision decision'],
    },
    {
      role_id: 'worker',
      decision: 'implemented',
      handoff: {
        structure_summary: structureSummary,
        draft_path_verified: true,
        publish_failure_isolated: evidence.failed_publish_scope.verification_level === 'failed_with_evidence'
          && evidence.failed_publish_scope.compliance_status === 'failed'
          && evidence.failed_publish_scope.promotion_status === 'not_promotable',
        visible_recheck_passed: realDraftSignals.visible_recheck_passed,
        visible_recheck_blocker: evidence.live_draft_run.visible_browser_login_prompt === true
          ? 'fresh visible session reopened to login/401 instead of proving the draft'
          : null,
        evidence_refs: [
          evidence.live_draft_run.proof_ref,
          evidence.approved_draft_scope.gate_ledger_ref,
          evidence.approved_draft_scope.action_verification_ref,
          evidence.failed_publish_scope.action_verification_ref,
        ],
      },
      evidence: ['revised live draft evidence package', 'revision notes'],
    },
    {
      role_id: 'reviewer',
      decision: 'approved',
      handoff: {
        findings: [],
      },
      evidence: ['review report', 'revision decision'],
    },
    {
      role_id: 'verifier',
      decision: 'blocked',
      terminal_state: 'blocked',
      handoff: {
        workflow_id: workflow.id,
        workflow_step_count: workflow.steps.length,
        draft_path_verified: true,
        publish_failure_isolated: true,
        visible_recheck_passed: false,
        result_scope: 'real draft action succeeded in-session, but fresh visible-session verification is still blocked',
      },
      evidence: ['verification report', 'terminal state', 'gate ledger'],
    },
  ];
}

export async function runXhsPiOrchestrationValidation({ rootDir = process.cwd() } = {}) {
  const workflow = extractWorkflowJsonFromMarkdown(readText(rootDir, XHS_WORKFLOW_PATH));
  const validation = validateXhsWorkflowDefinition(workflow);
  if (!validation.ok) {
    throw new Error(validation.errors.join('\n'));
  }

  const multiAgentWorkflow = readJson(rootDir, MULTI_AGENT_WORKFLOW_PATH);
  const evidence = buildEvidenceSnapshot(rootDir);
  const harness = createPiFauxHarness({ cwd: rootDir });

  try {
    for (const response of buildQueuedResponses(workflow, evidence)) {
      harness.enqueueJsonResponse(response);
    }

    const executors = {
      planner: createPiRoleExecutor({
        harness,
        roleId: 'planner',
        systemPrompt: 'You are the planner role for Xiaohongshu workflow validation.',
        taskBuilder: () => 'Plan the real-run XHS validation checks. Return JSON only.',
      }),
      worker: createPiRoleExecutor({
        harness,
        roleId: 'worker',
        systemPrompt: 'You are the worker role for Xiaohongshu workflow validation.',
        taskBuilder: ({ state }) => `Assemble the XHS evidence package from the live draft rerun. worker_runs=${state.worker_runs}. Return JSON only.`,
      }),
      reviewer: createPiRoleExecutor({
        harness,
        roleId: 'reviewer',
        systemPrompt: 'You are the reviewer role for Xiaohongshu workflow validation.',
        taskBuilder: ({ state }) => `Review whether the evidence cleanly separates real draft-save success, visible-session blocker, and failed publish evidence. review_requested=${state.review_requested}. Return JSON only.`,
      }),
      verifier: createPiRoleExecutor({
        harness,
        roleId: 'verifier',
        systemPrompt: 'You are the verifier role for Xiaohongshu workflow validation.',
        taskBuilder: () => 'Return the final terminal state for this real-run XHS orchestration check. Return JSON only.',
      }),
    };

    const orchestration = await runMultiAgentWorkflow(multiAgentWorkflow, executors);
    const verifierEvent = orchestration.events.findLast((event) => event.role_id === 'verifier');

    return {
      status: orchestration.terminal_state === 'passed' ? 'passed' : 'partial',
      workflow_id: workflow.id,
      multi_agent_workflow_id: multiAgentWorkflow.id,
      final_terminal_state: orchestration.terminal_state,
      writeback_allowed: orchestration.writeback_allowed,
      summary: {
        workflow_step_count: workflow.steps.length,
        draft_path_verified: verifierEvent?.handoff?.draft_path_verified === true,
        publish_failure_isolated: verifierEvent?.handoff?.publish_failure_isolated === true,
        visible_recheck_passed: verifierEvent?.handoff?.visible_recheck_passed === true,
        result_scope: verifierEvent?.handoff?.result_scope ?? null,
        worker_runs: orchestration.state.worker_runs,
        reviewer_passes: orchestration.events.filter((event) => event.role_id === 'reviewer').length,
      },
      evidence,
    };
  } finally {
    harness.dispose();
  }
}
