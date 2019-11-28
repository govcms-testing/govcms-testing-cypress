describe("verify the functionality of Honeypot module", function() {
  beforeEach(()=>{
//beforeEach will run 'login' cusomised command everytime it runs 'it' function
//custom 'logn' command can be found in cypress/support/commands.js
    cy.login()
  })

  it("find module", function() {

    cy.contains("Extend").click()

//tick the checkbox of Honeypot module
    cy.get("form")
      .find("#edit-modules-honeypot-enable")
      .check({force:true})
//save the change
    cy.get("#edit-submit")
      .click()

//    cy.contains("Module Honeypot has been enabled.")
  });

  it("configure Honypot configuration", function() {

    cy.visit("https://govcms-testing.govcms.gov.au/admin/config/content/honeypot")

    cy.get("#edit-log").check({force:true})

    cy.get("#edit-element-name")
      .clear({force:true})
      .type("myaddress")

    cy.get("#edit-form-settings-user-pass").check({force:true})
    cy.contains("Save configuration").click({force:true})

    cy.contains("The configuration options have been saved.")
  })

    it("enable Webform module", function() {

      cy.contains("Extend").click()

      //tick the checkbox of Consumers module
          cy.get("form")
            .find("#edit-modules-webform-enable")
            .check({force:true})
      //save the change
          cy.get("#edit-submit")
            .click()
    });

it("Correct password reset form", function() {
  cy.visit("https://govcms-testing.govcms.gov.au/user/logout")

  cy.visit("https://govcms-testing.govcms.gov.au/user/password")
//wait 5 seconds otherwise considered as a bot
//I have commented out the wait command as it is considered as problem when committing this script to github
  //cy.wait(5000)
  cy.get("#edit-name")
  .type("honeypot.test@email.a")

  cy.get("#edit-submit")
  .click()

  cy.contains("Further instructions have been sent to your e-mail address.")
})

  it("Tiggers honeypot", function() {
    cy.visit("https://govcms-testing.govcms.gov.au/user/logout")

    cy.visit("https://govcms-testing.govcms.gov.au/user/password")
//wait 5 seconds otherwise considered as a bot
//I have commented out the wait command as it is considered as problem when committing this script to github
    //cy.wait(5000)

    cy.get("#edit-name")
    .type("honeypot.test@email.a")

    cy.get("#edit-myaddress")
    .type("blockme", {force:true})

    cy.get("#edit-submit")
    .click()

    cy.contains("There was a problem with your form submission.")
  })

// there are two cases that triggers honeypot.
// 1 - if any entry is found in the element named 'myaddress'
// 2 - if putting in a normal entry in less then 5 seconds.
// it should be sufficent to check the error message "There was a problem with your form submission."/ or success message "Further instructions have been sent to your e-mail address."

});
