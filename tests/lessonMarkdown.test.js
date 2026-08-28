import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyLessonSection, renderLessonMarkdown } from '../src/utils/lessonMarkdown.js';
import { CHAPTERS } from '../src/data/courses.js';

test('classifies bilingual task headings', () => {
  for (const title of ['任务', '挑战：循环', '练习题', 'Task', 'Challenge', 'Exercise']) {
    assert.equal(classifyLessonSection(title), 'task', title);
  }
});

test('classifies bilingual example headings', () => {
  for (const title of ['示例', '演示：输出', '拆解步骤', 'Example', 'Demo', 'Walkthrough']) {
    assert.equal(classifyLessonSection(title), 'example', title);
  }
});

test('classifies ordinary and unknown headings as learn', () => {
  for (const title of ['', '概念', '学习目标', 'Concept', 'Getting started']) {
    assert.equal(classifyLessonSection(title), 'learn', title);
  }
});

test('classifies embedded example wording with safe bilingual boundaries', () => {
  assert.equal(classifyLessonSection('Classic example: Factorial'), 'example');
  assert.equal(classifyLessonSection('函数注解完整示例'), 'example');
  assert.equal(classifyLessonSection('演示文稿'), 'learn');
  assert.equal(classifyLessonSection('Exampled behavior'), 'learn');
});

test('classifies English task terms at word boundaries with task precedence', () => {
  for (const title of ['Task', 'tAsK', 'Challenge', 'cHaLlEnGe', 'Exercise', 'eXeRcIsE']) {
    assert.equal(classifyLessonSection(title), 'task', title);
  }
  for (const title of ['Multitasking overview', 'preexercise warmup', 'Challengeable']) {
    assert.equal(classifyLessonSection(title), 'learn', title);
  }
  assert.equal(classifyLessonSection('Task example'), 'task');
});

test('renders bilingual sections and hint callouts', () => {
  const markdown = [
    '先理解这段内容。',
    '',
    '## 示例 / Example',
    '',
    '这是一个 **重点**，也可以 *强调*。',
    '',
    '> 提示 / Hint: 先运行示例。',
    '',
    '### 任务 / Task',
    '',
    '- 第一步',
    '- Step two',
    '',
    '1. 检查输出',
    '2. Check output',
  ].join('\n');

  const html = renderLessonMarkdown(markdown);

  assert.match(html, /lesson-content-section lesson-content-section--learn/);
  assert.match(html, /lesson-content-section lesson-content-section--example/);
  assert.match(html, /lesson-content-section lesson-content-section--task/);
  assert.match(html, /lesson-content-callout lesson-content-callout--hint/);
  assert.match(html, /<strong>重点<\/strong>/);
  assert.match(html, /<em>强调<\/em>/);
  assert.match(html, /<ul>[\s\S]*<li>第一步<\/li>[\s\S]*<\/ul>/);
  assert.match(html, /<ol>[\s\S]*<li>检查输出<\/li>[\s\S]*<\/ol>/);
});

test('keeps inline code literal and escapes its quotes', () => {
  const html = renderLessonMarkdown('Use `print("<hello>") & more`.');

  assert.match(html, /<code>print\(&quot;&lt;hello&gt;&quot;\) &amp; more<\/code>/);
  assert.doesNotMatch(html, /<hello>/);
});

test('escapes raw HTML and script content', () => {
  const html = renderLessonMarkdown('<script>alert("x")<\/script> <span>unsafe</span>');

  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
  assert.match(html, /&lt;span&gt;unsafe&lt;\/span&gt;/);
  assert.doesNotMatch(html, /<script|<span>/);
});

test('escapes fenced code without parsing Markdown inside it', () => {
  const markdown = [
    '```python',
    '**not bold** <script>alert("x")</script>',
    'print("done")',
    '```',
  ].join('\n');
  const html = renderLessonMarkdown(markdown);

  assert.match(html, /<pre><code>\*\*not bold\*\* &lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;\nprint\(&quot;done&quot;\)<\/code><\/pre>/);
  assert.doesNotMatch(html, /<strong>not bold<\/strong>/);
  assert.doesNotMatch(html, /<script>/);
});

test('renders standalone bilingual example labels and their following code in example sections', () => {
  const markdown = [
    '**示例：用 `re.findall` 提取所有数字**：',
    '',
    '```python',
    'nums = re.findall(r"\\d+", text)',
    '```',
    '',
    '**Example: Extract all words**:',
    '',
    '```python',
    'words = re.findall(r"\\w+", text)',
    '```',
  ].join('\n');

  const html = renderLessonMarkdown(markdown);
  const exampleSections = [...html.matchAll(/<section class="lesson-content-section lesson-content-section--example">([\s\S]*?)<\/section>/g)];

  assert.equal(exampleSections.length, 2);
  assert.match(exampleSections[0][1], /<strong>示例：用 <code>re\.findall<\/code> 提取所有数字<\/strong>：/);
  assert.match(exampleSections[0][1], /<pre><code>nums = re\.findall\(r&quot;\\d\+&quot;, text\)<\/code><\/pre>/);
  assert.match(exampleSections[1][1], /<strong>Example: Extract all words<\/strong>:/);
  assert.match(exampleSections[1][1], /<pre><code>words = re\.findall\(r&quot;\\w\+&quot;, text\)<\/code><\/pre>/);
});

test('renders every curriculum lesson document with balanced semantic sections', () => {
  let renderedDocuments = 0;
  let foundExampleSection = false;

  for (const chapter of CHAPTERS) {
    for (const lesson of chapter.lessons) {
      for (const content of [lesson.content, lesson.contentEn]) {
        if (typeof content !== 'string') continue;
        const html = renderLessonMarkdown(content);
        const openingSections = html.match(/<section class="lesson-content-section lesson-content-section--(?:learn|example|task)">/g) || [];
        const closingSections = html.match(/<\/section>/g) || [];

        assert.equal(openingSections.length, closingSections.length, `${lesson.id} has unbalanced sections`);
        renderedDocuments += 1;
        foundExampleSection ||= html.includes('lesson-content-section--example');
      }
    }
  }

  assert.ok(renderedDocuments > 0);
  assert.ok(foundExampleSection, 'curriculum should render at least one example section');

  for (const [label, codeMarker] of [
    ['Classic example: Factorial', 'factorial(n)'],
    ['函数注解完整示例', 'def greet'],
  ]) {
    const sourceLesson = CHAPTERS
      .flatMap(chapter => chapter.lessons)
      .find(lesson => lesson.content?.includes(`**${label}**`) || lesson.contentEn?.includes(`**${label}**`));
    assert.ok(sourceLesson, `curriculum should contain ${label}`);
    const source = sourceLesson.content?.includes(`**${label}**`) ? sourceLesson.content : sourceLesson.contentEn;
    const html = renderLessonMarkdown(source);
    const exampleSection = html.match(/<section class="lesson-content-section lesson-content-section--example">([\s\S]*?)<\/section>/);

    assert.ok(exampleSection, `${label} should render an example section`);
    assert.match(exampleSection[1], new RegExp(`<strong>${label}</strong>`));
    assert.ok(exampleSection[1].includes(`<pre><code>`) && exampleSection[1].includes(codeMarker), `${label} should keep its code in the example section`);
  }
});

test('keeps bold labels with longer keyword prefixes in learn sections', () => {
  for (const label of ['**演示文稿**：', '**Exampled behavior**:']) {
    const html = renderLessonMarkdown(label);

    assert.doesNotMatch(html, /lesson-content-section--example/);
    assert.match(html, /lesson-content-section--learn/);
  }
});

test('renders embedded real example labels with their following code', () => {
  const markdown = [
    '**Classic example: Factorial**',
    '',
    '```python',
    'return n * factorial(n - 1)',
    '```',
    '',
    '**函数注解完整示例**：',
    '',
    '```python',
    'def greet(name: str) -> str:',
    '    return name',
    '```',
  ].join('\n');
  const html = renderLessonMarkdown(markdown);
  const exampleSections = [...html.matchAll(/<section class="lesson-content-section lesson-content-section--example">([\s\S]*?)<\/section>/g)];

  assert.equal(exampleSections.length, 2);
  assert.match(exampleSections[0][1], /<strong>Classic example: Factorial<\/strong>/);
  assert.match(exampleSections[0][1], /<pre><code>[\s\S]*factorial\(n - 1\)/);
  assert.match(exampleSections[1][1], /<strong>函数注解完整示例<\/strong>：/);
  assert.match(exampleSections[1][1], /<pre><code>[\s\S]*def greet/);
});
