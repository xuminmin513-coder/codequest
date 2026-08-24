const DEPRECATED_SECRET_KEYS = Object.freeze(['codedex_deepseek_key']);

export function purgeDeprecatedSecrets(storage = globalThis.localStorage) {
  if (!storage) return;
  for (const key of DEPRECATED_SECRET_KEYS) storage.removeItem(key);
}

export function isDeprecatedSecretKey(key) {
  return DEPRECATED_SECRET_KEYS.includes(key);
}
