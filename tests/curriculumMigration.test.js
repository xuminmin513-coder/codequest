import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import {
  CURRICULUM_STORAGE_VERSION,
  VERSION_KEY,
  ARCHIVES_KEY,
  LEARNING_KEYS,
  readArchives,
  needsCurriculumChoice,
  keepExistingProgress,
  restartForV2,
  restoreArchive,
} from '../src/utils/curriculumMigration.js';

const oldData = {
  codedex_progress: JSON.stringify({ ch1: { ch1_01: { done: true, xp: 60 } } }),
  codedex_badges: JSON.stringify(['first_code']),
  codedex_lang: 'zh',
};

const settingsSource = readFileSync(
  new URL('../src/components/Settings.jsx', import.meta.url),
  'utf8',
);
const appSource = readFileSync(
  new URL('../src/App.jsx', import.meta.url),
  'utf8',
);
const migrationModalSource = readFileSync(
  new URL('../src/components/CurriculumMigrationModal.jsx', import.meta.url),
  'utf8',
);

test('existing unversioned progress requires a migration choice', () => {
  assert.equal(needsCurriculumChoice(createMemoryStorage(oldData)), true);
  assert.equal(needsCurriculumChoice(createMemoryStorage()), false);
});

test('keeping progress archives it and leaves active progress intact', () => {
  const storage = createMemoryStorage(oldData);
  keepExistingProgress(storage, 1000);
  assert.equal(storage.getItem('codedex_progress'), oldData.codedex_progress);
  assert.equal(storage.getItem('codedex_curriculum_version'), CURRICULUM_STORAGE_VERSION);
  assert.ok(JSON.parse(storage.getItem('codedex_curriculum_archives')).length === 1);
});

test('restarting archives learning data, clears active progress, and preserves language', () => {
  const storage = createMemoryStorage(oldData);
  const archiveId = restartForV2(storage, 1000);
  assert.equal(storage.getItem('codedex_progress'), null);
  assert.equal(storage.getItem('codedex_badges'), null);
  assert.equal(storage.getItem('codedex_lang'), 'zh');
  restoreArchive(storage, archiveId, 2000);
  assert.equal(storage.getItem('codedex_progress'), oldData.codedex_progress);
  assert.equal(storage.getItem('codedex_badges'), oldData.codedex_badges);
  assert.equal(JSON.parse(storage.getItem('codedex_curriculum_archives')).length, 2);
});

test('Settings accurately describes the recoverable current-progress reset', () => {
  assert.match(settingsSource, /重置当前学习进度/);
  assert.match(settingsSource, /自动创建可恢复存档/);
  assert.match(settingsSource, /语言和历史存档会保留/);
  assert.match(settingsSource, /Reset Current Progress/);
  assert.match(settingsSource, /restorable archive is created automatically/i);
  assert.match(settingsSource, /language and history archives remain/i);
  assert.doesNotMatch(settingsSource, /此操作不可撤销/);
  assert.doesNotMatch(settingsSource, /cannot be undone/i);
});

function archiveRaw(items) {
  return JSON.stringify(items);
}

function validArchive(id = 'legacy-1', data = { codedex_progress: '{"old":true}' }) {
  return { id, createdAt: 1, data };
}

function failNextArchiveWrite(storage) {
  let shouldFail = true;
  return {
    get length() { return storage.length; },
    key(index) { return storage.key(index); },
    getItem(key) { return storage.getItem(key); },
    setItem(key, value) {
      if (shouldFail && key === ARCHIVES_KEY) {
        shouldFail = false;
        throw new Error('quota exceeded');
      }
      storage.setItem(key, value);
    },
    removeItem(key) { storage.removeItem(key); },
    clear() { storage.clear(); },
    dump() { return storage.dump(); },
  };
}

test('restore rejects unsafe archive data without mutating archives or active progress', () => {
  const unsafeEntries = [
    [ARCHIVES_KEY, 'overwrite'],
    [VERSION_KEY, 'v1'],
    ['__proto__', 'pollute'],
    ['arbitrary_key', 'value'],
    ['codedex_progress', { not: 'a string' }],
  ];

  for (const [key, value] of unsafeEntries) {
    const data = Object.fromEntries([[key, value]]);
    const raw = archiveRaw([validArchive('unsafe', data)]);
    const storage = createMemoryStorage({
      codedex_progress: '{"active":true}',
      [ARCHIVES_KEY]: raw,
    });
    const before = storage.dump();

    assert.throws(() => restoreArchive(storage, 'unsafe', 10), Error);
    assert.deepEqual(storage.dump(), before);
  }
});

test('malformed archives fail with controlled errors and no mutation', () => {
  const malformedValues = [
    '{',
    'null',
    '{}',
    '[null]',
    archiveRaw([{ id: '', createdAt: 1, data: {} }]),
    archiveRaw([{ id: 'x', createdAt: 'today', data: {} }]),
    archiveRaw([{ id: 'x', createdAt: 1, data: [] }]),
    archiveRaw([validArchive('same'), validArchive('same')]),
  ];

  for (const raw of malformedValues) {
    const storage = createMemoryStorage({
      codedex_progress: '{"active":true}',
      [ARCHIVES_KEY]: raw,
    });
    const before = storage.dump();

    assert.throws(
      () => readArchives(storage),
      error => error instanceof Error && !(error instanceof TypeError),
    );
    assert.deepEqual(storage.dump(), before);
  }
});

test('valid restore archives active data and restores only allowlisted learning keys', () => {
  const raw = archiveRaw([validArchive('target', {
    codedex_progress: '{"restored":true}',
    codedex_badges: '["restored"]',
  })]);
  const storage = createMemoryStorage({
    codedex_progress: '{"active":true}',
    codedex_badges: '["active"]',
    unrelated_preference: 'keep-me',
    [ARCHIVES_KEY]: raw,
  });

  restoreArchive(storage, 'target', 20);

  assert.equal(storage.getItem('codedex_progress'), '{"restored":true}');
  assert.equal(storage.getItem('codedex_badges'), '["restored"]');
  assert.equal(storage.getItem('unrelated_preference'), 'keep-me');
  assert.equal(storage.getItem(VERSION_KEY), CURRICULUM_STORAGE_VERSION);
  assert.equal(readArchives(storage).length, 2);
  assert.deepEqual(
    Object.keys(readArchives(storage)[0].data).every(key => LEARNING_KEYS.includes(key)),
    true,
  );
});

test('same-millisecond archives receive unique IDs and remain independently restorable', () => {
  const storage = createMemoryStorage({ codedex_progress: '{"first":true}' });
  const firstId = restartForV2(storage, 1000);
  storage.setItem('codedex_progress', '{"second":true}');
  const secondId = restartForV2(storage, 1000);

  assert.notEqual(firstId, secondId);
  assert.equal(new Set(readArchives(storage).map(item => item.id)).size, 2);

  restoreArchive(storage, secondId, 1000);
  assert.equal(storage.getItem('codedex_progress'), '{"second":true}');
});

test('curriculum choice bootstraps pristine and empty progress without prompting', () => {
  for (const initial of [{}, { codedex_progress: '{}' }]) {
    const storage = createMemoryStorage(initial);
    assert.equal(needsCurriculumChoice(storage), false);
    assert.equal(storage.getItem(VERSION_KEY), CURRICULUM_STORAGE_VERSION);
    assert.equal(storage.getItem(ARCHIVES_KEY), '[]');
  }
});

test('meaningful, malformed, or unsupported legacy progress requires an explicit choice', () => {
  const cases = [
    { codedex_progress: '{"ch1":{}}' },
    { codedex_progress: '{broken' },
    { codedex_progress: ' ' },
    { codedex_progress: '{"ch1":{}}', [VERSION_KEY]: 'v1' },
    { codedex_progress: '{"ch1":{}}', [VERSION_KEY]: 'v3' },
    { codedex_progress: '{"ch1":{}}', [VERSION_KEY]: 'garbage' },
  ];

  for (const initial of cases) {
    const storage = createMemoryStorage(initial);
    const before = storage.dump();
    assert.equal(needsCurriculumChoice(storage), true);
    assert.deepEqual(storage.dump(), before);
  }

  const current = createMemoryStorage({
    codedex_progress: '{"ch1":{}}',
    [VERSION_KEY]: CURRICULUM_STORAGE_VERSION,
  });
  assert.equal(needsCurriculumChoice(current), false);
});

test('restart and restore leave active data unchanged when archive writing fails', () => {
  const restartBase = createMemoryStorage({ codedex_progress: '{"active":true}' });
  const failingRestart = failNextArchiveWrite(restartBase);
  const restartBefore = restartBase.dump();
  assert.throws(() => restartForV2(failingRestart, 1), /quota exceeded/);
  assert.deepEqual(restartBase.dump(), restartBefore);

  const restoreBase = createMemoryStorage({
    codedex_progress: '{"active":true}',
    [ARCHIVES_KEY]: archiveRaw([validArchive('target')]),
  });
  const failingRestore = failNextArchiveWrite(restoreBase);
  const restoreBefore = restoreBase.dump();
  assert.throws(() => restoreArchive(failingRestore, 'target', 2), /quota exceeded/);
  assert.deepEqual(restoreBase.dump(), restoreBefore);
});

test('App delays review migration until the curriculum choice is resolved', () => {
  assert.match(appSource, /if \(showMigration\) return;[\s\S]*?STORAGE\.migrateReviewData\(\);/);
  assert.match(appSource, /try\s*{\s*STORAGE\.keepExistingProgress\(\);[\s\S]*?setShowMigration\(false\);[\s\S]*?}\s*catch/s);
  assert.match(appSource, /try\s*{\s*STORAGE\.restartForV2\(\);[\s\S]*?setShowMigration\(false\);[\s\S]*?}\s*catch/s);
  assert.match(appSource, /迁移失败/);
  assert.match(appSource, /Migration failed/);
  assert.match(appSource, /try\s*{\s*STORAGE\.migrateReviewData\(\);[\s\S]*?}\s*catch/s);
});

test('Settings catches archive errors and reloads only after a successful import', () => {
  assert.match(settingsSource, /let curriculumArchives = \[\];/);
  assert.match(settingsSource, /历史存档暂时无法读取/);
  assert.match(settingsSource, /Curriculum archives are temporarily unavailable/);
  assert.match(settingsSource, /导入失败/);
  assert.match(settingsSource, /Import failed/);
  assert.match(settingsSource, /STORAGE\.importAllData\(data\);[\s\S]*?window\.location\.reload\(\);/);
  assert.match(settingsSource, /STORAGE\.restartForV2\(\);[\s\S]*?catch/s);
  assert.match(settingsSource, /STORAGE\.restoreCurriculumArchive\(archive\.id\);[\s\S]*?catch/s);
  assert.match(settingsSource, /const exportProgress = \(\) => {\s*try\s*{\s*const data = STORAGE\.exportAllData\(\);/s);
  assert.match(settingsSource, /导出失败/);
  assert.match(settingsSource, /Export failed/);
});

test('curriculum migration modal exposes an accessible dialog and initial focus', () => {
  assert.match(migrationModalSource, /role="dialog"/);
  assert.match(migrationModalSource, /aria-modal="true"/);
  assert.match(migrationModalSource, /aria-labelledby="curriculum-migration-title"/);
  assert.match(migrationModalSource, /id="curriculum-migration-title"/);
  assert.match(migrationModalSource, /className="modal-icon" aria-hidden="true"/);
  assert.match(migrationModalSource, /onClick=\{onKeep\} autoFocus/);
});
