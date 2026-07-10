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

  const resetProgress = () => {
    if (window.confirm(
      lang === 'zh'
        ? '确定要重置所有学习进度吗？这将清除所有XP、徽章和完成记录。'
        : 'Reset all progress? This will clear all XP, badges and records.'
    )) {
      localStorage.clear();
      addToast('info', '🗑️', lang === 'zh' ? '已重置所有进度' : 'All progress reset');
      refresh();
    }
  };

  const exportProgress = () => {
    const data = STORAGE.exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codedex-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('success', '💾', lang === 'zh' ? '进度已导出' : 'Progress exported');
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
          setTimeout(() => refresh(), 500);
        } catch {
          addToast('error', '❌', lang === 'zh' ? '文件格式错误，请选择有效的备份文件' : 'Invalid file format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
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
              <div className="setting-label">{lang === 'zh' ? '重置所有进度' : 'Reset All Progress'}</div>
              <div className="setting-desc">{lang === 'zh' ? '⚠️ 此操作不可撤销！' : '⚠️ This action cannot be undone!'}</div>
            </div>
            <button className="danger-btn" onClick={resetProgress}>
              {lang === 'zh' ? '重置' : 'Reset'}
            </button>
          </div>
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
