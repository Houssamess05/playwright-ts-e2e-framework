import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '@data/e2e/user.types';

export class RegisterPage extends BasePage{
  private nameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private dayInput: Locator;
  private monthInput: Locator;
  private yearInput: Locator;
  private newsletterCheckbox: Locator;
  private offersCheckbox: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private companyInput: Locator;
  private address1Input: Locator;
  private address2Input: Locator;
  private countrySelect: Locator;
  private stateInput: Locator;
  private cityInput: Locator;
  private zipcodeInput: Locator;
  private mobileNumberInput: Locator;
  private accountCreatedMessage: Locator;
  private continueButton: Locator;
  private signupButton: Locator;

    /**
     * Initializes the RegisterPage with the provided Playwright Page object and sets up locators for the registration form elements.
     * @param page The Playwright page instance used to initialize the registration page.
     */
    constructor(page: Page) {
        super(page);
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.getByTestId('signup-email');
        this.passwordInput = page.getByTestId('password');
        this.dayInput = page.getByTestId('days');
        this.monthInput = page.getByTestId('months');
        this.yearInput = page.getByTestId('years');
        this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from our partners!' });
        this.firstNameInput = page.getByTestId('first_name');
        this.lastNameInput = page.getByTestId('last_name');
        this.companyInput = page.getByTestId('company');
        this.address1Input = page.getByTestId('address');
        this.address2Input = page.getByTestId('address2');
        this.countrySelect = page.getByTestId('country');
        this.stateInput = page.getByTestId('state');
        this.cityInput = page.getByTestId('city');
        this.zipcodeInput = page.getByTestId('zipcode');
        this.mobileNumberInput = page.getByTestId('mobile_number');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.accountCreatedMessage = page.getByText('Congratulations! Your new account has been successfully created!');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
    }

    /**
     * Verifies that the account created message is visible on the page, indicating successful account creation.
     */
    async verifyAccountCreatedMessageVisible() {
        await expect(this.accountCreatedMessage).toBeVisible();
    }

    /**
     * Navigates to the registration page of the application.
     */
    async navigate(): Promise<void> {
        await this.page.goto('/login');
    }

    /**
     * Starts the signup process by filling in the name and email fields and clicking the signup button.
     * @param name The name to enter in the form.
     * @param email The email to enter in the form.
     */
    async startSignup(name: string, email: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

    /**
     * Fills in the account registration form with the provided user data, including password, date of birth, personal information, and address details.
     * @param user The user data used to fill the registration form.
     */
    async fillAccountForm(user: UserData): Promise<void> {
        await this.passwordInput.fill(user.password);
        await this.dayInput.selectOption(user.day);
        await this.monthInput.selectOption(user.month);
        await this.yearInput.selectOption(user.year);
        await this.newsletterCheckbox.check();
        await this.offersCheckbox.check();
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.companyInput.fill(user.company);
        await this.address1Input.fill(user.address1);
        await this.address2Input.fill(user.address2);
        await this.countrySelect.selectOption(user.country);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.mobileNumber);
    }

    /**
     * Submits the account registration form by clicking the "Create Account" button.
     */
    async submitAccountForm(): Promise<void> {
        await this.page.getByRole('button', { name: 'Create Account' }).click();
    }

    /**
     * Clicks the "Continue" button after account creation to proceed to the next step.
     */
    async clickContinueButton()
    {
        this.continueButton.click();
    }

    /**
     * Checks if the password input field is invalid based on its validity state and returns a boolean indicating whether it is invalid.
     * @returns True if the password input is invalid; otherwise, false.
     */
    async checkIfPasswordIsInvalid(): Promise<boolean> {
        const esInvalido = await this.passwordInput.evaluate(
            el => !(el as HTMLInputElement).validity.valid
        );
        return esInvalido;
    }

}
