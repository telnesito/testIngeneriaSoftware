import React, { componentWillUnmount } from 'react'
import * as monaco from 'monaco-editor';

const editorSettings = (value = '', language, theme, elementDOM, setCodigo) => {

  const consoleEditor = monaco.editor.create(elementDOM, {
    value: value,
    language: language,
    theme: theme,
    automaticLayout: true,
    autoIndent: true,

  });

  consoleEditor.onDidChangeModelContent(() => {
    const value = consoleEditor.getValue();
    setCodigo(value);
  });

}
export default editorSettings