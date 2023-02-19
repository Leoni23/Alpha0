describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://127.0.0.1:5173/landing/login')
      cy.get('input[id="email"]').type("barbara.schamberger@example.org")
      cy.get('input[id="password"]').type("secret")
      cy.get('button[id="btnIniciar"]').first().click()

      cy.get('li[id="publicidad1"]').first().click()
      cy.get('a[id="crearPubli"]').first().click()

      //Envio de todos los parametros y datos para crear una nueva publicidad
      cy.get('input[id="titulo"]').type("Nuevo evento")
      cy.get('textarea[id="descripcion"]').type("el nuevo evento de Biodanza este sabado")
      cy.get('input[id="evento"]').type("2023-06-01T08:30")
      
      
      cy.get('input[type=file]').selectFile({
        contents: Cypress.Buffer.from('fixtures'),
        fileName: 'bailePareja.jpg',
        lastModified: Date.now(),})

      //boton de Guardar publicidad
        cy.get('button[class="btn btn-info btn-raised btn-sm"]').first().click()
       
    })
  })