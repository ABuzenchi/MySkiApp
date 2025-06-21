import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('displays main title', async ({ page }) => {
    await expect(page.getByText(/Descoperă cele mai spectaculoase pârtii/i)).toBeVisible();
  });

  test('has Monty and Video cards with buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /vorbește cu monty/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /încarcă video/i })).toBeVisible();
  });

  test('displays ski map section', async ({ page }) => {
    await expect(page.getByText(/Harta domeniilor schiabile/i)).toBeVisible();
    await expect(page.locator('#map')).toBeVisible(); // dacă MapComponent include un id="map"
  });
});
