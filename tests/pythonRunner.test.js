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

const runtimeReady = () => ({ version: 1, type: 'runtime_ready', error: null });
const runtimeInitError = (error = 'Wasm initialization failed') => ({
  version: 1,
  type: 'runtime_init_error',
  error,
});

function validResult(request, output = '1\n', status = 'passed', error = null) {
  return {
    version: 1,
    runId: request.runId,
    capability: request.capability,
    status,
    output,
    error,
  };
}

function createHarness(options = {}) {
  const workers = [];
  let id = 0;
  const states = [];
  const runner = createPythonRunner({
    workerFactory: () => {
      const worker = new FakeWorker();
      workers.push(worker);
      return worker;
    },
    idFactory: () => `secure-${++id}`,
    timeoutMs: options.timeoutMs ?? 250,
    prepareTimeoutMs: options.prepareTimeoutMs ?? 1000,
    onStateChange: state => states.push(state),
  });
  return { runner, workers, states };
}

async function prepareHarness(harness) {
  const pending = harness.runner.prepare();
  harness.workers.at(-1).emit('message', runtimeReady());
  assert.deepEqual(await pending, { status: 'ready', error: null });
}

test('concurrent prepare calls share one worker and one promise', async () => {
  const harness = createHarness();
  const first = harness.runner.prepare();
  const second = harness.runner.prepare();

  assert.equal(first, second);
  assert.equal(harness.workers.length, 1);
  harness.workers[0].emit('message', runtimeReady());

  assert.deepEqual(await first, { status: 'ready', error: null });
  assert.equal(harness.runner.getState(), 'ready');
  assert.deepEqual(harness.states, ['preparing', 'ready']);
});

test('run waits for readiness and starts execution timeout afterwards', async () => {
  const harness = createHarness({ timeoutMs: 250, prepareTimeoutMs: 1000 });
  const pending = harness.runner.run('print(1)');

  assert.equal(harness.workers.length, 1);
  assert.equal(harness.workers[0].messages.length, 0);
  await new Promise(resolve => setTimeout(resolve, 300));
  harness.workers[0].emit('message', runtimeReady());
  await Promise.resolve();

  const request = harness.workers[0].messages[0];
  assert.ok(request);
  harness.workers[0].emit('message', validResult(request));
  assert.equal((await pending).status, 'passed');
});

test('warm sequential runs reuse one ready worker', async () => {
  const harness = createHarness();
  await prepareHarness(harness);

  const first = harness.runner.run('print(1)');
  const firstRequest = harness.workers[0].messages[0];
  harness.workers[0].emit('message', validResult(firstRequest, '1\n'));
  assert.deepEqual(await first, { status: 'passed', output: '1\n', error: null });

  const second = harness.runner.run('print(2)');
  const secondRequest = harness.workers[0].messages[1];
  harness.workers[0].emit('message', validResult(secondRequest, '2\n'));
  assert.deepEqual(await second, { status: 'passed', output: '2\n', error: null });

  assert.equal(harness.workers.length, 1);
  assert.equal(harness.workers[0].terminated, false);
  assert.equal(harness.runner.getState(), 'ready');
});

test('runner resolves only a result with matching run id and capability', async () => {
  const harness = createHarness();
  await prepareHarness(harness);
  const pending = harness.runner.run('print(1)');
  const request = harness.workers[0].messages[0];

  harness.workers[0].emit('message', {
    ...validResult(request, 'forged'),
    capability: 'forged',
  });
  harness.workers[0].emit('message', validResult(request));

  assert.deepEqual(await pending, { status: 'passed', output: '1\n', error: null });
  harness.runner.dispose();
});

test('runner rejects a second run while one is waiting or executing', async () => {
  const harness = createHarness();
  const first = harness.runner.run('print(1)');

  assert.equal((await harness.runner.run('print(2)')).status, 'invalid_request');
  harness.workers[0].emit('message', runtimeReady());
  await Promise.resolve();
  const request = harness.workers[0].messages[0];
  harness.workers[0].emit('message', validResult(request));
  assert.equal((await first).status, 'passed');
});

test('runner reports bounded initialization failure and can prepare a replacement', async () => {
  const harness = createHarness();
  const first = harness.runner.prepare();
  harness.workers[0].emit('message', runtimeInitError());

  assert.deepEqual(await first, {
    status: 'worker_crash',
    output: '',
    error: 'Wasm initialization failed',
  });
  assert.equal(harness.workers[0].terminated, true);
  assert.equal(harness.runner.getState(), 'failed');

  const second = harness.runner.prepare();
  assert.equal(harness.workers.length, 2);
  harness.workers[1].emit('message', runtimeReady());
  assert.equal((await second).status, 'ready');
});

test('runner reports preparation timeout separately and can prepare a replacement', async () => {
  const harness = createHarness({ prepareTimeoutMs: 1000 });
  const result = await harness.runner.prepare();

  assert.equal(result.status, 'prepare_timeout');
  assert.equal(harness.workers[0].terminated, true);

  const recovery = harness.runner.prepare();
  harness.workers[1].emit('message', runtimeReady());
  assert.equal((await recovery).status, 'ready');
});

test('runner terminates timed-out execution and can prepare a replacement', async () => {
  const harness = createHarness({ timeoutMs: 250 });
  await prepareHarness(harness);
  const result = await harness.runner.run('while True: pass');

  assert.equal(result.status, 'timeout');
  assert.equal(harness.workers[0].terminated, true);

  const recovery = harness.runner.prepare();
  assert.equal(harness.workers.length, 2);
  harness.workers[1].emit('message', runtimeReady());
  assert.equal((await recovery).status, 'ready');
});

test('stop cancels preparation or execution and leaves the runner recoverable', async () => {
  const preparingHarness = createHarness();
  const preparing = preparingHarness.runner.prepare();
  assert.equal(preparingHarness.runner.stop(), true);
  assert.equal((await preparing).status, 'stopped');
  assert.equal(preparingHarness.workers[0].terminated, true);

  const runningHarness = createHarness();
  await prepareHarness(runningHarness);
  const running = runningHarness.runner.run('print(1)');
  assert.equal(runningHarness.runner.stop(), true);
  assert.equal((await running).status, 'stopped');
  assert.equal(runningHarness.workers[0].terminated, true);
});

test('worker errors fail closed during preparation and execution', async () => {
  const preparingHarness = createHarness();
  const preparing = preparingHarness.runner.prepare();
  preparingHarness.workers[0].emit('error', new Error('boom'));
  assert.equal((await preparing).status, 'worker_crash');
  assert.equal(preparingHarness.workers[0].terminated, true);

  const runningHarness = createHarness();
  await prepareHarness(runningHarness);
  const running = runningHarness.runner.run('print(1)');
  runningHarness.workers[0].emit('error', new Error('boom'));
  assert.equal((await running).status, 'worker_crash');
  assert.equal(runningHarness.workers[0].terminated, true);
});

test('dispose stops current work and rejects future preparation or execution', async () => {
  const harness = createHarness();
  const preparing = harness.runner.prepare();
  harness.runner.dispose();

  assert.equal((await preparing).status, 'stopped');
  assert.equal((await harness.runner.prepare()).status, 'invalid_request');
  assert.equal((await harness.runner.run('print(2)')).status, 'invalid_request');
  assert.equal(harness.runner.getState(), 'disposed');
});
