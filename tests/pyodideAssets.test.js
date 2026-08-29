import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = relative => readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8');

test('Pyodide and the Vite copy plugin are pinned exactly', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.dependencies.pyodide, '314.0.5');
  assert.equal(pkg.devDependencies['vite-plugin-static-copy'], '4.1.1');
});

test('Vite copies only local Pyodide core assets', () => {
  const source = read('vite.config.js');
  assert.match(source, /viteStaticCopy/);
  assert.match(source, /optimizeDeps:\s*\{\s*exclude:\s*\['pyodide'\]/s);
  assert.match(source, /assets\/pyodide/);
  assert.match(source, /!\*\*\/\*\.whl/);
  assert.match(source, /!\*\*\/pyodide\/node_modules/);
  assert.match(source, /rename:\s*\{\s*stripBase:\s*true\s*\}/);
  assert.match(source, /worker:\s*\{[\s\S]*format:\s*'es'/);
  assert.match(source, /plugins:\s*\(\)\s*=>\s*\[inlinePyodideWasm\]/);
  assert.match(source, /inline-pyodide-wasm/);
  assert.match(source, /readFileSync\(pyodideWasmPath\)/);
});

test('worker uses bundled Pyodide without package or CDN downloads', () => {
  assert.equal(existsSync(new URL('../src/runtime/python.worker.js', import.meta.url)), true);
  const source = read('src/runtime/python.worker.js');
  assert.match(source, /from 'pyodide'/);
  assert.match(source, /from 'pyodide\/pyodide\.asm\.mjs'/);
  assert.match(source, /virtual:pyodide-wasm-data/);
  assert.match(source, /python_stdlib\.zip\?inline/);
  assert.match(source, /pyodide-lock\.json/);
  assert.match(source, /createPyodideModule/);
  assert.match(source, /lockFileContents/);
  assert.match(source, /WasmOffsetConverter/);
  assert.match(source, /instantiateBundledWasm/);
  assert.match(source, /Jsv_GetError_import/);
  assert.match(source, /JsvError_Check/);
  assert.doesNotMatch(source, /https?:\/\/|loadPackagesFromImports|micropip/);
});

test('Vite removes custom-protocol-incompatible crossorigin attributes', () => {
  const source = read('vite.config.js');
  assert.match(source, /transformIndexHtml/);
  assert.match(source, /crossorigin/);
  assert.match(source, /type="module"/);
  assert.match(source, /format:\s*'iife'/);
  assert.match(source, /inline-classic-entry/);
  assert.match(source, /createHash\('sha256'\)/);
  assert.match(source, /__XMCODE_WORKER_URL__/);
});
