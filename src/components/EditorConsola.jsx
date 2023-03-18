import React, { useRef, useEffect, useState } from 'react';
import './EditorConsola.css';
import editorSettings from '../functions/editorSettings';
import javaScriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';


const EditorConsola = () => {

  const [codigo, setCodigo] = useState("");


  window.MonacoEnvironment = {
    getWorker(workerId, label) {
      if (label === 'javascript') {
        return new javaScriptWorker
      }

    }
  }

  const refCode = useRef();

  let salida = "";

  function ejecutar() {

    salida = ""; // Reinicia la variable salida en cada ejecución

    try {
      eval(codigo);

      if (salida !== "") {
        document.getElementById("output").innerHTML = salida;
      }
    } catch (e) {
      document.getElementById("output").innerHTML = e.message;
    }
  }

  function consoleLog(...argumentos) {
    for (let i = 0; i < argumentos.length; i++) {
      salida += argumentos[i] + " ";
    }
    salida += "<br>";
  }

  console.log = consoleLog;

  useEffect(() => {
    editorSettings('', 'javascript', 'vs-dark', refCode.current, setCodigo)
  }, []);

  return (
    <div>
      <div className='contenedor-editor-consola'>
        <div className='contenedor-consola'>
          <form>
            <div onKeyUp={() => ejecutar()} ref={refCode} id='code'></div>
          </form>
          <div id="output"></div>
        </div>

        <div>
        </div>
      </div>
    </div>
  )
}

export default EditorConsola;