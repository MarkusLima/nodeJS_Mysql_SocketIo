const request = require('supertest');
const { app } = require('../server.js'); // Supondo que o arquivo principal da sua aplicação se chama 'app.js'

describe('Testes das rotas da API /users', () => {
  let userId; // Variável para armazenar o ID do usuário criado durante os testes

  // Teste para criar um novo usuário
  test('Deve criar um novo usuário', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'name@dominio.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id; // Armazena o ID do usuário criado para usar em outros testes
  });

  // Teste para criar um novo usuário
  test('Deve criar um novo com email repetido', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'name@dominio.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(500);
  });

  // Teste para criar um novo usuário
  test('Tenta criar usuário faltando nome', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'name@dominio.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(403);
  });

  // Teste para criar um novo usuário
  test('Tenta criar usuário faltando email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        password: 'password123'
      });
    expect(response.statusCode).toBe(403);
  });

      // Teste para criar um novo usuário
  test('Tenta criar usuário faltando password', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Test User',
        email: 'name@dominio.com'
      });
    expect(response.statusCode).toBe(403);
  });

  // Teste para obter um usuário por ID
  test('Deve obter um usuário por ID', async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Test User');
    expect(response.body.email).toBe('name@dominio.com');
  });

  // Teste para atualizar um usuário por ID
  test('Deve atualizar um usuário por ID', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'newpassword123'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated User');
    expect(response.body.email).toBe('updated@example.com');
  });

  // Teste realizar login
  test('Tenta realizar login', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'updated@example.com',
        password: 'newpassword123'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('host');
  });

  // Teste realizar login
  test('Tenta realizar login sem o email', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        password: 'newpassword123'
      });
    expect(response.statusCode).toBe(403);
  });

  // Teste realizar login
  test('Tenta realizar login sem a senha', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'updated@example.com'
      });
    expect(response.statusCode).toBe(403);
  });

  // Teste para excluir um usuário por ID
  test('Deve excluir um usuário por ID', async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.statusCode).toBe(204);
  });

  // Teste para tentar obter um usuário excluído
  test('Não deve obter um usuário excluído', async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.statusCode).toBe(404);
  });
});
