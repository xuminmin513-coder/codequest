import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { CHAPTERS } from '../data/courses';
import PageHeader from './ui/PageHeader';

function formatDate(ts, lang) {
  const d = new Date(ts);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target - today) / 86400000);

  if (diffDays === 0) return lang === 'zh' ? '今日' : 'Today';
  if (diffDays === 1) return lang === 'zh' ? '明天' : 'Tomorrow';
  if (diffDays === -1) return lang === 'zh' ? '昨天' : 'Yesterday';

  const weekdays = lang === 'zh'
    ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (diffDays > 0 && diffDays <= 7) {
    return lang === 'zh'
      ? `${weekdays[d.getDay()]}`
      : `${weekdays[d.getDay()]} ${d.getMonth() + 1}/${d.getDate()}`;
  }

  return lang === 'zh'
    ? `${d.getMonth() + 1}月${d.getDate()}日`
    : `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]} ${d.getDate()}`;
}

function getIntervalDays(stage) {
  return STORAGE.REVIEW_INTERVALS[stage] || 1;
}

export default function ReviewList() {
  const { lang, navigateTo, refreshKey } = useApp();
  void refreshKey;

  const completedCount = STORAGE.getCompletedCount();
  if (completedCount === 0) {
    return (
      <div className="page active page-standard review-page">
        <PageHeader
          eyebrow={lang === 'zh' ? '艾宾浩斯复习计划' : 'Spaced repetition'}
          title={lang === 'zh' ? '复习计划' : 'Review plan'}
          description={lang === 'zh' ? '完成第一节课后，系统会在合适的时间安排复习。' : 'Complete a lesson and it will appear here when review is due.'}
        />
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <div className="empty-text">
            {lang === 'zh' ? '先完成一些课程再开始复习吧！' : 'Complete some lessons first to start reviewing!'}
          </div>
          <button className="btn btn-pixel btn-primary" onClick={() => navigateTo('courses')}>
            {lang === 'zh' ? '去学习' : 'Go Learn'} →
          </button>
        </div>
      </div>
    );
  }

  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = todayStart.getTime() + 86400000;

  const data = STORAGE.getReviewData();
  const progress = STORAGE.getProgress();
  const intervals = STORAGE.REVIEW_INTERVALS;
  const totalStages = intervals.length;

  // Collect all review entries with their metadata
  const allReviews = Object.entries(data)
    .filter(([lessonId]) => {
      const chId = lessonId.split('_')[0];
      return progress[chId]?.[lessonId];
    })
    .map(([lessonId, entry]) => ({
      lessonId,
      chapterId: lessonId.split('_')[0],
      stage: entry.stage,
      nextReview: entry.nextReview,
      lastReviewed: entry.lastReviewed,
      reviewsCompleted: entry.reviewsCompleted,
      intervalDays: intervals[entry.stage] || 1
    }));

  // Categorize by urgency
  const overdue = allReviews
    .filter(r => r.nextReview < todayStart.getTime())
    .sort((a, b) => {
      // Sort by "overdue ratio": how many days overdue / interval length
      const aOverdueDays = (now - a.nextReview) / 86400000;
      const bOverdueDays = (now - b.nextReview) / 86400000;
      const aRatio = aOverdueDays / a.intervalDays;
      const bRatio = bOverdueDays / b.intervalDays;
      return bRatio - aRatio;
    });

  const dueToday = allReviews
    .filter(r => r.nextReview >= todayStart.getTime() && r.nextReview < todayEnd)
    .sort((a, b) => a.nextReview - b.nextReview);

  const upcoming = allReviews
    .filter(r => r.nextReview >= todayEnd)
    .sort((a, b) => a.nextReview - b.nextReview);

  // Stats
  const totalDue = overdue.length + dueToday.length;
  const totalReviews = allReviews.reduce((sum, r) => sum + r.reviewsCompleted, 0);

  const renderReviewItem = (item, label, labelClass) => {
    const ch = CHAPTERS.find(c => c.id === item.chapterId);
    const les = ch?.lessons.find(l => l.id === item.lessonId);
    if (!ch || !les) return null;

    const stageDots = Array.from({ length: totalStages }, (_, i) => i < item.stage + 1);

    return (
      <div className="review-item" key={item.lessonId}>
        <div className="review-item-icon">{ch.icon}</div>
        <div className="review-item-info">
          <div className="review-item-title">{lang === 'zh' ? les.title : les.titleEn}</div>
          <div className="review-item-meta">
            <span className="review-item-stage">
              {lang === 'zh' ? `复习 ${item.reviewsCompleted}/${totalStages}` : `Review ${item.reviewsCompleted}/${totalStages}`}
            </span>
            <span className="stage-dots">
              {stageDots.map((filled, i) => (
                <span key={i} className={`stage-dot${filled ? ' filled' : ''}`} />
              ))}
            </span>
            {label && (
              <span className={`review-item-due ${labelClass}`}>{label}</span>
            )}
          </div>
        </div>
        <button className="btn btn-pixel btn-primary" onClick={() => {
          const chain = [...overdue, ...dueToday];
          const idx = chain.findIndex(r => r.lessonId === item.lessonId);
          navigateTo('lesson', {
            chapterId: item.chapterId,
            lessonId: item.lessonId,
            reviewMode: true,
            reviewChain: chain.map(r => ({ chapterId: r.chapterId, lessonId: r.lessonId })),
            reviewIndex: idx >= 0 ? idx : 0,
            reviewTotal: chain.length
          });
        }}>
          {lang === 'zh' ? '开始复习' : 'Review'} →
        </button>
      </div>
    );
  };

  return (
    <div className="page active page-standard review-page">
      <PageHeader
        eyebrow={lang === 'zh' ? '艾宾浩斯复习计划' : 'Spaced repetition'}
        title={lang === 'zh' ? '复习计划' : 'Review plan'}
        description={lang === 'zh' ? '优先完成已到期内容，再查看接下来的复习安排。' : 'Start with overdue work, then preview upcoming reviews.'}
      />

      {/* Stats bar */}
      <div className="review-stats">
        <span>{lang === 'zh' ? `📊 已完成 ${totalReviews} 次复习` : `📊 ${totalReviews} reviews done`}</span>
        <span className="review-due-count">{lang === 'zh' ? `${totalDue} 项待复习` : `${totalDue} due`}</span>
      </div>

      {/* Overdue section */}
      {overdue.length > 0 && (
        <div className="review-section">
          <div className="review-section-title urgent">
            🔴 {lang === 'zh' ? '已过期 — 优先复习' : 'Overdue — Priority'}
            <span className="review-due-count urgent">{overdue.length}</span>
          </div>
          <div className="review-list">
            {overdue.map(item => {
              const overdueDays = Math.floor((now - item.nextReview) / 86400000);
              const ratio = (overdueDays / item.intervalDays).toFixed(1);
              return renderReviewItem(
                item,
                lang === 'zh' ? `⚠️ 已过期 ${overdueDays} 天` : `⚠️ ${overdueDays}d overdue`,
                'overdue'
              );
            })}
          </div>
        </div>
      )}

      {/* Due today section */}
      {dueToday.length > 0 && (
        <div className="review-section">
          <div className="review-section-title">
            🟡 {lang === 'zh' ? '今日复习' : "Today's Review"}
            <span className="review-due-count today">{dueToday.length}</span>
          </div>
          <div className="review-list">
            {dueToday.map(item =>
              renderReviewItem(item, formatDate(item.nextReview, lang), 'upcoming')
            )}
          </div>
        </div>
      )}

      {/* All caught up */}
      {totalDue === 0 && (
        <div className="review-section">
          <div className="empty-state" style={{ padding: '40px 20px' }}>
            <div className="empty-icon">✅</div>
            <div className="empty-text">
              {lang === 'zh' ? '今日复习完毕！继续保持！' : "Today's reviews done! Keep it up!"}
            </div>
            {upcoming.length > 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                {lang === 'zh'
                  ? `下次复习：${formatDate(upcoming[0].nextReview, lang)}`
                  : `Next review: ${formatDate(upcoming[0].nextReview, lang)}`}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Upcoming section */}
      {upcoming.length > 0 && (
        <div className="review-section">
          <div className="review-section-title">
            📅 {lang === 'zh' ? '后续计划' : 'Upcoming'}
          </div>
          <div className="review-list">
            {upcoming.slice(0, 20).map(item =>
              renderReviewItem(item, formatDate(item.nextReview, lang), 'upcoming')
            )}
          </div>
          {upcoming.length > 20 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', marginTop: 8 }}>
              {lang === 'zh' ? `还有 ${upcoming.length - 20} 项` : `${upcoming.length - 20} more`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
