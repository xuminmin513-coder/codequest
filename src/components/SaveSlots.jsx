import React from 'react';
import { useApp } from '../context/AppContext';
import { getPlayerSaveRepository } from '../data/playerSaveRepository';

export default function SaveSlots() {
  const { lang, addToast } = useApp();
  const repository = getPlayerSaveRepository();
  const saves = repository.listSaves();
  const activeSave = repository.getActiveSave();

  const switchTo = saveId => {
    if (saveId === activeSave.id) return;
    try {
      repository.switchSave(saveId);
      window.location.reload();
    } catch {
      addToast(
        'error',
        '❌',
        lang === 'zh' ? '切换存档失败，当前存档没有改变。' : 'Could not switch saves. The current save was not changed.',
      );
    }
  };

  const addSlot = () => {
    try {
      const nextNumber = saves.length + 1;
      const save = repository.addSave(lang === 'zh' ? `存档 ${nextNumber}` : `Save ${nextNumber}`);
      repository.switchSave(save.id);
      window.location.reload();
    } catch {
      addToast(
        'error',
        '❌',
        lang === 'zh' ? '添加存档槽失败，请稍后重试。' : 'Could not add a save slot. Please try again.',
      );
    }
  };

  return (
    <div className="settings-card save-slots-card">
      <h3>💾 {lang === 'zh' ? '存档' : 'Saves'}</h3>
      <p className="save-slots-note">
        {lang === 'zh'
          ? '未登录时保存在这台设备；主动登录后才会开启跨设备同步。'
          : 'Saved on this device while signed out. Cross-device sync starts only after you sign in.'}
      </p>
      <div className="save-slots-list">
        {saves.map(save => {
          const isActive = save.id === activeSave.id;
          return (
            <div className={`setting-item save-slot${isActive ? ' active' : ''}`} key={save.id}>
              <div>
                <div className="setting-label">{save.name}</div>
                <div className="setting-desc">
                  {isActive
                    ? (lang === 'zh' ? '当前存档' : 'Current save')
                    : new Date(save.updatedAt).toLocaleString()}
                </div>
              </div>
              <button
                className="toggle-btn"
                type="button"
                disabled={isActive}
                onClick={() => switchTo(save.id)}
              >
                {isActive
                  ? (lang === 'zh' ? '使用中' : 'Active')
                  : (lang === 'zh' ? '切换' : 'Switch')}
              </button>
            </div>
          );
        })}
      </div>
      <button className="toggle-btn save-slot-add" type="button" onClick={addSlot}>
        ＋ {lang === 'zh' ? '添加存档槽' : 'Add Save Slot'}
      </button>
    </div>
  );
}
