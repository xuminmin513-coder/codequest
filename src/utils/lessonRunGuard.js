export function createLessonRunGuard() {
  let activeToken = null;
  let nextId = 1;

  return {
    begin() {
      if (activeToken) return null;
      activeToken = { id: nextId };
      nextId += 1;
      return activeToken;
    },

    isCurrent(token) {
      return activeToken === token;
    },

    finish(token) {
      if (activeToken !== token) return false;
      activeToken = null;
      return true;
    },

    invalidate() {
      activeToken = null;
    },

    cancelCurrent() {
      const current = activeToken;
      activeToken = null;
      return current;
    },
  };
}
