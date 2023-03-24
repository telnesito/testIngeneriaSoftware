import React, { useRef, useState } from 'react'
import { runCode, setEngine, setOptions } from 'client-side-python-runner';
import Editor from '@monaco-editor/react';
import './TestPython.css'
import saveLocalStorage from '../functions/saveLocalStorage';
const TestPython = () => {


  const [savedItem,] = useState(() => window.localStorage.getItem('code-python'))
  const [autoCompile, setAutoCompile] = useState('true')
  // Manipulacion DOM
  const editorRef = useRef(null)
  const outputRef = useRef()
  //Variable que recibe los parametros del console log
  let salida = '';

  //Libreria para compilar python
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
  const handleShowCode = async () => {

    const codigo = editorRef.current.getValue()

    try {
      //Recibe el codigo a compilar
      salida = ''
      await runCode(codigo);
      if (codigo !== '') {
        outputRef.current.innerHTML = salida
      }

    } catch (error) {
      outputRef.current.innerHTML = `Linea: ${error.lineNumber}, mensaje: ${error.message}`
    }
  }


  // Obtener la instancia del editor
  const handleOnMount = (editor, monaco) => {
    settingsPython()
    editorRef.current = editor
  }


  const handleSave = () => {
    saveLocalStorage('code-python', editorRef.current.getValue())
  }

  const validAutoCompile = () => {
    if (autoCompile === 'true') {
      handleShowCode()
    } else {
      return
    }
  }

  //Redefinir el console.log
  function consoleLog(...argumentos) {

    argumentos.forEach((arg) => {
      salida += arg
    })
    salida += '<br/>'

  }

  console.log = consoleLog
  return (
    <div>
      <h2>Python</h2>
      <Editor
        width={'90vw'}
        height={300}
        theme={'vs-dark'}
        language={'python'}
        onMount={handleOnMount}
        onChange={validAutoCompile}
        value={savedItem}
      />
      <div ref={outputRef} id='output-python'></div>

      <input defaultChecked onChange={({ target }) => setAutoCompile(target.value)} type={'radio'} name={'auto-compile-python'} id={'python-true'} value={'true'}></input>
      <label htmlFor='python-true'>Compilado automatico</label>
      <br />
      <input onChange={({ target }) => setAutoCompile(target.value)} type={'radio'} name={'auto-compile-python'} id={'python-false'} value={'false'}></input>
      <label htmlFor='python-false'>Compilado manual</label>
      <br />
      <div className='group-btn'>
        <button className='btn-compilar' onClick={handleShowCode}>Compilar</button>
        <button className='btn-save' onClick={handleSave}>Guardar en localStorage</button>

      </div>

    </div>
  )
}

export default TestPython