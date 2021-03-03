var govcms_module_version;
var govcms_module_name;

function getGitModuleVersion() {
  //var ModuleName = "govcms_dlm
  // cy.request({
  //   url: 'https://github.com/govCMS/GovCMS8/blob/1.x/composer.json',
  //   encoding: 'json',
  // })
  // .then((response) => {
  //   console.log(response.body)
  // })

  //"drupal/govcms_dlm": "1.4",
  //var line = "drupal/" + govcms_module_name;
//  console.log(line)
  cy.request('https://github.com/govCMS/GovCMS8/blob/1.x/composer.json').as('gitHub')
  cy.get('@gitHub').should((response) => {
    //expect(response.body).to.have.contains('govcms_dlm')
    // var line = 'drupal/' + govcms_module_name;
    //var line = (govcms_module_name) + '": "' + (govcms_module_version);
    var line = (govcms_module_name) + '<span class="pl-pds">&quot;</span></span>: <span class="pl-s"><span class="pl-pds">&quot;</span>' + (govcms_module_version);
    //var line2 = line + "": "";
    // var line3 = line2 + govcms_module_name;
    expect(response.body).to.contain(line)
    console.log(line)
  })
  //console.log(line)

  // cy.visit('https://github.com/govCMS/GovCMS8/blob/1.x/composer.json')
  //cy.get('#LC65 > :nth-child(2)').should(($module) => {

  //})
}

// function checkModuleVersion(gitVersion){
//   cy.login()
//   cy.visit('/admin/modules')
//   cy.get('#edit-text').type("dlm",{force:true})
//   cy.get('#edit-modules-govcms-dlm-enable-description > summary').click({force:true})
//   cy.get('#edit-modules-govcms-dlm-enable-description > .details-wrapper > .details-description > .requirements > .admin-requirements', {force:true}).eq(1).should('have.value',gitVersion)
// }

it('check for current version',function (){
  cy.login()
  cy.visit('/admin/modules')
  cy.get('#edit-text').type("dlm",{force:true})
  cy.get('#edit-modules-govcms-dlm-enable-description > summary').click({force:true})
  cy.get('#edit-modules-govcms-dlm-enable-description > .details-wrapper > .details-description > .requirements > :nth-child(1)').should(($name) => {
    const govcms = $name.text().match(/(?<=\: ).*/)
    govcms_module_name = govcms;
    console.log(govcms_module_name)
  })
  cy.get('#edit-modules-govcms-dlm-enable-description > .details-wrapper > .details-description > .requirements > :nth-child(2)').should(($module) => {
    const govcms_dlm = $module.text().match(/(?<=\-).*/)
    govcms_module_version = govcms_dlm;
    console.log(govcms_module_version)
  })
  getGitModuleVersion()
  //console.log(govcms_module_version);
//   cy.visit('https://github.com/govCMS/GovCMS8/blob/1.x/composer.json')
// //govcms_dlm module
//   cy.get('#LC65 > :nth-child(2)').should(($module) => {
//     const govcms_dlm = $module.text()
//     govcms_dlm_var = govcms_dlm;
//     console.log(govcms_dlm)
//   })
})
