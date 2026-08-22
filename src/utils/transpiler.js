const MAX_LOOP_ITERATIONS = 10000;

export function simulatePython(code, userInput = '') {
  try {
    let clean = code.replace(/^import threading$/gm, () => ''); // threading is sandbox global
    clean = clean.replace(/^import .+$/gm, () => '');
    clean = clean.replace(/^from threading import (.+)$/gm, (m, names) => {
      const vars = names.split(',').map(n => n.trim()).filter(n => n.length > 0);
      return vars.map(v => 'var ' + v + ' = threading.' + v).join(';\n') + ';';
    });
    clean = clean.replace(/^from (\w+) import (.+)$/gm, (m, mod, names) => {
      if (mod === 'math' || mod === 'random') {
        const vars = names.split(',').map(n => n.trim()).filter(n => n.length > 0);
        return vars.map(v => 'var ' + v + ' = ' + mod + '.' + v).join(';\n') + ';';
      }
      return '';
    });

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

    const merged = mergeLines(cleaned);
    const jsCode = pythonToJS(merged);
if (!jsCode.trim()) return { output: '', error: null };

    const inputValues = userInput ? userInput.replace(/\\n/g, '\n').split('\n') : [];
    let inputIdx = 0;
    let output = '';

    const fn = new Function(
      'range', 'print', 'input', 'getLen',
      'parseInt', 'parseFloat', 'toTitleCase', 'raiseError', 'random', 'math', 'threading',
      'pyOpen', 'pyWith', 'pyDiv', 'pyInt', 'PyError',
      'pySet', '__contains__',
      'enumerate', 'zip', 'pySorted', 'pyMap', 'pyFilter', 'pyList', 'pyRe',
      '__filesystem', 'enc', 'dec',
      jsCode
    );

    // Mock file object for simulating open()
    function createMockFile(filename, mode, initialContent) {
      return {
        name: filename,
        mode: mode,
        _filename: filename,
        _mode: mode,
        _content: initialContent || '',
        _closed: false,
        write: function(data) { this._content += String(data); },
        read: function() { return this._content; },
        readline: function() { return this._content; },
        close: function() { this._closed = true; },
        __enter__: function() { return this; },
        __exit__: function() { this.close(); }
      };
    }

    // PyFloat: wraps a number to display Python-style float (e.g., 5.0 instead of 5)
    function PyFloat(val) {
      this._value = Number(val);
      this.toString = function() {
        if (Number.isInteger(this._value) && Number.isFinite(this._value)) {
          return this._value + '.0';
        }
        return String(this._value);
      };
      this.valueOf = function() { return this._value; };
    }

    var __filesystem = {};

    // PySet: simulated Python set
    function pySet(iterable) {
      var s = {
        __pySet: true,
        _values: new Set(),
        add: function(x) { this._values.add(x); return this; },
        discard: function(x) { this._values.delete(x); },
        remove: function(x) { if (!this._values.delete(x)) throw new Error("KeyError: " + x); },
        contains: function(x) { return this._values.has(x); },
        intersection: function(other) {
          var r = pySet();
          this._values.forEach(function(v) { if (other._values.has(v)) r._values.add(v); });
          return r;
        },
        union: function(other) {
          var r = pySet();
          this._values.forEach(function(v) { r._values.add(v); });
          other._values.forEach(function(v) { r._values.add(v); });
          return r;
        },
        difference: function(other) {
          var r = pySet();
          this._values.forEach(function(v) { if (!other._values.has(v)) r._values.add(v); });
          return r;
        },
        toString: function() {
          var arr = [];
          this._values.forEach(function(v) { arr.push(v); });
          arr.sort(function(a, b) { return a > b ? 1 : a < b ? -1 : 0; });
          return "{" + arr.join(", ") + "}";
        }
      };
      if (iterable) {
        for (var i = 0; i < iterable.length; i++) {
          s._values.add(iterable[i]);
        }
      }
      return s;
    }

    function __contains__(container, value) {
      if (container && container.__pySet) return container.contains(value);
      if (Array.isArray(container)) return container.indexOf(value) >= 0;
      if (container && typeof container === 'object') return value in container;
      return false;
    }

    // Python built-in: enumerate(iterable, start=0) -> pairs
    function pyEnumerate(iterable, start = 0) {
      const result = [];
      for (let i = 0; i < iterable.length; i++) {
        result.push([start + i, iterable[i]]);
      }
      return result;
    }

    // Python built-in: zip(...iterables) -> grouped tuples
    function pyZip(...iterables) {
      const minLen = Math.min(...iterables.map(x => x.length));
      const result = [];
      for (let i = 0; i < minLen; i++) {
        result.push(iterables.map(x => x[i]));
      }
      return result;
    }

    // Python built-in: sorted(iterable, key, reverse)
    function pySorted(iterable, key, reverse) {
      const arr = Array.from(iterable);
      if (key) {
        arr.sort(function(a, b) {
          const ka = key(a), kb = key(b);
          return ka > kb ? 1 : ka < kb ? -1 : 0;
        });
      } else {
        arr.sort(function(a, b) { return a > b ? 1 : a < b ? -1 : 0; });
      }
      if (reverse) arr.reverse();
      return arr;
    }

    // Python built-in: map(func, iterable)
    function pyMap(func, iterable) {
      const result = [];
      for (let i = 0; i < iterable.length; i++) {
        result.push(func(iterable[i]));
      }
      return result;
    }

    // Python built-in: filter(func, iterable)
    function pyFilter(func, iterable) {
      const result = [];
      for (let i = 0; i < iterable.length; i++) {
        if (func(iterable[i])) result.push(iterable[i]);
      }
      return result;
    }

    // Python built-in: list(iterable)
    function pyList(iterable) {
      if (Array.isArray(iterable)) return iterable;
      const result = [];
      for (let i = 0; i < iterable.length; i++) {
        result.push(iterable[i]);
      }
      return result;
    }

    // Python re module -> JS RegExp mapping
    const pyRe = {
      match: function(pattern, string) {
        const re = new RegExp(pattern);
        const m = string.match(re);
        return m ? m[0] : null;
      },
      search: function(pattern, string) {
        const re = new RegExp(pattern);
        const m = string.search(re);
        return m >= 0 ? m : null;
      },
      findall: function(pattern, string) {
        const re = new RegExp(pattern, 'g');
        return string.match(re) || [];
      },
      sub: function(pattern, repl, string) {
        const re = new RegExp(pattern, 'g');
        return string.replace(re, repl);
      }
    };

    fn(
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
      function(...args) {
        // Check if last two args are __end__ and __sep__ markers
        let endChar = '\n', sepChar = ' ';
        let values = args;
        if (args.length >= 2 && args[args.length-2] === '__PRINT_END__') {
          endChar = args.pop();
          args.pop(); // remove marker
          sepChar = ' ';
          if (args.length >= 2 && args[args.length-2] === '__PRINT_SEP__') {
            sepChar = args.pop();
            args.pop();
          }
        } else if (args.length >= 2 && args[args.length-2] === '__PRINT_SEP__') {
          sepChar = args.pop();
          args.pop(); // remove marker
        }
        values = args;
        output += values.map(a => {
          if (a instanceof PyFloat) return a.toString();
          if (typeof a === 'boolean') return a ? 'True' : 'False';
          if (Array.isArray(a)) return '[' + a.map(x => x instanceof PyFloat ? x.toString() : String(x)).join(', ') + ']';
          return String(a);
        }).join(sepChar) + endChar;
      },
      function(prompt) {
        if (prompt !== undefined) output += String(prompt);
        if (inputIdx < inputValues.length) {
          const val = inputValues[inputIdx++];
          output += val + '\n';
          return val;
        }
        throw new Error('input() 没有更多输入了。请在下方输入框中输入更多测试值（每行一个），然后重新运行。');
      },
      function(x) { return x.length; },
      parseInt,
      parseFloat,
      function(s) { return typeof s === 'string' ? s.replace(/\w\S*/g, t => t[0].toUpperCase() + t.substring(1).toLowerCase()) : s; },
      function(msg) { throw new Error(msg); },
      { randint: function(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; } },
      { // math module polyfill
        pi: Math.PI,
        e: Math.E,
        sqrt: Math.sqrt,
        ceil: Math.ceil,
        floor: Math.floor,
        abs: Math.abs,
        pow: Math.pow,
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        log: Math.log,
        log10: Math.log10,
        exp: Math.exp,
        degrees: function(r) { return r * 180 / Math.PI; },
        radians: function(d) { return d * Math.PI / 180; },
        factorial: function(n) {
          if (n < 0) throw new Error('ValueError: factorial() not defined for negative values');
          if (n === 0 || n === 1) return 1;
          var r = 1;
          for (var i = 2; i <= n; i++) r *= i;
          return r;
        },
        gcd: function(a, b) {
          a = Math.abs(a); b = Math.abs(b);
          while (b) { var t = b; b = a % b; a = t; }
          return a;
        }
      },
      { // threading mock — synchronous, no real concurrency
        Thread: function(target, args) {
          var _target = target;
          var _args = args || [];
          return {
            start: function() { _target.apply(null, _args); },
            join: function() {}
          };
        },
        Lock: function() {
          var locked = false;
          return {
            acquire: function() { locked = true; },
            release: function() { locked = false; },
            locked: function() { return locked; }
          };
        }
      },
      function pyOpen(filename, mode) {
        mode = mode || 'r';
        if (mode === 'r') {
          var content = (__filesystem[filename] !== undefined) ? __filesystem[filename] : '';
          return createMockFile(filename, mode, content);
        } else if (mode === 'w') {
          __filesystem[filename] = '';
          var f = createMockFile(filename, mode, '');
          var _origW = f.write;
          f.write = function(data) { _origW.call(f, data); __filesystem[filename] = f._content; };
          return f;
        } else if (mode === 'a') {
          var existing = (__filesystem[filename] !== undefined) ? __filesystem[filename] : '';
          var f2 = createMockFile(filename, mode, existing);
          var _origW2 = f2.write;
          f2.write = function(data) { _origW2.call(f2, data); __filesystem[filename] = f2._content; };
          return f2;
        }
        return createMockFile(filename, mode);
      },
      function pyWith(ctx, fn) { var f = ctx.__enter__(); try { fn(f); } finally { ctx.__exit__(); } },
      function pyDiv(a, b) {
        if (Number(b) === 0) throw new PyError('ZeroDivisionError', 'division by zero');
        return new PyFloat(Number(a) / Number(b));
      },
      function pyInt(s) {
        var r = parseInt(s);
        if (isNaN(r) && typeof s === 'string' && s.trim() !== '') {
          throw new PyError('ValueError', "invalid literal for int() with base 10: '" + s + "'");
        }
        return r || 0;
      },
      function PyError(type, msg) { this.__pyType = type; this.message = msg; },
      pySet,
      __contains__,
      pyEnumerate,
      pyZip,
      pySorted,
      pyMap,
      pyFilter,
      pyList,
      pyRe,
      __filesystem,
      // str.encode("utf-8") -> returns Uint8Array
      function enc(str, encoding) {
        if (typeof str !== 'string') return str;
        var encoder = new TextEncoder(encoding || 'utf-8');
        return encoder.encode(str);
      },
      // bytes.decode("utf-8") -> returns string
      function dec(bytes, encoding) {
        if (typeof bytes === 'string') return bytes;
        var decoder = new TextDecoder(encoding || 'utf-8');
        return decoder.decode(bytes);
      }
    );

    return { output, error: null };
  } catch (e) {
    return { output: '', error: formatPythonError(e, code) };
  }
}

function formatPythonError(e, code) {
  let msg = e.message || String(e);
  msg = msg.replace(/is not defined/g, '名称未定义 (NameError)');
  msg = msg.replace(/Unexpected token/g, '语法错误 (SyntaxError)');
  msg = msg.replace(/Invalid or unexpected token/g, '语法错误 (SyntaxError)');
  msg = msg.replace(/is not a function/g, '类型错误 (TypeError)');
  msg = msg.replace(/Cannot read propert/i, '属性错误 (AttributeError)');
  msg = msg.replace(/Cannot set propert/i, '属性错误 (AttributeError)');
  msg = msg.replace(/missing \) after argument list/i, '语法错误：请检查括号是否匹配、字符串引号是否闭合 (SyntaxError)');
  return msg;
}

function mergeLines(code) {
  const lines = code.split('\n');
  const result = [];
  let buffer = '';

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed && !buffer) continue;

    if (buffer) {
      buffer += ' ' + trimmed;
      if (isBalanced(buffer)) {
        result.push(buffer);
        buffer = '';
      }
    } else if (needsContinuation(trimmed) && !isBalanced(trimmed)) {
      buffer = trimmed;
    } else {
      result.push(raw);
    }
  }
  if (buffer) result.push(buffer);
  return result.join('\n');

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
}

function pythonToJS(code) {
  const pyBool = (s) => s
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null')
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/(\b(?!not\b)\w+)\s+not\s+in\s+([\w.]+)/g, '!__contains__($2, $1)')
    .replace(/\bnot\b/g, '!')
    .replace(/(\w+)\s+in\s+([\w.]+)/g, '__contains__($2, $1)');

  const lines = code.split('\n');

  // ── Strip Python type annotations before parsing ──
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t || t.startsWith('#')) continue;

    let raw = lines[i];

    // ── 1. Strip return annotation on def lines ──
    // def foo(x: int) -> str:  →  def foo(x: int):
    if (/\)\s*->/.test(t) && /^def\b/.test(t)) {
      let depth = 0, closeParen = -1;
      for (let j = 0; j < raw.length; j++) {
        if (raw[j] === '(') depth++;
        else if (raw[j] === ')') {
          depth--;
          if (depth === 0) { closeParen = j; break; }
          if (depth < 0) break;
        }
      }
      if (closeParen >= 0) {
        // Find the colon after -> at bracket-depth 0
        let bd = 0, colonIdx = -1;
        for (let j = closeParen + 1; j < raw.length; j++) {
          if (raw[j] === '[') bd++;
          else if (raw[j] === ']') bd--;
          else if (raw[j] === ':' && bd === 0) { colonIdx = j; break; }
        }
        if (colonIdx >= 0) {
          raw = raw.substring(0, closeParen + 1) + ':' + raw.substring(colonIdx + 1);
        }
      }
    }

    // ── 2. Strip parameter annotations inside def (...) ──
    // def foo(name: str, age: int = 25)  →  def foo(name, age = 25)
    const defParenMatch = raw.match(/^(def\s+\w+\s*\()(.*)(\)\s*:)/);
    if (defParenMatch) {
      const params = defParenMatch[2];
      // Split params by comma, respecting brackets
      const pList = [];
      let pdepth = 0, pStart = 0;
      for (let j = 0; j < params.length; j++) {
        if (params[j] === '[' || params[j] === '(') pdepth++;
        else if (params[j] === ']' || params[j] === ')') pdepth--;
        else if (params[j] === ',' && pdepth === 0) {
          pList.push(params.substring(pStart, j).trim());
          pStart = j + 1;
        }
      }
      pList.push(params.substring(pStart).trim());

      const cleaned = pList.map(p => {
        // Find first : followed by whitespace (annotation marker)
        let ci = -1;
        for (let j = 0; j < p.length; j++) {
          if (p[j] === ':' && j + 1 < p.length && (p[j + 1] === ' ' || p[j + 1] === '\t')) {
            ci = j; break;
          }
          if (p[j] === '[' || p[j] === '(' || p[j] === '{') break; // inside composite type — skip
        }
        if (ci < 0) return p;

        const beforeType = p.substring(0, ci);
        const afterColon = p.substring(ci + 1).trimStart();
        // Find = at bracket-depth 0 (default value separator)
        let bd = 0, eqIdx = -1;
        for (let j = 0; j < afterColon.length; j++) {
          if (afterColon[j] === '[') bd++;
          else if (afterColon[j] === ']') bd--;
          else if (afterColon[j] === '=' && bd === 0) { eqIdx = j; break; }
        }
        if (eqIdx >= 0) {
          return (beforeType + ' ' + afterColon.substring(eqIdx)).trim();
        }
        return beforeType.trim();
      }).join(', ');

      raw = defParenMatch[1] + cleaned + '):';
    }

    // ── 3. Strip variable annotations: varname: type = value → varname = value ──
    // Only for lines that look like variable assignments (not in strings, f-strings)
    if (/^[a-zA-Z_]/.test(t) && t.includes(':') && t.includes('=')) {
      // Check it's NOT a def, for, if, while, with, class, import, return, print, etc.
      if (!/^(def |for |if |while |with |class |import |return |elif |else |except )/.test(t)) {
        const varAnnMatch = raw.match(/^(\s*)([a-zA-Z_]\w*)\s*:\s*(?:[a-zA-Z_][a-zA-Z0-9_<>[\],.\s]*)?\s*=\s*/);
        if (varAnnMatch) {
          // Verify the : is not part of a dict literal or f-string
          // Simple heuristic: if there are unclosed braces, skip
          raw = varAnnMatch[1] + varAnnMatch[2] + ' = ' + raw.substring(varAnnMatch[0].length);
        }
      }
    }

    lines[i] = raw;
  }

  const result = ['var __lc = 0;', 'var __name__ = "__main__";'];
  const indentStack = [0];
  const decoratorStack = [];
  let pendingDecorator = null;
  let inClass = false;
  let classIndent = 0;
  let currentClass = '';
  let classConstructEmitted = false;
  let classParent = '';
  let classChainEmitted = false;

  const emitClassChain = () => {
    if (classParent && !classChainEmitted) {
      result.push(currentClass + '.prototype = Object.create(' + classParent + '.prototype);');
      result.push(currentClass + '.prototype.constructor = ' + currentClass + ';');
      classChainEmitted = true;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    let trimmed = raw.trim();
    if (!trimmed) continue;

    const curIndent = raw.search(/\S|$/);

    // ── Decorator @name → save for next def ──
    if (trimmed.startsWith('@') && /^@\w+\s*$/.test(trimmed)) {
      pendingDecorator = trimmed.substring(1).trim();
      continue;
    }

    // ── Exit class when indent back to class level ──
    if (inClass && curIndent <= classIndent) {
      inClass = false;
    }

    // ── Inside class body: self. → this. (keep a version for keyword lines) ──
    if (inClass) {
      trimmed = trimmed.replace(/\bself\./g, 'this.');
    }

    // ── class ClassName: or class ClassName(Parent): ──
    const classMatch = trimmed.match(/^class (\w+)(?:\((\w+)\))?:\s*$/);
    if (classMatch) {
      // ── Close any open blocks before class ──
      while (indentStack.length > 1 && curIndent <= indentStack[indentStack.length - 1]) {
        if (decoratorStack.pop()) {
          result.push('});');
        } else {
          result.push('}');
        }
        indentStack.pop();
      }
      currentClass = classMatch[1];
      classParent = classMatch[2] || '';
      classIndent = curIndent;
      classConstructEmitted = false;
      classChainEmitted = false;
      inClass = true;
      // Don't push to indentStack — methods push themselves
      continue;
    }

    const elifMatch = trimmed.match(/^elif (.+):\s*$/);
    if (elifMatch) {
      if (indentStack.length > 1) indentStack.pop();
      result.push('} else if (' + pyBool(elifMatch[1]) + ') {');
      indentStack.push(curIndent);
      decoratorStack.push(false);
      continue;
    }

    if (/^else\s*:\s*$/.test(trimmed)) {
      if (indentStack.length > 1) indentStack.pop();
      result.push('} else {');
      indentStack.push(curIndent);
      decoratorStack.push(false);
      continue;
    }

    // ── try/except/finally ──
    if (/^try:\s*$/.test(trimmed)) {
      result.push('try {');
      indentStack.push(curIndent);
      decoratorStack.push(false);
      continue;
    }

    const exceptMatch = trimmed.match(/^except(?:\s+(\w+))?:\s*$/);
    if (exceptMatch) {
      if (indentStack.length > 1) indentStack.pop();
      result.push('} catch(__e) {');
      indentStack.push(curIndent);
      decoratorStack.push(false);
      continue;
    }

    if (/^finally:\s*$/.test(trimmed)) {
      if (indentStack.length > 1) indentStack.pop();
      result.push('} finally {');
      indentStack.push(curIndent);
      decoratorStack.push(false);
      continue;
    }

    // ── Close blocks when indent decreases ──
    while (indentStack.length > 1 && curIndent <= indentStack[indentStack.length - 1]) {
      if (decoratorStack.pop()) {
        result.push('});');
      } else {
        result.push('}');
      }
      indentStack.pop();
    }
    // Re-check class exit after popping
    if (inClass && curIndent <= classIndent) inClass = false;

    // ── if / elif (handled above) / for / while ──
    const ifMatch = trimmed.match(/^if (.+):\s*$/);
    if (ifMatch) {
      result.push('if (' + pyBool(ifMatch[1]) + ') {');
      indentStack.push(curIndent);
      decoratorStack.push(false);
      continue;
    }

    const forMatch = trimmed.match(/^for ([\w,\s]+) in (.+):\s*$/);
    if (forMatch) {
      let vars = forMatch[1].trim();
      let iter = forMatch[2].trim();
      if (vars.indexOf(',') >= 0) {
        const varList = vars.split(',').map(v => v.trim());
        vars = '[' + varList.join(', ') + ']';
      }
      result.push('for (const ' + vars + ' of ' + iter + ') {');
      result.push('if (++__lc > ' + MAX_LOOP_ITERATIONS + ') raiseError("检测到死循环 / Infinite loop detected");');
      indentStack.push(curIndent);
      decoratorStack.push(false);
      continue;
    }

    const whileMatch = trimmed.match(/^while (.+):\s*$/);
    if (whileMatch) {
      result.push('while (' + pyBool(whileMatch[1]) + ') {');
      result.push('if (++__lc > ' + MAX_LOOP_ITERATIONS + ') raiseError("检测到死循环 / Infinite loop detected");');
      indentStack.push(curIndent);
      decoratorStack.push(false);
      continue;
    }

    // ── def: method (inside class) or standalone function ──
    const defMatch = trimmed.match(/^def (\w+)\(([^)]*)\):\s*$/);
    if (defMatch) {
      let fnName = defMatch[1];
      let rawParams = defMatch[2].trim()
        .replace(/\*\*(\w+)/g, '__kw_$1')
        .replace(/\*(\w+)/g, '...$1');
      if (inClass && curIndent > classIndent) {
        let mn = fnName;
        let params = rawParams.replace(/^\s*self\s*(,\s*)?/, '');
        if (mn === '__init__') {
          if (!classConstructEmitted) {
            result.push('var ' + currentClass + ' = function(' + params + ') {');
            var callParams = params.replace(/=\s*([^,)]+)/g, '');
            result.push('if (!(this instanceof ' + currentClass + ')) return new ' + currentClass + '(' + callParams + ');');
            classConstructEmitted = true;
          } else {
            emitClassChain();
            result.push(currentClass + '.prototype.' + mn + ' = function(' + params + ') {');
          }
        } else {
          if (!classConstructEmitted) {
            result.push('var ' + currentClass + ' = function() {');
            result.push('if (!(this instanceof ' + currentClass + ')) return new ' + currentClass + '();');
            result.push('};');
            classConstructEmitted = true;
          }
          emitClassChain();
          result.push(currentClass + '.prototype.' + mn + ' = function(' + params + ') {');
        }
      } else {
        // Standalone function (possibly decorated)
        var __wasDecorated = !!pendingDecorator;
        if (pendingDecorator) {
          result.push('var ' + fnName + ' = ' + pendingDecorator + '(function(' + rawParams + ') {');
          pendingDecorator = null;
          decoratorStack.push(true);
        } else {
          result.push('var ' + fnName + ' = function(' + rawParams + ') {');
        }
      }
      indentStack.push(curIndent);
      if (!__wasDecorated) decoratorStack.push(false);
      continue;
    }

    // ── with ... as var: ──
    const withMatch = trimmed.match(/^with (.+) as (\w+):\s*$/);
    if (withMatch) {
      const expr = transformPythonLine(withMatch[1].trim());
      result.push('var ' + withMatch[2] + ' = ' + expr.replace(/;$/, '') + ';');
      continue;
    }

    // ── nonlocal / global: no-op in JS (closures capture variables automatically) ──
    if (/^nonlocal\s/.test(trimmed) || /^global\s/.test(trimmed)) {
      result.push('; // ' + trimmed);
      continue;
    }

    // ── pass: no-op ──
    if (/^pass\s*$/.test(trimmed)) {
      result.push('; // pass');
      continue;
    }

    let js = transformPythonLine(trimmed);
    result.push(js);
  }

  while (indentStack.length > 1) {
    if (decoratorStack.pop()) {
      result.push('});');
    } else {
      result.push('}');
    }
    indentStack.pop();
  }

  return result.join('\n');
}

function transformPythonLine(line) {
  // Handle print() with end= and sep= keyword arguments
  // Convert: print(x, end="") → print(x, '__PRINT_END__', "")
  // Convert: print(x, y, sep=",") → print(x, y, '__PRINT_SEP__', ",")
  // Convert: print(x, end=" ", sep=",") → print(x, '__PRINT_END__', " ", '__PRINT_SEP__', ",")
  const printMatch = line.match(/^(\s*print\s*\()(.+)\)\s*$/);
  if (printMatch) {
    const prefix = printMatch[1];
    let args = printMatch[2];
    const kwArgs = {};
    // Extract keyword args one by one
    const kwRe = /,\s*(end|sep)\s*=\s*((['"])([^\3]*?)\3)/g;
    let match;
    while ((match = kwRe.exec(args)) !== null) {
      kwArgs[match[1]] = match[2];
      // Remove this matched portion from args
      args = args.substring(0, match.index) + args.substring(match.index + match[0].length);
    }
    if (Object.keys(kwArgs).length > 0) {
      const tokens = [];
      if (kwArgs.end !== undefined) {
        tokens.push("'__PRINT_END__'");
        tokens.push(kwArgs.end);
      }
      if (kwArgs.sep !== undefined) {
        tokens.push("'__PRINT_SEP__'");
        tokens.push(kwArgs.sep);
      }
      line = prefix + args + ", " + tokens.join(", ") + ")";
    }
  }

  // ── Triple-quoted docstrings: no-op in JS ──
  // Handle """text""" (single-line) and """ alone on line (multi-line delimiter)
  if (/^\s*"""[\s\S]*"""\s*$/.test(line) || /^\s*'''[\s\S]*'''\s*$/.test(line) ||
      /^\s*"""\s*$/.test(line.trim()) || /^\s*'''\s*$/.test(line.trim())) {
    return '; // ' + line.trim();
  }

  line = line.replace(/^break$/, 'break;');
  line = line.replace(/^continue$/, 'continue;');
  line = line.replace(/\bTrue\b/g, 'true');
  line = line.replace(/\bFalse\b/g, 'false');
  line = line.replace(/\bNone\b/g, 'null');
  line = line.replace(/\band\b/g, '&&');
  line = line.replace(/\bor\b/g, '||');
  line = line.replace(/(\b(?!not\b)\w+)\s+not\s+in\s+([\w.]+)/g, '!__contains__($2, $1)');
  line = line.replace(/\bnot\b/g, '!');
  // `in` replacement must come AFTER list comprehension
  // List comprehension: [expr for var in iterable (if cond)?]
  line = line.replace(
    /\[(.+?)\s+for\s+(\w+)\s+in\s+((?:[^[\]]|\[[^\]]*\])+?)(?:\s+if\s+(.+?))?\]/,
    (match, expr, varName, iterable, condition) => {
      let js = '(function(){var __res=[];for(var __i=0;__i<' + iterable + '.length;__i++){var ' + varName + '=' + iterable + '[__i];';
      if (condition) {
        js += 'if(' + condition + '){__res.push(' + expr.trim() + ');}}';
      } else {
        js += '__res.push(' + expr.trim() + ');}';
      }
      js += 'return __res;})()';
      return js;
    }
  );
  line = line.replace(/(\w+)\s+in\s+([\w.]+)/g, '__contains__($2, $1)');
  line = line.replace(/\bis not\b/g, '!==');

  line = line.replace(/===/g, '__SEQ__');
  line = line.replace(/!==/g, '__SNEQ__');
  line = line.replace(/(?<!=)==(?!=)/g, '===');
  line = line.replace(/(?<!!)!=(?!>)/g, '!==');
  line = line.replace(/__SEQ__/g, '===');
  line = line.replace(/__SNEQ__/g, '!==');

  // f-string: handle both f"..." and f'...'
  line = line.replace(/f"([^"]*)"/g, (m, content) => {
    return '`' + content.replace(/\{([^}]+)\}/g, (m2, expr) => '${' + expr.trim() + '}') + '`';
  });
  line = line.replace(/f'([^']*)'/g, (m, content) => {
    return '`' + content.replace(/\{([^}]+)\}/g, (m2, expr) => '${' + expr.trim() + '}') + '`';
  });

  // Python lambda -> JS arrow function
  line = line.replace(
    /\blambda\s*((?:[a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)*)?)\s*:\s*([^,)]+)/g,
    (match, params, body) => {
      params = params ? params.trim() : '';
      return `(${params}) => (${body.trim()})`;
    }
  );

  line = line.replace(/\blen\(/g, 'getLen(');
  line = line.replace(/\bstr\(/g, 'String(');
  line = line.replace(/\bint\(/g, 'pyInt(');
  line = line.replace(/\bfloat\(/g, 'parseFloat(');
  line = line.replace(/(?<![.\w])open\(/g, 'pyOpen(');
  line = line.replace(/(?<![.\w])set\s*\(/g, 'pySet(');

  // Python // (floor division) -> Math.floor(x / y)
  line = line.replace(/(\w+)\s*\/\/\s*(\w+)/g, 'Math.floor($1 / $2)');

  // Python / (true division) -> pyDiv() to ensure float result like Python 3
  line = line.replace(/(\w+)\s*(?<!\/)\/(?!\/)\s*(\w+)/g, 'pyDiv($1, $2)');

  line = line.replace(/\.upper\(\)/g, '.toUpperCase()');
  line = line.replace(/\.lower\(\)/g, '.toLowerCase()');
  line = line.replace(/\.strip\(\)/g, '.trim()');
  line = line.replace(/\.title\(\)/g, '.toTitleCase()');
  line = line.replace(/\.append\(/g, '.push(');
  // Python str.encode("utf-8") → enc(str) helper
  line = line.replace(/([\w.]+)\.encode\s*\(/g, 'enc($1, ');
  // Python bytes.decode("utf-8") → dec(bytes) helper
  line = line.replace(/([\w.]+)\.decode\s*\(/g, 'dec($1, ');
  // Preserve backslashes in raw strings: r"\d+" → "\\d+" (not just "\d+")
  line = line.replace(/\br"((?:[^"\\]|\\.)*)"/g, (_, inner) => '"' + inner.replace(/\\/g, '\\\\') + '"');
  line = line.replace(/\br'((?:[^'\\]|\\.)*)'/g, (_, inner) => "'" + inner.replace(/\\/g, '\\\\') + "'");

  // Python built-in function name mappings
  line = line.replace(/(?<![.\w])sorted\s*\(/g, 'pySorted(');
  // enumerate and zip are already available as parameter names — no prefix needed
  line = line.replace(/(?<![.\w])map\s*\(/g, 'pyMap(');
  line = line.replace(/(?<![.\w])filter\s*\(/g, 'pyFilter(');
  line = line.replace(/(?<![.\w])list\s*\(/g, 'pyList(');
  line = line.replace(/\bre\.(match|search|findall|sub)\s*\(/g, 'pyRe.$1(');

    // Handle tuple unpacking: x, y, z = ... -> var [x, y, z] = ...
    if (!line.startsWith('return') && !line.startsWith('for') &&
        !line.startsWith('if') && !line.startsWith('while') &&
        !line.includes('===')) {
      const tupleMatch = line.match(/^((?:[a-zA-Z_]\w*\s*,\s*)+[a-zA-Z_]\w*)\s*=(?!=)/);
      if (tupleMatch) {
        const vars = tupleMatch[1].split(',').map(v => v.trim());
        line = 'var [' + vars.join(', ') + '] = ' + line.substring(tupleMatch[0].length).trim();
      }
    }
    if (/^[a-zA-Z_]\w*\s*=(?!=)/.test(line) &&
      !line.includes('===') &&
      !line.startsWith('return') &&
      !line.startsWith('for') &&
      !line.startsWith('if') &&
      !line.startsWith('while')) {
    line = 'var ' + line;
  }

  // Handle multiple return values: return a, b, c -> return [a, b, c]
  if (/^return\s/.test(line)) {
    const retExpr = line.replace(/^return\s+/, '').trim().replace(/;$/, '');
    let depth = 0, commaFound = false;
    for (const c of retExpr) {
      if (c === '(' || c === '[' || c === '{') depth++;
      else if (c === ')' || c === ']' || c === '}') depth--;
      else if (c === ',' && depth === 0) { commaFound = true; break; }
    }
    if (commaFound) {
      line = 'return [' + retExpr + '];';
    }
  }

  line = line.replace(/^var ([a-zA-Z_]\w*)\s*\+=/, '$1 += ');
  line = line.replace(/^var ([a-zA-Z_]\w*)\s*-=/, '$1 -= ');
  line = line.replace(/(\w+)\[(\d+)\s*:\s*(\d+)\]/g, '$1.slice($2, $3)');
  line = line.replace(/(?<!\w)\((\d+),\s*(\d+),\s*(\d+)\)/g, '[$1, $2, $3]');

  if (!line.endsWith('{') && !line.endsWith('}') && !line.endsWith(';')) {
    line += ';';
  }

  return line;
}
