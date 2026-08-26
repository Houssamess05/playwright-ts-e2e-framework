import { Page, expect, Locator } from '@playwright/test';

//Clase base para todas las páginas de la web. Contiene funciones que se usan en toda la web.
export class BasePage {
  protected page: Page;
  // Locators
  protected logoutLink: Locator;
  protected deleteAccountLink: Locator;




  constructor(page: Page) {
    this.page = page; // Recibe la pagina una sola vez y la guarda en una variable de clase para poder usarla en todos los metodos de la clase.
    this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = this.page.getByRole('link', { name: 'Delete Account' });
    }

  // Cualquier función que se use en TODA la web va aquí:
  async verifyLoggedInAs(username: string) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async verifyLogoutOptionVisible() {
    await expect(this.logoutLink).toBeVisible();
  }

  async verifyDeleteAccountOptionVisible() {
    await expect(this.deleteAccountLink).toBeVisible();
  }


}