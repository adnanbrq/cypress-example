Cypress.Commands.add("login", () => {
  return cy.session(
    "session",
    () => {
      cy.visit("/auth");
      cy.location("pathname").should("eq", "/auth");

      cy.get('[data-cy="input-email"]').type("demo@user.test");
      cy.get('[data-cy="input-password"]').type("demo1234");

      cy.get('[data-cy="auth-submit"]').click();
      cy.location("pathname").should("eq", "/");
      cy.getCookie("id").should("exist");
    },
    {
      validate() {
        cy.getCookie("id").should("exist");
      },
    }
  );
});
