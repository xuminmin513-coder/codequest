import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('lesson result drawer uses one accessible light surface with centered tabs', () => {
  const source = read('src/components/LessonResultDrawer.jsx');
  const styles = read('src/styles/lesson-workspace.css');

  assert.match(source, /lesson-result-drawer/);
  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tab"/);
  assert.match(source, /aria-selected=/);
  assert.match(source, /role="tabpanel"/);
  assert.match(styles, /\.lesson-result-tabs[\s\S]*justify-content:\s*center/);
  assert.match(styles, /\.lesson-result-drawer[\s\S]*background:\s*var\(--xm-surface\)/);
  assert.doesNotMatch(styles, /\.lesson-result-drawer[\s\S]*background:\s*(#0|#1|black)/i);
});

test('test feedback and program output live inside the same result drawer', () => {
  const source = read('src/components/LessonResultDrawer.jsx');

  assert.match(source, /lesson-tests-tab/);
  assert.match(source, /lesson-output-tab/);
  assert.match(source, /view\.items/);
  assert.match(source, /view\.guidance/);
  assert.match(source, /view\.output/);
});
