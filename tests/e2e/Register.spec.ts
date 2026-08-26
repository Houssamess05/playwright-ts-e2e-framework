import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';

let registerPage: RegisterPage;
// Funcion que utiliza un mapa para generar un string aleatorio de letras basado en la fecha actual.
// De esta forma generamos un string que nunca se repita y genere falsos positivos en los test de registro.
function getUniqueAlphaString(): string {
  const map = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  return Date.now().toString().split('').map(digit => map[Number(digit)]).join('');
}

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
  await registerPage.completeAccountForm('password123', '15', '6', '1990', 'John', 'Doe', 'Example Inc.', '123 Main St', 'Apt 4B', 'United States', 'California', 'Los Angeles', '90001', '+1234567890');
  await expect(page).toHaveURL('https://automationexercise.com/account_created');
  await registerPage.checkRegistration(randomName);
});

