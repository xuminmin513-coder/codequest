import React from 'react';

export default function CurriculumMigrationModal({ lang, error, onKeep, onRestart }) {
  return (
    <div className="modal-overlay curriculum-migration-overlay">
      <div
        className="modal-content curriculum-migration-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="curriculum-migration-title"
      >
        <div className="modal-icon" aria-hidden="true">🧭</div>
        <h2 id="curriculum-migration-title">
          {lang === 'zh' ? '欢迎进入新版课程' : 'Welcome to the new curriculum'}
        </h2>
        <p>{lang === 'zh'
          ? '旧进度会先安全归档。你可以保留当前完成状态，也可以从第一关重新学习新版课程。'
          : 'Your old progress will be archived safely. Keep your completion state or restart the new curriculum.'}</p>
        {error && <p role="alert">{error}</p>}
        <div className="curriculum-migration-actions">
          <button className="btn btn-pixel btn-ghost" onClick={onKeep} autoFocus>
            {lang === 'zh' ? '保留当前进度' : 'Keep Progress'}
          </button>
          <button className="btn btn-pixel btn-primary" onClick={onRestart}>
            {lang === 'zh' ? '从第一关重新学习' : 'Restart V2'}
          </button>
        </div>
      </div>
    </div>
  );
}
