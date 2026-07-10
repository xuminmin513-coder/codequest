import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { CHAPTERS } from '../data/courses';

export default function CourseMap() {
  const { lang, navigateTo, refreshKey } = useApp();
  void refreshKey;

  const [openChapters, setOpenChapters] = useState(() => {
    const init = {};
    CHAPTERS.forEach((_, idx) => { init[idx] = idx === 0; });
    return init;
  });

  const completedCounts = STORAGE.getCompletedPerChapter();

  const toggleChapter = (idx) => {
    setOpenChapters(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="page active">
      <h2 className="section-title">
        🗺️ <span>{lang === 'zh' ? '课程地图' : 'Course Map'}</span>
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>
        {lang === 'zh' ? '完成每个关卡来学习 Python，从基础到项目！' : 'Complete each lesson to learn Python, from basics to projects!'}
      </p>
      <div className="chapter-list">
        {CHAPTERS.map((ch, chIdx) => {
          const totalInCh = ch.lessons.length;
          const doneInCh = completedCounts[ch.id] || 0;
          const chProgress = Math.round((doneInCh / totalInCh) * 100);

          let isUnlocked = chIdx === 0;
          if (chIdx > 0) {
            const prevCh = CHAPTERS[chIdx - 1];
            isUnlocked = STORAGE.isChapterCompleted(prevCh.id, prevCh.lessons.length);
          }

          const chTitle = lang === 'zh' ? ch.title : ch.titleEn;
          const chDesc = lang === 'zh' ? ch.description : ch.descriptionEn;

          return (
            <div className="chapter-card" key={ch.id} style={{ opacity: isUnlocked ? 1 : 0.6 }}>
              <div className="chapter-header" onClick={() => toggleChapter(chIdx)}>
                <div className="chapter-icon">{ch.icon}</div>
                <div className="chapter-info">
                  <div className="chapter-title">{chTitle}</div>
                  <div className="chapter-desc">{chDesc} · {totalInCh} {lang === 'zh' ? '关' : 'lessons'}</div>
                </div>
                <div className="chapter-progress">
                  <div className="cp-text">{doneInCh}/{totalInCh}</div>
                  <div className="cp-bar"><div className="cp-fill" style={{ width: `${chProgress}%` }} /></div>
                </div>
              </div>
              <div className="lesson-list" style={{ display: openChapters[chIdx] ? 'block' : 'none' }}>
                {ch.lessons.map((les, lesIdx) => {
                  const isCompleted = STORAGE.isLessonCompleted(ch.id, les.id);
                  const isLocked = !isUnlocked ||
                    (lesIdx > 0 && !STORAGE.isLessonCompleted(ch.id, ch.lessons[lesIdx - 1].id) && !isCompleted);
                  const lesTitle = lang === 'zh' ? les.title : les.titleEn;

                  return (
                    <div
                      key={les.id}
                      className={`lesson-item ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                      onClick={isLocked ? undefined : () => navigateTo('lesson', { chapterId: ch.id, lessonId: les.id })}
                    >
                      <div className="lesson-status">{isCompleted ? '✅' : (isLocked ? '🔒' : '📖')}</div>
                      <div className="lesson-num">{lesIdx + 1}</div>
                      <div className="lesson-info">
                        <div className="lesson-title">{lesTitle}</div>
                      </div>
                      <div className="lesson-xp">+{les.xp} XP</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
