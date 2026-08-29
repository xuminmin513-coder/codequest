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
    let execution;
    try {
      execution = await execute(code, testCase.input || '');
    } catch (error) {
      execution = { output: '', error: error?.message || String(error) };
    }
    const actual = normalizeOutput(execution.output);
    const expected = normalizeOutput(testCase.expected);
    const result = {
      caseNumber: index + 1,
      passed: !execution.error && actual === expected,
      status: execution.status || (execution.error ? 'runtime_error' : 'passed'),
      actual,
      expected,
      error: execution.error || null,
    };
    results.push(result);
    if (!result.passed) {
      return {
        passed: false,
        failedCase: result.caseNumber,
        status: result.status,
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
    status: 'passed',
    error: null,
    output: results.at(-1)?.actual || '',
    expected: results.at(-1)?.expected || '',
    results,
  };
}
