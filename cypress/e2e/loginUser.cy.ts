import { UserModel } from "../support/DTOs/UserModel";

describe("Login User test suite", () => {

    beforeEach(function () {
        cy.visit('/login');
    })

    it("Should login User with correct email and password", () => {
        cy.get('a[href="/login"]').click();

        cy.task('generateUser').then(function (user: UserModel) {
            cy.createUserApi(user);

            cy.login(user.email, user.password);
            cy.get('.fa-user').parent('a').should('be.visible').and('contain', `Logged in as ${user.name}`);

            cy.removeUserApi(user.email, user.password);
        });
    });

    it("Should login User with incorrect email and password", () => {
        cy.fixture('loginData').then(loginData => {
            cy.login(loginData.invalidCredentials.email, loginData.invalidCredentials.password);
            cy.get('.login-form p').should('be.visible').and('have.text', 'Your email or password is incorrect!');
        });
    });
});