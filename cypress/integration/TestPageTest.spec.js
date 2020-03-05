describe('Test Page Test', function () {
  
  beforeEach(() => {
    cy.visit('https://localhost:3000/test');
  });
  
  it('Verify initial page content', function () {
    cy.get('[class*=Header_mainContainer]')
        .contains('Test Page');
    cy.get('[class*=SideBar_mainContainer]');
    cy.get('[class*=TabsMenu_mainContainer]');
    cy.get('[class*=TopFilters_mainContainer]');
    cy.get('[class*=ResultsTable_mainContainer]');
    cy.get('[class*=SideFilters_mainContainer]');
  });
  
  it('Tabs menu', function () {
    cy.get('[class*=TabsMenu_mainContainer]')
        .contains('No Filters')
        .click();
    cy.get('[class*=TopFilters_statusDropdownContainer]').should('not.exist');
    cy.get('button [class*=TopFilters_iconFilter]').should('not.exist');
    cy.get('[class*=sideFiltersContainer][class*=hide]');
    
    cy.get('[class*=TabsMenu_mainContainer]')
        .contains('With Filters')
        .click();
    cy.get('[class*=TopFilters_statusDropdownContainer]').should('exist');
    cy.get('button [class*=TopFilters_iconFilter]').should('exist');
    
    cy.get('[class*=TabsMenu_mainContainer]')
        .contains('Full Screen')
        .click();
    cy.get('[class*=TabsMenu_mainContainer]').should('not.exist');
    
    cy.get('button').contains('Close Full Screen')
        .click();
    cy.get('[class*=TabsMenu_mainContainer]').should('exist');
  });
});