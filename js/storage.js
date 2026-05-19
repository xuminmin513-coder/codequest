// ============================================================
// Storage - Local data persistence
// ============================================================

const STORAGE = {
  KEYS: {
    PROGRESS: 'codedex_progress',
    STREAK: 'codedex_streak',
    BADGES: 'codedex_badges',
    LANG: 'codedex_lang',
    PERFECT: 'codedex_perfect',
    DAILY_COUNT: 'codedex_daily_count',
    DAILY_DATE: 'codedex_daily_date',
    SAVED_CODE: 'codedex_saved_code',
    LAST_LESSON: 'codedex_last_lesson'
  },

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

  // Mark a lesson as completed
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
    return total;
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

  // Streak tracking
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

  // Daily lesson count
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

  // First try tracking
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

  // Check fast learner days
  checkFastLearnerDay() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(this.KEYS.DAILY_DATE);
    const count = parseInt(localStorage.getItem(this.KEYS.DAILY_COUNT) || '0');
    return storedDate === today && count >= 5;
  },

  // Language preference
  getLang() {
    return localStorage.getItem(this.KEYS.LANG) || 'zh';
  },

  setLang(lang) {
    localStorage.setItem(this.KEYS.LANG, lang);
  },

  // Save/load editor code for a specific lesson
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

  // Save/load last viewed lesson
  saveLastLesson(chapterId, lessonId) {
    localStorage.setItem(this.KEYS.LAST_LESSON, JSON.stringify({ chapterId, lessonId }));
  },

  loadLastLesson() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.LAST_LESSON)) || null;
    } catch { return null; }
  }
};
