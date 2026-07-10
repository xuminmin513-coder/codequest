import React, { useEffect, useState } from 'react';
import Confetti from './Confetti';

export default function SkillUnlockModal({ skill, lang, onClose }) {
  const [stage, setStage] = useState('opening');
  const [showGift, setShowGift] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowGift(true), 100);
    const t2 = setTimeout(() => setStage('unlocked'), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!skill) return null;

  return (
    <div className="skill-unlock-overlay" onClick={onClose}>
      {stage === 'unlocked' && <Confetti />}
      <div className="skill-unlock-modal" onClick={e => e.stopPropagation()}>
        {stage === 'opening' ? (
          <div className={`skill-gift-box ${showGift ? 'shake' : ''}`}>
            <div className="gift-lid">🎀</div>
            <div className="gift-body">
              <span className="gift-question">?</span>
            </div>
          </div>
        ) : (
          <>
            <div className="skill-unlock-icon">{skill.icon}</div>
            <h2 className="skill-unlock-title">
              {lang === 'zh' ? '🎉 恭喜解锁新技能！' : '🎉 New Skill Unlocked!'}
            </h2>
            <div className="skill-unlock-divider" />
            <p className="skill-unlock-name">
              {lang === 'zh' ? skill.nameCn : skill.name}
            </p>
            <p className="skill-unlock-desc">
              {lang === 'zh' ? skill.descCn : skill.desc}
            </p>
            <button className="btn btn-pixel btn-primary skill-unlock-btn" onClick={onClose}>
              {lang === 'zh' ? '太棒了！' : 'Awesome!'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
