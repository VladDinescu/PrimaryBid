const News = require('../fixtures/pages/news')
const Header = require('../fixtures/pages/header')
describe('News page', () => {

    before(() => {
        cy.visit(Cypress.env('baseURL'), {
            auth: {
                username: Cypress.env('authUsername'),
                password: Cypress.env('authPassword')
            }
        })

        cy.get(Header.news)
            .contains('News')
            .click()
    })

    it('has articles under the Featured Articles section', () => {

        cy.get(News.articlesSection).first()
            .children().should('have.length', 4)

    })

    it('has articles under the All Articles section', () => {

        cy.get(News.articlesSection).last()
            .children().should('not.be.empty')

    })

    it('has articles under the All Articles section when the Webinar option is selected', () => {
        //Select the Webinar Filter
        cy.get(News.webinarFilter).contains("Webinar").click({ force: true })

        //Check that the Webinar category yielded results in All Articles Section
        cy.get(News.articlesSection).last()
            .children().should('not.be.empty')

        //Check if the last News article fits under the Webinar Category
        cy.get(News.article).last().should('contain', 'Webinar')

    })

})