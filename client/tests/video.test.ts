import { test, expect } from '@playwright/test';

test.describe('UploadVideo component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/analyzer');
  });

  test('Displays title and description', async ({ page }) => {
  await expect(page.getByText(/analyze your speed/i)).toBeVisible();
  await expect(page.getByText(/select your skiing video/i)).toBeVisible();
});


  test('Renders file input and upload button', async ({ page }) => {
  const fileInput = page.locator('input[type="file"]');
  await expect(fileInput).toHaveCount(1); // doar verificăm că e în DOM

  const uploadBtn = page.getByRole('button', { name: /upload/i });
  await expect(uploadBtn).toBeVisible();
  await expect(uploadBtn).toBeDisabled();
});

});
