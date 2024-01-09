import { test, expect } from '@playwright/test';

const baseUrl = 'https://parabank.parasoft.com';

test('Poprawne logowanie', async ({ page }) => {
  // Przejdź do strony logowania
  await page.goto(`${baseUrl}/`);

  // Wprowadź poprawne dane logowania
  await page.fill('input[name=username]', 'banktester');
  await page.fill('input[name=password]', 'bankster');

  // Kliknij przycisk logowania
  await page.click('input[type=submit]');

  // Zweryfikuj, czy użytkownik został przekierowany po zalogowaniu
  await expect(page.url()).toBe(`${baseUrl}/parabank/overview.htm`);
});

test('Logowanie z błędnymi danymi', async ({ page }) => {
  // Przejdź do strony logowania
  await page.goto(`${baseUrl}/`);

  // Wprowadź błędne dane logowania
  await page.fill('input[name=username]', 'nieprawidlowyUzytkownik');
  await page.fill('input[name=password]', 'nieprawidloweHaslo');

  // Kliknij przycisk logowania
  await page.click('input[type=submit]');

  // Zweryfikuj, czy użytkownik otrzymuje odpowiedni komunikat błędu
  const errorMessage = await page.locator('p.error').innerText();
  await expect(errorMessage).toContain('An internal error has occurred and has been logged.');
});

test('Logowanie z pustymi polami', async ({ page }) => {
  // Przejdź do strony logowania
  await page.goto(`${baseUrl}/`);

  // Kliknij przycisk logowania bez wprowadzania danych
  await page.click('input[type=submit]');

  // Zweryfikuj, czy użytkownik otrzymuje odpowiedni komunikat o pustych polach
  const errorMessage = await page.locator('p.error').innerText();
  await expect(errorMessage).toContain('Please enter a username and password.');
});

test('Logowanie z błędnym hasłem', async ({ page }) => {
  // Przejdź do strony logowania
  await page.goto(`${baseUrl}/`);

  // Wprowadź poprawną nazwę użytkownika, ale błędne hasło
  await page.fill('input[name=username]', 'banktester');
  await page.fill('input[name=password]', 'nieprawidloweHaslo');

  // Kliknij przycisk logowania
  await page.click('input[type=submit]');

  // Zweryfikuj, czy użytkownik otrzymuje odpowiedni komunikat błędu
  const errorMessage = await page.locator('p.error').innerText();
  await expect(errorMessage).toContain('An internal error has occurred and has been logged.');
});

test('Przekierowanie niezalogowanego użytkownika', async ({ page }) => {
  // Przejdź bezpośrednio do chronionego zasobu
  await page.goto(`${baseUrl}/parabank/overview`);

  // Zweryfikuj, czy użytkownik zostaje przekierowany do strony logowania
  const errorMessage = await page.locator('p.error').innerText();
  await expect(errorMessage).toContain('The requested page /parabank/overview was not found on the server.');
});
