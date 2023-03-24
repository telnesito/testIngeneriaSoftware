import React, { useRef, useEffect, useState } from 'react'
import './EditorRuby.css'
import editorSettings from '../functions/editorSettings'
import rubyWorker from 'monaco-editor/esm/vs/basic-languages/ruby/ruby?worker';
import saveLocalStorage from '../functions/saveLocalStorage';

const EditorRuby = () => {
  //Variable que guarda lo que mostrara en pantalla
  let salida = ''
  //Referencia del DOM
  const [savedItem,] = useState(window.localStorage.getItem('code-ruby'))
  const [codigo, setCodigo] = useState(savedItem)
  const refOutput = useRef()
  const refCode = useRef()

  const [autoCompile, setAutoCompile] = useState('true')

  window.MonacoEnvironment = {
    getWorker(workerId, label) {
      if (label === 'ruby') {
        return new rubyWorker
      }

    }
  }

  //Funcion que remplaza el console.log para mostrar los parametros por pantalla 
  const puts = (...argumentos) => {
    for (let i = 0; i < argumentos.length; i++) {
      salida += argumentos[i] + ' '
    }
    salida += '<br/>'
  }
  //Manejador
  const handleUpdate = () => {

    try {
      //Reiniciamos la salida y re-asignamos console.log
      salida = ''
      console.log = puts

      //Compilamos y ejecutmos el codigo Ruby con Opal

      let output = Opal.compile(codigo)
      eval(output)

      //Mostrar salida en pantalla
      if (salida !== '') {
        refOutput.current.innerHTML = salida
      }


    } catch (e) {
      refOutput.current.innerHTML = e.message
      console.warn(e)

    }
  }

  const validateAutoCompile = () => {
    if (autoCompile === 'true') {
      handleUpdate()
    } else {
      return
    }
  }

  useEffect(() => {
    editorSettings(savedItem, 'ruby', 'vs-dark', refCode.current, setCodigo)
  }, []);

  const handleSave = () => {
    saveLocalStorage('code-ruby', codigo)
  }

  return (
    <div>
      <h2>Compilador Ruby</h2>
      <div className='contenedor-ruby'>
        <label >
          <div ref={refCode} onKeyUp={() => validateAutoCompile()} id='editor-ruby'></div>
        </label>

        <div ref={refOutput} id='output-ruby'></div>
      </div>

      <div className='btn'>
        <input defaultChecked onChange={({ target }) => setAutoCompile(target.value)} type={'radio'} name={'auto-compile-ruby'} id={'ruby-true'} value={'true'}></input>
        <label htmlFor='ruby-true'>Compilado automatico</label>
        <br />


        <input onChange={({ target }) => setAutoCompile(target.value)} type={'radio'} name={'auto-compile-ruby'} id={'ruby-false'} value={'false'}></input>
        <label htmlFor='ruby-false'>Compilado manual</label>
        <br />
        <br />

        <button className='btn-compilar' onClick={handleUpdate} >Compilar</button>
        <br />
        <br />
        <button className='btn-save' onClick={handleSave}>Guardar en localStorage</button>
      </div>


    </div >
  )
}

export default EditorRuby