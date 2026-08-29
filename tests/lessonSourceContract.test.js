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

test('Lesson keeps its sole run or stop action in the editor footer', () => {
  const editorCard = lessonSource.match(
    /<section className="lesson-editor-card"[\s\S]*?<\/section>/,
  )?.[0];
  const pageNavigation = lessonSource.match(
    /<div className="lesson-actions">([\s\S]*?)\n\s*<\/div>\n\s*\)?\}\n\s*<\/main>/,
  )?.[1];

  assert.ok(editorCard, 'expected the editor card markup');
  assert.ok(pageNavigation, 'expected the page navigation markup');
  assert.match(editorCard, /lesson-editor-actions/);
  assert.match(editorCard, /lesson-primary-action/);
  assert.doesNotMatch(pageNavigation, /lesson-primary-action/);
  assert.equal((lessonSource.match(/lesson-primary-action/g) || []).length, 1);
});

test('Lesson renders page navigation only when a navigation action is available', () => {
  assert.match(
    lessonSource,
    /const showLessonNavigation = isReviewMode \|\| lesIdx > 0 \|\| completed;/,
  );
  assert.match(
    lessonSource,
    /\{showLessonNavigation && \(\s*<div className="lesson-actions">/,
  );
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

test('Lesson uses the centralized required path for access and badge progress', () => {
  assert.match(lessonSource, /isChapterUnlocked/);
  assert.match(lessonSource, /getRequiredChapters/);
  assert.match(lessonSource, /getGraduationProgress/);
});

test('Lesson delegates curriculum markdown to the shared semantic renderer', () => {
  assert.match(
    lessonSource,
    /import\s+\{\s*renderLessonMarkdown\s*\}\s+from\s+['"]\.\.\/utils\/lessonMarkdown['"];/,
  );
  assert.match(
    lessonSource,
    /dangerouslySetInnerHTML=\{\{\s*__html:\s*renderLessonMarkdown\(content\)\s*\}\}/,
  );
  assert.doesNotMatch(lessonSource, /const\s+renderMarkdown\s*=/);
});
