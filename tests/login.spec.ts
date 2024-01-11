import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

const baseUrl = 'https://parabank.parasoft.com';

test('Poprawne logowanie', async ({ page }) => {
  const loginPage = new LoginPage(page, baseUrl);
  await loginPage.open();
  await loginPage.login('qsYQyOvU5204', 'test');
  await expect(page.url()).toBe(`${baseUrl}/parabank/overview.htm`);
});

test('Logowanie z błędnymi danymi', async ({ page }) => {
  const loginPage = new LoginPage(page, baseUrl);
  await loginPage.open();
  await loginPage.login('nieprawidlowyUzytkownik', 'nieprawidloweHaslo');
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toContain('An internal error has occurred and has been logged.');
});
