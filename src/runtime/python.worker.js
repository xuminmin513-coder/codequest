import { loadPyodide } from 'pyodide';
import createPyodideModule from 'pyodide/pyodide.asm.mjs';
import wasmDataUrl from 'virtual:pyodide-wasm-data';
import stdLibDataUrl from 'pyodide/python_stdlib.zip?inline';
import lockFileContents from 'pyodide/pyodide-lock.json';
import {
  LIMITS,
  PROTOCOL_VERSION,
  validateRunRequest,
} from './pythonProtocol.js';
import { resetExecutionEnvironment } from './pythonEnvironment.js';

const safeJsGlobals = Object.freeze(Object.create(null));
const indexURL = new URL('./pyodide/', self.location.href).href;

// Pyodide otherwise starts a URL fetch before calling createPyodideModule.
// This worker supplies the Wasm bytes directly, so keep that fetch path disabled.
Object.defineProperty(globalThis, 'WasmOffsetConverter', {
  value: class WasmOffsetConverter {},
  configurable: false,
  enumerable: false,
  writable: false,
});

function decodeBase64DataUrl(dataUrl) {
  const separator = dataUrl.indexOf(',');
  if (separator < 0 || !dataUrl.slice(0, separator).endsWith(';base64')) {
    throw new Error('Invalid bundled runtime asset');
  }
  const binary = atob(dataUrl.slice(separator + 1));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

const wasmBinary = decodeBase64DataUrl(wasmDataUrl);
const errorHelperReady = WebAssembly.instantiate(decodeBase64DataUrl(
  'data:application/wasm;base64,AGFzbQEAAAABDANfAGAAAW9gAW8BfwMDAgECBygCE0pzdl9HZXRFcnJvcl9pbXBvcnQAAA5Kc3ZFcnJvcl9DaGVjawABChMCBwD7AQD7GwsJACAA+xr7FAAL',
));

function instantiateBundledWasm(imports, receiveInstance) {
  (async () => {
    const { instance: errorHelper } = await errorHelperReady;
    imports.env.Jsv_GetError_import = errorHelper.exports.Jsv_GetError_import;
    imports.env.JsvError_Check = errorHelper.exports.JsvError_Check;
    const { instance, module } = await WebAssembly.instantiate(wasmBinary, imports);
    receiveInstance(instance, module);
  })();
  return {};
}

const pyodideReady = loadPyodide({
  indexURL,
  packageBaseUrl: indexURL,
  lockFileContents,
  stdLibURL: stdLibDataUrl,
  createPyodideModule: settings => createPyodideModule({
    ...settings,
    wasmBinary,
    instantiateWasm: instantiateBundledWasm,
  }),
  jsglobals: safeJsGlobals,
  stdout: () => {},
  stderr: () => {},
});

function boundedMessage(error) {
  const message = error?.message || String(error);
  return message.slice(0, LIMITS.output);
}

pyodideReady.then(
  () => self.postMessage({
    version: PROTOCOL_VERSION,
    type: 'runtime_ready',
    error: null,
  }),
  error => self.postMessage({
    version: PROTOCOL_VERSION,
    type: 'runtime_init_error',
    error: boundedMessage(error),
  }),
);

self.addEventListener('message', async event => {
  const checked = validateRunRequest(event.data);
  if (!checked.ok) return;

  const request = checked.value;
  const response = {
    version: PROTOCOL_VERSION,
    runId: request.runId,
    capability: request.capability,
    status: 'passed',
    output: '',
    error: null,
  };

  let pyodide;
  let globals;
  try {
    pyodide = await pyodideReady;
    resetExecutionEnvironment(pyodide);

    let output = '';
    let outputExceeded = false;
    const appendLine = value => {
      const next = `${String(value)}\n`;
      const remaining = LIMITS.output - output.length;
      if (next.length > remaining) {
        output += next.slice(0, Math.max(0, remaining));
        outputExceeded = true;
        return;
      }
      output += next;
    };

    const inputLines = request.input.replace(/\r\n?/g, '\n').split('\n');
    let inputIndex = 0;
    pyodide.setStdin({
      stdin: () => (inputIndex < inputLines.length ? inputLines[inputIndex++] : null),
      autoEOF: true,
    });
    pyodide.setStdout({ batched: appendLine });
    pyodide.setStderr({ batched: appendLine });

    globals = pyodide.globals.get('dict')();
    globals.set('__name__', '__main__');
    await pyodide.runPythonAsync(request.code, {
      globals,
      filename: '<student>',
    });

    response.output = output;
    if (outputExceeded) {
      response.status = 'output_limit';
      response.error = 'Program output exceeded the safe limit';
    }
  } catch (error) {
    response.status = 'runtime_error';
    response.error = boundedMessage(error);
  } finally {
    globals?.destroy?.();
    if (pyodide) {
      try {
        resetExecutionEnvironment(pyodide);
      } catch (error) {
        response.status = 'worker_crash';
        response.error = boundedMessage(error);
      }
    }
  }

  self.postMessage(response);
});
