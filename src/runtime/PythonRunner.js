import {
  LIMITS,
  PROTOCOL_VERSION,
  validateRunRequest,
  validateWorkerResult,
} from './pythonProtocol.js';

function defaultIdFactory() {
  if (!globalThis.crypto?.randomUUID) {
    throw new Error('Secure random IDs are unavailable');
  }
  return globalThis.crypto.randomUUID();
}

function result(status, error = null, output = '') {
  return { status, output, error };
}

function createDefaultWorker() {
  if (globalThis.__XMCODE_WORKER_URL__) {
    return new Worker(globalThis.__XMCODE_WORKER_URL__, { type: 'module' });
  }
  return new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' });
}

export function createPythonRunner({
  workerFactory = createDefaultWorker,
  idFactory = defaultIdFactory,
  timeoutMs = LIMITS.timeoutDefault,
} = {}) {
  const boundedTimeout = Math.min(LIMITS.timeoutMax, Math.max(LIMITS.timeoutMin, timeoutMs));
  let worker = null;
  let active = null;
  let disposed = false;

  const destroyWorker = () => {
    if (!worker) return;
    worker.removeEventListener('message', handleMessage);
    worker.removeEventListener('error', handleError);
    worker.terminate();
    worker = null;
  };

  const settleActive = (value, terminateWorker = false) => {
    if (!active) return false;
    const current = active;
    active = null;
    clearTimeout(current.timer);
    if (terminateWorker) destroyWorker();
    current.resolve(value);
    return true;
  };

  function handleMessage(event) {
    if (!active) return;
    const validated = validateWorkerResult(event.data, active.runId, active.capability);
    if (!validated.ok) return;
    const value = validated.value;
    settleActive(result(value.status, value.error, value.output));
  }

  function handleError() {
    settleActive(result('worker_crash', 'Python worker crashed'), true);
  }

  const ensureWorker = () => {
    if (worker) return worker;
    worker = workerFactory();
    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);
    return worker;
  };

  const run = (code, input = '') => {
    if (disposed || active) {
      return Promise.resolve(result('invalid_request', 'Python runner is unavailable'));
    }

    let runId;
    let capability;
    try {
      runId = idFactory();
      capability = idFactory();
    } catch {
      return Promise.resolve(result('worker_crash', 'Secure execution IDs are unavailable'));
    }

    const request = {
      version: PROTOCOL_VERSION,
      runId,
      capability,
      code,
      input,
    };
    if (!validateRunRequest(request).ok) {
      return Promise.resolve(result('invalid_request', 'Code or input exceeds the safe limit'));
    }

    return new Promise(resolve => {
      let currentWorker;
      try {
        currentWorker = ensureWorker();
      } catch {
        resolve(result('worker_crash', 'Python worker could not start'));
        return;
      }

      const timer = setTimeout(() => {
        settleActive(result('timeout', 'Execution timed out'), true);
      }, boundedTimeout);
      active = { runId, capability, resolve, timer };
      currentWorker.postMessage(request);
    });
  };

  const stop = () => settleActive(result('stopped', 'Execution stopped'), true);

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (!stop()) destroyWorker();
  };

  return { run, stop, dispose };
}
