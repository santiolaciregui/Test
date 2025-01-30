const mysql = require('mysql2/promise');
require('dotenv').config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("❌ ERROR: No se encontró la variable DATABASE_URL en el archivo .env");
}

// Extraer credenciales de DATABASE_URL
const match = DATABASE_URL.match(/mysql:\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*)\?ssl-mode=REQUIRED/);

if (!match) {
  throw new Error("❌ ERROR: La variable DATABASE_URL tiene un formato inválido.");
}

const [, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME] = match;

console.log(`🔗 Conectando a Aiven Cloud MySQL:
  Host: ${DB_HOST}
  Puerto: ${DB_PORT}
  Usuario: ${DB_USER}
  Base de datos: ${DB_NAME}`);

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
  connectionLimit: 10,
  connectTimeout: 10000,
  ssl: {
    rejectUnauthorized: false // Permitir certificados autofirmados
  }
});

module.exports = { pool };