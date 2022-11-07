import "cypress-plugin-stripe-elements";

it("completes the product purchase flow, starting not signed in", () => {
  // load shows page
  cy.visit("/", { timeout: 6000 });
  cy.get("a").contains("Protected").click();

  // click second tickets button

  // get sign in page, and sign in
  cy.login(Cypress.env("TEST_USER_EMAIL"), Cypress.env("TEST_PASSWORD"));

  cy.get("a").contains(" Paid Content").click();

  cy.get("h2", { timeout: 6000 }).contains("nice subscription").click();
  cy.get("h2", { timeout: 6000 })
    .contains(/nice subscription/i)
    .should("exist");

  cy.get('input[id="name"]').clear().type("Test");

  // cy.get("#card-element").within(() => {
  cy.fillElementsInput("cardNumber", "4242424242424242");
  cy.fillElementsInput("cardExpiry", "1025"); // MMYY
  cy.fillElementsInput("cardCvc", "123");
  // });

  // purchase
  // cy.findByRole("spinbutton").clear().type("5");
  // cy.findByRole("button", { name: /purchase/i }).click();

  cy.get('button[type="submit"]').click();

  // // check for confirmation
  cy.get("h1", { timeout: 12000 })
    .contains(/Payment Successful/i)
    .should("exist");

  // // check that new reservation appears on user page
  // cy.findByRole("button", { name: /see all purchases/i }).click();
  // cy.findByText(/the joyous nun riot/i).should("exist");

  // // check that the number of tickets on reservation page has reduced to 95
  // cy.findByRole("button", { name: /shows/i }).click();

  // // click second (and last) tickets button
  // cy.findAllByRole("button", { name: /tickets/i })
  //   .last()
  //   .click();

  // cy.reload();
  // cy.findByText(/95 seats left/i).should("exist");

  // // sign out
  // cy.findByRole("button", { name: /sign out/i }).click();
  // cy.findByText(Cypress.env("TEST_USER_EMAIL")).should("not.exist");
});
