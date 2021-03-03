var govcms_module_version;
var govcms_module_name;
let name  = [];
let version = [];

function getName(){
  cy.login()
  cy.visit('/admin/modules')
  for(let i = 0; i<10 ; i++){
    if(i%2==0){
      cy.get('.admin-requirements').within(()=> {
        cy.get('.table-filter-text-source').eq(i).each(($name)=> {
          name.push($name.text().match(/: (.*)/))
          cy.log($name.text())
        })
      })
    }
  }
}

function getVersion(){
  cy.visit('/admin/modules')
  for(let i = 0; i<10 ; i++){
    cy.get('.admin-requirements').eq(i).within(()=>{
      cy.contains('Version:').each(($version)=>{
        version.push($version.text().match(/: (.*)/)[1])
        cy.log($version.text().match(/: (.*)/)[1])
      })
    })
  }
}

function getGitModuleVersion() {

  cy.request('https://github.com/govCMS/GovCMS8/blob/1.x/composer.json').as('gitHub')
  cy.get('@gitHub').should((response) => {
    var line = (govcms_module_name) + '<span class="pl-pds">&quot;</span></span>: <span class="pl-s"><span class="pl-pds">&quot;</span>' + (govcms_module_version);
    expect(response.body).to.contain(line)
    console.log(line)
  })
}
function getModule(name,id) {
  cy.login()
  cy.visit('/admin/modules')
  cy.get('#edit-text').type(name,{force:true})
  cy.get('#edit-modules-'+id+'-enable-description > summary').click({force:true})
  cy.get('#edit-modules-'+id+'-enable-description > .details-wrapper > .details-description > .requirements > :nth-child(1)').should(($name) => {
    const module_name = $name.text().match(/(?<=\: ).*/)
    govcms_module_name = module_name;
    console.log(govcms_module_name)
  })
  cy.get('#edit-modules-'+id+'-enable-description > .details-wrapper > .details-description > .requirements > :nth-child(2)').should(($version) => {
    const module_version = $version.text().match(/(\d\.x\-)?(\d[\.\d]+)/)
    govcms_module_version = module_version[2];
    console.log(govcms_module_version)
  })


}
it('check for current version',function (){
  // getModule('Admin Toolbar', 'admin-toolbar')
  // getGitModuleVersion()
  //getDetails()
  getName()
  getVersion()
  console.log(name)
  console.log(version)
})

//make it grab the name of the modules on the GovCMS site and cross check it with modules on the Github
