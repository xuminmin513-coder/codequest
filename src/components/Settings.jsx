import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import { CHAPTERS } from '../data/courses';

export default function Settings() {
  const { lang, toggleLanguage, refresh, addToast } = useApp();
  const [apiKey, setApiKey] = useState(STORAGE.getDeepSeekKey());
  const [apiKeySaved, setApiKeySaved] = useState(false);

  useEffect(() => {
    if (apiKeySaved) {
      const t = setTimeout(() => setApiKeySaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [apiKeySaved]);

  const saveApiKey = () => {
    STORAGE.setDeepSeekKey(apiKey);
    setApiKeySaved(true);
    addToast('success', '✅', lang === 'zh' ? 'API Key 已保存' : 'API Key saved');
  };
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
    <div className="page active">
      <h2 className="section-title">
        ⚙️ <span>{lang === 'zh' ? '设置' : 'Settings'}</span>
      </h2>
      <div id="settings-content">
        <div className="settings-card">
          <h3>🌐 {lang === 'zh' ? '语言 / Language' : 'Language'}</h3>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '界面语言' : 'Interface Language'}</div>
              <div className="setting-desc">{lang === 'zh' ? '当前：中文' : 'Current: English'}</div>
            </div>
            <button className="toggle-btn" onClick={toggleLanguage}>
              {lang === 'zh' ? '切换到 English' : '切换到 中文'}
            </button>
          </div>
        </div>
        <div className="settings-card">
          <h3>📊 {lang === 'zh' ? '学习统计' : 'Learning Stats'}</h3>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '总 XP' : 'Total XP'}</div>
              <div className="setting-desc">{totalXp} XP</div>
            </div>
          </div>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '已完成课程' : 'Completed Lessons'}</div>
              <div className="setting-desc">{completedCount} / {totalLessons}</div>
            </div>
          </div>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '连续学习' : 'Learning Streak'}</div>
              <div className="setting-desc">{streak} {lang === 'zh' ? '天' : 'days'}</div>
            </div>
          </div>
        </div>
        <div className="settings-card">
          <h3>🤖 {lang === 'zh' ? 'AI 助手 (DeepSeek V4-Pro)' : 'AI Assistant (DeepSeek V4-Pro)'}</h3>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? 'API Key' : 'API Key'}</div>
              <div className="setting-desc">
                {lang === 'zh'
                  ? '在关卡中向 AI 提问获取帮助。前往 platform.deepseek.com 获取'
                  : 'Ask AI for help in lessons. Get your key at platform.deepseek.com'}
              </div>
            </div>
          </div>
          <div className="setting-item">
            <input
              type="password"
              className="api-key-input"
              placeholder={lang === 'zh' ? '输入你的 DeepSeek API Key...' : 'Enter your DeepSeek API Key...'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
            <button className="toggle-btn" onClick={saveApiKey}>
              {apiKeySaved ? '✅' : (lang === 'zh' ? '保存' : 'Save')}
            </button>
          </div>
        </div>
        <div className="settings-card">
          <h3>⚠️ {lang === 'zh' ? '数据管理' : 'Data Management'}</h3>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '导出学习进度' : 'Export Progress'}</div>
              <div className="setting-desc">{lang === 'zh' ? '下载备份文件，可在其他设备或Electron中导入' : 'Download backup for other devices or Electron'}</div>
            </div>
            <button className="toggle-btn" onClick={exportProgress}>
              {lang === 'zh' ? '导出' : 'Export'}
            </button>
          </div>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '导入学习进度' : 'Import Progress'}</div>
              <div className="setting-desc">{lang === 'zh' ? '从备份文件恢复进度（将覆盖当前数据）' : 'Restore progress from backup (overwrites current data)'}</div>
            </div>
            <button className="toggle-btn" onClick={importProgress}>
              {lang === 'zh' ? '导入' : 'Import'}
            </button>
          </div>
          <div className="setting-item">
            <div>
              <div className="setting-label">{lang === 'zh' ? '重置当前学习进度' : 'Reset Current Progress'}</div>
              <div className="setting-desc">
                {lang === 'zh'
                  ? '当前进度会自动存档并可恢复；语言和历史存档会保留。'
                  : 'Current progress is archived automatically and remains recoverable; language and history archives remain.'}
              </div>
            </div>
            <button className="danger-btn" onClick={resetProgress}>
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
                    className="toggle-btn"
                    onClick={() => restoreCurriculumArchive(archive)}
                  >
                    {lang === 'zh' ? '恢复' : 'Restore'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="settings-card">
          <h3>📖 {lang === 'zh' ? '关于' : 'About'}</h3>
          <div className="setting-item">
            <div>
              <div className="setting-label">xmmcode v1.0</div>
              <div className="setting-desc">
                {lang === 'zh' ? '编程教学游戏' : 'Coding Education Game'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
