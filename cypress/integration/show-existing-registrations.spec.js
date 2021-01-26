/// <reference types="cypress" />

context("Given a registration for consultant in storage", () => {
  before(() => {
    cy.fixture("one-registration").then(testData => {
      cy.writeFile("src/infrastructure/_storage/e2e-storage.json", testData);
    });
  });

  describe("When visiting site", () => {
    before(() => cy.visit("/"));

    it("Should show one day", () => {
      cy.get("[cy=day]").should("have.length", 1);
    });

    it("Should show one registration", () => {
      cy.get("[cy=registration]").should("have.length", 1);
    });

    it("Should show consultants name for the registration", () => {
      cy.get("[cy=consultant-name]").first().should("have.text", "Bruce Wayne");
    });

    it("Should show project name for the registration", () => {
      cy.get("[cy=project-name]").first().should("have.text", "New app");
    });

    it("Should show activity name for the registration", () => {
      cy.get("[cy=activity-name]").first().should("have.text", "Programming");
    });

    it("Should show activity name for the registration", () => {
      cy.get("[cy=duration]").first().should("have.text", "200 minutes");
    });
  });
});
