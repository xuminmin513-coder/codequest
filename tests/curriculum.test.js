import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS } from '../src/data/courses.js';
import {
  CURRICULUM_VERSION,
  getCurriculumStats,
  validateCurriculum,
} from '../src/data/curriculum.js';
import { getLessonRuntimeMode } from '../src/runtime/runtimePolicy.js';
import {
  getNextDestination,
  getRequiredLessonCount,
} from '../src/utils/curriculumNavigation.js';

test('V2 curriculum keeps the current 104 lesson inventory', () => {
  const stats = getCurriculumStats(CHAPTERS);
  assert.equal(CURRICULUM_VERSION, 2);
  assert.equal(stats.chapters, 26);
  assert.equal(stats.lessons, 104);
});

test('every formal challenge starts empty', () => {
  for (const chapter of CHAPTERS) {
    for (const lesson of chapter.lessons) {
      assert.equal(lesson.starterCode, '', lesson.id);
      assert.equal(lesson.curriculumVersion, 2, lesson.id);
    }
  }
});

test('curriculum IDs and public tests are valid', () => {
  assert.deepEqual(validateCurriculum(CHAPTERS), []);
});

test('browser-incompatible labs are explicit optional in-development chapters', () => {
  const optional = CHAPTERS.filter(chapter => chapter.optional);
  assert.deepEqual(optional.map(chapter => chapter.id), ['ch24', 'ch25', 'ch26', 'ch27']);
  assert.ok(optional.every(chapter => chapter.availability === 'in-development'));
  assert.equal(optional.flatMap(chapter => chapter.lessons).length, 12);
  assert.equal(getRequiredLessonCount(CHAPTERS), 92);
});

test('every required lesson uses the real Python runtime', () => {
  for (const chapter of CHAPTERS.filter(item => !item.optional)) {
    for (const lesson of chapter.lessons) {
      assert.equal(getLessonRuntimeMode(lesson), 'python', lesson.id);
    }
  }
});

test('the live main path jumps from databases to the final projects', () => {
  const databaseChapter = CHAPTERS.find(chapter => chapter.id === 'ch23');
  const finalChapter = CHAPTERS.find(chapter => chapter.id === 'ch9');
  const lastDatabaseLesson = databaseChapter.lessons.at(-1);

  assert.deepEqual(
    getNextDestination(CHAPTERS, databaseChapter.id, lastDatabaseLesson.id),
    {
      page: 'lesson',
      data: {
        chapterId: finalChapter.id,
        lessonId: finalChapter.lessons[0].id,
      },
    },
  );
});
