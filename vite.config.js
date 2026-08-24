import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createHash } from 'node:crypto';
import { readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pyodideDir = dirname(fileURLToPath(import.meta.resolve('pyodide')));
const projectDir = dirname(fileURLToPath(import.meta.url));
const pyodideWasmPath = join(pyodideDir, 'pyodide.asm.wasm');
const pyodideExcludes = [
  '!**/*.{md,html}',
  '!**/*.d.ts',
  '!**/*.whl',
  '!**/pyodide/node_modules',
];

const stripCustomProtocolCrossorigin = {
  name: 'strip-custom-protocol-crossorigin',
  enforce: 'post',
  transformIndexHtml: {
    order: 'post',
    handler: html => html
      .replace(/\s+crossorigin(?=[\s>])/g, '')
      .replace(/\s+type="module"(?=[\s>])/g, ''),
  },
};

const inlinePyodideWasm = {
  name: 'inline-pyodide-wasm',
  enforce: 'pre',
  resolveId(source) {
    if (source === 'virtual:pyodide-wasm-data') return '\0inline-pyodide-wasm';
    return null;
  },
  load(id) {
    if (id !== '\0inline-pyodide-wasm') return null;
    const dataUrl = `data:application/wasm;base64,${readFileSync(pyodideWasmPath).toString('base64')}`;
    return `export default ${JSON.stringify(dataUrl)};`;
  },
};

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const inlineClassicEntry = {
  name: 'inline-classic-entry',
  closeBundle() {
      const htmlPath = join(projectDir, 'dist', 'index.html');
      const html = readFileSync(htmlPath, 'utf8');
      const entryMatch = html.match(/<script src="\.\/(assets\/index-[^"]+\.js)"><\/script>/);
      if (!entryMatch) throw new Error('Expected classic app entry script in built HTML');

      const entryPath = join(projectDir, 'dist', entryMatch[1]);
      const entryCode = readFileSync(entryPath, 'utf8');
      const workerBootstrap = 'Object.defineProperty(globalThis,"__XMCODE_WORKER_URL__",{value:new URL("./assets/python.worker.js",document.baseURI).href,writable:false,configurable:false});';
      const inlineCode = `${workerBootstrap}${entryCode}`.replace(/<\/script/gi, '<\\/script');
      const scriptHash = createHash('sha256').update(inlineCode).digest('base64');
      const scriptTag = new RegExp(`<script src="\\./${escapeRegExp(entryMatch[1])}"></script>`);
      const inlinedHtml = html
        .replace(scriptTag, '')
        .replace('</body>', () => `<script>${inlineCode}</script>\n</body>`)
        .replace("script-src 'self' 'wasm-unsafe-eval'", `script-src 'self' 'wasm-unsafe-eval' 'sha256-${scriptHash}'`);
      writeFileSync(htmlPath, inlinedHtml);
      unlinkSync(entryPath);
  },
};

export default defineConfig({
  assetsInclude: ['**/*.wasm', '**/*.zip'],
  plugins: [
    inlinePyodideWasm,
    react(),
    viteStaticCopy({
      targets: [{
        src: [join(pyodideDir, '*').replace(/\\/g, '/'), ...pyodideExcludes],
        dest: 'assets/pyodide',
        rename: { stripBase: true },
      }],
    }),
    stripCustomProtocolCrossorigin,
    inlineClassicEntry,
  ],
  optimizeDeps: { exclude: ['pyodide'] },
  worker: {
    format: 'es',
    plugins: () => [inlinePyodideWasm],
    rollupOptions: {
      output: { entryFileNames: 'assets/python.worker.js' },
    },
  },
  base: './',
  build: {
    assetsInlineLimit: 20 * 1024,
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
  server: {
    port: 5173,
  },
});
