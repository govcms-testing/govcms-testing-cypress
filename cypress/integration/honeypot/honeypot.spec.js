describe("verify the functionality of Honeypot module", function() {
  it("Log in and checks for Honeypot status", function() {
    cy.visit("https://govcms-testing.govcms.gov.au/user/login");

    cy.get ("#edit-name")
      .type ("admin.honeypot")

    cy.get ("#edit-pass")
      .type ("honeypot")

    cy.get("#edit-submit").click()

    cy.contains("Extend").click()

    cy.get("#edit-text")
      .type("honeypot")

    cy.get("#edit-modules-honeypot-enable")
      .should("have", "#edit-modules-honeypot-enable")


  });

  it("", function() {
    cy.visit("https://govcms-testing.govcms.gov.au/user/login");

    cy.get ("#edit-name")
      .type ("admin.honeypot")

    cy.get ("#edit-pass")
      .clear()
      .type ("honeypot",{forece : true})

    cy.get("#edit-submit").click()
    cy.visit("https://govcms-testing.govcms.gov.au/admin/config/content/honeypot")

    cy.get("#edit-element-name")
      .type("myaddress")

    cy.get("#edit-log").check()

    cy.get("#edit-element-name")
      .type("myaddress")

    cy.get("#edit-form-settings-node-govcms-standard-page-form").check()


  })

});
