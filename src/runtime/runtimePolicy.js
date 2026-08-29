const PENDING_LAB_IMPORT = /\b(?:from|import)\s+(?:pyecharts(?:\.\w+)?|threading|socket|pyspark(?:\.\w+)?)\b/;

export function getLessonRuntimeMode(lesson = {}) {
  const source = [
    lesson.answer,
    lesson.referenceSolution,
    lesson.starterCode,
    lesson.content,
    lesson.description,
  ]
    .filter(value => typeof value === 'string')
    .join('\n');

  return PENDING_LAB_IMPORT.test(source) ? 'visual-lab-pending' : 'python';
}
