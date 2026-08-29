# Python Runtime Prewarm and Learning-State Safety Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep one real, isolated Pyodide runtime warm per lesson, preserve the learner's editor state and drafts, and make completion rewards safe and complete.

**Architecture:** Add a validated Worker readiness handshake and a reusable `PythonRunner` state machine whose initialization timeout is separate from execution timeout. Keep editor callbacks stable, move draft debouncing into a small tested controller, and wrap synchronous completion writes in a rollback helper before presenting success UI or a queued set of badges.

**Tech Stack:** React 18, CodeMirror 6, Pyodide 0.27.5/314.0.5 package build, Web Workers, browser storage adapters, Node test runner, Playwright Electron tests, Vite 6.

---

## File Map

- Modify `src/runtime/pythonProtocol.js`: validate Worker readiness and initialization-failure messages; define the initialization timeout limits.
- Modify `tests/pythonProtocol.test.js`: protect the new readiness protocol against extra fields, wrong versions, and unbounded errors.
- Modify `src/runtime/PythonRunner.js`: add `prepare()`, state reporting, Worker reuse, separate timers, and recoverable teardown.
- Modify `tests/pythonRunner.test.js`: exercise prewarm deduplication, warm reuse, stop/timeout recovery, and disposal.
- Modify `src/runtime/python.worker.js`: send readiness messages and reset the virtual workspace and streams before and after each execution.
- Modify `tests/pyodideAssets.test.js`: keep the Worker offline and require the readiness/reset contract in the bundled source.
- Modify `tests/curriculumRuntime.test.js`: verify real Pyodide state isolation for variables, files, working directory, streams, and exceptions.
- Create `src/utils/codeDraftSaver.js`: own one pending debounced draft and support retryable flush/discard.
- Create `tests/codeDraftSaver.test.js`: test debounce, lesson isolation, flush, discard, and failed writes.
- Modify `src/components/CodeEditor.jsx`: keep CodeMirror alive while callbacks change and emit document changes.
- Create `tests/codeEditorSourceContract.test.js`: prevent callback dependencies from recreating the editor.
- Modify `src/components/Lesson.jsx`: own the runner per lesson, display lifecycle status, wire autosave, preserve editor state, and queue badge modals.
- Modify `tests/lessonSourceContract.test.js`: require lesson-level prewarm/reuse, draft flush, recovery, and batch badge saving.
- Create `src/utils/learningStorageTransaction.js`: snapshot selected active-save keys and restore them after a synchronous write failure.
- Create `tests/learningStorageTransaction.test.js`: verify successful commits, rollback, and distinct rollback-failure reporting.
- Modify `src/utils/lessonResultView.js`: provide beginner-friendly preparation failure/timeout messages where needed.
- Modify `tests/uiVisual.e2e.mjs`: prove code and selection survive running, drafts restore, warm runs reuse the Worker, and badge dialogs queue.

## Task 1: Add a Strict Runtime Readiness Protocol

**Files:**
- Modify: `tests/pythonProtocol.test.js`
- Modify: `src/runtime/pythonProtocol.js`

- [ ] **Step 1: Write failing lifecycle-message tests**

Extend the protocol import and add exact-shape checks:

```js
import {
  LIMITS,
  validateRuntimeLifecycle,
  validateRunRequest,
  validateWorkerResult,
} from '../src/runtime/pythonProtocol.js';

test('runtime lifecycle accepts only bounded ready and initialization errors', () => {
  assert.equal(validateRuntimeLifecycle({
    version: 1,
    type: 'runtime_ready',
    error: null,
  }).ok, true);
  assert.equal(validateRuntimeLifecycle({
    version: 1,
    type: 'runtime_init_error',
    error: 'Wasm initialization failed',
  }).ok, true);
  assert.equal(validateRuntimeLifecycle({
    version: 2,
    type: 'runtime_ready',
    error: null,
  }).ok, false);
  assert.equal(validateRuntimeLifecycle({
    version: 1,
    type: 'runtime_ready',
    error: null,
    extra: true,
  }).ok, false);
  assert.equal(validateRuntimeLifecycle({
    version: 1,
    type: 'runtime_init_error',
    error: 'x'.repeat(LIMITS.output + 1),
  }).ok, false);
});
```

- [ ] **Step 2: Run the protocol test and confirm the new import fails**

Run: `node --test tests/pythonProtocol.test.js`

Expected: FAIL because `validateRuntimeLifecycle` is not exported.

- [ ] **Step 3: Implement the exact lifecycle validator and initialization limits**

Add these limits and validator without loosening existing run/result validation:

```js
export const LIMITS = Object.freeze({
  code: 50 * 1024,
  input: 16 * 1024,
  output: 64 * 1024,
  timeoutDefault: 5000,
  timeoutMin: 250,
  timeoutMax: 10000,
  prepareTimeoutDefault: 15000,
  prepareTimeoutMin: 1000,
  prepareTimeoutMax: 60000,
});

const LIFECYCLE_KEYS = Object.freeze(['error', 'type', 'version']);
const LIFECYCLE_TYPES = new Set(['runtime_ready', 'runtime_init_error']);

export function validateRuntimeLifecycle(value) {
  if (!hasExactKeys(value, LIFECYCLE_KEYS)) return invalid();
  if (value.version !== PROTOCOL_VERSION || !LIFECYCLE_TYPES.has(value.type)) return invalid();
  if (value.type === 'runtime_ready' && value.error !== null) return invalid();
  if (value.type === 'runtime_init_error') {
    if (typeof value.error !== 'string' || value.error.length < 1 || value.error.length > LIMITS.output) {
      return invalid();
    }
  }
  return { ok: true, value };
}
```

- [ ] **Step 4: Run protocol tests**

Run: `node --test tests/pythonProtocol.test.js`

Expected: all protocol tests PASS.

- [ ] **Step 5: Commit the protocol contract**

```bash
git add src/runtime/pythonProtocol.js tests/pythonProtocol.test.js
git commit -m "feat: validate Python runtime readiness"
```

## Task 2: Build the Reusable PythonRunner State Machine

**Files:**
- Modify: `tests/pythonRunner.test.js`
- Modify: `src/runtime/PythonRunner.js`

- [ ] **Step 1: Upgrade the fake Worker harness and write failing prewarm tests**

Make `createHarness()` pass `prepareTimeoutMs`, add enough secure IDs for repeated runs, and emit a readiness message explicitly:

```js
const runtimeReady = () => ({ version: 1, type: 'runtime_ready', error: null });

test('concurrent prepare calls share one worker and one promise', async () => {
  const { runner, workers } = createHarness();
  const first = runner.prepare();
  const second = runner.prepare();
  assert.equal(first, second);
  assert.equal(workers.length, 1);
  workers[0].emit('message', runtimeReady());
  assert.deepEqual(await first, { status: 'ready', error: null });
  assert.equal(runner.getState(), 'ready');
});

test('warm sequential runs reuse one ready worker', async () => {
  const { runner, workers } = createHarness();
  const preparing = runner.prepare();
  workers[0].emit('message', runtimeReady());
  await preparing;

  const first = runner.run('print(1)');
  const firstRequest = workers[0].messages[0];
  workers[0].emit('message', validResult(firstRequest, '1\n'));
  assert.equal((await first).status, 'passed');

  const second = runner.run('print(2)');
  const secondRequest = workers[0].messages[1];
  workers[0].emit('message', validResult(secondRequest, '2\n'));
  assert.equal((await second).status, 'passed');
  assert.equal(workers.length, 1);
  assert.equal(workers[0].terminated, false);
});

test('execution timeout starts after readiness rather than during preparation', async () => {
  const { runner, workers } = createHarness({ timeoutMs: 10, prepareTimeoutMs: 100 });
  const pending = runner.run('print(1)');
  await new Promise(resolve => setTimeout(resolve, 20));
  workers[0].emit('message', runtimeReady());
  const request = workers[0].messages[0];
  workers[0].emit('message', validResult(request, '1\n'));
  assert.equal((await pending).status, 'passed');
});

test('a timed-out worker can be replaced and prepared again', async () => {
  const { runner, workers } = createHarness({ timeoutMs: 10 });
  const firstPrepare = runner.prepare();
  workers[0].emit('message', runtimeReady());
  await firstPrepare;
  assert.equal((await runner.run('while True: pass')).status, 'timeout');
  const recovery = runner.prepare();
  assert.equal(workers.length, 2);
  workers[1].emit('message', runtimeReady());
  assert.equal((await recovery).status, 'ready');
});
```

Keep the existing forged capability, stop, crash, and dispose tests, but emit `runtimeReady()` before expecting a run request.

- [ ] **Step 2: Run runner tests and confirm missing APIs/handshake failures**

Run: `node --test tests/pythonRunner.test.js`

Expected: FAIL because `prepare()` and `getState()` are missing and the old runner starts its execution timer immediately.

- [ ] **Step 3: Implement the runner state machine**

Replace implicit Worker startup with these public semantics:

```js
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

  const prepare = () => {
    if (disposed) return Promise.resolve(result('invalid_request', 'Python runner is unavailable'));
    if (state === 'ready' && worker) return Promise.resolve({ status: 'ready', error: null });
    if (preparation) return preparation.promise;
    setState('preparing');
    let resolvePreparation;
    const promise = new Promise(resolve => { resolvePreparation = resolve; });
    const timer = setTimeout(() => {
      settlePreparation(result('prepare_timeout', 'Python environment preparation timed out'), true);
    }, initializationTimeout);
    preparation = { promise, resolve: resolvePreparation, timer };
    try {
      ensureWorker();
    } catch {
      settlePreparation(result('worker_crash', 'Python worker could not start'), true);
    }
    return promise;
  };

  const run = async (code, input = '') => {
    if (disposed || active || runPending) {
      return result('invalid_request', 'Python runner is unavailable');
    }
    runPending = true;
    const ready = await prepare();
    if (ready.status !== 'ready') {
      runPending = false;
      return ready;
    }
    const request = createValidatedRequest(code, input);
    if (!request.ok) {
      runPending = false;
      return request.result;
    }
    return new Promise(resolve => {
      const timer = setTimeout(() => {
        settleActive(result('timeout', 'Execution timed out'), true);
      }, executionTimeout);
      active = { ...request.value, resolve, timer };
      runPending = false;
      setState('running');
      worker.postMessage(request.value.message);
    });
  };

  return { prepare, run, stop, dispose, getState: () => state };
}
```

Implement the referenced private helpers in the same file with these exact responsibilities:

- `clamp(value, min, max)` bounds both timers.
- `ensureWorker()` creates one Worker and installs message/error listeners.
- `settlePreparation(value, terminate)` clears only the initialization timer, resolves one shared preparation Promise, and sets `ready`, `failed`, or `idle` state.
- `settleActive(value, terminate)` clears only the execution timer, resolves one run, and returns to `ready` when the Worker remains healthy.
- `handleMessage(event)` validates lifecycle messages before resolving preparation and validates run results against run ID/capability before resolving execution.
- `handleError()` reports initialization failure when preparing, reports `worker_crash` when running, and destroys an idle crashed Worker.
- `destroyWorker()` removes listeners, terminates only the current Worker, and leaves the non-disposed runner recoverable.
- `stop()` resolves preparation or execution as `stopped`, terminates the Worker, and returns whether work was cancelled.
- `dispose()` calls the same cancellation path, marks `disposed`, and prevents rebuilding.

Add `prepare_timeout` to the runner status vocabulary so it reaches beginner feedback without being confused with execution timeout. Never accept unvalidated readiness, result, run ID, or capability data.

- [ ] **Step 4: Run protocol and runner tests**

Run: `node --test tests/pythonProtocol.test.js tests/pythonRunner.test.js`

Expected: all tests PASS with one Worker for warm sequential runs.

- [ ] **Step 5: Commit the reusable runner**

```bash
git add src/runtime/PythonRunner.js src/runtime/pythonProtocol.js tests/pythonRunner.test.js
git commit -m "feat: reuse a prepared Python runner"
```

## Task 3: Make Worker Readiness and Execution Cleanup Explicit

**Files:**
- Modify: `src/runtime/python.worker.js`
- Modify: `tests/pyodideAssets.test.js`
- Modify: `tests/curriculumRuntime.test.js`

- [ ] **Step 1: Write failing Worker source and real-runtime isolation tests**

Require a validated lifecycle post and cleanup in `tests/pyodideAssets.test.js`:

```js
test('worker announces readiness and resets the learning workspace in finally', () => {
  const source = read('src/runtime/python.worker.js');
  assert.match(source, /type:\s*'runtime_ready'/);
  assert.match(source, /type:\s*'runtime_init_error'/);
  assert.match(source, /pyodideReady\.then/);
  assert.match(source, /finally\s*\{[\s\S]*resetExecutionEnvironment\(pyodide\)/);
  assert.match(source, /FS\.chdir\(root\)/);
});
```

Extend the existing real Pyodide audit helper so two executions share one Pyodide instance but receive fresh globals. Add one test that first creates a variable, changes directory, creates a file, writes output, and raises; the second run must report no variable, `/home/pyodide` as the working directory, no player file, and only its own output.

- [ ] **Step 2: Run isolation tests and confirm readiness/finally checks fail**

Run: `node --test tests/pyodideAssets.test.js tests/curriculumRuntime.test.js`

Expected: the new source contract fails because no readiness message or `finally` cleanup exists.

- [ ] **Step 3: Implement initialization lifecycle messages**

Attach one bounded settlement to `pyodideReady`:

```js
pyodideReady.then(
  () => self.postMessage({
    version: PROTOCOL_VERSION,
    type: 'runtime_ready',
    error: null,
  }),
  error => self.postMessage({
    version: PROTOCOL_VERSION,
    type: 'runtime_init_error',
    error: boundedMessage(error),
  }),
);
```

- [ ] **Step 4: Reset the virtual learning environment before and after execution**

Replace `clearWorkspace()` with a reset that always restores the root first:

```js
function resetExecutionEnvironment(pyodide) {
  const root = '/home/pyodide';
  try { pyodide.FS.mkdirTree(root); } catch {}
  pyodide.FS.chdir(root);
  for (const name of pyodide.FS.readdir(root)) {
    if (name === '.' || name === '..') continue;
    removeTree(pyodide.FS, `${root}/${name}`);
  }
  pyodide.setStdin({ stdin: () => null, autoEOF: true });
  pyodide.setStdout({ batched: () => {} });
  pyodide.setStderr({ batched: () => {} });
}
```

Declare `let pyodide` outside the request `try`, assign it after awaiting `pyodideReady`, and call the reset before configuring request streams. In `finally`, destroy globals first and call `resetExecutionEnvironment(pyodide)` whenever initialization completed, even after Python throws. Keep the existing fresh `dict()` and output limit.

- [ ] **Step 5: Run real-runtime tests**

Run: `node --test tests/pyodideAssets.test.js tests/curriculumRuntime.test.js`

Expected: all tests PASS and no network access is introduced.

- [ ] **Step 6: Commit Worker lifecycle and isolation**

```bash
git add src/runtime/python.worker.js tests/pyodideAssets.test.js tests/curriculumRuntime.test.js
git commit -m "fix: reset warm Python executions"
```

## Task 4: Keep CodeMirror Stable and Autosave Drafts

**Files:**
- Create: `src/utils/codeDraftSaver.js`
- Create: `tests/codeDraftSaver.test.js`
- Modify: `src/components/CodeEditor.jsx`
- Create: `tests/codeEditorSourceContract.test.js`

- [ ] **Step 1: Write failing draft-controller tests**

Use injected timers so tests are deterministic:

```js
test('draft saver debounces the latest code and flushes on navigation', () => {
  const writes = [];
  const timers = createFakeTimers();
  const saver = createCodeDraftSaver({
    delayMs: 400,
    save: (lessonId, code) => writes.push([lessonId, code]),
    schedule: timers.schedule,
    cancelSchedule: timers.cancel,
  });
  saver.change('ch1_01', 'p');
  saver.change('ch1_01', 'print(1)');
  assert.deepEqual(writes, []);
  assert.equal(saver.flush(), true);
  assert.deepEqual(writes, [['ch1_01', 'print(1)']]);
});

test('failed writes remain pending for retry and discard never writes', () => {
  let attempts = 0;
  const saver = createCodeDraftSaver({
    save: () => { attempts += 1; if (attempts === 1) throw new Error('quota'); },
  });
  saver.change('ch1_01', 'print(1)');
  assert.equal(saver.flush(), false);
  assert.equal(saver.flush(), true);
  saver.change('ch1_01', 'discard me');
  saver.discard();
  assert.equal(saver.flush(), true);
  assert.equal(attempts, 2);
});
```

- [ ] **Step 2: Run draft tests and confirm the module is missing**

Run: `node --test tests/codeDraftSaver.test.js`

Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement the focused draft controller**

```js
export function createCodeDraftSaver({
  save,
  onError = () => {},
  delayMs = 400,
  schedule = setTimeout,
  cancelSchedule = clearTimeout,
}) {
  let pending = null;
  let timer = null;

  const clearTimer = () => {
    if (timer !== null) cancelSchedule(timer);
    timer = null;
  };
  const flush = () => {
    clearTimer();
    if (!pending) return true;
    try {
      save(pending.lessonId, pending.code);
      pending = null;
      return true;
    } catch (error) {
      onError(error);
      return false;
    }
  };
  const change = (lessonId, code) => {
    pending = { lessonId, code };
    clearTimer();
    timer = schedule(flush, delayMs);
  };
  const discard = () => {
    clearTimer();
    pending = null;
  };
  return { change, flush, discard, hasPending: () => pending !== null };
}
```

- [ ] **Step 4: Write and run a failing CodeEditor source contract**

Require `onRunRef`, `onChangeRef`, and `EditorView.updateListener`, and reject `onRun`/`onChange` in the setup dependency list.

Run: `node --test tests/codeEditorSourceContract.test.js`

Expected: FAIL because the current setup callback depends on `onRun` and recreates CodeMirror.

- [ ] **Step 5: Stabilize CodeEditor callbacks and emit document changes**

Change the component signature to `{ initialCode = '', onRun, onChange }`. Store both callbacks in refs updated on every render. The keymap invokes `onRunRef.current?.()` and the update listener invokes `onChangeRef.current?.(update.state.doc.toString())` only for `update.docChanged`. The editor setup callback depends only on `initialCode`; the parent will provide a lesson key when a new editor is intentionally required.

```js
const onRunRef = useRef(onRun);
const onChangeRef = useRef(onChange);
onRunRef.current = onRun;
onChangeRef.current = onChange;

const notifyChanges = EditorView.updateListener.of(update => {
  if (update.docChanged) onChangeRef.current?.(update.state.doc.toString());
});
```

- [ ] **Step 6: Run draft and editor contract tests**

Run: `node --test tests/codeDraftSaver.test.js tests/codeEditorSourceContract.test.js`

Expected: all tests PASS.

- [ ] **Step 7: Commit stable editing and drafts**

```bash
git add src/utils/codeDraftSaver.js src/components/CodeEditor.jsx tests/codeDraftSaver.test.js tests/codeEditorSourceContract.test.js
git commit -m "fix: preserve editor state and draft changes"
```

## Task 5: Integrate Lesson-Level Prewarm, Recovery, and Draft Saving

**Files:**
- Modify: `src/components/Lesson.jsx`
- Modify: `src/utils/lessonResultView.js`
- Modify: `tests/lessonSourceContract.test.js`

- [ ] **Step 1: Write failing Lesson source contracts**

Require one runner created during validated lesson initialization, explicit `prepare()`, no `createPythonRunner()` inside `handleRun`, state-based button labels, a keyed editor, `onChange`, draft `flush()` on navigation/unmount, and draft `discard()` before clear on successful completion.

```js
test('Lesson prewarms one runner per lesson and does not cold-start in handleRun', () => {
  assert.match(lessonSource, /runnerRef\.current = createPythonRunner/);
  assert.match(lessonSource, /runnerRef\.current\.prepare\(\)/);
  const handleRun = lessonSource.match(/const handleRun[\s\S]*?const onLessonComplete/)?.[0] || '';
  assert.doesNotMatch(handleRun, /createPythonRunner\(\)/);
});

test('Lesson autosaves normal drafts and preserves a stable editor per lesson', () => {
  assert.match(lessonSource, /createCodeDraftSaver/);
  assert.match(lessonSource, /draftSaverRef\.current\?\.flush\(\)/);
  assert.match(lessonSource, /<CodeEditor[\s\S]*key=\{editorKey\}/);
  assert.match(lessonSource, /onChange=\{handleCodeChange\}/);
});
```

- [ ] **Step 2: Run Lesson contract tests and confirm they fail**

Run: `node --test tests/lessonSourceContract.test.js`

Expected: FAIL because runner creation still happens inside every run and draft saving is not wired.

- [ ] **Step 3: Create and prewarm the runner after lesson validation**

Add `runtimeState` and `runtimeError` state. After setting the validated lesson, dispose the old runner, create one runner with `onStateChange: setRuntimeState`, assign it to `runnerRef`, and call `prepare()`. Guard the Promise with the existing lesson/run generation so a stale result cannot alter the next lesson. On rejected readiness, store a localized environment message without clearing code.

- [ ] **Step 4: Reuse the runner in `handleRun` and recover after fatal states**

Read `runnerRef.current` instead of creating a runner. Await `runner.prepare()` before `judgeLesson`; if readiness is not `ready`, build a failed result with `prepare_timeout`, `worker_crash`, or `stopped`. Do not dispose in `finally`. After `timeout`, `worker_crash`, or `stopped`, call a guarded `prepareRunner()` that rebuilds the terminated Worker in the same runner. Keep `runGuardRef` as the authority preventing stale UI results.

- [ ] **Step 5: Wire draft saving without overwriting review drafts**

Create one `codeDraftSaver` with `STORAGE.saveCode.bind(STORAGE)` and an `onError` callback that shows one localized “草稿保存失败，代码仍保留在编辑器中” toast per pending failure. `handleCodeChange` sends changes only when `!pageData?.reviewMode`. Flush before switching lesson and during unmount. Derive `editorKey` from lesson ID and mode, pass the restored draft as `initialCode`, and remove the delayed imperative `setCode()` initialization. On successful completion call `draftSaver.discard()` before `STORAGE.clearCode()` so a pending timer cannot restore cleared code.

- [ ] **Step 6: Render preparation/recovery/failure states in the existing editor footer**

Keep one button in the black editor footer. Map states exactly:

```js
const runtimeAction = {
  preparing: lang === 'zh' ? '正在准备 Python…' : 'Preparing Python…',
  recovering: lang === 'zh' ? '正在恢复…' : 'Recovering…',
  failed: lang === 'zh' ? '重新准备' : 'Prepare again',
};
```

During a pending run the same control remains a stop action. A failed idle runtime calls `prepareRunner`; ready idle state calls `handleRun`. Add the `prepare_timeout` beginner text to `lessonResultView.js`, distinct from execution `timeout`.

- [ ] **Step 7: Run targeted integration contracts**

Run: `node --test tests/lessonSourceContract.test.js tests/lessonResultView.test.js tests/lessonRunGuard.test.js tests/codeDraftSaver.test.js tests/codeEditorSourceContract.test.js`

Expected: all tests PASS.

- [ ] **Step 8: Commit lesson-level runtime and autosave integration**

```bash
git add src/components/Lesson.jsx src/utils/lessonResultView.js tests/lessonSourceContract.test.js tests/lessonResultView.test.js
git commit -m "feat: prewarm Python for each lesson"
```

## Task 6: Roll Back Failed Completion Writes and Queue Every Badge

**Files:**
- Create: `src/utils/learningStorageTransaction.js`
- Create: `tests/learningStorageTransaction.test.js`
- Modify: `src/components/Lesson.jsx`
- Modify: `tests/lessonSourceContract.test.js`

- [ ] **Step 1: Write failing transaction tests**

Inject a memory storage adapter and cover both failure paths:

```js
test('transaction restores every selected key after a write failure', () => {
  const storage = failOnce(createMemoryStorage({ a: 'old-a', b: 'old-b' }), 'b');
  assert.throws(() => runLearningStorageTransaction({ storage, keys: ['a', 'b'] }, () => {
    storage.setItem('a', 'new-a');
    storage.setItem('b', 'new-b');
  }), /write failed/);
  assert.deepEqual(storage.dump(), { a: 'old-a', b: 'old-b' });
});

test('transaction reports both the write and rollback errors', () => {
  assert.throws(
    () => runLearningStorageTransaction({ storage: failWriteAndRollback(), keys: ['a'] }, () => {
      throw new Error('completion failed');
    }),
    error => error.name === 'LearningStorageRollbackError'
      && /completion failed/.test(error.cause?.message || '')
      && /rollback failed/.test(error.rollbackError?.message || ''),
  );
});
```

- [ ] **Step 2: Run the transaction tests and confirm the module is missing**

Run: `node --test tests/learningStorageTransaction.test.js`

Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement synchronous selected-key rollback**

```js
import { getActivePlayerStorage } from '../data/playerSaveRepository.js';

export function runLearningStorageTransaction({
  keys,
  storage = getActivePlayerStorage(),
}, action) {
  const uniqueKeys = [...new Set(keys.map(String))];
  const before = new Map(uniqueKeys.map(key => [key, storage.getItem(key)]));
  try {
    return action();
  } catch (error) {
    try {
      for (const [key, value] of before) {
        if (value === null) storage.removeItem(key);
        else storage.setItem(key, value);
      }
    } catch (rollbackError) {
      const combined = new Error(`Learning save failed and rollback failed: ${rollbackError.message}`, { cause: error });
      combined.name = 'LearningStorageRollbackError';
      combined.rollbackError = rollbackError;
      throw combined;
    }
    throw error;
  }
}
```

Reject an empty/non-array key list and a non-function action before capturing data.

- [ ] **Step 4: Refactor normal lesson completion into one rollback boundary**

In `onLessonComplete`, wrap progress, streak/daily updates, perfect status, review initialization, and batch badge saving with keys:

```js
const completionKeys = [
  STORAGE.KEYS.PROGRESS,
  STORAGE.KEYS.STREAK,
  STORAGE.KEYS.DAILY_COUNT,
  STORAGE.KEYS.DAILY_DATE,
  STORAGE.KEYS.PERFECT,
  STORAGE.KEYS.REVIEW,
  STORAGE.KEYS.BADGES,
];
```

Inside the action, call existing storage methods, compute post-completion stats, call `checkNewBadges`, merge IDs with `new Set`, and call `saveBadges()` once. Catch failure before `setCompleted`, confetti, toast, draft clearing, and navigation are triggered. On failure show a localized “保存失败，代码仍然保留，请重试” message.

- [ ] **Step 5: Replace single badge state with a display queue**

```js
const [badgeQueue, setBadgeQueue] = useState([]);
const currentBadge = badgeQueue[0] || null;
const enqueueBadges = badges => {
  if (badges.length) setBadgeQueue(queue => [...queue, ...badges]);
};
const closeCurrentBadge = () => setBadgeQueue(queue => queue.slice(1));
```

Use one batch `saveBadges([...new Set([...oldBadges, ...newBadges.map(badge => badge.id)])])` for both normal completion and review completion. Pass `closeCurrentBadge` to `BadgeModal`. Confetti timing stays independent.

- [ ] **Step 6: Add source contracts for one batch save and queued presentation**

Reject `newBadges.forEach(...saveBadges...)`, require `runLearningStorageTransaction`, require `new Set`, and require `badgeQueue.slice(1)`.

- [ ] **Step 7: Run transaction and Lesson tests**

Run: `node --test tests/learningStorageTransaction.test.js tests/lessonSourceContract.test.js tests/gamification.test.js tests/storageMigration.test.js tests/storageSaveBoundary.test.js`

Expected: all tests PASS, including the user's existing storage-boundary changes.

- [ ] **Step 8: Commit transaction-safe completion**

```bash
git add src/utils/learningStorageTransaction.js src/components/Lesson.jsx tests/learningStorageTransaction.test.js tests/lessonSourceContract.test.js
git commit -m "fix: preserve complete lesson rewards"
```

## Task 7: Browser Regression, Performance Evidence, and Full Verification

**Files:**
- Modify: `tests/uiVisual.e2e.mjs`
- Modify: `tests/lessonUiContract.test.js` only if a state label requires a style contract; do not redesign the approved layout.

- [ ] **Step 1: Extend the Electron UI test before final implementation claims**

In the first unlocked lesson:

1. Wait until the runtime button leaves “正在准备 Python”.
2. Fill a unique multi-line draft and place the selection inside the second line.
3. Record `.cm-editor` identity through a temporary DOM property, run wrong code once, and assert the property, full document, selection text, and editor scroll position remain.
4. Run correct code twice and measure both clicks to visible result. Assert the second run never returns to “正在准备 Python”; rely on the deterministic runner unit test for the exact one-Worker count, and do not set a flaky absolute millisecond threshold in the browser test.
5. Navigate away before the 400 ms debounce once and verify the flushed draft restores on return.
6. Seed progress so one completion unlocks at least two badges, complete it, close the first modal, and assert the second modal describes a different badge.
7. Confirm confetti and the next button remain available while the badge queue is active.

- [ ] **Step 2: Run the production UI flow**

Run: `npm run test:ui`

Expected: build succeeds and all Electron UI tests PASS. Record first-run and warm-run timings from the test output for the final report.

- [ ] **Step 3: Run the complete automated suite**

Run: `npm test`

Expected: all Node tests PASS.

Run: `npm run validate:curriculum`

Expected: curriculum validation PASS with no answer/test regressions.

Run: `npm run build`

Expected: Vite production build succeeds and keeps the local Pyodide Worker/assets.

Run: `npm run test:e2e`

Expected: Electron security tests PASS and the Worker remains unable to access host APIs.

- [ ] **Step 4: Review the final diff for unrelated user changes**

Run: `git status --short` and `git diff --check`.

Expected: no whitespace errors; only files listed in this plan are part of the feature commits. Existing unrelated worktree modifications remain uncommitted and unchanged.

- [ ] **Step 5: Commit the browser regression coverage**

```bash
git add tests/uiVisual.e2e.mjs tests/lessonUiContract.test.js
git commit -m "test: verify warm lesson execution"
```

- [ ] **Step 6: Request final code review and verify again**

Use the requesting-code-review checklist against the design, inspect every reported issue, then rerun the smallest affected test plus `npm test` and `npm run build` before declaring completion.

## Final Acceptance Checklist

- [ ] A lesson creates and prepares one Python Worker before the first run.
- [ ] Warm runs reuse that Worker and execution timeout starts only after readiness.
- [ ] Stop, timeout, initialization failure, and crash remain recoverable without refreshing.
- [ ] Every run receives fresh globals, streams, working directory, and player files.
- [ ] CodeMirror is not recreated by run-state changes; code, selection, and scroll survive.
- [ ] Normal lesson drafts debounce, flush on navigation, restore per lesson, and remain after save failure.
- [ ] Completion storage rolls back selected keys on failure and does not show false success.
- [ ] All newly earned badges save once and display one by one.
- [ ] Confetti and navigation remain responsive.
- [ ] Unit, curriculum, build, security, and production UI tests pass.
