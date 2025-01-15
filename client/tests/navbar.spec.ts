import { test, expect } from '@playwright/test';

test.describe('Navbar Tests', () => {
  test('should render all navbar elements correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const logo = page.locator('img[src="/src/assets/alpine-skiing-light.png"]');
    await expect(logo).toBeVisible();

    
    const homeButton = page.locator('a[href="/"]');
    await expect(homeButton).toBeVisible();
    await homeButton.click();
    await expect(page).toHaveURL('http://localhost:5173/');

    
    const forumButton = page.locator('a[href="/forum"]');
    await expect(forumButton).toBeVisible();
    await forumButton.click();
    await expect(page).toHaveURL('http://localhost:5173/forum');

    
    const resortsButton = page.locator('button:has-text("Resorts")');
    await expect(resortsButton).toBeVisible();

    const userProfileButton = page.locator('button:has-text("User Profile")');
    await expect(userProfileButton).toBeVisible();
  });
});

