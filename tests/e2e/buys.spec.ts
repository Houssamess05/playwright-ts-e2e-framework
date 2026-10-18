import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/auth.fixture';
import { ProductsPage } from '../../src/pages/productsPage';


test('Buy a some products', async ({ loggedInPage }) => {
    // Navigate to the products page
    await loggedInPage.clickViewProductButton(productName);

    // Select a product to buy

});