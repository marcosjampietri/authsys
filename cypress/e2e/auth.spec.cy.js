it("runs auth flow for successful login to protected reservations page", () => {
  //     // visit reservations page for the first show (id = 0)
  // cy.task("db:reset").visit("/reservations/0");
  cy.visit("/protected/");

  //     // check for sign in form
  // cy.findByRole("heading", { name: /Sign in to your account/i }).should(
  //   "exist"
  // );
  cy.get("div").contains("I DONT HAVE AN ACCOUNT").should("exist");

  //     // check that there's no option to purchase tickets
  //     cy.findByRole("button", { name: /purchase/i }).should("not.exist");

  //     // enter valid sign-in credentials
  cy.get('input[type="email"]').clear().type(Cypress.env("TEST_USER_EMAIL"));

  //     cy.findByLabelText(/password/i)
  //       .clear()
  //       .type(Cypress.env("TEST_PASSWORD"));

  cy.get('input[type="password"]').clear().type(Cypress.env("TEST_PASSWORD"));

  //     // submit the form
  //     cy.findByRole("main").within(() => {
  //       cy.findByRole("button", { name: /sign in/i }).click();

  cy.get("form").contains("LOGIN").click();

  cy.get("h1", { timeout: 7000 }).contains("PROTECTED").should("exist");
});

//     // check for purchase button and band name
//     cy.findByRole("button", { name: /purchase/i }).should("exist");
//     cy.findByRole("heading", { name: /the wandering bunnies/i });

//     // check for email and sign-out button on navbar
//     cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
//       "exist"
//     );
//     cy.findByRole("button", { name: /sign out/i }).should("exist");

//     // check that sign in button does not exist
//     cy.findByRole("button", { name: /sign in/i }).should("not.exist");
//   });

//   it("runs auth flow for protected user page, including failed sign in", () => {
//     // visit user page
//     cy.task("db:reset").visit("/user");

//     // check for sign in form
//     cy.findByRole("heading", { name: /Sign in to your account/i }).should(
//       "exist"
//     );

//     // check there's no welcome message
//     cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

//     // fill out the sign in form with environment variable values, but bad password
//     cy.findByLabelText(/email address/i)
//       .clear()
//       .type(Cypress.env("TEST_USER_EMAIL"));

//     cy.findByLabelText(/password/i)
//       .clear()
//       .type("not my password");

//     // submit form (be sure to choose "sign in" button in form, not on nav!)
//     cy.findByRole("main").within(() =>
//       cy.findByRole("button", { name: /sign in/i }).click()
//     );

//     // check for failure message
//     cy.findByText(/sign in failed/i).should("exist");

//     // fill out the sign in form again, with correct info
//     cy.findByLabelText(/email address/i)
//       .clear()
//       .type(Cypress.env("TEST_USER_EMAIL"));

//     cy.findByLabelText(/password/i)
//       .clear()
//       .type(Cypress.env("TEST_PASSWORD"));

//     // submit form (be sure to choose "sign in" button in form, not on nav!)
//     cy.findByRole("main").within(() =>
//       cy.findByRole("button", { name: /sign in/i }).click()
//     );

//     // check that the user page now shows
//     cy.findByRole("heading", { name: /welcome/i }).should("exist");
//     cy.findByRole("heading", { name: /your tickets/i }).should("exist");

//     // check for user and sign out buttons on nav bar
//     cy.findByRole("button", { name: Cypress.env("TEST_USER_EMAIL") }).should(
//       "exist"
//     );
//     cy.findByRole("button", { name: /sign out/i }).should("exist");
//     cy.findByRole("button", { name: /sign in/i }).should("not.exist");
//   });

it("redirects to sign-in for protected pages", () => {
  cy.fixture("protected-pages.json").then((urls) => {
    urls.forEach(($url) => {
      cy.visit($url, { timeout: 7000 });
      cy.get('input[type="email"]').should("exist");
      cy.get('input[type="password"]').should("exist");
    });
  });
});
