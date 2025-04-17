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

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  await user.save();

  const { password: _, ...userWithoutPassword } = user.toObject();
  res.status(201).json(userWithoutPassword);
};
//connexion
exports.login = async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Missing or invalid JSON body' });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.getProfile = (req, res) => {
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...userData } = user..toObject();
  res.json(userData);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  const safeUsers = users.map(({ _doc }) => {
  const { password, ...rest } = _doc;
    return rest;
  });
  res.json(safeUsers);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};
