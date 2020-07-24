var faker = require('faker')
const Sign_Up = require('../fixtures/pages/signUpPage')
const Header = require('../fixtures/pages/header')
describe('Signup page', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseURL'), {
            auth: {
                username: Cypress.env('authUsername'),
                password: Cypress.env('authPassword')
            }
        })

        cy.get(Header.signUp)
            .contains('Sign up')
            .click()
    })

    it('requires a valid email address', () => { 
        cy.get(Sign_Up.emailField).type(Cypress.env('invalidEmail'))
        cy.get(Sign_Up.submitButton).dblclick()
        cy.get(Sign_Up.errorMessage).contains('The email you have entered is not valid').should('be.visible')
    })

    it('validates that the passwords entered must match', () => {
        cy.get(Sign_Up.emailField).type(faker.internet.email())
        cy.get(Sign_Up.passwordField).type(Cypress.env('validPassword'))
        cy.get(Sign_Up.confirmPasswordField).type(Cypress.env('invalidPassword'))
        cy.get(Sign_Up.submitButton).click()
        cy.get(Sign_Up.errorMessage).contains('Passwords do not match').should('be.visible')
    })

     it('navigates to the user details page if the data in the form is correct', () => {
        cy.get(Sign_Up.emailField).type(faker.internet.email())
        cy.get(Sign_Up.passwordField).type('password')
        cy.get(Sign_Up.confirmPasswordField).type('password')
        cy.get(Sign_Up.submitButton).click()
        
        //Completing Form
        cy.url().should('include', Cypress.env('signupForm'))

        cy.get(Sign_Up.firstName).type('Argus')
        cy.get(Sign_Up.lastName).type('Peregreen')
        cy.get(Sign_Up.dob).type('1990-10-10')
        cy.get(Sign_Up.gender).contains('-- select an option --').type('male')
        cy.get(Sign_Up.flatNumber).type('270')
        cy.get(Sign_Up.phoneNumber).type('07857000000')
        cy.get(Sign_Up.houseName).type('Something')
        cy.get(Sign_Up.street).type('Something')
        cy.get(Sign_Up.city).type('London')
        cy.get(Sign_Up.postcode).type('SE186YN')

        cy.get(Sign_Up.submitFormButton).click()

        //Completing Step 2
        cy.url().should('include', Cypress.env('signupSelectBroker'))

        cy.get(Sign_Up.addBrokerLater).contains('add my broker later').click()

        //Completing Step 3
        cy.url().should('include', Cypress.env('signupLegal'))

        cy.get(Sign_Up.consentCheckbox).click()
        cy.get(Sign_Up.continueButton).contains('Continue').click({ force: true })

        //Completing Step 4 - Risks
        cy.get(Sign_Up.consentCheckbox).click()
        cy.get(Sign_Up.continueButton).contains('Continue').click({ force: true })
        
        //Vetting
        cy.url().should('include', Cypress.env('signupVetting'))

        cy.get(Sign_Up.checkDetailsButton).contains('Complete Personal Details').click()
        
        //Verifying Details
        cy.url().should('include', Cypress.env('signupPersonalDetails'))

    })
})