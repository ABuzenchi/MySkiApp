import test, { expect } from "@playwright/test";

test('should display the resort name', async ({ page }) => {
  await page.goto('http://localhost:5173/resorts/Sinaia');
  await expect(page.getByText('Sinaia')).toHaveCount(2);
});

test('should display all sidebar buttons', async ({ page }) => {
  await page.goto('http://localhost:5173/resorts/Sinaia');

  const tooltips = ['Instalații', 'Pârtii', 'Vreme', 'Webcam', 'Plata online', 'Hartă'];
  for (const tooltip of tooltips) {
    await expect(page.getByTitle(tooltip)).toBeVisible();
  }
});

test('should display webcam iframe when Webcam section selected', async ({ page }) => {
  await page.goto('http://localhost:5173/resorts/Sinaia');
  await page.getByTitle('Webcam').click();
  await expect(page.locator('iframe[title^="Webcam"]')).toBeVisible();
});
test('should display weather by default', async ({ page }) => {
  await page.goto('http://localhost:5173/resorts/Sinaia');
  await expect(page.getByText(/°C/)).toBeVisible();
});
