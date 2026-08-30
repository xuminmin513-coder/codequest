import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import { runLearningStorageTransaction } from '../src/utils/learningStorageTransaction.js';

function failOnceOnSet(storage, keyToFail) {
  let failed = false;
  return {
    getItem: key => storage.getItem(key),
    setItem(key, value) {
      if (!failed && String(key) === keyToFail) {
        failed = true;
        throw new Error('write failed');
      }
      storage.setItem(key, value);
    },
    removeItem: key => storage.removeItem(key),
  };
}

test('transaction commits selected learning writes on success', () => {
  const storage = createMemoryStorage({ a: 'old-a', untouched: 'keep' });
  const result = runLearningStorageTransaction({ storage, keys: ['a', 'b'] }, () => {
    storage.setItem('a', 'new-a');
    storage.setItem('b', 'new-b');
    return 'committed';
  });

  assert.equal(result, 'committed');
  assert.deepEqual(storage.dump(), { a: 'new-a', b: 'new-b', untouched: 'keep' });
});

test('transaction restores every selected key after a write failure', () => {
  const base = createMemoryStorage({ a: 'old-a', b: 'old-b', untouched: 'keep' });
  const storage = failOnceOnSet(base, 'b');

  assert.throws(() => runLearningStorageTransaction({ storage, keys: ['a', 'b'] }, () => {
    storage.setItem('a', 'new-a');
    storage.setItem('b', 'new-b');
  }), /write failed/);

  assert.deepEqual(base.dump(), { a: 'old-a', b: 'old-b', untouched: 'keep' });
});

test('transaction removes newly created keys during rollback', () => {
  const base = createMemoryStorage({ a: 'old-a' });
  const storage = failOnceOnSet(base, 'failure');

  assert.throws(() => runLearningStorageTransaction({ storage, keys: ['a', 'created', 'failure'] }, () => {
    storage.setItem('created', 'partial');
    storage.setItem('failure', 'boom');
  }), /write failed/);

  assert.deepEqual(base.dump(), { a: 'old-a' });
});

test('transaction reports both the write and rollback errors', () => {
  const base = createMemoryStorage({ a: 'old-a' });
  const storage = {
    getItem: key => base.getItem(key),
    setItem() { throw new Error('rollback failed'); },
    removeItem: key => base.removeItem(key),
  };

  assert.throws(
    () => runLearningStorageTransaction({ storage, keys: ['a'] }, () => {
      throw new Error('completion failed');
    }),
    error => error.name === 'LearningStorageRollbackError'
      && /completion failed/.test(error.cause?.message || '')
      && /rollback failed/.test(error.rollbackError?.message || ''),
  );
});

test('transaction rejects invalid keys or actions before reading storage', () => {
  const storage = {
    getItem() { throw new Error('must not read'); },
  };
  assert.throws(
    () => runLearningStorageTransaction({ storage, keys: [] }, () => {}),
    /non-empty array/,
  );
  assert.throws(
    () => runLearningStorageTransaction({ storage, keys: ['a'] }, null),
    /function/,
  );
});
