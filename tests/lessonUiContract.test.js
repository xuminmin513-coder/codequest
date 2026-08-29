import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

function getRule(styles, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = styles.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `expected a ${selector} style rule`);
  return match[1];
}

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

test('lesson design tokens include the approved purple semantic pair', async () => {
  const tokens = await readFile(new URL('../src/styles/design-tokens.css', import.meta.url), 'utf8');

  assert.match(tokens, /--xm-purple:\s*#654ca9;/);
  assert.match(tokens, /--xm-purple-soft:\s*#f1edff;/);
});

test('lesson semantic sections map each curriculum purpose to its approved soft color', async () => {
  const styles = await readFile(new URL('../src/styles/lesson-workspace.css', import.meta.url), 'utf8');
  const base = getRule(styles, '.lesson-content-section');
  const learn = getRule(styles, '.lesson-content-section--learn');
  const example = getRule(styles, '.lesson-content-section--example');
  const task = getRule(styles, '.lesson-content-section--task');

  assert.match(base, /margin-bottom:\s*14px;/);
  assert.match(base, /padding:\s*14px;/);
  assert.match(base, /border-left:\s*4px solid var\(--xm-blue\);/);
  assert.match(base, /border-radius:\s*12px;/);
  assert.match(base, /background:\s*var\(--xm-blue-soft\);/);
  assert.match(base, /color:\s*var\(--xm-text\);/);
  assert.doesNotMatch(base, /color:\s*var\(--xm-text-secondary\);/);
  assert.match(learn, /border-left-color:\s*var\(--xm-blue\);/);
  assert.match(learn, /background:\s*var\(--xm-blue-soft\);/);
  assert.match(example, /border-left-color:\s*var\(--xm-purple\);/);
  assert.match(example, /background:\s*var\(--xm-purple-soft\);/);
  assert.match(task, /border-left-color:\s*var\(--xm-green\);/);
  assert.match(task, /background:\s*var\(--xm-green-soft\);/);
});

test('lesson semantic section headings and inline hints preserve their meaning and readable code', async () => {
  const styles = await readFile(new URL('../src/styles/lesson-workspace.css', import.meta.url), 'utf8');
  const hint = getRule(styles, '.lesson-content-callout--hint');
  const inlineHints = getRule(styles, '.lesson-brief .hints-inline');
  const hintTitle = getRule(styles, '.lesson-brief .hints-title');
  const inlineCode = getRule(styles, '.lesson-brief-content code');
  const fencedCode = getRule(styles, '.lesson-brief-content pre');
  const hintCode = getRule(styles, '.lesson-brief .hint-code');

  assert.match(styles, /\.lesson-content-section--learn\s+>\s+h2:first-child,\s*\.lesson-content-section--learn\s+>\s+h3:first-child\s*\{[^}]*color:\s*#0068d4;/s);
  assert.match(styles, /\.lesson-content-section--example\s+>\s+h[23]:first-child[\s\S]*?color:\s*var\(--xm-purple\);/);
  assert.match(styles, /\.lesson-content-section--task\s+>\s+h[23]:first-child[\s\S]*?color:\s*var\(--xm-green\);/);
  assert.match(styles, /\.lesson-content-section\s+>\s+h[23]:first-child[\s\S]*?margin:\s*0\s+0\s+8px;/);
  assert.match(styles, /\.lesson-content-section\s+>\s+:last-child\s*\{[^}]*margin-bottom:\s*0;/s);
  assert.match(hint, /border-left:\s*4px solid var\(--xm-orange\);/);
  assert.match(hint, /background:\s*var\(--xm-orange-soft\);/);
  assert.match(hint, /color:\s*var\(--xm-text\);/);
  assert.match(inlineHints, /margin-top:\s*18px;/);
  assert.match(inlineHints, /padding:\s*14px;/);
  assert.match(inlineHints, /border-left:\s*4px solid var\(--xm-orange\);/);
  assert.match(inlineHints, /border-radius:\s*12px;/);
  assert.match(inlineHints, /background:\s*var\(--xm-orange-soft\);/);
  assert.doesNotMatch(inlineHints, /border-top|padding-top/);
  assert.match(hintTitle, /color:\s*var\(--xm-orange\);/);
  assert.match(hintTitle, /font-weight:\s*850;/);
  assert.match(inlineCode, /background:\s*var\(--xm-surface-muted\);/);
  assert.match(fencedCode, /background:\s*var\(--xm-surface-muted\);/);
  assert.match(hintCode, /background:\s*#141b2b;/);
});
