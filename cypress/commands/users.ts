import { UserModel } from "../support/DTOs/UserModel";
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Create a new User into the system 
             */
            createUserApi(user: UserModel): typeof createUserApi;

            /**
             * Remove the user from the system
             */
            removeUserApi(email: string, password: string): typeof removeUserApi

            /**
             * Login a user into the system
             */
            login(email: string, password: string): typeof login

            /**
             * Register a user on the UI
             */
            registerUserUI(email: string, password: string): typeof registerUserUI
        }
    }
}

export const login = (email: string, password: string) => {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();
}

export const registerUserUI = (email: string, password: string) => {
    cy.get('[data-qa="signup-name"]').type(email)
    cy.get('[data-qa="signup-email"]').type(password);
    cy.get('[data-qa="signup-button"]').click();
}

export const removeUserApi = (email: string, password: string) => {
    cy.request({
        method: 'DELETE',
        url: '/api/deleteAccount',
        form: true,
        body: {
            email,
            password
        }
    }).then(response => {
        const responseBody = JSON.parse(response.body);
        expect(response.status).to.eq(200);
        expect(responseBody).to.have.property('responseCode', 200);
        expect(responseBody).to.have.property('message', 'Account deleted!')
    })
}

export const createUserApi = (user: UserModel) => {
    cy.request({
        method: 'POST',
        url: '/api/createAccount',
        form: true,
        body: user
    }).then((response) => {
        const responseBody = JSON.parse(response.body)
        expect(response.status).to.eq(200);
        expect(responseBody).to.have.property('responseCode', 201);
        expect(responseBody).to.have.property('message', 'User created!');
    });
}