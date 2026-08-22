import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('lesson UI cannot auto-fill a reference answer', async () => {
  const source = await readFile(new URL('../src/components/Lesson.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /handleShowAnswer/);
  assert.doesNotMatch(source, /查看答案|Reference answer filled|>Answer</);
});

test('lesson initialization never loads starterCode', async () => {
  const source = await readFile(new URL('../src/components/Lesson.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /les\.starterCode/);
});
