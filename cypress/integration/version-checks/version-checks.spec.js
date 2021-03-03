var govcms_module_version;
var govcms_module_name;

function getGitModuleVersion() {

  cy.request('https://github.com/govCMS/GovCMS8/blob/1.x/composer.json').as('gitHub')
  cy.get('@gitHub').should((response) => {
    var line = (govcms_module_name) + '<span class="pl-pds">&quot;</span></span>: <span class="pl-s"><span class="pl-pds">&quot;</span>' + (govcms_module_version);
    expect(response.body).to.contain(line)
    console.log(line)
  })
}

it('check for current version',function (){
  cy.login()
  cy.visit('/admin/modules')
  cy.get('#edit-text').type("dlm",{force:true})
  cy.get('#edit-modules-govcms-dlm-enable-description > summary').click({force:true})
  cy.get('#edit-modules-govcms-dlm-enable-description > .details-wrapper > .details-description > .requirements > :nth-child(1)').should(($name) => {
    const module_name = $name.text().match(/(?<=\: ).*/)
    govcms_module_name = module_name;
    console.log(govcms_module_name)
  })
  cy.get('#edit-modules-govcms-dlm-enable-description > .details-wrapper > .details-description > .requirements > :nth-child(2)').should(($version) => {
    const module_version = $version.text().match(/(?<=\-).*/)
    govcms_module_version = module_version;
    console.log(govcms_module_version)
  })
  getGitModuleVersion()
})
