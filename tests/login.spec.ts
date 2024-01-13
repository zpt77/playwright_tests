import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Page } from '@playwright/test';
import { createNewUser } from '../utils/testUtils';
import { RegistrationPage } from '../pages/RegistrationPage';

const baseUrl = 'https://parabank.parasoft.com';

test('Poprawne logowanie', async ({ page }) => {
  const registrationPage = new RegistrationPage(page, baseUrl);
  await registrationPage.open();
  await page.screenshot({ path: '1.png' });
  const newUser = await createNewUser(registrationPage);
  await page.screenshot({ path: '2.png' });
  await page.click('a[href="/parabank/logout.htm"]');
  const loginPage = new LoginPage(page, baseUrl);
  await page.screenshot({ path: '3.png' });
  await loginPage.open();
  await page.screenshot({ path: '4.png' });
  await loginPage.login(newUser.username, newUser.password);
  await page.screenshot({ path: '5.png' });
  await expect(page.url()).toBe(`${baseUrl}/parabank/overview.htm`);
});

test('Logowanie z błędnymi danymi', async ({ page }) => {
  const loginPage = new LoginPage(page, baseUrl);
  await loginPage.open();
  await loginPage.login('nieprawidlowyUzytkownik', 'nieprawidloweHaslo');
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toContain('An internal error has occurred and has been logged.');
});
