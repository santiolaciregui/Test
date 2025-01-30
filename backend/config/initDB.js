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

const createTables = async () => {
  let connection;
  try {
    console.log('🚀 Creando tablas en la base de datos de Aiven...');

    // Obtener conexión
    connection = await pool.getConnection();

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
          id INT PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          user_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log('✅ Tablas creadas correctamente en Aiven Cloud.');
  } catch (error) {
    console.error('❌ Error creando las tablas:', error);
  } finally {
    if (connection) connection.release(); // Liberar la conexión
    process.exit(0);
  }
};

// Ejecutar la función
createTables();