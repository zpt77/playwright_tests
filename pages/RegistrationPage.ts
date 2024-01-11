import { Page } from '@playwright/test';
import { UserData } from '../data/UserData';

export class RegistrationPage {
  private page: Page;
  private baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async open(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/parabank/register.htm`);
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async registerNewUser(userData: UserData): Promise<void> {
    await this.page.fill('input[id="customer.firstName"]', userData.firstName);
    await this.page.fill('input[id="customer.lastName"]', userData.lastName);
    await this.page.fill('input[id="customer.address.street"]', userData.address);
    await this.page.fill('input[id="customer.address.city"]', userData.city);
    await this.page.fill('input[id="customer.address.state"]', userData.state);
    await this.page.fill('input[id="customer.address.zipCode"]', userData.zipCode);
    await this.page.fill('input[id="customer.phoneNumber"]', userData.phoneNumber);
    await this.page.fill('input[id="customer.ssn"]', userData.ssn);
    await this.page.fill('input[id="customer.username"]', userData.username);
    await this.page.fill('input[id="customer.password"]', userData.password);
    await this.page.fill('input[id="repeatedPassword"]', userData.password); // Confirm password

    await this.page.click('input[type="submit"][value="Register"]');

  }
}
