import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';
import { validUser } from '@data/e2e/users';
import { faker } from '@faker-js/faker';
import { generateEmail, generatorUser } from '@utils/generatorUsers';
import { UserRegistrationData } from '@data/common/users.type';

let registerPage: RegisterPage;

// Setup executed before each test.
test.beforeEach(async ({ page }) => {
  
  const consentButton = page.getByRole('button', { name: 'Consent' });
  // Handle the consent button if it appears on the page.
  await page.addLocatorHandler(consentButton, async () => {
    await consentButton.click();
  });
  registerPage = new RegisterPage(page);
  await registerPage.navigate();
});

test('Register with valid credentials', async ({ page }) => {
  // Generate a random name and email for the test to avoid conflicts with existing users.
  // Use faker to create a random string to append to the name, ensuring uniqueness in the email address.
  const user = generatorUser();
  await registerPage.startSignup(user.name, user.email);
  //Verify if the URL ends with '/signup' to confirm that the user is on the signup page.
  await expect(page).toHaveURL(/\/signup$/);
  await registerPage.fillAccountForm(user);
  await registerPage.submitAccountForm();
  await expect(page).toHaveURL(/\/account_created$/);
  await registerPage.verifyAccountCreatedMessageVisible()
  await registerPage.clickContinueButton();
  await registerPage.verifyLoggedInAs(user.name);
  await registerPage.verifyLogoutOptionVisible();
  await registerPage.verifyDeleteAccountOptionVisible();
});

test('Register with invalid credentials - Missing password', async ({ page }) => {
  // Create a user with an empty password based on the valid user,
  // without duplicating all the data.
  const name = faker.person.firstName().toString();
  const invalidUserPassword: UserRegistrationData = {
      ...validUser,
      name: name,
      email: generateEmail(name),
      // Set the password to an empty string to simulate missing password scenario.
      password: ''
  };
  await registerPage.startSignup(invalidUserPassword.name, invalidUserPassword.email);
  await expect(page).toHaveURL(/\/signup$/);
  await registerPage.fillAccountForm(invalidUserPassword);
  await registerPage.submitAccountForm();
  // Verify if the URL ends with '/signup' to confirm that the user is still on the signup page due to invalid credentials.
  await expect(page).toHaveURL(/\/signup$/);
  // Check with validity that the password input behaves as expected.
  const isInvalid = await registerPage.checkIfPasswordIsInvalid();
  await expect(isInvalid).toBe(true);
});
