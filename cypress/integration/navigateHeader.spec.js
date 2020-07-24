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

    it('Visits the News ', () => {
        cy.get('[href="'+ Cypress.env('news') + '"]')
            .contains('News')
            .click()

        cy.url().should('include', Cypress.env('news'))

        cy.contains('Featured Content')
            .should('be.visible')

        cy.contains('All Content')
            .should('be.visible')
    })

    it('Visits the FAQs', () => {
        cy.get('[href="'+ Cypress.env('faqs') + '"]')
            .contains('FAQs')
            .click()

            cy.url().should('include', Cypress.env('faqs'))

        cy.contains('Frequently Asked Questions')
        .should('exist')
    })

})