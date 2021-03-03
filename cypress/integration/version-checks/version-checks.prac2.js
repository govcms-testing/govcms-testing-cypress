var govcms_dlm_var;

it('check for current version',function (){
  govcms_module_version = getGitModuleVersion()
  console.log("here:");
  console.log(govcms_module_version);
  cy.visit('https://github.com/govCMS/GovCMS8/blob/1.x/composer.json')
//govcms_dlm module
  cy.get('#LC65 > :nth-child(2)').should(($module) => {
    const govcms_dlm = $module.text()
    govcms_dlm_var = govcms_dlm;
    console.log(govcms_dlm)
  })
})

it('check for version', function() {
console.log(govcms_dlm_var)
  cy.visit("user")
  console.log(govcms_dlm_var)
  // Login the user with password.
  cy.get("#edit-name").type(Cypress.env('user').super.username)
  cy.get("#edit-pass").type(Cypress.env('user').super.password)
  // Submit the form.
  cy.get("#edit-submit").click()
    cy.login()
    console.log(govcms_dlm_var)
    govcms_dlm_var = 1.4;
    console.log(govcms_dlm_var)
    cy.visit('/admin/modules')
    cy.get('#edit-text').type("dlm",{force:true})
    cy.get('#edit-modules-govcms-dlm-enable-description > summary').click({force:true})
    cy.get('#edit-modules-govcms-dlm-enable-description > .details-wrapper > .details-description > .requirements > .admin-requirements', {force:true}).eq(1).should('have.value',govcms_dlm_var)
    // cy.get('#edit-modules-govcms-dlm-enable-description"]/div/div/div/div[2]',{force:true}).should('have.value',govcms_dlm_var)
    // cy.get('#edit-modules-govcms-dlm-enable-description > .details-wrapper > .details-description > .requirements > .admin-requirements', {force:true}).eq(1).should(($module) => {
    //   const govcms_dlm = $module.text()
    //   cy.should(govcms_dlm = govcms_dlm_var)
    // })
    console.log(govcms_dlm_var)
})
