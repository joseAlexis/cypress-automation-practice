import { defineConfig } from 'cypress'
import { faker } from '@faker-js/faker';

import { UserDTO } from "./cypress/support/DTOs/UserDTO";

export default defineConfig({
  watchForFileChanges: false,
  e2e: {
    testIsolation: false,
    baseUrl: 'https://automationexercise.com',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let userDTO: UserDTO = {
            gender: faker.datatype.boolean(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            dateOfBirth: faker.date.birthdate().toString(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            company: faker.company.name(),
            streetAddress: faker.address.streetAddress(),
            country: faker.address.country(),
            state: faker.address.state(),
            city: faker.address.city(),
            zipCode: faker.address.zipCode(),
            phoneNumber: faker.phone.number('#########')
          };
          return userDTO;
        }
      })
    }
  }
})