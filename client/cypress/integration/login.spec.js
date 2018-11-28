context("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/login");
  });

  it("displays an error when given an invalid email", () => {
    cy.get("#email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get("#password")
      .type("1234")
      .should("have.value", "1234");
    cy.get("[data-test-id=login-button]").click();
    cy.get("[data-test-id=error]").should("be.visible");
  });

  it("displays an error when given an invalid password", () => {
    cy.get("#email")
      .type("bill@example.com")
      .should("have.value", "bill@example.com");
    cy.get("#password")
      .type("1234")
      .should("have.value", "1234");
    cy.get("[data-test-id=login-button]").click();
    cy.get("[data-test-id=error]").should("be.visible");
  });

  it("stores token and user in localStorage", () => {
    cy.get("#email")
      .type("bill@example.com")
      .should("have.value", "bill@example.com");
    cy.get("#password")
      .type("password")
      .should("have.value", "password");
    cy.get("[data-test-id=login-button]")
      .click()
      .should(() => {
        expect(localStorage.getItem("user")).to.exist;
        expect(localStorage.getItem("apollo-token")).to.exist;
      });
  });

  it("redirects to homepage after successful login", () => {
    cy.get("#email")
      .type("bill@example.com")
      .should("have.value", "bill@example.com");
    cy.get("#password")
      .type("password")
      .should("have.value", "password");
    cy.get("[data-test-id=login-button]").click();
    cy.wait(2000); // There must be a less brittle way to do this
    cy.location("pathname").should("eq", "/");
  });
});
