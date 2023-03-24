import React, { useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import './TestPython.css'
import saveLocalStorage from '../functions/saveLocalStorage'
import './EditorJsComponent.css'

const EditorJsComponent = () => {

  const editorRef = useRef(null);
  const output = useRef('')
  let salida = ''

  const [savedItem,] = useState(() => window.localStorage.getItem('code-js'))

  const [autoCompile, setAutoCompile] = useState("true")

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

  const handleSave = () => {
    saveLocalStorage('code-js', editorRef.current.getValue())
  }

  const handleChangeState = (value) => {
    setAutoCompile(value)
  }

  const verifAutoCompile = () => {
    if (autoCompile === "true") {
      return showValue()
    } else {
      return
    }
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
        onChange={verifAutoCompile}
        loading={<h1>Sexo</h1>}
        value={savedItem}
      />

      <div ref={output} id='output-python'></div>

      <input defaultChecked onChange={({ target }) => handleChangeState(target.value)} type='radio' id='true' name='auto-compile' value={true}></input>
      <label htmlFor='true'>Compilado automatico</label>
      <br />
      <input onChange={({ target }) => handleChangeState(target.value)} type='radio' id='false' name='auto-compile' value={false}></input>
      <label htmlFor='false'>Compilado manual</label>

      <div className='group-btn'>
        <button onClick={showValue} className='btn-compilar'>Compilar</button>
        <button className='btn-save' onClick={handleSave}>Guardar en localStorage</button>
      </div>
    </div >
  )
}

export default EditorJsComponent