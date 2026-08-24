import { CHAPTERS } from '../src/data/courses.js';
import { getCurriculumStats, validateCurriculum } from '../src/data/curriculum.js';

const errors = validateCurriculum(CHAPTERS);

if (errors.length > 0) {
  console.error(`Curriculum validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  const stats = getCurriculumStats(CHAPTERS);
  console.log(`Curriculum valid: ${stats.chapters} chapters, ${stats.lessons} lessons.`);
}
