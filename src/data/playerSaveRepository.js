import {
  ARCHIVES_KEY,
  LEARNING_KEYS,
  VERSION_KEY,
} from '../utils/curriculumMigration.js';

export const SAVE_SCHEMA_VERSION = 1;
export const SAVE_CATALOG_KEY = 'xm2_save_catalog_v1';
export const ACTIVE_SAVE_KEY = 'xm2_active_save_id_v1';
export const MAX_PLAYER_SAVES = 12;
export const MAX_RECOVERIES = 3;

const SAVE_ID_PATTERN = /^save-[A-Za-z0-9_-]{1,80}$/;
const CATALOG_FIELDS = new Set(['schemaVersion', 'checksum', 'activeSaveId', 'saves']);
const SAVE_FIELDS = new Set(['id', 'name', 'createdAt', 'updatedAt']);
const RECOVERY_FIELDS = new Set(['id', 'saveId', 'createdAt', 'reason', 'data', 'checksum']);
const RECOVERY_ID_PATTERN = /^recovery-[0-9]+(?:-[0-9]+)?$/;
const MAX_RECOVERY_BYTES = 1024 * 1024;
const LEGACY_KEYS = Object.freeze([
  ...LEARNING_KEYS,
  'codedex_lang',
  VERSION_KEY,
  ARCHIVES_KEY,
]);

let singleton = null;

export class PlayerSaveCorruptionError extends Error {
  constructor(message, options) {
    super(`Invalid player save data: ${message}`, options);
    this.name = 'PlayerSaveCorruptionError';
  }
}

function isPlainRecord(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isPlainRecord(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map(key => [key, canonicalize(value[key])]),
  );
}

function stableStringify(value) {
  return JSON.stringify(canonicalize(value));
}

function checksum(value) {
  const source = stableStringify(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

function withoutChecksum(catalog) {
  const { checksum: _ignored, ...body } = catalog;
  return body;
}

function validateTimestamp(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new PlayerSaveCorruptionError(`${label} must be a non-negative finite number`);
  }
}

function validateName(value) {
  if (typeof value !== 'string') throw new PlayerSaveCorruptionError('save name must be a string');
  const trimmed = value.trim();
  if (trimmed.length < 1 || trimmed.length > 40) {
    throw new PlayerSaveCorruptionError('save name must contain 1 to 40 characters');
  }
  return trimmed;
}

function validateSaveEntry(entry, index) {
  if (!isPlainRecord(entry)) throw new PlayerSaveCorruptionError(`save ${index} must be a record`);
  if (Object.keys(entry).some(key => !SAVE_FIELDS.has(key))) {
    throw new PlayerSaveCorruptionError(`save ${index} contains unsupported fields`);
  }
  if (typeof entry.id !== 'string' || !SAVE_ID_PATTERN.test(entry.id)) {
    throw new PlayerSaveCorruptionError(`save ${index} has an invalid id`);
  }
  validateName(entry.name);
  validateTimestamp(entry.createdAt, `save ${index} createdAt`);
  validateTimestamp(entry.updatedAt, `save ${index} updatedAt`);
  if (entry.updatedAt < entry.createdAt) {
    throw new PlayerSaveCorruptionError(`save ${index} updatedAt precedes createdAt`);
  }
}

function parseCatalog(raw) {
  let catalog;
  try {
    catalog = JSON.parse(raw);
  } catch (error) {
    throw new PlayerSaveCorruptionError('catalog JSON could not be parsed', { cause: error });
  }
  if (!isPlainRecord(catalog)) throw new PlayerSaveCorruptionError('catalog must be a record');
  if (Object.keys(catalog).some(key => !CATALOG_FIELDS.has(key))) {
    throw new PlayerSaveCorruptionError('catalog contains unsupported fields');
  }
  if (catalog.schemaVersion !== SAVE_SCHEMA_VERSION) {
    throw new PlayerSaveCorruptionError('unsupported catalog schema version');
  }
  if (!Array.isArray(catalog.saves) || catalog.saves.length < 1 || catalog.saves.length > MAX_PLAYER_SAVES) {
    throw new PlayerSaveCorruptionError('catalog must contain 1 to 12 saves');
  }
  const ids = new Set();
  catalog.saves.forEach((entry, index) => {
    validateSaveEntry(entry, index);
    if (ids.has(entry.id)) throw new PlayerSaveCorruptionError(`duplicate save id: ${entry.id}`);
    ids.add(entry.id);
  });
  if (typeof catalog.activeSaveId !== 'string' || !ids.has(catalog.activeSaveId)) {
    throw new PlayerSaveCorruptionError('active save is missing from the catalog');
  }
  if (typeof catalog.checksum !== 'string' || catalog.checksum !== checksum(withoutChecksum(catalog))) {
    throw new PlayerSaveCorruptionError('catalog checksum mismatch');
  }
  return catalog;
}

function serializeCatalog(body) {
  return JSON.stringify({ ...body, checksum: checksum(body) });
}

function dataPrefix(saveId) {
  return `xm2_save_data:${encodeURIComponent(saveId)}:`;
}

function recoveryStorageKey(saveId) {
  return `xm2_save_recoveries:${saveId}`;
}

function createNamespacedStorage(physicalStorage, saveId) {
  const prefix = dataPrefix(saveId);
  const physicalKeys = () => {
    const keys = [];
    for (let index = 0; index < physicalStorage.length; index += 1) {
      const key = physicalStorage.key(index);
      if (typeof key === 'string' && key.startsWith(prefix)) keys.push(key);
    }
    return keys.sort();
  };
  const physicalKey = key => `${prefix}${encodeURIComponent(String(key))}`;

  return {
    get length() {
      return physicalKeys().length;
    },
    key(index) {
      const key = physicalKeys()[index];
      if (key === undefined) return null;
      try {
        return decodeURIComponent(key.slice(prefix.length));
      } catch {
        return null;
      }
    },
    getItem(key) {
      return physicalStorage.getItem(physicalKey(key));
    },
    setItem(key, value) {
      physicalStorage.setItem(physicalKey(key), String(value));
    },
    removeItem(key) {
      physicalStorage.removeItem(physicalKey(key));
    },
    clear() {
      for (const key of physicalKeys()) physicalStorage.removeItem(key);
    },
  };
}

function capture(storage, keys) {
  return Object.fromEntries(keys.map(key => [key, storage.getItem(key)]));
}

function restore(storage, values) {
  for (const [key, value] of Object.entries(values)) {
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  }
}

function snapshotStorage(storage) {
  const data = {};
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (typeof key !== 'string') continue;
    const value = storage.getItem(key);
    if (typeof value === 'string') data[key] = value;
  }
  return data;
}

function validateRecoveryReason(value) {
  if (typeof value !== 'string') throw new PlayerSaveCorruptionError('recovery reason must be a string');
  const trimmed = value.trim();
  if (trimmed.length < 1 || trimmed.length > 80) {
    throw new PlayerSaveCorruptionError('recovery reason must contain 1 to 80 characters');
  }
  return trimmed;
}

function recoveryBody(record) {
  const { checksum: _ignored, ...body } = record;
  return body;
}

function validateRecovery(record, index, saveId) {
  if (!isPlainRecord(record)) throw new PlayerSaveCorruptionError(`recovery ${index} must be a record`);
  if (Object.keys(record).some(key => !RECOVERY_FIELDS.has(key))) {
    throw new PlayerSaveCorruptionError(`recovery ${index} contains unsupported fields`);
  }
  if (typeof record.id !== 'string' || !RECOVERY_ID_PATTERN.test(record.id)) {
    throw new PlayerSaveCorruptionError(`recovery ${index} has an invalid id`);
  }
  if (record.saveId !== saveId) throw new PlayerSaveCorruptionError(`recovery ${index} targets another save`);
  validateTimestamp(record.createdAt, `recovery ${index} createdAt`);
  validateRecoveryReason(record.reason);
  if (!isPlainRecord(record.data)) throw new PlayerSaveCorruptionError(`recovery ${index} data must be a record`);
  for (const [key, value] of Object.entries(record.data)) {
    if (typeof key !== 'string' || typeof value !== 'string') {
      throw new PlayerSaveCorruptionError(`recovery ${index} data must contain string values`);
    }
  }
  if (typeof record.checksum !== 'string' || record.checksum !== checksum(recoveryBody(record))) {
    throw new PlayerSaveCorruptionError(`recovery ${index} checksum mismatch`);
  }
}

function parseRecoveries(raw, saveId) {
  if (raw === null) return [];
  let recoveries;
  try {
    recoveries = JSON.parse(raw);
  } catch (error) {
    throw new PlayerSaveCorruptionError('recovery JSON could not be parsed', { cause: error });
  }
  if (!Array.isArray(recoveries) || recoveries.length > MAX_RECOVERIES) {
    throw new PlayerSaveCorruptionError('recoveries must be an array with at most three entries');
  }
  const ids = new Set();
  recoveries.forEach((record, index) => {
    validateRecovery(record, index, saveId);
    if (ids.has(record.id)) throw new PlayerSaveCorruptionError(`duplicate recovery id: ${record.id}`);
    ids.add(record.id);
  });
  return recoveries;
}

function defaultIdFactory() {
  if (!globalThis.crypto?.randomUUID) throw new Error('Secure random save IDs are unavailable');
  return `save-${globalThis.crypto.randomUUID()}`;
}

export function createPlayerSaveRepository(physicalStorage, {
  now = () => Date.now(),
  idFactory = defaultIdFactory,
  defaultName,
} = {}) {
  if (!physicalStorage) throw new Error('Physical storage is required');
  let catalog = null;

  const requireInitialized = () => {
    if (!catalog) throw new Error('Player save repository is not initialized');
    return catalog;
  };

  const writeCatalog = nextBody => {
    const previous = capture(physicalStorage, [SAVE_CATALOG_KEY, ACTIVE_SAVE_KEY]);
    try {
      const raw = serializeCatalog(nextBody);
      physicalStorage.setItem(SAVE_CATALOG_KEY, raw);
      physicalStorage.setItem(ACTIVE_SAVE_KEY, nextBody.activeSaveId);
      const verified = parseCatalog(physicalStorage.getItem(SAVE_CATALOG_KEY));
      if (physicalStorage.getItem(ACTIVE_SAVE_KEY) !== verified.activeSaveId) {
        throw new PlayerSaveCorruptionError('active save key does not match the catalog');
      }
      catalog = verified;
      return verified;
    } catch (error) {
      restore(physicalStorage, previous);
      throw error;
    }
  };

  const initialize = () => {
    const rawCatalog = physicalStorage.getItem(SAVE_CATALOG_KEY);
    const rawActive = physicalStorage.getItem(ACTIVE_SAVE_KEY);
    if (rawCatalog !== null) {
      const parsed = parseCatalog(rawCatalog);
      if (rawActive !== parsed.activeSaveId) {
        throw new PlayerSaveCorruptionError('active save key does not match the catalog');
      }
      catalog = parsed;
      return parsed;
    }
    if (rawActive !== null) throw new PlayerSaveCorruptionError('active save exists without a catalog');

    const saveId = idFactory();
    if (typeof saveId !== 'string' || !SAVE_ID_PATTERN.test(saveId)) {
      throw new Error('Save ID factory returned an invalid ID');
    }
    const timestamp = now();
    validateTimestamp(timestamp, 'initial timestamp');
    const initialName = defaultName === undefined
      ? (physicalStorage.getItem('codedex_lang') === 'en' ? 'Default Save' : '默认存档')
      : defaultName;
    const entry = {
      id: saveId,
      name: validateName(initialName),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const scoped = createNamespacedStorage(physicalStorage, saveId);
    const copiedKeys = LEGACY_KEYS.filter(key => physicalStorage.getItem(key) !== null);
    const touchedPhysicalKeys = [
      SAVE_CATALOG_KEY,
      ACTIVE_SAVE_KEY,
      ...copiedKeys,
      ...copiedKeys.map(key => `${dataPrefix(saveId)}${encodeURIComponent(key)}`),
    ];
    const before = capture(physicalStorage, touchedPhysicalKeys);

    try {
      for (const key of copiedKeys) scoped.setItem(key, physicalStorage.getItem(key));
      writeCatalog({
        schemaVersion: SAVE_SCHEMA_VERSION,
        activeSaveId: saveId,
        saves: [entry],
      });
      for (const key of copiedKeys) physicalStorage.removeItem(key);
      return catalog;
    } catch (error) {
      restore(physicalStorage, before);
      catalog = null;
      throw error;
    }
  };

  const listSaves = () => requireInitialized().saves.map(save => ({ ...save }));

  const getActiveSave = () => {
    const current = requireInitialized();
    const save = current.saves.find(item => item.id === current.activeSaveId);
    if (!save) throw new PlayerSaveCorruptionError('active save metadata is missing');
    return { ...save };
  };

  const getActiveStorage = () => createNamespacedStorage(physicalStorage, getActiveSave().id);

  const addSave = name => {
    const current = requireInitialized();
    if (current.saves.length >= MAX_PLAYER_SAVES) throw new Error('Player save limit reached');
    const saveId = idFactory();
    if (typeof saveId !== 'string' || !SAVE_ID_PATTERN.test(saveId)) {
      throw new Error('Save ID factory returned an invalid ID');
    }
    if (current.saves.some(save => save.id === saveId)) throw new Error('Save ID already exists');
    const timestamp = now();
    validateTimestamp(timestamp, 'save timestamp');
    const entry = {
      id: saveId,
      name: validateName(name),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    writeCatalog({
      schemaVersion: SAVE_SCHEMA_VERSION,
      activeSaveId: current.activeSaveId,
      saves: [...current.saves, entry],
    });
    return { ...entry };
  };

  const switchSave = saveId => {
    const current = requireInitialized();
    if (!current.saves.some(save => save.id === saveId)) throw new Error(`Unknown player save: ${saveId}`);
    if (saveId === current.activeSaveId) return getActiveSave();
    writeCatalog({
      schemaVersion: SAVE_SCHEMA_VERSION,
      activeSaveId: saveId,
      saves: current.saves.map(save => ({ ...save })),
    });
    return getActiveSave();
  };

  const listRecoveries = () => {
    const saveId = getActiveSave().id;
    return parseRecoveries(physicalStorage.getItem(recoveryStorageKey(saveId)), saveId)
      .map(record => ({ ...record, data: { ...record.data } }));
  };

  const nextRecoveryId = (recoveries, timestamp) => {
    const ids = new Set(recoveries.map(record => record.id));
    const base = `recovery-${timestamp}`;
    if (!ids.has(base)) return base;
    let suffix = 1;
    while (ids.has(`${base}-${suffix}`)) suffix += 1;
    return `${base}-${suffix}`;
  };

  const createRecovery = reason => {
    const saveId = getActiveSave().id;
    const key = recoveryStorageKey(saveId);
    const previousRaw = physicalStorage.getItem(key);
    const recoveries = parseRecoveries(previousRaw, saveId);
    const timestamp = now();
    validateTimestamp(timestamp, 'recovery timestamp');
    const body = {
      id: nextRecoveryId(recoveries, timestamp),
      saveId,
      createdAt: timestamp,
      reason: validateRecoveryReason(reason),
      data: snapshotStorage(getActiveStorage()),
    };
    const record = { ...body, checksum: checksum(body) };
    if (new TextEncoder().encode(stableStringify(record)).byteLength > MAX_RECOVERY_BYTES) {
      throw new Error('Recovery snapshot exceeds the 1 MiB limit');
    }
    const next = [record, ...recoveries].slice(0, MAX_RECOVERIES);
    try {
      physicalStorage.setItem(key, JSON.stringify(next));
      parseRecoveries(physicalStorage.getItem(key), saveId);
      return { ...record, data: { ...record.data } };
    } catch (error) {
      if (previousRaw === null) physicalStorage.removeItem(key);
      else physicalStorage.setItem(key, previousRaw);
      throw error;
    }
  };

  const restoreRecovery = recoveryId => {
    const saveId = getActiveSave().id;
    const key = recoveryStorageKey(saveId);
    const originalRaw = physicalStorage.getItem(key);
    const recoveries = parseRecoveries(originalRaw, saveId);
    const selected = recoveries.find(record => record.id === recoveryId);
    if (!selected) throw new Error(`Recovery not found: ${recoveryId}`);
    const activeStorage = getActiveStorage();
    const beforeData = snapshotStorage(activeStorage);

    try {
      createRecovery('before-recovery');
      activeStorage.clear();
      for (const [dataKey, value] of Object.entries(selected.data)) {
        activeStorage.setItem(dataKey, value);
      }
      const restored = snapshotStorage(activeStorage);
      if (stableStringify(restored) !== stableStringify(selected.data)) {
        throw new Error('Recovery verification failed');
      }
      return { ...selected, data: { ...selected.data } };
    } catch (error) {
      activeStorage.clear();
      for (const [dataKey, value] of Object.entries(beforeData)) activeStorage.setItem(dataKey, value);
      if (originalRaw === null) physicalStorage.removeItem(key);
      else physicalStorage.setItem(key, originalRaw);
      throw error;
    }
  };

  return {
    initialize,
    listSaves,
    getActiveSave,
    getActiveStorage,
    addSave,
    switchSave,
    createRecovery,
    listRecoveries,
    restoreRecovery,
  };
}

export function initializePlayerSaves(storage = globalThis.localStorage) {
  if (!singleton) singleton = createPlayerSaveRepository(storage);
  singleton.initialize();
  return singleton;
}

export function getPlayerSaveRepository() {
  if (!singleton) throw new Error('Player saves must be initialized before use');
  return singleton;
}

export function getActivePlayerStorage() {
  if (singleton) return singleton.getActiveStorage();
  if (!globalThis.localStorage) throw new Error('Player saves must be initialized before use');
  return globalThis.localStorage;
}

export function createActiveSaveRecovery(reason) {
  if (!singleton) return null;
  return singleton.createRecovery(reason);
}
