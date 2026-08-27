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

test('lesson uses a spacious brief and coding workspace without hiding learning content', async () => {
  const source = await readFile(new URL('../src/components/Lesson.jsx', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../src/styles/lesson-workspace.css', import.meta.url), 'utf8');

  assert.match(source, /lesson-brief/);
  assert.match(source, /lesson-coding-column/);
  assert.match(source, /lesson-primary-action/);
  assert.match(styles, /\.lesson-workspace[\s\S]*grid-template-columns:\s*minmax\(240px,\s*25%\)\s+minmax\(0,\s*1fr\)/);
  assert.doesNotMatch(styles, /\.lesson-brief\s*{[^}]*display:\s*none/s);
});

test('lesson keeps the shared celebration effect', async () => {
  const source = await readFile(new URL('../src/components/Lesson.jsx', import.meta.url), 'utf8');
  assert.match(source, /import Confetti/);
  assert.match(source, /showConfetti && <Confetti/);
});
