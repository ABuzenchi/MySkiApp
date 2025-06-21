import { test, expect } from '@playwright/test';

test.describe('Header component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); 
  });

 test('should display app name and image', async ({ page }) => {
  const logo = page.locator('img[src*="mountain-header.png"]');
  const appName = page.locator('text=WinterHeight');

  await expect(logo).toBeAttached();
  await expect(appName).toBeVisible();
});
});
