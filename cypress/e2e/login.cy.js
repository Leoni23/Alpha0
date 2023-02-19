describe('template spec', () => {
  it('passes', () => {

    //link 
    cy.visit('http://127.0.0.1:5173/landing/login')

    //Ingreso de correo electrònico
    cy.get('input[id="email"]').type("barbara.schamberger@example.org")

    //Ingreso de contraseña
    cy.get('input[id="password"]').type("secret")
    cy.get('button[id="btnIniciar"]').first().click()
  })
})