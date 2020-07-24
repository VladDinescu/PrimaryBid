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

    it('has articles under the All Articles section', () => {

        cy.get('[class="card-grid margin--l"]').last()
            .children().should('not.be.empty')

    })

    it('has articles under the All Articles section when the Webinar option is selected', () => {
        //Select the Webinar Filter
        cy.get('[class="pb_news_filter__itemLabel_1iwa"]').contains("Webinar").click({ force: true })

        //Check that the Webinar category yielded results in All Articles Section
        cy.get('[class="card-grid margin--l"]').last()
            .children().should('not.be.empty')

        //Check if the last News article fits under the Webinar Category
        cy.get('[class="pb_news_item__category_2vY1"]').last().should('contain', 'Webinar')

    })

})