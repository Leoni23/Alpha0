describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://127.0.0.1:5173/landing/login')
      cy.get('input[id="email"]').type("barbara.schamberger@example.org")
      cy.get('input[id="password"]').type("secret")
      cy.get('button[id="btnIniciar"]').first().click()

    //mediante el Dashboard se dirije a Reservas
     cy.get('li[id="reserva"]').first().click()

     //Se envia a la direccion se va a modificar
      cy.visit('http://127.0.0.1:5173/EditReserva/71')

      //limpia los imput y edita los parametros
      cy.get('textarea[id="descripcion"]').clear().type("Bienvenidos al nuevo evento creado por nuestra escuela de biodanza")
      cy.get('input[id="cupos"]').clear().type("50")
      cy.get('input[id="contacto"]').clear().type("0983753059")
      cy.get('input[type=file]').selectFile({
        contents: Cypress.Buffer.from('fixtures'),
        fileName: 'bailePareja.jpg',
        lastModified: Date.now(),})

      //boton de Guardar Modificacion y boton de aceptar alerta
        cy.get('button[class="btn text-light btn-raised btn-sm"]').first().click()
        cy.get('h2[class="btn btn-raised btn-sm"]').first().click()
    })
  })