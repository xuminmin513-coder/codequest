export function normalizeOutput(value = '') {
  return String(value)
    .replace(/^\uFEFF/, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\n$/, '');
}

export async function judgeLesson({ code, testCases, execute }) {
  const cases = testCases?.length ? testCases : [{ input: '', expected: '' }];
  const results = [];

  for (let index = 0; index < cases.length; index += 1) {
    const testCase = cases[index];
    const execution = await execute(code, testCase.input || '');
    const actual = normalizeOutput(execution.output);
    const expected = normalizeOutput(testCase.expected);
    const result = {
      caseNumber: index + 1,
      passed: !execution.error && actual === expected,
      actual,
      expected,
      error: execution.error || null,
    };
    results.push(result);
    if (!result.passed) {
      return {
        passed: false,
        failedCase: result.caseNumber,
        error: result.error,
        output: execution.output || '',
        expected,
        results,
      };
    }
  }
  return {
    passed: true,
    failedCase: null,
    error: null,
    output: results.at(-1)?.actual || '',
    expected: results.at(-1)?.expected || '',
    results,
  };
}
