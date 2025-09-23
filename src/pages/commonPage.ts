import { Locator, Page, expect } from "@playwright/test";

export class CommonPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');  
  }

  async navigateToApp() {
    await this.page.goto(process.env.BASE_URL as string,{ timeout: 60000, waitUntil: 'load' });
  }

  async userLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
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
