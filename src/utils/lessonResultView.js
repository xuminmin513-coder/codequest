const SAFETY_GUIDANCE = {
  zh: {
    timeout: '代码运行时间太长，已经安全停止。请检查是否存在不会结束的循环。',
    output_limit: '输出内容太多，已经安全停止。请检查循环中的 print。',
    worker_crash: 'Python 运行环境意外停止。你的电脑文件没有受到影响，请重新运行。',
    invalid_request: '代码或输入超过安全限制，请缩短后再运行。',
    stopped: '运行已停止。修改代码后可以重新运行全部测试。',
  },
  en: {
    timeout: 'Your code ran for too long and was stopped safely. Check for a loop that never ends.',
    output_limit: 'Your program produced too much output and was stopped safely. Check print calls inside loops.',
    worker_crash: 'The Python environment stopped unexpectedly. Your computer files were not affected; run it again.',
    invalid_request: 'The code or input exceeds the safety limit. Shorten it and try again.',
    stopped: 'Execution stopped. Edit your code and run all tests again.',
  },
};

function mismatchGuidance(lang) {
  return lang === 'zh'
    ? '程序已经运行，但输出与要求不一致。先比较“你的输出”和“期望输出”，检查多余文字、空格或计算步骤。'
    : 'The program ran, but its output differs from the requirement. Compare your output with the expected output and check extra text, spacing, or calculation steps.';
}

function runtimeGuidance(report, lang) {
  const localized = SAFETY_GUIDANCE[lang] || SAFETY_GUIDANCE.en;
  if (localized[report.status]) return localized[report.status];
  if (report.error) {
    return lang === 'zh'
      ? 'Python 报告了运行错误。请先查看运行输出中的错误行，再修改对应代码。'
      : 'Python reported a runtime error. Check the error line in output, then edit that part of the code.';
  }
  return mismatchGuidance(lang);
}

export function buildLessonResultView({ report, lang = 'zh' }) {
  if (!report) {
    return {
      tone: 'neutral',
      summary: lang === 'zh' ? '等待运行' : 'Waiting to run',
      items: [],
      output: '',
      expected: '',
      guidance: lang === 'zh' ? '运行代码后，这里会显示测试结果和 Python 输出。' : 'Run your code to see tests and Python output here.',
    };
  }

  const results = Array.isArray(report.results) ? report.results : [];
  const passedCount = results.filter(result => result.passed).length;
  const summary = lang === 'zh'
    ? `${passedCount} / ${results.length} 通过`
    : `${passedCount} / ${results.length} passed`;
  const items = results.map(result => ({
    number: result.caseNumber,
    label: lang === 'zh' ? `测试 ${result.caseNumber}` : `Test ${result.caseNumber}`,
    detail: result.error
      ? String(result.error)
      : result.passed
        ? (lang === 'zh' ? '输出符合要求' : 'Output matches')
        : (lang === 'zh' ? '输出需要修改' : 'Output needs changes'),
    tone: result.passed ? 'success' : 'error',
  }));

  return {
    tone: report.passed ? 'success' : 'error',
    summary,
    items,
    output: String(report.output || ''),
    expected: String(report.expected || ''),
    guidance: report.passed
      ? (lang === 'zh' ? '全部测试通过，可以继续下一关。' : 'All tests passed. You can continue to the next lesson.')
      : runtimeGuidance(report, lang),
  };
}
