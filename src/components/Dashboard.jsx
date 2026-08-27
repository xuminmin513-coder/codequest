import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import { CHAPTERS } from '../data/courses';
import SkillUnlockModal from './SkillUnlockModal';
import PageHeader from './ui/PageHeader';
import StatusBadge from './ui/StatusBadge';
import Surface from './ui/Surface';

export default function Dashboard() {
  const { lang, navigateTo, refreshKey, addToast } = useApp();
  const [showSkillUnlock, setShowSkillUnlock] = useState(null);
  void refreshKey;

  const totalXp = STORAGE.getTotalXp();
  const level = GAMIFICATION.getLevel(totalXp);
  const levelProgress = GAMIFICATION.levelProgress(totalXp);
  const completedCount = STORAGE.getCompletedCount();
  const totalLessons = CHAPTERS.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  const streak = STORAGE.getStreak();
  const dailyCount = STORAGE.getDailyCount();
  const nextXp = GAMIFICATION.xpForNextLevel(level);
  const pendingReviews = STORAGE.getPendingReviewCount();

  let nextLesson = null;
  let nextChapter = null;
  outer: for (const chapter of CHAPTERS) {
    for (const lesson of chapter.lessons) {
      if (!STORAGE.isLessonCompleted(chapter.id, lesson.id)) {
        nextLesson = lesson;
        nextChapter = chapter;
        break outer;
      }
    }
  }

  const skills = [
    {
      id: 'skill_ch1',
      icon: CHAPTERS[0]?.icon || '◆',
      nameCn: 'Python 基础',
      nameEn: 'Python Foundations',
      descCn: '掌握 print、注释和数字运算等基础知识',
      descEn: 'Master print, comments, and number operations',
      unlockRequirement: lang === 'zh' ? '完成第一章课程与复习后解锁' : 'Complete Chapter 1 and its reviews',
      onUnlock: () => navigateTo('courses'),
    },
  ];

  useEffect(() => {
    skills.forEach(skill => {
      if (STORAGE.isSkillUnlocked(skill.id)) return;
      if (!STORAGE.isCh1SkillUnlockable()) return;
      STORAGE.markSkillUnlocked(skill.id);
      setShowSkillUnlock(skill);
    });
  }, [refreshKey]);

  const openNextLesson = () => {
    if (!nextLesson || !nextChapter) return;
    navigateTo('lesson', { chapterId: nextChapter.id, lessonId: nextLesson.id });
  };

  const exportSave = () => {
    try {
      const data = STORAGE.exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `xm2code-save-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      addToast('success', '✓', lang === 'zh' ? '存档已导出' : 'Save exported');
    } catch (error) {
      addToast('error', '!', lang === 'zh' ? `导出失败：${error.message}` : `Export failed: ${error.message}`);
    }
  };

  const importSave = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = readEvent => {
        try {
          STORAGE.importAllData(JSON.parse(readEvent.target.result));
          addToast('success', '✓', lang === 'zh' ? '存档已恢复' : 'Save restored');
          window.location.reload();
        } catch {
          addToast('error', '!', lang === 'zh' ? '恢复失败：文件格式错误' : 'Restore failed: invalid file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="page active dashboard-page">
      <PageHeader
        eyebrow={lang === 'zh' ? '今日学习' : 'Today'}
        title={lang === 'zh' ? '继续学习 Python' : 'Continue learning Python'}
        description={lang === 'zh' ? '从上次停下的位置继续，一次完成一个小目标。' : 'Pick up where you left off, one small goal at a time.'}
      />

      <Surface className="dashboard-continue-card">
        <div className="continue-copy">
          <div className="continue-meta">
            <StatusBadge>{completedCount} / {totalLessons}</StatusBadge>
            <span>{nextChapter ? (lang === 'zh' ? nextChapter.title : nextChapter.titleEn) : (lang === 'zh' ? '课程完成' : 'Course complete')}</span>
          </div>
          <h2>
            {nextLesson
              ? (lang === 'zh' ? nextLesson.title : nextLesson.titleEn)
              : (lang === 'zh' ? '你已完成全部课程' : 'You completed every lesson')}
          </h2>
          <p>
            {nextLesson
              ? (lang === 'zh' ? '继续完成下一关，代码会自动保存在本机。' : 'Continue with the next lesson. Your code saves locally.')
              : (lang === 'zh' ? '现在可以按遗忘曲线继续复习。' : 'Keep your skills fresh with scheduled reviews.')}
          </p>
        </div>
        <button
          className="primary-action continue-action"
          type="button"
          onClick={nextLesson ? openNextLesson : () => navigateTo('reviews')}
        >
          {nextLesson
            ? (lang === 'zh' ? '继续学习' : 'Continue')
            : (lang === 'zh' ? '开始复习' : 'Start review')}
          <span aria-hidden="true">→</span>
        </button>
      </Surface>

      <div className="dashboard-secondary-grid">
        <Surface className="dashboard-stat-card">
          <div className="stat-card-head">
            <span>{lang === 'zh' ? '等级进度' : 'Level progress'}</span>
            <strong>{level}</strong>
          </div>
          <div className="progress-track" aria-label={lang === 'zh' ? '等级进度' : 'Level progress'}>
            <span style={{ width: `${levelProgress}%` }} />
          </div>
          <small>{totalXp} / {nextXp} XP</small>
        </Surface>

        <Surface className="dashboard-stat-card">
          <div className="stat-card-head">
            <span>{lang === 'zh' ? '今日复习' : 'Reviews due'}</span>
            <strong>{pendingReviews}</strong>
          </div>
          <p>{lang === 'zh' ? '根据艾宾浩斯复习计划安排' : 'Scheduled by spaced repetition'}</p>
          <button type="button" onClick={() => navigateTo('reviews')}>
            {lang === 'zh' ? '查看复习' : 'View reviews'}
          </button>
        </Surface>

        <Surface className="dashboard-stat-card">
          <div className="stat-card-head">
            <span>{lang === 'zh' ? '连续学习' : 'Learning streak'}</span>
            <strong>{streak}{lang === 'zh' ? ' 天' : ' days'}</strong>
          </div>
          <p>{lang === 'zh' ? `今天已完成 ${dailyCount} 次练习` : `${dailyCount} sessions completed today`}</p>
          <small>{lang === 'zh' ? `课程 XP ${totalXp - STORAGE.getReviewXp()} · 复习 XP ${STORAGE.getReviewXp()}` : `Lessons ${totalXp - STORAGE.getReviewXp()} XP · Reviews ${STORAGE.getReviewXp()} XP`}</small>
        </Surface>
      </div>

      <section className="dashboard-section" aria-labelledby="learning-tools-title">
        <div className="section-heading">
          <div>
            <span className="page-eyebrow">{lang === 'zh' ? '快速入口' : 'Quick access'}</span>
            <h2 id="learning-tools-title">{lang === 'zh' ? '学习工具' : 'Learning tools'}</h2>
          </div>
        </div>
        <div className="dashboard-tools-grid">
          {skills.map(skill => {
            const unlocked = STORAGE.isSkillUnlocked(skill.id);
            return (
              <Surface
                as="button"
                type="button"
                key={skill.id}
                className={`dashboard-tool-card${unlocked ? '' : ' locked'}`}
                disabled={!unlocked}
                onClick={skill.onUnlock}
              >
                <span className="tool-icon" aria-hidden="true">{unlocked ? skill.icon : '⌁'}</span>
                <strong>{lang === 'zh' ? skill.nameCn : skill.nameEn}</strong>
                <small>{unlocked ? (lang === 'zh' ? skill.descCn : skill.descEn) : skill.unlockRequirement}</small>
              </Surface>
            );
          })}
          <Surface as="button" type="button" className="dashboard-tool-card" onClick={() => navigateTo('courses')}>
            <span className="tool-icon" aria-hidden="true">⌘</span>
            <strong>{lang === 'zh' ? '课程地图' : 'Course map'}</strong>
            <small>{completedCount}/{totalLessons} {lang === 'zh' ? '关已完成' : 'lessons complete'}</small>
          </Surface>
          <Surface as="button" type="button" className="dashboard-tool-card" onClick={() => navigateTo('achievements')}>
            <span className="tool-icon" aria-hidden="true">◇</span>
            <strong>{lang === 'zh' ? '成就' : 'Achievements'}</strong>
            <small>{STORAGE.getBadges().length}/{GAMIFICATION.BADGES.length} {lang === 'zh' ? '枚已获得' : 'earned'}</small>
          </Surface>
          <Surface as="button" type="button" className="dashboard-tool-card" onClick={() => navigateTo('shortcuts')}>
            <span className="tool-icon" aria-hidden="true">⌨︎</span>
            <strong>{lang === 'zh' ? '快捷键' : 'Shortcuts'}</strong>
            <small>{lang === 'zh' ? '提高代码输入效率' : 'Write code more efficiently'}</small>
          </Surface>
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="save-tools-title">
        <div className="section-heading">
          <div>
            <span className="page-eyebrow">{lang === 'zh' ? '本地数据' : 'Local data'}</span>
            <h2 id="save-tools-title">{lang === 'zh' ? '存档工具' : 'Save tools'}</h2>
          </div>
        </div>
        <div className="save-tools-grid">
          <Surface as="button" type="button" className="dashboard-tool-card" onClick={exportSave}>
            <span className="tool-icon" aria-hidden="true">↑</span>
            <strong>{lang === 'zh' ? '导出存档' : 'Export save'}</strong>
            <small>{lang === 'zh' ? '下载一份本地备份' : 'Download a local backup'}</small>
          </Surface>
          <Surface as="button" type="button" className="dashboard-tool-card" onClick={importSave}>
            <span className="tool-icon" aria-hidden="true">↓</span>
            <strong>{lang === 'zh' ? '恢复存档' : 'Restore save'}</strong>
            <small>{lang === 'zh' ? '从备份文件恢复进度' : 'Restore progress from a backup'}</small>
          </Surface>
        </div>
      </section>

      {showSkillUnlock && (
        <SkillUnlockModal
          skill={showSkillUnlock}
          lang={lang}
          onClose={() => {
            STORAGE.markSkillUnlockShown(showSkillUnlock.id);
            setShowSkillUnlock(null);
          }}
        />
      )}
    </div>
  );
}
