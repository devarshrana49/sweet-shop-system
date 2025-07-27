const request = require('supertest');
const app = require('../server');
const db = require('../src/models/database');

// This block will run before each test in this file
beforeEach(async () => {
  await db.run('DELETE FROM users');
});


describe('Authentication', () => {
  describe('POST /api/auth/register', () => {
    test('should register a new user', async () => {
      const userData = {
        username: 'testuser',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User registered successfully');
      expect(response.body).toHaveProperty('userId');
    });
  });
});
