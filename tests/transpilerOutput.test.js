import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS } from '../src/data/courses.js';
import { judgeLesson } from '../src/utils/lessonJudge.js';
import { simulatePython } from '../src/utils/transpiler.js';

test('simulator preserves spaces and terminal newlines in raw output', () => {
  assert.equal(simulatePython("print('  x')").output, '  x\n');
  assert.equal(simulatePython("print('x  ')").output, 'x  \n');
  assert.equal(simulatePython("print('x')\nprint()").output, 'x\n\n');
});

test('multiplication table reference answer passes exact judging', async () => {
  const lesson = CHAPTERS
    .flatMap((chapter) => chapter.lessons)
    .find(({ id }) => id === 'ch16_02');

  const report = await judgeLesson({
    code: lesson.answer,
    testCases: lesson.testCases,
    execute: async (source, input) => simulatePython(source, input),
  });

  assert.equal(report.passed, true, JSON.stringify(report, null, 2));
});
