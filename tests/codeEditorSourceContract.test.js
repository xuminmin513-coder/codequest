import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(
  new URL('../src/components/CodeEditor.jsx', import.meta.url),
  'utf8',
);

test('CodeEditor keeps callbacks current without recreating CodeMirror', () => {
  assert.match(source, /const onRunRef = useRef\(onRun\)/);
  assert.match(source, /const onChangeRef = useRef\(onChange\)/);
  assert.match(source, /onRunRef\.current = onRun/);
  assert.match(source, /onChangeRef\.current = onChange/);
  assert.match(source, /onRunRef\.current\?\.\(\)/);
  assert.match(source, /EditorView\.updateListener\.of/);
  assert.match(source, /update\.docChanged/);
  assert.match(source, /onChangeRef\.current\?\.\(update\.state\.doc\.toString\(\)\)/);
  assert.match(source, /\}, \[initialCode\]\);/);
  assert.doesNotMatch(source, /\[initialCode,\s*onRun/);
  assert.doesNotMatch(source, /\[initialCode,\s*onChange/);
});
