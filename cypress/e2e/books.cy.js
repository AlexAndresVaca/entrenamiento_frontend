describe("empty spec", () => {
  it("can list, show, create, edit and delete", () => {
    // PRUEBAS
    // GO HOME AND
    // LIST BOOKS
    cy.visit("/").get("[data-cy=link-to-books]").click();
    // CREATE BOOKS
    cy.get('[href="/books/create"]').click();
    cy.get("[data-cy=input-title-book]").type("New Book From Cypress");
    cy.get("[data-cy=btn-submit-book]").click();
    cy.get("[data-cy=book-list]").contains("New Book From Cypress");
    // SHOW BOOK
    cy.get("[data-cy^=link-to-visit-a-book-]")
      .last()
      .click()
      .get("h1")
      .should("contains.text", "New Book From Cypress")
      .get('[href="/books"]')
      .click();
    // EDIT BOOK
    cy.get("[data-cy^=link-to-edit-a-book-]")
      .last()
      .click()
      .get("[data-cy=input-title-book]")
      .clear()
      .type("Edited Book From Cypress")
      .get("[data-cy=btn-submit-book]")
      .click()
      .get("[data-cy=book-list]")
      .contains("Edited Book From Cypress");
    // DELETE BOOK
    cy.get("[data-cy^=btn-to-delete-a-book-]")
      .last()
      .click()
      .should("not.contains.text", "Edited Book From Cypress");
  });
});
