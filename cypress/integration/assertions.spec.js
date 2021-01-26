/// <reference types="cypress" />

context("Assertions", () => {
  describe("Given a day with date 2021-01-25 for consultant Bruce Wayne in storage", () => {
    // TODO: fixture
    before(() => {
      cy.fixture("one-day-one-registration").then(testData => {
        cy.writeFile("src/infrastructure/_storage/e2e-storage.json", testData);
      });
    });

    describe("When visiting overview", () => {
      before(() => cy.visit("/"));

      it(".should() - make an assertion about the current subject", () => {
        cy.get("#all-days > .day")
          .first()
          .contains('[cy="consultant-name"]', "Bruce Wayne");
      });
    });
  });
});
