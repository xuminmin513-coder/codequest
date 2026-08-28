import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { CHAPTERS } from '../data/courses';
import { isChapterUnlocked } from '../utils/curriculumNavigation';
import PageHeader from './ui/PageHeader';
import StatusBadge from './ui/StatusBadge';

export default function CourseMap() {
  const { lang, navigateTo, refreshKey } = useApp();
  void refreshKey;
  const [openChapters, setOpenChapters] = useState(() => {
    const initial = {};
    CHAPTERS.forEach((_, index) => { initial[index] = index === 0; });
    return initial;
  });
  const completedCounts = STORAGE.getCompletedPerChapter();
  const progressData = STORAGE.getProgress();

  const toggleChapter = index => {
    setOpenChapters(previous => ({ ...previous, [index]: !previous[index] }));
  };

  return (
    <div className="page active page-standard course-page">
      <PageHeader
        eyebrow={lang === 'zh' ? 'Python 学习路线' : 'Python learning path'}
        title={lang === 'zh' ? '课程地图' : 'Course map'}
        description={lang === 'zh' ? '从基础开始，按顺序完成每一关。每一章都会告诉你正在学习什么。' : 'Start with the foundations and complete each lesson in order.'}
      />

      <div className="chapter-list course-path">
        {CHAPTERS.map((chapter, chapterIndex) => {
          const totalLessons = chapter.lessons.length;
          const completedLessons = completedCounts[chapter.id] || 0;
          const progress = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
          const chapterUnlocked = isChapterUnlocked(CHAPTERS, chapter.id, progressData);
          const expanded = Boolean(openChapters[chapterIndex]);
          const panelId = `chapter-lessons-${chapter.id}`;

          return (
            <section className={`chapter-card${chapterUnlocked ? '' : ' locked'}`} key={chapter.id}>
              <button
                type="button"
                className="chapter-toggle"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggleChapter(chapterIndex)}
              >
                <span className="chapter-icon" aria-hidden="true">{chapter.icon}</span>
                <span className="chapter-info">
                  <strong>{lang === 'zh' ? chapter.title : chapter.titleEn}</strong>
                  <small>{lang === 'zh' ? chapter.description : chapter.descriptionEn}</small>
                  {chapter.optional && (
                    <span className="chapter-lab-label">
                      {lang === 'zh' ? '选修实验 · 开发中' : 'Optional lab · In development'}
                    </span>
                  )}
                </span>
                <span className="chapter-progress-block">
                  <span>{completedLessons}/{totalLessons}</span>
                  <span className="chapter-progress-track" aria-label={`${progress}%`}>
                    <span style={{ width: `${progress}%` }} />
                  </span>
                </span>
                <span className="chapter-chevron" aria-hidden="true">{expanded ? '−' : '+'}</span>
              </button>

              {expanded && (
                <div className="lesson-path" id={panelId}>
                  {chapter.lessons.map((lesson, lessonIndex) => {
                    const completed = STORAGE.isLessonCompleted(chapter.id, lesson.id);
                    const previousDone = lessonIndex === 0 || STORAGE.isLessonCompleted(chapter.id, chapter.lessons[lessonIndex - 1].id);
                    const locked = !chapterUnlocked || (!previousDone && !completed);
                    const current = !locked && !completed;
                    const statusText = completed
                      ? (lang === 'zh' ? '已完成' : 'Complete')
                      : locked
                        ? (lang === 'zh' ? '未解锁' : 'Locked')
                        : (lang === 'zh' ? '当前课程' : 'Current');

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        className={`lesson-path-item${completed ? ' completed' : ''}${current ? ' current' : ''}${locked ? ' locked' : ''}`}
                        aria-disabled={locked}
                        disabled={locked}
                        onClick={() => navigateTo('lesson', { chapterId: chapter.id, lessonId: lesson.id })}
                      >
                        <span className="lesson-step" aria-hidden="true">{completed ? '✓' : lessonIndex + 1}</span>
                        <span className="lesson-path-copy">
                          <strong>{lang === 'zh' ? lesson.title : lesson.titleEn}</strong>
                          <small>{statusText}</small>
                        </span>
                        <StatusBadge tone={completed ? 'success' : current ? 'neutral' : 'warning'}>+{lesson.xp} XP</StatusBadge>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
