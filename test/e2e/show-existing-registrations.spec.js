/// <reference types="cypress" />

context(
  "Given a consultant Bruce has registered 200 min Programming @ New app",
  () => {
    before(() => {
      // Will get the fixture from `test/e2e/fixtures/one-registration.json` and overwrite storage with it
      cy.task("db:apply-fixture", "one-registration");
    });

    describe("When visiting site", () => {
      before(() => cy.visit("/"));

      it("Then should show one day", () => {
        cy.getByCy("day").should("have.length", 1);
      });

      it("Then should show one registration", () => {
        cy.getByCy("registration").should("have.length", 1);
      });

      it("Then should show consultants name for the registration", () => {
        cy.getByCy("consultant-name")
          .first()
          .should("have.text", "Bruce Wayne");
      });

      it("Then should show project name for the registration", () => {
        cy.getByCy("project-name").first().should("have.text", "New app");
      });

      it("Then should show activity name for the registration", () => {
        cy.getByCy("activity-name").first().should("have.text", "Programming");
      });

      it("Then should show duration for the registration", () => {
        cy.getByCy("duration").first().should("have.text", "200 minutes");
      });

      it("Then total registered time for the day should be 200 min", () => {
        cy.getByCy("total-duration").should("have.text", "200 minutes");
      });
    });
  }
);
