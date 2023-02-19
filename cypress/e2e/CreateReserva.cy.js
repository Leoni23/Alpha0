describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://127.0.0.1:5173/landing/login')
      cy.get('input[id="email"]').type("barbara.schamberger@example.org")
      cy.get('input[id="password"]').type("secret")
      cy.get('button[id="btnIniciar"]').first().click()

      cy.get('li[id="reserva"]').first().click()
      cy.get('a[class="btn btn-sm text-light bi bi-plus"]').first().click()

      //Envio de todos los parametros y datos para crear un evento
      cy.get('input[id="titulo"]').type("Biodanza")
      cy.get('textarea[id="descripcion"]').type("Bienvenidos")
      cy.get('input[id="evento"]').type("2023-06-01T08:30")
      cy.get('input[id="cupos"]').type("30")
      cy.get('input[id="contacto"]').type("0983753059")
      cy.get('input[type=file]').selectFile({
        contents: Cypress.Buffer.from('fixtures'),
        fileName: 'bailePareja.jpg',
        lastModified: Date.now(),})

    //tiempo de espera antes de enviar los datos
      cy.wait(3000);

      //boton de Guardar y boton de aceptar alerta
        cy.get('button[class="btn text-light btn-raised btn-sm"]').first().click()
        cy.get('h2[class="btn btn-raised btn-sm"]').first().click()
    })
  })