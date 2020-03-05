describe('General Test', function () {
  
  it('Page not found 404', function () {
    cy.visit('https://localhost:3000/not-existing-route');
    cy.get('p.lead').contains('Page Not Found');
    cy.get('button').contains('Head Back Home?')
        .click();
    cy.location('pathname').should('eq', '/');
  });
});