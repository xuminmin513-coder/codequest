import test from 'node:test';
import assert from 'node:assert/strict';
import { judgeLesson, normalizeOutput } from '../src/utils/lessonJudge.js';

test('normalization changes line endings and one terminal newline only', () => {
  assert.equal(normalizeOutput('a b\r\n'), 'a b');
  assert.notEqual(normalizeOutput('a b\n'), normalizeOutput('ab\n'));
});

test('judge runs every test and reports a later failure', async () => {
  const seen = [];
  const report = await judgeLesson({
    code: 'print(input())',
    testCases: [
      { input: 'first', expected: 'first' },
      { input: 'second', expected: 'expected-second' },
    ],
    execute: async (_code, input) => {
      seen.push(input);
      return { output: input, error: null };
    },
  });
  assert.deepEqual(seen, ['first', 'second']);
  assert.equal(report.passed, false);
  assert.equal(report.failedCase, 2);
});

test('judge preserves runtime errors', async () => {
  const report = await judgeLesson({
    code: 'bad',
    testCases: [{ input: '', expected: '' }],
    execute: async () => ({ output: '', error: 'SyntaxError: invalid syntax' }),
  });
  assert.equal(report.passed, false);
  assert.match(report.error, /SyntaxError/);
});

test('judge converts rejected execution into a failed report', async () => {
  const report = await judgeLesson({
    code: 'bad',
    testCases: [{ input: '', expected: '' }],
    execute: async () => {
      throw new Error('boom');
    },
  });

  assert.equal(report.passed, false);
  assert.equal(report.failedCase, 1);
  assert.match(report.error, /boom/);
  assert.equal(report.results.length, 1);
});
