describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://127.0.0.1:5173/landing/login')
      cy.get('input[id="email"]').type("barbara.schamberger@example.org")
      cy.get('input[id="password"]').type("secret")
      cy.get('button[id="btnIniciar"]').first().click()

      cy.get('li[id="emociones1"]').first().click()
      cy.visit('http://127.0.0.1:5173/Depresion')

     
    })
  })