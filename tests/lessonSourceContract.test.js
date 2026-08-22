import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lessonSource = readFileSync(
  new URL('../src/components/Lesson.jsx', import.meta.url),
  'utf8',
);

test('Lesson guards async runs and disables Run while one is pending', () => {
  assert.match(lessonSource, /createLessonRunGuard/);
  assert.match(lessonSource, /runGuardRef\.current\.invalidate\(\)/);
  assert.match(lessonSource, /runGuardRef\.current\.begin\(\)/);
  assert.match(lessonSource, /runGuardRef\.current\.isCurrent\(runToken\)/);
  assert.match(lessonSource, /finally\s*{/);
  assert.match(lessonSource, /runGuardRef\.current\.finish\(runToken\)/);
  assert.match(lessonSource, /disabled=\{isRunning\}/);
});

test('Lesson reports runtime and output review failures', () => {
  const failureCalls = lessonSource.match(
    /if \(pageData\?\.reviewMode\) onReviewFailed\(les\);/g,
  ) || [];

  assert.equal(failureCalls.length, 2);
});

test('Lesson invalidates pending runs when it unmounts', () => {
  assert.match(
    lessonSource,
    /useEffect\(\(\) => \(\) => \{\s*runGuardRef\.current\.invalidate\(\);\s*\}, \[\]\);/,
  );
});
