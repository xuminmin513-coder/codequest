import React, { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap, EditorView } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';

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
  '.cm-cursor': { borderLeftColor: '#00d4ff', borderLeftWidth: '2px' },
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
  '.cm-activeLineGutter': { backgroundColor: '#1a1a3e' },
  '.cm-activeLine': { backgroundColor: '#1a1a3e40' },
  '.cm-matchingBracket': { backgroundColor: '#2a2a5a', outline: '1px solid #7b2ff7' },
  '.cm-lineNumbers': { color: '#555577' },
  '.cm-foldPlaceholder': { backgroundColor: '#2a2a4a', color: '#8888bb' },
  '.cm-tooltip': { backgroundColor: '#1a1a2e', border: '1px solid #2a2a4a', color: '#e0e0ff' },
  '.cm-panels': { backgroundColor: '#12122a' }
});

const pythonTheme = EditorView.theme({
  '.ͼ1 .cm-atom': { color: '#ff2d78' },
  '.ͼ1 .cm-keyword': { color: '#7b2ff7' },
  '.ͼ1 .cm-string': { color: '#22c55e' },
  '.ͼ1 .cm-comment': { color: '#555577' },
  '.ͼ1 .cm-typeName': { color: '#00d4ff' },
  '.ͼ1 .cm-builtin': { color: '#ff8c00' },
  '.ͼ1 .cm-functionName': { color: '#00d4ff' },
  '.ͼ1 .cm-variableName': { color: '#e0e0ff' },
  '.ͼ1 .cm-operator': { color: '#ff2d78' },
  '.ͼ1 .cm-number': { color: '#ff8c00' },
  '.ͼ1 .cm-punctuation': { color: '#8888bb' },
  '.ͼ1 .cm-separator': { color: '#8888bb' },
  '.ͼ1 .cm-bracket': { color: '#8888bb' },
  '.ͼ1 .cm-meta': { color: '#8888bb' },
  '.ͼ1 .cm-attributeName': { color: '#00ff88' },
  '.ͼ1 .cm-qualifier': { color: '#00d4ff' },
  '.ͼ1 .cm-tag': { color: '#7b2ff7' },
  '.ͼ1 .cm-attribute': { color: '#ff8c00' },
  '.ͼ1 .cm-string-2': { color: '#ff2d78' },
  '.ͼ1 .cm-propertyName': { color: '#00d4ff' },
});

const CodeEditor = forwardRef(function CodeEditor({ initialCode = '', onRun, onChange }, ref) {
  const containerRef = useRef(null);
  const editorViewRef = useRef(null);
  const onRunRef = useRef(onRun);
  const onChangeRef = useRef(onChange);
  onRunRef.current = onRun;
  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => ({
    getCode: () => editorViewRef.current?.state.doc.toString() || '',
    setCode: (code) => {
      if (editorViewRef.current) {
        editorViewRef.current.dispatch({
          changes: { from: 0, to: editorViewRef.current.state.doc.length, insert: code || '' }
        });
      }
    },
    focus: () => editorViewRef.current?.focus(),
  }));

  const setupEditor = useCallback(() => {
    if (!containerRef.current) return;

    const runKeymap = keymap.of([
      { key: 'Ctrl-Enter', run: () => { onRunRef.current?.(); return true; } },
      { key: 'Cmd-Enter', run: () => { onRunRef.current?.(); return true; } },
    ]);
    const notifyChanges = EditorView.updateListener.of(update => {
      if (update.docChanged) onChangeRef.current?.(update.state.doc.toString());
    });

    const state = EditorState.create({
      doc: initialCode || '',
      extensions: [
        basicSetup,
        python(),
        oneDark,
        codedexTheme,
        pythonTheme,
        notifyChanges,
        runKeymap,
        keymap.of([indentWithTab, ...defaultKeymap]),
        EditorState.tabSize.of(4),
        EditorView.lineWrapping,
      ],
    });

    editorViewRef.current = new EditorView({ state, parent: containerRef.current });
  }, [initialCode]);

  useEffect(() => {
    setupEditor();
    return () => {
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
    };
  }, [setupEditor]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
});

export default CodeEditor;
