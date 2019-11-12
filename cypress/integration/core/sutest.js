describe('My First Test', function() {
  it('Gets, types and asserts', function() {
    //visits homepage
    cy.visit('')

    cy.contains('Contact').click()

    // Should be on a new URL which includes '/commands/actions'
    //cy.url().should('include', '/commands/actions')


    // Get an input, type into it and verify that the value has been updated
    cy.get('#edit-name--3')
      .type('Suhyeon')
      .should('have.not.value', 'fake@email.com')

    cy.get('#edit-last-name--3')
      .type('Hong')
      .should('have.not.value', 'integer')

    cy.get('#edit-email--3')
      .type('suhyeon.hong@finance.gov.au')
      .should('have.value', 'suhyeon.hong@finance.gov.au')

    cy.get('#edit-message--3')
      .type('testing message from suhyeon hong')

    //cy.contains('Send message').click()
  })
})
