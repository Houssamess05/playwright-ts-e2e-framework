import { Page, expect, Locator } from '@playwright/test';

// Class representing the base page of the application, providing common functionality for all pages.
export class BasePage {
  protected page: Page;
  // Locators
  protected logoutLink: Locator;
  protected deleteAccountLink: Locator;
  protected signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page; // Recibe la pagina una sola vez y la guarda en una variable de clase para poder usarla en todos los metodos de la clase.
    this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = this.page.getByRole('link', { name: 'Delete Account' });
    this.signupLoginLink = this.page.getByRole('link', { name: 'Signup / Login' });
    }

  // Verifies that the user is logged in by checking for the presence of a specific text on the page.
  async verifyLoggedInAs(username: string) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }
  // Clicks the logout link to log the user out of the application.
  async clickLogout() {
    await this.logoutLink.click();
  }
  // Clicks the delete account link to initiate the account deletion process.
  async verifyLogoutOptionVisible() {
    await expect(this.logoutLink).toBeVisible();
  }
  // Verifies that the delete account option is visible on the page.
  async verifyDeleteAccountOptionVisible() {
    await expect(this.deleteAccountLink).toBeVisible();
  }

  async verifySignupLoginOptionsVisible() {
    await expect(this.signupLoginLink).toBeVisible();
  }
}