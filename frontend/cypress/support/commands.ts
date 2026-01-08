/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("seedUser", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/test/seed-user`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");

  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);

  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("logout", () => {
  cy.get('button[type="submit"][name="logout"]').click();
});

Cypress.Commands.add(
  "register",
  (userName: string, email: string, password: string, password2: string) => {
    cy.visit("/register");

    cy.get('input[name="userName"]').type(userName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="password2"]').type(password2);

    cy.get('button[type="submit"]').click();
  }
);
