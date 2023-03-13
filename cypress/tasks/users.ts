import { faker } from '@faker-js/faker';

import { UserModel } from "../support/DTOs/UserModel";

export const generateUser = () => {
    let userModel: UserModel = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        company: faker.company.name(),
        address1: faker.address.streetAddress(),
        country: faker.address.country(),
        state: faker.address.state(),
        city: faker.address.city(),
        zipcode: faker.address.zipCode(),
        mobile_number: faker.phone.number('#########')
    };
    return userModel;
}