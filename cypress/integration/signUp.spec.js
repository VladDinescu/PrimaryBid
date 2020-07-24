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

    it('navigates to the user details page if the data in the form is correct', () => {
        cy.get('input[name="email"]').type(faker.internet.email())
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="confirmPassword"]').type('password')
        cy.get('button[class="cta-1"]').click()
        
        //Completing Form
        cy.url().should('include', Cypress.env('signupForm'))

        cy.get('input[name="firstname"]').type('Argus')
        cy.get('input[name="lastname"]').type('Peregreen')
        cy.get('input[name="dob"]').type('1990-10-10')
        cy.get('span[class="label"]').contains('-- select an option --').type('male')
        cy.get('input[name="flatNumber"]').type('270')
        cy.get('input[name="phoneNumber"]').type('07857000000')
        cy.get('input[name="houseNameNumber"]').type('Something')
        cy.get('input[name="street"]').type('Something')
        cy.get('input[name="city"]').type('London')
        cy.get('input[name="postcode"]').type('SE186YN')

        cy.get('button[type="submit"]').click()

        //Completing Step 2
        cy.url().should('include', Cypress.env('signupSelectBroker'))

        cy.get('span[class="d-flex"]').contains('add my broker later').click()

        //Completing Step 3
        cy.url().should('include', Cypress.env('signupLegal'))

        cy.get('div[class="field--light__checkbox"]').click()
        cy.get('button[class="button button--teal button--fit"]').contains('Continue').click({ force: true })

        //Completing Step 4 - Risks
        cy.get('div[class="field--light__checkbox"]').click()
        cy.get('button[class="button button--teal button--fit"]').contains('Continue').click({ force: true })
        
        //Vetting
        cy.url().should('include', Cypress.env('signupVetting'))

        cy.get('span[class="inner-text"]').contains('Complete Personal Details').click()
        
        //Verifying Details
        cy.url().should('include', Cypress.env('signupPersonalDetails'))

    })
})