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
        const validUser = {
            email: userInfo.email,
            password: userInfo.password
        };
        // Create a new user account using the API before logging in
        const result = await loginApi.createAccount(userInfo);
        if (result.responseCode == 201) {
            try {
                await loginPage.fillAccountForm(validUser);
                await loginPage.submitAccountForm();
                // Confirm that the user is logged in by checking for the presence of the logout option
                await loginPage.verifyLogoutOptionVisible();

                // Use the logged-in page for the test
                await use(page);
                // After the test, log out to clean up
                await loginPage.clickLogout();
                await loginPage.verifySignupLoginOptionsVisible();
            }
            finally { //Allways delete the user account even if the test fails or crashes
                await loginApi.deleteAccount(validUser); // delete the user account after the test crashed
            }
        }
        else {
            throw new Error(`Failed to create user account. Response code: ${result.responseCode}, message: ${result.message}`);
        }
    },
});