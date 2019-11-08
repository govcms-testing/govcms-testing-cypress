# govcms-testing-cypress

Cypress integration for GovCMS distribution

## Setup

### Yarn setup

#### Requirements

* [yarn](https://yarnpkg.com/en/)

You can install Yarn through the Homebrew package manager. This will also install Node.js if it is not already installed.

```
brew install yarn
```

Install Dependencies

```
cd PROJECT
yarn install
```

### Docker setup

#### Requirements
* [Docker](https://docs.docker.com/install/)
* [Homebrew](https://brew.sh/) (Optional but recommended, for MacOS)

#### Using offical Docker installer
The _Docker for Mac_ install package includes everything you need to run Docker on a Mac.

Please follow the install instructions at: https://docs.docker.com/docker-for-mac/install/.

#### Using Homebrew
Install Docker and open `Docker.app` - this will create the symbolic link for CLI use:
```
brew cask install docker && open /Applications/Docker.app
```

To install the command line completion if you haven't already (depending on your shell setup):
```
brew install bash-completion
```
or
```
brew install zsh-completions
```

Then install helper tools:
```
brew install docker-completion docker-compose-completion docker-machine-completion
```

#### Check Docker installed and works
```
docker run hello-world
```

## Use

### Opens the Cypress Test Runner in interactive mode

```
yarn cypress open
```

### Runs Cypress tests to completion.

```
yarn cypress run
```

### Run a single spec

```
yarn cypress run --spec cypress/integration/search/search.spec.js
```

### Full test with a single Docker command
You can run through _all_ Cypress tests using the following shell command:
```
docker run --ipc=host --cpus=2 -it -v $PWD:/e2e -w /e2e -e false cypress/included:3.6.0
```

### Run a single spec
```
docker run --ipc=host --cpus=2 -it -v $PWD:/e2e -w /e2e -e false cypress/included:3.6.0 run --spec cypress/integration/search/search.spec.js
```

### Explanation of the "docker run" command line arguments
```
 --ipc=host   = To prevent Electron Chromium error, see: https://github.com/cypress-io/cypress/issues/350
 --cpus=2     = To prevent Electron Chromium error
 -it          = interactive terminal
 -v $PWD:/e2e = map current folder to /e2e inside the container
 -w /e2e      = set working directy to /e2e
 3.6.0        = Cypress version number - Optional, if omitted: will use the latest version
 ```

Read more: https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/


## Features

### Drupal Collection

#### drupalLogin( username , password ) 
Begins the user's authenticated session.
```JavaScript
cy.drupalLogin('admin', 'admin')
```

#### drupalLogout() 
Ends the user's authenticated session.
```JavaScript
cy.drupalLogout()
```

#### drupalDrushCommand( command )
Issues a drush command.

The command can be passed as string or an array. 
```JavaScript
cy.drupalDrushCommand('status');

cy.drupalDrushCommand(['upwd', 'admin', 'admin']);
```

### `xpath` command

Ref: https://github.com/cypress-io/cypress-xpath/blob/master/README.md

```js
it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]//li')
    .should('have.length', 3)
})
```

You can also chain `xpath` off of another command.

```js
it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]')
    .xpath('./li')
    .should('have.length', 3)
})
```

As with other cy commands, it is scoped by `cy.within()`.

```js
it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]').within(() => {
    cy.xpath('./li')
      .should('have.length', 3)
  });
})
```
