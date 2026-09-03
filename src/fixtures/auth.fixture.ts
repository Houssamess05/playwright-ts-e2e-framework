import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser } from '../data/common/users';

type Fixtures = {
    loggedInPage: LoginPage;
};

export const test = base.extend<Fixtures>({
    loggedInPage: async ({ page }, use) => {

        // Navigate to the login page
        await page.goto('/login');
        
        // Login with valid credentials
        const loginPage = new LoginPage(page);
        await loginPage.fillAccountForm(validUser);
        await loginPage.submitAccountForm();
        // Confirm that the user is logged in by checking for the presence of the logout option
        await loginPage.verifyLogoutOptionVisible();

        // Use the logged-in page for the test
        await use(loginPage);

        // After the test, log out to clean up
        await loginPage.clickLogout();
        await loginPage.verifySignupLoginOptionsVisible();
    },
});