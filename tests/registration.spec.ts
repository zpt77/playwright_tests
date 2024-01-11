import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { UserData } from '../data/UserData';
import { generateRandomString } from '../utils/testUtils'

const baseUrl = 'https://parabank.parasoft.com';

test('Rejestracja nowego użytkownika', async ({ page }) => {
    const registrationPage = new RegistrationPage(page, baseUrl);
    await registrationPage.open();
    const username = generateRandomString(8,4);

    const userData: UserData = {
      firstName: 'John',
      lastName: 'tomzub52',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      phoneNumber: '555-1234',
      ssn: '123-45-6789',
      username: username,
      password: 'test'
    };
  
    await registrationPage.registerNewUser(userData);

    const pageContent = await page.content();    
    await page.screenshot({ path: 'after_registration.png' });
    console.log("username: " + username);
    
    await expect(pageContent).toContain("Customer Created");
  });
