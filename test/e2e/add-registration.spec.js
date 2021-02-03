/// <reference types="cypress" />

context(
  "Given the consultant Stina and no registered time for 2021-01-25",
  () => {
    before(() => {
      // Will get the fixture from `test/e2e/fixtures/empty-storage.json` and overwrite storage with it
      cy.task("db:empty");
      cy.visit("/");
      cy.getByCy("select-consultant").select("Stina Johansson");
    });

    describe("When registering 200 min spent on Programming @ New app for 2021-01-25", () => {
      before(() => {
        cy.getByCy("input-date").type("2021-01-25");
        cy.getByCy("select-project").select("New app");
        cy.getByCy("input-activity").type("Programming");
        cy.getByCy("input-duration").type("200 min");
        cy.contains("button", "Add registration").click();
      });

      it("Then the list of registrations shall contain the new registration", () => {
        cy.getByCy("registration").should("have.length", 1);
        cy.getByCy("consultant-name")
          .first()
          .should("have.text", "Stina Johansson");
        cy.getByCy("project-name").first().should("have.text", "New app");
        cy.getByCy("activity-name").first().should("have.text", "Programming");
      });
    });
  }
);
