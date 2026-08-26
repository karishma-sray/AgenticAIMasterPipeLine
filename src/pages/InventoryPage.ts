import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class InventoryPage extends BasePage {
  readonly productContainer = this.page.locator('[data-test="inventory-container"]');
  readonly productItems = this.page.locator('[data-test="inventory-item"]');

  constructor(page: Page) {
    super(page);
  }
}
