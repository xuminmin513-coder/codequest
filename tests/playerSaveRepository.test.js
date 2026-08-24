import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import {
  ACTIVE_SAVE_KEY,
  SAVE_CATALOG_KEY,
  createPlayerSaveRepository,
} from '../src/data/playerSaveRepository.js';

test('first initialization creates exactly one default save and migrates legacy data', () => {
  const physical = createMemoryStorage({
    codedex_lang: 'zh',
    codedex_progress: '{"ch1":{"ch1_01":{"done":true}}}',
  });
  const repo = createPlayerSaveRepository(physical, {
    now: () => 100,
    idFactory: () => 'save-default',
  });

  repo.initialize();

  assert.equal(repo.listSaves().length, 1);
  assert.equal(repo.getActiveSave().id, 'save-default');
  assert.equal(repo.getActiveStorage().getItem('codedex_lang'), 'zh');
  assert.equal(
    repo.getActiveStorage().getItem('codedex_progress'),
    '{"ch1":{"ch1_01":{"done":true}}}',
  );
  assert.equal(physical.getItem('codedex_progress'), null);
  assert.ok(physical.getItem(SAVE_CATALOG_KEY));
  assert.equal(physical.getItem(ACTIVE_SAVE_KEY), 'save-default');
});

test('first initialization localizes the default save name from legacy language', () => {
  const physical = createMemoryStorage({ codedex_lang: 'en' });
  const repo = createPlayerSaveRepository(physical, {
    now: () => 100,
    idFactory: () => 'save-default',
  });

  repo.initialize();

  assert.equal(repo.getActiveSave().name, 'Default Save');
});

test('adding and switching saves keeps learning data isolated', () => {
  const physical = createMemoryStorage();
  const ids = ['save-one', 'save-two'];
  const repo = createPlayerSaveRepository(physical, {
    now: () => 100,
    idFactory: () => ids.shift(),
  });
  repo.initialize();
  repo.getActiveStorage().setItem('codedex_lang', 'zh');

  const second = repo.addSave('第二个存档');
  repo.switchSave(second.id);

  assert.equal(repo.getActiveStorage().getItem('codedex_lang'), null);
  repo.getActiveStorage().setItem('codedex_lang', 'en');
  repo.switchSave('save-one');
  assert.equal(repo.getActiveStorage().getItem('codedex_lang'), 'zh');
  assert.equal(repo.listSaves().length, 2);
});

test('recoveries keep the newest three valid snapshots', () => {
  let time = 100;
  const physical = createMemoryStorage();
  const repo = createPlayerSaveRepository(physical, {
    now: () => time++,
    idFactory: () => 'save-one',
  });
  repo.initialize();

  for (let value = 1; value <= 4; value += 1) {
    repo.getActiveStorage().setItem('codedex_progress', JSON.stringify({ value }));
    repo.createRecovery(`snapshot-${value}`);
  }

  const recoveries = repo.listRecoveries();
  assert.deepEqual(
    recoveries.map(item => item.reason),
    ['snapshot-4', 'snapshot-3', 'snapshot-2'],
  );
});

test('restore rejects a tampered recovery without changing active data', () => {
  let time = 100;
  const physical = createMemoryStorage();
  const repo = createPlayerSaveRepository(physical, {
    now: () => time++,
    idFactory: () => 'save-one',
  });
  repo.initialize();
  repo.getActiveStorage().setItem('codedex_progress', '{"value":1}');
  const recovery = repo.createRecovery('before-import');
  repo.getActiveStorage().setItem('codedex_progress', '{"value":2}');

  const key = `xm2_save_recoveries:${repo.getActiveSave().id}`;
  const raw = JSON.parse(physical.getItem(key));
  raw[0].data.codedex_progress = '{"value":999}';
  physical.setItem(key, JSON.stringify(raw));

  assert.throws(() => repo.restoreRecovery(recovery.id), /checksum/i);
  assert.equal(repo.getActiveStorage().getItem('codedex_progress'), '{"value":2}');
});
