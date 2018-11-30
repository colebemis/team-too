context("Login", () => {
  beforeEach(() => {
    localStorage.setItem("user", "{\"name\": \"Test\", \"isAdmin\": true}");
    localStorage.setItem("apollo-token", "test-token");
    cy.visit("http://localhost:8080/");
  });


  it("redirects to login page after clicking log out", () => {
    cy.get("[data-test-id=admin-header]").should("be.visible");
    cy.get("[data-test-id=log-out]").click();
    cy.wait(2000); // There must be a less brittle way to do this
    cy.location("pathname").should("eq", "/login");
    cy.get("[data-test-id=admin-header]").should("not.exist");
  });
})
