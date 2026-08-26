import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';
import { UserData } from '../../src/data/user.types';
import { getUniqueAlphaString } from '../../src/utils/generators';

let registerPage: RegisterPage;

const userData: UserData = {
    password: 'password123',
    day: '15',
    month: '6',
    year: '1990',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Example Inc.',
    address1: '123 Main St',
    address2: 'Apt 4B',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '+1234567890'
  };

// Lo que se realiza antes de cada test.
test.beforeEach(async ({ page }) => {
  
  const consentButton = page.getByRole('button', { name: 'Consent' });
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
  await expect(page).toHaveURL('https://automationexercise.com/signup');
  await registerPage.completeAccountForm(userData);
  await expect(page).toHaveURL('https://automationexercise.com/account_created');
  await registerPage.checkRegistration(randomName);
});

