export const isRequiredChapter = chapter => Boolean(chapter) && chapter.optional !== true;

export function getRequiredChapters(chapters) {
  return Array.isArray(chapters) ? chapters.filter(isRequiredChapter) : [];
}

export function getRequiredLessonCount(chapters) {
  return getRequiredChapters(chapters)
    .reduce((sum, chapter) => (
      sum + (Array.isArray(chapter.lessons) ? chapter.lessons.length : 0)
    ), 0);
}

export function getPreviousRequiredChapter(chapters, chapterId) {
  if (!Array.isArray(chapters)) return null;
  const chapterIndex = chapters.findIndex(chapter => chapter?.id === chapterId);
  if (chapterIndex < 0) return null;

  for (let index = chapterIndex - 1; index >= 0; index -= 1) {
    if (isRequiredChapter(chapters[index])) return chapters[index];
  }
  return null;
}

function isLessonComplete(progress, chapterId, lessonId) {
  return Boolean(progress?.[chapterId]?.[lessonId]);
}

function isChapterComplete(chapter, progress) {
  return Boolean(chapter?.lessons?.length)
    && chapter.lessons.every(lesson => isLessonComplete(progress, chapter.id, lesson.id));
}

export function isChapterUnlocked(chapters, chapterId, progress) {
  const chapter = Array.isArray(chapters)
    ? chapters.find(item => item?.id === chapterId)
    : null;
  if (!chapter) return false;

  const previousRequired = getPreviousRequiredChapter(chapters, chapterId);
  return !previousRequired || isChapterComplete(previousRequired, progress);
}

export function getNextRequiredLesson(chapters, progress) {
  for (const chapter of getRequiredChapters(chapters)) {
    for (const lesson of chapter.lessons || []) {
      if (!isLessonComplete(progress, chapter.id, lesson.id)) {
        return { chapter, lesson };
      }
    }
  }
  return null;
}

export function getNextDestination(chapters, chapterId, lessonId) {
  const coursesDestination = { page: 'courses', data: null };
  const hasId = value => typeof value === 'string' && value.trim().length > 0;
  if (!Array.isArray(chapters) || !hasId(chapterId) || !hasId(lessonId)) {
    return coursesDestination;
  }

  const hasValidInventory = Array.from(chapters).every(chapter => (
    chapter !== null
    && typeof chapter === 'object'
    && !Array.isArray(chapter)
    && hasId(chapter.id)
    && Array.isArray(chapter.lessons)
    && chapter.lessons.length > 0
    && Array.from(chapter.lessons).every(lesson => (
      lesson !== null
      && typeof lesson === 'object'
      && !Array.isArray(lesson)
      && hasId(lesson.id)
    ))
  ));
  if (!hasValidInventory) return coursesDestination;

  const chapterIndex = chapters.findIndex(chapter => chapter.id === chapterId);
  const chapter = chapters[chapterIndex];
  if (!chapter) return coursesDestination;

  const lessonIndex = chapter.lessons.findIndex(lesson => lesson.id === lessonId);
  if (lessonIndex < 0) return coursesDestination;

  if (lessonIndex < chapter.lessons.length - 1) {
    const nextLesson = chapter.lessons[lessonIndex + 1];
    if (!nextLesson?.id) return coursesDestination;
    return {
      page: 'lesson',
      data: { chapterId, lessonId: nextLesson.id },
    };
  }

  if (!isRequiredChapter(chapter)) return coursesDestination;

  for (let index = chapterIndex + 1; index < chapters.length; index += 1) {
    const nextChapter = chapters[index];
    if (!isRequiredChapter(nextChapter)) continue;
    const firstLesson = nextChapter.lessons[0];
    return {
      page: 'lesson',
      data: { chapterId: nextChapter.id, lessonId: firstLesson.id },
    };
  }

  return { page: 'graduation', data: null };
}

export function getGraduationProgress(chapters, progress) {
  let totalLessons = 0;
  let completed = 0;

  getRequiredChapters(chapters).forEach(chapter => {
    if (!chapter?.id || !Array.isArray(chapter.lessons)) return;

    chapter.lessons.forEach(lesson => {
      if (!lesson?.id) return;
      totalLessons += 1;
      if (isLessonComplete(progress, chapter.id, lesson.id)) completed += 1;
    });
  });

  return {
    totalLessons,
    completed,
    finished: totalLessons > 0 && completed >= totalLessons,
  };
}
