const request = require('supertest');
const app = require('../app'); // Importe o arquivo principal da sua aplicação

describe('Testes de API', () => {
  let inquilinoId; // Variável para armazenar o ID do inquilino criado para uso nos testes

  // Teste de criação de inquilino
  it('Deve criar um novo inquilino', async () => {
    const response = await request(app)
      .post('/api/inquilinos')
      .send({
        nome: 'João Silva',
        cpf: '12345678900',
        email: 'joao@example.com',
        telefone: '999999999'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    inquilinoId = response.body.id; // Armazena o ID do inquilino criado para uso posterior
  });

  // Teste de consulta de inquilino
  it('Deve retornar os detalhes do inquilino', async () => {
    const response = await request(app).get(`/api/inquilinos/${inquilinoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'João Silva');
    expect(response.body).toHaveProperty('cpf', '12345678900');
    expect(response.body).toHaveProperty('email', 'joao@example.com');
    expect(response.body).toHaveProperty('telefone', '999999999');
  });

  // Teste de atualização de inquilino
  it('Deve atualizar os dados do inquilino', async () => {
    const response = await request(app)
      .put(`/api/inquilinos/${inquilinoId}`)
      .send({
        nome: 'João da Silva',
        telefone: '888888888'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'João da Silva');
    expect(response.body).toHaveProperty('telefone', '888888888');
  });

  // Teste de exclusão de inquilino
  it('Deve excluir o inquilino', async () => {
    const response = await request(app).delete(`/api/inquilinos/${inquilinoId}`);

    expect(response.status).toBe(204);
  });
});
