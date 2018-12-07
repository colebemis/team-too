context("EditProduct", () => {
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
    cy.visit("http://localhost:8080/admin/inventory");
    cy.wait(20000);
  });

  // it("displays the proper item if an item in inventory is clicked for edit", () => {
  //   cy.get("#tbody > tr").eq(0).find(".link").then( ($router) => {
        
  //     // Store id to compare.
  //     const id = $router.text().trim();
      
  //     // Click on link.
  //     cy.get("#tbody > tr").eq(0).find(".link").click();
  //     cy.url().should("contain", id);
  //   });
  // });

  // it("displays the proper item page if 'Add Item' is clicked'", () => {
  //   cy.get("[data-test-id=addItem]").click();
  //   cy.url().should("contain", "/admin/product/new");
  //   cy.get("#quantity").should("have.value", "0");
  //   cy.get("#title").should("have.value", "");
  //   cy.get("#price").should("have.value", "0");
  //   cy.get("#description").should("have.value", "");
  //   cy.get("#image").should("have.value", "");
  // });

  it("can create products", () => {
    cy.get("[data-test-id=addItem]").click();
    // Tests that the proper item page is displayed when 'Add Item' is clicked.
    cy.url().should("contain", "/admin/product/new");
    cy.get("#quantity").should("have.value", "0");
    cy.get("#title").should("have.value", "");
    cy.get("#price").should("have.value", "0");
    cy.get("#description").should("have.value", "");
    cy.get("#image").should("have.value", "");    
    
    // Tests Cancel button and that it doesn't require validation.
    cy.get("[data-test-id=cancel]").click();
    cy.url().should("contain", "/admin/inventory");

    cy.get("[data-test-id=addItem]").click();
    // Tests quantity buttons.
    cy.get("#quantity").then(($val) => {
        const currentValue = $val.val();
        cy.get("[data-test-id=increaseQuantity]").click();
        cy.get("#quantity").should("have.value", String(Number(currentValue) + 1));
        cy.get("[data-test-id=decreaseQuantity]").click();
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
    cy.get("[data-test-id=submit]").click();
    cy.url().should("contain", "/admin/inventory");
    cy.get("[id='Test Bike']").should("exist");

    // Delete product.
    cy.get("[id='Test Bike'] .link").click();
    cy.get("[data-test-id=delete]").click();
    cy.url().should("contain", "/admin/inventory");
    cy.get("[id='Test Bike']").should("not.exist");
  });

  it("can edit already existing products", () => {
    // Validates that correct item page is shown.
    cy.get("#tbody > tr").eq(0).find(".link").then(($router) => {
      // Store id to compare.
      const id = $router.text().trim();
      
      // Click on link.
      cy.get("#tbody > tr").eq(0).find(".link").click();
      cy.url().should("contain", id);           
    });
    // Add *cancel* test here before going back and testing edit.
    // Edits the product.
    cy.get("#quantity")
      .click("right")  
      .click("right")    
      .type("{backspace}25")
      .should("have.value", "25");
    cy.get("#title")
      .click("right")
      .type("{backspace}Edited Bike")
      .should("have.value", "Edited Bike");
    cy.get("#price")
      .click("right")
      .type("{backspace}21.00")
      .should("have.value", "21.00");
    cy.get("#description")
      .click("right")
      .type("{backspace}Edited bike. WIP.")
      .should("have.value", "Edited bike. WIP.");
    cy.get("#image")
      .click("right")
      .type("{backspace}https://target.scene7.com/is/image/Target/GUEST_19efff55-cec4-475a-984c-462607e93e1f?wid=488&hei=488&fmt=pjpeg")
      .should("have.value", "https://target.scene7.com/is/image/Target/GUEST_19efff55-cec4-475a-984c-462607e93e1f?wid=488&hei=488&fmt=pjpeg");
    // Test return to inventory and view changes
  });
});