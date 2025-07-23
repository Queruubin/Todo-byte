import request from 'supertest';
import { app } from '../index.js';

describe('Auth Routes', () => {
  it('Debería registrar usuario nuevo', async () => {
    const res = await request(app).post('/auth/register').send({
      nombre: 'isaac Test',
      email: 'isaactest@email.com',
      password: '123456'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('usuario');
    expect(res.body.usuario).toHaveProperty('nombre', 'isaac Test');
  });
});