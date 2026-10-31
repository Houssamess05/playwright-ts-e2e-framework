import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { generatorUser } from '@utils/generatorUsers';
import { UserApi } from '@api/UserApi';

type Fixtures = {
    loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
    loggedInPage: async ({ request, page }, use) => {

        // Navigate to the login page
        await page.goto('/login');
        
        // Login with valid credentials
        const loginPage = new LoginPage(page);
        const loginApi = new UserApi(request);
        const userInfo = generatorUser();
        // Create a new user account using the API before logging in
        const result = await loginApi.createAccount(userInfo);
        try {
            if (result.responseCode !== 201) {
                throw new Error(`Failed to create user account: ${result.message}`);
            }
        } catch (error) {
            console.error('Error creating user account:', error);
            throw error; // Rethrow the error to fail the test setup
        }
        // Fill in the login form with the newly created user's credentials
        const validUser = {
            email: userInfo.email,
            password: userInfo.password
        };
        await loginPage.fillAccountForm(validUser);
        await loginPage.submitAccountForm();
        // Confirm that the user is logged in by checking for the presence of the logout option
        await loginPage.verifyLogoutOptionVisible();

        // Use the logged-in page for the test
        await use(page);

        // After the test, log out to clean up
        await loginPage.clickLogout();
        await loginPage.verifySignupLoginOptionsVisible();
        await loginApi.deleteAccount(validUser); // delete the user account after the test
    },
});