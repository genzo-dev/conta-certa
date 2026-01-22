describe("Register E2E", () => {
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const email = `registere2e${Date.now()}@test.com`;
  it("should register with valid credentials", () => {
    cy.register("e2eTestUSER", email, "123456", "123456");

    cy.get('button[type="submit"]').click();

    cy.url().should("not.include", "/login");
  });

  it("should not register with registered email", () => {
    cy.register("e2eTestUSER", email, "123456", "123456");

    cy.contains("E-mail já cadastrado.").should("be.visible");
    cy.url().should("not.include", "/login");
  });

  it("should not register with invalid email", () => {
    const invalidEmail = `invalidRegistere2e${Date.now()}test.com`;

    cy.register("invalide2eTestUSER", invalidEmail, "123456", "123456");

    cy.contains("Informe um e-mail válido").should("be.visible");
    cy.url().should("not.include", "/login");
  });

  it("should not register with invalid password", () => {
    cy.register("invalide2eTestUSER", email, "123456", "654321");

    cy.contains("As senhas não coincidem").should("be.visible");
    cy.url().should("not.include", "/login");
  });
});
