import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import { simulatePython } from '../utils/transpiler';
import { judgeLesson } from '../utils/lessonJudge';
import { createLessonRunGuard } from '../utils/lessonRunGuard';
import { CHAPTERS } from '../data/courses';
import CodeEditor from './CodeEditor';
import BadgeModal from './BadgeModal';
import AIChat from './AIChat';

const isMac = typeof navigator !== 'undefined' && navigator.platform?.toLowerCase().includes('mac');
const runShortcut = isMac ? 'Cmd+Enter 运行' : 'Ctrl+Enter 运行';
const runShortcutEn = isMac ? 'Cmd+Enter Run' : 'Ctrl+Enter Run';

export default function Lesson() {
  const { lang, navigateTo, addToast, refresh, pageData } = useApp();
  const editorRef = useRef(null);
  const [lessonData, setLessonData] = useState(null);
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [currentBadge, setCurrentBadge] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const lastPageDataRef = useRef(null);
  const runGuardRef = useRef(createLessonRunGuard());

  useEffect(() => {
    runGuardRef.current.invalidate();
    setIsRunning(false);
    if (!pageData) return;

    const { chapterId, lessonId } = pageData;
    if (lastPageDataRef.current === `${chapterId}-${lessonId}`) return;
    lastPageDataRef.current = `${chapterId}-${lessonId}`;

    const ch = CHAPTERS.find(c => c.id === chapterId);
    if (!ch) { navigateTo('courses'); return; }
    const les = ch.lessons.find(l => l.id === lessonId);
    if (!les) { navigateTo('courses'); return; }

    const chIdx = CHAPTERS.findIndex(c => c.id === chapterId);
    const lesIdx = ch.lessons.findIndex(l => l.id === lessonId);
    if (chIdx > 0) {
      const prevCh = CHAPTERS[chIdx - 1];
      if (!STORAGE.isChapterCompleted(prevCh.id, prevCh.lessons.length)) {
        addToast('error', '🔒', lang === 'zh' ? '请先完成上一章全部关卡！' : 'Complete all lessons in the previous chapter first!');
        navigateTo('courses');
        return;
      }
    }
    if (lesIdx > 0) {
      const prevLes = ch.lessons[lesIdx - 1];
      if (!STORAGE.isLessonCompleted(ch.id, prevLes.id)) {
        addToast('error', '🔒', lang === 'zh' ? '请先完成上一关！' : 'Complete the previous lesson first!');
        navigateTo('courses');
        return;
      }
    }

    setLessonData({ ch, les });
    setIsFirstTry(true);
    setCompleted(STORAGE.isLessonCompleted(ch.id, les.id));
    STORAGE.saveLastLesson(ch.id, les.id);

    setTimeout(() => {
      const playerDraft = pageData?.reviewMode ? '' : STORAGE.loadCode(les.id);
      if (editorRef.current) {
        editorRef.current.setCode(playerDraft || '');
        editorRef.current.focus();
      }
    }, 100);
    if (pageData?.reviewMode) {
      STORAGE.clearCode(les.id);
    }
  }, [pageData]);

  useEffect(() => () => {
    runGuardRef.current.invalidate();
  }, []);

  useEffect(() => {
    if (!pageData) {
      const last = STORAGE.loadLastLesson();
      if (last) {
        navigateTo('lesson', { chapterId: last.chapterId, lessonId: last.lessonId });
      } else {
        navigateTo('dashboard');
      }
    }
  }, []);

  const loadLesson = useCallback((chapterId, lessonId) => {
    lastPageDataRef.current = null;
    navigateTo('lesson', { chapterId, lessonId });
  }, [navigateTo]);

  const handleRun = useCallback(async () => {
    if (!lessonData || !editorRef.current) return;
    const runToken = runGuardRef.current.begin();
    if (!runToken) return;
    setIsRunning(true);

    try {
      const { les, ch } = lessonData;
      const code = editorRef.current.getCode();
      if (!code.trim()) {
        addToast('error', '⚠️', lang === 'zh' ? '请先编写代码' : 'Please write some code first');
        return;
      }

      const testCases = les.testCases || [{ input: '', expected: '' }];
      const report = await judgeLesson({
        code,
        testCases,
        execute: async (source, input) => simulatePython(source, input),
      });

      if (!runGuardRef.current.isCurrent(runToken)) return;

      const outputEl = document.getElementById('lesson-output');
      if (!outputEl) return;

      if (report.error) {
        outputEl.textContent = `❌ ${report.error}`;
        outputEl.className = 'terminal-content error';
        if (pageData?.reviewMode) onReviewFailed(les);
        setIsFirstTry(false);
        return;
      }

      if (report.passed) {
        const outText = report.output ? `${report.output}\n\n` : '';
        outputEl.textContent = outText + '🎉 ' + (lang === 'zh' ? '恭喜通关！' : 'Level Complete!');
        outputEl.className = 'terminal-content success';
        if (pageData?.reviewMode) onReviewComplete(les, ch);
        else onLessonComplete(les, ch);
        return;
      }

      outputEl.textContent = lang === 'zh'
        ? `❌ 第 ${report.failedCase} 组测试未通过。\n--- 你的输出 ---\n${report.output || '(无输出)'}\n--- 期望输出 ---\n${report.expected}`
        : `❌ Test ${report.failedCase} failed.\n--- Your output ---\n${report.output || '(no output)'}\n--- Expected ---\n${report.expected}`;
      outputEl.className = 'terminal-content error';
      if (pageData?.reviewMode) onReviewFailed(les);
      setIsFirstTry(false);
    } finally {
      if (runGuardRef.current.finish(runToken)) setIsRunning(false);
    }
  }, [lessonData, lang]);

  const onLessonComplete = (les, ch) => {
    const alreadyDone = STORAGE.isLessonCompleted(ch.id, les.id);
    if (alreadyDone) {
      addToast('success', '✅', lang === 'zh' ? '已完成！' : 'Lesson already completed!');
      return;
    }

    let xpEarned = les.xp;
    let bonusText = '';
    if (isFirstTry) {
      xpEarned += Math.round(les.xp * 0.2);
      bonusText = ` (${lang === 'zh' ? '首次尝试奖励' : 'First Try Bonus'} +${Math.round(les.xp * 0.2)})`;
    }
    const streak = STORAGE.getStreak();
    if (streak >= 3) {
      const streakBonus = Math.round(les.xp * 0.1);
      xpEarned += streakBonus;
      bonusText += ` (${lang === 'zh' ? '连续学习奖励' : 'Streak Bonus'} +${streakBonus})`;
    }

    STORAGE.completeLesson(ch.id, les.id, xpEarned, isFirstTry);
    if (isFirstTry) STORAGE.markPerfect(les.id);
    STORAGE.initReviewForLesson(ch.id, les.id);
    STORAGE.clearCode(les.id);

    setCompleted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    addToast('xp', '⭐', `+${xpEarned} XP${bonusText}`, les.title);

    const stats = (() => {
      const totalXp = STORAGE.getTotalXp();
      const c = STORAGE.getCompletedCount();
      const b = STORAGE.getBadges();
      const s = STORAGE.getStreak();
      const p = STORAGE.getPerfectCount();
      const cpc = STORAGE.getCompletedPerChapter();
      let fcc = 0;
      CHAPTERS.forEach(ch2 => { if ((cpc[ch2.id] || 0) >= ch2.lessons.length) fcc++; });
      return { xp: totalXp, completedLessons: c, completedChapters: fcc, totalLessons: CHAPTERS.reduce((sum, chapter) => sum + chapter.lessons.length, 0), badges: b.length, streak: s, perfectLessons: p, fastLearnerDays: STORAGE.checkFastLearnerDay() ? 1 : 0 };
    })();

    const oldBadges = STORAGE.getBadges();
    const newBadges = GAMIFICATION.checkNewBadges(stats, oldBadges);
    if (newBadges.length > 0) {
      setTimeout(() => {
        newBadges.forEach(badge => {
          STORAGE.saveBadges([...oldBadges, badge.id]);
          setCurrentBadge(badge);
        });
      }, 800);
    }

    refresh();
  };

  const onReviewComplete = (les, ch) => {
    STORAGE.recordReviewResult(les.id, true);
    STORAGE.updateStreak();
    STORAGE.updateDailyCount();
    STORAGE.clearCode(les.id);

    const stage = STORAGE.getLessonReviewStage(les.id);
    const xpEarned = STORAGE.BASE_REVIEW_XP + stage.stage * STORAGE.STAGE_REVIEW_XP_BONUS;
    STORAGE.addReviewXp(xpEarned);

    const total = STORAGE.REVIEW_INTERVALS.length;
    const chain = pageData?.reviewChain;
    const idx = pageData?.reviewIndex ?? 0;
    const chainTotal = pageData?.reviewTotal ?? 0;

    const xpText = lang === 'zh' ? `+${xpEarned} XP` : `+${xpEarned} XP`;
    if (chain && chainTotal > 0) {
      addToast('success', '🔄',
        lang === 'zh'
          ? `复习完成！${xpText} (${stage.reviewsCompleted}/${total}) — ${idx + 1}/${chainTotal}`
          : `Review Complete! ${xpText} (${stage.reviewsCompleted}/${total}) — ${idx + 1}/${chainTotal}`
      );
    } else {
      addToast('success', '🔄',
        lang === 'zh' ? `复习完成！${xpText} (${stage.reviewsCompleted}/${total})` : `Review Complete! ${xpText} (${stage.reviewsCompleted}/${total})`
      );
    }

    const totalReviews = STORAGE.getTotalReviewsCompleted();
    const oldBadges = STORAGE.getBadges();
    const stats = {
      reviewsCompleted: totalReviews,
      xp: STORAGE.getTotalXp(),
      completedLessons: STORAGE.getCompletedCount(),
      completedChapters: 0,
      totalLessons: CHAPTERS.reduce((sum, chapter) => sum + chapter.lessons.length, 0),
      streak: STORAGE.getStreak(),
      perfectLessons: STORAGE.getPerfectCount(),
      fastLearnerDays: STORAGE.checkFastLearnerDay() ? 1 : 0
    };
    const newBadges = GAMIFICATION.checkNewBadges(stats, oldBadges);
    if (newBadges.length > 0) {
      setTimeout(() => {
        newBadges.forEach(badge => {
          STORAGE.saveBadges([...STORAGE.getBadges(), badge.id]);
          setCurrentBadge(badge);
        });
      }, 800);
    }

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);

    setTimeout(() => {
      if (chain && idx < chainTotal - 1) {
        const next = chain[idx + 1];
        lastPageDataRef.current = null;
        navigateTo('lesson', {
          chapterId: next.chapterId,
          lessonId: next.lessonId,
          reviewMode: true,
          reviewChain: chain,
          reviewIndex: idx + 1,
          reviewTotal: chainTotal
        });
      } else {
        navigateTo('reviews');
      }
    }, 1500);
  };

  const onReviewFailed = (les) => {
    addToast('info', '💪',
      lang === 'zh' ? '复习未通过，继续练习！' : 'Review incomplete, keep practicing!'
    );
  };

  const goToPrev = () => {
    if (!lessonData) return;
    const { les, ch } = lessonData;
    const idx = ch.lessons.findIndex(l => l.id === les.id);
    if (idx > 0) loadLesson(ch.id, ch.lessons[idx - 1].id);
  };

  const goToNext = () => {
    if (!lessonData) return;
    const { les, ch } = lessonData;
    const idx = ch.lessons.findIndex(l => l.id === les.id);
    if (idx < ch.lessons.length - 1) {
      loadLesson(ch.id, ch.lessons[idx + 1].id);
    } else {
      const chIdx = CHAPTERS.findIndex(c => c.id === ch.id);
      if (chIdx < CHAPTERS.length - 1) {
        const nextCh = CHAPTERS[chIdx + 1];
        loadLesson(nextCh.id, nextCh.lessons[0].id);
      }
    }
  };

  const renderMarkdown = (md) => {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const segs = md.split(/^```\w*$/gm);
    const parts = [];
    for (let i = 0; i < segs.length; i++) {
      if (i % 2 === 1) {
        if (segs[i].trim()) parts.push('<pre><code>' + esc(segs[i].trim()) + '</code></pre>');
      } else {
        const blocks = segs[i].split(/\n\n+/);
        for (const b of blocks) {
          const t = b.trim();
          if (!t) continue;
          let h = '';
          if (/^## (.+)/.test(t)) h = '<h2>' + t.replace(/^## (.+)/, '$1') + '</h2>';
          else if (/^### (.+)/.test(t)) h = '<h3>' + t.replace(/^### (.+)/, '$1') + '</h3>';
          else if (/^> /.test(t)) {
            const ls = t.split('\n').map(l => l.replace(/^> /, '').replace(/^>/, ''));
            h = '<blockquote>' + ls.join('<br>') + '</blockquote>';
          } else if (/^- /.test(t) || /^\d+\. /.test(t)) {
            const ord = /^\d+\. /.test(t);
            const its = t.split('\n').map(l => '<li>' + l.replace(/^- /, '').replace(/^\d+\. /, '') + '</li>');
            h = (ord ? '<ol>' : '<ul>') + its.join('') + (ord ? '</ol>' : '</ul>');
          } else {
            h = '<p>' + t.replace(/\n/g, '<br>') + '</p>';
          }
          parts.push(h);
        }
      }
    }
    let html = parts.join('\n').replace(/`([^`]+)`/g, '<code>$1</code>');
    const protectedBlocks = [];
    html = html.replace(/(<pre[^>]*>.*?<\/pre>|<code[^>]*>.*?<\/code>)/gs, (match) => {
      const idx = protectedBlocks.length;
      protectedBlocks.push(match);
      return '\x00PROTECT' + idx + '\x00';
    });
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/\x00PROTECT(\d+)\x00/g, (_, idx) => protectedBlocks[+idx] || '');
    return html;
  };

  if (!lessonData) {
    return <div className="page active"><p style={{ padding: 28 }}>Loading...</p></div>;
  }

  const { les, ch } = lessonData;
  const lesIdx = ch.lessons.findIndex(l => l.id === les.id);
  const content = lang === 'zh' ? les.content : les.contentEn;
  const title = lang === 'zh' ? les.title : les.titleEn;
  const isReviewMode = pageData?.reviewMode === true;
  const reviewStage = isReviewMode ? STORAGE.getLessonReviewStage(les.id) : null;
  const totalStages = STORAGE.REVIEW_INTERVALS.length;
  const chainIndex = pageData?.reviewIndex ?? 0;
  const chainTotal = pageData?.reviewTotal ?? 0;

  return (
    <div className="page active" style={{ height: '100%', padding: 0, maxWidth: 'none' }}>
      <div className="lesson-container">
        <div className={`lesson-topbar${isReviewMode ? ' review-mode' : ''}`}>
          <button className="back-btn" onClick={() => navigateTo(isReviewMode ? 'reviews' : 'courses')}>{'←'}</button>
          <span className="lesson-title-bar">{ch.icon} {isReviewMode ? (lang === 'zh' ? `复习 ${title}` : `Review ${title}`) : title}</span>
          {isReviewMode && reviewStage ? (
            <span className="review-stage-badge">
              {chainTotal > 1
                ? (lang === 'zh' ? `${chainIndex + 1}/${chainTotal} · 阶段 ${reviewStage.reviewsCompleted}/${totalStages}` : `${chainIndex + 1}/${chainTotal} · Stage ${reviewStage.reviewsCompleted}/${totalStages}`)
                : (lang === 'zh' ? `复习 ${reviewStage.reviewsCompleted}/${totalStages}` : `Review ${reviewStage.reviewsCompleted}/${totalStages}`)}
            </span>
          ) : (
            <span className="lesson-xp-bar">+{les.xp} XP</span>
          )}
        </div>
        <div className="lesson-body">
          <div className="lesson-instructions-panel">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
            {les.hints?.length > 0 && (
              <div className="hints-inline">
                <div className="hints-title">{lang === 'zh' ? '💡 提示' : '💡 Hints'}</div>
                {(() => {
                  const stepHints = [];
                  for (let i = 0; i < les.hints.length; i += 2) {
                    const zhHint = les.hints[i];
                    if (!zhHint) continue;
                    stepHints.push(zhHint);
                  }

                  const renderHintBody = (hintText) => {
                    const segments = hintText.split(/(【解释】|【代码】)/g).filter(Boolean);
                    const els = [];
                    for (let i = 0; i < segments.length; i++) {
                      if (segments[i] === '【解释】' && i + 1 < segments.length) {
                        i++;
                        const lines = segments[i].trim().split('\n');
                        els.push(<p className="hint-explain">{lines.map((l, li) => <>{li > 0 && <br />}{l}</>)}</p>);
                      } else if (segments[i] === '【代码】' && i + 1 < segments.length) {
                        i++;
                        els.push(<pre className="hint-code">{segments[i].trim()}</pre>);
                      } else {
                        // Fallback: text without markers → treat as explanation
                        const t = segments[i].trim();
                        if (t) els.push(<p className="hint-explain">{t}</p>);
                      }
                    }
                    return els;
                  };

                  return stepHints.map((h, idx) => (
                    <details key={idx} className="hint-step">
                      <summary>{lang === 'zh' ? `第${idx + 1}步` : `Step ${idx + 1}`}</summary>
                      <div className="hint-body">
                        {renderHintBody(h)}
                      </div>
                    </details>
                  ));
                })()}
              </div>
            )}
          </div>
          <div className="lesson-workspace-panel">
            <div className="workspace-header">
              <span className="lang-badge">Python</span>
              <span className="shortcut-hint">
                {lang === 'zh' ? runShortcut : runShortcutEn}
              </span>
            </div>
            <div className="editor-wrapper">
              <CodeEditor ref={editorRef} onRun={handleRun} />
            </div>
            <div className="output-terminal">
              <div className="terminal-header">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
                <span className="terminal-label">{'▶'} Console / 控制台</span>
              </div>
              <div className="terminal-content" id="lesson-output">
                {'▶'} {lang === 'zh' ? '点击“运行”查看输出' : 'Click "Run" to see output'}
              </div>
            </div>
            <div className="lesson-actions">
              <div className="left-buttons">
                {isReviewMode ? (
                  <button className="btn btn-pixel btn-ghost" onClick={() => navigateTo('reviews')}>
                    {'←'} {lang === 'zh' ? '返回复习列表' : 'Back to Reviews'}
                  </button>
                ) : (
                  <>
                    {lesIdx > 0 && (
                      <button className="btn btn-pixel btn-ghost" onClick={goToPrev}>
                        {'←'} {lang === 'zh' ? '上一关' : 'Prev'}
                      </button>
                    )}
                    <AIChat lessonContent={content} language={lang} />
                  </>
                )}
              </div>
              <div className="right-buttons">
                <button className="btn btn-pixel btn-primary" onClick={handleRun} disabled={isRunning}>
                  {'▶'} {lang === 'zh' ? '运行' : 'Run'}
                </button>
                {!isReviewMode && completed && (
                  <button className="btn btn-pixel btn-ghost" onClick={goToNext}>
                    {lang === 'zh' ? '下一关' : 'Next'} {'→'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfetti && <Confetti />}
      <BadgeModal badge={currentBadge} lang={lang} onClose={() => setCurrentBadge(null)} />
    </div>
  );
}

function Confetti() {
  const colors = ['#ff2d78','#00d4ff','#ffd700','#00ff88','#7b2ff7','#ff8c00','#ff5e5e','#5ec8ff','#ff69b4','#ffd700','#00ffcc','#ff4444'];
  const shapes = ['50%','2px','50%','2px','50%','2px'];
  return (
    <>
      <div className="level-complete-overlay">
        <div className="level-complete-text">{'🎉'} Level Complete!</div>
      </div>
      <div className="confetti-container">
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i} className="confetti-particle" style={{
            left: Math.random() * 100 + '%',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            width: (Math.random() * 6 + 4) + 'px',
            height: (Math.random() * 10 + 4) + 'px',
            animationDuration: (Math.random() * 2 + 2.5) + 's',
            animationDelay: Math.random() * 0.6 + 's',
            borderRadius: shapes[Math.floor(Math.random() * shapes.length)],
          }} />
        ))}
      </div>
    </>
  );
}
