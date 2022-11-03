it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  cy.get("h1");
});

// it("displays correct product name for product route that existed at build time", () => {
//   cy.visit("/product/62bb869ca431a74567c257ef");
//   cy.findByRole("heading", { name: /kuchiware 1/i }).should("exist");
// });

export {};
