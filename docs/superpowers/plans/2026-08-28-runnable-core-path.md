# Runnable Core Path Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every required lesson truthfully runnable and allow players to reach the graduation projects without completing the twelve unavailable optional labs.

**Architecture:** Add explicit optional-lab metadata to the curriculum and centralize required-path calculations in `curriculumNavigation.js`. React pages consume those pure helpers, while a Node/Pyodide regression test executes every maintained runnable answer through the same judge contract used by the game.

**Tech Stack:** React 18, Node test runner, Pyodide, Vite, Electron

---

### Task 1: Add a real-runtime curriculum answer audit

**Files:**
- Create: `tests/curriculumRuntime.test.js`

- [ ] **Step 1: Write the failing Pyodide audit**

Create a Node test that loads the installed Pyodide runtime once, resets `/home/pyodide` between cases, supplies test input without echoing it, and passes every runnable maintained answer through `judgeLesson`:

```js
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
      return { status: 'runtime_error', output, error: error?.message || String(error) };
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
      if (!report.passed) failures.push(`${lesson.id}: ${report.actual || report.output} != ${report.expected}`);
    }
  }

  assert.deepEqual(failures, []);
});
```

- [ ] **Step 2: Run the audit and verify RED**

Run: `node --test tests/curriculumRuntime.test.js`

Expected: FAIL listing the ten known lessons `ch2_05`, `ch11_03`, `ch11_04`, `ch14_04`, `ch17_03`, `ch19_01`, `ch19_02`, `ch19_03`, `ch23_01`, and `ch9_01`.

- [ ] **Step 3: Commit the failing regression test**

```bash
git add tests/curriculumRuntime.test.js
git commit -m "test: audit maintained curriculum answers"
```

### Task 2: Define and test the required curriculum path

**Files:**
- Modify: `tests/curriculumNavigation.test.js`
- Modify: `src/utils/curriculumNavigation.js`

- [ ] **Step 1: Add failing required-path tests**

Extend the fixture with an optional chapter between the core and final chapters, then assert required inventory, unlocks, navigation, dashboard continuation, and graduation totals:

```js
import {
  getGraduationProgress,
  getNextDestination,
  getNextRequiredLesson,
  getPreviousRequiredChapter,
  getRequiredChapters,
  getRequiredLessonCount,
  isChapterUnlocked,
} from '../src/utils/curriculumNavigation.js';

const pathWithOptionalLab = [
  { id: 'core', lessons: [{ id: 'core1' }] },
  { id: 'lab', optional: true, availability: 'in-development', lessons: [{ id: 'lab1' }] },
  { id: 'final', lessons: [{ id: 'final1' }] },
];

test('required inventory excludes optional labs', () => {
  assert.deepEqual(getRequiredChapters(pathWithOptionalLab).map(chapter => chapter.id), ['core', 'final']);
  assert.equal(getRequiredLessonCount(pathWithOptionalLab), 2);
});

test('required navigation skips optional labs', () => {
  assert.deepEqual(getNextDestination(pathWithOptionalLab, 'core', 'core1'), {
    page: 'lesson',
    data: { chapterId: 'final', lessonId: 'final1' },
  });
  assert.deepEqual(getNextDestination(pathWithOptionalLab, 'final', 'final1'), {
    page: 'graduation',
    data: null,
  });
});

test('optional labs and final projects share the previous required prerequisite', () => {
  assert.equal(getPreviousRequiredChapter(pathWithOptionalLab, 'lab').id, 'core');
  assert.equal(getPreviousRequiredChapter(pathWithOptionalLab, 'final').id, 'core');
  assert.equal(isChapterUnlocked(pathWithOptionalLab, 'lab', {}), false);
  assert.equal(isChapterUnlocked(pathWithOptionalLab, 'final', { core: { core1: true } }), true);
});

test('continue learning and graduation ignore optional labs', () => {
  assert.deepEqual(getNextRequiredLesson(pathWithOptionalLab, { core: { core1: true } }), {
    chapter: pathWithOptionalLab[2],
    lesson: pathWithOptionalLab[2].lessons[0],
  });
  assert.deepEqual(getGraduationProgress(pathWithOptionalLab, {
    core: { core1: true },
    final: { final1: true },
  }), { totalLessons: 2, completed: 2, finished: true });
});
```

- [ ] **Step 2: Run navigation tests and verify RED**

Run: `node --test tests/curriculumNavigation.test.js`

Expected: FAIL because the required-path helpers do not exist and navigation still enters the optional chapter.

- [ ] **Step 3: Implement the pure path helpers**

Add these behaviours to `curriculumNavigation.js`:

```js
export const isRequiredChapter = chapter => Boolean(chapter) && chapter.optional !== true;

export function getRequiredChapters(chapters) {
  return Array.isArray(chapters) ? chapters.filter(isRequiredChapter) : [];
}

export function getRequiredLessonCount(chapters) {
  return getRequiredChapters(chapters)
    .reduce((sum, chapter) => sum + (Array.isArray(chapter.lessons) ? chapter.lessons.length : 0), 0);
}

export function getPreviousRequiredChapter(chapters, chapterId) {
  if (!Array.isArray(chapters)) return null;
  const index = chapters.findIndex(chapter => chapter?.id === chapterId);
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    if (isRequiredChapter(chapters[cursor])) return chapters[cursor];
  }
  return null;
}

function isLessonComplete(progress, chapterId, lessonId) {
  return Boolean(progress?.[chapterId]?.[lessonId]);
}

function isChapterComplete(chapter, progress) {
  return Boolean(chapter?.lessons?.length)
    && chapter.lessons.every(lesson => isLessonComplete(progress, chapter.id, lesson.id));
}

export function isChapterUnlocked(chapters, chapterId, progress) {
  const chapter = Array.isArray(chapters) && chapters.find(item => item?.id === chapterId);
  if (!chapter) return false;
  const previousRequired = getPreviousRequiredChapter(chapters, chapterId);
  return !previousRequired || isChapterComplete(previousRequired, progress);
}

export function getNextRequiredLesson(chapters, progress) {
  for (const chapter of getRequiredChapters(chapters)) {
    for (const lesson of chapter.lessons || []) {
      if (!isLessonComplete(progress, chapter.id, lesson.id)) return { chapter, lesson };
    }
  }
  return null;
}
```

Update `getNextDestination` so a required chapter searches forward for the next required chapter; an optional chapter returns to the course map after its last lesson. Update `getGraduationProgress` to iterate over `getRequiredChapters(chapters)`.

- [ ] **Step 4: Run navigation tests and verify GREEN**

Run: `node --test tests/curriculumNavigation.test.js`

Expected: all navigation tests PASS.

- [ ] **Step 5: Commit the path boundary**

```bash
git add src/utils/curriculumNavigation.js tests/curriculumNavigation.test.js
git commit -m "feat: define required curriculum path"
```

### Task 3: Mark optional labs in curriculum data

**Files:**
- Modify: `tests/curriculum.test.js`
- Modify: `src/data/courses.js`

- [ ] **Step 1: Add failing curriculum metadata tests**

```js
import { getLessonRuntimeMode } from '../src/runtime/runtimePolicy.js';
import { getRequiredLessonCount } from '../src/utils/curriculumNavigation.js';

test('browser-incompatible labs are explicit optional in-development chapters', () => {
  const optional = CHAPTERS.filter(chapter => chapter.optional);
  assert.deepEqual(optional.map(chapter => chapter.id), ['ch24', 'ch25', 'ch26', 'ch27']);
  assert.ok(optional.every(chapter => chapter.availability === 'in-development'));
  assert.equal(optional.flatMap(chapter => chapter.lessons).length, 12);
  assert.equal(getRequiredLessonCount(CHAPTERS), 92);
});

test('every required lesson uses the real Python runtime', () => {
  for (const chapter of CHAPTERS.filter(item => !item.optional)) {
    for (const lesson of chapter.lessons) {
      assert.equal(getLessonRuntimeMode(lesson), 'python', lesson.id);
    }
  }
});
```

- [ ] **Step 2: Run and verify RED**

Run: `node --test tests/curriculum.test.js`

Expected: FAIL because no chapters are marked optional.

- [ ] **Step 3: Add metadata without changing IDs or order**

Add the following fields to chapter objects `ch24`, `ch25`, `ch26`, and `ch27`:

```js
optional: true,
availability: 'in-development',
```

- [ ] **Step 4: Run and verify GREEN**

Run: `node --test tests/curriculum.test.js`

Expected: PASS with 26 chapters, 104 total lessons, 92 required lessons, and 12 optional labs.

- [ ] **Step 5: Commit metadata**

```bash
git add src/data/courses.js tests/curriculum.test.js
git commit -m "feat: classify unavailable lessons as optional labs"
```

### Task 4: Route UI progress through the required path

**Files:**
- Modify: `tests/uiPagesSourceContract.test.js`
- Modify: `tests/lessonSourceContract.test.js`
- Modify: `src/components/CourseMap.jsx`
- Modify: `src/components/Dashboard.jsx`
- Modify: `src/components/Lesson.jsx`
- Modify: `src/components/Settings.jsx`
- Modify: `src/styles/pages.css`

- [ ] **Step 1: Add failing source contracts**

```js
test('course pages use the centralized required-path helpers', () => {
  const courseMap = read('src/components/CourseMap.jsx');
  const dashboard = read('src/components/Dashboard.jsx');
  const settings = read('src/components/Settings.jsx');
  assert.match(courseMap, /isChapterUnlocked/);
  assert.match(courseMap, /chapter-lab-label/);
  assert.match(dashboard, /getNextRequiredLesson/);
  assert.match(dashboard, /getGraduationProgress/);
  assert.match(settings, /getGraduationProgress/);
});
```

Add to `lessonSourceContract.test.js`:

```js
assert.match(lessonSource, /isChapterUnlocked/);
assert.match(lessonSource, /getRequiredChapters/);
assert.match(lessonSource, /getGraduationProgress/);
```

- [ ] **Step 2: Run and verify RED**

Run: `node --test tests/uiPagesSourceContract.test.js tests/lessonSourceContract.test.js`

Expected: FAIL because components still perform literal previous-index and 104-lesson calculations.

- [ ] **Step 3: Update the components**

Use `isChapterUnlocked(CHAPTERS, chapter.id, STORAGE.getProgress())` in both `CourseMap` and the lesson access guard. Use `getNextRequiredLesson(CHAPTERS, STORAGE.getProgress())` and `getGraduationProgress(...)` in `Dashboard`. Use `getGraduationProgress(...)` in `Settings`. In `Lesson`, calculate completion statistics with `getRequiredChapters` and `getGraduationProgress` so the all-done badge uses 92 required lessons.

Render this label inside `.chapter-info` for optional chapters:

```jsx
{chapter.optional && (
  <span className="chapter-lab-label">
    {lang === 'zh' ? '选修实验 · 开发中' : 'Optional lab · In development'}
  </span>
)}
```

Add restrained styling:

```css
.chapter-lab-label {
  width: fit-content;
  margin-top: 7px;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--xm-amber-soft);
  color: var(--xm-amber);
  font-size: 11px;
  font-weight: 700;
}
```

- [ ] **Step 4: Run targeted tests and verify GREEN**

Run: `node --test tests/uiPagesSourceContract.test.js tests/lessonSourceContract.test.js tests/curriculumNavigation.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the UI integration**

```bash
git add src/components/CourseMap.jsx src/components/Dashboard.jsx src/components/Lesson.jsx src/components/Settings.jsx src/styles/pages.css tests/uiPagesSourceContract.test.js tests/lessonSourceContract.test.js
git commit -m "feat: keep optional labs off the graduation path"
```

### Task 5: Repair the ten rejected maintained answers

**Files:**
- Modify: `src/data/courses.js`

- [ ] **Step 1: Correct real-Python expectations and deterministic output**

Apply these exact corrections:

```text
ch2_05 expected: Hello, World
ch11_03 answer: print(file.read(), end="")
ch11_04 answer: print(file.read(), end="")
ch14_04 answer final line: print(sorted(only_a))
ch14_04 expected: ['苹果', '西瓜', '香蕉']
ch17_03 expected: 7.0\n3
ch19_01 expected: ['8', '5', '6']
ch19_02 expected: ['apple', 'banana', 'cherry', 'date']
ch19_03 expected: ['alice@gmail.com', 'bob@web.com']
ch23_01 expected: ('Alice', 20)\n('Bob', 25)
ch9_01 case 1 expected: 猜一个数字(1-100): 高了！\n猜一个数字(1-100): 恭喜！你猜了2次！
ch9_01 case 2 expected: 猜一个数字(1-100): 低了！\n猜一个数字(1-100): 恭喜！你猜了2次！
ch9_01 case 3 expected: 猜一个数字(1-100): 恭喜！你猜了1次！
```

Update the nearby Chinese/English instructions and hints for `ch11_03`, `ch11_04`, `ch14_04`, `ch17_03`, and `ch23_01` so copied instructional code matches the passing maintained answer and accurately describes lists/tuples/floats.

- [ ] **Step 2: Run the real-runtime audit and verify GREEN**

Run: `node --test tests/curriculumRuntime.test.js`

Expected: PASS; all 92 runnable maintained answers pass.

- [ ] **Step 3: Run curriculum validation**

Run: `npm run validate:curriculum`

Expected: `Curriculum valid: 26 chapters, 104 lessons.`

- [ ] **Step 4: Commit the repaired lessons**

```bash
git add src/data/courses.js
git commit -m "fix: make maintained lesson answers executable"
```

### Task 6: Full verification and visual path check

**Files:**
- No production changes expected

- [ ] **Step 1: Run the complete unit suite**

Run: `npm test`

Expected: all tests PASS, including the Pyodide answer audit.

- [ ] **Step 2: Validate and build**

Run: `npm run validate:curriculum`

Expected: 26 chapters and 104 lessons valid.

Run: `npm run build`

Expected: Vite exits 0 and emits `dist/`.

- [ ] **Step 3: Run Electron security checks**

Run: `npm run test:e2e`

Expected: all Electron security tests PASS.

- [ ] **Step 4: Run responsive visual checks**

Run: `npm run test:ui`

Expected: desktop and mobile checks PASS, optional lab labels are readable, chapter 23 leads to the final project, and the page remains vertically scrollable.

- [ ] **Step 5: Review the final diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only scoped implementation files plus the user's pre-existing unrelated changes are present.
