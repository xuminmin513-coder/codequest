import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LIMITS,
  validateRunRequest,
  validateWorkerResult,
} from '../src/runtime/pythonProtocol.js';

const validRequest = () => ({
  version: 1,
  runId: 'run-1',
  capability: 'cap-1',
  code: 'print(1)',
  input: '',
});

const validResult = () => ({
  version: 1,
  runId: 'run-1',
  capability: 'cap-1',
  status: 'passed',
  output: '1\n',
  error: null,
});

test('run request accepts only the fixed protocol shape', () => {
  assert.equal(validateRunRequest(validRequest()).ok, true);
  assert.equal(validateRunRequest({ ...validRequest(), extra: true }).ok, false);
  assert.equal(validateRunRequest({ ...validRequest(), version: 2 }).ok, false);
  assert.equal(validateRunRequest({ ...validRequest(), runId: '' }).ok, false);
  assert.equal(validateRunRequest({ ...validRequest(), capability: '' }).ok, false);
});

test('run request rejects oversized source and input', () => {
  assert.equal(
    validateRunRequest({ ...validRequest(), code: 'x'.repeat(LIMITS.code + 1) }).ok,
    false,
  );
  assert.equal(
    validateRunRequest({ ...validRequest(), input: 'x'.repeat(LIMITS.input + 1) }).ok,
    false,
  );
});

test('worker result must match run id and private capability', () => {
  assert.equal(validateWorkerResult(validResult(), 'run-1', 'cap-1').ok, true);
  assert.equal(validateWorkerResult(validResult(), 'run-2', 'cap-1').ok, false);
  assert.equal(validateWorkerResult(validResult(), 'run-1', 'wrong').ok, false);
});

test('worker result rejects unknown statuses, fields, and oversized output', () => {
  assert.equal(validateWorkerResult({ ...validResult(), status: 'hacked' }, 'run-1', 'cap-1').ok, false);
  assert.equal(validateWorkerResult({ ...validResult(), extra: true }, 'run-1', 'cap-1').ok, false);
  assert.equal(
    validateWorkerResult(
      { ...validResult(), output: 'x'.repeat(LIMITS.output + 1) },
      'run-1',
      'cap-1',
    ).ok,
    false,
  );
});
