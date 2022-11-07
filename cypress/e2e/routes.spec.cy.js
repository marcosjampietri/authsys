it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  cy.get("h1");
});

it("displays correct product name for product route that existed at build time", () => {
  cy.visit("/paid/product/prod_MgsGOzGRz8ylF6/");
  cy.get("span", { name: /nice subscription/i }).should("exist");
});

export {};
