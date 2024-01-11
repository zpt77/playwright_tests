import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async open(): Promise<void> {
    await this.page.goto(this.baseUrl);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill('input[name=username]', username);
    await this.page.fill('input[name=password]', password);
    await this.page.click('input[type=submit]');
  }

  async getErrorMessage(): Promise<string | null> {
    const errorMessage = await this.page.locator('p.error');
    return errorMessage ? errorMessage.innerText() : null;
  }
}
