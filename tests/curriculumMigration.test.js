import test from 'node:test';
import assert from 'node:assert/strict';
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
