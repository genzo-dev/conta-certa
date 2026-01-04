describe("Logout E2E", () => {
  before(() => {
    cy.seedUser();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should login with seeded user", () => {
    cy.login("e2e@test.com", "123456");

    cy.get('button[type="submit"][name="logout"]').click();

    cy.url().should("include", "/login");
  });
});
