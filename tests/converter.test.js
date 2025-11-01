const request = require('supertest');
const app = require('../index');
const { cToF } = require('../lib/converter');

describe('converter', () => {
  test('cToF converts correctly', () => {
    expect(cToF(0)).toBe(32.00);
    expect(cToF(100)).toBe(212.00);
    expect(cToF(-40)).toBe(-40.00);
  });
});

describe('API', () => {
  test('GET / returns message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Celsius to Fahrenheit');
  });

  test('GET /convert returns converted value', async () => {
    const res = await request(app).get('/convert').query({ c: 10 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('f');
    expect(res.body.f).toBe(50.00);
  });

  test('GET /convert with invalid param returns 400', async () => {
    const res = await request(app).get('/convert');
    expect(res.status).toBe(400);
  });
});
