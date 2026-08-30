export function createCodeDraftSaver({
  save,
  onError = () => {},
  delayMs = 400,
  schedule = setTimeout,
  cancelSchedule = clearTimeout,
}) {
  if (typeof save !== 'function') throw new TypeError('Draft save function is required');
  let pending = null;
  let timer = null;

  const clearTimer = () => {
    if (timer !== null) cancelSchedule(timer);
    timer = null;
  };

  const flush = () => {
    clearTimer();
    if (!pending) return true;
    try {
      save(pending.lessonId, pending.code);
      pending = null;
      return true;
    } catch (error) {
      try { onError(error); } catch {}
      return false;
    }
  };

  const change = (lessonId, code) => {
    pending = { lessonId: String(lessonId), code: String(code) };
    clearTimer();
    timer = schedule(flush, delayMs);
  };

  const discard = () => {
    clearTimer();
    pending = null;
  };

  return {
    change,
    flush,
    discard,
    hasPending: () => pending !== null,
  };
}
