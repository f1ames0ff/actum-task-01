// from your cypress/integration/spec.ts
/// <reference path="../support/index.d.ts" />
/// <reference types="cypress" />

function iteratePages(timeout: number){
  cy.get('li.page-item a.page-link', { timeout })
    .contains('2')
    .click();

  cy.wait(500);

  cy.get('li.page-item a.page-link', { timeout })
    .contains('3')
    .click();
}

describe('App e2e test', () => {
  const timeout = 5000;

  it('Search some users with Throttling', () => {
    cy.visit('http://localhost:3000');

    cy.get('input#mainInput').type('micro ${downarrow}{downarrow}{enter}Redmond', { delay: 100 });

    cy.get('#root > div > div > div:nth-child(4) > div > p > table', { timeout });

    cy.wait(500);

    iteratePages(timeout);
  });

  it('Search some users with Debounce', () => {
    cy.visit('http://localhost:3000');

    cy.get('input#behaviorInput').click();

    cy.get('input#mainInput').type('googl', { delay: 100 });

    cy.wait(500);

    cy.get('#root > div > div > div:nth-child(4) > div > p > table', { timeout });

    cy.wait(500);

    iteratePages(timeout);
  });

  it('Search some users without autocomplete', () => {
    cy.visit('http://localhost:3000');

    cy.get('input#disableBehaviorInput').click();

    cy.get('input#mainInput').type('dell', { delay: 100 });

    cy.get('button#searchButton').click();

    cy.wait(500);

    iteratePages(timeout);
  });
});
