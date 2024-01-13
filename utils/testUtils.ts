import { RegistrationPage } from "../pages/RegistrationPage";
import { Page } from "playwright/test";
import { UserData } from "../data/UserData";

export function generateRandomString(lettrCount: number, digitCount: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
  
    const randomLetters = Array.from({ length: lettrCount }, () => letters[Math.floor(Math.random() * letters.length)]);
    const randomDigits = Array.from({ length: digitCount }, () => digits[Math.floor(Math.random() * digits.length)]);
  
    return randomLetters.concat(randomDigits).join('');
  }


export async function createNewUser(registrationPage: RegistrationPage){
    
  const username = generateRandomString(4,2)
  const password = 'test'; 

  const userData: UserData = {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      phoneNumber: '555-1234',
      ssn: '123-45-6789',
      username: username,
      password: password,
  };

    await registrationPage.registerNewUser(userData);
    return { username, password };
}