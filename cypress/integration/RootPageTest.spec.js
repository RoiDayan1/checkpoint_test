describe('Root Page Test', function () {
  
  beforeEach(() => {
    cy.visit('https://localhost:3000/');
  });
  
  it('Verify initial page content', function () {
    cy.get('h1').contains('Checkpoint Test');
    cy.get('[class*=RootPage_button]');
  });
  
  it('Navigate to Test page', function () {
    cy.get('[class*=RootPage_button]')
        .click();
    cy.location('pathname').should('eq', '/test');
  });
});