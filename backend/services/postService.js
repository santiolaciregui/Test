const postRepository = require('../repositories/postRepository');

const postService = {
  createPost: async (title, content, userId) => {
    const newPost = await postRepository.createPost(title, content, userId);
    return newPost;
  },

  getPosts: async (page = 1, limit = 5, search = '') => {
    const offset = (page - 1) * limit;
    const { posts, total } = await postRepository.getAllPosts(limit, offset, search);
    return {
      posts,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  },

  getPost: async (id) => {
    return await postRepository.getPostById(id);
  },

  updatePost: async (id, title, content) => {
    return await postRepository.updatePost(id, title, content);
  },

  deletePost: async (id) => {
    return await postRepository.deletePost(id);
  },
};

module.exports = postService;