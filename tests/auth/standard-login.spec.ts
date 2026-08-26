import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/fixtures.json';

test.describe('SauceDemo login — standard user @smoke', () => {
  test('lands on inventory with products @smoke @critical', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    const login = new LoginPage(page);
    const inventory = await login.loginAs(users.standard);
    
    await expect(page).toHaveURL(/inventory/);
    await expect(inventory.productItems.first()).toBeVisible();
  });
});
