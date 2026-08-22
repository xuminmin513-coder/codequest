import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getGraduationProgress,
  getNextDestination,
} from '../src/utils/curriculumNavigation.js';

const chapters = [
  {
    id: 'a',
    lessons: [{ id: 'a1' }, { id: 'a2' }],
  },
  {
    id: 'b',
    lessons: [{ id: 'b1' }],
  },
];

test('moves to the next lesson in the current chapter', () => {
  assert.deepEqual(getNextDestination(chapters, 'a', 'a1'), {
    page: 'lesson',
    data: { chapterId: 'a', lessonId: 'a2' },
  });
});

test('moves from a completed chapter to the first lesson in the next chapter', () => {
  assert.deepEqual(getNextDestination(chapters, 'a', 'a2'), {
    page: 'lesson',
    data: { chapterId: 'b', lessonId: 'b1' },
  });
});

test('moves from the final lesson to graduation', () => {
  assert.deepEqual(getNextDestination(chapters, 'b', 'b1'), {
    page: 'graduation',
    data: null,
  });
});

test('unknown lesson IDs return to courses in nonfinal and final chapters', () => {
  assert.deepEqual(getNextDestination(chapters, 'a', 'missing'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination(chapters, 'b', 'missing'), {
    page: 'courses',
    data: null,
  });
});

test('missing or malformed current lessons return to courses without throwing', () => {
  assert.deepEqual(getNextDestination(null, 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([null, { id: 'a', lessons: [{ id: 'a1' }] }], 'a', 'a1'), {
    page: 'graduation',
    data: null,
  });
  assert.deepEqual(getNextDestination([{ id: 'a' }], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([{ id: 'a', lessons: [] }], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
});

test('empty or malformed immediate next chapters return to courses without throwing', () => {
  const current = { id: 'a', lessons: [{ id: 'a1' }] };

  assert.deepEqual(getNextDestination([current, { id: 'b', lessons: [] }], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([current, { id: 'b' }], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([current, { lessons: [{ id: 'b1' }] }], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
});

test('graduation progress ignores stale chapter and lesson IDs', () => {
  assert.deepEqual(getGraduationProgress(chapters, {
    a: { a1: { done: true }, a2: false, staleLesson: { done: true } },
    staleChapter: { oldLesson: { done: true } },
  }), {
    totalLessons: 3,
    completed: 1,
    finished: false,
  });
});

test('an empty curriculum is never reported as finished', () => {
  assert.deepEqual(getGraduationProgress([], {}), {
    totalLessons: 0,
    completed: 0,
    finished: false,
  });
  assert.deepEqual(getGraduationProgress([{ id: 'a' }], { a: { a1: true } }), {
    totalLessons: 0,
    completed: 0,
    finished: false,
  });
});

test('graduation progress reports a fully completed live curriculum', () => {
  assert.deepEqual(getGraduationProgress(chapters, {
    a: { a1: { done: true }, a2: true },
    b: { b1: { done: true } },
  }), {
    totalLessons: 3,
    completed: 3,
    finished: true,
  });
});
