const bcrypt = require('bcryptjs'); //pour hacher les mots de passe
const jwt = require('jsonwebtoken'); //pour générer des tokens JWT
const { v4: uuidv4 } = require('uuid'); //pour générer un ID unique à chaque utilisateur
const User = require('../models/userModel'); //Fonctions provenant du modèle utilisateur
const { SECRET } = require('../middleware/auth'); //est utilisé pour signer les JWT

//inscription
exports.register = async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Missing or invalid JSON body' });
  }
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const existingUser = findUserByEmail(email);
  if (existingUser) return res.status(400).json({ error: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), email, password: hashedPassword, isAdmin: false };
  addUser(user);

  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json(userWithoutPassword);
};
//connexion
exports.login = async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Missing or invalid JSON body' });
  }
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

 const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
res.json({ token });
};

exports.getProfile = (req, res) => {
  const user = getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...userData } = user;
  res.json(userData);
};

exports.getAllUsers = (req, res) => {
  const safeUsers = getUsers().map(({ password, ...rest }) => rest);
  res.json(safeUsers);
};

exports.deleteUser = (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  removeUserById(req.params.id);
  res.json({ message: 'User deleted' });
};
