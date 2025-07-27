const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const { generateToken } = require('../middleware/auth');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Use the service to create the user
    const user = await UserService.register(username, password);
    // Generate a token for the new user
    const token = generateToken(user.id, user.username);

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id,
      token: token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Use the service to log the user in
    const user = await UserService.login(username, password);
    // Generate a token for the logged-in user
    const token = generateToken(user.id, user.username);

    res.json({
      message: 'Login successful',
      user: user,
      token: token
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;