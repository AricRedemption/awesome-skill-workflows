export function getWorkflowCatalog() {
  return [
    {
      id: 'xhs-pi-paas-readiness',
      title: 'XHS Pi PaaS readiness acceptance',
      execution_kind: 'human-reviewed acceptance over real run evidence',
      technical_verdict_source: 'runs/018-xhs-pi-multi-agent-live-validation/result.json',
      proof_source:
        'runs/017-xhs-pi-live-draft-validation-unique-title/headless-live-session-proof.json',
      endpoint: '/v1/workflows/xhs-pi-paas-readiness/execute',
      terminal_contract: {
        service_status: 'passed | failed',
        readiness_level: 'accepted_for_paas | not_ready',
        technical_validation_status: 'partial | failed',
      },
    },
  ];
}
