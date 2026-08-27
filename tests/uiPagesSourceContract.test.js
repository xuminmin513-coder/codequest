import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('dashboard starts with a clear continue-learning action', () => {
  const source = read('src/components/Dashboard.jsx');
  assert.match(source, /import PageHeader/);
  assert.match(source, /dashboard-continue-card/);
  assert.match(source, /dashboard-secondary-grid/);
  assert.doesNotMatch(source, /欢迎回来，冒险者/);
});

test('dashboard retains saves, reviews, progress, and skill unlock behavior', () => {
  const source = read('src/components/Dashboard.jsx');
  assert.match(source, /getPendingReviewCount/);
  assert.match(source, /levelProgress/);
  assert.match(source, /exportAllData/);
  assert.match(source, /importAllData/);
  assert.match(source, /SkillUnlockModal/);
});

for (const file of ['CourseMap.jsx', 'ReviewList.jsx', 'Achievements.jsx', 'Shortcuts.jsx', 'Graduation.jsx']) {
  test(`${file} uses the shared page hierarchy`, () => {
    const source = read(`src/components/${file}`);
    assert.match(source, /import PageHeader/);
    assert.match(source, /<PageHeader/);
  });
}

test('course disclosure and locked lessons are accessible', () => {
  const source = read('src/components/CourseMap.jsx');
  assert.match(source, /aria-expanded=/);
  assert.match(source, /aria-disabled=/);
  assert.match(source, /chapter-toggle/);
  assert.match(source, /lesson-path-item/);
});
