import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';
import { UserData } from '../../src/data/user.types';
import { getUniqueAlphaString } from '../../src/utils/generators';
import { validUser } from '../../src/data/users';

let registerPage: RegisterPage;

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
  await registerPage.fillAccountForm(validUser);
  await registerPage.submitAccountForm();
  await expect(page).toHaveURL('https://automationexercise.com/account_created');
  await registerPage.checkRegistration(randomName);
});

test('Register with invalid credentials - Missing password', async ({ page }) => {
  // Crear un usuario con contraseña vacía a partir del usuario válido,
// evitando duplicar todos sus datos.
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
  // Vamos a comprobar que aun seguimos en la pagina del formulario.
  await expect(page).toHaveURL('https://automationexercise.com/signup');
  // Comprobamos utilizando validity que el input de contraseña se comporta como debe:
  const isInvalid = await registerPage.checkIfPasswordIsInvalid();
  await expect(isInvalid).toBe(true);
});
