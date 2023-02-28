import { UserDTO } from "../support/DTOs/UserDTO";

describe('Resgister User', () => {
    beforeEach(function () {
        cy.visit('/');
    })

    it('Should register a new user', () => {
        cy.get('a[href="/login"]').click();

        cy.task('generateUser').then(function (userDTO: UserDTO) {
            console.log(userDTO.firstName);
            cy.get('div.signup-form > h2').should('be.visible').and('have.text', 'New User Signup!');
            cy.get('[data-qa="signup-name"]').type(userDTO.username)
            cy.get('[data-qa="signup-email"]').type(userDTO.email);
            cy.get('[data-qa="signup-button"]').click();

            cy.url().should('eq', `${Cypress.config().baseUrl}/signup`);
            cy.get('.login-form > h2').should('be.visible').and('contain', 'Enter Account Information');
            cy.get('[data-qa="name"]').should('be.visible').and('have.value', userDTO.username);
            cy.get('[data-qa="email"]').should('be.visible').and('have.value', userDTO.email);
            cy.get('[data-qa="password"]').type(userDTO.password);
            cy.get('[data-qa="first_name"]').type(userDTO.firstName);
            cy.get('[data-qa="last_name"]').type(userDTO.lastName);
            cy.get('[data-qa="address"]').type(userDTO.streetAddress);
            cy.get('[data-qa="state"]').type(userDTO.state);
            cy.get('[data-qa="city"]').type(userDTO.city);
            cy.get('[data-qa="zipcode"]').type(userDTO.zipCode)
            cy.get('[data-qa="mobile_number"]').type(userDTO.phoneNumber);
            cy.get('[data-qa="create-account"]').click();

            cy.url().should('eq', `${Cypress.config().baseUrl}/account_created`);
            cy.get('[data-qa="account-created"]').should('be.visible').and('have.text', 'Account Created!');
            cy.get('[data-qa="continue-button"]').click();
            cy.get('.fa-user').parent('a').should('be.visible').and('contain', `Logged in as ${userDTO.username}`);
        
            cy.get('[href="/delete_account"]').click();
            cy.url().should('eq', `${Cypress.config().baseUrl}/delete_account`)
            cy.get('[data-qa="account-deleted"]').should('be.visible').and('have.text', 'Account Deleted!');
        });
    })
})