import { test, expect } from '@playwright/test';

test.describe('Monty Chat Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/chat');
  });

  test('loads initial message and title', async ({ page }) => {
    await expect(page.getByText('Talk with Monty')).toBeVisible();
    await expect(page.getByText('Hello! How can I help you?')).toBeVisible();
  });

  test('sends a message', async ({ page }) => {
  const input = page.getByPlaceholder('Pune o întrebare...');
  const sendButton = page.getByRole('button', { name: 'Trimite' });

  await input.fill('Care este cea mai lungă pârtie din România?');
  await sendButton.click();

  await expect(page.getByText('Care este cea mai lungă pârtie din România?')).toBeVisible();
});

});
