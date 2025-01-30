const { pool } = require('../config/db');
const Post = require('../models/postModel');

const postRepository = {
  createPost: async (title, content, userId) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
        [title, content, userId]
      );
      return new Post(result.insertId, title, content, userId, new Date(), new Date());
    } finally {
      if (connection) connection.release();
    }
  },

  getAllPosts: async (limit, offset, searchTerm) => {
    let connection;
    try {
      connection = await pool.getConnection();
      
      // Asegurar valores válidos
      limit = Number(limit) > 0 ? Number(limit) : 5;
      offset = Number(offset) >= 0 ? Number(offset) : 0;
      searchTerm = typeof searchTerm === 'string' ? searchTerm.trim() : '';

      let baseQuery = 'SELECT * FROM posts';
      let countQuery = 'SELECT COUNT(*) as count FROM posts';
      const params = [];

      if (searchTerm) {
        baseQuery += ' WHERE title LIKE ? OR content LIKE ?';
        countQuery += ' WHERE title LIKE ? OR content LIKE ?';
        params.push(`%${searchTerm}%`, `%${searchTerm}%`);
      }

      baseQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(limit, offset);

      console.log('Executing SQL:', baseQuery, 'with params:', params); // Debugging

      const [postRows] = await connection.query(baseQuery, params);
      const [countRows] = await connection.query(countQuery, params.slice(0, 2)); // Excluimos limit y offset

      const posts = postRows.map((row) => new Post(
        row.id, row.title, row.content, row.user_id, row.created_at, row.updated_at
      ));

      return { posts, total: countRows[0].count };
    } finally {
      if (connection) connection.release();
    }
  },

  getPostById: async (id) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM posts WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      const row = rows[0];
      return new Post(row.id, row.title, row.content, row.user_id, row.created_at, row.updated_at);
    } finally {
      if (connection) connection.release();
    }
  },

  updatePost: async (id, title, content) => {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
      );
      const [rows] = await connection.query('SELECT * FROM posts WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      const row = rows[0];
      return new Post(row.id, row.title, row.content, row.user_id, row.created_at, row.updated_at);
    } finally {
      if (connection) connection.release();
    }
  },

  deletePost: async (id, userId) => {
    let connection;
    try {
      connection = await pool.getConnection();

      // Check if the post exists and belongs to the user
      const [rows] = await connection.query('SELECT user_id FROM posts WHERE id = ?', [id]);
      if (rows.length === 0) {
        connection.release();
        return { success: false, message: 'Post not found' };
      }

      if (rows[0].user_id !== userId) {
        connection.release();
        return { success: false, message: 'Unauthorized' };
      }

      await connection.query('DELETE FROM posts WHERE id = ?', [id]);
      connection.release();
      return { success: true };
    } finally {
      if (connection) connection.release();
    }
  },
};

module.exports = postRepository;