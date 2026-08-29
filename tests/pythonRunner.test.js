import test from 'node:test';
import assert from 'node:assert/strict';
import { createPythonRunner } from '../src/runtime/PythonRunner.js';

class FakeWorker {
  constructor() {
    this.listeners = new Map();
    this.messages = [];
    this.terminated = false;
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener);
  }

  postMessage(message) {
    this.messages.push(message);
  }

  terminate() {
    this.terminated = true;
  }

  emit(type, payload) {
    for (const listener of this.listeners.get(type) || []) {
      listener(type === 'message' ? { data: payload } : payload);
    }
  }
}

function createHarness(options = {}) {
  const workers = [];
  const ids = ['run-1', 'cap-1', 'run-2', 'cap-2'];
  const runner = createPythonRunner({
    workerFactory: () => {
      const worker = new FakeWorker();
      workers.push(worker);
      return worker;
    },
    idFactory: () => ids.shift(),
    timeoutMs: options.timeoutMs ?? 100,
  });
  return { runner, workers };
}

test('runner resolves only a result with matching run id and capability', async () => {
  const { runner, workers } = createHarness();
  const pending = runner.run('print(1)');
  const worker = workers[0];
  const request = worker.messages[0];

  worker.emit('message', {
    version: 1,
    runId: request.runId,
    capability: 'forged',
    status: 'passed',
    output: 'forged',
    error: null,
  });
  worker.emit('message', {
    version: 1,
    runId: request.runId,
    capability: request.capability,
    status: 'passed',
    output: '1\n',
    error: null,
  });

  assert.deepEqual(await pending, { status: 'passed', output: '1\n', error: null });
  runner.dispose();
});

test('runner terminates the worker after timeout', async () => {
  const { runner, workers } = createHarness({ timeoutMs: 10 });
  const result = await runner.run('while True: pass');

  assert.equal(result.status, 'timeout');
  assert.equal(workers[0].terminated, true);
});

test('stop settles the active run and terminates its worker', async () => {
  const { runner, workers } = createHarness();
  const pending = runner.run('print(1)');

  assert.equal(runner.stop(), true);
  assert.equal((await pending).status, 'stopped');
  assert.equal(workers[0].terminated, true);
});

test('worker errors fail closed and terminate the worker', async () => {
  const { runner, workers } = createHarness();
  const pending = runner.run('print(1)');
  workers[0].emit('error', new Error('boom'));

  assert.equal((await pending).status, 'worker_crash');
  assert.equal(workers[0].terminated, true);
});

test('dispose stops the current run and rejects future execution', async () => {
  const { runner } = createHarness();
  const pending = runner.run('print(1)');
  runner.dispose();

  assert.equal((await pending).status, 'stopped');
  assert.equal((await runner.run('print(2)')).status, 'invalid_request');
});
