/// <reference types="cypress" />

context(
  "Given consultant Stina with two projects: 'New app' and 'DDD presentation'",
  () => {
    describe("When visiting time report form and selecting Stina", () => {
      before(() => {
        cy.visit("/");
        cy.get("[cy=select-consultant]").select("Stina Johansson");
      });

      it("Then should list projects 'New app' and 'DDD presentation'", () => {
        cy.get("select[cy=select-project] option:enabled")
          .should("have.length", 2)
          .should("contain.text", "New app")
          .should("contain.text", "DDD presentation");
      });
    });
  }
);
