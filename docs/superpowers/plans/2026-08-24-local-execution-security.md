# XM²code 本地执行安全实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 删除 XM²code 当前能够触达宿主电脑和外部 AI 的高风险通道，以随包 Pyodide 模块 Worker 运行普通 Python 课程，并让 Electron 默认拒绝外部网络、导航、权限和新窗口。

**Architecture:** Electron 主进程只负责用安全自定义协议提供 `dist` 静态文件，不再接收玩家代码。React 课程页面通过 `PythonRunner` 与一个模块 Worker 通信；Worker 在加载一次 Pyodide 后顺序执行当前判题的测试用例，页面离开、停止、超时或判题完成时销毁 Worker。协议校验、一次性能力标记、CSP 和 Electron 会话网络策略共同形成边界。

**Tech Stack:** React 18、Electron 42、Vite 6、Node `node:test`、Playwright Electron、Pyodide 314.0.5、vite-plugin-static-copy 4.1.1。

---

## 范围与后续计划

本计划只实现已批准安全规格中的“执行安全”子项目，因为运行器、存档仓库和课程内容是可以独立验收的三个系统。完成本计划后，再分别编写：

1. 本地存档完整性、导入白名单和三份恢复点计划；
2. 高级课程 `visual-lab` 计划，用真实标注的教学实验替代线程、Socket、pyecharts 和 PySpark 模拟；
3. 安装包签名、自动更新和跨平台发行计划。

在 `visual-lab` 完成前，不适合由 Pyodide 真实运行的高级关卡必须显示“教学实验尚未迁移”，不能退回旧 `new Function` 模拟器，也不能伪装成真实 Python。

当前工作区含有未提交的课程、设置、存档迁移和测试改动。实施时只暂存本任务明确列出的文件，不使用 `git add .`，不覆盖这些文件中与本任务无关的修改。

**实施偏差记录（已验证）：** Electron 42 在该自定义协议上拒绝模块化 CORS 子资源。最终生产构建将经典 IIFE 入口内联到 `index.html` 并写入构建时 SHA-256 CSP；Pyodide 模块、Wasm、标准库和锁文件随 Worker 打包。`xmcode://` 明确设置 `supportFetchAPI: false` 与 `corsEnabled: false`，只提供受限静态资源，不开放协议 Fetch API。此方案已由 Electron E2E 验证界面挂载、真实 Python、断网和主机文件隔离。

## 文件责任图

- `main.cjs`：安全自定义协议、Electron 会话策略和窗口生命周期；绝不接收玩家代码。
- `index.html`：生产与浏览器共同遵守的 CSP。
- `src/runtime/pythonProtocol.js`：运行请求、运行结果和大小限制的纯函数校验。
- `src/runtime/PythonRunner.js`：Worker 生命周期、超时、停止和能力标记校验。
- `src/runtime/python.worker.js`：加载本地 Pyodide、重定向输入输出、执行学生代码。
- `src/runtime/runtimePolicy.js`：决定课程使用真实 Python还是显示未迁移教学实验。
- `src/components/Lesson.jsx`：创建与销毁运行器、显示运行状态和停止按钮。
- `src/components/Settings.jsx`：移除 AI 密钥界面。
- `src/utils/deprecatedDataCleanup.js`：只删除旧 DeepSeek 存储键，不读取或导出其值。
- `src/utils/storage.js`：删除 DeepSeek getter/setter，并在备份导入导出时拒绝旧密钥键。
- `vite.config.js`：复制固定版本的 Pyodide 核心资源，不复制任意 wheel。
- `tests/securitySourceContract.test.js`：禁止危险能力重新出现。
- `tests/pythonProtocol.test.js`：协议边界测试。
- `tests/pythonRunner.test.js`：使用假 Worker 验证生命周期。
- `tests/runtimePolicy.test.js`：普通 Python与教学实验分流测试。
- `tests/deprecatedDataCleanup.test.js`：旧密钥清理与备份排除测试。
- `tests/electronSecurity.e2e.mjs`：Electron 沙箱、网络、新窗口和导航的运行时证据。

### Task 1：用失败测试锁住危险能力

**Files:**
- Create: `tests/securitySourceContract.test.js`

- [x] **Step 1: 写源码安全契约测试**

测试读取 `main.cjs`、`preload.js`、`index.html`、`Lesson.jsx`、`Settings.jsx`、`storage.js` 和 `transpiler.js`，断言：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = relative => readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8');

test('Electron main process has no host Python execution bridge', () => {
  const source = read('main.cjs');
  assert.doesNotMatch(source, /child_process|execFile|spawn\s*\(|run-python|ipcMain/);
  assert.match(source, /sandbox:\s*true/);
  assert.match(source, /setPermissionRequestHandler/);
  assert.match(source, /setWindowOpenHandler/);
  assert.match(source, /will-navigate/);
});

test('renderer has no privileged preload bridge', () => {
  assert.equal(existsSync(new URL('../preload.js', import.meta.url)), false);
  assert.doesNotMatch(read('main.cjs'), /preload:/);
});

test('AI request and API key UI are absent', () => {
  assert.equal(existsSync(new URL('../src/components/AIChat.jsx', import.meta.url)), false);
  assert.doesNotMatch(read('src/components/Lesson.jsx'), /AIChat|DeepSeek/);
  assert.doesNotMatch(read('src/components/Settings.jsx'), /getDeepSeekKey|setDeepSeekKey|API Key|DeepSeek/);
  assert.doesNotMatch(read('src/utils/storage.js'), /getDeepSeekKey|setDeepSeekKey/);
});

test('dynamic JavaScript Python simulator is absent', () => {
  assert.equal(existsSync(new URL('../src/utils/transpiler.js', import.meta.url)), false);
  assert.doesNotMatch(read('src/components/Lesson.jsx'), /simulatePython/);
});

test('document CSP forbids generic eval and external connections', () => {
  const source = read('index.html');
  assert.match(source, /Content-Security-Policy/);
  assert.match(source, /script-src 'self' 'wasm-unsafe-eval'/);
  assert.match(source, /connect-src 'self'/);
  assert.doesNotMatch(source, /'unsafe-eval'/);
});
```

- [x] **Step 2: 运行并确认 RED**

Run: `node --test tests/securitySourceContract.test.js`

Expected: 至少因 `child_process`、`preload.js`、`AIChat.jsx`、`transpiler.js` 和缺少 CSP 而失败；失败原因必须与待删除风险一致。

- [x] **Step 3: 保留失败测试，不改生产代码**

Run: `git diff --check -- tests/securitySourceContract.test.js`

Expected: exit 0。

### Task 2：删除宿主执行和 AI 通道并加固 Electron

**Files:**
- Modify: `main.cjs`
- Delete: `preload.js`
- Modify: `index.html`
- Delete: `src/components/AIChat.jsx`
- Modify: `src/components/Lesson.jsx`
- Modify: `src/components/Settings.jsx`
- Create: `src/utils/deprecatedDataCleanup.js`
- Modify: `src/utils/storage.js`
- Create: `tests/deprecatedDataCleanup.test.js`

- [x] **Step 1: 先写旧密钥清理测试**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import { purgeDeprecatedSecrets } from '../src/utils/deprecatedDataCleanup.js';

test('purge removes the former DeepSeek key without reading it', () => {
  const storage = createMemoryStorage({
    codedex_deepseek_key: 'secret-value',
    codedex_lang: 'zh',
  });
  purgeDeprecatedSecrets(storage);
  assert.equal(storage.getItem('codedex_deepseek_key'), null);
  assert.equal(storage.getItem('codedex_lang'), 'zh');
});
```

Run: `node --test tests/deprecatedDataCleanup.test.js`

Expected: FAIL，模块尚不存在。

- [x] **Step 2: 实现只删除不读取的清理函数**

```js
const DEPRECATED_SECRET_KEYS = Object.freeze(['codedex_deepseek_key']);

export function purgeDeprecatedSecrets(storage = globalThis.localStorage) {
  if (!storage) return;
  for (const key of DEPRECATED_SECRET_KEYS) storage.removeItem(key);
}

export function isDeprecatedSecretKey(key) {
  return DEPRECATED_SECRET_KEYS.includes(key);
}
```

在应用初始化时调用一次 `purgeDeprecatedSecrets()`；删除 `STORAGE.getDeepSeekKey()` 和 `STORAGE.setDeepSeekKey()`。导出循环跳过 `isDeprecatedSecretKey(key)`，导入遇到该键时忽略。

- [x] **Step 3: 删除 AI UI 与宿主 Python IPC**

删除 `AIChat.jsx` 和 `preload.js`。从 `Lesson.jsx` 删除 AI import 与按钮，从 `Settings.jsx` 删除 API Key state、effect、保存函数和整张 AI 设置卡。重写 `main.cjs`，只保留 Electron、路径、URL 和安全静态文件提供逻辑，不再导入 `ipcMain`、`child_process`、`os` 或 `crypto`。

注册协议时使用：

```js
protocol.registerSchemesAsPrivileged([{
  scheme: 'xmcode',
  privileges: {
    standard: true,
    secure: true,
    supportFetchAPI: true,
    stream: true,
  },
}]);
```

协议处理器将 URL 解析后的路径解析到 `dist`，使用 `path.relative` 拒绝 `..`、绝对路径和不存在文件；`xmcode://app/` 映射到 `dist/index.html`。不能启用 `bypassCSP`。

窗口配置必须包含：

```js
webPreferences: {
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true,
  webSecurity: true,
}
```

会话和窗口策略必须包含：

```js
ses.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
ses.setPermissionCheckHandler(() => false);
ses.webRequest.onBeforeRequest(
  { urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] },
  (_details, callback) => callback({ cancel: true }),
);
win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
win.webContents.on('will-navigate', (event, target) => {
  if (!target.startsWith('xmcode://app/')) event.preventDefault();
});
```

- [x] **Step 4: 加入 CSP**

在 `index.html` `<head>` 中加入：

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; worker-src 'self' blob:; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; base-uri 'none'; frame-src 'none'; form-action 'none'">
```

- [x] **Step 5: 运行聚焦测试**

Run: `node --test tests/deprecatedDataCleanup.test.js tests/securitySourceContract.test.js`

Expected: 清理测试 PASS；安全契约中只有“旧模拟器仍存在”相关断言继续失败。

- [x] **Step 6: 运行已有测试防止覆盖用户改动**

Run: `npm test`

Expected: 旧 `transpilerOutput.test.js` 和其他既有测试通过；新增安全契约中仅“旧模拟器尚未删除”这一项保持失败。记录测试汇总，不把本次预期 RED 写成全套通过。

### Task 3：定义并验证 Worker 消息协议

**Files:**
- Create: `src/runtime/pythonProtocol.js`
- Create: `tests/pythonProtocol.test.js`

- [x] **Step 1: 写协议失败测试**

覆盖合法请求、未知字段、错误协议版本、空运行 ID、超长代码、超长输入、非法超时和伪造结果能力标记：

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LIMITS,
  validateRunRequest,
  validateWorkerResult,
} from '../src/runtime/pythonProtocol.js';

test('run request is closed to unknown and oversized fields', () => {
  const base = { version: 1, runId: 'r1', capability: 'c1', code: 'print(1)', input: '' };
  assert.equal(validateRunRequest(base).ok, true);
  assert.equal(validateRunRequest({ ...base, extra: true }).ok, false);
  assert.equal(validateRunRequest({ ...base, code: 'x'.repeat(LIMITS.code + 1) }).ok, false);
  assert.equal(validateRunRequest({ ...base, input: 'x'.repeat(LIMITS.input + 1) }).ok, false);
});

test('worker result must match run id and private capability', () => {
  const result = { version: 1, runId: 'r1', capability: 'c1', status: 'passed', output: '', error: null };
  assert.equal(validateWorkerResult(result, 'r1', 'c1').ok, true);
  assert.equal(validateWorkerResult(result, 'r1', 'wrong').ok, false);
});
```

Run: `node --test tests/pythonProtocol.test.js`

Expected: FAIL，模块尚不存在。

- [x] **Step 2: 实现最小协议**

协议常量固定为：代码 50 KiB、输入 16 KiB、输出 64 KiB、默认超时 5 秒、允许超时 250–10,000 ms；状态仅允许 `passed`、`runtime_error`、`timeout`、`stopped`、`output_limit`、`worker_crash`、`invalid_request` 和 `unsupported_lesson`。验证器返回 `{ ok: true, value }` 或 `{ ok: false, error: 'invalid_request' }`，并拒绝未知字段。

- [x] **Step 3: 运行协议测试**

Run: `node --test tests/pythonProtocol.test.js`

Expected: PASS。

### Task 4：实现可停止、可超时、可销毁的 PythonRunner

**Files:**
- Create: `src/runtime/PythonRunner.js`
- Create: `tests/pythonRunner.test.js`

- [x] **Step 1: 用假 Worker 写生命周期测试**

测试必须证明：合法结果才完成 Promise、错误 capability 被忽略、超时终止 Worker、`stop()` 返回 `stopped`、`dispose()` 拒绝后续调用、Worker error 返回 `worker_crash`。

假 Worker 提供 `postMessage`、`terminate`、`addEventListener`、`removeEventListener` 和 `emit`。构造函数通过 `workerFactory` 注入，随机 ID 通过 `idFactory` 注入，使测试断言稳定。

Run: `node --test tests/pythonRunner.test.js`

Expected: FAIL，`PythonRunner.js` 尚不存在。

- [x] **Step 2: 实现 Runner**

公开 API：

```js
export function createPythonRunner({
  workerFactory = () => new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' }),
  idFactory = () => crypto.randomUUID(),
  timeoutMs = 5000,
} = {}) {
  return {
    run(code, input = ''),
    stop(),
    dispose(),
  };
}
```

Runner 一次只允许一个请求；能力标记与运行 ID 分别生成。超时、停止、Worker error 和 dispose 都必须清理定时器与监听器并调用 `terminate()`。每次判题完成后由页面销毁 Runner，因此下一次点击运行会得到全新 Worker 和 Python 状态。

- [x] **Step 3: 运行生命周期测试**

Run: `node --test tests/pythonRunner.test.js`

Expected: PASS，测试进程无悬挂定时器。

### Task 5：接入随包 Pyodide Worker

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.js`
- Create: `src/runtime/python.worker.js`
- Create: `tests/pyodideAssets.test.js`

- [x] **Step 1: 写构建资源契约测试**

测试断言 `package.json` 精确依赖 `pyodide: 314.0.5`、开发依赖 `vite-plugin-static-copy: 4.1.1`；`vite.config.js` 排除 Pyodide 预打包、复制核心文件到 `assets/pyodide`、排除 `.whl`、Markdown、HTML、类型声明和嵌套 `node_modules`；Worker 不包含 CDN、`loadPackagesFromImports` 或 `micropip`。

Run: `node --test tests/pyodideAssets.test.js`

Expected: FAIL，依赖和 Worker 尚不存在。

- [x] **Step 2: 安装固定依赖**

Run: `npm install --save-exact pyodide@314.0.5`

Run: `npm install --save-dev --save-exact vite-plugin-static-copy@4.1.1`

Expected: `package.json` 和 `package-lock.json` 记录精确版本；不使用 `latest` 或范围符号。

- [x] **Step 3: 按官方 Vite 方式复制本地运行时**

`vite.config.js` 使用 `viteStaticCopy` 和 `import.meta.resolve('pyodide')` 找到资源目录，复制核心文件到 `dist/assets/pyodide`，明确排除所有 wheel。设置 `optimizeDeps.exclude: ['pyodide']`。

- [x] **Step 4: 实现模块 Worker**

Worker：

1. `import { loadPyodide } from 'pyodide'`；
2. 用 `new URL('./pyodide/', self.location.href).href` 作为本地 `indexURL`；
3. 不调用自动包下载；
4. 用 `pyodide.setStdout`、`setStderr` 收集输出并执行 64 KiB 上限；
5. 用 JSON 字符串传递输入行并覆盖本次全局命名空间中的 `input`；
6. 用 `runPythonAsync` 执行 `compile(code, '<student>', 'exec')`；
7. 捕获 Python 异常并只返回字符串；
8. 结果原样带回 JavaScript 闭包保存的 run ID 与 capability；
9. 每次运行删除学生在虚拟工作目录创建的文件；
10. 拒绝协议验证失败的请求。

Worker 不把原始 `message`、capability 或包装器闭包注入 Python globals。

- [x] **Step 5: 运行资源契约与构建**

Run: `node --test tests/pyodideAssets.test.js tests/pythonProtocol.test.js tests/pythonRunner.test.js`

Expected: PASS。

Run: `npm run build`

Expected: exit 0；`dist/assets/pyodide/pyodide.asm.wasm`、`python_stdlib.zip`、`pyodide.mjs` 和 `pyodide-lock.json` 存在，`dist` 中不存在 `.whl`。

### Task 6：把课程切到新运行器并显式关闭未迁移实验

**Files:**
- Create: `src/runtime/runtimePolicy.js`
- Create: `tests/runtimePolicy.test.js`
- Modify: `src/components/Lesson.jsx`
- Modify: `src/utils/lessonRunGuard.js`
- Modify: `tests/lessonRunGuard.test.js`
- Delete: `src/utils/transpiler.js`
- Delete: `tests/transpilerOutput.test.js`

- [x] **Step 1: 写课程分流测试**

`runtimePolicy` 将包含 `pyecharts`、`threading`、`socket` 或 `pyspark` 的现有课程标记为 `visual-lab-pending`，其他课程标记为 `python`。测试至少覆盖普通输出、SQLite、pyecharts、线程、Socket 和 PySpark 六类。

Run: `node --test tests/runtimePolicy.test.js`

Expected: FAIL，模块尚不存在。

- [x] **Step 2: 扩展运行守卫的停止语义**

在原有 token API 上增加 `cancelCurrent()`，返回当前 token 并清空活动状态。先增加失败测试，确认旧实现不满足，再实现并保持原测试通过。

- [x] **Step 3: 集成 PythonRunner**

`Lesson.jsx`：

- 删除 `simulatePython` 与 `AIChat`；
- 使用 `runnerRef` 保存当前 Runner；
- 每次点击运行创建新 Runner，`judgeLesson.execute` 调用 `runner.run(source, input)`；
- 判题 `finally` 中销毁 Runner；
- 页面切换和 unmount 时停止并销毁；
- 运行时按钮改为“停止”，再次点击只停止当前 Runner；
- `timeout`、`output_limit`、`stopped` 和 `worker_crash` 使用面向初学者的中文/英文提示；
- `visual-lab-pending` 不执行代码，显示“这一关正在迁移为安全教学实验，暂时不能判题”，且不授予通关。

- [x] **Step 4: 删除旧模拟器和旧测试**

删除 `src/utils/transpiler.js` 与只验证模拟器输出的 `tests/transpilerOutput.test.js`。不得保留动态执行备用路径。

- [x] **Step 5: 运行聚焦和完整测试**

Run: `node --test tests/runtimePolicy.test.js tests/lessonRunGuard.test.js tests/lessonSourceContract.test.js tests/lessonUiContract.test.js tests/securitySourceContract.test.js`

Expected: PASS。

Run: `npm test`

Expected: 所有 Node 测试通过，0 failures。

### Task 7：用 Electron 运行时验证沙箱和网络边界

**Files:**
- Create: `tests/electronSecurity.e2e.mjs`
- Modify: `package.json`

- [x] **Step 1: 写 Electron E2E 测试**

使用 Playwright `_electron.launch({ args: ['.'] })`，测试：

- 页面 URL 以 `xmcode://app/` 开头；
- renderer 中 `window.electronAPI`、`window.require` 和 `process` 不可用；
- `window.open('https://example.com')` 不会创建第二个窗口；
- 外部 `fetch('https://example.com')` 被拒绝；
- 设置 `location.href` 到外部地址后仍停留在 `xmcode://app/`；
- 主进程读取窗口 webPreferences，确认 `sandbox`、`contextIsolation`、`nodeIntegration` 和 `webSecurity` 的值。

测试必须在 `finally` 中关闭 Electron 应用。

- [x] **Step 2: 运行并确认测试能发现缺陷**

先临时把测试中的期望 `sandbox === true` 改为 `false` 或临时在主进程关闭一个防护，运行：

Run: `node --test tests/electronSecurity.e2e.mjs`

Expected: FAIL，证明测试能够发现防护变化。立即恢复正确期望或防护。

- [x] **Step 3: 运行正确 E2E**

将 `package.json` 的 `test:e2e` 设置为：

```json
"test:e2e": "node --test tests/electronSecurity.e2e.mjs"
```

Run: `npm run build`

Run: `npm run test:e2e`

Expected: PASS，Electron 进程正常退出，无残留窗口。

### Task 8：完成前安全验收

**Files:**
- Modify: `docs/superpowers/plans/2026-08-24-local-execution-security.md`（勾选实际完成步骤）

- [x] **Step 1: 依赖与敏感源码扫描**

Run: `npm audit --omit=dev`

Expected: 生产依赖无已知高危或严重漏洞；如注册表不可访问，标记为未验证，不能写通过。

Run: `rg -n "child_process|run-python|execFile|new Function|DeepSeek|api.deepseek.com|Authorization.*Bearer|'unsafe-eval'|https://cdn" main.cjs index.html src tests`

Expected: 只允许测试文件对禁止字符串的断言，以及 `deprecatedDataCleanup.js` 中用于删除旧键的常量；生产执行路径无命中。

- [x] **Step 2: 完整自动验证**

Run: `npm test`

Expected: 0 failures。

Run: `npm run validate:curriculum`

Expected: exit 0。

Run: `npm run build`

Expected: exit 0，Pyodide 核心资源存在且无 wheel。

Run: `npm run test:e2e`

Expected: 0 failures。

- [x] **Step 3: 工作区边界检查**

Run: `git diff --check`

Expected: exit 0。

Run: `git status --short`

Expected: 清楚区分本任务文件和用户此前未提交文件；不声称整个工作区干净。

- [x] **Step 4: 只提交本任务文件**

明确列出并 `git add` 本计划涉及的文件；禁止 `git add .`。提交信息：

```text
feat: isolate local Python execution
```

提交后再次运行 `git show --stat --oneline HEAD`，确认没有夹带课程内容或其他用户文件。
