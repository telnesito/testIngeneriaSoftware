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
      <div className='contenedor-consola'>
        <form>
          <textarea placeholder='Insert your console code' id="code" onKeyUp={() => ejecutar()}></textarea>
        </form>
        <div id="output"></div>
      </div>
      <p>
        <b>Ejemplos de codigo:</b> <br />
        <pre>
          console.log('hola') <br />
          console.log(2+2) <br />
          const salidaArray = (...numeros) => numeros.forEach((n)=> console.log(n))
          <br />
          salidaArray(3,4) <br />
          const sum = (...args) => args.reduce((acc, val) => acc + val, 0);
          <br />
          console.log(sum(3,2,5,6))

        </pre>


      </p>
    </div>
  )
}

export default EditorConsola