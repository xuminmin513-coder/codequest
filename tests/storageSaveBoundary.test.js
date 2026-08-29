import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('React initializes player saves before rendering', () => {
  const source = read('src/main.jsx');
  assert.match(source, /initializePlayerSaves\(\)/);
  assert.ok(source.indexOf('initializePlayerSaves()') < source.indexOf('createRoot'));
});

test('learning storage routes through the active player adapter', () => {
  const source = read('src/utils/storage.js');
  assert.match(source, /getActivePlayerStorage/);
  assert.doesNotMatch(source, /globalThis\.localStorage|window\.localStorage/);
});
