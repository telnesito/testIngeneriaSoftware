SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Cuentas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cuentas` (
  `idCuenta` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Contrasena` VARCHAR(45) NOT NULL,
  `Correo` VARCHAR(45) NOT NULL,
  `Pregunta_de_Seguridad` VARCHAR(45) NOT NULL,
  `Respuesta` VARCHAR(45) NOT NULL,
  `Rol` INT(2) NOT NULL DEFAULT '0',
  `FechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCuenta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pendientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pendientes` (
  `Correo` VARCHAR(45) NOT NULL,
  `Nombre` INT NOT NULL,
  `Contrasena` VARCHAR(45) NOT NULL,
  `PreguntaSeguridad` VARCHAR(45) NOT NULL,
  `Respuesta` VARCHAR(45) NOT NULL,
  `Verificado` TINYINT NOT NULL,
  PRIMARY KEY (`Correo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Preguntas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Preguntas` (
  `idPregunta` INT NOT NULL AUTO_INCREMENT,
  `Pregunta` VARCHAR(45) NULL,
  PRIMARY KEY (`idPregunta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Nube`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Nube` (
  `idCuenta` INT NOT NULL,
  `CStatus` TINYINT NOT NULL,
  `Directorio` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCuenta`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
