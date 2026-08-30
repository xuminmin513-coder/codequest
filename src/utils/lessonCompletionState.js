import { getActivePlayerStorage } from '../data/playerSaveRepository.js';

export const COMPLETION_RECEIPTS_KEY = 'codedex_completion_receipts';
export const COMPLETION_RECEIPTS_VERSION_KEY = 'codedex_completion_receipts_version';
export const DAILY_COMPLETION_EVENTS_KEY = 'codedex_daily_completion_events';

const PROGRESS_KEY = 'codedex_progress';
const DAILY_COUNT_KEY = 'codedex_daily_count';
const DAILY_DATE_KEY = 'codedex_daily_date';
const RECEIPTS_VERSION = '1';

function recordKey(chapterId, lessonId) {
  return `${String(chapterId)}:${String(lessonId)}`;
}

function readRecord(storage, key) {
  try {
    const value = JSON.parse(storage.getItem(key) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function safeCount(value) {
  const parsed = Number.parseInt(value || '0', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function initializeLessonCompletionReceipts(
  progress,
  storage = getActivePlayerStorage(),
) {
  if (storage.getItem(COMPLETION_RECEIPTS_VERSION_KEY) === RECEIPTS_VERSION) return;
  const receipts = readRecord(storage, COMPLETION_RECEIPTS_KEY);
  if (progress && typeof progress === 'object' && !Array.isArray(progress)) {
    for (const [chapterId, lessons] of Object.entries(progress)) {
      if (!lessons || typeof lessons !== 'object' || Array.isArray(lessons)) continue;
      for (const lessonId of Object.keys(lessons)) {
        receipts[recordKey(chapterId, lessonId)] = true;
      }
    }
  }
  storage.setItem(COMPLETION_RECEIPTS_KEY, JSON.stringify(receipts));
  storage.setItem(COMPLETION_RECEIPTS_VERSION_KEY, RECEIPTS_VERSION);
}

export function hasLessonCompletionReceipt(
  chapterId,
  lessonId,
  storage = getActivePlayerStorage(),
) {
  return readRecord(storage, COMPLETION_RECEIPTS_KEY)[recordKey(chapterId, lessonId)] === true;
}

export function markLessonCompletionReceipt(
  chapterId,
  lessonId,
  storage = getActivePlayerStorage(),
) {
  const receipts = readRecord(storage, COMPLETION_RECEIPTS_KEY);
  receipts[recordKey(chapterId, lessonId)] = true;
  storage.setItem(COMPLETION_RECEIPTS_KEY, JSON.stringify(receipts));
}

export function ensureLessonProgress({
  chapterId,
  lessonId,
  earnedXp,
  firstTry,
  storage = getActivePlayerStorage(),
}) {
  const progress = readRecord(storage, PROGRESS_KEY);
  const chapter = progress[chapterId]
    && typeof progress[chapterId] === 'object'
    && !Array.isArray(progress[chapterId])
    ? progress[chapterId]
    : {};
  const existing = chapter[lessonId];
  if (existing && typeof existing === 'object' && !Array.isArray(existing)) {
    return { record: { ...existing }, existed: true };
  }

  const record = {
    done: true,
    xp: Number.isFinite(earnedXp) ? earnedXp : 0,
    firstTry: firstTry === true,
  };
  chapter[lessonId] = record;
  progress[chapterId] = chapter;
  storage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  return { record: { ...record }, existed: false };
}

export function recordDailyLessonCompletionOnce(
  chapterId,
  lessonId,
  { storage = getActivePlayerStorage(), now = Date.now() } = {},
) {
  const today = new Date(now).toDateString();
  const storedLedger = readRecord(storage, DAILY_COMPLETION_EVENTS_KEY);
  const sameDay = storedLedger.date === today;
  const lessonIds = sameDay && Array.isArray(storedLedger.lessonIds)
    ? storedLedger.lessonIds.filter(value => typeof value === 'string')
    : [];
  const storedBaseCount = sameDay ? safeCount(storedLedger.baseCount) : 0;
  const currentCount = storage.getItem(DAILY_DATE_KEY) === today
    ? safeCount(storage.getItem(DAILY_COUNT_KEY))
    : 0;
  const externalCount = sameDay
    ? Math.max(0, currentCount - storedBaseCount - lessonIds.length)
    : currentCount;
  const baseCount = storedBaseCount + externalCount;
  const eventId = recordKey(chapterId, lessonId);
  if (!lessonIds.includes(eventId)) lessonIds.push(eventId);

  storage.setItem(DAILY_COMPLETION_EVENTS_KEY, JSON.stringify({
    date: today,
    baseCount,
    lessonIds,
  }));
  storage.setItem(DAILY_DATE_KEY, today);
  storage.setItem(DAILY_COUNT_KEY, String(baseCount + lessonIds.length));
  return baseCount + lessonIds.length;
}
