import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';

export default function Achievements() {
  const { lang, refreshKey } = useApp();
  void refreshKey;

  const earnedIds = STORAGE.getBadges();

  return (
    <div className="page active">
      <h2 className="section-title">
        🏅 <span>{lang === 'zh' ? '成就徽章' : 'Achievements'}</span>
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 8, fontSize: 14 }}>
        {lang === 'zh' ? '已获得' : 'Earned'}: <strong>{earnedIds.length} / {GAMIFICATION.BADGES.length}</strong>
      </p>
      <div className="badges-grid">
        {GAMIFICATION.BADGES.map(badge => {
          const earned = earnedIds.includes(badge.id);
          return (
            <div key={badge.id} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
              <div className="badge-icon">{badge.icon}</div>
              <div className="badge-name">{lang === 'zh' ? badge.nameCn : badge.name}</div>
              <div className="badge-desc">{lang === 'zh' ? badge.descCn : badge.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
