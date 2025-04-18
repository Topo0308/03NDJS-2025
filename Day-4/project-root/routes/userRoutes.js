const express = require('express');  //importation Express, un framework web pour Node.js.
const router = express.Router();

//Importation des fonctions du contrôleur
const {
  register,
  login,
  getProfile,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');

//vérifie si un utilisateur est authentifié via le token JWT
const { authMiddleware } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getProfile);

// protection des routes admin
router.get('/users', authMiddleware, adminOnly, getAllUsers);
router.delete('/users/:id', authMiddleware, adminOnly, deleteUser);

module.exports = router;
