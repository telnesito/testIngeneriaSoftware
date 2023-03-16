import React from 'react'
import './EditorConsola.css'

const EditorConsola = () => {


  let salida = "";

  function ejecutar() {
    var codigo = document.getElementById("code").value;

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

  return (
    <div>
      <div className='contenedor-editor-consola'>
        <div className='contenedor-consola'>
          <form>
            <textarea placeholder='Insert your console code' id="code" onKeyUp={() => ejecutar()}></textarea>
          </form>
          <div id="output"></div>
        </div>

        <div>
        </div>
      </div>



    </div>
  )
}

export default EditorConsola