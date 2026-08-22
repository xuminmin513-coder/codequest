import test from 'node:test';
import assert from 'node:assert/strict';
import { createLessonRunGuard } from '../src/utils/lessonRunGuard.js';

test('run guard allows only one active token and releases the current run', () => {
  const guard = createLessonRunGuard();
  const first = guard.begin();

  assert.ok(first);
  assert.equal(guard.begin(), null);
  assert.equal(guard.isCurrent(first), true);
  assert.equal(guard.finish(first), true);

  const second = guard.begin();
  assert.ok(second);
  assert.notEqual(second, first);
  assert.equal(guard.isCurrent(first), false);
  assert.equal(guard.isCurrent(second), true);
});

test('invalidating makes a token stale and stale finish cannot clear a newer run', () => {
  const guard = createLessonRunGuard();
  const stale = guard.begin();

  guard.invalidate();
  assert.equal(guard.isCurrent(stale), false);

  const current = guard.begin();
  assert.ok(current);
  assert.equal(guard.finish(stale), false);
  assert.equal(guard.isCurrent(current), true);
  assert.equal(guard.begin(), null);
  assert.equal(guard.finish(current), true);
  assert.ok(guard.begin());
});
