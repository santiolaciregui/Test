const userService = require('../services/userService');

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      const user = await userService.register(name, email, password);
      return res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      const { token, user } = await userService.login(email, password);
      return res.status(200).json({ message: 'Inicio de sesión exitoso', token, user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  me: async (req, res) => {
    try {
      const { userId } = req.user;
      const user = await userService.getUserById(userId);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

module.exports = authController;