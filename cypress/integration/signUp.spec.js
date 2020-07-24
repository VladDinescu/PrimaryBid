require('dotenv').config()

describe('Signup page', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseURL'), {
            auth: {
                username: Cypress.env('authUsername'),
                password: Cypress.env('authPassword')
            }
        })

        cy.get('[href="'+ Cypress.env('signup')+'"]')
            .contains('Sign up')
            .click()
    })

    it('requires a valid email address', () => { 
        cy.get('input[name="email"]').type(Cypress.env('invalidEmail'))
        cy.get('button[class="cta-1"]').dblclick()
        cy.get('span[class="error"]').contains('The email you have entered is not valid').should('be.visible')
    })
})