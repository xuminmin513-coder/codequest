import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getGraduationProgress,
  getNextDestination,
  getNextRequiredLesson,
  getPreviousRequiredChapter,
  getRequiredChapters,
  getRequiredLessonCount,
  isChapterUnlocked,
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

const pathWithOptionalLab = [
  {
    id: 'core',
    lessons: [{ id: 'core1' }],
  },
  {
    id: 'lab',
    optional: true,
    availability: 'in-development',
    lessons: [{ id: 'lab1' }],
  },
  {
    id: 'final',
    lessons: [{ id: 'final1' }],
  },
];

test('required inventory excludes optional labs', () => {
  assert.deepEqual(
    getRequiredChapters(pathWithOptionalLab).map(chapter => chapter.id),
    ['core', 'final'],
  );
  assert.equal(getRequiredLessonCount(pathWithOptionalLab), 2);
});

test('required navigation skips optional labs', () => {
  assert.deepEqual(getNextDestination(pathWithOptionalLab, 'core', 'core1'), {
    page: 'lesson',
    data: { chapterId: 'final', lessonId: 'final1' },
  });
  assert.deepEqual(getNextDestination(pathWithOptionalLab, 'final', 'final1'), {
    page: 'graduation',
    data: null,
  });
});

test('optional labs and final projects share the previous required prerequisite', () => {
  assert.equal(getPreviousRequiredChapter(pathWithOptionalLab, 'lab').id, 'core');
  assert.equal(getPreviousRequiredChapter(pathWithOptionalLab, 'final').id, 'core');
  assert.equal(isChapterUnlocked(pathWithOptionalLab, 'lab', {}), false);
  assert.equal(
    isChapterUnlocked(pathWithOptionalLab, 'final', { core: { core1: true } }),
    true,
  );
});

test('continue learning and graduation ignore optional labs', () => {
  assert.deepEqual(
    getNextRequiredLesson(pathWithOptionalLab, { core: { core1: true } }),
    {
      chapter: pathWithOptionalLab[2],
      lesson: pathWithOptionalLab[2].lessons[0],
    },
  );
  assert.deepEqual(getGraduationProgress(pathWithOptionalLab, {
    core: { core1: true },
    final: { final1: true },
  }), {
    totalLessons: 2,
    completed: 2,
    finished: true,
  });
});

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
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([false, { id: 'a', lessons: [{ id: 'a1' }] }], 'a', 'a1'), {
    page: 'courses',
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

  assert.deepEqual(getNextDestination([current, null], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([current, false], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
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

test('missing or empty navigation IDs always return to courses', () => {
  assert.deepEqual(getNextDestination([{ lessons: [{ id: 'a1' }] }], undefined, 'a1'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([{ id: '', lessons: [{ id: 'a1' }] }], '', 'a1'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([{ id: 'a', lessons: [{}] }], 'a', undefined), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([{ id: 'a', lessons: [{ id: '' }] }], 'a', ''), {
    page: 'courses',
    data: null,
  });
});

test('malformed lesson entries anywhere make navigation fail closed', () => {
  assert.deepEqual(getNextDestination([
    { id: 'a', lessons: [null, { id: 'a1' }] },
  ], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
  assert.deepEqual(getNextDestination([
    { id: 'a', lessons: [{ id: 'a1' }, { id: 'a2' }] },
    { id: 'b', lessons: [{ id: 'b1' }] },
    null,
  ], 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
});

test('a sparse chapter inventory returns to courses', () => {
  const sparseChapters = new Array(2);
  sparseChapters[1] = { id: 'a', lessons: [{ id: 'a1' }] };

  assert.deepEqual(getNextDestination(sparseChapters, 'a', 'a1'), {
    page: 'courses',
    data: null,
  });
});

test('a sparse lesson inventory returns to courses', () => {
  const sparseLessons = new Array(2);
  sparseLessons[1] = { id: 'a1' };

  assert.deepEqual(getNextDestination([
    { id: 'a', lessons: sparseLessons },
  ], 'a', 'a1'), {
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
