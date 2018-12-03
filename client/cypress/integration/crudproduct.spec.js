context("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/admin/inventory");
    cy.wait(20000);
  });

  it("displays the proper item if an item in inventory is clicked for edit", () => {
    cy.get("#tbody > tr").eq(0).find(".link").then( ($router) => {
        
      // Store id to compare.
      const id = $router.text().trim();
      
      // Click on link.
      cy.get("#tbody > tr").eq(0).find(".link").click();
      cy.url().should("contain", id);
    });
  });

  it("displays the proper item page if 'Add Item' is clicked'", () => {
    cy.get("[data-test-id=addItem]").click();
    cy.url().should("contain", "/admin/product/new");
    cy.get("#quantity").should("have.value", "0");
    cy.get("#title").should("have.value", "");
    cy.get("#price").should("have.value", "0");
    cy.get("#description").should("have.value", "");
    cy.get("#image").should("have.value", "");
  });

  it("can create products", () => {
    cy.get("[data-test-id=addItem]").click();

    //Tests quantity buttons.
    cy.get("#quantity").then(($val) => {
        const currentValue = $val.val();
        cy.get("#quantity + [data-test-id=buttonDiv] > [data-test-id=increaseQuantity]").click();
        cy.get("#quantity").should("have.value", String(Number(currentValue) + 1));
        cy.get("#quantity + [data-test-id=buttonDiv] > [data-test-id=decreaseQuantity]").click();
        cy.get("#quantity").should("have.value", String(Number(currentValue)));
    });
    
    // Type in fields for the product.
    cy.get("#quantity")
      .type("{backspace}25")
      .should("have.value", "25");
    cy.get("#title")
      .type("Test Bike")
      .should("have.value", "Test Bike");
    cy.get("#price")
      .type("{backspace}20.20")
      .should("have.value", "20.20");
    cy.get("#description")
      .type("Testing bike. WIP.")
      .should("have.value", "Testing bike. WIP.");
    
    // Test input validation.
    cy.get("[data-test-id=submit]").click();
    cy.url().should("not.contain", "/admin/inventory");

    cy.get("#image")
      .type("image")
      .should("have.value", "image");
    
    // Test return to inventory and add new product.
    


  });

});