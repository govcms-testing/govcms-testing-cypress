// ***********************************************
// Various custom commands and overwrite existing
// commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Drupal login
Cypress.Commands.add("drupalLogin", (user, password) => {
    return cy.request({
        method: 'POST',
        url: '/user/login',
        form: true,
        body: {
            name: user,
            pass: password,
            form_id: 'user_login_form'
        }
    });
});

// Drupal logout
Cypress.Commands.add('drupalLogout', () => {
    return cy.request('/user/logout');
});

// Drupal drush command
Cypress.Commands.add("drupalDrushCommand", (command) => {
    var cmd = Cypress.env('drupalDrushCmdLine');

    if (cmd == null) {
        cmd = 'drush %command'
    }

    if( typeof command === 'string' ) {
        command = [ command ];
    }

    const execCmd = cmd.replace('%command', command.join(' '));

    return cy.exec(execCmd);
});
