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

export function resetExecutionEnvironment(pyodide) {
  if (!pyodide?.FS) throw new Error('Python filesystem is unavailable');
  const root = '/home/pyodide';
  pyodide.FS.mkdirTree(root);
  pyodide.FS.chdir(root);
  for (const name of pyodide.FS.readdir(root)) {
    if (name === '.' || name === '..') continue;
    removeTree(pyodide.FS, `${root}/${name}`);
  }
  pyodide.setStdin({ stdin: () => null, autoEOF: true });
  pyodide.setStdout({ batched: () => {} });
  pyodide.setStderr({ batched: () => {} });
}
