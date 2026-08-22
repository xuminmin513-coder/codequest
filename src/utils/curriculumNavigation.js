export function getNextDestination(chapters, chapterId, lessonId) {
  const chapterIndex = chapters.findIndex(chapter => chapter.id === chapterId);
  const chapter = chapters[chapterIndex];
  if (!chapter) return { page: 'courses', data: null };

  const lessonIndex = chapter.lessons.findIndex(lesson => lesson.id === lessonId);
  if (lessonIndex >= 0 && lessonIndex < chapter.lessons.length - 1) {
    return {
      page: 'lesson',
      data: { chapterId, lessonId: chapter.lessons[lessonIndex + 1].id },
    };
  }

  const nextChapter = chapters[chapterIndex + 1];
  if (nextChapter) {
    return {
      page: 'lesson',
      data: { chapterId: nextChapter.id, lessonId: nextChapter.lessons[0].id },
    };
  }

  return { page: 'graduation', data: null };
}
