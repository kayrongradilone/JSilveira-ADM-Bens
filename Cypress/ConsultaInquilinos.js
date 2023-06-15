describe('Consulta de Inquilino', () => {
    beforeEach(() => {
      // Cadastrar inquilino de teste antes de executar o caso de teste
      cy.request('POST', '/api/inquilinos', {
        nome: 'Maria Oliveira',
        cpf: '98765432100',
        email: 'maria@example.com',
        telefone: '888888888'
      })
    })
  
    it('Deve exibir informações do inquilino buscado', () => {
      cy.visit('/consulta-inquilino')
  
      // Informar critério de busca
      cy.get('#campo-busca').type('Maria Oliveira')
  
      // Clicar no botão de pesquisar
      cy.get('button[type="submit"]').click()
  
      // Verificar se as informações do inquilino são exibidas corretamente
      cy.get('.result-item').should('have.length', 1)
      cy.get('.result-item').contains('Maria Oliveira')
      cy.get('.result-item').contains('98765432100')
      cy.get('.result-item').contains('maria@example.com')
      cy.get('.result-item').contains('888888888')
    })
  })
  