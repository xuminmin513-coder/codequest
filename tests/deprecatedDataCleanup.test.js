import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import { purgeDeprecatedSecrets } from '../src/utils/deprecatedDataCleanup.js';

test('purge removes the former DeepSeek key without reading it', () => {
  const storage = createMemoryStorage({
    codedex_deepseek_key: 'secret-value',
    codedex_lang: 'zh',
  });

  purgeDeprecatedSecrets(storage);

  assert.equal(storage.getItem('codedex_deepseek_key'), null);
  assert.equal(storage.getItem('codedex_lang'), 'zh');
});
