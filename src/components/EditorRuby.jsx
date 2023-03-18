import React, { useRef, useEffect, useState } from 'react'
import './EditorRuby.css'
import editorSettings from '../functions/editorSettings'
import rubyWorker from 'monaco-editor/esm/vs/basic-languages/ruby/ruby?worker';

const EditorRuby = () => {
  //Variable que guarda lo que mostrara en pantalla
  let salida = ''
  //Referencia del DOM
  const [codigo, setCodigo] = useState("")
  const refOutput = useRef()
  const refCode = useRef()

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

    }
  }

  useEffect(() => {
    editorSettings('', 'ruby', 'vs-dark', refCode.current, setCodigo)
  }, []);


  return (
    <div>

      <div className='contenedor-ruby'>
        <label >
          <div ref={refCode} onKeyUp={() => handleUpdate()} id='editor-ruby'></div>
        </label>

        <div ref={refOutput} id='output-ruby'></div>
      </div>


    </div>
  )
}

export default EditorRuby