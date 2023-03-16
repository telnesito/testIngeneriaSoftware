import React, { useRef } from 'react'
import './EditorCodigo.css'
// import CrearEstructura from './CrearEstructura';

const EditorCodigo = () => {



  const refHtml = useRef();
  const refCss = useRef();
  const refJs = useRef();
  const refIframe = useRef()


  const CrearEstructura = () => {
    const estructura = {
      html: refHtml.current.value,
      css: refCss.current.value,
      js: refJs.current.value
    }
    return `
    ${estructura.html}
    <style>${estructura.css}</style>
    <script>${estructura.js}</script>
`
  }


  const handleUpdate = () => {

    const html = CrearEstructura()

    refIframe.current.setAttribute('srcDoc', html)

  }



  return (
    <div className='contenedor-all'>

      <div className='contenedor-editor'>
        <div>
          <label>
            <textarea placeholder='Insert your HTML code' onInput={() => handleUpdate()} ref={refHtml} id='html'></textarea>
          </label>

        </div>

        <div>
          <label>
            <textarea placeholder='Insert your CSS code' onInput={() => handleUpdate()} ref={refCss} id='css'></textarea>
          </label>
        </div>


        <div>
          <label>
            <textarea placeholder='Insert your JS code' onInput={() => handleUpdate()} ref={refJs} id='js'></textarea>
          </label>
        </div>
      </div>

      <iframe className='iframe' ref={refIframe} ></iframe>

    </div>
  )
}

export default EditorCodigo