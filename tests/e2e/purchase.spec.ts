import { test, expect } from '../../src/fixtures/auth.fixture';
import { validUser } from "../../src/data/common/users";


test("Purchase three products and verify the total price", async ({ loggedInPage }) => {

    // The page is already logged in
    // We will start by navigating to the products page
    await loggedInPage.
    await loggedInPage.clickLogout();

});