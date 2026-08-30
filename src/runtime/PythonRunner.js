import {
  LIMITS,
  PROTOCOL_VERSION,
  validateRuntimeLifecycle,
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

function readyResult() {
  return { status: 'ready', error: null };
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
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
  prepareTimeoutMs = LIMITS.prepareTimeoutDefault,
  onStateChange = () => {},
} = {}) {
  const executionTimeout = clamp(timeoutMs, LIMITS.timeoutMin, LIMITS.timeoutMax);
  const initializationTimeout = clamp(
    prepareTimeoutMs,
    LIMITS.prepareTimeoutMin,
    LIMITS.prepareTimeoutMax,
  );
  let state = 'idle';
  let worker = null;
  let preparation = null;
  let active = null;
  let runPending = false;
  let disposed = false;

  const setState = next => {
    if (state === next) return;
    state = next;
    onStateChange(next);
  };

  const destroyWorker = () => {
    if (!worker) return;
    worker.removeEventListener('message', handleMessage);
    worker.removeEventListener('error', handleError);
    worker.terminate();
    worker = null;
  };

  const settlePreparation = (value, terminateWorker = false) => {
    if (!preparation) return false;
    const current = preparation;
    preparation = null;
    clearTimeout(current.timer);
    if (terminateWorker) destroyWorker();
    if (disposed) setState('disposed');
    else if (value.status === 'ready') setState('ready');
    else if (value.status === 'stopped') setState('idle');
    else setState('failed');
    current.resolve(value);
    return true;
  };

  const settleActive = (value, terminateWorker = false) => {
    if (!active) return false;
    const current = active;
    active = null;
    runPending = false;
    clearTimeout(current.timer);
    if (terminateWorker) destroyWorker();
    if (disposed) setState('disposed');
    else if (worker) setState('ready');
    else if (value.status === 'worker_crash') setState('failed');
    else setState('idle');
    current.resolve(value);
    return true;
  };

  function handleMessage(event) {
    const lifecycle = validateRuntimeLifecycle(event.data);
    if (lifecycle.ok) {
      if (!preparation) return;
      if (lifecycle.value.type === 'runtime_ready') {
        settlePreparation(readyResult());
      } else {
        settlePreparation(result('worker_crash', lifecycle.value.error), true);
      }
      return;
    }

    if (!active) return;
    const validated = validateWorkerResult(event.data, active.runId, active.capability);
    if (!validated.ok) return;
    const value = validated.value;
    settleActive(
      result(value.status, value.error, value.output),
      value.status === 'worker_crash',
    );
  }

  function handleError() {
    if (preparation) {
      settlePreparation(result('worker_crash', 'Python worker crashed'), true);
      return;
    }
    if (active) {
      settleActive(result('worker_crash', 'Python worker crashed'), true);
      return;
    }
    destroyWorker();
    if (!disposed) setState('failed');
  }

  const ensureWorker = () => {
    if (worker) return worker;
    worker = workerFactory();
    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);
    return worker;
  };

  const prepare = () => {
    if (disposed) {
      return Promise.resolve(result('invalid_request', 'Python runner is unavailable'));
    }
    if (worker && state === 'ready') return Promise.resolve(readyResult());
    if (preparation) return preparation.promise;
    if (worker) destroyWorker();

    let resolvePreparation;
    const promise = new Promise(resolve => { resolvePreparation = resolve; });
    preparation = { promise, resolve: resolvePreparation, timer: null };
    setState('preparing');
    preparation.timer = setTimeout(() => {
      settlePreparation(
        result('prepare_timeout', 'Python environment preparation timed out'),
        true,
      );
    }, initializationTimeout);

    try {
      ensureWorker();
    } catch {
      settlePreparation(result('worker_crash', 'Python worker could not start'), true);
    }
    return promise;
  };

  const createRequest = (code, input) => {
    let runId;
    let capability;
    try {
      runId = idFactory();
      capability = idFactory();
    } catch {
      return { ok: false, value: result('worker_crash', 'Secure execution IDs are unavailable') };
    }
    const message = {
      version: PROTOCOL_VERSION,
      runId,
      capability,
      code,
      input,
    };
    if (!validateRunRequest(message).ok) {
      return { ok: false, value: result('invalid_request', 'Code or input exceeds the safe limit') };
    }
    return { ok: true, value: { message, runId, capability } };
  };

  const beginExecution = (code, input) => {
    if (disposed || !worker || state !== 'ready') {
      runPending = false;
      return Promise.resolve(result('invalid_request', 'Python runner is unavailable'));
    }
    const request = createRequest(code, input);
    if (!request.ok) {
      runPending = false;
      return Promise.resolve(request.value);
    }

    return new Promise(resolve => {
      const timer = setTimeout(() => {
        settleActive(result('timeout', 'Execution timed out'), true);
      }, executionTimeout);
      active = {
        runId: request.value.runId,
        capability: request.value.capability,
        resolve,
        timer,
      };
      runPending = false;
      setState('running');
      try {
        worker.postMessage(request.value.message);
      } catch {
        settleActive(result('worker_crash', 'Python worker could not receive code'), true);
      }
    });
  };

  const run = (code, input = '') => {
    if (disposed || active || runPending) {
      return Promise.resolve(result('invalid_request', 'Python runner is unavailable'));
    }
    runPending = true;
    if (worker && state === 'ready') return beginExecution(code, input);
    return prepare().then(prepared => {
      if (prepared.status !== 'ready') {
        runPending = false;
        return prepared;
      }
      return beginExecution(code, input);
    });
  };

  const stop = () => {
    runPending = false;
    if (preparation) return settlePreparation(result('stopped', 'Execution stopped'), true);
    return settleActive(result('stopped', 'Execution stopped'), true);
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    runPending = false;
    if (preparation) settlePreparation(result('stopped', 'Execution stopped'), true);
    else if (active) settleActive(result('stopped', 'Execution stopped'), true);
    else destroyWorker();
    setState('disposed');
  };

  return { prepare, run, stop, dispose, getState: () => state };
}
