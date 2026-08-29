import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { GAMIFICATION } from '../utils/gamification';
import PageHeader from './ui/PageHeader';
import StatusBadge from './ui/StatusBadge';
import Surface from './ui/Surface';

export default function Achievements() {
  const { lang, refreshKey } = useApp();
  void refreshKey;
  const earnedIds = STORAGE.getBadges();

  return (
    <div className="page active page-standard achievements-page">
      <PageHeader
        eyebrow={lang === 'zh' ? '学习记录' : 'Learning record'}
        title={lang === 'zh' ? '成就' : 'Achievements'}
        description={lang === 'zh' ? '每枚成就都对应一个明确的学习里程碑。' : 'Every achievement marks a clear learning milestone.'}
        actions={<StatusBadge tone="success">{earnedIds.length} / {GAMIFICATION.BADGES.length}</StatusBadge>}
      />
      <div className="achievement-grid">
        {GAMIFICATION.BADGES.map(badge => {
          const earned = earnedIds.includes(badge.id);
          return (
            <Surface className={`achievement-card${earned ? ' earned' : ' locked'}`} key={badge.id}>
              <div className="achievement-icon" aria-hidden="true">{badge.icon}</div>
              <div className="achievement-copy">
                <strong>{lang === 'zh' ? badge.nameCn : badge.name}</strong>
                <p>{lang === 'zh' ? badge.descCn : badge.desc}</p>
              </div>
              <StatusBadge tone={earned ? 'success' : 'neutral'}>
                {earned ? (lang === 'zh' ? '已获得' : 'Earned') : (lang === 'zh' ? '未解锁' : 'Locked')}
              </StatusBadge>
            </Surface>
          );
        })}
      </div>
    </div>
  );
}
