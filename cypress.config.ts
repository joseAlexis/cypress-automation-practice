import { defineConfig } from 'cypress'

import { generateUser } from "./cypress/tasks/users";

const baseUrl = 'https://automationexercise.com';

export default defineConfig({
  watchForFileChanges: false,
  e2e: {
    testIsolation: false,
    baseUrl,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser
      })
    }
  }
})