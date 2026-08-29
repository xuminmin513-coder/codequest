const { app, BrowserWindow, net, protocol, session } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');

const APP_SCHEME = 'xmcode';
const APP_HOST = 'app';
const APP_ORIGIN = `${APP_SCHEME}://${APP_HOST}`;
const IS_E2E = process.argv.includes('--xmcode-e2e');

app.name = 'XM²code';

if (IS_E2E && process.env.XMCODE_E2E_USER_DATA) {
  app.setPath('userData', path.resolve(process.env.XMCODE_E2E_USER_DATA));
}

protocol.registerSchemesAsPrivileged([{
  scheme: APP_SCHEME,
  privileges: {
    standard: true,
    secure: true,
    supportFetchAPI: false,
    corsEnabled: false,
  },
}]);

function resolveBundlePath(bundleRoot, requestUrl) {
  let parsed;
  try {
    parsed = new URL(requestUrl);
  } catch {
    return null;
  }
  if (parsed.protocol !== `${APP_SCHEME}:` || parsed.host !== APP_HOST) return null;

  let pathname;
  try {
    pathname = decodeURIComponent(parsed.pathname);
  } catch {
    return null;
  }

  const relativeRequest = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  if (!relativeRequest || relativeRequest.includes('\0')) return null;

  const resolved = path.resolve(bundleRoot, relativeRequest);
  const relative = path.relative(bundleRoot, resolved);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return resolved;
}

function isTrustedAppUrl(target) {
  try {
    const parsed = new URL(target);
    return parsed.protocol === `${APP_SCHEME}:` && parsed.host === APP_HOST;
  } catch {
    return false;
  }
}

function installSessionSecurity(ses) {
  ses.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  ses.setPermissionCheckHandler(() => false);
  ses.webRequest.onBeforeRequest(
    { urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] },
    (_details, callback) => callback({ cancel: true }),
  );
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'XM²code',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
    backgroundColor: '#f5f5f7',
    show: false,
  });

  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (event, target) => {
    if (!isTrustedAppUrl(target)) event.preventDefault();
  });

  win.loadURL(`${APP_ORIGIN}/index.html`);
  win.once('ready-to-show', () => win.show());
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  const bundleRoot = path.join(__dirname, 'dist');
  installSessionSecurity(session.defaultSession);

  protocol.handle(APP_SCHEME, request => {
    try {
      const filePath = resolveBundlePath(bundleRoot, request.url);
      if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        return new Response('Not found', {
          status: 404,
          headers: { 'content-type': 'text/plain; charset=utf-8' },
        });
      }
      return net.fetch(pathToFileURL(filePath).toString());
    } catch {
      return new Response('Internal application resource error', {
        status: 500,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
  });

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
