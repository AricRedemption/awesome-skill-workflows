# Evolution Note: Account-State Precheck Gap

## Context

- Scenario: `xiaohongshu-creator v0.1`
- Topic: `How ordinary users can save one hour per day with AI agents`
- Run: `runs/001-xhs-ai-agent-save-one-hour`

## Problem

The first workflow treated account login and authorization as a late publishing note instead of a hard pre-handoff gate. That ordering could make draft or publish advice look safe before the platform account was proven ready.

## Change

- Add `account-state-check` before platform handoff.
- Require the workflow to record:
  - login status,
  - authorization status,
  - selected account context,
  - approved handoff mode.

## Reuse Rule

Any workflow that hands content to an account-bound platform must check account state before draft or publish actions. If the account is not ready, halt the workflow and record failure evidence.
