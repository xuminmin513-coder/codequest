// CodeMirror 6 Editor for CodeQuest
// Built with: @codemirror/view, @codemirror/state, @codemirror/lang-python, @codemirror/commands, @codemirror/theme-one-dark

import { basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { keymap, EditorView } from '@codemirror/view'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'

// Ctrl+Enter / Cmd+Enter to run code
const runKeymap = keymap.of([
  {
    key: 'Ctrl-Enter',
    run: () => {
      if (window.APP && window.APP.runCode) {
        window.APP.runCode()
      }
      return true
    }
  },
  {
    key: 'Cmd-Enter',
    run: () => {
      if (window.APP && window.APP.runCode) {
        window.APP.runCode()
      }
      return true
    }
  }
])

// Dark theme overrides for Codedex palette
const codedexTheme = EditorView.theme({
  '&': {
    backgroundColor: '#0d0d20',
    color: '#e0e0ff',
    height: '100%',
    fontSize: '14px'
  },
  '.cm-content': {
    caretColor: '#00d4ff',
    fontFamily: "'JetBrains Mono', 'Consolas', 'Courier New', monospace",
    lineHeight: '1.7',
    padding: '16px'
  },
  '.cm-cursor': {
    borderLeftColor: '#00d4ff',
    borderLeftWidth: '2px'
  },
  '.cm-selectionBackground, .cm-focused .cm-selectionBackground': {
    backgroundColor: '#2a2a5a80 !important'
  },
  '.cm-gutters': {
    backgroundColor: '#0a0a18',
    color: '#555577',
    border: 'none',
    borderRight: '1px solid #2a2a4a',
    fontFamily: "'JetBrains Mono', 'Consolas', 'Courier New', monospace",
    fontSize: '12px',
    minWidth: '40px'
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#1a1a3e'
  },
  '.cm-activeLine': {
    backgroundColor: '#1a1a3e40'
  },
  '.cm-matchingBracket': {
    backgroundColor: '#2a2a5a',
    outline: '1px solid #7b2ff7'
  },
  '.cm-lineNumbers': {
    color: '#555577'
  },
  '.cm-foldPlaceholder': {
    backgroundColor: '#2a2a4a',
    color: '#8888bb'
  },
  '.cm-tooltip': {
    backgroundColor: '#1a1a2e',
    border: '1px solid #2a2a4a',
    color: '#e0e0ff'
  },
  '.cm-panels': {
    backgroundColor: '#12122a'
  }
})

// Python syntax highlighting colors
const pythonTheme = EditorView.theme({
  '.ͼ1 .cm-atom': { color: '#ff2d78' },        // numbers, booleans
  '.ͼ1 .cm-keyword': { color: '#7b2ff7' },      // def, class, if, else, for, while, import
  '.ͼ1 .cm-string': { color: '#22c55e' },       // strings
  '.ͼ1 .cm-comment': { color: '#555577' },      // comments
  '.ͼ1 .cm-typeName': { color: '#00d4ff' },     // type hints
  '.ͼ1 .cm-builtin': { color: '#ff8c00' },      // print, range, len
  '.ͼ1 .cm-functionName': { color: '#00d4ff' }, // function names
  '.ͼ1 .cm-variableName': { color: '#e0e0ff' }, // variables
  '.ͼ1 .cm-operator': { color: '#ff2d78' },     // operators
  '.ͼ1 .cm-number': { color: '#ff8c00' },       // numbers
  '.ͼ1 .cm-punctuation': { color: '#8888bb' },  // brackets, commas
  '.ͼ1 .cm-separator': { color: '#8888bb' },    // semicolons
  '.ͼ1 .cm-bracket': { color: '#8888bb' },      // brackets
  '.ͼ1 .cm-meta': { color: '#8888bb' },         // decorators
  '.ͼ1 .cm-attributeName': { color: '#00ff88' },// attributes
  '.ͼ1 .cm-qualifier': { color: '#00d4ff' },    // module prefix
  '.ͼ1 .cm-tag': { color: '#7b2ff7' },          // decorator names
  '.ͼ1 .cm-attribute': { color: '#ff8c00' },    // decorator params
  '.ͼ1 .cm-string-2': { color: '#ff2d78' },     // f-string parts
  '.ͼ1 .cm-propertyName': { color: '#00d4ff' }, // property access
})

let currentEditor = null
let currentContainer = null

function createEditor(container, code) {
  const state = EditorState.create({
    doc: code || '',
    extensions: [
      basicSetup,
      python(),
      oneDark,
      codedexTheme,
      pythonTheme,
      runKeymap,
      keymap.of([indentWithTab, ...defaultKeymap]),
      EditorState.tabSize.of(4),
      EditorView.lineWrapping
    ]
  })

  currentEditor = new EditorView({
    state,
    parent: container
  })

  currentContainer = container
  return currentEditor
}

function getCode() {
  if (currentEditor) {
    return currentEditor.state.doc.toString()
  }
  return ''
}

function setCode(code) {
  if (currentEditor) {
    currentEditor.dispatch({
      changes: {
        from: 0,
        to: currentEditor.state.doc.length,
        insert: code || ''
      }
    })
  }
}

function focus() {
  if (currentEditor) {
    currentEditor.focus()
  }
}

function destroy() {
  if (currentEditor) {
    currentEditor.destroy()
    currentEditor = null
    currentContainer = null
  }
}

// Expose for the renderer process
window.__CM = {
  createEditor,
  getCode,
  setCode,
  focus,
  destroy
}
