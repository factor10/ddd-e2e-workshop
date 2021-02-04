/// <reference types="cypress" />

context(
  "Given that consultant Stina has registered 60 min Programming on New app for 2021-02-02",
  () => {
    before(() => {
      // Will get the fixture from `test/e2e/fixtures/empty-storage.json` and overwrite storage with it
      cy.task("db:apply-fixture", "lab2");
      cy.visit("/");
      cy.getByCy("select-consultant").select("Stina Johansson");
    });

    describe("Stina registers 30 min Meeting on New app for 2021-02-02", () => {
      before(() => {
        cy.getByCy("input-date").type("2021-02-02");
        cy.getByCy("select-project").select("New app");
        cy.getByCy("input-activity").type("Meeting");
        cy.getByCy("input-duration").type("30 min");
        cy.contains("button", "Add registration").click();
      });

      it("Then Stina has a total of registered time of 90 min for 2021-02-02", () => {
        cy.getByCy("total-duration").should("have.text", "90 minutes");
      });
    });
  }
);
