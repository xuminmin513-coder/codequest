export const PROTOCOL_VERSION = 1;

export const LIMITS = Object.freeze({
  code: 50 * 1024,
  input: 16 * 1024,
  output: 64 * 1024,
  timeoutDefault: 5000,
  timeoutMin: 250,
  timeoutMax: 10000,
});

export const RUN_STATUSES = Object.freeze([
  'passed',
  'runtime_error',
  'timeout',
  'stopped',
  'output_limit',
  'worker_crash',
  'invalid_request',
  'unsupported_lesson',
]);

const REQUEST_KEYS = Object.freeze(['capability', 'code', 'input', 'runId', 'version']);
const RESULT_KEYS = Object.freeze(['capability', 'error', 'output', 'runId', 'status', 'version']);
const STATUS_SET = new Set(RUN_STATUSES);

function hasExactKeys(value, expected) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value).sort();
  return keys.length === expected.length && keys.every((key, index) => key === expected[index]);
}

function isNonEmptyBoundedString(value, maxLength = 256) {
  return typeof value === 'string' && value.length > 0 && value.length <= maxLength;
}

function invalid() {
  return { ok: false, error: 'invalid_request' };
}

export function validateRunRequest(value) {
  if (!hasExactKeys(value, REQUEST_KEYS)) return invalid();
  if (value.version !== PROTOCOL_VERSION) return invalid();
  if (!isNonEmptyBoundedString(value.runId) || !isNonEmptyBoundedString(value.capability)) return invalid();
  if (typeof value.code !== 'string' || value.code.length > LIMITS.code) return invalid();
  if (typeof value.input !== 'string' || value.input.length > LIMITS.input) return invalid();
  return { ok: true, value };
}

export function validateWorkerResult(value, expectedRunId, expectedCapability) {
  if (!hasExactKeys(value, RESULT_KEYS)) return invalid();
  if (value.version !== PROTOCOL_VERSION) return invalid();
  if (value.runId !== expectedRunId || value.capability !== expectedCapability) return invalid();
  if (!STATUS_SET.has(value.status)) return invalid();
  if (typeof value.output !== 'string' || value.output.length > LIMITS.output) return invalid();
  if (value.error !== null && typeof value.error !== 'string') return invalid();
  if (typeof value.error === 'string' && value.error.length > LIMITS.output) return invalid();
  return { ok: true, value };
}
