import React, { useEffect, useRef, useState } from 'react'
import './EditorRuby.css'
import saveLocalStorage from '../functions/saveLocalStorage';
import Editor from '@monaco-editor/react';

const EditorRuby = () => {
  //Variable que guarda lo que mostrara en pantalla
  let salida = ''
  //Referencia del DOM
  const { localStorage } = window
  const [savedItem, setSavedItem] = useState(localStorage.getItem('ruby-code'))
  const [savedItem2, setSavedItem2] = useState(localStorage.getItem('ruby-code-dos'))
  const initialView = 'main'
  const [viewState, setViewState] = useState(initialView)



  let codigo = savedItem || ''
  let codigoDos = savedItem2 || ''
  const refOutput = useRef()


  const [autoCompile, setAutoCompile] = useState('true')


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

      let libreria = Opal.compile(codigoDos)
      let output = Opal.compile(codigo)


      eval(libreria)
      eval(output)

      //Mostrar salida en pantalla
      if (salida !== '') {
        refOutput.current.innerHTML = salida
      }

    } catch (e) {
      refOutput.current.innerHTML = e.message


    }
  }



  const Prob = () => {
    const validateAutoCompile = (valor, event) => {

      codigo = valor


      if (autoCompile === 'true') {
        handleUpdate()
      } else {
        return
      }
    }

    const validateAutoCompile2 = (value, event) => {

      codigoDos = value

      if (autoCompile === 'true') {
        handleUpdate()
      } else {
        return
      }
    }
    if (viewState === 'main') {
      return (
        <>
          <Editor
            theme={'vs-dark'}
            language={'ruby'}
            onChange={validateAutoCompile}
            loading={<h1>Cargando main</h1>}
            value={savedItem}

          />
          <br></br>

          <button className='btn-save' onClick={() => handleSave('ruby-code', codigo)}>Guardar en localStorage</button>
        </>

      )
    }

    if (viewState === 'library') {
      return (
        <>
          <Editor
            theme={'vs-dark'}
            language={'ruby'}
            onChange={validateAutoCompile2}
            loading={<h1>Cargando librerias</h1>}
            value={savedItem2}
          />
          <br></br>

          <button className='btn-save' onClick={() => handleSave('ruby-code-dos', codigoDos)}>Guardar en localStorage</button>
        </>

      )
    }

    if (viewState === 'utils') {
      return <h1>Nada</h1>
    }
  }

  const handleSave = (Editor, actualCodigo = '') => {
    saveLocalStorage(Editor, actualCodigo)
  }

  const handleChangeView = (view, loadCode, localCode) => {
    setViewState(view)
    loadCode(localStorage.getItem(localCode))
  }


  return (
    <div>
      <h2>INTERPRETADOR :P Ruby</h2>

      <div className='menu-archivos'>
        <button onClick={() => handleChangeView('main', setSavedItem, 'ruby-code')} >main.rb</button>
        <button onClick={() => handleChangeView('library', setSavedItem2, 'ruby-code-dos')}>funciones.rb</button>
        <button onClick={() => handleChangeView('utils')}>utilidades.rb</button>
      </div>
      <br />

      <h2>Si te mueves entre archivos sin guardar los cambios, tu codigo se perdera</h2>

      <br />

      <div className='contenedor-ruby'>

        <div id='editor-ruby' >
          <Prob />
        </div>


        <div ref={refOutput} id='output-ruby'></div>
      </div>
      <br></br>
      <br></br>
      <br></br>

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

      </div>


    </div >
  )
}

export default EditorRuby