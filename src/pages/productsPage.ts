import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    private viewProductButton: Locator;

    constructor(page: Page) {
        super(page);
        this.viewProductButton = page.locator('button');
    }

    async clickViewProductButton(): Promise<void> {
        await this.viewProductButton.click();
    }
}