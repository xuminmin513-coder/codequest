import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('settings exposes player saves through a dedicated component', () => {
  const settings = read('src/components/Settings.jsx');
  assert.match(settings, /import SaveSlots/);
  assert.match(settings, /<SaveSlots/);
});

test('save UI adds a slot only from an explicit button action', () => {
  const url = new URL('../src/components/SaveSlots.jsx', import.meta.url);
  assert.equal(existsSync(url), true);
  const source = read('src/components/SaveSlots.jsx');
  assert.match(source, /listSaves\(\)/);
  assert.match(source, /addSave\(/);
  assert.match(source, /添加存档槽/);
  assert.match(source, /switchSave\(/);
  assert.doesNotMatch(source, /while\s*\([^)]*saves/);
});
