import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`} onClick={() => removeToast(t.id)}>
          <div className="toast-icon">{t.icon}</div>
          <div>
            <div className="toast-msg">{t.message}</div>
            {t.sub && <div className="toast-sub">{t.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
