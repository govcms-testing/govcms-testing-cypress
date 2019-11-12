describe("Site search", function() {
  it("Check search block visibility", function() {
    cy.visit();

    cy.get("form#views-exposed-form-content-search-page-1").should(
      "be.visible"
    );
  });

  it('Submit "search form" without keyword navigates to a new url', function() {
    cy.visit();

    cy.get("form#views-exposed-form-content-search-page-1").submit();

    cy.url().should("include", "/search?keys=");

    cy.get(".view-content-search").should("contain", "No results were found");
  });

  it('Submit "search form" with keyword "GovCMS"', function() {
    cy.visit();

    cy.get("form#views-exposed-form-content-search-page-1 [name=keys]").type(
      "GovCMS"
    );

    cy.get("form#views-exposed-form-content-search-page-1").submit();

    cy.url().should("include", "/search?keys=GovCMS");

    cy.get(".view-content-search").should(
      "contain",
      "result(s) found, displaying"
    );
  });
});
