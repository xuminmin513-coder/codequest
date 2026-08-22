# xmmcode V2 Phase A Trusted Practice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a trustworthy V2 practice foundation in which every challenge opens with an empty editor, no answer can be auto-filled, every declared test runs, progress can migrate safely, badges use dynamic totals, and the course ends on a graduation page.

**Architecture:** Keep the current React/Electron application and current simulator only as a temporary Phase A execution adapter. Introduce pure curriculum, judging, navigation, and migration modules with Node tests so later phases can replace the runner and lesson UI without rewriting policy. Project all existing course records through a V2 curriculum adapter that guarantees an empty editor immediately, while Phase D later removes obsolete starter text from the source records and rewrites all lesson content.

**Tech Stack:** React 18, Electron, Vite, CodeMirror 6, Node `node:test`, Playwright Electron automation, existing JavaScript Python simulator.

---

## Scope and follow-on plans

The approved V2 specification spans four independent subsystems. This plan implements only Phase A as a working, testable release. After Phase A passes its acceptance gate, write and execute separate plans for:

1. Phase B — three-stage lesson flow, four-layer hints, beginner error feedback, and Chapter 1 pilot;
2. Phase C — isolated WebAssembly Python runner and labeled visual labs;
3. Phase D — all 104 lesson rewrites, hidden tests, structural checks, chapter projects, mastery review, and graduation report enrichment.

Do not add Pyodide, charts, thread labs, Socket labs, or PySpark labs in Phase A. Do not rewrite unrelated visual styling.

## File responsibility map

- `src/data/curriculum.js`: curriculum version, runtime projection, validation, and totals.
- `src/data/courses.js`: raw course content; exports the projected curriculum.
- `src/utils/lessonJudge.js`: execute all tests and compare outputs consistently.
- `src/utils/curriculumNavigation.js`: determine the next lesson or graduation destination.
- `src/utils/curriculumMigration.js`: archive, restart, keep, and restore curriculum progress.
- `src/components/Lesson.jsx`: invoke the judge, always initialize challenges from player-owned drafts, and remove answer UI.
- `src/components/CurriculumMigrationModal.jsx`: let an existing player keep progress or begin V2 from zero.
- `src/components/Graduation.jsx`: terminal course-completion page.
- `src/utils/gamification.js`: dynamic halfway and all-course badge rules.
- `tests/*.test.js`: pure unit and source-contract tests using Node's built-in runner.
- `tests/phase-a.e2e.mjs`: Electron smoke test for the user-visible Phase A contract.
- `scripts/validate-curriculum.mjs`: repository-wide curriculum audit used locally and in CI.

### Task 1: Add a zero-dependency test harness

**Files:**
- Modify: `package.json`
- Create: `tests/helpers/memoryStorage.js`
- Create: `tests/smoke.test.js`

- [ ] **Step 1: Write the failing smoke test**

Create `tests/smoke.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';

test('memory storage follows the localStorage contract used by the app', () => {
  const storage = createMemoryStorage({ codedex_lang: 'zh' });
  assert.equal(storage.getItem('codedex_lang'), 'zh');
  storage.setItem('codedex_lang', 'en');
  assert.equal(storage.getItem('codedex_lang'), 'en');
  storage.removeItem('codedex_lang');
  assert.equal(storage.getItem('codedex_lang'), null);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/smoke.test.js`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `tests/helpers/memoryStorage.js`.

- [ ] **Step 3: Implement the in-memory storage helper**

Create `tests/helpers/memoryStorage.js`:

```js
export function createMemoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial).map(([key, value]) => [key, String(value)]));
  return {
    get length() { return values.size; },
    key(index) { return [...values.keys()][index] ?? null; },
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
    clear() { values.clear(); },
    dump() { return Object.fromEntries(values); },
  };
}
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "test": "node --test tests/*.test.js",
    "test:e2e": "node --test tests/phase-a.e2e.mjs",
    "validate:curriculum": "node scripts/validate-curriculum.mjs"
  }
}
```

Keep the existing `dev`, `build`, `preview`, `server`, and `electron` scripts unchanged.

- [ ] **Step 4: Run the smoke test**

Run: `npm test`

Expected: PASS, 1 test and 0 failures.

- [ ] **Step 5: Commit**

```bash
git add package.json tests/helpers/memoryStorage.js tests/smoke.test.js
git commit -m "test: add phase a node test harness"
```

### Task 2: Project every lesson into a blank-editor V2 curriculum

**Files:**
- Create: `src/data/curriculum.js`
- Modify: `src/data/courses.js`
- Create: `tests/curriculum.test.js`

- [ ] **Step 1: Write curriculum contract tests**

Create `tests/curriculum.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS } from '../src/data/courses.js';
import {
  CURRICULUM_VERSION,
  getCurriculumStats,
  validateCurriculum,
} from '../src/data/curriculum.js';

test('V2 curriculum keeps the current 104 lesson inventory', () => {
  const stats = getCurriculumStats(CHAPTERS);
  assert.equal(CURRICULUM_VERSION, 2);
  assert.equal(stats.chapters, 26);
  assert.equal(stats.lessons, 104);
});

test('every formal challenge starts empty', () => {
  for (const chapter of CHAPTERS) {
    for (const lesson of chapter.lessons) {
      assert.equal(lesson.starterCode, '', lesson.id);
      assert.equal(lesson.curriculumVersion, 2, lesson.id);
    }
  }
});

test('curriculum IDs and public tests are valid', () => {
  assert.deepEqual(validateCurriculum(CHAPTERS), []);
});
```

- [ ] **Step 2: Run the curriculum test to verify it fails**

Run: `node --test tests/curriculum.test.js`

Expected: FAIL because `src/data/curriculum.js` does not exist.

- [ ] **Step 3: Implement curriculum projection and validation**

Create `src/data/curriculum.js`:

```js
export const CURRICULUM_VERSION = 2;

export function prepareCurriculum(rawChapters) {
  return rawChapters.map(chapter => ({
    ...chapter,
    curriculumVersion: CURRICULUM_VERSION,
    lessons: chapter.lessons.map(lesson => ({
      ...lesson,
      curriculumVersion: CURRICULUM_VERSION,
      starterCode: '',
    })),
  }));
}

export function getCurriculumStats(chapters) {
  return {
    chapters: chapters.length,
    lessons: chapters.reduce((total, chapter) => total + chapter.lessons.length, 0),
  };
}

export function validateCurriculum(chapters) {
  const errors = [];
  const chapterIds = new Set();
  const lessonIds = new Set();

  for (const chapter of chapters) {
    if (chapterIds.has(chapter.id)) errors.push(`duplicate chapter id: ${chapter.id}`);
    chapterIds.add(chapter.id);
    if (!Array.isArray(chapter.lessons) || chapter.lessons.length === 0) {
      errors.push(`chapter has no lessons: ${chapter.id}`);
      continue;
    }

    for (const lesson of chapter.lessons) {
      if (lessonIds.has(lesson.id)) errors.push(`duplicate lesson id: ${lesson.id}`);
      lessonIds.add(lesson.id);
      if ((lesson.starterCode || '') !== '') errors.push(`starter code is not empty: ${lesson.id}`);
      if (!Array.isArray(lesson.testCases) || lesson.testCases.length === 0) {
        errors.push(`lesson has no public tests: ${lesson.id}`);
      }
      if (!lesson.answer?.trim()) errors.push(`lesson has no maintained reference solution: ${lesson.id}`);
    }
  }

  return errors;
}
```

At the top of `src/data/courses.js`, add:

```js
import { prepareCurriculum } from './curriculum.js';
```

Rename the existing export declaration:

```js
const RAW_CHAPTERS = [
```

After the final closing `];`, add:

```js
export const CHAPTERS = prepareCurriculum(RAW_CHAPTERS);
```

- [ ] **Step 4: Run curriculum tests**

Run: `node --test tests/curriculum.test.js`

Expected: PASS, 3 tests and 0 failures.

- [ ] **Step 5: Build to catch module-cycle or syntax errors**

Run: `npm run build`

Expected: exit 0 and a Vite production bundle in `dist/`.

- [ ] **Step 6: Commit**

```bash
git add src/data/curriculum.js src/data/courses.js tests/curriculum.test.js
git commit -m "feat: enforce blank V2 challenges"
```

### Task 3: Execute every declared test with exact output semantics

**Files:**
- Create: `src/utils/lessonJudge.js`
- Create: `tests/lessonJudge.test.js`
- Modify: `src/components/Lesson.jsx`

- [ ] **Step 1: Write judge tests**

Create `tests/lessonJudge.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { judgeLesson, normalizeOutput } from '../src/utils/lessonJudge.js';

test('normalization changes line endings and one terminal newline only', () => {
  assert.equal(normalizeOutput('a b\r\n'), 'a b');
  assert.notEqual(normalizeOutput('a b\n'), normalizeOutput('ab\n'));
});

test('judge runs every test and reports a later failure', async () => {
  const seen = [];
  const report = await judgeLesson({
    code: 'print(input())',
    testCases: [
      { input: 'first', expected: 'first' },
      { input: 'second', expected: 'expected-second' },
    ],
    execute: async (_code, input) => {
      seen.push(input);
      return { output: input, error: null };
    },
  });
  assert.deepEqual(seen, ['first', 'second']);
  assert.equal(report.passed, false);
  assert.equal(report.failedCase, 2);
});

test('judge preserves runtime errors', async () => {
  const report = await judgeLesson({
    code: 'bad',
    testCases: [{ input: '', expected: '' }],
    execute: async () => ({ output: '', error: 'SyntaxError: invalid syntax' }),
  });
  assert.equal(report.passed, false);
  assert.match(report.error, /SyntaxError/);
});
```

- [ ] **Step 2: Run the judge tests to verify they fail**

Run: `node --test tests/lessonJudge.test.js`

Expected: FAIL because `src/utils/lessonJudge.js` does not exist.

- [ ] **Step 3: Implement the judge**

Create `src/utils/lessonJudge.js`:

```js
export function normalizeOutput(value = '') {
  return String(value)
    .replace(/^\uFEFF/, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\n$/, '');
}

export async function judgeLesson({ code, testCases, execute }) {
  const cases = testCases?.length ? testCases : [{ input: '', expected: '' }];
  const results = [];

  for (let index = 0; index < cases.length; index += 1) {
    const testCase = cases[index];
    const execution = await execute(code, testCase.input || '');
    const actual = normalizeOutput(execution.output);
    const expected = normalizeOutput(testCase.expected);
    const result = {
      caseNumber: index + 1,
      passed: !execution.error && actual === expected,
      actual,
      expected,
      error: execution.error || null,
    };
    results.push(result);

    if (!result.passed) {
      return {
        passed: false,
        failedCase: result.caseNumber,
        error: result.error,
        output: execution.output || '',
        expected,
        results,
      };
    }
  }

  return {
    passed: true,
    failedCase: null,
    error: null,
    output: results.at(-1)?.actual || '',
    expected: results.at(-1)?.expected || '',
    results,
  };
}
```

- [ ] **Step 4: Run judge tests**

Run: `node --test tests/lessonJudge.test.js`

Expected: PASS, 3 tests and 0 failures.

- [ ] **Step 5: Replace inline first-case judging in `Lesson.jsx`**

Import the new judge:

```js
import { judgeLesson } from '../utils/lessonJudge';
```

Make `handleRun` asynchronous and replace `simulatePython(code, testCases[0].input)` plus the current whitespace-stripping comparison with:

```js
const report = await judgeLesson({
  code,
  testCases,
  execute: async (source, input) => simulatePython(source, input),
});

if (report.error) {
  outputEl.textContent = `❌ ${report.error}`;
  outputEl.className = 'terminal-content error';
  setIsFirstTry(false);
  return;
}

if (report.passed) {
  const outText = report.output ? `${report.output}\n\n` : '';
  outputEl.textContent = outText + '🎉 ' + (lang === 'zh' ? '恭喜通关！' : 'Level Complete!');
  outputEl.className = 'terminal-content success';
  if (pageData?.reviewMode) onReviewComplete(les, ch);
  else onLessonComplete(les, ch);
  return;
}

outputEl.textContent = lang === 'zh'
  ? `❌ 第 ${report.failedCase} 组测试未通过。\n--- 你的输出 ---\n${report.output || '(无输出)'}\n--- 期望输出 ---\n${report.expected}`
  : `❌ Test ${report.failedCase} failed.\n--- Your output ---\n${report.output || '(no output)'}\n--- Expected ---\n${report.expected}`;
outputEl.className = 'terminal-content error';
setIsFirstTry(false);
```

Remove the old `normalize`, `stripWs`, `actual`, `expected`, and `matched` block.

- [ ] **Step 6: Run all unit tests and build**

Run: `npm test && npm run build`

Expected: all Node tests PASS and Vite exits 0.

- [ ] **Step 7: Commit**

```bash
git add src/utils/lessonJudge.js src/components/Lesson.jsx tests/lessonJudge.test.js
git commit -m "fix: run every lesson test exactly"
```

### Task 4: Remove answer injection and starter loading from the lesson UI

**Files:**
- Modify: `src/components/Lesson.jsx`
- Create: `tests/lessonUiContract.test.js`

- [ ] **Step 1: Write source-contract tests**

Create `tests/lessonUiContract.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('lesson UI cannot auto-fill a reference answer', async () => {
  const source = await readFile(new URL('../src/components/Lesson.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /handleShowAnswer/);
  assert.doesNotMatch(source, /查看答案|Reference answer filled|>Answer</);
});

test('lesson initialization never loads starterCode', async () => {
  const source = await readFile(new URL('../src/components/Lesson.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /les\.starterCode/);
});
```

- [ ] **Step 2: Run the contract tests to verify they fail**

Run: `node --test tests/lessonUiContract.test.js`

Expected: FAIL on both contracts.

- [ ] **Step 3: Remove answer injection**

Delete `handleShowAnswer` from `src/components/Lesson.jsx`. Delete this button block:

```jsx
{!isReviewMode && les.answer && (
  <button className="btn btn-pixel btn-ghost" onClick={handleShowAnswer}>
    {'💡'} {lang === 'zh' ? '查看答案' : 'Answer'}
  </button>
)}
```

- [ ] **Step 4: Initialize only player-owned drafts**

In review mode, set the editor to `''`. In normal mode, load only saved player code:

```js
setTimeout(() => {
  const playerDraft = pageData?.reviewMode ? '' : STORAGE.loadCode(les.id);
  if (editorRef.current) {
    editorRef.current.setCode(playerDraft || '');
    editorRef.current.focus();
  }
}, 100);
```

Keep `STORAGE.clearCode(les.id)` for review mode and successful completion.

- [ ] **Step 5: Run contract tests and build**

Run: `npm test && npm run build`

Expected: all tests PASS; production build exits 0.

- [ ] **Step 6: Commit**

```bash
git add src/components/Lesson.jsx tests/lessonUiContract.test.js
git commit -m "fix: require player-authored challenge code"
```

### Task 5: Make badge thresholds curriculum-driven

**Files:**
- Modify: `src/utils/gamification.js`
- Modify: `src/components/Lesson.jsx`
- Create: `tests/gamification.test.js`

- [ ] **Step 1: Write dynamic-threshold tests**

Create `tests/gamification.test.js`:

```js
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
```

- [ ] **Step 2: Run tests to verify the hard-coded rules fail**

Run: `node --test tests/gamification.test.js`

Expected: FAIL because the current rules require 52 and 104 lessons.

- [ ] **Step 3: Replace hard-coded badge rules**

In `src/utils/gamification.js`, replace the halfway and completion badges with:

```js
{
  id: 'halfway',
  name: 'Halfway There',
  nameCn: '半程冠军',
  icon: '🏃',
  desc: 'Complete half of all lessons',
  descCn: '完成一半课程',
  condition: stats => stats.totalLessons > 0 && stats.completedLessons >= Math.ceil(stats.totalLessons / 2),
},
{
  id: 'all_done',
  name: 'Python Master',
  nameCn: 'Python大师',
  icon: '🏆',
  desc: 'Complete all lessons',
  descCn: '完成所有课程',
  condition: stats => stats.totalLessons > 0 && stats.completedLessons >= stats.totalLessons,
},
```

In both lesson-completion and review badge stats inside `Lesson.jsx`, add:

```js
totalLessons: CHAPTERS.reduce((sum, chapter) => sum + chapter.lessons.length, 0),
```

- [ ] **Step 4: Run tests and build**

Run: `npm test && npm run build`

Expected: all tests PASS and build exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/utils/gamification.js src/components/Lesson.jsx tests/gamification.test.js
git commit -m "fix: derive badges from curriculum totals"
```

### Task 6: Add an explicit graduation destination

**Files:**
- Create: `src/utils/curriculumNavigation.js`
- Create: `src/components/Graduation.jsx`
- Modify: `src/components/Lesson.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/global.css`
- Create: `tests/curriculumNavigation.test.js`

- [ ] **Step 1: Write navigation tests**

Create `tests/curriculumNavigation.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextDestination } from '../src/utils/curriculumNavigation.js';

const chapters = [
  { id: 'a', lessons: [{ id: 'a1' }, { id: 'a2' }] },
  { id: 'b', lessons: [{ id: 'b1' }] },
];

test('next lesson in the same chapter is selected', () => {
  assert.deepEqual(getNextDestination(chapters, 'a', 'a1'), {
    page: 'lesson', data: { chapterId: 'a', lessonId: 'a2' },
  });
});

test('first lesson in the next chapter is selected', () => {
  assert.deepEqual(getNextDestination(chapters, 'a', 'a2'), {
    page: 'lesson', data: { chapterId: 'b', lessonId: 'b1' },
  });
});

test('final lesson leads to graduation', () => {
  assert.deepEqual(getNextDestination(chapters, 'b', 'b1'), {
    page: 'graduation', data: null,
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/curriculumNavigation.test.js`

Expected: FAIL because the navigation module does not exist.

- [ ] **Step 3: Implement navigation**

Create `src/utils/curriculumNavigation.js`:

```js
export function getNextDestination(chapters, chapterId, lessonId) {
  const chapterIndex = chapters.findIndex(chapter => chapter.id === chapterId);
  const chapter = chapters[chapterIndex];
  if (!chapter) return { page: 'courses', data: null };

  const lessonIndex = chapter.lessons.findIndex(lesson => lesson.id === lessonId);
  if (lessonIndex >= 0 && lessonIndex < chapter.lessons.length - 1) {
    return {
      page: 'lesson',
      data: { chapterId, lessonId: chapter.lessons[lessonIndex + 1].id },
    };
  }

  const nextChapter = chapters[chapterIndex + 1];
  if (nextChapter) {
    return {
      page: 'lesson',
      data: { chapterId: nextChapter.id, lessonId: nextChapter.lessons[0].id },
    };
  }

  return { page: 'graduation', data: null };
}
```

- [ ] **Step 4: Route final completion to graduation**

In `Lesson.jsx`, import `getNextDestination` and replace `goToNext` with:

```js
const goToNext = () => {
  if (!lessonData) return;
  const destination = getNextDestination(CHAPTERS, lessonData.ch.id, lessonData.les.id);
  if (destination.page === 'lesson') {
    loadLesson(destination.data.chapterId, destination.data.lessonId);
  } else {
    navigateTo(destination.page, destination.data);
  }
};
```

- [ ] **Step 5: Create the graduation page**

Create `src/components/Graduation.jsx`:

```jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';
import { CHAPTERS } from '../data/courses';

export default function Graduation() {
  const { lang, navigateTo } = useApp();
  const totalLessons = CHAPTERS.reduce((sum, chapter) => sum + chapter.lessons.length, 0);
  const completed = STORAGE.getCompletedCount();
  const finished = completed >= totalLessons;

  return (
    <div className="page active graduation-page">
      <div className="graduation-icon">🏆</div>
      <h1>{lang === 'zh' ? 'Python 冒险毕业！' : 'Python Adventure Complete!'}</h1>
      <p>
        {finished
          ? (lang === 'zh' ? `你已经完成全部 ${totalLessons} 个关卡。` : `You completed all ${totalLessons} lessons.`)
          : (lang === 'zh' ? `当前完成 ${completed}/${totalLessons} 个关卡。` : `${completed}/${totalLessons} lessons complete.`)}
      </p>
      <div className="graduation-actions">
        <button className="btn btn-pixel btn-primary" onClick={() => navigateTo('reviews')}>
          {lang === 'zh' ? '开始巩固复习' : 'Start Review'}
        </button>
        <button className="btn btn-pixel btn-ghost" onClick={() => navigateTo('dashboard')}>
          {lang === 'zh' ? '返回仪表盘' : 'Back to Dashboard'}
        </button>
      </div>
    </div>
  );
}
```

Import `Graduation` in `src/App.jsx` and add:

```jsx
case 'graduation':
  return <Graduation />;
```

Add focused styles to `src/styles/global.css`:

```css
.graduation-page {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 18px;
}
.graduation-icon { font-size: 88px; }
.graduation-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
```

- [ ] **Step 6: Run tests and build**

Run: `npm test && npm run build`

Expected: all tests PASS and build exits 0.

- [ ] **Step 7: Commit**

```bash
git add src/utils/curriculumNavigation.js src/components/Graduation.jsx src/components/Lesson.jsx src/App.jsx src/styles/global.css tests/curriculumNavigation.test.js
git commit -m "feat: add course graduation flow"
```

### Task 7: Add reversible V2 progress migration

**Files:**
- Create: `src/utils/curriculumMigration.js`
- Create: `src/components/CurriculumMigrationModal.jsx`
- Modify: `src/utils/storage.js`
- Modify: `src/App.jsx`
- Modify: `src/components/Settings.jsx`
- Modify: `src/styles/global.css`
- Create: `tests/curriculumMigration.test.js`

- [ ] **Step 1: Write migration tests**

Create `tests/curriculumMigration.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import {
  CURRICULUM_STORAGE_VERSION,
  needsCurriculumChoice,
  keepExistingProgress,
  restartForV2,
  restoreArchive,
} from '../src/utils/curriculumMigration.js';

const oldData = {
  codedex_progress: JSON.stringify({ ch1: { ch1_01: { done: true, xp: 60 } } }),
  codedex_badges: JSON.stringify(['first_code']),
  codedex_lang: 'zh',
};

test('existing unversioned progress requires a migration choice', () => {
  assert.equal(needsCurriculumChoice(createMemoryStorage(oldData)), true);
  assert.equal(needsCurriculumChoice(createMemoryStorage()), false);
});

test('keeping progress archives it and leaves active progress intact', () => {
  const storage = createMemoryStorage(oldData);
  keepExistingProgress(storage, 1000);
  assert.equal(storage.getItem('codedex_progress'), oldData.codedex_progress);
  assert.equal(storage.getItem('codedex_curriculum_version'), CURRICULUM_STORAGE_VERSION);
  assert.ok(JSON.parse(storage.getItem('codedex_curriculum_archives')).length === 1);
});

test('restarting archives learning data, clears active progress, and preserves language', () => {
  const storage = createMemoryStorage(oldData);
  const archiveId = restartForV2(storage, 1000);
  assert.equal(storage.getItem('codedex_progress'), null);
  assert.equal(storage.getItem('codedex_badges'), null);
  assert.equal(storage.getItem('codedex_lang'), 'zh');
  restoreArchive(storage, archiveId, 2000);
  assert.equal(storage.getItem('codedex_progress'), oldData.codedex_progress);
  assert.equal(storage.getItem('codedex_badges'), oldData.codedex_badges);
  assert.equal(JSON.parse(storage.getItem('codedex_curriculum_archives')).length, 2);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/curriculumMigration.test.js`

Expected: FAIL because the migration module does not exist.

- [ ] **Step 3: Implement pure migration logic**

Create `src/utils/curriculumMigration.js`:

```js
export const CURRICULUM_STORAGE_VERSION = 'v2';
export const VERSION_KEY = 'codedex_curriculum_version';
export const ARCHIVES_KEY = 'codedex_curriculum_archives';

const LEARNING_KEYS = [
  'codedex_progress', 'codedex_streak', 'codedex_badges', 'codedex_perfect',
  'codedex_daily_count', 'codedex_daily_date', 'codedex_saved_code',
  'codedex_last_lesson', 'codedex_review', 'codedex_review_xp',
  'codedex_skill_unlocks',
];

function snapshot(storage) {
  return Object.fromEntries(
    LEARNING_KEYS
      .map(key => [key, storage.getItem(key)])
      .filter(([, value]) => value !== null),
  );
}

function addArchive(storage, now) {
  const archives = JSON.parse(storage.getItem(ARCHIVES_KEY) || '[]');
  const archive = { id: `legacy-${now}`, createdAt: now, data: snapshot(storage) };
  archives.push(archive);
  storage.setItem(ARCHIVES_KEY, JSON.stringify(archives));
  return archive.id;
}

export function needsCurriculumChoice(storage) {
  return !storage.getItem(VERSION_KEY) && Boolean(storage.getItem('codedex_progress'));
}

export function keepExistingProgress(storage, now = Date.now()) {
  addArchive(storage, now);
  storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
}

export function restartForV2(storage, now = Date.now()) {
  const archiveId = addArchive(storage, now);
  for (const key of LEARNING_KEYS) storage.removeItem(key);
  storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
  return archiveId;
}

export function restoreArchive(storage, archiveId, now = Date.now()) {
  const archives = JSON.parse(storage.getItem(ARCHIVES_KEY) || '[]');
  const archive = archives.find(item => item.id === archiveId);
  if (!archive) throw new Error(`Archive not found: ${archiveId}`);
  addArchive(storage, now);
  for (const key of LEARNING_KEYS) storage.removeItem(key);
  for (const [key, value] of Object.entries(archive.data)) storage.setItem(key, value);
  storage.setItem(VERSION_KEY, CURRICULUM_STORAGE_VERSION);
}
```

- [ ] **Step 4: Run migration tests**

Run: `node --test tests/curriculumMigration.test.js`

Expected: PASS, 3 tests and 0 failures.

- [ ] **Step 5: Expose migration through `STORAGE`**

Import the pure functions in `src/utils/storage.js` and add methods:

```js
needsCurriculumChoice() {
  return needsCurriculumChoice(localStorage);
},
keepExistingProgress() {
  keepExistingProgress(localStorage);
},
restartForV2() {
  return restartForV2(localStorage);
},
getCurriculumArchives() {
  return JSON.parse(localStorage.getItem(ARCHIVES_KEY) || '[]');
},
restoreCurriculumArchive(archiveId) {
  restoreArchive(localStorage, archiveId);
},
```

Add `VERSION_KEY` and `ARCHIVES_KEY` to `exportAllData()` so backups include migration metadata and archives.

- [ ] **Step 6: Create the migration choice modal**

Create `src/components/CurriculumMigrationModal.jsx`:

```jsx
import React from 'react';

export default function CurriculumMigrationModal({ lang, onKeep, onRestart }) {
  return (
    <div className="modal-overlay curriculum-migration-overlay">
      <div className="modal-content curriculum-migration-modal">
        <div className="modal-icon">🧭</div>
        <h2>{lang === 'zh' ? '欢迎进入新版课程' : 'Welcome to the new curriculum'}</h2>
        <p>{lang === 'zh'
          ? '旧进度会先安全归档。你可以保留当前完成状态，也可以从第一关重新学习新版课程。'
          : 'Your old progress will be archived safely. Keep your completion state or restart the new curriculum.'}</p>
        <div className="curriculum-migration-actions">
          <button className="btn btn-pixel btn-ghost" onClick={onKeep}>
            {lang === 'zh' ? '保留当前进度' : 'Keep Progress'}
          </button>
          <button className="btn btn-pixel btn-primary" onClick={onRestart}>
            {lang === 'zh' ? '从第一关重新学习' : 'Restart V2'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

In `AppContent`, hold `showMigration` initialized from `STORAGE.needsCurriculumChoice()`. Render the modal above `Toast`; each choice calls the corresponding storage method, closes the modal, calls `refresh()`, and navigates to `dashboard`.

In `Settings.jsx`, read `const curriculumArchives = STORAGE.getCurriculumArchives();` and add this section inside the data-management card so archived progress is visible and restorable:

```jsx
{curriculumArchives.length > 0 && (
  <div className="curriculum-archives">
    <div className="setting-label">
      {lang === 'zh' ? '历史课程存档' : 'Curriculum Archives'}
    </div>
    {curriculumArchives.map(archive => (
      <div className="setting-item" key={archive.id}>
        <div>
          <div className="setting-label">
            {lang === 'zh' ? '旧版学习记录' : 'Legacy learning record'}
          </div>
          <div className="setting-desc">
            {new Date(archive.createdAt).toLocaleString()}
          </div>
        </div>
        <button
          className="toggle-btn"
          onClick={() => {
            if (!window.confirm(lang === 'zh' ? '恢复此历史存档？当前新版进度也会自动归档。' : 'Restore this archive? Your current V2 progress will also be archived.')) return;
            STORAGE.restoreCurriculumArchive(archive.id);
            refresh();
            window.location.reload();
          }}
        >
          {lang === 'zh' ? '恢复' : 'Restore'}
        </button>
      </div>
    ))}
  </div>
)}
```

This UI never deletes an archive. Restoring first archives the active V2 data, and the existing export path includes every archive.

Add styles:

```css
.curriculum-migration-modal { max-width: 560px; }
.curriculum-migration-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.curriculum-archives { margin-top: 18px; display: grid; gap: 10px; }
```

- [ ] **Step 7: Run tests and build**

Run: `npm test && npm run build`

Expected: all tests PASS and build exits 0.

- [ ] **Step 8: Commit**

```bash
git add src/utils/curriculumMigration.js src/utils/storage.js src/components/CurriculumMigrationModal.jsx src/components/Settings.jsx src/App.jsx src/styles/global.css tests/curriculumMigration.test.js
git commit -m "feat: add reversible V2 progress migration"
```

### Task 8: Add a repeatable curriculum audit command

**Files:**
- Create: `scripts/validate-curriculum.mjs`
- Create: `tests/curriculumAudit.test.js`
- Modify: `package.json`

- [ ] **Step 1: Write the audit test**

Create `tests/curriculumAudit.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { auditCurriculum } from '../scripts/validate-curriculum.mjs';

test('current reference solutions pass every declared test', async () => {
  const report = await auditCurriculum();
  assert.equal(report.lessonCount, 104);
  assert.equal(report.testCount, 106);
  assert.deepEqual(report.errors, []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/curriculumAudit.test.js`

Expected: FAIL because `scripts/validate-curriculum.mjs` does not exist.

- [ ] **Step 3: Implement the audit script**

Create `scripts/validate-curriculum.mjs`:

```js
import { pathToFileURL } from 'node:url';
import { CHAPTERS } from '../src/data/courses.js';
import { validateCurriculum } from '../src/data/curriculum.js';
import { judgeLesson } from '../src/utils/lessonJudge.js';
import { simulatePython } from '../src/utils/transpiler.js';

export async function auditCurriculum() {
  const errors = validateCurriculum(CHAPTERS);
  let lessonCount = 0;
  let testCount = 0;

  for (const chapter of CHAPTERS) {
    for (const lesson of chapter.lessons) {
      lessonCount += 1;
      testCount += lesson.testCases.length;
      const report = await judgeLesson({
        code: lesson.answer,
        testCases: lesson.testCases,
        execute: async (code, input) => simulatePython(code, input),
      });
      if (!report.passed) {
        errors.push(`${lesson.id}: reference solution failed test ${report.failedCase}: ${report.error || report.output}`);
      }
    }
  }

  return { lessonCount, testCount, errors };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = await auditCurriculum();
  console.log(JSON.stringify(report, null, 2));
  if (report.errors.length) process.exitCode = 1;
}
```

Ensure `package.json` contains:

```json
"validate:curriculum": "node scripts/validate-curriculum.mjs"
```

- [ ] **Step 4: Run the audit test and command**

Run: `npm test && npm run validate:curriculum`

Expected: tests PASS; audit prints 104 lessons, 106 tests, and an empty `errors` array.

- [ ] **Step 5: Commit**

```bash
git add scripts/validate-curriculum.mjs tests/curriculumAudit.test.js package.json
git commit -m "test: audit every curriculum reference solution"
```

### Task 9: Add the Electron Phase A acceptance test

**Files:**
- Create: `tests/phase-a.e2e.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing Electron test**

Create `tests/phase-a.e2e.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { _electron as electron } from 'playwright';
import { CHAPTERS } from '../src/data/courses.js';

test('new player must author code and reaches a passing first lesson', async () => {
  const profile = await mkdtemp(join(tmpdir(), 'codedex-phase-a-'));
  const app = await electron.launch({
    args: ['main.cjs', `--user-data-dir=${profile}`],
    cwd: process.cwd(),
  });

  try {
    const page = await app.firstWindow();
    await page.getByText('继续学习', { exact: true }).click();
    await page.locator('.cm-content').waitFor();
    assert.equal(await page.locator('.cm-content').innerText(), '');
    assert.equal(await page.getByRole('button', { name: '💡 查看答案' }).count(), 0);

    await page.locator('.cm-content').fill(CHAPTERS[0].lessons[0].answer);
    await page.getByRole('button', { name: '▶ 运行' }).click();
    await page.getByText('🎉 恭喜通关！', { exact: false }).waitFor();
    assert.match(await page.locator('#lesson-output').innerText(), /恭喜通关/);
  } finally {
    await app.close();
    await rm(profile, { recursive: true, force: true });
  }
});
```

- [ ] **Step 2: Build and run the test before final fixes**

Run: `npm run build && npm run test:e2e`

Expected before Tasks 2–7 are complete: FAIL because the editor is prefilled or the answer button exists. If the tasks are already complete, temporarily verify the old behavior from the parent commit or rely on the recorded Task 4 red test; do not weaken the assertion.

- [ ] **Step 3: Confirm the package script**

Ensure `package.json` contains:

```json
"test:e2e": "node --test tests/phase-a.e2e.mjs"
```

- [ ] **Step 4: Run the Electron acceptance test**

Run: `npm run build && npm run test:e2e`

Expected: PASS, editor empty, answer button absent, first lesson completes.

- [ ] **Step 5: Commit**

```bash
git add tests/phase-a.e2e.mjs package.json
git commit -m "test: cover trusted practice Electron flow"
```

### Task 10: Phase A completion audit

**Files:**
- Modify only if verification reveals an in-scope defect.

- [ ] **Step 1: Verify the working tree scope**

Run:

```bash
git status --short
git diff --check
```

Expected: no accidental edits to `.gitignore`, `push-to-github.sh`, or unrelated user-owned changes. Preserve all pre-existing uncommitted work.

- [ ] **Step 2: Run the complete automated gate**

Run:

```bash
npm test
npm run validate:curriculum
npm run build
npm run test:e2e
```

Expected:

- all Node tests PASS;
- curriculum audit reports 104 lessons, 106 declared tests, and zero errors;
- Vite build exits 0;
- Electron acceptance test exits 0.

- [ ] **Step 3: Manually verify migration choices in isolated profiles**

Use two temporary Electron profiles:

1. seed old progress, choose “保留当前进度”, confirm progress remains and an archive exists;
2. seed old progress, choose “从第一关重新学习”, confirm dashboard shows 0/104 while the archive remains exportable.

Expected: neither path modifies the user's normal Electron profile.

- [ ] **Step 4: Manually verify the final lesson destination**

In an isolated profile, seed all lessons except the final lesson as completed, complete the final lesson, and click “下一关”.

Expected: the graduation page displays 104/104 and offers review and dashboard actions.

- [ ] **Step 5: Request code review**

Invoke `superpowers:requesting-code-review` with the Phase A spec and plan. Address only verified, in-scope findings.

- [ ] **Step 6: Record the Phase A baseline commit**

If verification fixes were needed:

```bash
git add <only-phase-a-files>
git commit -m "fix: close phase a acceptance gaps"
```

If no fixes were needed, do not create an empty commit.

## Phase A acceptance checklist

- [ ] Runtime curriculum contains 104 lessons and every `starterCode` is empty.
- [ ] Lesson UI contains no answer-fill handler or button.
- [ ] Normal and review challenges begin empty unless loading the player's own normal-mode draft.
- [ ] All 106 currently declared tests are executed by the audit; lesson judging stops only after recording the first failing case.
- [ ] Output comparison preserves meaningful whitespace.
- [ ] Halfway and completion badges use `stats.totalLessons`.
- [ ] Final lesson routes to graduation.
- [ ] Existing data receives a reversible keep/restart choice.
- [ ] Unit tests, curriculum audit, build, and Electron E2E all pass.
- [ ] Existing user-owned uncommitted files remain untouched.
