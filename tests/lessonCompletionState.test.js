import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import {
  COMPLETION_RECEIPTS_KEY,
  COMPLETION_RECEIPTS_VERSION_KEY,
  DAILY_COMPLETION_EVENTS_KEY,
  ensureLessonProgress,
  hasLessonCompletionReceipt,
  initializeLessonCompletionReceipts,
  markLessonCompletionReceipt,
  recordDailyLessonCompletionOnce,
} from '../src/utils/lessonCompletionState.js';

const PROGRESS_KEY = 'codedex_progress';
const DAILY_COUNT_KEY = 'codedex_daily_count';
const DAILY_DATE_KEY = 'codedex_daily_date';

test('legacy progress is receipted once without counting it again today', () => {
  const progress = {
    chapter_1: {
      chapter_1_lesson_1: { done: true, xp: 20, firstTry: true },
    },
  };
  const storage = createMemoryStorage({
    [PROGRESS_KEY]: JSON.stringify(progress),
    [DAILY_COUNT_KEY]: '4',
    [DAILY_DATE_KEY]: new Date(1000).toDateString(),
  });

  initializeLessonCompletionReceipts(progress, storage);
  initializeLessonCompletionReceipts(progress, storage);

  assert.equal(hasLessonCompletionReceipt('chapter_1', 'chapter_1_lesson_1', storage), true);
  assert.equal(storage.getItem(DAILY_COUNT_KEY), '4');
  assert.equal(storage.getItem(COMPLETION_RECEIPTS_VERSION_KEY), '1');
});

test('partial completion retries fill missing state without duplicating progress or daily count', () => {
  const now = new Date(2026, 7, 30, 10).getTime();
  const today = new Date(now).toDateString();
  const storage = createMemoryStorage({
    [COMPLETION_RECEIPTS_VERSION_KEY]: '1',
  });

  const first = ensureLessonProgress({
    chapterId: 'chapter_1',
    lessonId: 'chapter_1_lesson_1',
    earnedXp: 24,
    firstTry: false,
    storage,
  });
  recordDailyLessonCompletionOnce('chapter_1', 'chapter_1_lesson_1', { storage, now });

  const retry = ensureLessonProgress({
    chapterId: 'chapter_1',
    lessonId: 'chapter_1_lesson_1',
    earnedXp: 999,
    firstTry: true,
    storage,
  });
  recordDailyLessonCompletionOnce('chapter_1', 'chapter_1_lesson_1', { storage, now });
  markLessonCompletionReceipt('chapter_1', 'chapter_1_lesson_1', storage);

  assert.deepEqual(first, {
    record: { done: true, xp: 24, firstTry: false },
    existed: false,
  });
  assert.deepEqual(retry, {
    record: { done: true, xp: 24, firstTry: false },
    existed: true,
  });
  assert.equal(storage.getItem(DAILY_COUNT_KEY), '1');
  assert.equal(storage.getItem(DAILY_DATE_KEY), today);
  assert.deepEqual(JSON.parse(storage.getItem(DAILY_COMPLETION_EVENTS_KEY)), {
    date: today,
    baseCount: 0,
    lessonIds: ['chapter_1:chapter_1_lesson_1'],
  });
  assert.equal(hasLessonCompletionReceipt('chapter_1', 'chapter_1_lesson_1', storage), true);
  assert.deepEqual(JSON.parse(storage.getItem(PROGRESS_KEY)), {
    chapter_1: {
      chapter_1_lesson_1: { done: true, xp: 24, firstTry: false },
    },
  });
});

test('daily repair recomputes the derived count when a prior write stopped after the event ledger', () => {
  const now = new Date(2026, 7, 30, 10).getTime();
  const today = new Date(now).toDateString();
  const storage = createMemoryStorage({
    [DAILY_COMPLETION_EVENTS_KEY]: JSON.stringify({
      date: today,
      baseCount: 2,
      lessonIds: ['chapter_1:chapter_1_lesson_1'],
    }),
  });

  recordDailyLessonCompletionOnce('chapter_1', 'chapter_1_lesson_1', { storage, now });

  assert.equal(storage.getItem(DAILY_COUNT_KEY), '3');
  assert.equal(storage.getItem(DAILY_DATE_KEY), today);
});

test('lesson events preserve review counts added after the daily ledger was created', () => {
  const now = new Date(2026, 7, 30, 10).getTime();
  const storage = createMemoryStorage();

  recordDailyLessonCompletionOnce('chapter_1', 'lesson_1', { storage, now });
  storage.setItem(DAILY_COUNT_KEY, '2');
  recordDailyLessonCompletionOnce('chapter_1', 'lesson_2', { storage, now });
  recordDailyLessonCompletionOnce('chapter_1', 'lesson_2', { storage, now });

  assert.equal(storage.getItem(DAILY_COUNT_KEY), '3');
});

test('completion receipt keys are stable learning-state keys', () => {
  assert.equal(COMPLETION_RECEIPTS_KEY, 'codedex_completion_receipts');
  assert.equal(COMPLETION_RECEIPTS_VERSION_KEY, 'codedex_completion_receipts_version');
  assert.equal(DAILY_COMPLETION_EVENTS_KEY, 'codedex_daily_completion_events');
});
