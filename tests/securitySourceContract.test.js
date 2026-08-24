import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = relative => readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8');

test('Electron main process has no host Python execution bridge', () => {
  const source = read('main.cjs');
  assert.doesNotMatch(source, /child_process|execFile|spawn\s*\(|run-python|ipcMain/);
  assert.match(source, /sandbox:\s*true/);
  assert.match(source, /setPermissionRequestHandler/);
  assert.match(source, /setWindowOpenHandler/);
  assert.match(source, /will-navigate/);
  assert.match(source, /supportFetchAPI:\s*false/);
  assert.match(source, /corsEnabled:\s*false/);
  assert.doesNotMatch(source, /bypassCSP:\s*true/);
});

test('renderer has no privileged preload bridge', () => {
  assert.equal(existsSync(new URL('../preload.js', import.meta.url)), false);
  assert.doesNotMatch(read('main.cjs'), /preload:/);
});

test('AI request and API key UI are absent', () => {
  assert.equal(existsSync(new URL('../src/components/AIChat.jsx', import.meta.url)), false);
  assert.doesNotMatch(read('src/components/Lesson.jsx'), /AIChat|DeepSeek/);
  assert.doesNotMatch(read('src/components/Settings.jsx'), /getDeepSeekKey|setDeepSeekKey|API Key|DeepSeek/);
  assert.doesNotMatch(read('src/utils/storage.js'), /getDeepSeekKey|setDeepSeekKey/);
});

test('dynamic JavaScript Python simulator is absent', () => {
  assert.equal(existsSync(new URL('../src/utils/transpiler.js', import.meta.url)), false);
  assert.doesNotMatch(read('src/components/Lesson.jsx'), /simulatePython/);
});

test('document CSP forbids generic eval and external connections', () => {
  const source = read('index.html');
  assert.match(source, /Content-Security-Policy/);
  assert.match(source, /script-src 'self' 'wasm-unsafe-eval'/);
  assert.match(source, /connect-src 'self'/);
  assert.doesNotMatch(source, /'unsafe-eval'/);
});
