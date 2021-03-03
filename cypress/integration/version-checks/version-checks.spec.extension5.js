let list = [];
it('check for current version',function (){
  //console.log(cy.drupalCommandLine('docker-compose exec -T cli drush pml --no-core --format=csv --fields=name,version'))
  list.push(cy.drupalCommandLine('docker-compose exec -T cli drush pml --no-core --format=csv --fields=name,version'))
  cy.log(list)
})

// pml --no-core --format=csv --fields=name,version
