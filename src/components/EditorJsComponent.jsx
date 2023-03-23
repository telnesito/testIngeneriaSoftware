import React, { useRef } from 'react'
import Editor from '@monaco-editor/react'
import './TestPython.css'

const EditorJsComponent = () => {

  const editorRef = useRef(null);
  const output = useRef('')
  let salida = ''

  function handleSeMontara(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }
  function showValue() {

    console.log = consoleLog

    const codigo = editorRef.current.getValue()
    try {
      salida = ''; //Reiniciar la salida

      eval(codigo)

      if (codigo !== '') {
        output.current.innerHTML = salida
      }


    } catch (error) {
      output.current.innerHTML = error.message
    }

  }

  function consoleLog(...argumentos) {

    argumentos.forEach((arg) => {
      salida += arg
    })
    salida += '<br/>'
  }

  function handleEditorMontado(editor, monaco) {
    editorRef.current = editor

    console.log("Editor:", editor, "Monaco:", monaco)
  }

  return (
    <div>
      <h2>JavaScript (React components)</h2>
      <Editor
        height={300}
        width={'90vw'}
        theme={'vs-dark'}
        language={'javascript'}
        beforeMount={handleSeMontara}
        onMount={handleEditorMontado}
        onChange={showValue}
        loading={<h1>Sexo</h1>}
      />

      <div ref={output} id='output-python'></div>


    </div>
  )
}

export default EditorJsComponent