import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    private addToCartButton: Locator;
    private addToCartConfirmation: Locator;
    private continueShoppingButton: Locator;
    private cartItemsTable: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.addToCartConfirmation = page.getByText('Your product has been added to cart.', { exact: true });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.cartItemsTable = page.locator('#cart_info_table');
    }

    async clickViewProductDetails(productName: string): Promise<void> {
        const productCard = this.page.locator('div.product-image-wrapper').filter({ hasText: productName });
        const viewProductLink = productCard.getByRole('link', { name: 'View Product' });
        await viewProductLink.click();
    }
    async clickAddToCartButton(): Promise<boolean> {
        await this.addToCartButton.click();
        await this.addToCartConfirmation.waitFor({ state: 'visible' });
        const result = await this.addToCartConfirmation.isVisible();
        await this.continueShoppingButton.click();
        return result;
    }
    async verifyProductInCart(productName: string): Promise<boolean> {
        const productRow = this.cartItemsTable.getByRole('row').filter({
            has: this.page.getByRole('link', { name: productName, exact: true }),
        });
        await expect(productRow).toBeVisible();
        return await productRow.isVisible();
    }
}