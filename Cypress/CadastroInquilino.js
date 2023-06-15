describe('Cadastro de Inquilino', () => {
    it('Deve cadastrar um novo inquilino', () => {
      cy.visit('/cadastro-inquilino')
  
      // Preencher campos obrigatórios do formulário
      cy.get('#nome').type('João Silva')
      cy.get('#cpf').type('12345678900')
      cy.get('#email').type('joao@example.com')
      cy.get('#telefone').type('999999999')
  
      // Enviar o formulário
      cy.get('form').submit()
  
      // Verificar mensagem de sucesso
      cy.get('.success-message').should('be.visible').and('contain', 'Inquilino cadastrado com sucesso!')
    })
  })
  