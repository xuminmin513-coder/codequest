import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import { judgeLesson } from '../utils/lessonJudge';
import { renderLessonMarkdown } from '../utils/lessonMarkdown';
import { buildLessonResultView } from '../utils/lessonResultView';
import { createLessonRunGuard } from '../utils/lessonRunGuard';
import {
  getGraduationProgress,
  getNextDestination,
  getRequiredChapters,
  isChapterUnlocked,
} from '../utils/curriculumNavigation';
import { createPythonRunner } from '../runtime/PythonRunner';
import { getLessonRuntimeMode } from '../runtime/runtimePolicy';
import { CHAPTERS } from '../data/courses';
import CodeEditor from './CodeEditor';
import BadgeModal from './BadgeModal';
import Confetti from './Confetti';
import LessonResultDrawer from './LessonResultDrawer';

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
  const [resultView, setResultView] = useState(() => buildLessonResultView({ report: null, lang }));
  const [activeResultTab, setActiveResultTab] = useState('tests');
  const lastPageDataRef = useRef(null);
  const runGuardRef = useRef(createLessonRunGuard());
  const runnerRef = useRef(null);

  useEffect(() => {
    runnerRef.current?.dispose();
    runnerRef.current = null;
    runGuardRef.current.invalidate();
    setIsRunning(false);
    setResultView(buildLessonResultView({ report: null, lang }));
    setActiveResultTab('tests');
    if (!pageData) return;

    const { chapterId, lessonId } = pageData;
    if (lastPageDataRef.current === `${chapterId}-${lessonId}`) return;
    lastPageDataRef.current = `${chapterId}-${lessonId}`;

    const ch = CHAPTERS.find(c => c.id === chapterId);
    if (!ch) { navigateTo('courses'); return; }
    const les = ch.lessons.find(l => l.id === lessonId);
    if (!les) { navigateTo('courses'); return; }

    const lesIdx = ch.lessons.findIndex(l => l.id === lessonId);
    if (!isChapterUnlocked(CHAPTERS, chapterId, STORAGE.getProgress())) {
      addToast('error', '🔒', lang === 'zh' ? '请先完成上一章全部关卡！' : 'Complete all lessons in the previous chapter first!');
      navigateTo('courses');
      return;
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
    runnerRef.current?.dispose();
    runnerRef.current = null;
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

  const handleStop = useCallback(() => {
    const cancelled = runGuardRef.current.cancelCurrent();
    if (!cancelled) return;
    runnerRef.current?.stop();
    setIsRunning(false);
    setResultView(buildLessonResultView({
      report: {
        passed: false,
        status: 'stopped',
        error: lang === 'zh' ? '运行已停止。' : 'Execution stopped.',
        results: [],
        output: '',
      },
      lang,
    }));
    setActiveResultTab('tests');
  }, [lang]);

  const handleRun = useCallback(async () => {
    if (!lessonData || !editorRef.current) return;
    const runToken = runGuardRef.current.begin();
    if (!runToken) return;
    setIsRunning(true);
    let runner = null;

    try {
      const { les, ch } = lessonData;
      const code = editorRef.current.getCode();
      if (!code.trim()) {
        addToast('error', '⚠️', lang === 'zh' ? '请先编写代码' : 'Please write some code first');
        return;
      }

      if (getLessonRuntimeMode(les) === 'visual-lab-pending') {
        const message = lang === 'zh'
          ? '🧪 这一关正在迁移为安全教学实验，暂时不能判题。旧模拟器已经停用，以免让你学到不真实的 Python。'
          : '🧪 This lesson is being migrated to a safe teaching lab and cannot be judged yet. The old simulator is disabled because it did not behave like real Python.';
        const pendingView = buildLessonResultView({
          report: { passed: false, status: 'invalid_request', error: message, results: [], output: message },
          lang,
        });
        setResultView({ ...pendingView, summary: lang === 'zh' ? '暂不可运行' : 'Temporarily unavailable', guidance: message });
        setActiveResultTab('tests');
        return;
      }

      const testCases = les.testCases || [{ input: '', expected: '' }];
      runner = createPythonRunner();
      runnerRef.current = runner;
      const report = await judgeLesson({
        code,
        testCases,
        execute: async (source, input) => runner.run(source, input),
      });

      if (!runGuardRef.current.isCurrent(runToken)) return;

      setResultView(buildLessonResultView({ report, lang }));
      setActiveResultTab('tests');

      if (report.error) {
        if (pageData?.reviewMode) onReviewFailed(les);
        setIsFirstTry(false);
        return;
      }

      if (report.passed) {
        if (pageData?.reviewMode) onReviewComplete(les, ch);
        else onLessonComplete(les, ch);
        return;
      }

      if (pageData?.reviewMode) onReviewFailed(les);
      setIsFirstTry(false);
    } finally {
      runner?.dispose();
      if (runnerRef.current === runner) runnerRef.current = null;
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
      const progress = STORAGE.getProgress();
      const graduation = getGraduationProgress(CHAPTERS, progress);
      const requiredChapters = getRequiredChapters(CHAPTERS);
      const b = STORAGE.getBadges();
      const s = STORAGE.getStreak();
      const p = STORAGE.getPerfectCount();
      const cpc = STORAGE.getCompletedPerChapter();
      let fcc = 0;
      requiredChapters.forEach(ch2 => { if ((cpc[ch2.id] || 0) >= ch2.lessons.length) fcc++; });
      return { xp: totalXp, completedLessons: graduation.completed, completedChapters: fcc, totalLessons: graduation.totalLessons, badges: b.length, streak: s, perfectLessons: p, fastLearnerDays: STORAGE.checkFastLearnerDay() ? 1 : 0 };
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
    const graduation = getGraduationProgress(CHAPTERS, STORAGE.getProgress());
    const stats = {
      reviewsCompleted: totalReviews,
      xp: STORAGE.getTotalXp(),
      completedLessons: graduation.completed,
      completedChapters: 0,
      totalLessons: graduation.totalLessons,
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
    const destination = getNextDestination(CHAPTERS, lessonData.ch.id, lessonData.les.id);
    if (destination.page === 'lesson') {
      loadLesson(destination.data.chapterId, destination.data.lessonId);
    } else {
      navigateTo(destination.page, destination.data);
    }
  };

  if (!lessonData) {
    return <div className="page active"><p style={{ padding: 28 }}>Loading...</p></div>;
  }

  const { les, ch } = lessonData;
  const lesIdx = ch.lessons.findIndex(l => l.id === les.id);
  const content = lang === 'zh' ? les.content : les.contentEn;
  const title = lang === 'zh' ? les.title : les.titleEn;
  const isReviewMode = pageData?.reviewMode === true;
  const showLessonNavigation = isReviewMode || lesIdx > 0 || completed;
  const reviewStage = isReviewMode ? STORAGE.getLessonReviewStage(les.id) : null;
  const totalStages = STORAGE.REVIEW_INTERVALS.length;
  const chainIndex = pageData?.reviewIndex ?? 0;
  const chainTotal = pageData?.reviewTotal ?? 0;

  return (
    <div className="page active lesson-page">
      <div className="lesson-container">
        <header className={`lesson-topbar${isReviewMode ? ' review-mode' : ''}`}>
          <button
            className="back-btn"
            type="button"
            aria-label={lang === 'zh' ? '返回' : 'Back'}
            onClick={() => navigateTo(isReviewMode ? 'reviews' : 'courses')}
          >
            {'←'}
          </button>
          <span className="lesson-title-bar">
            {isReviewMode ? (lang === 'zh' ? `复习 · ${title}` : `Review · ${title}`) : title}
          </span>
          {isReviewMode && reviewStage ? (
            <span className="review-stage-badge">
              {chainTotal > 1
                ? (lang === 'zh' ? `${chainIndex + 1}/${chainTotal} · 阶段 ${reviewStage.reviewsCompleted}/${totalStages}` : `${chainIndex + 1}/${chainTotal} · Stage ${reviewStage.reviewsCompleted}/${totalStages}`)
                : (lang === 'zh' ? `复习 ${reviewStage.reviewsCompleted}/${totalStages}` : `Review ${reviewStage.reviewsCompleted}/${totalStages}`)}
            </span>
          ) : (
            <span className="lesson-xp-bar">+{les.xp} XP</span>
          )}
        </header>

        <div className="lesson-workspace">
          <aside className="lesson-brief" aria-label={lang === 'zh' ? '学习说明' : 'Lesson brief'}>
            <div className="lesson-brief-heading">
              <span>{lang === 'zh' ? '先理解，再动手' : 'Understand, then build'}</span>
              <strong>{ch.icon} {lang === 'zh' ? '学习说明' : 'Lesson brief'}</strong>
            </div>
            <div className="lesson-brief-content" dangerouslySetInnerHTML={{ __html: renderLessonMarkdown(content) }} />
            {les.hints?.length > 0 && (
              <div className="hints-inline">
                <div className="hints-title">{lang === 'zh' ? '分步提示' : 'Step-by-step hints'}</div>
                {(() => {
                  const stepHints = [];
                  for (let i = 0; i < les.hints.length; i += 2) {
                    const hint = les.hints[i];
                    if (hint) stepHints.push(hint);
                  }

                  const renderHintBody = hintText => {
                    const segments = hintText.split(/(【解释】|【代码】)/g).filter(Boolean);
                    const elements = [];
                    for (let i = 0; i < segments.length; i++) {
                      if (segments[i] === '【解释】' && i + 1 < segments.length) {
                        i++;
                        const lines = segments[i].trim().split('\n');
                        elements.push(<p className="hint-explain" key={`explain-${i}`}>{lines.map((line, lineIndex) => <React.Fragment key={lineIndex}>{lineIndex > 0 && <br />}{line}</React.Fragment>)}</p>);
                      } else if (segments[i] === '【代码】' && i + 1 < segments.length) {
                        i++;
                        elements.push(<pre className="hint-code" key={`code-${i}`}>{segments[i].trim()}</pre>);
                      } else {
                        const plainText = segments[i].trim();
                        if (plainText) elements.push(<p className="hint-explain" key={`plain-${i}`}>{plainText}</p>);
                      }
                    }
                    return elements;
                  };

                  return stepHints.map((hint, index) => (
                    <details key={index} className="hint-step">
                      <summary>{lang === 'zh' ? `提示 ${index + 1}` : `Hint ${index + 1}`}</summary>
                      <div className="hint-body">{renderHintBody(hint)}</div>
                    </details>
                  ));
                })()}
              </div>
            )}
          </aside>

          <main className="lesson-coding-column">
            <section className="lesson-editor-card" aria-label={lang === 'zh' ? '代码编辑器' : 'Code editor'}>
              <div className="workspace-header">
                <span className="lang-badge">Python</span>
                <span className="shortcut-hint">{lang === 'zh' ? runShortcut : runShortcutEn}</span>
              </div>
              <div className="editor-wrapper">
                <CodeEditor ref={editorRef} onRun={isRunning ? handleStop : handleRun} />
              </div>
              <div className="lesson-editor-actions">
                <button className={`lesson-primary-action${isRunning ? ' stop' : ''}`} type="button" onClick={isRunning ? handleStop : handleRun}>
                  {isRunning ? '■' : '▶'} {isRunning ? (lang === 'zh' ? '停止' : 'Stop') : (lang === 'zh' ? '运行代码' : 'Run code')}
                </button>
              </div>
            </section>

            <LessonResultDrawer
              lang={lang}
              view={resultView}
              activeTab={activeResultTab}
              onTabChange={setActiveResultTab}
            />

            {showLessonNavigation && (
              <div className="lesson-actions">
                <div className="left-buttons">
                  {isReviewMode ? (
                    <button className="lesson-secondary-action" type="button" onClick={() => navigateTo('reviews')}>
                      {'←'} {lang === 'zh' ? '返回复习列表' : 'Back to reviews'}
                    </button>
                  ) : lesIdx > 0 ? (
                    <button className="lesson-secondary-action" type="button" onClick={goToPrev}>
                      {'←'} {lang === 'zh' ? '上一关' : 'Previous'}
                    </button>
                  ) : <span />}
                </div>
                <div className="right-buttons">
                  {!isReviewMode && completed && (
                    <button className="lesson-secondary-action" type="button" onClick={goToNext}>
                      {lang === 'zh' ? '下一关' : 'Next'} {'→'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      {showConfetti && <Confetti />}
      <BadgeModal badge={currentBadge} lang={lang} onClose={() => setCurrentBadge(null)} />
    </div>
  );
}
