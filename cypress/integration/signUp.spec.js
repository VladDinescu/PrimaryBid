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

    it('validates that the passwords entered must match', () => {
        cy.get('input[name="email"]').type(faker.internet.email())
        cy.get('input[name="password"]').type(Cypress.env('validPassword'))
        cy.get('input[name="confirmPassword"]').type(Cypress.env('invalidPassword'))
        cy.get('button[class="cta-1"]').click()
        cy.get('span[class="error"]').contains('Passwords do not match').should('be.visible')
    })
})