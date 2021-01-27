/// <reference types="cypress" />

context(
  "Given the consultatnt Stina Johansson and a day with no registered time",
  () => {
    before(() => {
      cy.fixture("empty-storage").then(testData => {
        cy.writeFile("src/infrastructure/_storage/e2e-storage.json", testData);
      });
      cy.visit("/");
      cy.get("[cy=select-consultant]").select("Stina Johansson");
    });

    describe("When registering 200 min spent on Programming @ New app", () => {
      before(() => {
        cy.get("[cy=input-date]").type("2021-01-25");
        cy.get("[cy=input-project]").type("New app");
        cy.get("[cy=input-activity]").type("Programming");
        cy.get("[cy=input-duration]").type("200 min");
        cy.contains("button", "Add").click();
      });

      it("Then the list of registrations shall contain the new registration", () => {
        cy.get("[cy=registration]").should("have.length", 1);
        cy.get("[cy=consultant-name]")
          .first()
          .should("have.text", "Stina Johansson");
        cy.get("[cy=project-name]").first().should("have.text", "New app");
        cy.get("[cy=activity-name]").first().should("have.text", "Programming");
      });

      xit("Then total registered time for the day shall be 200 min", () => {
        cy.get("[cy=totalt-time]").should("have.text", "200 min");
      });
    });
  }
);
