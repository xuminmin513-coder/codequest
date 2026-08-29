import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLessonResultView } from '../src/utils/lessonResultView.js';

test('maps partial test results without inventing hidden details', () => {
  const view = buildLessonResultView({
    lang: 'zh',
    report: {
      passed: false,
      failedCase: 2,
      output: '最终得分: 13\n',
      expected: '13',
      results: [
        { caseNumber: 1, passed: true, actual: '13', expected: '13', error: null },
        { caseNumber: 2, passed: false, actual: '最终得分: 13', expected: '13', error: null },
      ],
    },
  });

  assert.equal(view.summary, '1 / 2 通过');
  assert.equal(view.items[1].tone, 'error');
  assert.equal(view.output, '最终得分: 13\n');
  assert.equal(view.expected, '13');
});

test('maps safety timeout to one actionable beginner message', () => {
  const view = buildLessonResultView({
    lang: 'zh',
    report: { passed: false, status: 'timeout', error: 'Execution timed out', results: [] },
  });

  assert.match(view.guidance, /循环/);
  assert.equal(view.tone, 'error');
});

test('maps a successful report to success state', () => {
  const view = buildLessonResultView({
    lang: 'en',
    report: {
      passed: true,
      output: '13\n',
      expected: '13',
      results: [{ caseNumber: 1, passed: true, actual: '13', expected: '13' }],
    },
  });

  assert.equal(view.tone, 'success');
  assert.equal(view.summary, '1 / 1 passed');
});
