import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const graduationSource = readFileSync(
  new URL('../src/components/Graduation.jsx', import.meta.url),
  'utf8',
);
const globalStyles = readFileSync(
  new URL('../src/styles/global.css', import.meta.url),
  'utf8',
);

test('Graduation derives completion from the live curriculum and stored progress', () => {
  assert.match(graduationSource, /getGraduationProgress/);
  assert.match(graduationSource, /STORAGE\.getProgress\(\)/);
  assert.doesNotMatch(graduationSource, /getCompletedCount/);
});

test('unfinished direct access uses a learning state rather than a completion trophy', () => {
  assert.match(graduationSource, /finished\s*\?\s*'🏆'\s*:\s*'📚'/);
  assert.match(graduationSource, /继续你的 Python 冒险/);
  assert.match(graduationSource, /Keep Learning Your Python Adventure/);
  assert.match(graduationSource, /aria-hidden="true"/);
});

test('graduation flex layout overrides the active page display rule', () => {
  assert.match(
    globalStyles,
    /\.page\.active\.graduation-page\s*\{[^}]*display:\s*flex;/s,
  );
});
