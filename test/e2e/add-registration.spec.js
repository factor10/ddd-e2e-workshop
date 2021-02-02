/// <reference types="cypress" />

context("Given the consultant Stina and a day with no registered time", () => {
  before(() => {
    // Will get the fixture from `test/e2e/fixtures/empty-storage.json` and overwrite storage with it
    cy.overwriteStorageWithFixture("empty-storage");
    cy.visit("/");
    cy.get("[cy=select-consultant]").select("Stina Johansson");
  });

  describe("When registering 200 min spent on Programming @ New app", () => {
    before(() => {
      cy.get("[cy=input-date]").type("2021-01-25");
      cy.get("[cy=select-project]").select("New app");
      cy.get("[cy=input-activity]").type("Programming");
      cy.get("[cy=input-duration]").type("200 min");
      cy.contains("button", "Add registration").click();
    });

    it("Then the list of registrations shall contain the new registration", () => {
      cy.get("[cy=registration]").should("have.length", 1);
      cy.get("[cy=consultant-name]")
        .first()
        .should("have.text", "Stina Johansson");
      cy.get("[cy=project-name]").first().should("have.text", "New app");
      cy.get("[cy=activity-name]").first().should("have.text", "Programming");
    });
  });
});
