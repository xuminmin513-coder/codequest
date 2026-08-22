export const CURRICULUM_VERSION = 2;

export function prepareCurriculum(rawChapters) {
  return rawChapters.map(chapter => ({
    ...chapter,
    curriculumVersion: CURRICULUM_VERSION,
    lessons: chapter.lessons.map(lesson => ({
      ...lesson,
      curriculumVersion: CURRICULUM_VERSION,
      starterCode: '',
    })),
  }));
}

export function getCurriculumStats(chapters) {
  return {
    chapters: chapters.length,
    lessons: chapters.reduce((total, chapter) => total + chapter.lessons.length, 0),
  };
}

export function validateCurriculum(chapters) {
  const errors = [];
  const chapterIds = new Set();
  const lessonIds = new Set();

  for (const chapter of chapters) {
    if (chapterIds.has(chapter.id)) errors.push(`duplicate chapter id: ${chapter.id}`);
    chapterIds.add(chapter.id);
    if (!Array.isArray(chapter.lessons) || chapter.lessons.length === 0) {
      errors.push(`chapter has no lessons: ${chapter.id}`);
      continue;
    }

    for (const lesson of chapter.lessons) {
      if (lessonIds.has(lesson.id)) errors.push(`duplicate lesson id: ${lesson.id}`);
      lessonIds.add(lesson.id);
      if ((lesson.starterCode || '') !== '') errors.push(`starter code is not empty: ${lesson.id}`);
      if (!Array.isArray(lesson.testCases) || lesson.testCases.length === 0) {
        errors.push(`lesson has no public tests: ${lesson.id}`);
      }
      if (!lesson.answer?.trim()) errors.push(`lesson has no maintained reference solution: ${lesson.id}`);
    }
  }

  return errors;
}
