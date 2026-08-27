import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lessonSource = readFileSync(
  new URL('../src/components/Lesson.jsx', import.meta.url),
  'utf8',
);

test('Lesson guards async runs and exposes a real stop action while one is pending', () => {
  assert.match(lessonSource, /createPythonRunner/);
  assert.match(lessonSource, /createLessonRunGuard/);
  assert.match(lessonSource, /runnerRef\.current\?\.dispose\(\)/);
  assert.match(lessonSource, /runGuardRef\.current\.invalidate\(\)/);
  assert.match(lessonSource, /runGuardRef\.current\.begin\(\)/);
  assert.match(lessonSource, /runGuardRef\.current\.isCurrent\(runToken\)/);
  assert.match(lessonSource, /runGuardRef\.current\.cancelCurrent\(\)/);
  assert.match(lessonSource, /runnerRef\.current\?\.stop\(\)/);
  assert.match(lessonSource, /finally\s*{/);
  assert.match(lessonSource, /runGuardRef\.current\.finish\(runToken\)/);
  assert.doesNotMatch(lessonSource, /disabled=\{isRunning\}/);
  assert.match(lessonSource, /isRunning\s*\?\s*\(lang === 'zh' \? '停止' : 'Stop'\)/);
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
    /useEffect\(\(\) => \(\) => \{\s*runnerRef\.current\?\.dispose\(\);\s*runnerRef\.current = null;\s*runGuardRef\.current\.invalidate\(\);\s*\}, \[\]\);/,
  );
});

test('Lesson renders reports through the unified result drawer', () => {
  assert.match(lessonSource, /import LessonResultDrawer/);
  assert.match(lessonSource, /buildLessonResultView/);
  assert.match(lessonSource, /setResultView/);
  assert.match(lessonSource, /<LessonResultDrawer/);
  assert.doesNotMatch(lessonSource, /getElementById\('lesson-output'\)/);
});
