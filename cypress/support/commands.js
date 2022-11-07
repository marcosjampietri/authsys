import "@testing-library/cypress/add-commands";

// Cypress.Commands.add("resetDbAndIsrCache", () => {
//   cy.task("db:reset");
//   const secret = Cypress.env("REVALIDATION_SECRET");
//   cy.request("GET", `/api/revalidate?secret=${secret}`);
// });
//
Cypress.Commands.add("login", (email, password) => {
  // note: for many auth systems, this would POST to an API rather than
  // go through UI sign in flow.
  cy.visit("/login/");

  // fill out the sign in form using arguments
  cy.get('input[type="email"]').clear().type(email);

  cy.get('input[type="password"]').clear().type(password);

  cy.get("form").contains("LOGIN").click();

  // check for welcome message
  // cy.get("h1").contains("PROTECTED").should("exist");
});
