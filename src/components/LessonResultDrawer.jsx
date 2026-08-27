import React from 'react';
import StatusBadge from './ui/StatusBadge';

const EMPTY_VIEW = {
  tone: 'neutral',
  summary: '',
  items: [],
  output: '',
  expected: '',
  guidance: '',
};

export default function LessonResultDrawer({
  lang = 'zh',
  view = EMPTY_VIEW,
  activeTab = 'tests',
  onTabChange,
}) {
  const showTests = activeTab === 'tests';
  const selectTab = tab => onTabChange?.(tab);

  return (
    <section className={`lesson-result-drawer ${view.tone}`} aria-label={lang === 'zh' ? '代码运行结果' : 'Code run results'}>
      <div className="lesson-result-heading">
        <div>
          <p className="lesson-result-eyebrow">{lang === 'zh' ? '运行结果' : 'Run result'}</p>
          <h2>{lang === 'zh' ? '检查代码发生了什么' : 'See what your code did'}</h2>
        </div>
        <StatusBadge tone={view.tone}>{view.summary || (lang === 'zh' ? '等待运行' : 'Waiting')}</StatusBadge>
      </div>

      <div className="lesson-result-tabs" role="tablist" aria-label={lang === 'zh' ? '结果内容' : 'Result content'}>
        <button
          id="lesson-tests-tab"
          className={showTests ? 'active' : ''}
          type="button"
          role="tab"
          aria-selected={showTests}
          aria-controls="lesson-tests-panel"
          tabIndex={showTests ? 0 : -1}
          onClick={() => selectTab('tests')}
        >
          {lang === 'zh' ? '测试结果' : 'Tests'}
        </button>
        <button
          id="lesson-output-tab"
          className={!showTests ? 'active' : ''}
          type="button"
          role="tab"
          aria-selected={!showTests}
          aria-controls="lesson-output-panel"
          tabIndex={!showTests ? 0 : -1}
          onClick={() => selectTab('output')}
        >
          {lang === 'zh' ? '运行输出' : 'Output'}
        </button>
      </div>

      {showTests ? (
        <div
          id="lesson-tests-panel"
          className="lesson-result-panel"
          role="tabpanel"
          aria-labelledby="lesson-tests-tab"
        >
          {view.items.length > 0 ? (
            <ol className="lesson-test-list">
              {view.items.map(item => (
                <li className={`lesson-test-item ${item.tone}`} key={item.number}>
                  <span className="lesson-test-icon" aria-hidden="true">{item.tone === 'success' ? '✓' : '!'}</span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="lesson-result-empty">{lang === 'zh' ? '点击“运行代码”，这里会逐项显示检查结果。' : 'Select “Run code” to see each check here.'}</p>
          )}

          {view.expected ? (
            <div className="lesson-compare-card">
              <div>
                <span>{lang === 'zh' ? '你的输出' : 'Your output'}</span>
                <pre>{view.output || (lang === 'zh' ? '（无输出）' : '(no output)')}</pre>
              </div>
              <div>
                <span>{lang === 'zh' ? '期望输出' : 'Expected'}</span>
                <pre>{view.expected}</pre>
              </div>
            </div>
          ) : null}

          <p className={`lesson-result-guidance ${view.tone}`}>{view.guidance}</p>
        </div>
      ) : (
        <div
          id="lesson-output-panel"
          className="lesson-result-panel"
          role="tabpanel"
          aria-labelledby="lesson-output-tab"
        >
          <pre className="lesson-program-output">{view.output || (lang === 'zh' ? '运行后，Python 输出会显示在这里。' : 'Python output will appear here after you run the code.')}</pre>
        </div>
      )}
    </section>
  );
}
