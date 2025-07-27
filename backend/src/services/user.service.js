const bcrypt = require('bcryptjs');
const db = require('../models/database');

class UserService {
  async register(username, password) {
    // Hash password for security before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the new user into the database
    const result = await db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    // Return the new user's info, but not the password
    return {
      id: result.id,
      username: username
    };
  }

  async login(username, password) {
    // Find a user by their username
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the provided password matches the hashed one in the database
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    // Return user info if login is successful
    return {
      id: user.id,
      username: user.username,
      role: user.role
    };
  }
}

module.exports = new UserService();