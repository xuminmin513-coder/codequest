const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  runPython: (code, input) => ipcRenderer.invoke('run-python', { code, input })
});
