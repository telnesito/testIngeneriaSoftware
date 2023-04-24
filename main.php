<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydb";

// Crear Coneccion
// _____________________________________________________________________

$conn = mysqli_connect($servername, $username, $password, $dbname);

// _____________________________________________________________________


// Chequear Coneccion
// _____________________________________________________________________

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// _____________________________________________________________________


// Insertar Datos en la tabla de "Pendientes" luego de que el usuario haya insertado sus datos en el Registro
// _____________________________________________________________________

$sql = "INSERT INTO Pendientes (Correo, Nombre, Contrasena, PreguntaSeguridad, Respuesta, Verificado)
VALUES ('JOSEGMAIL', 'JOSE', '189W4G18EW', '1', 'Mi perro se llama patricio', 'No')";

// _____________________________________________________________________


// Insertar Datos en la tabla de "Cuenta" luego de que el usuario verificara su correo, se eliminara el usuario de la tabla "Pendientes" y se copiaran sus datos en la tabla "Cuentas".
// _____________________________________________________________________

$sql = "INSERT INTO Cuentas (Nombre, Contraseña, Correo, Pregunta_de_Seguridad, Respuesta)
VALUES ('Jose', '841984gfwsg', 'Correo', '2', 'Respuesta')";

// idCuenta, Rol y Fecha de Creacion se omiten aqui porque se generan automaticamente
// _____________________________________________________________________


// Insertar Datos en la tabla de "Nube" donde se guardaran en el directorio del usuario todos sus proyectos y archivos
// _____________________________________________________________________

$sql = "INSERT INTO Nube (idCuenta, CStatus, Directorio)
VALUES ('1', 'Finalizado', './Jose213/myproyecto/*')";

// _____________________________________________________________________



// Insertar Datos en la tabla de "Preguntas" donde se crearan las preguntas de seguridad del programa, por ahora esta en blanco
// _____________________________________________________________________

$sql = "INSERT INTO Preguntas (Pregunta)
VALUES ('¿Cual fue el nombre de tu primer perro?')";

//Al agregar la pregunta el id se genera automaticamente, normalmente esta tabla no se toca hasta que se nos ocurran preguntas de seguridad
// _____________________________________________________________________


if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
