import { UserRegistrationData } from '../data/common/users.type';
import { faker } from '@faker-js/faker';
import { countries } from '../data/common/country';

export function generateEmail(firstName: string): string {
  const randomString = faker.string.alpha({ length: 10, casing: 'mixed' });
  return faker.internet.email({ 
    firstName: firstName + randomString,
    provider: 'example.com' 
  });
}


/**
 * Generates a complete set of realistic, mock registration data for a user.
 * It utilizes Faker.js to dynamically generate names, location details, 
 * contact information, and institutional data matching the `UserRegistrationData` structure.
 * 
 * @returns A structured object containing the generated user registration data.
 */
export function generatorUser(): UserRegistrationData {
  const name = faker.person.firstName().toString();
  const user : UserRegistrationData = {
        name: name,
        /// Generate a unique email address by appending a random string to the first name.
        email: generateEmail(name),
        password: faker.internet.password(),
        title: faker.helpers.arrayElement(['Mr', 'Mrs', 'Miss']),
        birth_date: faker.number.int({ min: 1, max: 31 }),
        birth_month: faker.number.int({ min: 1, max: 12 }),
        birth_year: faker.number.int({ min: 1900, max: 2023 }),
        firstname: faker.person.firstName().toString(),
        lastname: faker.person.lastName().toString(),
        company: faker.company.name().toString(),
        address1: faker.location.streetAddress().toString(),
        address2: faker.location.secondaryAddress().toString(),
        country: faker.helpers.arrayElement(countries).name,
        zipcode: faker.location.zipCode().toString(),
        state: faker.helpers.arrayElement(countries).name,
        city: faker.location.city().toString(),
        mobile_number: faker.phone.number().toString(),
  };
  return user;
}
