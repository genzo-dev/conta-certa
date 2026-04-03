describe("Logout E2E", () => {
  before(() => {
    cy.seedUser();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should login and logout successfully", () => {
    cy.login("e2e@test.com", "123456");

    cy.url({ timeout: 5000 }).should("eq", "http://localhost:3000/");
    cy.get('button[name="menuButton"]').click();
    cy.get('button[type="submit"][name="logout"]', { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });

    cy.location("pathname", { timeout: 10000 }).should("not.include", "/login");
  });
});
