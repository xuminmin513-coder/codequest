export const CURRICULUM_STORAGE_VERSION = 'v2';
export const VERSION_KEY = 'codedex_curriculum_version';
export const ARCHIVES_KEY = 'codedex_curriculum_archives';

const LEARNING_KEYS = [
  'codedex_progress', 'codedex_streak', 'codedex_badges', 'codedex_perfect',
  'codedex_daily_count', 'codedex_daily_date', 'codedex_saved_code',
  'codedex_last_lesson', 'codedex_review', 'codedex_review_xp',
  'codedex_skill_unlocks',
];

function snapshot(storage) {
  return Object.fromEntries(
    LEARNING_KEYS
      .map(key => [key, storage.getItem(key)])
      .filter(([, value]) => value !== null),
  );
}

function addArchive(storage, now) {
  const archives = JSON.parse(storage.getItem(ARCHIVES_KEY) || '[]');
  const archive = { id: `legacy-${now}`, createdAt: now, data: snapshot(storage) };
  archives.push(archive);
  storage.setItem(ARCHIVES_KEY, JSON.stringify(archives));
  return archive.id;
}

export function needsCurriculumChoice(storage) {
  return !storage.getItem(VERSION_KEY) && Boolean(storage.getItem('codedex_progress'));
}

export function keepExistingProgress(storage, now = Date.now()) {
  addArchive(storage, now);
  storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
}

export function restartForV2(storage, now = Date.now()) {
  const archiveId = addArchive(storage, now);
  for (const key of LEARNING_KEYS) storage.removeItem(key);
  storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
  return archiveId;
}

export function restoreArchive(storage, archiveId, now = Date.now()) {
  const archives = JSON.parse(storage.getItem(ARCHIVES_KEY) || '[]');
  const archive = archives.find(item => item.id === archiveId);
  if (!archive) throw new Error(`Archive not found: ${archiveId}`);
  addArchive(storage, now);
  for (const key of LEARNING_KEYS) storage.removeItem(key);
  for (const [key, value] of Object.entries(archive.data)) storage.setItem(key, value);
  storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
}
