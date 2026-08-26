import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/fixtures.json';

test.describe('SauceDemo login scenarios', () => {
  test('1.1 Standard user successful login @smoke @critical', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const login = new LoginPage(page);
    const inventory = await login.loginAs(users.standard);
    
    await expect(page).toHaveURL(/inventory/);
    await expect(inventory.productItems.first()).toBeVisible();
  });

  test('1.2 Locked out user shows error @smoke @critical', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const login = new LoginPage(page);
    await login.login(users.locked);
    
    await expect(login.errorMessage).toBeVisible();
    const errorText = await login.getErrorMessage();
    expect(errorText).toContain('locked');
  });

  test('1.3 Empty username shows error @regression', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const login = new LoginPage(page);
    await login.login({ username: '', password: 'secret_sauce' });
    
    await expect(login.errorMessage).toBeVisible();
    const errorText = await login.getErrorMessage();
    expect(errorText.toLowerCase()).toContain('username is required');
  });

  test('1.4 Empty password shows error @regression', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const login = new LoginPage(page);
    await login.login({ username: 'standard_user', password: '' });
    
    await expect(login.errorMessage).toBeVisible();
    const errorText = await login.getErrorMessage();
    expect(errorText.toLowerCase()).toContain('password is required');
  });

  test('1.5 Invalid credentials show error @regression', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const login = new LoginPage(page);
    await login.login({ username: 'invalid_user', password: 'wrong_password' });
    
    await expect(login.errorMessage).toBeVisible();
    const errorText = await login.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
  });
});
