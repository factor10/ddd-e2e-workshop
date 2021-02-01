/// <reference types="cypress" />

context("Given three consultants (Stina, Per and Bruce) in system", () => {
  describe("When visiting time report form", () => {
    before(() => cy.visit("/"));

    it("Then should list consultants Stina, Per and Bruce", () => {
      cy.get("select[cy=select-consultant] option:enabled")
        .should("have.length", 3)
        .should("contain.text", "Stina Johansson")
        .should("contain.text", "Per Persson")
        .should("contain.text", "Bruce Wayne");
    });
  });
});
