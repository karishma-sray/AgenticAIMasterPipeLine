import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { InventoryPage } from './InventoryPage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });
  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage = this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page.
   */
  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
  }

  /**
   * Perform login with provided credentials.
   * Use this for cases where you want to check the result (success or error).
   */
  async login(credentials: { username: string; password: string }): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  /**
   * Log in with provided credentials and return InventoryPage.
   * Only use this when you expect successful login.
   */
  async loginAs(credentials: { username: string; password: string }): Promise<InventoryPage> {
    await this.login(credentials);
    return new InventoryPage(this.page);
  }

  /**
   * Get the error message text from the error container.
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
