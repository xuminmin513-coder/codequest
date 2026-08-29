import test from 'node:test';
import assert from 'node:assert/strict';
import { getLessonRuntimeMode } from '../src/runtime/runtimePolicy.js';

test('ordinary Python and SQLite lessons use the real Python worker', () => {
  assert.equal(getLessonRuntimeMode({ answer: "print('hello')" }), 'python');
  assert.equal(getLessonRuntimeMode({ answer: 'import sqlite3\nprint(sqlite3.sqlite_version)' }), 'python');
});

test('unmigrated visual and systems labs fail closed', () => {
  assert.equal(getLessonRuntimeMode({ answer: 'from pyecharts import Line' }), 'visual-lab-pending');
  assert.equal(getLessonRuntimeMode({ answer: 'from threading import Thread' }), 'visual-lab-pending');
  assert.equal(getLessonRuntimeMode({ answer: 'import socket' }), 'visual-lab-pending');
  assert.equal(getLessonRuntimeMode({ answer: 'from pyspark import SparkContext' }), 'visual-lab-pending');
});

test('runtime selection inspects maintained solution and lesson text', () => {
  assert.equal(
    getLessonRuntimeMode({ answer: '', content: '本关使用 import socket 学习连接流程' }),
    'visual-lab-pending',
  );
});
