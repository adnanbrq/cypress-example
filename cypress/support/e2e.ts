Cypress.Commands.add("login", () => {
  cy.session(
    "session",
    () => {
      const page = cy.visit("http://localhost:3000/auth");

      page.getCookie("session").should("not.exist");
      page.location("pathname").should("eq", "/auth");
      page.get("input[name='email']").type("demo@user.test");
      page.get("input[name='password']").type("demo1234");

      page.get("button[type='submit']").click();
      page.location("pathname").should("eq", "/");
      page.getCookie("session").should("exist");
    },
    {
      validate() {
        cy.getCookie("session").should("exist");
      },
    }
  );
});
