describe("Login E2E", () => {
  before(() => {
    cy.seedUser();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("logs in successfully with valid credentials", () => {
    cy.login("e2e@test.com", "123456");

    cy.url().should("not.include", "/login");
  });

  it("shows error with invalid credentials", () => {
    cy.login("invalid@email.com", "123456");
    cy.contains("E-mail ou senha inválidos.").should("be.visible");
  });

  it("keeps session after page reload", () => {
    cy.login("e2e@test.com", "123456");
    cy.wait(200); // aguarda aplicação do Set-Cookie após login (Next + httpOnly)
    cy.reload();
    cy.url().should("not.include", "/login");
  });
});
