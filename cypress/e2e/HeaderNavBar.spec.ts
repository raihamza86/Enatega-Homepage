describe('HeaderNavBar Component', () => {
    it('should display the correct user location in the input field', () => {
        // Visit your page (use your actual URL)
        cy.visit('http://localhost:3000')  // Adjust for your local dev environment

        // Mock userLocation data using Cypress commands
        cy.window().then((window) => {
            // Assume your context is being initialized with a mock location
            window.localStorage.setItem('userLocation', JSON.stringify({ lat: 40.7128, lng: -74.0060 }))
        });

        // Check if the input value contains the location
        cy.get('input').should('have.value', '40.7128, -74.0060')
    });
});
