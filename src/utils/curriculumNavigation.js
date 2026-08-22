export function getNextDestination(chapters, chapterId, lessonId) {
  const coursesDestination = { page: 'courses', data: null };
  const hasId = value => typeof value === 'string' && value.trim().length > 0;
  if (!Array.isArray(chapters) || !hasId(chapterId) || !hasId(lessonId)) {
    return coursesDestination;
  }

  const hasValidInventory = chapters.every(chapter => (
    chapter !== null
    && typeof chapter === 'object'
    && !Array.isArray(chapter)
    && hasId(chapter.id)
    && Array.isArray(chapter.lessons)
    && chapter.lessons.length > 0
    && chapter.lessons.every(lesson => (
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

  if (chapterIndex < chapters.length - 1) {
    const nextChapter = chapters[chapterIndex + 1];
    if (!nextChapter || typeof nextChapter !== 'object') return coursesDestination;
    const firstLesson = Array.isArray(nextChapter.lessons) && nextChapter.lessons[0];
    if (!nextChapter.id || !firstLesson?.id) return coursesDestination;
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

  if (Array.isArray(chapters)) {
    chapters.forEach(chapter => {
      if (!chapter?.id || !Array.isArray(chapter.lessons)) return;

      chapter.lessons.forEach(lesson => {
        if (!lesson?.id) return;
        totalLessons += 1;
        if (progress?.[chapter.id]?.[lesson.id]) completed += 1;
      });
    });
  }

  return {
    totalLessons,
    completed,
    finished: totalLessons > 0 && completed >= totalLessons,
  };
}
