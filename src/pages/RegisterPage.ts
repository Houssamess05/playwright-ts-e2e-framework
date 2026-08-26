import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

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
  private continueButton: Locator;



    constructor(page: Page) {
        super(page); // Llama al constructor de la clase base
        this.page = page;
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
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://automationexercise.com/login');
    }

    async startSignup(name: string, email: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.page.getByRole('button', { name: 'Signup' }).click();
    }

    async completeAccountForm(password: string, day: string, month: string, year: string, firstName: string, lastName: string, company: string, address1: string, address2: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string): Promise<void> {
        await this.passwordInput.fill(password);
        await this.dayInput.selectOption(day);
        await this.monthInput.selectOption(month);
        await this.yearInput.selectOption(year);
        await this.newsletterCheckbox.check();
        await this.offersCheckbox.check();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.address1Input.fill(address1);
        await this.address2Input.fill(address2);
        await this.countrySelect.selectOption(country);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.mobileNumberInput.fill(mobileNumber);
        await this.page.getByRole('button', { name: 'Create Account' }).click();
    }

    async checkRegistration(name: string): Promise<void> {
        await this.continueButton.click();
        await this.verifyLoggedInAs(name);
    }

}
