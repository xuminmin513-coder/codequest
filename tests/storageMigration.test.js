import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import { STORAGE } from '../src/utils/storage.js';
import {
  ARCHIVES_KEY,
  CURRICULUM_STORAGE_VERSION,
  VERSION_KEY,
  needsCurriculumChoice,
  readArchives,
} from '../src/utils/curriculumMigration.js';

function withLocalStorage(storage, callback) {
  const previousDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    writable: true,
    value: storage,
  });
  try {
    return callback();
  } finally {
    if (previousDescriptor) Object.defineProperty(globalThis, 'localStorage', previousDescriptor);
    else delete globalThis.localStorage;
  }
}

function archive(id, data = {}) {
  return { id, createdAt: 1, data };
}

function failOnce(storage, shouldFail) {
  let failed = false;
  return {
    get length() { return storage.length; },
    key(index) { return storage.key(index); },
    getItem(key) { return storage.getItem(key); },
    setItem(key, value) {
      if (!failed && shouldFail('set', key)) {
        failed = true;
        throw new Error('injected storage failure');
      }
      storage.setItem(key, value);
    },
    removeItem(key) {
      if (!failed && shouldFail('remove', key)) {
        failed = true;
        throw new Error('injected storage failure');
      }
      storage.removeItem(key);
    },
    clear() { storage.clear(); },
  };
}

test('export always includes valid V2 migration metadata for pristine storage', () => {
  const storage = createMemoryStorage();
  const exported = withLocalStorage(storage, () => STORAGE.exportAllData());

  assert.equal(exported[VERSION_KEY], CURRICULUM_STORAGE_VERSION);
  assert.equal(exported[ARCHIVES_KEY], '[]');
});

test('export does not mislabel meaningful unversioned progress as V2', () => {
  const legacyStorage = createMemoryStorage({ codedex_progress: '{"legacy":true}' });
  const exported = withLocalStorage(legacyStorage, () => STORAGE.exportAllData());
  assert.notEqual(exported[VERSION_KEY], CURRICULUM_STORAGE_VERSION);

  const importedStorage = createMemoryStorage();
  withLocalStorage(importedStorage, () => STORAGE.importAllData(exported));
  assert.equal(needsCurriculumChoice(importedStorage), true);
});

test('import rejects invalid shape, unknown keys, non-string values, and unsafe archives atomically', () => {
  const attacks = [
    null,
    [],
    { arbitrary_key: 'attack' },
    { codedex_progress: { not: 'raw JSON text' } },
    { [VERSION_KEY]: '' },
    { [ARCHIVES_KEY]: '{' },
    { [ARCHIVES_KEY]: JSON.stringify([archive('bad', { [VERSION_KEY]: 'v1' })]) },
    JSON.parse('{"__proto__":"pollute"}'),
  ];

  for (const backup of attacks) {
    const storage = createMemoryStorage({
      codedex_progress: '{"active":true}',
      [VERSION_KEY]: CURRICULUM_STORAGE_VERSION,
      [ARCHIVES_KEY]: '[]',
    });
    const before = storage.dump();

    assert.throws(
      () => withLocalStorage(storage, () => STORAGE.importAllData(backup)),
      Error,
    );
    assert.deepEqual(storage.dump(), before);
  }
});

test('import replaces managed state while merging all histories with unique IDs', () => {
  const existingArchives = [archive('shared', { codedex_progress: '{"history":"existing"}' })];
  const importedArchives = [archive('shared', { codedex_progress: '{"history":"imported"}' })];
  const storage = createMemoryStorage({
    codedex_progress: '{"active":true}',
    codedex_badges: '["active-badge"]',
    codedex_lang: 'zh',
    [VERSION_KEY]: CURRICULUM_STORAGE_VERSION,
    [ARCHIVES_KEY]: JSON.stringify(existingArchives),
    unrelated_preference: 'untouched',
  });

  withLocalStorage(storage, () => STORAGE.importAllData({
    codedex_progress: '{"imported":true}',
    codedex_lang: 'en',
    [VERSION_KEY]: CURRICULUM_STORAGE_VERSION,
    [ARCHIVES_KEY]: JSON.stringify(importedArchives),
  }));

  assert.equal(storage.getItem('codedex_progress'), '{"imported":true}');
  assert.equal(storage.getItem('codedex_badges'), null);
  assert.equal(storage.getItem('codedex_lang'), 'en');
  assert.equal(storage.getItem(VERSION_KEY), CURRICULUM_STORAGE_VERSION);
  assert.equal(storage.getItem('unrelated_preference'), 'untouched');

  const histories = readArchives(storage);
  assert.equal(histories.length, 3);
  assert.equal(new Set(histories.map(item => item.id)).size, 3);
  assert.ok(histories.some(item => item.data.codedex_progress === '{"history":"existing"}'));
  assert.ok(histories.some(item => item.data.codedex_progress === '{"history":"imported"}'));
  assert.ok(histories.some(item => item.data.codedex_progress === '{"active":true}'));
});

test('import preserves explicit curriculum-version migration semantics', () => {
  const oldStorage = createMemoryStorage();
  withLocalStorage(oldStorage, () => STORAGE.importAllData({
    codedex_progress: '{"legacy":true}',
  }));
  assert.equal(oldStorage.getItem(VERSION_KEY), null);
  assert.equal(needsCurriculumChoice(oldStorage), true);

  const freshStorage = createMemoryStorage();
  withLocalStorage(freshStorage, () => STORAGE.importAllData({ codedex_lang: 'en' }));
  assert.equal(freshStorage.getItem(VERSION_KEY), CURRICULUM_STORAGE_VERSION);
  assert.equal(needsCurriculumChoice(freshStorage), false);

  const unsupportedStorage = createMemoryStorage();
  withLocalStorage(unsupportedStorage, () => STORAGE.importAllData({
    codedex_progress: '{"future":true}',
    [VERSION_KEY]: 'v3',
  }));
  assert.equal(unsupportedStorage.getItem(VERSION_KEY), 'v3');
  assert.equal(needsCurriculumChoice(unsupportedStorage), true);
});

test('import rolls back exact managed state when archive or replacement writes fail', () => {
  const initial = {
    codedex_progress: '{"active":true}',
    codedex_badges: '["active"]',
    codedex_lang: 'zh',
    [VERSION_KEY]: CURRICULUM_STORAGE_VERSION,
    [ARCHIVES_KEY]: '[]',
  };
  const backup = {
    codedex_progress: '{"imported":true}',
    [VERSION_KEY]: CURRICULUM_STORAGE_VERSION,
    [ARCHIVES_KEY]: '[]',
  };

  for (const predicate of [
    (operation, key) => operation === 'set' && key === ARCHIVES_KEY,
    (operation, key) => operation === 'remove' && key === 'codedex_progress',
  ]) {
    const base = createMemoryStorage(initial);
    const failing = failOnce(base, predicate);
    const before = base.dump();
    assert.throws(
      () => withLocalStorage(failing, () => STORAGE.importAllData(backup)),
      /injected storage failure/,
    );
    assert.deepEqual(base.dump(), before);
  }
});
