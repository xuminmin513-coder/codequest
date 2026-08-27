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
    <section className="settings-card save-slots-card" aria-labelledby="save-slots-title">
      <div className="settings-card-heading">
        <div>
          <span className="settings-card-kicker">{lang === 'zh' ? '本地玩家资料' : 'Local player profiles'}</span>
          <h2 id="save-slots-title">{lang === 'zh' ? '存档' : 'Saves'}</h2>
        </div>
        <span className="settings-card-count">{saves.length}</span>
      </div>
      <p className="save-slots-note">
        {lang === 'zh'
          ? '未登录时保存在这台设备；主动登录后才会开启跨设备同步。'
          : 'Saved on this device while signed out. Cross-device sync starts only after you sign in.'}
      </p>
      <div className="save-profiles-grid">
        {saves.map(save => {
          const isActive = save.id === activeSave.id;
          const initial = save.name.trim().slice(0, 1).toUpperCase() || 'X';
          return (
            <article className={`save-profile-card${isActive ? ' active' : ''}`} key={save.id}>
              <div className="save-avatar" aria-hidden="true">{initial}</div>
              <div className="save-profile-copy">
                <strong>{save.name}</strong>
                <small>
                  {isActive
                    ? (lang === 'zh' ? '当前正在使用' : 'Currently active')
                    : (lang === 'zh' ? '上次使用 ' : 'Last used ') + new Date(save.updatedAt).toLocaleString()}
                </small>
              </div>
              <button
                className="save-profile-action"
                type="button"
                disabled={isActive}
                aria-label={isActive
                  ? (lang === 'zh' ? `${save.name}，当前存档` : `${save.name}, current save`)
                  : (lang === 'zh' ? `切换到${save.name}` : `Switch to ${save.name}`)}
                onClick={() => switchTo(save.id)}
              >
                {isActive
                  ? (lang === 'zh' ? '使用中' : 'Active')
                  : (lang === 'zh' ? '切换' : 'Switch')}
              </button>
            </article>
          );
        })}
        <button
          className="save-add-tile"
          type="button"
          aria-label={lang === 'zh' ? '添加存档槽' : 'Add save slot'}
          onClick={addSlot}
        >
          <span aria-hidden="true">＋</span>
          <strong>{lang === 'zh' ? '添加存档槽' : 'Add save slot'}</strong>
          <small>{lang === 'zh' ? '需要时再创建' : 'Create only when needed'}</small>
        </button>
      </div>
    </section>
  );
}
