import React from 'react';

export default function BadgeModal({ badge, lang, onClose }) {
  if (!badge) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="badge-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-icon" aria-hidden="true">🏅</div>
        <h2 id="badge-modal-title">{lang === 'zh' ? '新徽章解锁！' : 'New Badge Unlocked!'}</h2>
        <div style={{ fontSize: 48, margin: '16px 0' }}>{badge.icon}</div>
        <p style={{ fontSize: 18, fontWeight: 600 }}>
          {lang === 'zh' ? badge.nameCn : badge.name}
        </p>
        <p>{lang === 'zh' ? badge.descCn : badge.desc}</p>
        <button className="btn btn-pixel btn-primary" type="button" onClick={onClose} autoFocus>
          {lang === 'zh' ? '太棒了！' : 'Awesome!'}
        </button>
      </div>
    </div>
  );
}
