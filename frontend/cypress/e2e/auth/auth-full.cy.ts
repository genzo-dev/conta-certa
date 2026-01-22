describe("Auth e2e Full Flow", () => {
  after(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should register, login and logout successfully", () => {
    const email = `registere2e${Date.now()}@test.com`;

    // Register
    cy.visit("/register");
    cy.register("e2eTestUSER", email, "123456", "123456");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/login");

    // Logout
    cy.get('button[type="submit"][name="logout"]').click();
    cy.url().should("include", "/login");

    // Login
    cy.visit("/login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type("123456");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/login");
  });
});
