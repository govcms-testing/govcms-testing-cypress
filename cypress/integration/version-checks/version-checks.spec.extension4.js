var govcms_module_version;
var govcms_module_name;
let line = [];
let name  = [];
let version = [];
let coreMod = ['action',
'aggregator',
'automated_cron',
'ban',
'big_pipe',
'block',
'block_content',
'book',
'breakpoint',
'ckeditor',
'color',
'comment',
'config',
'contact',
'content_moderation',
'contextual',
'dblog',
'dynamic_page_cache',
'editor',
'field',
'field_layout',
'field_ui',
'filter',
'forum',
'help',
'help_topics',
'history',
'inline_form_errors',
'layout_builder',
'layout_discovery',
'media',
'media_library',
'menu_link_content',
'menu_ui',
'migrate_drupal_multilingual',
'node',
'page_cache',
'path',
'path_alias',
'quickedit',
'rdf',
'responsive_image',
'search',
'settings_tray',
'shortcut',
'simpletest',
'statistics',
'syslog',
'system',
'taxonomy',
'toolbar',
'tour',
'tracker',
'update',
'user',
'views',
'views_ui',
'workflows',
'workspaces',
'metatag_dc',
'metatag_dc_advanced',
'bartik',
'claro',
'classy',
'seven',
'stable',
'stable9',
'stark'];


function getModules() {
  cy.login()
  cy.visit('/admin/modules')
  for(let i = 55; i<57 ; i++){
    cy.get('.requirements').eq(i).within(()=> {
      cy.get('.admin-requirements').eq(0).each(($name)=> {
        name.push($name.text().match(/: (.*)/)[1])
        cy.log($name.text())
      })
      cy.get('.admin-requirements').eq(1).within(($version)=> {
        version.push($version.text().match(/\d[^x]*$/))
        cy.log($version.text())
      })
    })
  }
}

function match() {
  getModules()
  cy.request('https://github.com/govCMS/GovCMS8/blob/1.x/composer.json').as('gitHub')
  cy.get('@gitHub').should((response) => {
    for(let i = 0; i<6 ; i++){
      console.log(name)
      console.log(version)
      line.push((name)[i] + '<span class="pl-pds">&quot;</span></span>: <span class="pl-s"><span class="pl-pds">&quot;</span>' + (version)[i])
      // 'admin_toolbar_links_access_filter<span class="pl-pds">&quot;</span></span>: <span class="pl-s"><span class="pl-pds">&quot;</span>2.3'
      // 'admin_toolbar_links_access_filter<span class="pl-pds">&quot;</span></span>: <span class="pl-s"><span class="pl-pds">&quot;</span>2.3'
      //cy.log(line);
      console.log(line);
      expect(response.body).to.contain(line)
    }
  })
}


// function core(){
//   //if the name[i] not equal to coreMod, run the check
//   for(let i = 0; i <name.length; i++){
//     //cy.get(coreMod).then((core)=>{
//       if(coreMod[i] == (name[i])){
//         console.log('this is a core module')
//       }
//
//       else {
//         console.log('this is not a core module')
//       }
//     //})
//   }
// }
function core(){
  //if the name[i] not equal to coreMod, run the check
  for (let i=0; i<name.length; i++) {
    if(coreMod.indexOf(name[i]) >0){
      cy.request('https://github.com/govCMS/GovCMS8/blob/1.x/composer.json').as('gitHub')
      cy.get('@gitHub').should((response) => {

        line = (name)[i] + '<span class="pl-pds">&quot;</span></span>: <span class="pl-s"><span class="pl-pds">&quot;</span>' + (version)[i];
        console.log(line)
        expect(response.body).to.contain(line)

      })
      console.log('this is a core module')
    }else{
      console.log('this is not a core module')
    }
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
  //getModules()
  //core()
  match()
  // console.log(name)
  // console.log(version)
  // console.log(line)
})

//make it grab the name of the modules on the GovCMS site and cross check it with modules on the Github
