import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

for (const file of ['BadgeModal.jsx', 'SkillUnlockModal.jsx', 'CurriculumMigrationModal.jsx']) {
  test(`${file} exposes an accessible modal dialog`, () => {
    const source = read(`src/components/${file}`);
    assert.match(source, /role="dialog"/);
    assert.match(source, /aria-modal="true"/);
    assert.match(source, /aria-labelledby=/);
  });
}

test('toast announcements are available to assistive technology', () => {
  const source = read('src/components/Toast.jsx');
  assert.match(source, /aria-live="polite"/);
  assert.match(source, /role="status"/);
});

test('celebration remains available and respects reduced-motion preferences', () => {
  const source = read('src/components/Confetti.jsx');
  const styles = `${read('src/styles/pages.css')}\n${read('src/styles/global.css')}`;
  assert.match(source, /confetti-container/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('removed AI translation styles do not remain in the product stylesheet', () => {
  const styles = read('src/styles/global.css');
  assert.doesNotMatch(styles, /\.ai-chat-panel|\.api-key-input|btn-ai/);
});
