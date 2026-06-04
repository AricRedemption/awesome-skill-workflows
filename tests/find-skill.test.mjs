import test from 'node:test';
import assert from 'node:assert/strict';

import { searchSkillWiki } from '../scripts/lib/find-skill.mjs';

test('find skill returns only skill wiki paths', () => {
  const results = searchSkillWiki('selection gated safety', { limit: 3 });

  assert.ok(results.length >= 1);
  assert.ok(results.every((result) => result.path.startsWith('skills/wiki/')));
});

test('find skill finds the promoted wiki entry by summary terms', () => {
  const [firstResult] = searchSkillWiki('proof boundary kb reuse', { limit: 1 });

  assert.ok(firstResult);
  assert.equal(firstResult.id, 'xhs-kb-reuse-selection-gated-safety');
  assert.match(firstResult.summary, /reuse XHS workflow knowledge safely/i);
  assert.equal('verified_status' in firstResult, false);
});

test('find skill finds imported external wiki entries', () => {
  const [firstResult] = searchSkillWiki('skills catalog for codex', { limit: 1 });

  assert.ok(firstResult);
  assert.equal(firstResult.id, 'openai-skills-catalog-codex');
  assert.match(firstResult.title, /OpenAI Skills Catalog For Codex/i);
});

test('find skill finds marketplace-popular entries', () => {
  const [firstResult] = searchSkillWiki('code review skills hub', { limit: 1 });

  assert.ok(firstResult);
  assert.equal(firstResult.id, 'skillshub-code-review');
  assert.match(firstResult.title, /Skills Hub Code Review/i);
});

test('find skill finds top scenario bundle pages', () => {
  const [firstResult] = searchSkillWiki('finance backoffice reporting scenario', { limit: 1 });

  assert.ok(firstResult);
  assert.equal(firstResult.id, 'top-scenario-business-finance-and-backoffice');
  assert.match(firstResult.title, /Business Finance And Backoffice/i);
});

test('find skill finds category hub pages', () => {
  const [firstResult] = searchSkillWiki('communication writing content category', { limit: 1 });

  assert.ok(firstResult);
  assert.equal(firstResult.id, 'category-hub-communication');
  assert.match(firstResult.title, /Category Hub: Communication/i);
});

test('find skill finds industry hub pages', () => {
  const [firstResult] = searchSkillWiki('healthcare clinical documentation industry', { limit: 1 });

  assert.ok(firstResult);
  assert.equal(firstResult.id, 'industry-hub-healthcare');
  assert.match(firstResult.title, /Industry Hub: Healthcare/i);
});

test('find skill finds official workspace gap-fill pages', () => {
  const results = searchSkillWiki('gmail calendar drive official workspace', { limit: 3 });

  assert.ok(results.length >= 1);
  assert.ok(results.some((result) => result.id === 'google-workspace-cli-catalog'));
});

test('find skill finds official browser automation pages', () => {
  const results = searchSkillWiki('browser automation browserbase search', { limit: 3 });

  assert.ok(results.length >= 1);
  assert.ok(
    results.some((result) =>
      ['browserbase-skills-catalog', 'browserbase-search', 'browserbase-browser-trace'].includes(
        result.id,
      ),
    ),
  );
});
