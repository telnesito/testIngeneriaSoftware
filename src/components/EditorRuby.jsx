import React, { useRef } from 'react'
import './EditorRuby.css'

const EditorRuby = () => {
  //Variable que guarda lo que mostrara en pantalla
  let salida = ''
  //Referencia del DOM
  const refCode = useRef()
  const refOutput = useRef()

  //Funcion que remplaza el console.log para mostrar los parametros por pantalla 
  const puts = (...argumentos) => {
    for (let i = 0; i < argumentos.length; i++) {
      salida += argumentos[i] + ' '
    }
    salida += '<br/>'
  }
  //Manejador
  const handleUpdate = () => {

    let codigoRuby = refCode.current.value

    try {
      //Reiniciamos la salida y re-asignamos console.log
      salida = ''
      console.log = puts

      //Compilamos y ejecutmos el codigo Ruby con Opal

      let output = Opal.compile(codigoRuby)
      eval(output)

      //Mostrar salida en pantalla
      if (salida !== '') {
        refOutput.current.innerHTML = salida
      }


    } catch (e) {
      refOutput.current.innerHTML = e.message

    }
  }


  return (
    <div>

      <div className='contenedor-ruby'>
        <label >
          <textarea placeholder='Insert your ruby code' ref={refCode} onKeyUp={() => handleUpdate()} id='editor-ruby'></textarea>
        </label>

        <div ref={refOutput} id='output-ruby'></div>
      </div>


    </div>
  )
}

export default EditorRuby