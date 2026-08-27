import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { CHAPTERS } from '../data/courses';
import { getGraduationProgress } from '../utils/curriculumNavigation';
import PageHeader from './ui/PageHeader';
import Surface from './ui/Surface';

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
  const description = finished
    ? (lang === 'zh' ? `你已完成全部 ${totalLessons} 个关卡！` : `You completed all ${totalLessons} lessons!`)
    : (lang === 'zh' ? `当前进度：${completed} / ${totalLessons}` : `Current progress: ${completed} / ${totalLessons}`);

  return (
    <div className="page active page-standard graduation-page">
      <PageHeader
        eyebrow={finished ? (lang === 'zh' ? '课程完成' : 'Course complete') : (lang === 'zh' ? '学习进度' : 'Learning progress')}
        title={title}
        description={description}
      />
      <Surface className={`graduation-card${finished ? ' finished' : ''}`}>
        <div className="graduation-icon" aria-hidden="true">{icon}</div>
        <div className="graduation-progress-copy">
          <strong>{completed} / {totalLessons}</strong>
          <p>{description}</p>
        </div>
        <div className="graduation-actions">
          <button className="primary-action" type="button" onClick={() => navigateTo('reviews')}>
            {lang === 'zh' ? '开始巩固复习' : 'Start review'}
          </button>
          <button className="secondary-action" type="button" onClick={() => navigateTo('dashboard')}>
            {lang === 'zh' ? '返回学习首页' : 'Back to learning'}
          </button>
        </div>
      </Surface>
    </div>
  );
}
