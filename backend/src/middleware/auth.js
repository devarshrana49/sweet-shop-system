const jwt = require('jsonwebtoken');

// This should be a secret key stored safely, but for now, we'll define it here.
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// This function CREATES a new token (a digital ID card) for a user.
function generateToken(userId, username) {
  return jwt.sign({ userId, username }, SECRET_KEY, { expiresIn: '24h' });
}

// This function CHECKS a token to make sure it's valid.
function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
    
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Add the user's info to the request
    next(); // If the token is valid, proceed to the next step
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = { generateToken, verifyToken };