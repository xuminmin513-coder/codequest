const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { execFile } = require('child_process');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

// 确保使用一致的 userData 目录，防止存档分裂到不同位置
app.name = 'codedex-app';

// ============================================================
// Python Execution IPC
// ============================================================
ipcMain.handle('run-python', async (event, { code, input }) => {
  const tmpFile = path.join(os.tmpdir(), `${crypto.randomUUID()}.py`);

  try {
    // Write code to temp file with UTF-8 BOM for proper encoding
    fs.writeFileSync(tmpFile, code + '\n', 'utf-8');

    const result = await new Promise((resolve) => {
      const child = execFile(
        'python3',
        [tmpFile],
        {
          timeout: 5000,
          maxBuffer: 1024 * 1024,
          killSignal: 'SIGTERM',
          env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
        },
        (error, stdout, stderr) => {
          if (error) {
            // Timeout or execution error
            if (error.killed || error.signal === 'SIGTERM') {
              resolve({ stdout, stderr: stderr + '\n⏱ 代码执行超时 (Code execution timed out)\n', error: 'timeout' });
            } else if (error.code === 'ENOENT') {
              resolve({ stdout, stderr: '需要安装 Python 3 才能运行代码 (Python 3 is required)', error: 'no_python' });
            } else {
              resolve({ stdout, stderr, error: 'runtime_error' });
            }
          } else {
            resolve({ stdout, stderr, error: null });
          }
        }
      );

      // Write input to stdin if provided, always close stdin
      if (input) {
        child.stdin.write(input);
      }
      child.stdin.end();
    });

    return result;
  } finally {
    // Clean up temp file
    try { fs.unlinkSync(tmpFile); } catch {}
  }
});

// ============================================================
// Window Creation
// ============================================================
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'CodeQuest - 编程冒险',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    backgroundColor: '#0a0a1a',
    show: false
  });

  // Try dist/index.html first (production build), fall back to dev server
  const indexPath = fs.existsSync(path.join(__dirname, 'dist', 'index.html'))
    ? path.join(__dirname, 'dist', 'index.html')
    : path.join(__dirname, 'index.html');
  win.loadFile(indexPath);

  win.once('ready-to-show', () => {
    win.show();
  });

  // Remove menu bar for cleaner look
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
