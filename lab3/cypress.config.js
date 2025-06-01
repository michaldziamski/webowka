import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://webowka-prywatne.web.app',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
}) 