import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextDestination } from '../src/utils/curriculumNavigation.js';

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
