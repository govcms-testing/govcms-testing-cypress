describe("Site Administrator", function() {
  it("Logs in via ui", function() {
    cy.visit("https://govcms-testing.govcms.gov.au/user");
    cy.get("#edit-name").type(Cypress.env("users")["site.admin"]["username"]);
    cy.get("#edit-pass").type(Cypress.env("users")["site.admin"]["password"]);
    cy.get("#edit-submit").click();

    cy.visit("https://govcms-testing.govcms.gov.au/admin/content");

    cy.visit("https://govcms-testing.govcms.gov.au/admin/modules", {
      failOnStatusCode: false
    });
    cy.visit("https://govcms-testing.govcms.gov.au/admin/people");

    cy.visit("https://govcms-testing.govcms.gov.au/admin/reports");
  });
});
