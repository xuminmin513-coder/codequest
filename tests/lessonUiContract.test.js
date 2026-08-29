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

test('lesson editor footer keeps the run control below the code area', async () => {
  const styles = await readFile(new URL('../src/styles/lesson-workspace.css', import.meta.url), 'utf8');
  const footerStyles = styles.match(/\.lesson-page \.lesson-editor-actions\s*{([^}]*)}/)?.[1];
  const actionStyles = styles.match(/\.lesson-editor-actions \.lesson-primary-action\s*{([^}]*)}/)?.[1];

  assert.ok(footerStyles, 'expected an editor footer style block');
  assert.match(footerStyles, /display:\s*flex/);
  assert.match(footerStyles, /align-items:\s*center/);
  assert.match(footerStyles, /justify-content:\s*flex-end/);
  assert.match(footerStyles, /border-top:\s*1px solid #293249/);
  assert.match(footerStyles, /background:\s*#141b2b/);
  assert.ok(actionStyles, 'expected the editor footer primary action style block');
  assert.match(actionStyles, /min-height:\s*44px/);
});

test('lesson keeps the shared celebration effect', async () => {
  const source = await readFile(new URL('../src/components/Lesson.jsx', import.meta.url), 'utf8');
  assert.match(source, /import Confetti/);
  assert.match(source, /showConfetti && <Confetti/);
});
