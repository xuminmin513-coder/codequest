const TASK_HEADING = /任务|挑战|练习|\b(?:task|challenge|exercise)\b/i;
const EXAMPLE_TERM = /(?:示例|例子|案例|演示(?!文稿)|拆解)|\b(?:example|demo|walkthrough|case|practical)\b/i;
const FENCE_LINE = /^\s{0,3}```(?:[^`\s]+)?\s*$/;
const HEADING_LINE = /^\s{0,3}(#{2,3})\s+(.+?)\s*$/;
const BLOCKQUOTE_LINE = /^\s*>\s?(.*)$/;
const UNORDERED_ITEM = /^\s*[-*+]\s+(.+)$/;
const ORDERED_ITEM = /^\s*\d+[.]\s+(.+)$/;

export function classifyLessonSection(title = '') {
  const normalized = String(title);
  if (TASK_HEADING.test(normalized)) return 'task';
  if (hasExampleTerm(normalized)) return 'example';
  return 'learn';
}

function hasExampleTerm(value) {
  return EXAMPLE_TERM.test(String(value));
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
    return `\u0000INLINE_CODE_${index}\u0000`;
  });

  html = html
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\u0000INLINE_CODE_(\d+)\u0000/g, (_, index) => protectedCode[Number(index)] || '');

  return html;
}

function isStandaloneExampleLabel(value) {
  const label = String(value).trim().match(/^\*\*([^*]+)\*\*\s*[:：]?\s*$/);
  return Boolean(label && hasExampleTerm(label[1]));
}

function parseBlocks(markdown) {
  const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  let pending = null;

  const flushPending = () => {
    if (!pending) return;
    blocks.push(pending);
    pending = null;
  };

  const addLineToBlock = (type, value) => {
    if (!pending || pending.type !== type) {
      flushPending();
      pending = { type, lines: [] };
    }
    pending.lines.push(value);
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === '') {
      flushPending();
      continue;
    }

    const heading = line.match(HEADING_LINE);
    if (heading) {
      flushPending();
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      continue;
    }

    if (FENCE_LINE.test(line)) {
      flushPending();
      const codeLines = [];
      index += 1;
      while (index < lines.length && !FENCE_LINE.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: 'code', lines: codeLines });
      continue;
    }

    const quote = line.match(BLOCKQUOTE_LINE);
    if (quote) {
      addLineToBlock('blockquote', quote[1]);
      continue;
    }

    const unordered = line.match(UNORDERED_ITEM);
    if (unordered) {
      if (!pending || pending.type !== 'unordered') flushPending();
      if (!pending) pending = { type: 'unordered', lines: [] };
      pending.lines.push(unordered[1]);
      continue;
    }

    const ordered = line.match(ORDERED_ITEM);
    if (ordered) {
      if (!pending || pending.type !== 'ordered') flushPending();
      if (!pending) pending = { type: 'ordered', lines: [] };
      pending.lines.push(ordered[1]);
      continue;
    }

    addLineToBlock('paragraph', line);
  }

  flushPending();
  return blocks;
}

export function renderLessonMarkdown(markdown = '') {
  const parts = [];
  let sectionOpen = false;

  const closeSection = () => {
    if (!sectionOpen) return;
    parts.push('</section>');
    sectionOpen = false;
  };

  const openSection = (tone, level, title) => {
    closeSection();
    parts.push(`<section class="lesson-content-section lesson-content-section--${tone}">`);
    sectionOpen = true;
    if (level && title !== undefined) {
      parts.push(`<h${level}>${renderInline(title)}</h${level}>`);
    }
  };

  const ensureLearnSection = () => {
    if (sectionOpen) return;
    parts.push('<section class="lesson-content-section lesson-content-section--learn">');
    sectionOpen = true;
  };

  for (const block of parseBlocks(markdown)) {
    if (block.type === 'heading') {
      openSection(classifyLessonSection(block.text), block.level, block.text);
      continue;
    }

    if (block.type === 'paragraph' && isStandaloneExampleLabel(block.lines.join('\n'))) {
      openSection('example');
    } else {
      ensureLearnSection();
    }
    if (block.type === 'code') {
      parts.push(`<pre><code>${escapeHtml(block.lines.join('\n'))}</code></pre>`);
    } else if (block.type === 'blockquote') {
      const content = block.lines.map(line => renderInline(line)).join('<br>');
      parts.push(`<blockquote class="lesson-content-callout lesson-content-callout--hint">${content}</blockquote>`);
    } else if (block.type === 'unordered' || block.type === 'ordered') {
      const tag = block.type === 'ordered' ? 'ol' : 'ul';
      const items = block.lines.map(line => `<li>${renderInline(line)}</li>`).join('');
      parts.push(`<${tag}>${items}</${tag}>`);
    } else {
      parts.push(`<p>${renderInline(block.lines.join('\n')).replace(/\n/g, '<br>')}</p>`);
    }
  }

  closeSection();
  return parts.join('\n');
}
