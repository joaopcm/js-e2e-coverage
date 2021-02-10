const { describe, it } = require('mocha');
const request = require('supertest');
const { deepStrictEqual, ok } = require('assert');

const app = require('./api');

describe('API suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await request(app).get('/contact').expect(200);

      deepStrictEqual(response.text, 'Contact us page');
    });
  });

  describe('/hi', () => {
    it('should request an inexisting route /hi and redirect to the NotFound page', async () => {
      const response = await request(app).get('/hi').expect(200);

      deepStrictEqual(response.text, 'Not found');
    });
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP code 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'joaopcm', password: '123' })
        .expect(200);

      deepStrictEqual(response.text, 'Logging has succeeded!');
    });

    it('should not be able to login with wrong credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'wrong', password: 'credentials' })
        .expect(401);

      ok(response.unauthorized);
      deepStrictEqual(response.text, 'Logging failed!');
    });
  });
});
