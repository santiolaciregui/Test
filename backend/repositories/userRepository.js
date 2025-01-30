const { pool } = require('../config/db');
const User = require('../models/userModel');

const userRepository = {
  createUser: async (name, email, password) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
      );
      return new User(result.insertId, name, email, password, new Date());
    } finally {
      if (connection) connection.release();
    }
  },

  findByEmail: async (email) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return new User(row.id, row.name, row.email, row.password, row.created_at);
    } finally {
      if (connection) connection.release();
    }
  },

  findById: async (id) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return new User(row.id, row.name, row.email, row.password, row.created_at);
    } finally {
      if (connection) connection.release();
    }
  },
};

module.exports = userRepository;