import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPyodide } from 'pyodide';
import { CHAPTERS } from '../src/data/courses.js';
import { getLessonRuntimeMode } from '../src/runtime/runtimePolicy.js';
import { judgeLesson } from '../src/utils/lessonJudge.js';

function removeTree(FS, target) {
  const stat = FS.stat(target);
  if (!FS.isDir(stat.mode)) {
    FS.unlink(target);
    return;
  }
  for (const name of FS.readdir(target)) {
    if (name === '.' || name === '..') continue;
    removeTree(FS, `${target}/${name}`);
  }
  FS.rmdir(target);
}

function clearWorkspace(pyodide) {
  for (const name of pyodide.FS.readdir('/home/pyodide')) {
    if (name === '.' || name === '..') continue;
    removeTree(pyodide.FS, `/home/pyodide/${name}`);
  }
}

test('every runnable maintained answer passes its public tests', { timeout: 120000 }, async () => {
  const pyodide = await loadPyodide();
  const failures = [];

  const execute = async (code, input = '') => {
    clearWorkspace(pyodide);
    let output = '';
    const inputLines = input.replace(/\r\n?/g, '\n').split('\n');
    let inputIndex = 0;
    pyodide.setStdin({
      stdin: () => (inputIndex < inputLines.length ? inputLines[inputIndex++] : null),
      autoEOF: true,
    });
    pyodide.setStdout({ batched: value => { output += `${value}\n`; } });
    pyodide.setStderr({ batched: value => { output += `${value}\n`; } });

    const globals = pyodide.globals.get('dict')();
    globals.set('__name__', '__main__');
    try {
      await pyodide.runPythonAsync(code, { globals, filename: '<student>' });
      return { status: 'passed', output, error: null };
    } catch (error) {
      return {
        status: 'runtime_error',
        output,
        error: error?.message || String(error),
      };
    } finally {
      globals.destroy();
    }
  };

  for (const chapter of CHAPTERS) {
    for (const lesson of chapter.lessons) {
      if (getLessonRuntimeMode(lesson) !== 'python') continue;
      const report = await judgeLesson({
        code: lesson.answer,
        testCases: lesson.testCases,
        execute,
      });
      if (!report.passed) {
        const failed = report.results.at(-1);
        failures.push(`${lesson.id}: ${failed?.actual ?? report.output} != ${failed?.expected ?? report.expected}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});
