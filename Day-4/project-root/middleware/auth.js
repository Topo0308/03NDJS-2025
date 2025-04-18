const jwt = require('jsonwebtoken');  //librairie qui permet de créer et vérifier des tokens 
const SECRET = 'supersecret' //signer et vérifier les tokens

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function adminOnly(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
}

module.exports = { authMiddleware, SECRET, adminOnly };
