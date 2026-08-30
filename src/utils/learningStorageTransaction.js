import { getActivePlayerStorage } from '../data/playerSaveRepository.js';

export function runLearningStorageTransaction(
  { keys, storage = getActivePlayerStorage() },
  action,
) {
  if (!Array.isArray(keys) || keys.length === 0) {
    throw new TypeError('Transaction keys must be a non-empty array');
  }
  if (typeof action !== 'function') {
    throw new TypeError('Transaction action must be a function');
  }
  if (
    !storage
    || typeof storage.getItem !== 'function'
    || typeof storage.setItem !== 'function'
    || typeof storage.removeItem !== 'function'
  ) {
    throw new TypeError('Storage adapter is invalid');
  }

  const uniqueKeys = [...new Set(keys.map(String))];
  const before = new Map(uniqueKeys.map(key => [key, storage.getItem(key)]));

  try {
    return action();
  } catch (error) {
    try {
      for (const [key, value] of before) {
        if (value === null) storage.removeItem(key);
        else storage.setItem(key, value);
      }
    } catch (rollbackError) {
      const combinedError = new Error(
        `Learning save failed and rollback failed: ${rollbackError.message}`,
        { cause: error },
      );
      combinedError.name = 'LearningStorageRollbackError';
      combinedError.rollbackError = rollbackError;
      throw combinedError;
    }
    throw error;
  }
}
