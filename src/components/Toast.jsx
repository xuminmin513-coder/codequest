import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-container" role="status" aria-live="polite" aria-atomic="false">
      {toasts.map(t => (
        <button key={t.id} className={`toast ${t.type}`} type="button" onClick={() => removeToast(t.id)}>
          <div className="toast-icon">{t.icon}</div>
          <div>
            <div className="toast-msg">{t.message}</div>
            {t.sub && <div className="toast-sub">{t.sub}</div>}
          </div>
        </button>
      ))}
    </div>
  );
}
