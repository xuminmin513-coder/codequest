import React from 'react';
import { useApp } from '../context/AppContext';
import PageHeader from './ui/PageHeader';

const PYTHON_SHORTCUTS = [
  {
    category: 'vscode',
    items: [
      { fn: '打开命令面板', fnEn: 'Command Palette', mac: '⌘ ⇧ P' },
      { fn: '快速打开文件', fnEn: 'Quick Open', mac: '⌘ P' },
      { fn: '保存文件', fnEn: 'Save', mac: '⌘ S' },
      { fn: '撤销', fnEn: 'Undo', mac: '⌘ Z' },
      { fn: '重做', fnEn: 'Redo', mac: '⌘ ⇧ Z' },
      { fn: '注释/取消注释', fnEn: 'Toggle Comment', mac: '⌘ /' },
      { fn: '增加缩进', fnEn: 'Indent', mac: '⌘ ]' },
      { fn: '减少缩进', fnEn: 'Outdent', mac: '⌘ [' },
      { fn: '上移一行', fnEn: 'Move Line Up', mac: '⌥ ↑' },
      { fn: '下移一行', fnEn: 'Move Line Down', mac: '⌥ ↓' },
      { fn: '复制行（无需选中）', fnEn: 'Copy Line', mac: '⌥ ⇧ ↓' },
      { fn: '删除行', fnEn: 'Delete Line', mac: '⌘ ⇧ K' },
      { fn: '查找', fnEn: 'Find', mac: '⌘ F' },
      { fn: '全局查找', fnEn: 'Find in Project', mac: '⌘ ⇧ F' },
      { fn: '替换', fnEn: 'Replace', mac: '⌘ ⌥ F' },
      { fn: '多光标添加', fnEn: 'Add Cursor', mac: '⌥ + 点击' },
      { fn: '选中所有匹配', fnEn: 'Select All Matches', mac: '⌘ ⇧ L' },
      { fn: '格式化代码', fnEn: 'Format Document', mac: '⇧ ⌥ F' },
    ]
  },
  {
    category: 'python',
    items: [
      { fn: '运行当前文件（不调试）', fnEn: 'Run Python File', mac: '⌃ F5' },
      { fn: '启动调试', fnEn: 'Start Debugging', mac: 'F5' },
      { fn: '跳转到定义', fnEn: 'Go to Definition', mac: 'F12' },
      { fn: '预览定义', fnEn: 'Peek Definition', mac: '⌥ F12' },
      { fn: '重命名变量/函数', fnEn: 'Rename Symbol', mac: 'F2' },
      { fn: '快速修复', fnEn: 'Quick Fix', mac: '⌘ .' },
      { fn: '查看参数提示', fnEn: 'Parameter Hints', mac: '⌘ ⇧ Space' },
      { fn: '触发自动补全', fnEn: 'Trigger Suggestion', mac: '⌃ Space' },
      { fn: '切换侧边栏', fnEn: 'Toggle Sidebar', mac: '⌘ B' },
    ]
  },
  {
    category: 'repl',
    items: [
      { fn: '启动 Python', fnEn: 'Start Python', mac: '终端输入 python3' },
      { fn: '退出 Python', fnEn: 'Exit Python', mac: 'exit() 或 ⌃ D' },
      { fn: '上一条/下一条命令', fnEn: 'History', mac: '↑ / ↓' },
      { fn: '自动补全', fnEn: 'Tab Complete', mac: 'Tab' },
      { fn: '查看帮助', fnEn: 'Help', mac: 'help()' },
      { fn: '清屏', fnEn: 'Clear Screen', mac: '⌘ K' },
      { fn: '中断运行', fnEn: 'Interrupt', mac: '⌃ C' },
    ]
  },
  {
    category: 'terminal',
    items: [
      { fn: '开/关终端面板', fnEn: 'Toggle Terminal', mac: '⌃ `' },
      { fn: '新建终端', fnEn: 'New Terminal', mac: '⌃ ⇧ `' },
      { fn: '拆分终端', fnEn: 'Split Terminal', mac: '⌃ ⌘ \\' },
      { fn: '搜索历史命令', fnEn: 'Search History', mac: '⌃ R' },
      { fn: '跳转到行首', fnEn: 'Go to Line Start', mac: '⌃ A' },
      { fn: '跳转到行尾', fnEn: 'Go to Line End', mac: '⌃ E' },
      { fn: '清除当前行', fnEn: 'Clear Line', mac: '⌃ U' },
      { fn: '删除前一个单词', fnEn: 'Delete Word', mac: '⌥ ⌫' },
    ]
  },
  {
    category: 'window',
    items: [
      { fn: '分屏编辑', fnEn: 'Split Editor', mac: '⌘ \\' },
      { fn: '关闭标签页', fnEn: 'Close Tab', mac: '⌘ W' },
      { fn: '恢复关闭的标签', fnEn: 'Reopen Closed Tab', mac: '⌘ ⇧ T' },
      { fn: '切换编辑器（左）', fnEn: 'Previous Editor', mac: '⌘ ⇧ [' },
      { fn: '切换编辑器（右）', fnEn: 'Next Editor', mac: '⌘ ⇧ ]' },
      { fn: '打开设置', fnEn: 'Open Settings', mac: '⌘ ,' },
      { fn: '全屏', fnEn: 'Fullscreen', mac: '⌃ ⌘ F' },
    ]
  }
];

const CATEGORY_LABELS = {
  vscode: { zh: '✏️ VS Code 编辑快捷键', en: '✏️ VS Code Editing' },
  python: { zh: '🐍 Python 开发专用', en: '🐍 Python Development' },
  repl: { zh: '💻 Python 交互式环境 (REPL)', en: '💻 Python REPL' },
  terminal: { zh: '🖥️ 终端快捷键', en: '🖥️ Terminal Shortcuts' },
  window: { zh: '📐 窗口与分屏管理', en: '📐 Window Management' },
};

export default function Shortcuts() {
  const { lang } = useApp();

  return (
    <div className="page active page-standard shortcuts-page">
      <PageHeader
        eyebrow={lang === 'zh' ? '效率工具' : 'Productivity'}
        title={lang === 'zh' ? 'Python 快捷键' : 'Python keyboard shortcuts'}
        description={lang === 'zh' ? '当前先展示 macOS 快捷键；其他系统说明可以在下方打开。' : 'macOS shortcuts are shown first, with other system guides below.'}
      />

      {/* OS switch bar */}
      <div style={{
        display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap',
      }}>
        <span style={{
          padding: '6px 14px', border: '2px solid var(--accent-cyan)',
          color: 'var(--accent-cyan)', fontSize: 12, fontFamily: 'var(--font-pixel)',
        }}>
          🍎 macOS（当前）
        </span>
        <a href="python-shortcuts-windows.html" target="_blank" rel="noopener noreferrer"
          style={{
            padding: '6px 14px', border: '2px solid var(--border-color)',
            color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-pixel)',
            textDecoration: 'none', cursor: 'pointer',
          }}>
          Windows 说明书 ↗
        </a>
        <a href="python-shortcuts-linux.html" target="_blank" rel="noopener noreferrer"
          style={{
            padding: '6px 14px', border: '2px solid var(--border-color)',
            color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-pixel)',
            textDecoration: 'none', cursor: 'pointer',
          }}>
          Linux 说明书 ↗
        </a>
        <a href="python-shortcuts-harmonyos.html" target="_blank" rel="noopener noreferrer"
          style={{
            padding: '6px 14px', border: '2px solid var(--border-color)',
            color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'var(--font-pixel)',
            textDecoration: 'none', cursor: 'pointer',
          }}>
          HarmonyOS 说明书 ↗
        </a>
      </div>

      {PYTHON_SHORTCUTS.map((section) => (
        <div className="shortcuts-section" key={section.category}>
          <h3 className="shortcuts-section-title">
            {lang === 'zh' ? CATEGORY_LABELS[section.category].zh : CATEGORY_LABELS[section.category].en}
          </h3>
          <div className="shortcuts-scroll">
          <div className="shortcuts-table">
            <div className="shortcuts-head" style={{ gridTemplateColumns: '1fr 200px' }}>
              <span>{lang === 'zh' ? '功能' : 'Action'}</span>
              <span className="shortcuts-os" style={{ textAlign: 'center' }}>
                macOS <span style={{ fontSize: 11, opacity: 0.6 }}>（当前系统）</span>
              </span>
            </div>
            {section.items.map((s, i) => (
              <div className="shortcuts-row" style={{ gridTemplateColumns: '1fr 200px' }} key={i}>
                <span className="shortcuts-fn">{lang === 'zh' ? s.fn : s.fnEn}</span>
                <span className="shortcuts-key" style={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                  {s.mac.split(' ').map((k, j) => (
                    <kbd key={j}>{k}</kbd>
                  ))}
                </span>
              </div>
            ))}
          </div>
          </div>
        </div>
      ))}

      {/* Other OS manuals */}
      <div className="shortcuts-note">
        <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>
          📖 {lang === 'zh' ? '其他系统说明书（独立页面）' : 'Other OS Manuals'}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 14 }}>
          <a href="python-shortcuts-windows.html" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>
            🪟 Windows 版快捷键说明书
          </a>
          <a href="python-shortcuts-linux.html" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--accent-green)', textDecoration: 'underline' }}>
            🐧 Linux 版快捷键说明书
          </a>
          <a href="python-shortcuts-harmonyos.html" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--accent-orange)', textDecoration: 'underline' }}>
            📱 HarmonyOS 版快捷键说明书
          </a>
        </div>
        <div style={{ marginTop: 8, color: 'var(--text-muted)', fontSize: 13 }}>
          说明书为独立 HTML 文件，点击将在浏览器中打开，方便打印或保存。
        </div>
      </div>
    </div>
  );
}
