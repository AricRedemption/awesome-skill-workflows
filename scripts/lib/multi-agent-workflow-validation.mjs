import fs from 'node:fs';

const REQUIRED_ROLE_IDS = ['planner', 'worker', 'reviewer', 'verifier'];
const ALLOWED_NODE_TYPES = new Set(['spawn', 'sequence', 'fork', 'join', 'loop']);
const ALLOWED_TERMINAL_STATES = new Set(['passed', 'revision_required', 'blocked', 'failed']);

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value, minItems = 1) {
  return Array.isArray(value)
    && value.length >= minItems
    && value.every((item) => isNonEmptyString(item));
}

function pushError(errors, scope, message) {
  errors.push(scope ? `${scope}: ${message}` : message);
}

function validateSpawnNode(node, scope, roleIds, errors) {
  if (!isNonEmptyString(node.role_id)) {
    pushError(errors, scope, 'spawn node must declare role_id');
  } else if (!roleIds.has(node.role_id)) {
    pushError(errors, scope, `spawn node references unknown role_id "${node.role_id}"`);
  }

  if (!isStringArray(node.skill_refs)) {
    pushError(errors, scope, 'spawn node must declare non-empty skill_refs');
  }

  for (const field of ['handoff_contract', 'gate_effect', 'run_mode_effect']) {
    if (!isNonEmptyString(node[field])) {
      pushError(errors, scope, `spawn node must declare ${field}`);
    }
  }

  if (!isStringArray(node.evidence_required)) {
    pushError(errors, scope, 'spawn node must declare non-empty evidence_required');
  }
}

function validateNode(node, scope, roleIds, errors) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    pushError(errors, scope, 'node must be an object');
    return;
  }

  if (!isNonEmptyString(node.node_id)) {
    pushError(errors, scope, 'node_id is required');
  }

  if (!ALLOWED_NODE_TYPES.has(node.node_type)) {
    pushError(errors, scope, `node_type must be one of ${Array.from(ALLOWED_NODE_TYPES).join(', ')}`);
    return;
  }

  const nextScope = scope ? `${scope}.${node.node_id || node.node_type}` : node.node_id || node.node_type;

  switch (node.node_type) {
    case 'spawn':
      validateSpawnNode(node, nextScope, roleIds, errors);
      break;
    case 'sequence':
      if (!Array.isArray(node.steps) || node.steps.length === 0) {
        pushError(errors, nextScope, 'sequence node must declare non-empty steps');
      } else {
        node.steps.forEach((step) => validateNode(step, nextScope, roleIds, errors));
      }
      break;
    case 'fork':
      if (!Array.isArray(node.branches) || node.branches.length < 2) {
        pushError(errors, nextScope, 'fork node must declare at least two branches');
      } else {
        node.branches.forEach((branch) => validateNode(branch, nextScope, roleIds, errors));
      }
      break;
    case 'join':
      if (!isNonEmptyString(node.join_strategy)) {
        pushError(errors, nextScope, 'join node must declare join_strategy');
      }
      if (!isStringArray(node.evidence_required)) {
        pushError(errors, nextScope, 'join node must declare non-empty evidence_required');
      }
      break;
    case 'loop':
      if (!Number.isInteger(node.loop_cap) || node.loop_cap < 1) {
        pushError(errors, nextScope, 'loop node must declare positive integer loop_cap');
      }
      if (!node.body) {
        pushError(errors, nextScope, 'loop node must declare body');
      } else {
        validateNode(node.body, nextScope, roleIds, errors);
      }
      if (node.continue_when !== undefined && !isNonEmptyString(node.continue_when)) {
        pushError(errors, nextScope, 'continue_when must be a non-empty string when present');
      }
      break;
    default:
      break;
  }
}

export function validateMultiAgentWorkflow(workflow, source = '(inline)') {
  const errors = [];

  if (!workflow || typeof workflow !== 'object' || Array.isArray(workflow)) {
    return {
      ok: false,
      errors: [`${source}: workflow must be an object`],
    };
  }

  for (const field of ['id', 'goal']) {
    if (!isNonEmptyString(workflow[field])) {
      pushError(errors, source, `${field} is required`);
    }
  }

  if (workflow.workflow_type !== 'multi_agent_skill_workflow') {
    pushError(errors, source, 'workflow_type must be "multi_agent_skill_workflow"');
  }

  if (!Array.isArray(workflow.roles) || workflow.roles.length < REQUIRED_ROLE_IDS.length) {
    pushError(errors, source, 'roles must contain planner, worker, reviewer, and verifier');
  }

  const roleIds = new Set();

  if (Array.isArray(workflow.roles)) {
    workflow.roles.forEach((role, index) => {
      const roleScope = `${source}.roles[${index}]`;

      if (!role || typeof role !== 'object' || Array.isArray(role)) {
        pushError(errors, roleScope, 'role must be an object');
        return;
      }

      if (!isNonEmptyString(role.role_id)) {
        pushError(errors, roleScope, 'role_id is required');
        return;
      }

      if (roleIds.has(role.role_id)) {
        pushError(errors, roleScope, `duplicate role_id "${role.role_id}"`);
      }
      roleIds.add(role.role_id);

      if (!isNonEmptyString(role.purpose)) {
        pushError(errors, roleScope, 'purpose is required');
      }

      if (!isStringArray(role.skill_refs)) {
        pushError(errors, roleScope, 'skill_refs must be a non-empty string array');
      }
    });
  }

  REQUIRED_ROLE_IDS.forEach((roleId) => {
    if (!roleIds.has(roleId)) {
      pushError(errors, source, `${roleId} role is required`);
    }
  });

  if (!Array.isArray(workflow.nodes) || workflow.nodes.length === 0) {
    pushError(errors, source, 'nodes must be a non-empty array');
  } else {
    workflow.nodes.forEach((node) => validateNode(node, `${source}.nodes`, roleIds, errors));
  }

  const reviewGate = workflow.review_gate;
  if (!reviewGate || typeof reviewGate !== 'object' || Array.isArray(reviewGate)) {
    pushError(errors, source, 'review_gate is required');
  } else {
    if (reviewGate.mode !== 'hard') {
      pushError(errors, `${source}.review_gate`, 'review_gate must be a hard gate');
    }
    if (reviewGate.reviewer_role_id !== 'reviewer') {
      pushError(errors, `${source}.review_gate`, 'reviewer_role_id must be reviewer');
    }
    if (reviewGate.verifier_role_id !== 'verifier') {
      pushError(errors, `${source}.review_gate`, 'verifier_role_id must be verifier');
    }
  }

  const writeback = workflow.writeback;
  if (!writeback || typeof writeback !== 'object' || Array.isArray(writeback)) {
    pushError(errors, source, 'writeback is required');
  } else {
    if (!isStringArray(writeback.knowledge_targets)) {
      pushError(errors, `${source}.writeback`, 'knowledge_targets must be a non-empty string array');
    }
    if (!Array.isArray(writeback.allowed_terminal_states) || writeback.allowed_terminal_states.length !== 1) {
      pushError(errors, `${source}.writeback`, 'allowed_terminal_states must contain only "passed"');
    } else {
      const [onlyState] = writeback.allowed_terminal_states;
      if (onlyState !== 'passed') {
        pushError(errors, `${source}.writeback`, 'allowed_terminal_states must contain only "passed"');
      }
    }
  }

  if (!isStringArray(workflow.success_criteria)) {
    pushError(errors, source, 'success_criteria must be a non-empty string array');
  }

  if (workflow.terminal_states !== undefined) {
    if (!Array.isArray(workflow.terminal_states) || workflow.terminal_states.length === 0) {
      pushError(errors, `${source}.terminal_states`, 'terminal_states must be a non-empty array when present');
    } else {
      workflow.terminal_states.forEach((state) => {
        if (!ALLOWED_TERMINAL_STATES.has(state)) {
          pushError(errors, `${source}.terminal_states`, `unsupported terminal state "${state}"`);
        }
      });
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function validateMultiAgentWorkflowFile(filePath) {
  const workflow = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return validateMultiAgentWorkflow(workflow, filePath);
}
