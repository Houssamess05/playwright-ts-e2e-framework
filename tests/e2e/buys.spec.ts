import { test } from '../../src/fixtures/auth.fixture';
import { expect } from '@playwright/test';
import { expectedProducts } from '../../src/data/api/product';
import { ProductsPage } from '../../src/pages/productsPage';


test.fixme('Buy a some products', async ({ loggedInPage }) => {
    await loggedInPage.goto('/products');
    const productsPage = new ProductsPage(loggedInPage);
    const productName = expectedProducts.products[0]!.name;
    await productsPage.clickViewProductDetails(productName);

    // Select a product to buy
    await productsPage.clickAddToCartButton();
    // Go to the cart page
    await productsPage.clickCartButton();
    // Verify that the product is in the cart
    const isProductInCart = await productsPage.verifyProductInCart(productName);
    expect(isProductInCart).toBe(true);
});