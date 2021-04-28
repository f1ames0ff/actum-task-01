// from your cypress/integration/spec.ts
/// <reference path="../support/index.d.ts" />
/// <reference types="cypress" />

describe('App e2e test', () => {
  it('Tries to search some users', () => {
    cy.visit('http://localhost:3000');

    // mic location:Redmond

    cy.get('input').type('mic ${downarrow}{downarrow}{enter}Redmond', {delay: 100});

    cy.get('button[type="submit"]').click();

    cy.wait(500);

    cy.get('li.page-item a.page-link', { timeout: 5000 })
      .contains('2')
      .click();

    cy.wait(500);

    cy.get('li.page-item a.page-link', { timeout: 5000 })
      .contains('3')
      .click();

    cy.wait(500);

    cy.get('li.page-item a.page-link', { timeout: 5000 })
      .contains('4')
      .parent()
      .next()
      .click();

    cy.wait(500);

    cy.get('li.page-item a.page-link', { timeout: 5000 })
      .contains('5')
      .parent()
      .next()
      .next()
      .click();
  })
});
