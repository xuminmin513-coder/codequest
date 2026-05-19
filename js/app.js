// ============================================================
// CodeQuest App - Main Application Logic
// ============================================================

const APP = {
  currentPage: 'dashboard',
  currentLesson: null,
  currentChapter: null,
  hintIndex: 0,
  isFirstTry: true,

  init() {
    this.setupNavigation();
    this.setupLanguage();
    this.renderDashboard();
    this.renderCourseMap();
    this.renderBadges();
    this.applyLanguage();
    this.checkDailyStreak();

    // Restore last viewed lesson on startup
    setTimeout(() => {
      const lastLesson = STORAGE.loadLastLesson();
      if (lastLesson) {
        this.navigateTo('lesson', lastLesson);
      }
    }, 500);
  },

  // ========== NAVIGATION ==========
  setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        this.navigateTo(page);
      });
    });
  },

  navigateTo(page, data) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) targetPage.classList.add('active');

    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navItem) navItem.classList.add('active');

    this.currentPage = page;

    if (page === 'dashboard') this.renderDashboard();
    if (page === 'courses') this.renderCourseMap();
    if (page === 'achievements') this.renderBadges();
    if (page === 'settings') this.renderSettings();
    if (page === 'lesson' && data) this.openLesson(data.chapterId, data.lessonId);
  },

  // ========== LANGUAGE ==========
  setupLanguage() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = STORAGE.getLang() === 'zh' ? 'EN' : '中';
    }
  },

  applyLanguage() {
    const lang = STORAGE.getLang();
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-lang-zh]').forEach(el => {
      el.textContent = lang === 'zh' ? el.dataset.langZh : el.dataset.langEn;
    });

    // Update stat values (they are set dynamically, so this is handled in render functions)
    this.setupLanguage();
    this.renderDashboard();
  },

  toggleLanguage() {
    const current = STORAGE.getLang();
    STORAGE.setLang(current === 'zh' ? 'en' : 'zh');
    this.applyLanguage();
    const msg = current === 'zh' ? 'Switched to English' : '已切换到中文';
    this.showToast('info', '🌐', msg);
  },

  // ========== DASHBOARD ==========
  renderDashboard() {
    const lang = STORAGE.getLang();
    const totalXp = STORAGE.getTotalXp();
    const level = GAMIFICATION.getLevel(totalXp);
    const levelProgress = GAMIFICATION.levelProgress(totalXp);
    const completedCount = STORAGE.getCompletedCount();
    const totalLessons = CHAPTERS.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const streak = STORAGE.getStreak();
    const dailyCount = STORAGE.getDailyCount();

    // Title
    document.getElementById('dash-title').textContent = lang === 'zh' ? '欢迎回来，冒险者！' : 'Welcome back, Adventurer!';
    document.getElementById('dash-subtitle').textContent = lang === 'zh'
      ? '继续你的Python学习之旅'
      : 'Continue your Python learning journey';

    // Stats
    document.getElementById('stat-xp').textContent = totalXp;
    document.getElementById('stat-level').textContent = level;
    document.getElementById('stat-streak').textContent = `${streak} ${lang === 'zh' ? '天' : 'd'}`;
    document.getElementById('stat-completed').textContent = `${completedCount}/${totalLessons}`;

    // Level progress
    document.getElementById('level-display').textContent = `${lang === 'zh' ? '等级' : 'Level'} ${level}`;
    const nextXp = GAMIFICATION.xpForNextLevel(level);
    document.getElementById('xp-display').textContent = `${totalXp} / ${nextXp} XP`;
    document.getElementById('level-bar').style.width = `${levelProgress}%`;

    // Streak flame
    const streakEl = document.getElementById('streak-flame');
    if (streakEl) {
      streakEl.textContent = streak > 0 ? '🔥' : '❄️';
    }

    // Quick actions
    this.renderQuickActions();
  },

  renderQuickActions() {
    const lang = STORAGE.getLang();
    const container = document.getElementById('quick-actions');
    if (!container) return;

    // Find next uncompleted lesson
    let nextLesson = null;
    let nextChapterId = null;
    let nextLessonId = null;

    outer: for (const ch of CHAPTERS) {
      for (const les of ch.lessons) {
        if (!STORAGE.isLessonCompleted(ch.id, les.id)) {
          nextLesson = les;
          nextChapterId = ch.id;
          nextLessonId = les.id;
          break outer;
        }
      }
    }

    const totalXp = STORAGE.getTotalXp();
    const completedCount = STORAGE.getCompletedCount();
    const totalLessons = CHAPTERS.reduce((sum, ch) => sum + ch.lessons.length, 0);

    let html = '';

    if (nextLesson) {
      const ch = CHAPTERS.find(c => c.id === nextChapterId);
      html += `
        <div class="quick-action-card" onclick="APP.navigateTo('lesson', {chapterId: '${nextChapterId}', lessonId: '${nextLessonId}'})">
          <div class="qa-icon">${ch ? ch.icon : '📚'}</div>
          <div class="qa-title">${lang === 'zh' ? '继续学习' : 'Continue'}</div>
          <div class="qa-desc">${GAMIFICATION.getLessonTitle(nextLesson)}</div>
        </div>
      `;
    }

    html += `
      <div class="quick-action-card" onclick="APP.navigateTo('courses')">
        <div class="qa-icon">🗺️</div>
        <div class="qa-title">${lang === 'zh' ? '课程地图' : 'Course Map'}</div>
        <div class="qa-desc">${completedCount}/${totalLessons} ${lang === 'zh' ? '已完成' : 'completed'}</div>
      </div>
      <div class="quick-action-card" onclick="APP.navigateTo('achievements')">
        <div class="qa-icon">🏅</div>
        <div class="qa-title">${lang === 'zh' ? '成就徽章' : 'Achievements'}</div>
        <div class="qa-desc">${STORAGE.getBadges().length}/${GAMIFICATION.BADGES.length} ${lang === 'zh' ? '已获得' : 'earned'}</div>
      </div>
    `;

    container.innerHTML = html;
  },

  // ========== COURSE MAP ==========
  renderCourseMap() {
    const lang = STORAGE.getLang();
    const container = document.getElementById('chapter-list');
    if (!container) return;

    let html = '';
    const completedCounts = STORAGE.getCompletedPerChapter();

    CHAPTERS.forEach((ch, chIdx) => {
      const totalInCh = ch.lessons.length;
      const doneInCh = completedCounts[ch.id] || 0;
      const chProgress = Math.round((doneInCh / totalInCh) * 100);

      // Check if chapter is unlocked (first chapter always, others if previous has first lesson done)
      let isUnlocked = chIdx === 0;
      if (chIdx > 0) {
        const prevCh = CHAPTERS[chIdx - 1];
        const prevFirstLesson = prevCh.lessons[0];
        isUnlocked = STORAGE.isLessonCompleted(prevCh.id, prevFirstLesson.id);
      }

      const chTitle = lang === 'zh' ? ch.title : ch.titleEn;
      const chDesc = lang === 'zh' ? ch.description : ch.descriptionEn;

      html += `
        <div class="chapter-card" style="opacity: ${isUnlocked ? 1 : 0.6}">
          <div class="chapter-header" onclick="APP.toggleChapter('${ch.id}')">
            <div class="chapter-icon">${ch.icon}</div>
            <div class="chapter-info">
              <div class="chapter-title">${chTitle}</div>
              <div class="chapter-desc">${chDesc} · ${totalInCh} ${lang === 'zh' ? '关' : 'lessons'}</div>
            </div>
            <div class="chapter-progress">
              <div class="cp-text">${doneInCh}/${totalInCh}</div>
              <div class="cp-bar"><div class="cp-fill" style="width:${chProgress}%"></div></div>
            </div>
          </div>
          <div class="lesson-list" id="lessons-${ch.id}" style="display: ${chIdx === 0 ? 'block' : 'none'}">
      `;

      ch.lessons.forEach((les, lesIdx) => {
        const isCompleted = STORAGE.isLessonCompleted(ch.id, les.id);
        const isLocked = !isUnlocked || (lesIdx > 0 && !STORAGE.isLessonCompleted(ch.id, ch.lessons[lesIdx - 1].id) && !isCompleted);
        const lesTitle = lang === 'zh' ? les.title : les.titleEn;

        html += `
          <div class="lesson-item ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}"
               onclick="${isLocked ? '' : `APP.navigateTo('lesson', {chapterId: '${ch.id}', lessonId: '${les.id}'})`}">
            <div class="lesson-status">${isCompleted ? '✅' : (isLocked ? '🔒' : '📖')}</div>
            <div class="lesson-num">${lesIdx + 1}</div>
            <div class="lesson-info">
              <div class="lesson-title">${lesTitle}</div>
            </div>
            <div class="lesson-xp">+${les.xp} XP</div>
          </div>
        `;
      });

      html += `</div></div>`;
    });

    container.innerHTML = html;
  },

  toggleChapter(chapterId) {
    const list = document.getElementById(`lessons-${chapterId}`);
    if (list) {
      list.style.display = list.style.display === 'none' ? 'block' : 'none';
    }
  },

  // ========== LESSON VIEW ==========
  openLesson(chapterId, lessonId) {
    const ch = CHAPTERS.find(c => c.id === chapterId);
    if (!ch) return;
    const les = ch.lessons.find(l => l.id === lessonId);
    if (!les) return;

    const lang = STORAGE.getLang();

    // Validate lesson is unlocked (must complete previous lesson first)
    const chIdx = CHAPTERS.findIndex(c => c.id === chapterId);
    const lesIdx = ch.lessons.findIndex(l => l.id === lessonId);

    // Previous chapter must have at least first lesson completed
    if (chIdx > 0) {
      const prevCh = CHAPTERS[chIdx - 1];
      if (!STORAGE.isLessonCompleted(prevCh.id, prevCh.lessons[0].id)) {
        this.showToast('error', '🔒', lang === 'zh' ? '请先完成前一章！' : 'Complete the previous chapter first!');
        this.navigateTo('courses');
        return;
      }
    }

    // Previous lesson in same chapter must be completed
    if (lesIdx > 0) {
      const prevLes = ch.lessons[lesIdx - 1];
      if (!STORAGE.isLessonCompleted(ch.id, prevLes.id)) {
        this.showToast('error', '🔒', lang === 'zh' ? '请先完成上一关！' : 'Complete the previous lesson first!');
        this.navigateTo('courses');
        return;
      }
    }

    this.currentChapter = ch;
    this.currentLesson = les;
    this.hintIndex = 0;
    this.isFirstTry = true;

    const content = lang === 'zh' ? les.content : les.contentEn;
    const title = lang === 'zh' ? les.title : les.titleEn;

    // Navigate to lesson page FIRST (so editor container is visible)
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-lesson').classList.add('active');
    this.currentPage = 'lesson';

    // Set content
    document.getElementById('lesson-title').textContent = `${ch.icon} ${title}`;
    document.getElementById('lesson-xp-badge').textContent = `+${les.xp} XP`;
    document.getElementById('lesson-content').innerHTML = this.renderMarkdown(content);

    // Initialize CodeMirror 6 editor (must be after page is visible)
    const editorContainer = document.getElementById('editor-container');
    if (editorContainer && window.__CM) {
      window.__CM.destroy();
      const savedCode = STORAGE.loadCode(les.id) || les.starterCode;
      window.__CM.createEditor(editorContainer, savedCode);
      window.__CM.focus();
    }

    // Save last viewed lesson for resume
    STORAGE.saveLastLesson(chapterId, lessonId);

    const outputEl = document.getElementById('lesson-output');
    if (outputEl) {
      outputEl.textContent = lang === 'zh' ? '▶ 点击"运行"查看输出' : '▶ Click "Run" to see output';
      outputEl.className = 'terminal-content';
    }

    // Update nav buttons
    this.updateLessonNav();

    // Scroll content to top
    document.getElementById('lesson-content').scrollTop = 0;

    // Enable/disable hint button
    const hintBtn = document.getElementById('btn-hint');
    if (hintBtn) {
      hintBtn.style.display = les.hints && les.hints.length > 0 ? 'flex' : 'none';
    }
  },

  renderMarkdown(md) {
    const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Split by ``` fence markers to separate code from markdown
    const segments = md.split(/^```\w*$/gm);
    const parts = [];

    for (let i = 0; i < segments.length; i++) {
      if (i % 2 === 1) {
        // Code segment: escape and wrap
        if (segments[i].trim()) {
          parts.push('<pre><code>' + escapeHtml(segments[i].trim()) + '</code></pre>');
        }
      } else {
        // Markdown segment: process normally
        const blocks = segments[i].split(/\n\n+/);
        for (const block of blocks) {
          const trimmed = block.trim();
          if (!trimmed) continue;

          let html = '';
          if (/^## (.+)/.test(trimmed)) {
            html = '<h2>' + trimmed.replace(/^## (.+)/, '$1') + '</h2>';
          } else if (/^### (.+)/.test(trimmed)) {
            html = '<h3>' + trimmed.replace(/^### (.+)/, '$1') + '</h3>';
          } else if (/^> /.test(trimmed)) {
            const lines = trimmed.split('\n');
            const quoteLines = lines.map(l => l.replace(/^> /, '').replace(/^>/, ''));
            html = '<blockquote>' + quoteLines.join('<br>') + '</blockquote>';
          } else if (/^- /.test(trimmed) || /^\d+\. /.test(trimmed)) {
            const isOrdered = /^\d+\. /.test(trimmed);
            const lines = trimmed.split('\n');
            const items = lines.map(l => '<li>' + l.replace(/^- /, '').replace(/^\d+\. /, '') + '</li>');
            html = (isOrdered ? '<ol>' : '<ul>') + items.join('') + (isOrdered ? '</ol>' : '</ul>');
          } else {
            html = '<p>' + trimmed.replace(/\n/g, '<br>') + '</p>';
          }
          parts.push(html);
        }
      }
    }

    let result = parts.join('\n');
    result = result
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    return result;
  },

  updateLessonNav() {
    const ch = this.currentChapter;
    const les = this.currentLesson;
    if (!ch || !les) return;

    const lessonIndex = ch.lessons.findIndex(l => l.id === les.id);
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');

    if (prevBtn) {
      if (lessonIndex > 0) {
        prevBtn.style.display = 'flex';
        prevBtn.onclick = () => this.navigateTo('lesson', { chapterId: ch.id, lessonId: ch.lessons[lessonIndex - 1].id });
      } else {
        prevBtn.style.display = 'none';
      }
    }

    if (nextBtn) {
      const isCompleted = STORAGE.isLessonCompleted(ch.id, les.id);
      if (!isCompleted) {
        // Don't show next button until current lesson is completed
        nextBtn.style.display = 'none';
      } else if (lessonIndex < ch.lessons.length - 1) {
        nextBtn.style.display = 'flex';
        nextBtn.textContent = STORAGE.getLang() === 'zh' ? '下一关 →' : 'Next →';
        nextBtn.onclick = () => this.navigateTo('lesson', { chapterId: ch.id, lessonId: ch.lessons[lessonIndex + 1].id });
      } else {
        // Check if there's a next chapter
        const chIndex = CHAPTERS.findIndex(c => c.id === ch.id);
        if (chIndex < CHAPTERS.length - 1) {
          const nextCh = CHAPTERS[chIndex + 1];
          nextBtn.style.display = 'flex';
          nextBtn.onclick = () => this.navigateTo('lesson', { chapterId: nextCh.id, lessonId: nextCh.lessons[0].id });
          nextBtn.textContent = STORAGE.getLang() === 'zh' ? '下一章 →' : 'Next Chapter →';
        } else {
          nextBtn.style.display = 'none';
        }
      }
    }
  },

  // ========== CODE EXECUTION ==========
  runCode() {
    const output = document.getElementById('lesson-output');
    const les = this.currentLesson;
    if (!les || !output) return;

    let code = '';
    if (window.__CM) {
      code = window.__CM.getCode();
    }

    // Auto-save code for resume
    if (code.trim()) {
      STORAGE.saveCode(les.id, code);
    }

    const lang = STORAGE.getLang();

    if (!code.trim()) {
      output.textContent = '⚠️ ' + (lang === 'zh' ? '请先编写代码' : 'Please write some code first');
      output.className = 'terminal-content';
      return;
    }

    const testCases = les.testCases || [{ input: '', expected: '' }];

    // Use built-in Python-to-JS transpiler (runs entirely in browser, no server needed)
    const transpileResult = this.simulatePython(code, testCases[0].input);

    // Display error if any
    if (transpileResult.error) {
      output.textContent = '❌ ' + transpileResult.error;
      output.className = 'terminal-content error';
      this.isFirstTry = false;
      return;
    }

    const transpiledOutput = transpileResult.output;

    // Normalize and compare (strip BOM, trailing whitespace, and trim)
    const normalize = (s) => (s || '').replace(/^﻿|\s+$/g, '').trim();
    const actual = normalize(transpiledOutput);
    const expected = normalize(testCases[0].expected);

    if (actual === expected) {
      output.textContent = (transpiledOutput ? transpiledOutput.trim() + '\n\n' : '') + '🎉 ' + (lang === 'zh' ? '恭喜通关！' : 'Level Complete!');
      output.className = 'terminal-content success';
      this.onLessonComplete(les, this.isFirstTry);
    } else {
      let failMsg = lang === 'zh' ? '❌ 输出不正确，请重试。' : '❌ Output incorrect. Try again!';
      // Show full output for debugging
      if (transpiledOutput && transpiledOutput.trim()) {
        failMsg += '\n--- ' + (lang === 'zh' ? '你的输出' : 'Your output') + ' ---\n' + transpiledOutput.trim();
      } else {
        failMsg += '\n--- ' + (lang === 'zh' ? '你的输出' : 'Your output') + ' ---\n(' + (lang === 'zh' ? '无输出' : 'no output') + ')';
      }
      failMsg += '\n--- ' + (lang === 'zh' ? '期望输出' : 'Expected') + ' ---\n' + expected;
      // If outputs appear visually identical, suggest checking for invisible characters
      if (actual.replace(/\s/g, '') === expected.replace(/\s/g, '')) {
        failMsg += '\n💡 ' + (lang === 'zh' ? '提示：输出看起来很匹配，请检查是否有不可见字符或多余空格' : 'Hint: Outputs look identical - check for invisible characters or extra whitespace');
      }
      output.textContent = failMsg;
      output.className = 'terminal-content error';
      this.isFirstTry = false;
    }
  },

  // ===== Python → JavaScript Transpiler =====

  simulatePython(code, userInput = '') {
    try {
      // Strip import statements
      let clean = code.replace(/^import .+$/gm, '');
      clean = clean.replace(/^from .+ import .+$/gm, '');

      // Clean comments (skip # inside strings)
      const lines = clean.split('\n');
      const cleaned = lines.map(l => {
        let inString = false, stringChar = '';
        for (let i = 0; i < l.length; i++) {
          const c = l[i];
          if (!inString && (c === '"' || c === "'")) {
            inString = true;
            stringChar = c;
          } else if (inString && c === stringChar && l[i-1] !== '\\') {
            inString = false;
          } else if (!inString && c === '#') {
            return l.substring(0, i);
          }
        }
        return l;
      }).join('\n');

      // Merge multi-line bracketed expressions (list/dict/function call literals)
      const merged = this.mergeLines(cleaned);

      const jsCode = this.pythonToJS(merged);
      if (!jsCode.trim()) return { output: '', error: null };

      const inputValues = userInput ? userInput.split('\n') : [];
      let inputIdx = 0;
      let output = '';

      const fn = new Function(
        'range', 'print', 'input', 'getLen',
        'parseInt', 'parseFloat', 'toTitleCase',
        jsCode
      );

      fn(
        // range(stop), range(start, stop), range(start, stop, step)
        function range(...args) {
          let start = 0, stop, step = 1;
          if (args.length === 1) stop = args[0];
          else if (args.length === 2) { start = args[0]; stop = args[1]; }
          else { start = args[0]; stop = args[1]; step = args[2]; }
          const result = [];
          if (step > 0) for (let i = start; i < stop; i += step) result.push(i);
          else for (let i = start; i > stop; i += step) result.push(i);
          return result;
        },
        // print polyfill: convert JS values to Python-style output
        function(...args) {
          output += args.map(a => {
            if (typeof a === 'boolean') return a ? 'True' : 'False';
            if (Array.isArray(a)) return '[' + a.join(', ') + ']';
            return String(a);
          }).join(' ') + '\n';
        },
        function(prompt) {
          if (prompt !== undefined) output += String(prompt);
          return inputIdx < inputValues.length ? inputValues[inputIdx++] : '';
        },
        function(x) { return x.length; },
        parseInt,
        parseFloat,
        function(s) { return typeof s === 'string' ? s.replace(/\w\S*/g, t => t[0].toUpperCase() + t.substring(1).toLowerCase()) : s; }
      );

      return { output: output.trim(), error: null };
    } catch (e) {
      return { output: '', error: this.formatPythonError(e, code) };
    }
  },

  // Format JS error messages to be more Python-like and helpful
  formatPythonError(e, code) {
    let msg = e.message || String(e);
    // Translate common JS error terms to Python-like terms
    msg = msg.replace(/is not defined/g, '名称未定义 (NameError)');
    msg = msg.replace(/Unexpected token/g, '语法错误 (SyntaxError)');
    msg = msg.replace(/Invalid or unexpected token/g, '语法错误 (SyntaxError)');
    msg = msg.replace(/is not a function/g, '类型错误 (TypeError)');
    msg = msg.replace(/Cannot read propert/i, '属性错误 (AttributeError)');
    msg = msg.replace(/Cannot set propert/i, '属性错误 (AttributeError)');
    return msg;
  },

  // Merge multi-line bracketed expressions into single lines
  mergeLines(code) {
    const lines = code.split('\n');
    const result = [];
    let buffer = '';

    for (const raw of lines) {
      const trimmed = raw.trim();
      if (!trimmed && !buffer) continue;

      if (buffer) {
        buffer += '\n' + trimmed;
        if (isBalanced(buffer)) {
          result.push(buffer);
          buffer = '';
        }
      } else if (needsContinuation(trimmed) && !isBalanced(trimmed)) {
        buffer = trimmed;
      } else {
        result.push(raw); // preserve original line including indentation
      }
    }

    if (buffer) result.push(buffer);

    function isBalanced(s) {
      let parens = 0, brackets = 0, braces = 0;
      for (const c of s) {
        if (c === '(') parens++;
        else if (c === ')') parens--;
        else if (c === '[') brackets++;
        else if (c === ']') brackets--;
        else if (c === '{') braces++;
        else if (c === '}') braces--;
      }
      return parens <= 0 && brackets <= 0 && braces <= 0;
    }

    function needsContinuation(s) {
      const t = s.trim();
      if (t.startsWith('#')) return false;
      return /[[({,]\s*$/.test(t);
    }

    return result.join('\n');
  },

  // Convert Python code to JavaScript (indentation → braces)
  pythonToJS(code) {
    // Helper: convert Python boolean/none/logical tokens in expressions
    const pyBool = (s) => s
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null')
      .replace(/\band\b(?!\s*\()/g, '&&')
      .replace(/\bor\b(?!\s*\()/g, '||')
      .replace(/\bnot\b/g, '!');

    const lines = code.split('\n');
    const result = [];
    const indentStack = [0]; // Track indent levels where blocks were opened

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const trimmed = raw.trim();
      if (!trimmed) continue;

      const curIndent = raw.search(/\S|$/);

      // Handle elif BEFORE dedent (same indent as its parent if)
      const elifMatch = trimmed.match(/^elif (.+):\s*$/);
      if (elifMatch) {
        if (indentStack.length > 1) indentStack.pop();
        result.push('} else if (' + pyBool(elifMatch[1]) + ') {');
        indentStack.push(curIndent);
        continue;
      }

      // Handle else BEFORE dedent
      if (/^else\s*:\s*$/.test(trimmed)) {
        if (indentStack.length > 1) indentStack.pop();
        result.push('} else {');
        indentStack.push(curIndent);
        continue;
      }

      // Dedent: close blocks whose indent is >= current
      while (indentStack.length > 1 && curIndent <= indentStack[indentStack.length - 1]) {
        result.push('}');
        indentStack.pop();
      }

      // if statements
      const ifMatch = trimmed.match(/^if (.+):\s*$/);
      if (ifMatch) {
        result.push('if (' + pyBool(ifMatch[1]) + ') {');
        indentStack.push(curIndent);
        continue;
      }

      // for loops
      const forMatch = trimmed.match(/^for (\w+) in (.+):\s*$/);
      if (forMatch) {
        result.push('for (const ' + forMatch[1] + ' of ' + forMatch[2] + ') {');
        indentStack.push(curIndent);
        continue;
      }

      // while loops
      const whileMatch = trimmed.match(/^while (.+):\s*$/);
      if (whileMatch) {
        result.push('while (' + pyBool(whileMatch[1]) + ') {');
        indentStack.push(curIndent);
        continue;
      }

      // function definitions
      const defMatch = trimmed.match(/^def (\w+)\(([^)]*)\):\s*$/);
      if (defMatch) {
        const params = defMatch[2].trim();
        result.push('var ' + defMatch[1] + ' = function(' + params + ') {');
        indentStack.push(curIndent);
        continue;
      }

      // Regular line - transform Python syntax to JS
      let js = this.transformPythonLine(trimmed);
      result.push(js);
    }

    // Close remaining open blocks
    while (indentStack.length > 1) {
      result.push('}');
      indentStack.pop();
    }

    return result.join('\n');
  },

  // Transform Python syntax to JS equivalents
  transformPythonLine(line) {
    // return / break / continue
    line = line.replace(/^break$/, 'break;');
    line = line.replace(/^continue$/, 'continue;');

    // True/False/None
    line = line.replace(/\bTrue\b/g, 'true');
    line = line.replace(/\bFalse\b/g, 'false');
    line = line.replace(/\bNone\b/g, 'null');

    // Logical operators (word boundary, not inside words)
    line = line.replace(/\band\b(?!\s*\()/g, '&&');
    line = line.replace(/\bor\b(?!\s*\()/g, '||');
    line = line.replace(/\bnot\b/g, '!');

    // is not / is (conservative: only match 'is' as a standalone operator)
    line = line.replace(/\bis not\b/g, '!==');

    // == and != to === and !== (avoid double-converting existing ===/!==)
    line = line.replace(/===/g, '__SEQ__');
    line = line.replace(/!==/g, '__SNEQ__');
    line = line.replace(/(?<!=)==(?!=)/g, '===');
    line = line.replace(/(?<!!)!=(?!>)/g, '!==');
    line = line.replace(/__SEQ__/g, '===');
    line = line.replace(/__SNEQ__/g, '!==');

    // f-strings: f"text {var}" => `text ${var}`
    line = line.replace(/f"([^"]*)"/g, (m, content) => {
      return '`' + content.replace(/\{([^}]+)\}/g, (m2, expr) => '${' + expr.trim() + '}') + '`';
    });

    // Built-in functions: len(), str(), int(), float()
    line = line.replace(/\blen\(/g, 'getLen(');
    line = line.replace(/\bstr\(/g, 'String(');
    line = line.replace(/\bint\(/g, 'parseInt(');
    line = line.replace(/\bfloat\(/g, 'parseFloat(');

    // String methods
    line = line.replace(/\.upper\(\)/g, '.toUpperCase()');
    line = line.replace(/\.lower\(\)/g, '.toLowerCase()');
    line = line.replace(/\.strip\(\)/g, '.trim()');
    line = line.replace(/\.title\(\)/g, '.toTitleCase()');

    // List .append() => .push()
    line = line.replace(/\.append\(/g, '.push(');

    // Raw strings r"..." => "..."
    line = line.replace(/\br"/g, '"');

    // Add 'var' keyword for simple assignments to avoid implicit globals
    if (/^[a-zA-Z_]\w*\s*=(?!=)/.test(line) &&
        !line.includes('===') &&
        !line.startsWith('return') &&
        !line.startsWith('for') &&
        !line.startsWith('if') &&
        !line.startsWith('while')) {
      line = 'var ' + line;
    }

    // Handle compound assignments without double var
    line = line.replace(/^var ([a-zA-Z_]\w*)\s*\+=/, '$1 += ');
    line = line.replace(/^var ([a-zA-Z_]\w*)\s*-=/, '$1 -= ');

    // Slice notation: text[7:12] → text.slice(7, 12)
    line = line.replace(/(\w+)\[(\d+)\s*:\s*(\d+)\]/g, '$1.slice($2, $3)');

    // Tuple literals: (a, b, c) → [a, b, c]
    line = line.replace(/\((\d+),\s*(\d+),\s*(\d+)\)/g, '[$1, $2, $3]');

    // Append semicolons (not for lines ending with { or })
    if (!line.endsWith('{') && !line.endsWith('}') && !line.endsWith(';')) {
      line += ';';
    }

    return line;
  },

  // ========== LESSON COMPLETION ==========
  onLessonComplete(lesson, firstTry) {
    const les = this.currentLesson;
    if (!les) return;
    const lessonId = les.id;
    const chapterId = this.currentChapter.id;

    // Check if already completed (don't award XP again)
    const alreadyDone = STORAGE.isLessonCompleted(chapterId, lessonId);
    if (alreadyDone) {
      this.showToast('success', '✅', '已完成！', 'Lesson already completed!');
      return;
    }

    // Calculate XP with bonus
    let xpEarned = les.xp;
    let bonusText = '';

    // First try bonus
    if (firstTry && this.isFirstTry) {
      xpEarned += Math.round(les.xp * 0.2);
      bonusText = ` (${STORAGE.getLang() === 'zh' ? '首次尝试奖励' : 'First Try Bonus'} +${Math.round(les.xp * 0.2)})`;
    }

    // Streak bonus
    const streak = STORAGE.getStreak();
    if (streak >= 3) {
      const streakBonus = Math.round(les.xp * 0.1);
      xpEarned += streakBonus;
      bonusText += ` (${STORAGE.getLang() === 'zh' ? '连续学习奖励' : 'Streak Bonus'} +${streakBonus})`;
    }

    // Save progress
    STORAGE.completeLesson(chapterId, lessonId, xpEarned, firstTry && this.isFirstTry);
    if (firstTry && this.isFirstTry) {
      STORAGE.markPerfect(lessonId);
    }

    // Clear saved code since lesson is done
    STORAGE.clearCode(lessonId);

    // Show level complete celebration
    this.showLevelCompleteCelebration();

    // Show XP toast
    this.showToast('xp', '⭐', `+${xpEarned} XP${bonusText}`, les.title);

    // XP float animation
    this.showXpFloat(xpEarned);

    // Check for new badges
    const stats = this.getStats();
    const oldBadges = STORAGE.getBadges();
    const newBadges = GAMIFICATION.checkNewBadges(stats, oldBadges);

    if (newBadges.length > 0) {
      setTimeout(() => {
        newBadges.forEach(badge => {
          const lang = STORAGE.getLang();
          STORAGE.saveBadges([...oldBadges, badge.id]);
          this.showBadgeModal(badge, lang);
        });
      }, 800);
    }

    // Refresh UI
    this.renderDashboard();
    this.renderCourseMap();
    this.updateLessonNav();
  },

  // Confetti + level complete celebration
  showLevelCompleteCelebration() {
    const lang = STORAGE.getLang();
    const colors = [
      '#ff2d78', '#00d4ff', '#ffd700', '#00ff88',
      '#7b2ff7', '#ff8c00', '#ff5e5e', '#5ec8ff',
      '#ff69b4', '#ffd700', '#00ffcc', '#ff4444'
    ];

    // Create level-complete overlay text
    const overlay = document.createElement('div');
    overlay.className = 'level-complete-overlay';
    overlay.innerHTML = `<div class="level-complete-text">${lang === 'zh' ? '🎉 恭喜通关！' : '🎉 Level Complete!'}</div>`;
    document.body.appendChild(overlay);

    // Create confetti container
    const container = document.createElement('div');
    container.className = 'confetti-container';

    // Shapes: circle, square, thin rectangle
    const shapes = ['50%', '2px', '50%', '2px', '50%', '2px'];

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = (Math.random() * 6 + 4) + 'px';
      particle.style.height = (Math.random() * 10 + 4) + 'px';
      particle.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
      particle.style.animationDelay = Math.random() * 0.6 + 's';
      particle.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
      container.appendChild(particle);
    }

    document.body.appendChild(container);

    // Clean up after animation completes
    setTimeout(() => {
      overlay.remove();
      container.remove();
    }, 4000);
  },

  getStats() {
    const totalXp = STORAGE.getTotalXp();
    const completedLessons = STORAGE.getCompletedCount();
    const badges = STORAGE.getBadges();
    const streak = STORAGE.getStreak();
    const perfectCount = STORAGE.getPerfectCount();
    const completedPerChapter = STORAGE.getCompletedPerChapter();
    const completedChapters = Object.keys(completedPerChapter).length;

    // Calculate how many chapters are fully complete
    let fullyCompleteChapters = 0;
    CHAPTERS.forEach(ch => {
      const done = completedPerChapter[ch.id] || 0;
      if (done >= ch.lessons.length) fullyCompleteChapters++;
    });

    return {
      xp: totalXp,
      completedLessons,
      completedChapters: fullyCompleteChapters,
      badges: badges.length,
      streak,
      perfectLessons: perfectCount,
      fastLearnerDays: STORAGE.checkFastLearnerDay() ? 1 : 0
    };
  },

  // ========== ACHIEVEMENTS ==========
  renderBadges() {
    const lang = STORAGE.getLang();
    const container = document.getElementById('badges-grid');
    if (!container) return;

    const earnedIds = STORAGE.getBadges();
    let html = '';

    GAMIFICATION.BADGES.forEach(badge => {
      const earned = earnedIds.includes(badge.id);
      html += `
        <div class="badge-card ${earned ? 'earned' : 'locked'}">
          <div class="badge-icon">${badge.icon}</div>
          <div class="badge-name">${lang === 'zh' ? badge.nameCn : badge.name}</div>
          <div class="badge-desc">${lang === 'zh' ? badge.descCn : badge.desc}</div>
        </div>
      `;
    });

    container.innerHTML = html;
    document.getElementById('badge-count').textContent = `${earnedIds.length} / ${GAMIFICATION.BADGES.length}`;
  },

  showBadgeModal(badge, lang) {
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-icon">🏅</div>
        <h2>${lang === 'zh' ? '新徽章解锁！' : 'New Badge Unlocked!'}</h2>
        <div style="font-size:48px;margin:16px 0">${badge.icon}</div>
        <p style="font-size:18px;font-weight:600">${lang === 'zh' ? badge.nameCn : badge.name}</p>
        <p>${lang === 'zh' ? badge.descCn : badge.desc}</p>
        <button class="btn btn-pixel btn-primary" onclick="this.closest('.modal-overlay').remove()">${lang === 'zh' ? '太棒了！' : 'Awesome!'}</button>
      </div>
    `;
    document.body.appendChild(modal);
  },

  // ========== HINTS ==========
  showHint() {
    const les = this.currentLesson;
    if (!les || !les.hints || les.hints.length === 0) return;

    const lang = STORAGE.getLang();
    const hintIndex = this.hintIndex % Math.ceil(les.hints.length / 2);

    // Hints are stored as pairs (zh, en)
    const zhIndex = hintIndex * 2;
    const enIndex = hintIndex * 2 + 1;
    const hint = lang === 'zh' && zhIndex < les.hints.length
      ? les.hints[zhIndex]
      : (enIndex < les.hints.length ? les.hints[enIndex] : les.hints[zhIndex]);

    this.showToast('info', '💡', hint);
    this.hintIndex++;
  },

  // ========== UI HELPERS ==========
  showToast(type, icon, message, sub) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div>
        <div class="toast-msg">${message}</div>
        ${sub ? `<div class="toast-sub">${sub}</div>` : ''}
      </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  showXpFloat(xp) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = `+${xp} XP`;
    el.style.left = '50%';
    el.style.top = '50%';
    el.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  checkDailyStreak() {
    const streak = STORAGE.getStreak();
    if (streak > 0 && streak % 7 === 0) {
      const lang = STORAGE.getLang();
      this.showToast('info', '🔥', `${lang === 'zh' ? '连续学习' : 'Streak'} ${streak} ${lang === 'zh' ? '天！' : 'days!'}`);
    }
  },

  // ========== SETTINGS ==========
  renderSettings() {
    const lang = STORAGE.getLang();
    const container = document.getElementById('settings-content');
    if (!container) return;

    container.innerHTML = `
      <div class="settings-card">
        <h3>🌐 ${lang === 'zh' ? '语言 / Language' : 'Language'}</h3>
        <div class="setting-item">
          <div>
            <div class="setting-label">${lang === 'zh' ? '界面语言' : 'Interface Language'}</div>
            <div class="setting-desc">${lang === 'zh' ? '当前：中文' : 'Current: English'}</div>
          </div>
          <button class="toggle-btn" onclick="APP.toggleLanguage()">
            ${lang === 'zh' ? '切换到 English' : '切换到 中文'}
          </button>
        </div>
      </div>
      <div class="settings-card">
        <h3>📊 ${lang === 'zh' ? '学习统计' : 'Learning Stats'}</h3>
        <div class="setting-item">
          <div>
            <div class="setting-label">${lang === 'zh' ? '总 XP' : 'Total XP'}</div>
            <div class="setting-desc">${STORAGE.getTotalXp()} XP</div>
          </div>
        </div>
        <div class="setting-item">
          <div>
            <div class="setting-label">${lang === 'zh' ? '已完成课程' : 'Completed Lessons'}</div>
            <div class="setting-desc">${STORAGE.getCompletedCount()} / ${CHAPTERS.reduce((sum, ch) => sum + ch.lessons.length, 0)}</div>
          </div>
        </div>
        <div class="setting-item">
          <div>
            <div class="setting-label">${lang === 'zh' ? '连续学习' : 'Learning Streak'}</div>
            <div class="setting-desc">${STORAGE.getStreak()} ${lang === 'zh' ? '天' : 'days'}</div>
          </div>
        </div>
      </div>
      <div class="settings-card">
        <h3>⚠️ ${lang === 'zh' ? '数据管理' : 'Data Management'}</h3>
        <div class="setting-item">
          <div>
            <div class="setting-label">${lang === 'zh' ? '重置所有进度' : 'Reset All Progress'}</div>
            <div class="setting-desc">${lang === 'zh' ? '⚠️ 此操作不可撤销！' : '⚠️ This action cannot be undone!'}</div>
          </div>
          <button class="danger-btn" onclick="APP.resetProgress()">${lang === 'zh' ? '重置' : 'Reset'}</button>
        </div>
      </div>
      <div class="settings-card">
        <h3>📖 ${lang === 'zh' ? '关于' : 'About'}</h3>
        <div class="setting-item">
          <div>
            <div class="setting-label">CodeQuest v1.0</div>
            <div class="setting-desc">${lang === 'zh' ? '基于 CodeDex 风格的编程教学游戏' : 'A coding education game inspired by CodeDex'}</div>
          </div>
        </div>
      </div>
    `;
  },

  resetProgress() {
    const lang = STORAGE.getLang();
    if (confirm(lang === 'zh' ? '确定要重置所有学习进度吗？这将清除所有XP、徽章和完成记录。' : 'Reset all progress? This will clear all XP, badges and records.')) {
      localStorage.clear();
      this.showToast('info', '🗑️', lang === 'zh' ? '已重置所有进度' : 'All progress reset');
      this.renderDashboard();
      this.renderCourseMap();
      this.renderBadges();
    }
  }
};

// ========== EVENT BINDINGS ==========
document.addEventListener('DOMContentLoaded', () => {
  APP.init();

  // Global keybindings
  document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to run code (skip if editor is focused, CM6 handles it)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      if (APP.currentPage === 'lesson') {
        const editorEl = document.getElementById('editor-container');
        if (editorEl && editorEl.contains(document.activeElement)) return;
        e.preventDefault();
        APP.runCode();
      }
    }
    // Escape to go back
    if (e.key === 'Escape' && APP.currentPage === 'lesson') {
      APP.navigateTo('courses');
    }
  });
});
