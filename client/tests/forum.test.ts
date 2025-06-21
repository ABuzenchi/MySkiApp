import { test, expect } from '@playwright/test';

test.describe('Forum UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/forum');
  });

  test('should show sidebar with categories', async ({ page }) => {
    await expect(page.getByText('Camere')).toBeVisible();
    await expect(page.getByText('Starea pârtiilor')).toBeVisible();
    await expect(page.getByText('Lucruri pierdute')).toBeVisible();
    await expect(page.getByText('Echipament')).toBeVisible();
  });

  test('should render at least one message in the message list', async ({ page }) => {
    const messageCards = page.locator('li');
    await expect(messageCards.first()).toBeVisible();
  });

  test('should have message input and send button', async ({ page }) => {
    await expect(page.getByPlaceholder('Write your message...')).toBeVisible();
    await expect(page.locator('button:has-text("➤")')).toBeVisible();
  });
});
