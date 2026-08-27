import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import { CHAPTERS } from '../data/courses';
import SaveSlots from './SaveSlots';
import PageHeader from './ui/PageHeader';
import Surface from './ui/Surface';

export default function Settings() {
  const { lang, toggleLanguage, refresh, addToast } = useApp();
  const totalXp = STORAGE.getTotalXp();
  const completedCount = STORAGE.getCompletedCount();
  const totalLessons = CHAPTERS.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const streak = STORAGE.getStreak();
  let curriculumArchives = [];
  let curriculumArchiveError = false;
  try {
    curriculumArchives = STORAGE.getCurriculumArchives();
  } catch {
    curriculumArchiveError = true;
  }

  const resetProgress = () => {
    if (window.confirm(
      lang === 'zh'
        ? '确定要重置当前学习进度吗？系统会自动创建可恢复存档，语言和历史存档会保留。'
        : 'Reset current learning progress? A restorable archive is created automatically; language and history archives remain.'
    )) {
      try {
        STORAGE.restartForV2();
        addToast('info', '🗑️', lang === 'zh' ? '当前进度已归档并重置' : 'Current progress archived and reset');
        refresh();
      } catch {
        addToast('error', '❌', lang === 'zh'
          ? '重置失败，当前进度未被清除。'
          : 'Reset failed. Current progress was not cleared.');
      }
    }
  };

  const exportProgress = () => {
    try {
      const data = STORAGE.exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `codedex-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('success', '💾', lang === 'zh' ? '进度已导出' : 'Progress exported');
    } catch {
      addToast('error', '❌', lang === 'zh'
        ? '导出失败，请检查存档或可用磁盘空间。'
        : 'Export failed. Check the archive or available disk space.');
    }
  };

  const importProgress = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          STORAGE.importAllData(data);
          addToast('success', '📥', lang === 'zh' ? '进度已导入，刷新中...' : 'Progress imported, refreshing...');
          setTimeout(() => window.location.reload(), 500);
        } catch {
          addToast('error', '❌', lang === 'zh'
            ? '导入失败：备份无效或无法写入，当前数据未更改。'
            : 'Import failed: the backup is invalid or could not be written. Current data was not changed.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const restoreCurriculumArchive = (archive) => {
    if (!window.confirm(lang === 'zh' ? '恢复此历史存档？当前新版进度也会自动归档。' : 'Restore this archive? Your current V2 progress will also be archived.')) return;
    try {
      STORAGE.restoreCurriculumArchive(archive.id);
      refresh();
      window.location.reload();
    } catch {
      addToast('error', '❌', lang === 'zh'
        ? '恢复失败，当前进度和历史存档未更改。'
        : 'Restore failed. Current progress and curriculum archives were not changed.');
    }
  };

  return (
    <div className="page active settings-page">
      <PageHeader
        eyebrow="XM²code"
        title={lang === 'zh' ? '设置' : 'Settings'}
        description={lang === 'zh'
          ? '管理语言、本机存档和学习数据。只有主动登录后，才会开启跨设备同步。'
          : 'Manage language, local saves, and learning data. Cross-device sync starts only after you sign in.'}
      />
      <div id="settings-content" className="settings-layout">
        <Surface className="settings-card settings-language-card">
          <div className="settings-card-heading">
            <div>
              <span className="settings-card-kicker">{lang === 'zh' ? '显示' : 'Display'}</span>
              <h2>{lang === 'zh' ? '语言' : 'Language'}</h2>
            </div>
          </div>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '界面语言' : 'Interface Language'}</div>
              <div className="setting-desc">{lang === 'zh' ? '当前：中文' : 'Current: English'}</div>
            </div>
            <button className="settings-action" type="button" onClick={toggleLanguage}>
              {lang === 'zh' ? '切换到 English' : '切换到 中文'}
            </button>
          </div>
        </Surface>

        <SaveSlots />

        <Surface className="settings-card settings-stats-card">
          <div className="settings-card-heading">
            <div>
              <span className="settings-card-kicker">{lang === 'zh' ? '学习概览' : 'Learning overview'}</span>
              <h2>{lang === 'zh' ? '统计' : 'Stats'}</h2>
            </div>
          </div>
          <div className="settings-stat-grid">
            <div>
              <strong>{totalXp}</strong>
              <span>XP</span>
            </div>
            <div>
              <strong>{completedCount}<small> / {totalLessons}</small></strong>
              <span>{lang === 'zh' ? '已完成课程' : 'Lessons completed'}</span>
            </div>
            <div>
              <strong>{streak}</strong>
              <span>{lang === 'zh' ? '连续学习天数' : 'Day streak'}</span>
            </div>
          </div>
        </Surface>

        <Surface className="settings-card settings-data-card">
          <div className="settings-card-heading">
            <div>
              <span className="settings-card-kicker">{lang === 'zh' ? '备份与恢复' : 'Backup and restore'}</span>
              <h2>{lang === 'zh' ? '数据管理' : 'Data management'}</h2>
            </div>
          </div>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '导出学习进度' : 'Export Progress'}</div>
              <div className="setting-desc">{lang === 'zh' ? '下载一份本地备份文件，方便自行保管。' : 'Download a local backup file for safekeeping.'}</div>
            </div>
            <button className="settings-action" type="button" onClick={exportProgress}>
              {lang === 'zh' ? '导出' : 'Export'}
            </button>
          </div>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '导入学习进度' : 'Import Progress'}</div>
              <div className="setting-desc">{lang === 'zh' ? '从备份文件恢复进度（将覆盖当前数据）' : 'Restore progress from backup (overwrites current data)'}</div>
            </div>
            <button className="settings-action" type="button" onClick={importProgress}>
              {lang === 'zh' ? '导入' : 'Import'}
            </button>
          </div>
          <div className="setting-item settings-danger-row">
            <div>
              <div className="setting-label">{lang === 'zh' ? '重置当前学习进度' : 'Reset Current Progress'}</div>
              <div className="setting-desc">
                {lang === 'zh'
                  ? '当前进度会自动存档并可恢复；语言和历史存档会保留。'
                  : 'Current progress is archived automatically and remains recoverable; language and history archives remain.'}
              </div>
            </div>
            <button className="settings-danger-action" type="button" onClick={resetProgress}>
              {lang === 'zh' ? '重置当前进度' : 'Reset Current'}
            </button>
          </div>
          {curriculumArchiveError && (
            <div className="setting-desc" role="alert">
              {lang === 'zh'
                ? '历史存档暂时无法读取。你仍可导出备份，然后检查或修复存档。'
                : 'Curriculum archives are temporarily unavailable. You can still export a backup for inspection or repair.'}
            </div>
          )}
          {curriculumArchives.length > 0 && (
            <div className="curriculum-archives">
              <div className="setting-label">
                {lang === 'zh' ? '历史课程存档' : 'Curriculum Archives'}
              </div>
              {curriculumArchives.map(archive => (
                <div className="setting-item" key={archive.id}>
                  <div>
                    <div className="setting-label">
                      {lang === 'zh' ? '旧版学习记录' : 'Legacy learning record'}
                    </div>
                    <div className="setting-desc">
                      {new Date(archive.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <button
                    className="settings-action"
                    type="button"
                    onClick={() => restoreCurriculumArchive(archive)}
                  >
                    {lang === 'zh' ? '恢复' : 'Restore'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </Surface>

        <Surface className="settings-card settings-about-card">
          <div className="settings-card-heading">
            <div>
              <span className="settings-card-kicker">{lang === 'zh' ? '关于产品' : 'About the product'}</span>
              <h2>{lang === 'zh' ? '关于' : 'About'}</h2>
            </div>
          </div>
          <div className="setting-item">
            <div>
              <div className="setting-label">XM²code v1.0</div>
              <div className="setting-desc">
                {lang === 'zh' ? '面向零基础学习者的编程教学游戏' : 'A coding learning game designed for complete beginners'}
              </div>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
}
