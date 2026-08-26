import { Page, expect } from '@playwright/test';

//Clase base para todas las páginas de la web. Contiene funciones que se usan en toda la web.
export class BasePage {
  protected page: Page;

  

  constructor(page: Page) {
    this.page = page; // Recibe la pagina una sola vez y la guarda en una variable de clase para poder usarla en todos los metodos de la clase.
  }

  // Cualquier función que se use en TODA la web va aquí:
  async verifyLoggedInAs(username: string) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  async clickLogout() {
    await this.page.locator('a[href="/logout"]').click();
  }

  async verifyLogoutOptionVisible() {
    await expect(this.page.getByText('Logout')).toBeVisible();
  }

  async verifyDeleteAccountOptionVisible() {
    await expect(this.page.getByRole('link', { name: 'Delete Account' })).toBeVisible();
  }
}