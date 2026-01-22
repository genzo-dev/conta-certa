declare namespace Cypress {
  interface Chainable {
    seedUser(): Chainable<void>;
    login(email: string, password: string): Chainable<void>;
    logout(): Chainable<void>;
    register(
      userName: string,
      email: string,
      password: string,
      password2: string
    ): Chainable<void>;
  }
}
