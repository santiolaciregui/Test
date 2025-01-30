const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
require('dotenv').config();

const userService = {
  register: async (name, email, password) => {
    // Verifica si el usuario ya existe
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crea el usuario
    const newUser = await userRepository.createUser(name, email, hashedPassword);
    return newUser;
  },

  login: async (email, password) => {
    // Busca el usuario
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    // Compara la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }
    // Genera token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return { token, user };
  },

  getUserById: async (id) => {
    return await userRepository.findById(id);
  },
};

module.exports = userService;