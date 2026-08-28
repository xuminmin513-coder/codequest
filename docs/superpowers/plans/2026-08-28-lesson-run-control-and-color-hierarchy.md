# Lesson Run Control and Color Hierarchy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the only run/stop control into a non-overlapping footer inside the black code editor and give lesson explanations, examples, tasks, and hints distinct soft semantic colors.

**Architecture:** Extract the current lesson Markdown renderer into a small pure utility that classifies bilingual section headings and emits stable semantic class names. `Lesson.jsx` consumes that renderer and owns only interaction/layout markup; `lesson-workspace.css` maps the semantic classes and editor footer to the approved visual system without changing curriculum data, judging, saves, or navigation.

**Tech Stack:** React 19, Vite 6, Node test runner, CSS custom properties, Electron + Playwright visual acceptance tests.

---

## File map

- Create `src/utils/lessonMarkdown.js`: escape and render the existing lesson Markdown subset, classify bilingual headings, and emit semantic section classes.
- Create `tests/lessonMarkdown.test.js`: unit coverage for classification, safe fallback, hints, inline markup, and HTML escaping.
- Modify `src/components/Lesson.jsx`: import the renderer, remove the embedded renderer, and place the sole run/stop button in the editor footer.
- Modify `src/styles/design-tokens.css`: add the approved soft purple tokens used by example sections.
- Modify `src/styles/lesson-workspace.css`: style the editor footer and the four semantic content treatments.
- Modify `tests/lessonSourceContract.test.js`: lock the button inside the editor and prevent a duplicate in bottom navigation.
- Modify `tests/lessonUiContract.test.js`: lock the structural CSS, semantic colors, tap target, and fallback behavior.
- Modify `tests/uiVisual.e2e.mjs`: verify real desktop/mobile geometry, semantic colors, running, output, confetti, and scrolling.

### Task 1: Extract and test the bilingual lesson Markdown renderer

**Files:**
- Create: `tests/lessonMarkdown.test.js`
- Create: `src/utils/lessonMarkdown.js`

- [ ] **Step 1: Write the failing renderer tests**

Create `tests/lessonMarkdown.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyLessonSection,
  renderLessonMarkdown,
} from '../src/utils/lessonMarkdown.js';

test('classifies Chinese and English lesson headings into stable semantic tones', () => {
  assert.equal(classifyLessonSection('📝 任务'), 'task');
  assert.equal(classifyLessonSection('综合挑战'), 'task');
  assert.equal(classifyLessonSection('Exercise'), 'task');
  assert.equal(classifyLessonSection('代码示例'), 'example');
  assert.equal(classifyLessonSection('Walkthrough'), 'example');
  assert.equal(classifyLessonSection('变量是什么'), 'learn');
  assert.equal(classifyLessonSection('Unknown heading'), 'learn');
});

test('renders semantic sections and explicit hint callouts', () => {
  const html = renderLessonMarkdown(`## 字符串拼接

先理解两个字符串如何连接。

### 示例演示

\`print("A" + "B")\`

### 📝 任务

输出 Hello。

> 💡 提示：字符串要放在引号里。`);

  assert.match(html, /lesson-content-section--learn/);
  assert.match(html, /lesson-content-section--example/);
  assert.match(html, /lesson-content-section--task/);
  assert.match(html, /lesson-content-callout--hint/);
  assert.match(html, /<code>print\(&quot;A&quot; \+ &quot;B&quot;\)<\/code>/);
});

test('escapes HTML and preserves fenced code without applying emphasis inside it', () => {
  const html = renderLessonMarkdown(`## 安全讲解

<script>alert("x")</script>

\`\`\`python
print("**not bold**")
\`\`\``);

  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
  assert.match(html, /<pre><code>print\(&quot;\*\*not bold\*\*\&quot;\)<\/code><\/pre>/);
  assert.doesNotMatch(html, /<strong>not bold<\/strong>/);
});
```

- [ ] **Step 2: Run the new test and verify RED**

Run:

```bash
node --test tests/lessonMarkdown.test.js
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/utils/lessonMarkdown.js`.

- [ ] **Step 3: Implement the pure renderer utility**

Create `src/utils/lessonMarkdown.js`:

```js
const TASK_HEADING = /任务|挑战|练习|task|challenge|exercise/i;
const EXAMPLE_HEADING = /示例|演示|拆解|example|demo|walkthrough/i;

export function classifyLessonSection(title = '') {
  const normalized = String(title);
  if (TASK_HEADING.test(normalized)) return 'task';
  if (EXAMPLE_HEADING.test(normalized)) return 'example';
  return 'learn';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(value) {
  const protectedCode = [];
  let html = escapeHtml(value).replace(/`([^`]+)`/g, (_, code) => {
    const index = protectedCode.length;
    protectedCode.push(`<code>${code}</code>`);
    return `\u0000INLINE${index}\u0000`;
  });

  html = html
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\u0000INLINE(\d+)\u0000/g, (_, index) => protectedCode[Number(index)] || '');

  return html;
}

export function renderLessonMarkdown(markdown = '') {
  const segments = String(markdown).split(/^```\w*$/gm);
  const parts = [];
  let sectionOpen = false;

  const closeSection = () => {
    if (!sectionOpen) return;
    parts.push('</section>');
    sectionOpen = false;
  };

  const openSection = (tone, headingLevel, headingText) => {
    closeSection();
    parts.push(`<section class="lesson-content-section lesson-content-section--${tone}">`);
    sectionOpen = true;
    if (headingText) {
      parts.push(`<h${headingLevel}>${renderInline(headingText)}</h${headingLevel}>`);
    }
  };

  const ensureLearningSection = () => {
    if (!sectionOpen) openSection('learn', 2, '');
  };

  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) {
    const segment = segments[segmentIndex];
    if (segmentIndex % 2 === 1) {
      ensureLearningSection();
      if (segment.trim()) parts.push(`<pre><code>${escapeHtml(segment.trim())}</code></pre>`);
      continue;
    }

    const blocks = segment.split(/\n\n+/);
    for (const block of blocks) {
      const text = block.trim();
      if (!text) continue;

      const heading = text.match(/^(##|###)\s+(.+)$/);
      if (heading) {
        const headingText = heading[2];
        openSection(classifyLessonSection(headingText), heading[1].length, headingText);
        continue;
      }

      ensureLearningSection();
      if (/^>/.test(text)) {
        const lines = text
          .split('\n')
          .map(line => renderInline(line.replace(/^>\s?/, '')));
        parts.push(`<blockquote class="lesson-content-callout lesson-content-callout--hint">${lines.join('<br>')}</blockquote>`);
      } else if (/^- /.test(text) || /^\d+\. /.test(text)) {
        const ordered = /^\d+\. /.test(text);
        const items = text
          .split('\n')
          .map(line => `<li>${renderInline(line.replace(/^- /, '').replace(/^\d+\. /, ''))}</li>`);
        parts.push(`${ordered ? '<ol>' : '<ul>'}${items.join('')}${ordered ? '</ol>' : '</ul>'}`);
      } else {
        parts.push(`<p>${renderInline(text).replace(/\n/g, '<br>')}</p>`);
      }
    }
  }

  closeSection();
  return parts.join('\n');
}
```

- [ ] **Step 4: Run the renderer tests and verify GREEN**

Run:

```bash
node --test tests/lessonMarkdown.test.js
```

Expected: 3 tests pass, 0 fail.

- [ ] **Step 5: Commit the renderer foundation**

```bash
git add src/utils/lessonMarkdown.js tests/lessonMarkdown.test.js
git commit -m "feat: classify lesson content sections"
```

### Task 2: Put the sole run/stop control inside the editor footer

**Files:**
- Modify: `tests/lessonSourceContract.test.js`
- Modify: `tests/lessonUiContract.test.js`
- Modify: `src/components/Lesson.jsx`
- Modify: `src/styles/lesson-workspace.css`

- [ ] **Step 1: Write failing structure and style contracts**

Append to `tests/lessonSourceContract.test.js`:

```js
test('Lesson keeps the only run action inside the editor footer', () => {
  const editorStart = lessonSource.indexOf('<section className="lesson-editor-card"');
  const editorEnd = lessonSource.indexOf('</section>', editorStart);
  const editorMarkup = lessonSource.slice(editorStart, editorEnd);
  const navigationStart = lessonSource.indexOf('<div className="lesson-actions">');
  const navigationMarkup = lessonSource.slice(navigationStart);

  assert.ok(editorStart >= 0 && editorEnd > editorStart);
  assert.match(editorMarkup, /lesson-editor-actions/);
  assert.match(editorMarkup, /lesson-primary-action/);
  assert.doesNotMatch(navigationMarkup, /lesson-primary-action/);
  assert.equal((lessonSource.match(/lesson-primary-action/g) || []).length, 1);
});
```

Append to `tests/lessonUiContract.test.js`:

```js
test('run action has a non-overlapping footer inside the black editor', async () => {
  const styles = await readFile(new URL('../src/styles/lesson-workspace.css', import.meta.url), 'utf8');
  const footerRule = styles.match(/\.lesson-page \.lesson-editor-actions\s*\{[^}]*\}/s)?.[0] || '';

  assert.match(footerRule, /display:\s*flex/);
  assert.match(footerRule, /justify-content:\s*flex-end/);
  assert.match(footerRule, /border-top:\s*1px solid #293249/);
  assert.match(footerRule, /background:\s*#141b2b/);
  assert.match(styles, /\.lesson-editor-actions \.lesson-primary-action[\s\S]*min-height:\s*44px/);
});
```

- [ ] **Step 2: Run the contracts and verify RED**

Run:

```bash
node --test tests/lessonSourceContract.test.js tests/lessonUiContract.test.js
```

Expected: FAIL because `lesson-editor-actions` does not exist and the run button is still in `.lesson-actions`.

- [ ] **Step 3: Move the existing button without changing its behavior**

In `src/components/Lesson.jsx`, make the editor section and bottom navigation read as follows:

```jsx
<section className="lesson-editor-card" aria-label={lang === 'zh' ? '代码编辑器' : 'Code editor'}>
  <div className="workspace-header">
    <span className="lang-badge">Python</span>
    <span className="shortcut-hint">{lang === 'zh' ? runShortcut : runShortcutEn}</span>
  </div>
  <div className="editor-wrapper">
    <CodeEditor ref={editorRef} onRun={isRunning ? handleStop : handleRun} />
  </div>
  <div className="lesson-editor-actions">
    <button className={`lesson-primary-action${isRunning ? ' stop' : ''}`} type="button" onClick={isRunning ? handleStop : handleRun}>
      {isRunning ? '■' : '▶'} {isRunning ? (lang === 'zh' ? '停止' : 'Stop') : (lang === 'zh' ? '运行代码' : 'Run code')}
    </button>
  </div>
</section>
```

Keep `.lesson-actions` below the result drawer, but limit it to navigation:

```jsx
<div className="lesson-actions">
  <div className="left-buttons">
    {isReviewMode ? (
      <button className="lesson-secondary-action" type="button" onClick={() => navigateTo('reviews')}>
        {'←'} {lang === 'zh' ? '返回复习列表' : 'Back to reviews'}
      </button>
    ) : lesIdx > 0 ? (
      <button className="lesson-secondary-action" type="button" onClick={goToPrev}>
        {'←'} {lang === 'zh' ? '上一关' : 'Previous'}
      </button>
    ) : <span />}
  </div>
  <div className="right-buttons">
    {!isReviewMode && completed && (
      <button className="lesson-secondary-action" type="button" onClick={goToNext}>
        {lang === 'zh' ? '下一关' : 'Next'} {'→'}
      </button>
    )}
  </div>
</div>
```

- [ ] **Step 4: Add the editor footer CSS**

In `src/styles/lesson-workspace.css`, change the editor wrapper and add the footer rules:

```css
.lesson-page .editor-wrapper {
  min-height: 330px;
  flex: 1;
}

.lesson-page .lesson-editor-actions {
  min-height: 62px;
  padding: 9px 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #293249;
  background: #141b2b;
}

.lesson-editor-actions .lesson-primary-action {
  min-height: 44px;
}
```

In the existing `@media (max-width: 520px)` block, add:

```css
.lesson-page .editor-wrapper {
  min-height: 300px;
}

.lesson-page .lesson-editor-actions {
  min-height: 60px;
  padding: 8px 10px;
}

.lesson-editor-actions .lesson-primary-action {
  flex: 0 1 auto;
  min-width: 132px;
}
```

- [ ] **Step 5: Run the focused contracts and verify GREEN**

Run:

```bash
node --test tests/lessonSourceContract.test.js tests/lessonUiContract.test.js
```

Expected: all focused contracts pass.

- [ ] **Step 6: Commit the editor action layout**

```bash
git add src/components/Lesson.jsx src/styles/lesson-workspace.css tests/lessonSourceContract.test.js tests/lessonUiContract.test.js
git commit -m "feat: place run action inside editor"
```

### Task 3: Integrate semantic lesson sections and approved soft colors

**Files:**
- Modify: `tests/lessonSourceContract.test.js`
- Modify: `tests/lessonUiContract.test.js`
- Modify: `src/components/Lesson.jsx`
- Modify: `src/styles/design-tokens.css`
- Modify: `src/styles/lesson-workspace.css`

- [ ] **Step 1: Write failing renderer-integration and palette contracts**

Append to `tests/lessonSourceContract.test.js`:

```js
test('Lesson renders curriculum copy through the semantic Markdown renderer', () => {
  assert.match(lessonSource, /import \{ renderLessonMarkdown \} from '\.\.\/utils\/lessonMarkdown'/);
  assert.match(lessonSource, /renderLessonMarkdown\(content\)/);
  assert.doesNotMatch(lessonSource, /const renderMarkdown =/);
});
```

Append to `tests/lessonUiContract.test.js`:

```js
test('lesson sections use the approved soft semantic palette without coloring body text', async () => {
  const styles = await readFile(new URL('../src/styles/lesson-workspace.css', import.meta.url), 'utf8');
  const tokens = await readFile(new URL('../src/styles/design-tokens.css', import.meta.url), 'utf8');

  assert.match(tokens, /--xm-purple:\s*#654ca9/);
  assert.match(tokens, /--xm-purple-soft:\s*#f1edff/);
  assert.match(styles, /\.lesson-content-section--learn[\s\S]*var\(--xm-blue-soft\)/);
  assert.match(styles, /\.lesson-content-section--example[\s\S]*var\(--xm-purple-soft\)/);
  assert.match(styles, /\.lesson-content-section--task[\s\S]*var\(--xm-green-soft\)/);
  assert.match(styles, /\.lesson-content-callout--hint[\s\S]*var\(--xm-orange-soft\)/);
  assert.match(styles, /\.lesson-brief \.hints-inline[\s\S]*var\(--xm-orange-soft\)/);
  assert.match(styles, /\.lesson-content-section\s*\{[^}]*color:\s*var\(--xm-text-secondary\)/s);
});
```

- [ ] **Step 2: Run the contracts and verify RED**

Run:

```bash
node --test tests/lessonSourceContract.test.js tests/lessonUiContract.test.js
```

Expected: FAIL because `Lesson.jsx` still owns `renderMarkdown` and the semantic palette rules do not exist.

- [ ] **Step 3: Integrate the renderer and remove the embedded parser**

Add this import in `src/components/Lesson.jsx`:

```js
import { renderLessonMarkdown } from '../utils/lessonMarkdown';
```

Delete the entire local `const renderMarkdown = (md) => { ... };` function. Replace the brief content call with:

```jsx
<div
  className="lesson-brief-content"
  dangerouslySetInnerHTML={{ __html: renderLessonMarkdown(content) }}
/>
```

- [ ] **Step 4: Add the approved palette tokens and semantic styles**

Add to `:root` in `src/styles/design-tokens.css`:

```css
--xm-purple: #654ca9;
--xm-purple-soft: #f1edff;
```

Replace the generic lesson-content spacing rules in `src/styles/lesson-workspace.css` with these semantic rules while keeping the existing list, inline-code, and fenced-code rules:

```css
.lesson-content-section {
  margin: 0 0 14px;
  padding: 14px;
  border-left: 4px solid var(--xm-blue);
  border-radius: 12px;
  background: var(--xm-blue-soft);
  color: var(--xm-text-secondary);
}

.lesson-content-section h2,
.lesson-content-section h3 {
  margin: 0 0 10px;
}

.lesson-content-section p:last-child,
.lesson-content-section ul:last-child,
.lesson-content-section ol:last-child,
.lesson-content-section pre:last-child,
.lesson-content-section blockquote:last-child {
  margin-bottom: 0;
}

.lesson-content-section--learn {
  border-left-color: var(--xm-blue);
  background: var(--xm-blue-soft);
}

.lesson-content-section--learn h2,
.lesson-content-section--learn h3 {
  color: var(--xm-blue);
}

.lesson-content-section--example {
  border-left-color: var(--xm-purple);
  background: var(--xm-purple-soft);
}

.lesson-content-section--example h2,
.lesson-content-section--example h3 {
  color: var(--xm-purple);
}

.lesson-content-section--task {
  border-left-color: var(--xm-green);
  background: var(--xm-green-soft);
}

.lesson-content-section--task h2,
.lesson-content-section--task h3 {
  color: var(--xm-green);
}

.lesson-content-callout--hint {
  border-left-color: var(--xm-orange);
  background: var(--xm-orange-soft);
  color: var(--xm-text);
}
```

Replace `.lesson-brief .hints-inline` with:

```css
.lesson-brief .hints-inline {
  margin-top: 18px;
  padding: 14px;
  border-left: 4px solid var(--xm-orange);
  border-radius: 12px;
  background: var(--xm-orange-soft);
}
```

Give `.lesson-brief .hints-title` the approved title color:

```css
color: var(--xm-orange);
font-weight: 850;
```

Keep `.lesson-brief-content pre`, `.lesson-brief-content pre code`, and `.lesson-brief .hint-code` on their existing neutral/dark code styles so semantic backgrounds never recolor code.

- [ ] **Step 5: Run renderer and focused UI tests and verify GREEN**

Run:

```bash
node --test tests/lessonMarkdown.test.js tests/lessonSourceContract.test.js tests/lessonUiContract.test.js
```

Expected: all semantic renderer, integration, and UI contracts pass.

- [ ] **Step 6: Commit the semantic content hierarchy**

```bash
git add src/components/Lesson.jsx src/styles/design-tokens.css src/styles/lesson-workspace.css tests/lessonSourceContract.test.js tests/lessonUiContract.test.js
git commit -m "feat: add semantic lesson color hierarchy"
```

### Task 4: Extend real desktop/mobile acceptance and run the full regression suite

**Files:**
- Modify: `tests/uiVisual.e2e.mjs`

- [ ] **Step 1: Add real geometry and computed-color assertions**

In the first test in `tests/uiVisual.e2e.mjs`, after `.lesson-workspace` becomes visible and before running code, add:

```js
assert.equal(await page.locator('.lesson-primary-action').count(), 1);
assert.equal(await page.locator('.lesson-actions .lesson-primary-action').count(), 0);
assert.equal(await page.locator('.lesson-editor-actions .lesson-primary-action').count(), 1);
assert.ok(await page.locator('.lesson-content-section--learn').count() >= 1);
assert.ok(await page.locator('.lesson-content-section--task').count() >= 1);
assert.ok(await page.locator('.lesson-content-callout--hint').count() >= 1);

const approvedHierarchy = await page.evaluate(() => {
  const editor = document.querySelector('.lesson-editor-card').getBoundingClientRect();
  const footer = document.querySelector('.lesson-editor-actions').getBoundingClientRect();
  const run = document.querySelector('.lesson-editor-actions .lesson-primary-action').getBoundingClientRect();
  const learn = getComputedStyle(document.querySelector('.lesson-content-section--learn'));
  const task = getComputedStyle(document.querySelector('.lesson-content-section--task'));
  const hint = getComputedStyle(document.querySelector('.lesson-content-callout--hint'));
  return {
    runInsideEditor: run.left >= editor.left && run.right <= editor.right && run.bottom <= editor.bottom,
    runInFooter: run.top >= footer.top && run.bottom <= footer.bottom,
    learnBackground: learn.backgroundColor,
    taskBackground: task.backgroundColor,
    hintBackground: hint.backgroundColor,
  };
});

assert.equal(approvedHierarchy.runInsideEditor, true, JSON.stringify(approvedHierarchy));
assert.equal(approvedHierarchy.runInFooter, true, JSON.stringify(approvedHierarchy));
assert.notEqual(approvedHierarchy.learnBackground, approvedHierarchy.taskBackground);
assert.notEqual(approvedHierarchy.taskBackground, approvedHierarchy.hintBackground);
```

After switching to the 390 × 844 viewport, extend `mobileLayout` with:

```js
runButtonHeight: document.querySelector('.lesson-editor-actions .lesson-primary-action').getBoundingClientRect().height,
runButtonRight: document.querySelector('.lesson-editor-actions .lesson-primary-action').getBoundingClientRect().right,
```

Then add:

```js
assert.ok(mobileLayout.runButtonHeight >= 44, JSON.stringify(mobileLayout));
assert.ok(mobileLayout.runButtonRight <= mobileLayout.viewportWidth + 1, JSON.stringify(mobileLayout));
```

- [ ] **Step 2: Run the real UI acceptance test**

Run:

```bash
npm run test:ui
```

Expected: production build succeeds; desktop/mobile learning layout and vertical scrolling tests both pass. Existing Pyodide browser-externalization, `eval`, and large-chunk notices may appear but are not test failures.

- [ ] **Step 3: Run the complete automated test suite**

Run:

```bash
npm test
```

Expected: all tests pass, including the maintained-answer Pyodide audit.

- [ ] **Step 4: Validate curriculum data**

Run:

```bash
npm run validate:curriculum
```

Expected: `Curriculum valid: 26 chapters, 104 lessons.`

- [ ] **Step 5: Run the Electron security/save acceptance test**

Run:

```bash
npm run test:e2e
```

Expected: both Electron runtime and player-save tests pass.

- [ ] **Step 6: Check the final patch for whitespace and accidental files**

Run:

```bash
git diff --check
git status --short
```

Expected: `git diff --check` prints nothing. Only the task files listed in this plan are staged or committed; pre-existing platform, save-migration, and `.superpowers/` work remains untouched.

- [ ] **Step 7: Commit the visual acceptance coverage**

```bash
git add tests/uiVisual.e2e.mjs
git commit -m "test: verify lesson control hierarchy"
```

## Completion criteria

- Exactly one run/stop button exists on the lesson page.
- It is inside the black editor footer, right-aligned, at least 44 pixels high, and never overlays code.
- Explanation, example, task, and hint content have distinct approved soft colors plus text labels.
- Chinese and English headings classify consistently; unknown headings safely use the learning style.
- Running, stopping, result output, confetti, previous/next navigation, mobile layout, and vertical scrolling continue to work.
- Unit, curriculum, build, Electron, and UI acceptance checks all pass.
