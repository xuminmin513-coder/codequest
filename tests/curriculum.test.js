import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS } from '../src/data/courses.js';
import {
  CURRICULUM_VERSION,
  getCurriculumStats,
  validateCurriculum,
} from '../src/data/curriculum.js';

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
