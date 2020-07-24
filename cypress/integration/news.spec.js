describe('News page', () => {

    before(() => {
        cy.visit(Cypress.env('baseURL'), {
            auth: {
                username: Cypress.env('authUsername'),
                password: Cypress.env('authPassword')
            }
        })

        cy.get('[href="'+ Cypress.env('news')+'"]')
            .contains('News')
            .click()
    })

    it('has articles under the Featured Articles section', () => {

        cy.get('[class="card-grid margin--l"]').first()
            .children().should('have.length', 4)

    })

})