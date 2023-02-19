describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://127.0.0.1:5173/landing/login')
      cy.get('input[id="email"]').type("barbara.schamberger@example.org")
      cy.get('input[id="password"]').type("secret")
      cy.get('button[id="btnIniciar"]').first().click()
      cy.get('li[id="MultiIra"]').first().click()
      
      cy.get('button[class="btn btn-danger m-1 bi bi-trash-fill"]').first().click()
    })
  })