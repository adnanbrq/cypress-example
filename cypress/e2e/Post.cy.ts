describe("Post functionality", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  context("create a post", () => {
    it("should be able to create a post", () => {
      // Visit the new-post page by clicking the a-Element
      cy.get("a[data-test='new-post']").click();
      cy.location("pathname").should("eq", "/new-post");

      // Type in demo data and submit form
      cy.get("input[name='title']").type("Post by Cypress");
      cy.get("textarea[name='content']").type("This is a demo content");
      cy.get("button[type='submit']").click();

      // Assure we're on the details page of the created post
      cy.get("h1").should("have.text", "Post by Cypress");
      cy.get("p[data-test='content']").should(
        "have.text",
        "This is a demo content"
      );

      // Asure we can go back
      cy.get("a[data-test='back-to-posts']").should("exist");
      cy.get("a[data-test='back-to-posts']").click();
      cy.location("pathname").should("eq", "/");
    });
  });

  context("visit a post", () => {
    it("should allow to visit a post", () => {
      const anchor = cy.get("[data-cy=posts] > li:nth-child(2) > a");
      anchor.then((el) => {
        const href = el.attr("href");
        anchor.click();
        cy.location("pathname").should("eq", href);
      });
    });
  });
});
