describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://127.0.0.1:5173/landing/login')
      cy.get('input[id="email"]').type("barbara.schamberger@example.org")
      cy.get('input[id="password"]').type("secret")
      cy.get('button[id="btnIniciar"]').first().click()

      cy.get('li[id="reserva"]').first().click()

      //Se visualiza el detalle de los usuarios registrados en el evento
      cy.visit('http://127.0.0.1:5173/ShowReserva/1')

   
    })
  })