export const CURRICULUM_STORAGE_VERSION = 'v2';
export const VERSION_KEY = 'codedex_curriculum_version';
export const ARCHIVES_KEY = 'codedex_curriculum_archives';

export const LEARNING_KEYS = Object.freeze([
  'codedex_progress', 'codedex_streak', 'codedex_badges', 'codedex_perfect',
  'codedex_daily_count', 'codedex_daily_date', 'codedex_saved_code',
  'codedex_last_lesson', 'codedex_review', 'codedex_review_xp',
  'codedex_skill_unlocks',
]);

const LEARNING_KEY_SET = new Set(LEARNING_KEYS);
const ARCHIVE_KEYS = new Set(['id', 'createdAt', 'data']);

function migrationError(message, cause) {
  return new Error(`Invalid curriculum archives: ${message}`, cause ? { cause } : undefined);
}

export function isPlainRecord(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function parseArchives(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw migrationError('JSON could not be parsed', error);
  }

  if (!Array.isArray(parsed)) throw migrationError('root must be an array');

  const ids = new Set();
  parsed.forEach((archive, index) => {
    if (!isPlainRecord(archive)) throw migrationError(`entry ${index} must be a plain record`);
    if (Object.keys(archive).some(key => !ARCHIVE_KEYS.has(key))) {
      throw migrationError(`entry ${index} has unsupported fields`);
    }
    if (typeof archive.id !== 'string' || archive.id.length === 0) {
      throw migrationError(`entry ${index} has an invalid id`);
    }
    if (ids.has(archive.id)) throw migrationError(`duplicate archive id: ${archive.id}`);
    ids.add(archive.id);
    if (typeof archive.createdAt !== 'number' || !Number.isFinite(archive.createdAt)) {
      throw migrationError(`entry ${index} has an invalid createdAt`);
    }
    if (!isPlainRecord(archive.data)) {
      throw migrationError(`entry ${index} data must be a plain record`);
    }
    for (const [key, value] of Object.entries(archive.data)) {
      if (!LEARNING_KEY_SET.has(key)) {
        throw migrationError(`entry ${index} contains unsupported data key: ${key}`);
      }
      if (typeof value !== 'string') {
        throw migrationError(`entry ${index} data values must be strings`);
      }
    }
  });

  return parsed;
}

export function readArchives(storage) {
  const raw = storage.getItem(ARCHIVES_KEY);
  return raw === null ? [] : parseArchives(raw);
}

function snapshot(storage) {
  return Object.fromEntries(
    LEARNING_KEYS
      .map(key => [key, storage.getItem(key)])
      .filter(([, value]) => value !== null),
  );
}

function nextArchiveId(archives, now) {
  const ids = new Set(archives.map(archive => archive.id));
  const base = `legacy-${now}`;
  if (!ids.has(base)) return base;
  let suffix = 1;
  while (ids.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

function addArchive(storage, now) {
  const archives = readArchives(storage);
  const archive = {
    id: nextArchiveId(archives, now),
    createdAt: now,
    data: snapshot(storage),
  };
  storage.setItem(ARCHIVES_KEY, JSON.stringify([...archives, archive]));
  return archive.id;
}

function captureRaw(storage, keys) {
  return Object.fromEntries(keys.map(key => [key, storage.getItem(key)]));
}

function restoreRaw(storage, before) {
  for (const [key, value] of Object.entries(before)) {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  }
}

function runTransaction(storage, keys, operation) {
  const before = captureRaw(storage, keys);
  try {
    return operation();
  } catch (error) {
    try {
      restoreRaw(storage, before);
    } catch {
      // Best-effort rollback; preserve the original failure for callers.
    }
    throw error;
  }
}

export function hasMeaningfulProgress(rawProgress) {
  if (rawProgress === null || rawProgress === '') return false;
  try {
    const progress = JSON.parse(rawProgress);
    return !isPlainRecord(progress) || Object.keys(progress).length > 0;
  } catch {
    return true;
  }
}

function initializeV2Metadata(storage) {
  return runTransaction(storage, [VERSION_KEY, ARCHIVES_KEY], () => {
    if (storage.getItem(ARCHIVES_KEY) === null) storage.setItem(ARCHIVES_KEY, '[]');
    storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
  });
}

export function needsCurriculumChoice(storage) {
  const version = storage.getItem(VERSION_KEY);
  if (version !== null && version !== CURRICULUM_STORAGE_VERSION) return true;
  if (version === CURRICULUM_STORAGE_VERSION) {
    if (storage.getItem(ARCHIVES_KEY) === null) storage.setItem(ARCHIVES_KEY, '[]');
    return false;
  }
  if (hasMeaningfulProgress(storage.getItem('codedex_progress'))) return true;
  initializeV2Metadata(storage);
  return false;
}

export function keepExistingProgress(storage, now = Date.now()) {
  return runTransaction(storage, [ARCHIVES_KEY, VERSION_KEY], () => {
    addArchive(storage, now);
    storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
  });
}

export function restartForV2(storage, now = Date.now()) {
  return runTransaction(storage, [...LEARNING_KEYS, ARCHIVES_KEY, VERSION_KEY], () => {
    const archiveId = addArchive(storage, now);
    for (const key of LEARNING_KEYS) storage.removeItem(key);
    storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
    return archiveId;
  });
}

export function restoreArchive(storage, archiveId, now = Date.now()) {
  const archives = readArchives(storage);
  const archive = archives.find(item => item.id === archiveId);
  if (!archive) throw new Error(`Archive not found: ${archiveId}`);

  return runTransaction(storage, [...LEARNING_KEYS, ARCHIVES_KEY, VERSION_KEY], () => {
    addArchive(storage, now);
    for (const key of LEARNING_KEYS) storage.removeItem(key);
    for (const key of LEARNING_KEYS) {
      if (Object.hasOwn(archive.data, key)) storage.setItem(key, archive.data[key]);
    }
    storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
  });
}
