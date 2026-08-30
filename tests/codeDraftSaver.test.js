import test from 'node:test';
import assert from 'node:assert/strict';
import { createCodeDraftSaver } from '../src/utils/codeDraftSaver.js';

function createFakeTimers() {
  let nextId = 0;
  const callbacks = new Map();
  return {
    schedule(callback) {
      const id = ++nextId;
      callbacks.set(id, callback);
      return id;
    },
    cancel(id) {
      callbacks.delete(id);
    },
    runAll() {
      const pending = [...callbacks.values()];
      callbacks.clear();
      pending.forEach(callback => callback());
    },
    size() {
      return callbacks.size;
    },
  };
}

test('draft saver debounces the latest code for one lesson', () => {
  const writes = [];
  const timers = createFakeTimers();
  const saver = createCodeDraftSaver({
    delayMs: 400,
    save: (lessonId, code) => writes.push([lessonId, code]),
    schedule: callback => timers.schedule(callback),
    cancelSchedule: id => timers.cancel(id),
  });

  saver.change('ch1_01', 'p');
  saver.change('ch1_01', 'print(1)');
  assert.equal(timers.size(), 1);
  assert.deepEqual(writes, []);

  timers.runAll();
  assert.deepEqual(writes, [['ch1_01', 'print(1)']]);
  assert.equal(saver.hasPending(), false);
});

test('flush saves immediately and cancels the scheduled duplicate', () => {
  const writes = [];
  const timers = createFakeTimers();
  const saver = createCodeDraftSaver({
    save: (lessonId, code) => writes.push([lessonId, code]),
    schedule: callback => timers.schedule(callback),
    cancelSchedule: id => timers.cancel(id),
  });

  saver.change('ch1_01', 'print(1)');
  assert.equal(saver.flush(), true);
  timers.runAll();

  assert.deepEqual(writes, [['ch1_01', 'print(1)']]);
  assert.equal(saver.flush(), true);
});

test('failed writes remain pending for retry without losing code', () => {
  const errors = [];
  let attempts = 0;
  const saver = createCodeDraftSaver({
    save: () => {
      attempts += 1;
      if (attempts === 1) throw new Error('quota');
    },
    onError: error => errors.push(error.message),
  });

  saver.change('ch1_01', 'print(1)');
  assert.equal(saver.flush(), false);
  assert.equal(saver.hasPending(), true);
  assert.deepEqual(errors, ['quota']);

  assert.equal(saver.flush(), true);
  assert.equal(saver.hasPending(), false);
  assert.equal(attempts, 2);
});

test('discard cancels a pending write and never saves cleared code later', () => {
  const writes = [];
  const timers = createFakeTimers();
  const saver = createCodeDraftSaver({
    save: (lessonId, code) => writes.push([lessonId, code]),
    schedule: callback => timers.schedule(callback),
    cancelSchedule: id => timers.cancel(id),
  });

  saver.change('ch1_01', 'do not restore');
  saver.discard();
  timers.runAll();

  assert.deepEqual(writes, []);
  assert.equal(saver.hasPending(), false);
});
