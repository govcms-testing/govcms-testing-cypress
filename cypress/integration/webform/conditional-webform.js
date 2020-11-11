var webform = 0;
var webform_node = 0;
var webform_UI = 0;
var webform_access = 0;

//check if shield is on

it("webform test", function() {
  cy.clearLocalStorage()
  // Visit the link.
  cy.visit("user")
  // Login the user with password.
  cy.get("#edit-name").type(Cypress.env('user').super.username)
  cy.get("#edit-pass").type(Cypress.env('user').super.password)
  // Submit the form.
  cy.get("#edit-submit").click()

  cy.visit("/admin/modules")

cy.get('body input#edit-modules-webform-enable').then((body) => {
  console.log(body.is('[disabled=disabled]')) //true means enabled, false means disabled, displays log in browser- inspect- console
  if (body.is('[disabled=disabled]') == true)
    {webform = 0;}
  if (body.is('[disabled=disabled]') == false){
    cy.get("form")
      .find("#edit-modules-webform-enable")
      .check({force:true})
      //save the change
    cy.get("#edit-submit")
      .click()
      //confirm the change
    cy.get("#edit-submit")
      .click()
  webform = 1;
}})


cy.get('body #edit-modules-webform-node-enable').then((body) => {
  console.log(body.is('[disabled=disabled]')) //true means enabled, false means disabled
  if (body.is('[disabled=disabled]') == true)
    {webform_node = 0;}
  if (body.is('[disabled=disabled]') == false){
    cy.get("form")
      .find("#edit-modules-webform-node-enable")
      .check({force:true})
      //save the change
      cy.get("#edit-submit")
        .click()
      //confirm the change
      cy.get("#edit-submit")
        .click()
  webform_node = 1;
}})

cy.get('body #edit-modules-webform-access-enable').then((body) => {
  console.log(body.is('[disabled=disabled]')) //true means enabled, false means disabled
  if (body.is('[disabled=disabled]') == true)
    {webform_access = 0;}
  if (body.is('[disabled=disabled]') == false){
    cy.get("form")
      .find("#edit-modules-webform-access-enable")
      .check({force:true})
      //save the change
    cy.get("#edit-submit")
      .click()
      //confirm the change
    cy.get("#edit-submit")
      .click()
  webform_access = 1;
}})

cy.get('body #edit-modules-webform-ui-enable').then((body) => {
  console.log(body.is('[disabled=disabled]')) //true means enabled, false means disabled
  if (body.is('[disabled=disabled]') == true)
    {webform_UI = 0;}
  if (body.is('[disabled=disabled]') == false){
    cy.get("form")
      .find("#edit-modules-webform-ui-enable")
      .check({force:true})
      //save the change
    cy.get("#edit-submit")
      .click()
    //confirm the change
   cy.get("#edit-submit")
     .click()
  webform_UI = 1;
}})


//start testing
cy.visit("/admin/structure/webform/add")
//create a new webform
  cy.get("#title")
    .type("cypress_webform_test",{force:true})
  cy.get("#edit-id")
    .type("cypress_webform_test",{force:true})
  cy.get("#edit-submit")
    .click()
//add checkbox
  cy.visit("/admin/structure/webform/manage/cypress_webform_test/element/add/checkbox")
  cy.get("#title")
    .type("cypress_checkbox", {force:true})
  cy.get("#edit-key")
    .type("cypress_checkbox", {force:true})
  cy.get("#edit-submit")
    .click()
//add textarea
  cy.visit("/admin/structure/webform/manage/cypress_webform_test/element/add/textarea")
  cy.get("#title")
    .type("cypress_textarea", {force:true})
  cy.get("#edit-key")
    .type("cypress_textarea", {force:true})
  cy.get("#edit-submit")
    .click()
//add email
  cy.visit("/admin/structure/webform/manage/cypress_webform_test/element/add/email")
  cy.get("#title")
    .type("cypress_email", {force:true})
  cy.get("#edit-submit")
    .click()
//add number
  cy.visit("/admin/structure/webform/manage/cypress_webform_test/element/add/number")
  cy.get("#title")
    .type("cypress_number", {force:true})
  cy.get("#edit-submit")
    .click()
//add value
  cy.visit("/admin/structure/webform/manage/cypress_webform_test/element/add/value")
  cy.get("#title")
    .type("cypress_value", {force:true})
  cy.get("#edit-key")
    .type("cypress_value", {force:true})
  cy.get("#edit-properties-value")
    .type("this is cypress webform test, element value")
  cy.get("#edit-submit")
    .click()
//add webform_address
  cy.visit("/admin/structure/webform/manage/cypress_webform_test/element/add/webform_address")
  cy.get("#title")
    .type("cypress_webform_address", {force:true})
  cy.get("#edit-key")
    .type("cypress_webform_address", {force:true})
  cy.get("#edit-submit")
    .click()
//add webform_name
  cy.visit("//admin/structure/webform/manage/cypress_webform_test/element/add/webform_name")
  cy.get("#title")
    .type("cypress_webform_name", {force:true})
  cy.get("#edit-key")
    .type("cypress_webform_name", {force:true})
  cy.get("#edit-submit")
    .click()
//add date
  cy.visit("/admin/structure/webform/manage/cypress_webform_test/element/add/date")
  cy.get("#title")
    .type("cypress_date", {force:true})
  cy.get("#edit-key")
    .type("cypress_date", {force:true})
  cy.get("#edit-submit")
    .click()
//expected to return to /admin/structure/webform/manage/cypress_webform_test and save all the webform with above elements
cy.get("#edit-submit")
  .click()

//Sends a webform submission via an email
cy.visit("/admin/structure/webform/manage/cypress_webform_test/handlers/add/email")
cy.get("#edit-settings-to-mail-select")
  .select("Custom To email address…", {force:true})
cy.get("#edit-settings-to-mail-other")
  .type("suhyeonh@gmail.com")
cy.get("#edit-submit")
  .click()

//test webform
cy.visit("/webform/cypress_webform_test/test")
cy.get("#edit-submit")
  .click()

//check submission
cy.visit("/admin/structure/webform/manage/cypress_webform_test/results/submissions")
cy.contains("cypress_webform_test: Submission #1")
//delete submission
// cy.visit("/admin/structure/webform/manage/cypress_webform_test/submission/1/delete?destination=/admin/structure/webform/manage/cypress_webform_test/results/submissions")
//   .get("#edit-submit").click()

//delete webform
cy.visit("/admin/structure/webform/manage/cypress_webform_test/delete")
cy.get("#edit-confirm").click({force:true})
cy.get("#edit-submit").click()

//revert the changes
cy.visit ("/admin/modules/uninstall")
cy.get('form').then((body) => {
  console.log(webform_UI)
  if (webform_UI = 0){
    cy.visit("/admin/modules/uninstall")
  }
  if (webform_UI = 1) {
    cy.get("form")
      .find("#edit-uninstall-webform-ui")
      .check({force:true})
      //save the change
    cy.get("#edit-submit")
      .click()
      //confirm the change
    cy.get("#edit-submit")
      .click()
}})

cy.get('form').then((body) => {
  console.log(webform_access)
  if (webform_access == 0){
    cy.visit("/admin/modules/uninstall")
  }
  if (webform_access == 1) {
    cy.get("form")
      .find("#edit-uninstall-webform-access")
      .check({force:true})
      //save the change
    cy.get("#edit-submit")
      .click()
      //confirm the change
    cy.get("#edit-submit")
      .click()
}})

cy.get('form').then((body) => {
  console.log(webform_node)
  if (webform_node == 0){
    cy.visit("/admin/modules/uninstall")
  }
  if (webform_node == 1) {
    cy.get("form")
      .find("#edit-uninstall-webform-node")
      .check({force:true})
      //save the change
    cy.get("#edit-submit")
      .click()
      //confirm the change
    cy.get("#edit-submit")
      .click()
}})
cy.get('form').then((body) => {
  console.log(webform)
  if (webform == 0){
    cy.visit("/admin/modules/uninstall")
  }
  if (webform == 1) {
    cy.get("form")
      .find("#edit-uninstall-webform")
      .check({force:true})
      //save the change
    cy.get("#edit-submit")
      .click()
      //confirm the change
    cy.get("#edit-submit")
      .click()
}})


});
