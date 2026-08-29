# XM²code iOS Minimal UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current pixel-heavy interface with the approved responsive iOS-minimal XM²code UI, including a full-height lesson workspace and one unified light result drawer for tests and output.

**Architecture:** Keep course, storage, review, judge, and Python-runner behavior unchanged. Add small presentational components, a pure result-view adapter, and four focused CSS modules loaded after the legacy stylesheet; migrate each page to the shared UI pieces, then remove only obsolete conflicting rules. Source-contract unit tests protect structure and branding, while Electron Playwright tests verify real desktop/mobile layout and critical interactions.

**Tech Stack:** React 18, Vite 6, CSS, CodeMirror 6, Node test runner, Playwright with Electron.

---

## Working-tree safety

The repository already contains unrelated user changes. Before every commit:

```bash
git status --short
git diff --cached --name-only
git diff --cached --check
```

Stage only the files named by the current task. For an overlapping file such as `src/components/Settings.jsx`, use an interactive or patch-only staging method and verify the staged diff. Never stage `.superpowers/`, `apps/`, `src/platform/`, platform contract tests, curriculum data, storage migrations, or other unrelated changes unless the current task explicitly lists them.

## File map

### New UI components

- `src/components/ui/BrandMark.jsx`: renders the global `XM²` mark and `XM²code` wordmark.
- `src/components/ui/PageHeader.jsx`: shared page title, description, and action area.
- `src/components/ui/Surface.jsx`: shared neutral card wrapper.
- `src/components/ui/StatusBadge.jsx`: neutral/pass/fail/warning state label.
- `src/components/LessonResultDrawer.jsx`: tabbed light test/output drawer.
- `src/utils/lessonResultView.js`: pure adapter from judge/runtime reports to beginner-facing display data.

### New stylesheets

- `src/styles/design-tokens.css`: typography, colors, radii, shadows, focus rules.
- `src/styles/app-shell.css`: sidebar, page shell, desktop/mobile navigation.
- `src/styles/pages.css`: shared cards plus dashboard, courses, review, achievements, settings, saves, shortcuts, graduation, and overlays.
- `src/styles/lesson-workspace.css`: lesson header, brief, editor, result drawer, and responsive lesson layout.

### Modified application files

- `src/main.jsx`: imports new styles after `global.css`.
- `src/App.jsx`: adds semantic shell classes and mobile navigation support.
- `src/components/Sidebar.jsx`: uses the new brand and semantic navigation buttons.
- `src/components/Dashboard.jsx`: puts Continue Learning first and uses the shared page/card system.
- `src/components/CourseMap.jsx`: adopts chapter/lesson states with accessible buttons.
- `src/components/Lesson.jsx`: stores result state and renders the new workspace/drawer.
- `src/components/ReviewList.jsx`, `Achievements.jsx`, `Settings.jsx`, `SaveSlots.jsx`, `Shortcuts.jsx`, `Graduation.jsx`: migrate to shared page/card primitives.
- `src/components/Toast.jsx`, `BadgeModal.jsx`, `SkillUnlockModal.jsx`, `CurriculumMigrationModal.jsx`, `Confetti.jsx`: align overlays and reduced-motion behavior.
- `src/styles/global.css`: remove obsolete AI styles and conflicting legacy rules only after new styles pass tests.
- `package.json`: updates product description and adds the UI end-to-end test command.

### Tests

- `tests/uiBrandSourceContract.test.js`: brand and shared-component contract.
- `tests/uiShellSourceContract.test.js`: semantic navigation and responsive shell contract.
- `tests/uiPagesSourceContract.test.js`: common page/card and save-layout contract.
- `tests/lessonResultView.test.js`: result adapter behavior.
- `tests/lessonResultDrawerSourceContract.test.js`: accessible tabbed drawer contract.
- `tests/uiVisual.e2e.mjs`: real desktop/mobile layout and interaction verification.

---

### Task 1: Add the XM²code design foundation

**Files:**
- Create: `tests/uiBrandSourceContract.test.js`
- Create: `src/components/ui/BrandMark.jsx`
- Create: `src/components/ui/PageHeader.jsx`
- Create: `src/components/ui/Surface.jsx`
- Create: `src/components/ui/StatusBadge.jsx`
- Create: `src/styles/design-tokens.css`
- Modify: `src/main.jsx`
- Modify: `package.json`

- [ ] **Step 1: Write the failing brand and shared-component contract**

```js
// tests/uiBrandSourceContract.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('XM²code has one reusable brand component and no fox branding', () => {
  assert.equal(existsSync(new URL('../src/components/ui/BrandMark.jsx', import.meta.url)), true);
  const brand = read('src/components/ui/BrandMark.jsx');
  assert.match(brand, /XM²/);
  assert.match(brand, /XM²code/);
  assert.doesNotMatch(brand, /fox|狐狸/i);
});

test('shared page components expose semantic wrappers', () => {
  assert.match(read('src/components/ui/PageHeader.jsx'), /<header/);
  assert.match(read('src/components/ui/Surface.jsx'), /ui-surface/);
  assert.match(read('src/components/ui/StatusBadge.jsx'), /status-badge/);
});

test('the product description uses the approved global name', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.match(pkg.description, /XM²code/);
  assert.doesNotMatch(pkg.description, /xmmcode/);
});
```

- [ ] **Step 2: Run the contract and verify RED**

Run: `node --test tests/uiBrandSourceContract.test.js`
Expected: FAIL because the four shared component files do not exist and the package description still says `xmmcode`.

- [ ] **Step 3: Add the minimal shared components**

```jsx
// src/components/ui/BrandMark.jsx
import React from 'react';

export default function BrandMark({ compact = false }) {
  return (
    <span className={`brand-lockup${compact ? ' compact' : ''}`} aria-label="XM squared code">
      <span className="brand-mark" aria-hidden="true">XM²</span>
      {!compact && <span className="brand-wordmark">XM²code</span>}
    </span>
  );
}
```

```jsx
// src/components/ui/PageHeader.jsx
import React from 'react';

export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </header>
  );
}
```

```jsx
// src/components/ui/Surface.jsx
import React from 'react';

export default function Surface({ as: Tag = 'section', className = '', children, ...props }) {
  return <Tag className={`ui-surface ${className}`.trim()} {...props}>{children}</Tag>;
}
```

```jsx
// src/components/ui/StatusBadge.jsx
import React from 'react';

export default function StatusBadge({ tone = 'neutral', children }) {
  return <span className={`status-badge ${tone}`}>{children}</span>;
}
```

In `src/styles/design-tokens.css`, define the approved system and base rules:

```css
:root {
  --xm-bg: #f3f6fa;
  --xm-surface: #ffffff;
  --xm-surface-muted: #f5f7fa;
  --xm-border: #dfe5ec;
  --xm-text: #172236;
  --xm-text-secondary: #667386;
  --xm-blue: #087cff;
  --xm-blue-soft: #e8f3ff;
  --xm-green: #39785e;
  --xm-green-soft: #e6f4ed;
  --xm-red: #ad514e;
  --xm-red-soft: #f9e9e8;
  --xm-orange: #86612f;
  --xm-orange-soft: #fff5e6;
  --xm-radius-sm: 10px;
  --xm-radius-md: 16px;
  --xm-radius-lg: 24px;
  --xm-shadow: 0 20px 52px rgba(32, 49, 75, 0.10);
  --xm-font: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif;
  --xm-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

* { box-sizing: border-box; }
html, body, #root { min-height: 100%; }
body { margin: 0; background: var(--xm-bg); color: var(--xm-text); font-family: var(--xm-font); }
button, input, textarea, select { font: inherit; }
button:focus-visible, [href]:focus-visible, [tabindex]:focus-visible {
  outline: 3px solid rgba(8, 124, 255, 0.32);
  outline-offset: 2px;
}
.ui-surface { background: var(--xm-surface); border: 1px solid var(--xm-border); border-radius: var(--xm-radius-md); }
.status-badge { display: inline-flex; align-items: center; min-height: 28px; padding: 4px 9px; border-radius: 999px; background: var(--xm-surface-muted); color: var(--xm-text-secondary); font-size: 12px; font-weight: 700; }
.status-badge.success { background: var(--xm-green-soft); color: var(--xm-green); }
.status-badge.error { background: var(--xm-red-soft); color: var(--xm-red); }
.status-badge.warning { background: var(--xm-orange-soft); color: var(--xm-orange); }
```

Import `design-tokens.css` immediately after `global.css` in `src/main.jsx`, and change `package.json` description to `XM²code - beginner-friendly programming learning game`.

- [ ] **Step 4: Run the contract and full unit suite**

Run: `node --test tests/uiBrandSourceContract.test.js`
Expected: PASS.
Run: `npm test`
Expected: all existing and new unit tests PASS.

- [ ] **Step 5: Commit only foundation files**

```bash
git add package.json src/main.jsx src/components/ui/BrandMark.jsx src/components/ui/PageHeader.jsx src/components/ui/Surface.jsx src/components/ui/StatusBadge.jsx src/styles/design-tokens.css tests/uiBrandSourceContract.test.js
git commit -m "feat: add XM²code ui foundation"
```

---

### Task 2: Replace the application shell and navigation

**Files:**
- Create: `tests/uiShellSourceContract.test.js`
- Create: `src/styles/app-shell.css`
- Modify: `src/App.jsx`
- Modify: `src/components/Sidebar.jsx`
- Modify: `src/main.jsx`

- [ ] **Step 1: Write the failing shell contract**

```js
// tests/uiShellSourceContract.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('sidebar uses semantic navigation and approved brand', () => {
  const source = read('src/components/Sidebar.jsx');
  assert.match(source, /import BrandMark/);
  assert.match(source, /<nav[^>]*aria-label=/);
  assert.match(source, /<button/);
  assert.doesNotMatch(source, /logo-icon">⌨️|xmmcode/);
});

test('app exposes a mobile navigation landmark', () => {
  const source = read('src/App.jsx');
  assert.match(source, /mobile-navigation/);
  assert.match(source, /aria-label=/);
});
```

- [ ] **Step 2: Run the shell contract and verify RED**

Run: `node --test tests/uiShellSourceContract.test.js`
Expected: FAIL because the current sidebar uses clickable `div` elements and the app has no mobile navigation.

- [ ] **Step 3: Implement semantic shared navigation**

Create one exported `NAV_ITEMS` array in `Sidebar.jsx`, render it as buttons, and export a `MobileNavigation` from the same file so both navigation surfaces use identical routes and labels:

```jsx
export const NAV_ITEMS = [
  { page: 'dashboard', icon: '⌂', zh: '学习', en: 'Learn' },
  { page: 'courses', icon: '⌘', zh: '课程', en: 'Courses' },
  { page: 'reviews', icon: '↻', zh: '复习', en: 'Review' },
  { page: 'achievements', icon: '◇', zh: '成就', en: 'Awards' },
  { page: 'settings', icon: '⚙', zh: '设置', en: 'Settings' },
];
```

Each button must include `type="button"`, `aria-current={currentPage === item.page ? 'page' : undefined}`, and the existing review badge. `Sidebar` uses `<BrandMark />`; `MobileNavigation` uses `<BrandMark compact />` only in its top bar.

In `App.jsx`, keep `PageRouter`, migration handling, and Toast unchanged, but render:

```jsx
<div className="app-shell">
  <Sidebar />
  <MobileNavigation />
  <main className={`app-main${currentPage === 'lesson' ? ' lesson-route' : ''}`}>
    <PageRouter />
  </main>
  {showMigration && (
    <CurriculumMigrationModal
      lang={lang}
      error={migrationError}
      onKeep={keepExistingProgress}
      onRestart={restartForV2}
    />
  )}
  <Toast />
</div>
```

Add `src/styles/app-shell.css` with a 232px desktop sidebar, a flexible main column, a hidden mobile bar by default, and a fixed five-item bottom navigation below 760px. All mobile buttons use at least 44px height. Import it after `design-tokens.css`.

- [ ] **Step 4: Run shell and regression tests**

Run: `node --test tests/uiShellSourceContract.test.js`
Expected: PASS.
Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit the shell**

```bash
git add src/App.jsx src/components/Sidebar.jsx src/main.jsx src/styles/app-shell.css tests/uiShellSourceContract.test.js
git commit -m "feat: add responsive XM²code app shell"
```

---

### Task 3: Redesign the dashboard around Continue Learning

**Files:**
- Create: `tests/uiPagesSourceContract.test.js`
- Create: `src/styles/pages.css`
- Modify: `src/components/Dashboard.jsx`
- Modify: `src/main.jsx`

- [ ] **Step 1: Write the failing dashboard contract**

```js
// tests/uiPagesSourceContract.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('dashboard starts with a clear continue-learning action', () => {
  const source = read('src/components/Dashboard.jsx');
  assert.match(source, /import PageHeader/);
  assert.match(source, /dashboard-continue-card/);
  assert.match(source, /dashboard-secondary-grid/);
  assert.doesNotMatch(source, /欢迎回来，冒险者/);
});

test('dashboard retains saves, reviews, progress, and skill unlock behavior', () => {
  const source = read('src/components/Dashboard.jsx');
  assert.match(source, /getPendingReviewCount/);
  assert.match(source, /levelProgress/);
  assert.match(source, /exportAllData/);
  assert.match(source, /importAllData/);
  assert.match(source, /SkillUnlockModal/);
});
```

- [ ] **Step 2: Run the page contract and verify RED**

Run: `node --test tests/uiPagesSourceContract.test.js`
Expected: FAIL because the new hierarchy and shared page header are missing.

- [ ] **Step 3: Recompose the dashboard without changing its data calls**

Keep every existing `STORAGE`/`GAMIFICATION` calculation and import/export callback. Replace the markup hierarchy with:

```jsx
<div className="page dashboard-page">
  <PageHeader
    eyebrow={lang === 'zh' ? '今日学习' : 'Today'}
    title={lang === 'zh' ? '继续学习 Python' : 'Continue learning Python'}
    description={lang === 'zh' ? '从上次停下的位置继续。' : 'Pick up where you left off.'}
  />
  {nextLesson && (
    <Surface className="dashboard-continue-card">
      <StatusBadge>{completedCount}/{totalLessons}</StatusBadge>
      <h2>{lang === 'zh' ? nextLesson.title : nextLesson.titleEn}</h2>
      <button className="primary-action" type="button" onClick={openNextLesson}>
        {lang === 'zh' ? '继续学习' : 'Continue'}
      </button>
    </Surface>
  )}
  <div className="dashboard-secondary-grid">
    <Surface className="dashboard-stat-card">
      <span>{lang === 'zh' ? '等级进度' : 'Level progress'}</span>
      <strong>{level}</strong>
      <div className="progress-track"><span style={{ width: `${levelProgress}%` }} /></div>
      <small>{totalXp} / {nextXp} XP</small>
    </Surface>
    <Surface className="dashboard-stat-card">
      <span>{lang === 'zh' ? '今日复习' : 'Reviews due'}</span>
      <strong>{STORAGE.getPendingReviewCount()}</strong>
      <button type="button" onClick={() => navigateTo('reviews')}>{lang === 'zh' ? '查看复习' : 'View reviews'}</button>
    </Surface>
    <Surface className="dashboard-stat-card">
      <span>{lang === 'zh' ? '连续学习' : 'Learning streak'}</span>
      <strong>{streak}{lang === 'zh' ? ' 天' : ' days'}</strong>
      <small>{dailyCount} {lang === 'zh' ? '次今日练习' : 'sessions today'}</small>
    </Surface>
  </div>
  <section className="dashboard-tools" aria-labelledby="dashboard-tools-title">
    <h2 id="dashboard-tools-title">{lang === 'zh' ? '学习工具' : 'Learning tools'}</h2>
    <div className="dashboard-tools-grid">{toolCards}</div>
  </section>
</div>
```

Extract the current inline next-lesson navigation into `openNextLesson`. Before `return`, assign the existing skill, course, achievement, shortcut, review, export, and import card elements to a `toolCards` array so the JSX above renders every current action without duplicating callbacks. Add `pages.css` rules for the page header, surfaces, a dominant continue card, subdued statistics, buttons, and responsive grids. Import the stylesheet after `app-shell.css`.

- [ ] **Step 4: Run page and full unit tests**

Run: `node --test tests/uiPagesSourceContract.test.js`
Expected: PASS.
Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit the dashboard**

```bash
git add src/components/Dashboard.jsx src/main.jsx src/styles/pages.css tests/uiPagesSourceContract.test.js
git commit -m "feat: redesign learning dashboard"
```

---

### Task 4: Redesign course and supporting pages

**Files:**
- Modify: `tests/uiPagesSourceContract.test.js`
- Modify: `src/components/CourseMap.jsx`
- Modify: `src/components/ReviewList.jsx`
- Modify: `src/components/Achievements.jsx`
- Modify: `src/components/Shortcuts.jsx`
- Modify: `src/components/Graduation.jsx`
- Modify: `src/styles/pages.css`

- [ ] **Step 1: Add failing contracts for course and supporting pages**

Append tests that require `PageHeader` on all five pages, `aria-expanded` on chapter buttons, `aria-disabled` for locked lessons, and explicit text conditions for locked achievements. Use this exact shared assertion:

```js
for (const file of ['CourseMap.jsx', 'ReviewList.jsx', 'Achievements.jsx', 'Shortcuts.jsx', 'Graduation.jsx']) {
  test(`${file} uses the shared page hierarchy`, () => {
    const source = read(`src/components/${file}`);
    assert.match(source, /import PageHeader/);
    assert.match(source, /<PageHeader/);
  });
}

test('course disclosure and locked lessons are accessible', () => {
  const source = read('src/components/CourseMap.jsx');
  assert.match(source, /aria-expanded=/);
  assert.match(source, /aria-disabled=/);
  assert.match(source, /chapter-toggle/);
});
```

- [ ] **Step 2: Run and verify RED**

Run: `node --test tests/uiPagesSourceContract.test.js`
Expected: FAIL on shared headers and course accessibility attributes.

- [ ] **Step 3: Migrate each page to shared primitives**

Apply the same concrete outer hierarchy to each component: `<div className="page page-standard">`, followed by `<PageHeader title={...} description={...} />`, followed by its current content wrapped in `<div className="page-content-grid">`. This is a wrapper change only; every current data calculation and callback remains in place.

Course chapter headers become `<button type="button" className="chapter-toggle">`; lesson entries become buttons with text status (`已完成`, `当前课程`, `未解锁`) in addition to icons. Review groups use neutral cards and reserve red for overdue status. Achievements keep each unlock condition visible. Shortcuts keep the current `PYTHON_SHORTCUTS` data and gain horizontally scrollable tables on small screens. Graduation preserves both navigation actions and the finished/in-progress distinction.

Add the exact corresponding selectors to `pages.css`: `.page-standard`, `.chapter-card`, `.chapter-toggle`, `.lesson-path-item`, `.review-card`, `.achievement-card`, `.shortcuts-scroll`, `.graduation-card` and their mobile rules.

- [ ] **Step 4: Run page and full unit tests**

Run: `node --test tests/uiPagesSourceContract.test.js`
Expected: PASS.
Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit supporting pages**

```bash
git add tests/uiPagesSourceContract.test.js src/components/CourseMap.jsx src/components/ReviewList.jsx src/components/Achievements.jsx src/components/Shortcuts.jsx src/components/Graduation.jsx src/styles/pages.css
git commit -m "feat: unify course and supporting pages"
```

---

### Task 5: Build a pure beginner-facing result adapter

**Files:**
- Create: `tests/lessonResultView.test.js`
- Create: `src/utils/lessonResultView.js`

- [ ] **Step 1: Write failing result adapter tests**

```js
// tests/lessonResultView.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLessonResultView } from '../src/utils/lessonResultView.js';

test('maps partial test results without inventing hidden details', () => {
  const view = buildLessonResultView({
    lang: 'zh',
    report: {
      passed: false,
      failedCase: 2,
      output: '最终得分: 13\n',
      expected: '13',
      results: [
        { caseNumber: 1, passed: true, actual: '13', expected: '13', error: null },
        { caseNumber: 2, passed: false, actual: '最终得分: 13', expected: '13', error: null },
      ],
    },
  });
  assert.equal(view.summary, '1 / 2 通过');
  assert.equal(view.items[1].tone, 'error');
  assert.equal(view.output, '最终得分: 13\n');
  assert.equal(view.expected, '13');
});

test('maps safety timeout to one actionable beginner message', () => {
  const view = buildLessonResultView({
    lang: 'zh',
    report: { passed: false, status: 'timeout', error: 'Execution timed out', results: [] },
  });
  assert.match(view.guidance, /循环/);
  assert.equal(view.tone, 'error');
});

test('maps a successful report to success state', () => {
  const view = buildLessonResultView({
    lang: 'en',
    report: { passed: true, output: '13\n', expected: '13', results: [{ caseNumber: 1, passed: true }] },
  });
  assert.equal(view.tone, 'success');
  assert.equal(view.summary, '1 / 1 passed');
});
```

- [ ] **Step 2: Run the adapter tests and verify RED**

Run: `node --test tests/lessonResultView.test.js`
Expected: FAIL because `src/utils/lessonResultView.js` does not exist.

- [ ] **Step 3: Implement the adapter**

Export `buildLessonResultView({ report, lang })`. It returns:

```js
{
  tone: 'neutral' | 'success' | 'error',
  summary: string,
  items: Array<{ number: number, label: string, detail: string, tone: string }>,
  output: string,
  expected: string,
  guidance: string,
}
```

Use only `report.results`, `report.output`, `report.expected`, `report.status`, and `report.error`. For `timeout`, `output_limit`, `worker_crash`, and `invalid_request`, reuse the current beginner messages from `Lesson.jsx`. For ordinary mismatches, guidance says to compare output formatting; it must not display inputs or expected values from tests that were not returned by the judge.

- [ ] **Step 4: Run adapter and judge tests**

Run: `node --test tests/lessonResultView.test.js tests/lessonJudge.test.js`
Expected: PASS.

- [ ] **Step 5: Commit the adapter**

```bash
git add src/utils/lessonResultView.js tests/lessonResultView.test.js
git commit -m "feat: add beginner lesson result view"
```

---

### Task 6: Add the unified light result drawer

**Files:**
- Create: `tests/lessonResultDrawerSourceContract.test.js`
- Create: `src/components/LessonResultDrawer.jsx`
- Create: `src/styles/lesson-workspace.css`
- Modify: `src/main.jsx`

- [ ] **Step 1: Write the failing drawer contract**

```js
// tests/lessonResultDrawerSourceContract.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('lesson result drawer exposes accessible test and output tabs', () => {
  const source = read('src/components/LessonResultDrawer.jsx');
  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tab"/);
  assert.match(source, /aria-selected=/);
  assert.match(source, /role="tabpanel"/);
  assert.match(source, /lesson-result-drawer/);
});

test('result styling stays in the approved light neutral family', () => {
  const css = read('src/styles/lesson-workspace.css');
  assert.match(css, /\.lesson-result-drawer/);
  assert.match(css, /var\(--xm-surface-muted\)/);
  assert.doesNotMatch(css, /\.lesson-result-drawer[^}]*#(?:0[0-9a-f]{5}|1[0-9a-f]{5}|2[0-9a-f]{5})/i);
});
```

- [ ] **Step 2: Run the drawer contract and verify RED**

Run: `node --test tests/lessonResultDrawerSourceContract.test.js`
Expected: FAIL because the drawer and stylesheet do not exist.

- [ ] **Step 3: Implement the presentational drawer**

`LessonResultDrawer` accepts `lang`, `view`, `activeTab`, and `onTabChange`. It renders two buttons with ids `lesson-tests-tab` and `lesson-output-tab`, linked tabpanels, a neutral empty state, test status rows, one mismatch detail card, and a light `<pre>` output area. The output `<pre>` uses `var(--xm-surface)` and `var(--xm-text)`, never a dark terminal background.

Add styles for `.lesson-result-drawer`, `.result-tabs`, `.result-tab`, `.result-panel`, `.result-test-row`, `.result-comparison`, `.result-guidance`, and `.result-output`. Set the drawer background to `var(--xm-surface-muted)`, cards to `var(--xm-surface)`, pass accents to green, failures to red, and guidance to orange.

- [ ] **Step 4: Run the drawer contract**

Run: `node --test tests/lessonResultDrawerSourceContract.test.js`
Expected: PASS.

- [ ] **Step 5: Commit the drawer**

```bash
git add src/components/LessonResultDrawer.jsx src/styles/lesson-workspace.css src/main.jsx tests/lessonResultDrawerSourceContract.test.js
git commit -m "feat: add unified lesson result drawer"
```

---

### Task 7: Recompose Lesson as a full-height workspace

**Files:**
- Modify: `tests/lessonUiContract.test.js`
- Modify: `tests/lessonSourceContract.test.js`
- Modify: `src/components/Lesson.jsx`
- Modify: `src/styles/lesson-workspace.css`

- [ ] **Step 1: Extend lesson contracts before changing production code**

Add assertions requiring `LessonResultDrawer`, `buildLessonResultView`, React result state, `.lesson-brief`, `.lesson-coding-area`, and no `document.getElementById('lesson-output')` mutation. Preserve every existing run-guard assertion.

```js
test('Lesson renders reports through the unified result drawer', () => {
  assert.match(lessonSource, /import LessonResultDrawer/);
  assert.match(lessonSource, /buildLessonResultView/);
  assert.match(lessonSource, /setResultView/);
  assert.match(lessonSource, /<LessonResultDrawer/);
  assert.doesNotMatch(lessonSource, /getElementById\('lesson-output'\)/);
});
```

- [ ] **Step 2: Run lesson contracts and verify RED**

Run: `node --test tests/lessonUiContract.test.js tests/lessonSourceContract.test.js`
Expected: FAIL on the new drawer/state assertions while existing safety assertions continue to pass.

- [ ] **Step 3: Replace DOM mutation with state without changing run semantics**

Add:

```jsx
const [resultView, setResultView] = useState(null);
const [activeResultTab, setActiveResultTab] = useState('tests');
```

On lesson change, clear the result. On stop, runtime failure, mismatch, and pass, call `setResultView(buildLessonResultView({ report, lang }))`. Use a synthetic stopped report for the stop action. Keep the current `createLessonRunGuard`, runner disposal, review failure, completion, XP, badge, navigation, and Confetti calls unchanged.

Replace `.lesson-body` markup with:

```jsx
<div className="lesson-workspace">
  <aside className="lesson-brief">
    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
    {hintElements}
  </aside>
  <section className="lesson-coding-area">
    <header className="lesson-editor-toolbar">
      <span className="lang-badge">Python</span>
      <span className="shortcut-hint">{lang === 'zh' ? runShortcut : runShortcutEn}</span>
      <button className="primary-action" type="button" onClick={isRunning ? handleStop : handleRun}>
        {isRunning ? (lang === 'zh' ? '停止' : 'Stop') : (lang === 'zh' ? '运行全部测试' : 'Run all tests')}
      </button>
    </header>
    <div className="lesson-editor-region"><CodeEditor ref={editorRef} onRun={isRunning ? handleStop : handleRun} /></div>
    <LessonResultDrawer lang={lang} view={resultView} activeTab={activeResultTab} onTabChange={setActiveResultTab} />
    <footer className="lesson-navigation">{navigationActions}</footer>
  </section>
</div>
```

Before `return`, extract the current progressive-hint JSX into `hintElements` and the current previous/next/review button JSX into `navigationActions`; do not change their conditions or callbacks. Import the shared `Confetti` component from `src/components/Confetti.jsx` and delete the duplicate local `Confetti` function at the bottom of `Lesson.jsx`.

Desktop CSS uses `grid-template-columns: minmax(240px, 25%) minmax(0, 1fr)` and `min-height: calc(100dvh - var(--lesson-topbar-height))`. The coding area uses rows `auto minmax(280px, 1fr) auto auto`, so extra height flows into the editor. At 760px, the brief becomes a visible collapsible region above the editor rather than `display:none`.

- [ ] **Step 4: Run focused tests**

Run: `node --test tests/lessonUiContract.test.js tests/lessonSourceContract.test.js tests/lessonResultView.test.js tests/lessonResultDrawerSourceContract.test.js`
Expected: PASS.

- [ ] **Step 5: Run the whole unit suite and build**

Run: `npm test`
Expected: PASS.
Run: `npm run build`
Expected: successful production build.

- [ ] **Step 6: Commit the lesson workspace**

```bash
git add src/components/Lesson.jsx src/styles/lesson-workspace.css tests/lessonUiContract.test.js tests/lessonSourceContract.test.js
git commit -m "feat: expand lesson coding workspace"
```

---

### Task 8: Redesign settings and one-slot-first saves

**Files:**
- Modify: `tests/saveSlotsSourceContract.test.js`
- Modify: `src/components/Settings.jsx`
- Modify: `src/components/SaveSlots.jsx`
- Modify: `src/styles/pages.css`

- [ ] **Step 1: Add the failing save presentation contract**

```js
test('save UI presents the active save as a profile card with a separate add tile', () => {
  const source = read('src/components/SaveSlots.jsx');
  assert.match(source, /save-profile-card/);
  assert.match(source, /save-avatar/);
  assert.match(source, /save-add-tile/);
  assert.match(source, /aria-label=/);
  assert.match(source, /addSave\(/);
});
```

Add a stylesheet assertion that `.save-avatar` uses both `display: grid` and `place-items: center`.

- [ ] **Step 2: Run save contracts and verify RED**

Run: `node --test tests/saveSlotsSourceContract.test.js`
Expected: FAIL on the new profile-card, centered-avatar, and add-tile assertions.

- [ ] **Step 3: Recompose saves and settings without altering repository calls**

Keep `listSaves`, `getActiveSave`, `switchSave`, `addSave`, reload behavior, and error Toasts unchanged. Render the active slot first as `.save-profile-card`, other explicitly created slots below it, and the button as `.save-add-tile`. Use visible `＋` and localized label, with an `aria-label` matching the label. Add `.save-avatar { display:grid; place-items:center; }`.

In `Settings.jsx`, retain all existing language, stats, import/export, reset, archive recovery, and `SaveSlots` behavior. Replace headings with `PageHeader`, group content as `settings-section` surfaces, rename the About label to `XM²code v1.0`, and keep dangerous actions in `.settings-danger-zone`.

- [ ] **Step 4: Run save tests and full unit suite**

Run: `node --test tests/saveSlotsSourceContract.test.js tests/playerSaveRepository.test.js tests/storageSaveBoundary.test.js`
Expected: PASS.
Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit only UI hunks from overlapping files**

```bash
git add tests/saveSlotsSourceContract.test.js src/components/SaveSlots.jsx src/styles/pages.css
git add -p src/components/Settings.jsx
git diff --cached --check
git commit -m "feat: redesign settings and save profiles"
```

The staged `Settings.jsx` diff must contain UI composition and brand text only; preserve unrelated user changes outside this task.

---

### Task 9: Unify overlays, preserve celebration, and remove obsolete UI rules

**Files:**
- Create: `tests/uiOverlaySourceContract.test.js`
- Modify: `src/components/Toast.jsx`
- Modify: `src/components/BadgeModal.jsx`
- Modify: `src/components/SkillUnlockModal.jsx`
- Modify: `src/components/CurriculumMigrationModal.jsx`
- Modify: `src/components/Confetti.jsx`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write failing overlay and cleanup contracts**

```js
// tests/uiOverlaySourceContract.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('dialogs expose dialog semantics and toast exposes live status', () => {
  for (const file of ['BadgeModal.jsx', 'SkillUnlockModal.jsx', 'CurriculumMigrationModal.jsx']) {
    const source = read(`src/components/${file}`);
    assert.match(source, /role="dialog"/);
    assert.match(source, /aria-modal="true"/);
  }
  assert.match(read('src/components/Toast.jsx'), /aria-live=/);
});

test('celebration remains and respects reduced motion', () => {
  assert.match(read('src/components/Confetti.jsx'), /confetti-container/);
  assert.match(read('src/styles/pages.css'), /prefers-reduced-motion/);
});

test('obsolete AI and pixel-theme rules are removed', () => {
  const css = read('src/styles/global.css');
  assert.doesNotMatch(css, /AI CHAT|ai-chat-|api-key-input/);
  assert.doesNotMatch(css, /\.confetti-container\s*\{\s*\.confetti-container/);
});
```

- [ ] **Step 2: Run and verify RED**

Run: `node --test tests/uiOverlaySourceContract.test.js`
Expected: FAIL on missing dialog/live-region semantics, reduced-motion rules, and obsolete AI CSS.

- [ ] **Step 3: Align overlays and clean dead styles**

Add `role="dialog"`, `aria-modal="true"`, and labelled titles to modal roots. Add `aria-live="polite"` to Toast. Keep `Confetti` mounted under the same `showConfetti` state and retain the 4-second normal lesson duration and 2-second review duration.

Add:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; }
  .confetti-particle, .level-complete-overlay { animation: none !important; }
  .confetti-container { display: none; }
}
```

Remove the dead `AI CHAT`, API-key, legacy pixel button/card, old sidebar, old lesson terminal, and duplicate confetti rules from `global.css` only where an equivalent new selector exists in the new stylesheets. Keep CodeMirror base rules and any styles still referenced by components.

- [ ] **Step 4: Run overlay, unit, and build verification**

Run: `node --test tests/uiOverlaySourceContract.test.js tests/lessonSourceContract.test.js`
Expected: PASS.
Run: `npm test`
Expected: PASS.
Run: `npm run build`
Expected: successful build with no CSS parse error.

- [ ] **Step 5: Commit overlays and cleanup**

```bash
git add tests/uiOverlaySourceContract.test.js src/components/Toast.jsx src/components/BadgeModal.jsx src/components/SkillUnlockModal.jsx src/components/CurriculumMigrationModal.jsx src/components/Confetti.jsx src/styles/pages.css src/styles/global.css
git commit -m "feat: polish accessible feedback overlays"
```

---

### Task 10: Verify desktop and mobile UI in the real application

**Files:**
- Create: `tests/uiVisual.e2e.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing real-layout test**

Create an Electron Playwright test that launches with a temporary user-data directory, waits for the migration prompt, chooses to keep progress, and checks both viewports:

```js
// tests/uiVisual.e2e.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { _electron as electron } from 'playwright';

test('XM²code shell and lesson workspace adapt to desktop and mobile', { timeout: 60000 }, async () => {
  const profileDir = await mkdtemp(path.join(tmpdir(), 'xm2-ui-'));
  let app;
  try {
    app = await electron.launch({ args: ['.', '--xmcode-e2e'], env: { ...process.env, XMCODE_E2E_USER_DATA: profileDir } });
    const page = await app.firstWindow();
    await page.waitForFunction(() => document.querySelector('#root')?.childElementCount > 0);
    const keep = page.getByRole('button', { name: /保留当前进度|Keep Current Progress/ });
    if (await keep.count()) await keep.click();

    await page.setViewportSize({ width: 1280, height: 860 });
    await page.locator('.brand-wordmark').waitFor();
    assert.equal((await page.locator('.brand-wordmark').first().textContent()).trim(), 'XM²code');
    assert.equal(await page.locator('.desktop-sidebar').isVisible(), true);

    await page.locator('[data-page="courses"]').first().click();
    await page.locator('.lesson-path-item:not([aria-disabled="true"])').first().click();
    await page.locator('.lesson-workspace').waitFor();
    const columns = await page.locator('.lesson-workspace').evaluate(node => getComputedStyle(node).gridTemplateColumns);
    assert.notEqual(columns, 'none');
    await page.getByRole('tab', { name: /运行输出|Output/ }).click();
    const resultBackground = await page.locator('.lesson-result-drawer').evaluate(node => getComputedStyle(node).backgroundColor);
    assert.notEqual(resultBackground, 'rgb(23, 33, 49)');

    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.locator('.mobile-navigation').isVisible(), true);
    assert.equal(await page.locator('.desktop-sidebar').isVisible(), false);
    assert.equal(await page.locator('.lesson-brief').isVisible(), true);
  } finally {
    await app?.close();
    await rm(profileDir, { recursive: true, force: true });
  }
});
```

- [ ] **Step 2: Add the UI test command and verify RED**

Add `"test:ui": "node --test tests/uiVisual.e2e.mjs"` to `package.json`.

Run: `npm run build`
Expected: successful build.
Run: `npm run test:ui`
Expected: FAIL on one or more new UI selectors before all pages/styles are finished.

- [ ] **Step 3: Fix only real layout defects revealed by the test**

Adjust the relevant new component or CSS module. Do not weaken assertions or add invisible test-only elements. Confirm at 1280×860, 820×1180, and 390×844 that content does not overlap, result tabs remain reachable, and mobile controls retain a 44px target.

- [ ] **Step 4: Run the complete verification matrix**

Run: `npm test`
Expected: all unit/source-contract tests PASS.
Run: `npm run validate:curriculum`
Expected: `Curriculum valid: 26 chapters, 104 lessons.`
Run: `npm run build`
Expected: successful production build.
Run: `npm run test:ui`
Expected: PASS.
Run: `npm run test:e2e`
Expected: Electron security, save migration, and real Python worker tests PASS.

- [ ] **Step 5: Perform browser visual acceptance**

Open the production build in the in-app browser and inspect desktop, tablet, and phone viewports. Capture screenshots of the dashboard, course map, empty challenge, failed challenge, successful challenge with confetti, and settings/save page. Compare them against `docs/superpowers/specs/2026-08-27-ios-minimal-ui-redesign-design.md` and confirm there is no fox mark, old `xmmcode`, dark output drawer, hidden mobile brief, or unused challenge space.

- [ ] **Step 6: Commit final UI verification**

```bash
git add package.json tests/uiVisual.e2e.mjs
git commit -m "test: verify responsive XM²code interface"
```

---

## Final completion checklist

- [ ] `git status --short` shows only pre-existing unrelated user changes plus no task leftovers.
- [ ] `git diff --check` and `git diff --cached --check` report no whitespace errors.
- [ ] All new tests were observed failing for the expected missing behavior before production code was written.
- [ ] `npm test`, curriculum validation, production build, UI E2E, and security E2E all pass from a fresh run.
- [ ] Desktop, tablet, and phone screenshots match the approved visual direction.
- [ ] The app still runs real isolated Python, stops infinite loops, preserves review behavior, saves progress, and shows completion confetti.
- [ ] AI translation remains absent.
- [ ] No unrelated user work is included in UI commits.
