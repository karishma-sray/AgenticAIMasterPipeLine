import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { InventoryPage } from './InventoryPage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });
  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  constructor(page: Page) {
    super(page);
  }

  /**
   * Log in with provided credentials and return InventoryPage.
   */
  async loginAs(credentials: { username: string; password: string }): Promise<InventoryPage> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
    return new InventoryPage(this.page);
  }
}
