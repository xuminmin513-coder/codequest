export const GAMIFICATION = {
  XP_PER_LEVEL: 500,

  BADGES: [
    { id: 'first_code', name: 'First Code', nameCn: '第一行代码', icon: '💻', desc: '完成第一节课', descCn: 'Complete your first lesson', condition: (stats) => stats.completedLessons >= 1 },
    { id: 'ch1_done', name: 'Chapter 1 Master', nameCn: '第一章大师', icon: '🚀', desc: '完成第一章', descCn: 'Complete Chapter 1', condition: (stats) => stats.completedChapters >= 1 },
    { id: 'ch2_done', name: 'Variable Wizard', nameCn: '变量巫师', icon: '🔮', desc: '完成第二章', descCn: 'Complete Chapter 2', condition: (stats) => stats.completedChapters >= 2 },
    { id: 'ch3_done', name: 'String Artist', nameCn: '字符串艺术家', icon: '📝', desc: '完成第三章', descCn: 'Complete Chapter 3', condition: (stats) => stats.completedChapters >= 3 },
    { id: 'ch5_done', name: 'Logic Master', nameCn: '逻辑大师', icon: '⚖️', desc: '完成第五章', descCn: 'Complete Chapter 5', condition: (stats) => stats.completedChapters >= 5 },
    { id: 'loop_master', name: 'Loop Master', nameCn: '循环大师', icon: '🔄', desc: '完成第六章', descCn: 'Complete Chapter 6', condition: (stats) => stats.completedChapters >= 6 },
    { id: 'halfway', name: 'Halfway There', nameCn: '半程冠军', icon: '🏃', desc: '完成20节课', descCn: 'Complete 20 lessons', condition: (stats) => stats.completedLessons >= 20 },
    { id: 'streak_3', name: '3-Day Streak', nameCn: '初露锋芒', icon: '🔥', desc: '连续学习3天', descCn: '3-day learning streak', condition: (stats) => stats.streak >= 3 },
    { id: 'streak_7', name: '7-Day Streak', nameCn: '持之以恒', icon: '💪', desc: '连续学习7天', descCn: '7-day learning streak', condition: (stats) => stats.streak >= 7 },
    { id: 'xp_1000', name: 'Century', nameCn: '千年之旅', icon: '⭐', desc: '获得1000 XP', descCn: 'Earn 1000 XP', condition: (stats) => stats.xp >= 1000 },
    { id: 'xp_2500', name: 'Rising Star', nameCn: '新星闪耀', icon: '🌟', desc: '获得2500 XP', descCn: 'Earn 2500 XP', condition: (stats) => stats.xp >= 2500 },
    { id: 'all_done', name: 'Python Master', nameCn: 'Python大师', icon: '🏆', desc: '完成所有课程', descCn: 'Complete all courses', condition: (stats) => stats.completedLessons >= 56 },
    { id: 'ch11_done', name: 'File Adventurer', nameCn: '文件探险家', icon: '📂', desc: '完成第十一章', descCn: 'Complete Chapter 11', condition: (stats) => stats.completedChapters >= 11 },
    { id: 'ch12_done', name: 'Error Catcher', nameCn: '错误捕手', icon: '🛡️', desc: '完成第十二章', descCn: 'Complete Chapter 12', condition: (stats) => stats.completedChapters >= 12 },
    { id: 'ch13_done', name: 'OOP Master', nameCn: '面向对象大师', icon: '🏗️', desc: '完成第十三章', descCn: 'Complete Chapter 13', condition: (stats) => stats.completedChapters >= 13 },
    { id: 'perfect', name: 'Perfect Score', nameCn: '完美一击', icon: '✨', desc: '第一次尝试即正确完成一关', descCn: 'Pass a lesson on first try', condition: (stats) => stats.perfectLessons >= 1 },
    { id: 'speed', name: 'Fast Learner', nameCn: '极速学习', icon: '⚡', desc: '一天内完成5节课', descCn: 'Complete 5 lessons in one day', condition: (stats) => stats.fastLearnerDays >= 1 },
    { id: 'review_10', name: 'Review Master', nameCn: '复习达人', icon: '📖', desc: '完成10次复习', descCn: 'Complete 10 reviews', condition: (stats) => stats.reviewsCompleted >= 10 },
    { id: 'review_30', name: 'Review Legend', nameCn: '复习王者', icon: '👑', desc: '完成30次复习', descCn: 'Complete 30 reviews', condition: (stats) => stats.reviewsCompleted >= 30 },
  ],

  getLevel(xp) {
    return Math.floor(xp / this.XP_PER_LEVEL) + 1;
  },

  xpForNextLevel(level) {
    return level * this.XP_PER_LEVEL;
  },

  levelProgress(xp) {
    const level = this.getLevel(xp);
    const currentLevelXp = (level - 1) * this.XP_PER_LEVEL;
    const progress = ((xp - currentLevelXp) / this.XP_PER_LEVEL) * 100;
    return Math.min(progress, 100);
  },

  checkNewBadges(stats, oldBadges) {
    const newBadges = [];
    this.BADGES.forEach(badge => {
      if (!oldBadges.includes(badge.id) && badge.condition(stats)) {
        newBadges.push(badge);
      }
    });
    return newBadges;
  }
};
