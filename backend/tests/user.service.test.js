const UserService = require('../src/services/user.service');
const db = require('../src/models/database');

// This block will run before each test in this file
beforeEach(async () => {
  await db.run('DELETE FROM users');
});

describe('UserService', () => {
  describe('register', () => {
    test('should create a new user', async () => {
      const userData = {
        username: 'newuser',
        password: 'password123'
      };

      const result = await UserService.register(userData.username, userData.password);
      
      // Check if the service returns the new user's ID and username
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('username', userData.username);

      // IMPORTANT: Check that the password is NOT returned for security
      expect(result).not.toHaveProperty('password'); 
    });
  });
});