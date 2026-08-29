import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import BrandMark from './ui/BrandMark';

export const NAV_ITEMS = [
  { page: 'dashboard', icon: '⌂', zh: '学习首页', en: 'Learn' },
  { page: 'courses', icon: '⌘', zh: '课程地图', en: 'Courses' },
  { page: 'reviews', icon: '↻', zh: '复习计划', en: 'Review' },
  { page: 'shortcuts', icon: '⌨︎', zh: '快捷键', en: 'Shortcuts' },
  { page: 'achievements', icon: '◇', zh: '成就', en: 'Awards' },
  { page: 'settings', icon: '⚙︎', zh: '设置', en: 'Settings' },
];

const MOBILE_PAGES = new Set(['dashboard', 'courses', 'reviews', 'achievements', 'settings']);

function NavigationItems({ mobile = false }) {
  const { lang, navigateTo, currentPage, refreshKey } = useApp();
  void refreshKey;
  const reviewCount = STORAGE.getPendingReviewCount();
  const items = mobile ? NAV_ITEMS.filter(item => MOBILE_PAGES.has(item.page)) : NAV_ITEMS;

  return items.map(item => (
    <button
      key={item.page}
      type="button"
      className={`nav-item${currentPage === item.page ? ' active' : ''}`}
      data-page={item.page}
      aria-current={currentPage === item.page ? 'page' : undefined}
      onClick={() => navigateTo(item.page)}
    >
      <span className="nav-icon" aria-hidden="true">{item.icon}</span>
      <span className="nav-label">{lang === 'zh' ? item.zh : item.en}</span>
      {item.page === 'reviews' && reviewCount > 0 && (
        <span className="nav-badge" aria-label={lang === 'zh' ? `${reviewCount} 个待复习` : `${reviewCount} reviews due`}>
          {reviewCount}
        </span>
      )}
    </button>
  ));
}

export default function Sidebar() {
  const { lang, toggleLanguage, refreshKey } = useApp();
  void refreshKey;
  const level = GAMIFICATION.getLevel(STORAGE.getTotalXp());

  return (
    <aside className="sidebar desktop-sidebar">
      <div className="sidebar-brand"><BrandMark /></div>
      <nav className="sidebar-nav" aria-label={lang === 'zh' ? '主导航' : 'Primary navigation'}>
        <NavigationItems />
      </nav>
      <div className="sidebar-footer">
        <div className="user-level-badge">
          <span className="player-mark" aria-hidden="true">XM²</span>
          <span>{lang === 'zh' ? `等级 ${level}` : `Level ${level}`}</span>
        </div>
        <button className="lang-toggle" type="button" onClick={toggleLanguage}>
          {lang === 'zh' ? 'English' : '中文'}
        </button>
      </div>
    </aside>
  );
}

export function MobileNavigation() {
  const { lang, toggleLanguage } = useApp();

  return (
    <>
      <header className="mobile-topbar">
        <BrandMark compact />
        <span className="mobile-product-name">XM²code</span>
        <button className="mobile-language" type="button" onClick={toggleLanguage}>
          {lang === 'zh' ? 'EN' : '中'}
        </button>
        <span className="mobile-player-mark" aria-label="XM squared">XM²</span>
      </header>
      <nav className="mobile-navigation" aria-label={lang === 'zh' ? '移动端主导航' : 'Mobile navigation'}>
        <NavigationItems mobile />
      </nav>
    </>
  );
}
