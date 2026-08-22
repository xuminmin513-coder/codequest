import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { CHAPTERS } from '../data/courses';
import { getGraduationProgress } from '../utils/curriculumNavigation';

export default function Graduation() {
  const { lang, navigateTo } = useApp();
  const { totalLessons, completed, finished } = getGraduationProgress(
    CHAPTERS,
    STORAGE.getProgress(),
  );
  const icon = finished ? '🏆' : '📚';
  const title = finished
    ? (lang === 'zh' ? 'Python 冒险毕业！' : 'Python Adventure Complete!')
    : (lang === 'zh' ? '继续你的 Python 冒险' : 'Keep Learning Your Python Adventure');

  return (
    <div className="page active graduation-page">
      <div className="graduation-icon" aria-hidden="true">{icon}</div>
      <h2>{title}</h2>
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
