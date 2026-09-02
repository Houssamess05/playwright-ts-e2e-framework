import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';
import { UserData } from '../../src/data/e2e/user.types';
import { getUniqueAlphaString } from '../../src/utils/generators';
import { validUser } from '../../src/data/e2e/users';

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
  const randomName = getUniqueAlphaString();
  const randomEmail = `user_${Date.now()}@test.com`;
  await registerPage.startSignup(randomName, randomEmail);
  await expect(page).toHaveURL('/signup');
  await registerPage.fillAccountForm(validUser);
  await registerPage.submitAccountForm();
  await expect(page).toHaveURL('/account_created');
  await registerPage.verifyAccountCreatedMessageVisible()
  await registerPage.clickContinueButton();
  await registerPage.verifyLoggedInAs(randomName);
  await registerPage.verifyLogoutOptionVisible();
  await registerPage.verifyDeleteAccountOptionVisible();
});

test('Register with invalid credentials - Missing password', async ({ page }) => {
  // Create a user with an empty password based on the valid user,
  // without duplicating all the data.
  const invalidUserPassword: UserData = {
      ...validUser,
      password: ''
  };
  const randomName = getUniqueAlphaString();
  const randomEmail = `user_${Date.now()}@test.com`;
  await registerPage.startSignup(randomName, randomEmail);
  await expect(page).toHaveURL('https://automationexercise.com/signup');
  await registerPage.fillAccountForm(invalidUserPassword);
  await registerPage.submitAccountForm();
  // Verify that we remain on the form page.
  await expect(page).toHaveURL('https://automationexercise.com/signup');
  // Check with validity that the password input behaves as expected.
  const isInvalid = await registerPage.checkIfPasswordIsInvalid();
  await expect(isInvalid).toBe(true);
});
