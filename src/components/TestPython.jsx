import React, { useRef, useState } from 'react'
import { runCode, setEngine, setOptions } from 'client-side-python-runner';
import Editor from '@monaco-editor/react';
import './TestPython.css'
import saveLocalStorage from '../functions/saveLocalStorage';
const TestPython = () => {


  const [savedItem,] = useState(() => window.localStorage.getItem('code-python'))
  // Manipulacion DOM
  const editorRef = useRef(null)
  const outputRef = useRef()
  //Variable que recibe los parametros del console log
  let salida = ''
  let codigo = ''

  //Libreria para compilar python
  const compileCode = async () => {
    codigo = editorRef.current.getValue()
    // Recibe el codigo a compilar

    try {
      await runCode(codigo);

    } catch (error) {
      console.warn(error)
      outputRef.current.innerHTML = `Linea: ${error.lineNumber}, mensaje: ${error.message}`

    }
  }

  //Configurar el compilador
  const settingsPython = async () => {
    // Opciones del compilador
    setOptions({
      output: console.log,
      loadVariablesBeforeRun: true,
      storeVariablesAfterRun: true,
    });
    // Motor de compilado
    await setEngine('pyodide');
  }

  // Mostrar codigo en pantalla
  const handleShowCode = () => {

    try {
      salida = '' //Reiniciar la variable
      compileCode()
      if (codigo !== '') outputRef.current.innerHTML = salida

    } catch (error) {
      outputRef.current.innerHTML = error.message
    }
  }

  // Obtener la instancia del editor
  const handleOnMount = (editor, monaco) => {
    settingsPython()
    editorRef.current = editor
  }

  //Redefinir el console.log
  const consoleLog = (...argumentos) => {

    argumentos.forEach((arg) => {
      salida += arg
    })
    salida += "<br/>"
  }

  console.log = consoleLog
  console.error = consoleLog

  const handleSave = () => {
    saveLocalStorage('code-python', editorRef.current.getValue())
  }

  return (
    <div>
      <h2>Python</h2>
      <Editor
        width={'90vw'}
        height={300}
        theme={'vs-dark'}
        language={'python'}
        onMount={handleOnMount}
        onChange={handleShowCode}
        value={savedItem}
      />
      <div ref={outputRef} id='output-python'></div>

      <button onClick={handleSave}>Guardar en localStorage</button>

    </div>
  )
}

export default TestPython