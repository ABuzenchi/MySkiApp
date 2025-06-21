import { test, expect } from '@playwright/test';

test.describe('MapComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should render the map and open fullscreen modal', async ({ page }) => {
    // 1. Verifică titlu și hartă
    await expect(page.getByText(/Harta domeniilor schiabile/i)).toBeVisible();
    await expect(page.locator('#map')).toBeVisible();

    // 2. Selectăm doar butonul din #map
    const fullscreenButton = page.locator('#map button:has(svg)');
    await expect(fullscreenButton).toBeVisible();

    // 3. Click pe buton
    await fullscreenButton.click();

    // 4. Modalul ar trebui să apară
    await expect(page.locator('.mantine-Modal-root')).toBeHidden();

    // 5. Harta din interiorul modalului
    await expect(page.locator('.mantine-Modal-root .leaflet-container')).toBeVisible();
  });
});
