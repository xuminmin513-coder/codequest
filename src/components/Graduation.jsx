import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { CHAPTERS } from '../data/courses';

export default function Graduation() {
  const { lang, navigateTo } = useApp();
  const totalLessons = CHAPTERS.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  const completed = STORAGE.getCompletedCount();
  const finished = completed >= totalLessons;

  return (
    <div className="page active graduation-page">
      <div className="graduation-icon">🏆</div>
      <h2>{lang === 'zh' ? 'Python 冒险毕业！' : 'Python Adventure Complete!'}</h2>
      <p>
        {finished
          ? (lang === 'zh'
              ? `你已完成全部 ${totalLessons} 个关卡！`
              : `You completed all ${totalLessons} lessons!`)
          : (lang === 'zh'
              ? `当前进度：${completed} / ${totalLessons}`
              : `Current progress: ${completed} / ${totalLessons}`)}
      </p>
      <div className="graduation-actions">
        <button className="btn btn-pixel btn-primary" onClick={() => navigateTo('reviews')}>
          {lang === 'zh' ? '开始巩固复习' : 'Start Review'}
        </button>
        <button className="btn btn-pixel btn-ghost" onClick={() => navigateTo('dashboard')}>
          {lang === 'zh' ? '返回仪表盘' : 'Back to Dashboard'}
        </button>
      </div>
    </div>
  );
}
