describe('Main Page Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main page', () => {
    cy.contains('Księgarnia Belmondziarnia').should('exist')
  })

  it('should display books list', () => {
    cy.get('[data-testid="book-card"]').should('exist')
  })

  it('should filter books by title', () => {
    const searchTerm = 'test33'
    cy.get('[data-testid="search-input"]').type(searchTerm)
    cy.get('[data-testid="book-card"]').should('contain', searchTerm)
  })
}) 