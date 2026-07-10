import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import { CHAPTERS } from '../data/courses';
import SkillUnlockModal from './SkillUnlockModal';

export default function Dashboard() {
  const { lang, navigateTo, refreshKey, addToast } = useApp();
  const [showSkillUnlock, setShowSkillUnlock] = useState(null);

  // Force re-render on refreshKey change
  void refreshKey;

  const totalXp = STORAGE.getTotalXp();
  const level = GAMIFICATION.getLevel(totalXp);
  const levelProgress = GAMIFICATION.levelProgress(totalXp);
  const completedCount = STORAGE.getCompletedCount();
  const totalLessons = CHAPTERS.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const streak = STORAGE.getStreak();
  const dailyCount = STORAGE.getDailyCount();
  const nextXp = GAMIFICATION.xpForNextLevel(level);

  // Find next uncompleted lesson
  let nextLesson = null, nextChapterId = null, nextLessonId = null;
  outer: for (const ch of CHAPTERS) {
    for (const les of ch.lessons) {
      if (!STORAGE.isLessonCompleted(ch.id, les.id)) {
        nextLesson = les;
        nextChapterId = ch.id;
        nextLessonId = les.id;
        break outer;
      }
    }
  }

  // Check if next lesson on courses is better
  const SKILLS = [
    {
      id: 'skill_ch1',
      icon: CHAPTERS[0]?.icon || '🚀',
      name: 'Python 基础',
      nameCn: 'Python 基础',
      desc: '掌握 print、注释、数字运算等 Python 基础知识',
      descCn: '掌握 print、注释、数字运算等 Python 基础知识',
      descEn: 'Master print, comments, math operations and more',
      chapterId: 'ch1',
      totalLessons: 5,
      unlockRequirement: (lang === 'zh' ? '完成第一章全部课程与复习' : 'Complete Chapter 1 and all reviews'),
      onUnlock: () => navigateTo('courses')
    }
  ];

  // Check auto-unlock on render or when refreshKey changes
  useEffect(() => {
    SKILLS.forEach(skill => {
      if (STORAGE.isSkillUnlocked(skill.id)) return;
      if (!STORAGE.isCh1SkillUnlockable()) return;
      STORAGE.markSkillUnlocked(skill.id);
      setShowSkillUnlock(skill);
    });
  }, [refreshKey]);

  return (
    <div className="page active">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>{lang === 'zh' ? '欢迎回来，冒险者！' : 'Welcome back, Adventurer!'}</h1>
          <p>{lang === 'zh' ? '继续你的Python学习之旅' : 'Continue your Python learning journey'}</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{totalXp}</div>
            <div className="stat-label">XP</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{level}</div>
            <div className="stat-label">{lang === 'zh' ? '等级' : 'Level'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{streak}{lang === 'zh' ? '天' : 'd'}</div>
            <div className="stat-label">{lang === 'zh' ? '连续学习' : 'Streak'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completedCount}/{totalLessons}</div>
            <div className="stat-label">{lang === 'zh' ? '已完成' : 'Done'}</div>
          </div>
        </div>
      </div>

      <div className="level-progress-card">
        <div className="level-header">
          <span className="level-title">{lang === 'zh' ? '等级' : 'Level'} {level}</span>
          <span className="level-xp">{totalXp} / {nextXp} XP</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${levelProgress}%` }} />
        </div>
        <div className="level-sub">
          <span>{lang === 'zh' ? '课程' : 'Lessons'}: {STORAGE.getTotalXp() - STORAGE.getReviewXp()} XP</span>
          <span>{lang === 'zh' ? '复习' : 'Reviews'}: +{STORAGE.getReviewXp()} XP</span>
          <span>{lang === 'zh' ? '复习次数' : 'Reviews done'}: {STORAGE.getTotalReviewsCompleted()}</span>
        </div>
      </div>

      <h2 className="section-title">
        <span>{streak > 0 ? '🔥' : '❄️'}</span>
        <span>{lang === 'zh' ? '快捷入口' : 'Quick Actions'}</span>
      </h2>
      <div className="quick-actions">
        {SKILLS.map(skill => {
          const unlocked = STORAGE.isSkillUnlocked(skill.id);
          return (
            <div
              key={skill.id}
              className={`quick-action-card ${unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => unlocked && skill.onUnlock()}
            >
              <div className="qa-icon">{unlocked ? skill.icon : '🔒'}</div>
              <div className="qa-title">
                {!unlocked && <span className="lock-icon">🔒</span>}
                {lang === 'zh' ? skill.nameCn : skill.name}
              </div>
              <div className="qa-desc">
                {unlocked
                  ? (lang === 'zh' ? '已解锁，点击进入' : 'Unlocked, click to enter')
                  : skill.unlockRequirement}
              </div>
            </div>
          );
        })}
        {nextLesson && (() => {
          const ch = CHAPTERS.find(c => c.id === nextChapterId);
          return (
            <div
              className="quick-action-card"
              onClick={() => navigateTo('lesson', { chapterId: nextChapterId, lessonId: nextLessonId })}
            >
              <div className="qa-icon">{ch ? ch.icon : '📚'}</div>
              <div className="qa-title">{lang === 'zh' ? '继续学习' : 'Continue'}</div>
              <div className="qa-desc">
                {lang === 'zh' ? nextLesson.title : nextLesson.titleEn}
              </div>
            </div>
          );
        })()}
        <div className="quick-action-card" onClick={() => navigateTo('courses')}>
          <div className="qa-icon">🗺️</div>
          <div className="qa-title">{lang === 'zh' ? '课程地图' : 'Course Map'}</div>
          <div className="qa-desc">{completedCount}/{totalLessons} {lang === 'zh' ? '已完成' : 'completed'}</div>
        </div>
        <div className="quick-action-card" onClick={() => navigateTo('achievements')}>
          <div className="qa-icon">🏅</div>
          <div className="qa-title">{lang === 'zh' ? '成就徽章' : 'Achievements'}</div>
          <div className="qa-desc">{STORAGE.getBadges().length}/{GAMIFICATION.BADGES.length} {lang === 'zh' ? '已获得' : 'earned'}</div>
        </div>
        <div className="quick-action-card" onClick={() => navigateTo('shortcuts')}>
          <div className="qa-icon">⌨️</div>
          <div className="qa-title">{lang === 'zh' ? 'Python快捷键' : 'Python Shortcuts'}</div>
        </div>
        {STORAGE.getPendingReviewCount() > 0 && (
          <div className="quick-action-card" onClick={() => navigateTo('reviews')}>
            <div className="qa-icon">🔄</div>
            <div className="qa-title">{lang === 'zh' ? '今日复习' : 'Reviews'}</div>
            <div className="qa-desc">{STORAGE.getPendingReviewCount()} {lang === 'zh' ? '个待复习' : 'due for review'}</div>
          </div>
        )}
      </div>

      <h2 className="section-title" style={{ marginTop: 24 }}>
        <span>💾</span>
        <span>{lang === 'zh' ? '存档管理' : 'Save Data'}</span>
      </h2>
      <div className="quick-actions">
        <div
          className="quick-action-card"
          onClick={() => {
            try {
              const data = STORAGE.exportAllData();
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `codedex-save-${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
              URL.revokeObjectURL(url);
              addToast('success', '✅', lang === 'zh' ? '存档已导出！' : 'Save exported!');
            } catch (e) {
              addToast('error', '❌', lang === 'zh' ? '导出失败：' + e.message : 'Export failed: ' + e.message);
            }
          }}
        >
          <div className="qa-icon">📤</div>
          <div className="qa-title">{lang === 'zh' ? '导出存档' : 'Export Save'}</div>
          <div className="qa-desc">{lang === 'zh' ? '下载存档文件到电脑' : 'Download save file'}</div>
        </div>
        <div
          className="quick-action-card"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                try {
                  const data = JSON.parse(ev.target.result);
                  STORAGE.importAllData(data);
                  addToast('success', '✅', lang === 'zh' ? '存档已恢复！' : 'Save restored!');
                  window.location.reload();
                } catch (err) {
                  addToast('error', '❌', lang === 'zh' ? '恢复失败：文件格式错误' : 'Restore failed: invalid file');
                }
              };
              reader.readAsText(file);
            };
            input.click();
          }}
        >
          <div className="qa-icon">📥</div>
          <div className="qa-title">{lang === 'zh' ? '恢复存档' : 'Restore Save'}</div>
          <div className="qa-desc">{lang === 'zh' ? '从存档文件恢复进度' : 'Restore from save file'}</div>
        </div>
      </div>

      {showSkillUnlock && (
        <SkillUnlockModal
          skill={showSkillUnlock}
          lang={lang}
          onClose={() => {
            const skillId = showSkillUnlock.id;
            STORAGE.markSkillUnlockShown(skillId);
            setShowSkillUnlock(null);
          }}
        />
      )}
    </div>
  );
}
