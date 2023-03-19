import { UserModel } from "../support/DTOs/UserModel";

describe('Resgister User', () => {

    it('Should register a new user', () => {
        cy.visit('/');

        cy.get('a[href="/login"]').click();
        cy.get('div.signup-form > h2').should('be.visible').and('have.text', 'New User Signup!');

        cy.task('generateUser').then(function (userModel: UserModel) {
            cy.registerUserUI(userModel.name, userModel.email);

            cy.url().should('eq', `${Cypress.config().baseUrl}/signup`);
            cy.get('.login-form > h2').should('be.visible').and('contain', 'Enter Account Information');
            cy.get('[data-qa="name"]').should('be.visible').and('have.value', userModel.name);
            cy.get('[data-qa="email"]').should('be.visible').and('have.value', userModel.email);
            cy.get('[data-qa="password"]').type(userModel.password);
            cy.get('[data-qa="first_name"]').type(userModel.firstname);
            cy.get('[data-qa="last_name"]').type(userModel.lastname);
            cy.get('[data-qa="address"]').type(userModel.address1);
            cy.get('[data-qa="state"]').type(userModel.state);
            cy.get('[data-qa="city"]').type(userModel.city);
            cy.get('[data-qa="zipcode"]').type(userModel.zipcode)
            cy.get('[data-qa="mobile_number"]').type(userModel.mobile_number);
            cy.get('[data-qa="create-account"]').click();

            cy.url().should('eq', `${Cypress.config().baseUrl}/account_created`);
            cy.get('[data-qa="account-created"]').should('be.visible').and('have.text', 'Account Created!');
            cy.get('[data-qa="continue-button"]').click();
            cy.get('.fa-user').parent('a').should('be.visible').and('contain', `Logged in as ${userModel.name}`);

            cy.get('[href="/delete_account"]').click();
            cy.url().should('eq', `${Cypress.config().baseUrl}/delete_account`)
            cy.get('[data-qa="account-deleted"]').should('be.visible').and('have.text', 'Account Deleted!');
        });
    });

    it('Should register a user with an existing email', () => {
        cy.visit('/login');

        cy.task('generateUser').then(function (user: UserModel) {
            cy.createUserApi(user);

            cy.registerUserUI(user.name, user.email);
            cy.get('form[action="/signup"] > p').should('be.visible').and('have.text', 'Email Address already exist!');

            cy.removeUserApi(user.email, user.password);
        });
    })
})