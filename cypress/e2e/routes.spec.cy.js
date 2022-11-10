it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  cy.get("h1");
});

it(" doesnt display product route for unpaid customer", () => {
  cy.visit("/paid/product/prod_MgsGOzGRz8ylF6/");
  cy.get("span", { name: /nice subscription/i }).should("not.exist");
});

export {};
