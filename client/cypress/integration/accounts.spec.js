context("Accounts", () => {
  beforeEach(() => {
    // Must be logged in
    cy.visit("http://localhost:8080/login");
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
    cy.visit("http://localhost:8080/admin/accounts");
  });

  it("can create and delete accounts", () => {
    // Create account
    cy.get("#name").type("Test User");
    cy.get("#email").type("fake@email.com");
    cy.get("#password").type("1234");
    cy.get("#is-admin").check();
    cy.get("[data-test-id=create-account]").click();
    cy.get("[id='fake@email.com']").should("exist");

    // Delete account
    cy.get("[id='fake@email.com'] [data-test-id=delete]").click();
    cy.get("[id='fake@email.com']").should("not.exist");
  });
});
