var govcms_module_version;
var govcms_module_name;
let name  = [];
let version = [];
function getNamesoftheModules() {
  cy.login()
  cy.visit('/admin/modules')

  for(let i = 0; i<15 ; i++){

//if i/2 =! 0 version of the modules
//if i/2 == 0 name of the modules
// if(cy.get('.admin-requirements').each(($requirement) => {
//   expect($requirement).not.to.contain('Requires:');
// }))
if(i%2==0) {
  cy.get('.admin-requirements').eq(i).each(($name) => {
    name.push($name.text().match(/^((?!.*Require.*).)*(:.*)/))
    cy.log($name.text().match(/^((?!.*Require.*).)*(:.*)/))})
}
if(i%2!=0){
  cy.get('.admin-requirements').eq(i).each(($version) => {
    version.push($version.text().match(/^((?!.*Require.*).)*(:.*)/))
    cy.log($version.text().match(/^((?!.*Require.*).)*(:.*)/))})
}
//
// cy.get('.admin-requirements').then((requirements) => {
//   console.log('thisis1');
//   if (requirements.is('item-list--comma-list item-list')==false){
//     console.log('thisis2');
//     if(i%2==0) {
//       cy.get('.admin-requirements').eq(i).each(($name) => {
//         name.push($name.text().match(/: (.*)/)[1])
//         cy.log($name.text().match(/: (.*)/)[1])})
//         console.log('thisis3');
//     }
//     if(i%2!=0){
//       cy.get('.admin-requirements').eq(i).each(($version) => {
//         version.push($version.text().match(/: (.*)/)[1])
//         cy.log($version.text().match(/: (.*)/)[1])})
//         console.log('thisis4');
//     }
//
//   }
// })

    //cy.get('.module').eq(i).each((ele) => console.log(ele.text()))
    // name = [cy.get('.module').eq(i)]
    // console.log(name[i]);
    //name.push(i, cy.get('.module').eq(i))
    //name.push(i, cy.get('.module').eq(i).text())

  //console.log(name);
  //cy.get('.module').eq(i).each((ele) => console.log(ele.text()));

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
  getNamesoftheModules()
  console.log(name)
  console.log(version)

})

//make it grab the name of the modules on the GovCMS site and cross check it with modules on the Github
