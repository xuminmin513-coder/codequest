import {
  CURRICULUM_STORAGE_VERSION,
  VERSION_KEY,
  ARCHIVES_KEY,
  LEARNING_KEYS,
  hasMeaningfulProgress,
  isPlainRecord,
  parseArchives,
  readArchives,
  needsCurriculumChoice,
  keepExistingProgress,
  restartForV2,
  restoreArchive,
} from './curriculumMigration.js';
import {
  createActiveSaveRecovery,
  getActivePlayerStorage,
} from '../data/playerSaveRepository.js';

const localStorage = {
  get length() { return getActivePlayerStorage().length; },
  key(index) { return getActivePlayerStorage().key(index); },
  getItem(key) { return getActivePlayerStorage().getItem(key); },
  setItem(key, value) { return getActivePlayerStorage().setItem(key, value); },
  removeItem(key) { return getActivePlayerStorage().removeItem(key); },
  clear() { return getActivePlayerStorage().clear(); },
};

const LANG_KEY = 'codedex_lang';
const MANAGED_KEYS = Object.freeze([
  ...LEARNING_KEYS,
  LANG_KEY,
  VERSION_KEY,
  ARCHIVES_KEY,
]);
const MANAGED_KEY_SET = new Set(MANAGED_KEYS);

function validateBackup(data) {
  if (!isPlainRecord(data)) throw new Error('Invalid backup: root must be a plain record');
  for (const [key, value] of Object.entries(data)) {
    if (!MANAGED_KEY_SET.has(key)) throw new Error(`Invalid backup: unsupported key ${key}`);
    if (typeof value !== 'string') throw new Error(`Invalid backup: ${key} must be a string`);
  }
  if (Object.hasOwn(data, VERSION_KEY) && data[VERSION_KEY].length === 0) {
    throw new Error('Invalid backup: curriculum version must not be empty');
  }
  const importedArchives = Object.hasOwn(data, ARCHIVES_KEY)
    ? parseArchives(data[ARCHIVES_KEY])
    : [];
  return { ...data, importedArchives };
}

function uniqueId(preferred, usedIds) {
  if (!usedIds.has(preferred)) return preferred;
  let suffix = 1;
  while (usedIds.has(`${preferred}-imported-${suffix}`)) suffix += 1;
  return `${preferred}-imported-${suffix}`;
}

function activeArchive(storage, archives, now = Date.now()) {
  const usedIds = new Set(archives.map(item => item.id));
  const data = Object.fromEntries(
    LEARNING_KEYS
      .map(key => [key, storage.getItem(key)])
      .filter(([, value]) => value !== null),
  );
  const id = uniqueId(`legacy-${now}`, usedIds);
  return { id, createdAt: now, data };
}

function mergeImportArchives(storage, importedArchives) {
  const merged = readArchives(storage).map(archive => ({ ...archive, data: { ...archive.data } }));
  const usedIds = new Set(merged.map(item => item.id));
  for (const archive of importedArchives) {
    const id = uniqueId(archive.id, usedIds);
    usedIds.add(id);
    merged.push({ ...archive, id, data: { ...archive.data } });
  }
  merged.push(activeArchive(storage, merged));
  const raw = JSON.stringify(merged);
  parseArchives(raw);
  return raw;
}

function captureManaged(storage) {
  return Object.fromEntries(MANAGED_KEYS.map(key => [key, storage.getItem(key)]));
}

function restoreManaged(storage, before) {
  for (const key of MANAGED_KEYS) {
    const value = before[key];
    if (value === null) storage.removeItem(key);
    else storage.setItem(key, value);
  }
}

function replaceFromBackup(storage, data) {
  const { importedArchives, ...rawData } = validateBackup(data);
  const mergedArchives = mergeImportArchives(storage, importedArchives);
  const version = Object.hasOwn(rawData, VERSION_KEY)
    ? rawData[VERSION_KEY]
    : (hasMeaningfulProgress(rawData.codedex_progress ?? null)
      ? null
      : CURRICULUM_STORAGE_VERSION);
  const before = captureManaged(storage);

  try {
    storage.setItem(ARCHIVES_KEY, mergedArchives);
    for (const key of MANAGED_KEYS) {
      if (key !== ARCHIVES_KEY) storage.removeItem(key);
    }
    for (const [key, value] of Object.entries(rawData)) {
      if (key !== ARCHIVES_KEY && key !== VERSION_KEY) storage.setItem(key, value);
    }
    if (version !== null) storage.setItem(VERSION_KEY, version);
  } catch (error) {
    try {
      restoreManaged(storage, before);
    } catch {
      // Best-effort rollback; callers still receive the original write error.
    }
    throw error;
  }
}

export const STORAGE = {
  KEYS: {
    PROGRESS: 'codedex_progress',
    STREAK: 'codedex_streak',
    BADGES: 'codedex_badges',
    LANG: 'codedex_lang',
    PERFECT: 'codedex_perfect',
    DAILY_COUNT: 'codedex_daily_count',
    DAILY_DATE: 'codedex_daily_date',
    SAVED_CODE: 'codedex_saved_code',
    LAST_LESSON: 'codedex_last_lesson',
    REVIEW: 'codedex_review',
    REVIEW_XP: 'codedex_review_xp',
    SKILL_UNLOCKS: 'codedex_skill_unlocks'
  },

  REVIEW_INTERVALS: [1, 2, 4, 7, 15, 30],
  BASE_REVIEW_XP: 10,
  STAGE_REVIEW_XP_BONUS: 5,

  getProgress() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.PROGRESS)) || {};
    } catch { return {}; }
  },

  saveProgress(progress) {
    localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(progress));
  },

  getBadges() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.BADGES)) || [];
    } catch { return []; }
  },

  saveBadges(badges) {
    localStorage.setItem(this.KEYS.BADGES, JSON.stringify(badges));
  },

  completeLesson(chapterId, lessonId, earnedXp, firstTry) {
    const progress = this.getProgress();
    if (!progress[chapterId]) progress[chapterId] = {};
    if (!progress[chapterId][lessonId]) {
      progress[chapterId][lessonId] = { done: true, xp: earnedXp, firstTry: firstTry || false };
    }
    this.saveProgress(progress);
    this.updateStreak();
    this.updateDailyCount();
    return progress;
  },

  isLessonCompleted(chapterId, lessonId) {
    const progress = this.getProgress();
    return !!(progress[chapterId] && progress[chapterId][lessonId]);
  },

  getTotalXp() {
    const progress = this.getProgress();
    let total = 0;
    Object.values(progress).forEach(chapter => {
      Object.values(chapter).forEach(lesson => {
        total += lesson.xp || 0;
      });
    });
    total += this.getReviewXp();
    return total;
  },

  getReviewXp() {
    return parseInt(localStorage.getItem(this.KEYS.REVIEW_XP) || '0');
  },

  addReviewXp(amount) {
    const current = this.getReviewXp();
    localStorage.setItem(this.KEYS.REVIEW_XP, (current + amount).toString());
    return current + amount;
  },

  getCompletedCount() {
    const progress = this.getProgress();
    let count = 0;
    Object.values(progress).forEach(chapter => {
      count += Object.keys(chapter).length;
    });
    return count;
  },

  getCompletedPerChapter() {
    const progress = this.getProgress();
    const counts = {};
    Object.entries(progress).forEach(([chId, lessons]) => {
      counts[chId] = Object.keys(lessons).length;
    });
    return counts;
  },

  updateStreak() {
    const today = new Date().toDateString();
    const streakData = JSON.parse(localStorage.getItem(this.KEYS.STREAK)) || { count: 0, lastDate: null };
    if (streakData.lastDate === today) return streakData.count;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (streakData.lastDate === yesterday) {
      streakData.count += 1;
    } else {
      streakData.count = 1;
    }
    streakData.lastDate = today;
    localStorage.setItem(this.KEYS.STREAK, JSON.stringify(streakData));
    return streakData.count;
  },

  getStreak() {
    const streakData = JSON.parse(localStorage.getItem(this.KEYS.STREAK)) || { count: 0, lastDate: null };
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (streakData.lastDate !== today && streakData.lastDate !== yesterday) {
      return 0;
    }
    return streakData.count;
  },

  updateDailyCount() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(this.KEYS.DAILY_DATE);
    let count = parseInt(localStorage.getItem(this.KEYS.DAILY_COUNT) || '0');
    if (storedDate !== today) {
      count = 1;
      localStorage.setItem(this.KEYS.DAILY_DATE, today);
    } else {
      count += 1;
    }
    localStorage.setItem(this.KEYS.DAILY_COUNT, count.toString());
    return count;
  },

  getDailyCount() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(this.KEYS.DAILY_DATE);
    if (storedDate !== today) return 0;
    return parseInt(localStorage.getItem(this.KEYS.DAILY_COUNT) || '0');
  },

  isPerfectLesson(lessonId) {
    const perfect = JSON.parse(localStorage.getItem(this.KEYS.PERFECT)) || {};
    return !!perfect[lessonId];
  },

  markPerfect(lessonId) {
    const perfect = JSON.parse(localStorage.getItem(this.KEYS.PERFECT)) || {};
    perfect[lessonId] = true;
    localStorage.setItem(this.KEYS.PERFECT, JSON.stringify(perfect));
  },

  getPerfectCount() {
    const perfect = JSON.parse(localStorage.getItem(this.KEYS.PERFECT)) || {};
    return Object.keys(perfect).length;
  },

  checkFastLearnerDay() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(this.KEYS.DAILY_DATE);
    const count = parseInt(localStorage.getItem(this.KEYS.DAILY_COUNT) || '0');
    return storedDate === today && count >= 5;
  },

  getLang() {
    return localStorage.getItem(this.KEYS.LANG) || 'zh';
  },

  setLang(lang) {
    localStorage.setItem(this.KEYS.LANG, lang);
  },

  saveCode(lessonId, code) {
    const saved = JSON.parse(localStorage.getItem(this.KEYS.SAVED_CODE) || '{}');
    saved[lessonId] = code;
    localStorage.setItem(this.KEYS.SAVED_CODE, JSON.stringify(saved));
  },

  loadCode(lessonId) {
    const saved = JSON.parse(localStorage.getItem(this.KEYS.SAVED_CODE) || '{}');
    return saved[lessonId] || '';
  },

  clearCode(lessonId) {
    const saved = JSON.parse(localStorage.getItem(this.KEYS.SAVED_CODE) || '{}');
    delete saved[lessonId];
    localStorage.setItem(this.KEYS.SAVED_CODE, JSON.stringify(saved));
  },

  isChapterCompleted(chapterId, totalLessons) {
    const completedPerChapter = this.getCompletedPerChapter();
    return (completedPerChapter[chapterId] || 0) >= totalLessons;
  },

  saveLastLesson(chapterId, lessonId) {
    localStorage.setItem(this.KEYS.LAST_LESSON, JSON.stringify({ chapterId, lessonId }));
  },

  loadLastLesson() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.LAST_LESSON)) || null;
    } catch { return null; }
  },

  getReviewData() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.REVIEW)) || {};
    } catch { return {}; }
  },

  saveReviewData(data) {
    localStorage.setItem(this.KEYS.REVIEW, JSON.stringify(data));
  },

  initReviewForLesson(chapterId, lessonId) {
    const data = this.getReviewData();
    if (data[lessonId]) return;
    data[lessonId] = {
      stage: 0,
      nextReview: Date.now() + 86400000,
      lastReviewed: Date.now(),
      reviewsCompleted: 0
    };
    this.saveReviewData(data);
  },

  getDueReviews() {
    const data = this.getReviewData();
    const progress = this.getProgress();
    const now = Date.now();
    return Object.entries(data)
      .filter(([lessonId, entry]) => {
        const chId = lessonId.split('_')[0];
        return entry.nextReview <= now && progress[chId]?.[lessonId];
      })
      .map(([lessonId, entry]) => ({
        lessonId,
        chapterId: lessonId.split('_')[0],
        stage: entry.stage,
        nextReview: entry.nextReview,
        reviewsCompleted: entry.reviewsCompleted
      }))
      .sort((a, b) => a.nextReview - b.nextReview);
  },

  getPendingReviewCount() {
    return this.getDueReviews().length;
  },

  recordReviewResult(lessonId, success) {
    const data = this.getReviewData();
    if (!data[lessonId]) return;
    const entry = data[lessonId];
    if (success) {
      entry.stage = Math.min(entry.stage + 1, this.REVIEW_INTERVALS.length - 1);
      entry.reviewsCompleted += 1;
    } else {
      entry.stage = 0;
    }
    entry.lastReviewed = Date.now();
    entry.nextReview = Date.now() + this.REVIEW_INTERVALS[entry.stage] * 86400000;
    this.saveReviewData(data);
  },

  getLessonReviewStage(lessonId) {
    const data = this.getReviewData();
    const entry = data[lessonId];
    if (!entry) return null;
    return {
      stage: entry.stage,
      reviewsCompleted: entry.reviewsCompleted,
      nextReview: entry.nextReview
    };
  },

  getTotalReviewsCompleted() {
    const data = this.getReviewData();
    return Object.values(data).reduce((sum, entry) => sum + (entry.reviewsCompleted || 0), 0);
  },

  migrateReviewData() {
    const data = this.getReviewData();
    const progress = this.getProgress();
    let changed = false;
    Object.entries(progress).forEach(([chId, lessons]) => {
      Object.keys(lessons).forEach(lessonId => {
        if (!data[lessonId]) {
          data[lessonId] = {
            stage: 0,
            nextReview: Date.now() + 86400000,
            lastReviewed: Date.now(),
            reviewsCompleted: 0
          };
          changed = true;
        }
      });
    });
    if (changed) this.saveReviewData(data);
  },

  // ── Skill unlock system ──

  isAllCh1LessonsReviewed() {
    const reviewData = this.getReviewData();
    const ch1LessonIds = ['ch1_01', 'ch1_02', 'ch1_03', 'ch1_04', 'ch1_05'];
    return ch1LessonIds.every(id => {
      return reviewData[id] && reviewData[id].reviewsCompleted > 0;
    });
  },

  isCh1SkillUnlockable() {
    const progress = this.getProgress();
    const ch1Done = progress.ch1 && Object.keys(progress.ch1).length >= 5;
    if (!ch1Done) return false;
    return this.isAllCh1LessonsReviewed();
  },

  getSkillUnlockData() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.SKILL_UNLOCKS)) || {};
    } catch { return {}; }
  },

  saveSkillUnlockData(data) {
    localStorage.setItem(this.KEYS.SKILL_UNLOCKS, JSON.stringify(data));
  },

  isSkillUnlocked(skillId) {
    const data = this.getSkillUnlockData();
    return !!data[skillId];
  },

  markSkillUnlocked(skillId) {
    const data = this.getSkillUnlockData();
    data[skillId] = true;
    this.saveSkillUnlockData(data);
  },

  hasSkillUnlockBeenShown(skillId) {
    const data = this.getSkillUnlockData();
    return data[skillId] === 'shown';
  },

  markSkillUnlockShown(skillId) {
    const data = this.getSkillUnlockData();
    data[skillId] = 'shown';
    this.saveSkillUnlockData(data);
  },

  // ── Export / Import Progress ──

  needsCurriculumChoice() {
    return needsCurriculumChoice(localStorage);
  },

  keepExistingProgress() {
    keepExistingProgress(localStorage);
  },

  restartForV2() {
    createActiveSaveRecovery('before-reset');
    return restartForV2(localStorage);
  },

  getCurriculumArchives() {
    return readArchives(localStorage);
  },

  restoreCurriculumArchive(archiveId) {
    createActiveSaveRecovery('before-curriculum-restore');
    restoreArchive(localStorage, archiveId);
  },

  exportAllData() {
    const keys = [
      this.KEYS.PROGRESS,
      this.KEYS.BADGES,
      this.KEYS.STREAK,
      this.KEYS.PERFECT,
      this.KEYS.DAILY_COUNT,
      this.KEYS.DAILY_DATE,
      this.KEYS.LAST_LESSON,
      this.KEYS.REVIEW,
      this.KEYS.REVIEW_XP,
      this.KEYS.SKILL_UNLOCKS,
      this.KEYS.LANG,
      this.KEYS.SAVED_CODE,
      VERSION_KEY,
      ARCHIVES_KEY,
    ];
    const data = {};
    keys.forEach(key => {
      const val = localStorage.getItem(key);
      if (val !== null) data[key] = val;
    });
    if (!Object.hasOwn(data, VERSION_KEY)) {
      data[VERSION_KEY] = hasMeaningfulProgress(data[this.KEYS.PROGRESS] ?? null)
        ? 'legacy'
        : CURRICULUM_STORAGE_VERSION;
    }
    if (!Object.hasOwn(data, ARCHIVES_KEY)) data[ARCHIVES_KEY] = '[]';
    return data;
  },

  importAllData(data) {
    createActiveSaveRecovery('before-import');
    replaceFromBackup(localStorage, data);
  },
};
