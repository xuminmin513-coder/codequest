import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import {
  CURRICULUM_STORAGE_VERSION,
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
