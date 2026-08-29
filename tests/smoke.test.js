import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';

test('memory storage follows the localStorage contract used by the app', () => {
  const storage = createMemoryStorage({ codedex_lang: 'zh' });
  assert.equal(storage.getItem('codedex_lang'), 'zh');
  storage.setItem('codedex_lang', 'en');
  assert.equal(storage.getItem('codedex_lang'), 'en');
  storage.removeItem('codedex_lang');
  assert.equal(storage.getItem('codedex_lang'), null);
});

test('memory storage string-coerces keys like localStorage', () => {
  const storage = createMemoryStorage();

  storage.setItem(1, 2);

  assert.equal(storage.key(0), '1');
  assert.equal(storage.getItem('1'), '2');
  storage.removeItem('1');
  assert.equal(storage.getItem(1), null);
});
