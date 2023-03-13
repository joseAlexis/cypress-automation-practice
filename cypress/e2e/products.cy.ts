describe("Products healthy check", () => {
    beforeEach(function () {
        cy.visit('/products');
    })

    it("Should Verify product details", () => {
        cy.fixture("productDetails").then(product => {
            cy.get(`[href="/product_details/${product.id}"]`).eq(0).click();
            cy.url().should('eq', `${Cypress.config().baseUrl}/product_details/${product.id}`);
            cy.get('.product-information').then(productDetails => {
                expect(productDetails.children('h2').text()).to.eq(product.name);
                expect(productDetails.children('p').eq(0).text()).to.eq(`Category: ${product.category}`);
                expect(productDetails.children('span').children('span')).to.contain(`${product.price}`);
                expect(productDetails.children('p').eq(1).text()).to.contain(`Availability: ${product.aviability}`);
                expect(productDetails.children('p').eq(2).text()).to.contain(`Condition: ${product.condition}`);
                expect(productDetails.children('p').eq(3).text()).to.contain(`Brand: ${product.brand}`);
            })
        })
    })

    it('Should search product', () => {
        const searchItem = 'Blue Top'
        cy.get('[id="search_product"]').type(searchItem);
        cy.get('[id="submit_search"]').click();
        cy.get('.single-products').should('have.length', 1);
    })
})