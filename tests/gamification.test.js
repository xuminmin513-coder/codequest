import test from 'node:test';
import assert from 'node:assert/strict';
import { GAMIFICATION } from '../src/utils/gamification.js';

const base = {
  xp: 0,
  completedLessons: 0,
  completedChapters: 0,
  totalLessons: 12,
  badges: 0,
  streak: 0,
  perfectLessons: 0,
  fastLearnerDays: 0,
  reviewsCompleted: 0,
};

test('halfway badge uses the supplied curriculum total', () => {
  const badges = GAMIFICATION.checkNewBadges({ ...base, completedLessons: 6 }, []);
  assert.ok(badges.some(badge => badge.id === 'halfway'));
});

test('all-done badge is not awarded before the supplied total', () => {
  const early = GAMIFICATION.checkNewBadges({ ...base, completedLessons: 11 }, []);
  const complete = GAMIFICATION.checkNewBadges({ ...base, completedLessons: 12 }, []);
  assert.ok(!early.some(badge => badge.id === 'all_done'));
  assert.ok(complete.some(badge => badge.id === 'all_done'));
});
