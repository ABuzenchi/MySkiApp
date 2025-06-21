import { test, expect } from '@playwright/test';

test('should open user profile drawer when avatar icon is clicked', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // ✅ Așteaptă butonul de avatar stabil, cu testid-ul adăugat
  const avatarButton = page.getByTestId('user-avatar-button');
  await expect(avatarButton).toBeVisible();

  // 👤 Click sigur pe el
  await avatarButton.click();

  // 🧾 Așteaptă textul care confirmă că drawer-ul s-a deschis
  await expect(page.getByText('User Profile')).toBeVisible();
});
