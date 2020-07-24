describe('Navigate Website using the PrimaryBid Header', () => {

    before(() => {
        cy.visit(Cypress.env('baseURL'), {
            auth: {
                username: Cypress.env('authUsername'),
                password: Cypress.env('authPassword')
            }
        })
    })


    it('Visits the About ', () => {
        cy.get('[href="'+ Cypress.env('about') +'"]')
        .contains('About Us')
        .click()

        cy.url().should('include', Cypress.env('about'))
    })

})