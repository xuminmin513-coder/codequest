import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import { CHAPTERS } from '../data/courses';

export default function Sidebar() {
  const { lang, toggleLanguage, navigateTo, currentPage, refreshKey } = useApp();
  void refreshKey;

  const totalXp = STORAGE.getTotalXp();
  const level = GAMIFICATION.getLevel(totalXp);
  const reviewCount = STORAGE.getPendingReviewCount();

  const navItems = [
    { page: 'dashboard', icon: '🏠', zh: '仪表盘', en: 'Dashboard' },
    { page: 'courses', icon: '🗺️', zh: '课程地图', en: 'Courses' },
    { page: 'reviews', icon: '🔄', zh: '复习', en: 'Reviews' },
    { page: 'shortcuts', icon: '⌨️', zh: '快捷键', en: 'Shortcuts' },
    { page: 'achievements', icon: '🏅', zh: '成就徽章', en: 'Achievements' },
    { page: 'settings', icon: '⚙️', zh: '设置', en: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">⌨️</span>
        <span className="logo-text">xmmcode</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <div
            key={item.page}
            className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
            data-page={item.page}
            onClick={() => navigateTo(item.page)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{lang === 'zh' ? item.zh : item.en}</span>
            {item.page === 'reviews' && reviewCount > 0 && (
              <span className="nav-badge">{reviewCount}</span>
            )}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-level-badge">
          <span className="level-icon">🌟</span>
          <span>{lang === 'zh' ? `等级 ${level}` : `Level ${level}`}</span>
        </div>
        <div className="lang-toggle" onClick={toggleLanguage}>
          {lang === 'zh' ? 'EN' : '中'}
        </div>
      </div>
    </aside>
  );
}
