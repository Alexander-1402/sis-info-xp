CREATE DATABASE IF NOT EXISTS sis_info_xp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sis_info_xp;

CREATE TABLE tarjetas_crc (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  tipo ENUM('activa','pasiva') NOT NULL,
  responsabilidades JSON NOT NULL,
  colaboradores JSON,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historias_usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL UNIQUE,
  descripcion TEXT NOT NULL,
  puntos TINYINT NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);
