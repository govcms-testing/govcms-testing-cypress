describe("Module version check", () => {
  // go and grab the composer file from the base repo and store it locally
  before(()=>{
    cy.log(Cypress.env('url'))
    cy.fixture('locations').then((location) => {
      const github = location.github
      cy.request(github).then((response) => {
        cy.writeFile('cypress/fixtures/currentComposer.json' , response.body)
      })
    })
    
  })
  
  it("Get module names and verions", () => {
    cy.fixture('currentComposer').as('x')
      cy.get('@x').then((response) => {
        // cy.get(response.require).each((items) => {
        //   const moduleNames = []
        //   Object.entries(items).map((key) => {
        //     cy.get(key).then((data) => {
        //       let name = data[0]
        //       let version = data[1]
        //       cy.log('The module is ' + name + ' and its version is ' + version)
        //       if(name.includes("drupal")){
        //         let machineName = name.replace('drupal/', '')
        //         cy.log(machineName)
        //         moduleNames.push(machineName)
        //         cy.log(moduleNames)
        //       }
        //     })
        //   })
        // })
        cy.visit('user')
        cy.drupalLogin('gumnut', 'password')
        cy.visit('admin/modules')
      })
  })
})


