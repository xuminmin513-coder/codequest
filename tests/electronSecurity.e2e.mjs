import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { _electron as electron } from 'playwright';

test('Electron runtime isolates the renderer, network, and Python worker', { timeout: 45000 }, async () => {
  const profileDir = await mkdtemp(path.join(tmpdir(), 'xmcode-e2e-'));
  const sentinelPath = path.join(profileDir, 'host-sentinel.txt');
  await writeFile(sentinelPath, 'host-only', 'utf8');

  let electronApp;
  try {
    electronApp = await electron.launch({
      args: ['.', '--xmcode-e2e'],
      env: { ...process.env, XMCODE_E2E_USER_DATA: profileDir },
    });
    const page = await electronApp.firstWindow();
    const browserDiagnostics = [];
    page.on('console', message => browserDiagnostics.push(`console:${message.type()}:${message.text()}`));
    page.on('pageerror', error => browserDiagnostics.push(`pageerror:${error.message}`));
    page.on('requestfailed', request => {
      browserDiagnostics.push(`requestfailed:${request.url()}:${request.failure()?.errorText}`);
    });
    await page.waitForLoadState('domcontentloaded');
    try {
      await page.waitForFunction(
        () => (document.querySelector('#root')?.childElementCount ?? 0) > 0,
        null,
        { timeout: 5000 },
      );
    } catch {
      assert.fail(JSON.stringify({ browserDiagnostics }));
    }

    assert.match(page.url(), /^xmcode:\/\/app\//);
    assert.equal(
      await electronApp.evaluate(({ app }) => app.getPath('userData')),
      profileDir,
    );

    const globals = await page.evaluate(() => ({
      electronAPI: typeof window.electronAPI,
      nodeRequire: typeof window.require,
      nodeProcess: typeof window.process,
    }));
    assert.deepEqual(globals, {
      electronAPI: 'undefined',
      nodeRequire: 'undefined',
      nodeProcess: 'undefined',
    });

    const preferences = await electronApp.evaluate(({ BrowserWindow }) => (
      BrowserWindow.getAllWindows()[0].webContents.getLastWebPreferences()
    ));
    assert.equal(preferences.sandbox, true);
    assert.equal(preferences.contextIsolation, true);
    assert.equal(preferences.nodeIntegration, false);
    assert.equal(preferences.webSecurity, true);

    const externalFetch = await page.evaluate(async () => {
      try {
        await fetch('https://example.com');
        return 'allowed';
      } catch {
        return 'blocked';
      }
    });
    assert.equal(externalFetch, 'blocked');

    const windowCount = electronApp.windows().length;
    await page.evaluate(() => window.open('https://example.com'));
    await new Promise(resolve => setTimeout(resolve, 100));
    assert.equal(electronApp.windows().length, windowCount);

    await page.evaluate(() => {
      window.location.href = 'https://example.com';
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    assert.match(page.url(), /^xmcode:\/\/app\//);

    const assets = await readdir(new URL('../dist/assets/', import.meta.url));
    const workerFile = assets.find(name => /^python\.worker(?:-.*)?\.js$/.test(name));
    assert.ok(workerFile, 'built Python worker asset is missing');

    const workerResults = await page.evaluate(async ({ workerFile, sentinelPath }) => {
      const worker = new Worker(new URL(`./assets/${workerFile}`, window.location.href), { type: 'module' });
      const pending = new Map();
      worker.addEventListener('message', event => {
        const resolve = pending.get(event.data?.runId);
        if (resolve) {
          pending.delete(event.data.runId);
          resolve(event.data);
        }
      });
      worker.addEventListener('error', event => {
        for (const resolve of pending.values()) {
          resolve({ status: 'worker_crash', error: event.message });
        }
        pending.clear();
      });

      const run = code => new Promise((resolve, reject) => {
        const runId = crypto.randomUUID();
        const capability = crypto.randomUUID();
        const timer = setTimeout(() => reject(new Error('worker result timed out')), 30000);
        pending.set(runId, value => {
          clearTimeout(timer);
          resolve(value);
        });
        worker.postMessage({ version: 1, runId, capability, code, input: '' });
      });

      try {
        const hello = await run("print('hello from Python')");
        const hostFile = await run(`print(open(${JSON.stringify(sentinelPath)}).read())`);
        return { hello, hostFile };
      } finally {
        worker.terminate();
      }
    }, { workerFile, sentinelPath });

    assert.equal(
      workerResults.hello.status,
      'passed',
      JSON.stringify({ hello: workerResults.hello, browserDiagnostics }),
    );
    assert.equal(workerResults.hello.output, 'hello from Python\n');
    assert.equal(workerResults.hostFile.status, 'runtime_error');
    assert.doesNotMatch(workerResults.hostFile.output, /host-only/);
  } finally {
    await electronApp?.close();
    await rm(profileDir, { recursive: true, force: true });
  }
});
