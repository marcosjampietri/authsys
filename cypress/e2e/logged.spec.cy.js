it("does not show sign-in page when already signed in", () => {
  //   // cy.task("db:reset").signIn(
  cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_PASSWORD"));
  //   // access tickets page for first show
  cy.get("a").contains(" Paid Content").click();
  //   cy.visit("/paid/");
  //   // make sure there's no sign-in page
  cy.get("div").contains("I DONT HAVE AN ACCOUNT").should("not.exist");
  //   // make sure ticket purchase button shows
  cy.get("h2", { timeout: 60000 })
    .contains("nice subscription")
    .should("exist");
});
