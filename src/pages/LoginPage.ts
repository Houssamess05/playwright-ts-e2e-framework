import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { User } from '@data/common/users.type';

export class LoginPage extends BasePage{
private emailInput: Locator
private passwordInput: Locator
private loginButton: Locator

constructor(page: Page) {
    // Call the constructor of the BasePage class to initialize the page.
    super(page);
    // Initialize locators for the email and password input fields on the registration page.
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.loginButton = page.getByTestId('login-button');
}

async fillAccountForm(user: User) {
    // Fill in the email input field with the provided email.
    await this.emailInput.fill(user.email);
    // Fill in the password input field with the provided password.
    await this.passwordInput.fill(user.password);
}

async submitAccountForm() {
    // Click the login button to submit the account form.
    await this.loginButton.click();
}

}
