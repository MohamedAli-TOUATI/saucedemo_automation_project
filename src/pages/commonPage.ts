import { Locator, Page, expect } from "@playwright/test";

export class CommonPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly titlePage: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToApp() {
    await this.page.goto(process.env.BASE_URL as string,{ timeout: 60000, waitUntil: 'load' });
  }

  async userLogin(username: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.locator("#login-button").click();
  }

  async verifyProductsPageVisible() {
    const titlePage = this.page.locator('.title:has-text("Products")');
    await this.page.waitForTimeout(500);
    await expect(titlePage).toBeVisible();
  }

  async addItemToCart(itemName: string) {
    await this.page.getByText(itemName).click();
    await this.addToCartButton.click();
  }
}
