function removeTree(FS, target) {
  const stat = FS.lstat(target);
  if (FS.isLink(stat.mode) || !FS.isDir(stat.mode)) {
    FS.unlink(target);
    return;
  }
  for (const name of FS.readdir(target)) {
    if (name === '.' || name === '..') continue;
    removeTree(FS, `${target}/${name}`);
  }
  FS.rmdir(target);
}

function ensureDirectory(FS, target) {
  try {
    const stat = FS.lstat(target);
    if (FS.isLink(stat.mode) || !FS.isDir(stat.mode)) {
      removeTree(FS, target);
      FS.mkdirTree(target);
    }
  } catch {
    FS.mkdirTree(target);
  }
}

function clearDirectory(FS, target) {
  for (const name of FS.readdir(target)) {
    if (name === '.' || name === '..') continue;
    removeTree(FS, `${target}/${name}`);
  }
}

export function resetExecutionEnvironment(pyodide) {
  if (!pyodide?.FS) throw new Error('Python filesystem is unavailable');
  const root = '/home/pyodide';
  ensureDirectory(pyodide.FS, '/home');
  ensureDirectory(pyodide.FS, root);
  ensureDirectory(pyodide.FS, '/tmp');
  pyodide.FS.chdir(root);
  clearDirectory(pyodide.FS, root);
  clearDirectory(pyodide.FS, '/tmp');
  pyodide.setStdin({ stdin: () => null, autoEOF: true });
  pyodide.setStdout({ batched: () => {} });
  pyodide.setStderr({ batched: () => {} });
}
