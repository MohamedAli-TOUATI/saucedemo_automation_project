import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async verifyCartItem(itemName: string) {
    const cartItem = this.page.locator(".inventory_item_name");
    await expect(cartItem).toHaveText(itemName, { timeout: 10000 });
  }

  async clickCheckout() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[placeholder="First Name"]').fill(firstName);
    await this.page.locator('[placeholder="Last Name"]').fill(lastName);
    await this.page.locator('[placeholder="Zip/Postal Code"]').fill(postalCode);
    await this.page.getByRole("button", { name: "continue" }).click();
  }

  async verifyOverviewPage() {
    await expect(this.page.locator(".title")).toHaveText("Checkout: Overview");
  }

  async confirmOrder() {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }

  async getConfirmationMessage(): Promise<string | null> {
    return await this.page.locator(".complete-header").textContent();
  }
}
