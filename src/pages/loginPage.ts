import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async waitForErrorMessage() {
    await this.errorMessage.waitFor({ state: "visible" });
  }
}
