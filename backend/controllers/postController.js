const postService = require('../services/postService');

const postController = {
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Título y contenido son requeridos' });
      }
      const userId = req.user.userId;
      const post = await postService.createPost(title, content, userId);
      return res.status(201).json({ message: 'Publicación creada', post });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getPosts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || '';
      const data = await postService.getPosts(page, limit, search);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postService.getPost(id);
      if (!post) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Título y contenido son requeridos' });
      }

      // Verifica que el post exista
      const existingPost = await postService.getPost(id);
      if (!existingPost) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }

      // Verifica que sea el autor
      if (existingPost.user_id !== req.user.userId) {
        return res.status(403).json({ message: 'No tienes permisos para editar esta publicación' });
      }

      const updatedPost = await postService.updatePost(id, title, content);
      return res.status(200).json({ message: 'Publicación actualizada', post: updatedPost });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const existingPost = await postService.getPost(id);
      if (!existingPost) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      // Verifica que sea el autor
      if (existingPost.user_id !== req.user.userId) {
        return res.status(403).json({ message: 'No tienes permisos para eliminar esta publicación' });
      }
      await postService.deletePost(id);
      return res.status(200).json({ message: 'Publicación eliminada' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

module.exports = postController;