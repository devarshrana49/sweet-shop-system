const request = require('supertest');
const app = require('../server');
const db = require('../src/models/database');

describe('Sweets API', () => {
  let authToken;

  // Before any tests run, we register a user and get their login token.
  // We need this token to access the protected sweets routes.
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'sweetstester', password: 'password123' }); // Use a unique username

    authToken = response.body.token;
  });

  // Test for creating a new sweet
  describe('POST /api/sweets', () => {
    test('should create a new sweet', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 50,
        description: 'Delicious chocolate bar'
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${authToken}`) // We use the token here
        .send(sweetData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Sweet added successfully');
      expect(response.body.sweet).toHaveProperty('name', sweetData.name);
    });
  });

  // Test for getting all sweets
  describe('GET /api/sweets', () => {
    test('should get all sweets', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${authToken}`) // We use the token here
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});