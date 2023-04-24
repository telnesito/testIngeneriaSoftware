<?php
 
header("Content-Type:application/json");
include('main.php');
 
if (isset($_GET['idCuenta']) && $_GET['idCuenta']!="") {
 
 $idCuenta = $_GET['idCuenta'];
 $query = "SELECT * FROM `Cuentas` WHERE idCuenta=$idCuenta";
 $result = mysqli_query($con,$query);
 $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
 
 $CuentaData['idCuenta'] = $row['idCuenta'];
 $CuentaData['Nombre'] = $row['Nombre'];
 $CuentaData['Contrasena'] = $row['Contrasena'];
 $CuentaData['Correo'] = $row['Correo'];
 $CuentaData['Pregunta_de_Seguridad'] = $row['Pregunta_de_Seguridad'];
 $CuentaData['Respuesta'] = $row['Respuesta'];
 
 $response["status"] = "true";
 $response["message"] = "Detalles de cuenta";
 $response["Cuenta"] = $ClienteData;
 
} else {
 $response["status"] = "false";
 $response["message"] = "No se encontraron clientes!";
}
echo json_encode($response); exit;
 
?>