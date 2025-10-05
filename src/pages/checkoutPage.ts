import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly cartLink : Locator;
  readonly productName: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;    
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.productName = page.locator(".inventory_item_name");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    this.firstNameInput = page.locator('[placeholder="First Name"]');
    this.lastNameInput = page.locator('[placeholder="Last Name"]');
    this.postalCodeInput = page.locator('[placeholder="Zip/Postal Code"]');
    this.continueButton = page.getByRole("button", { name: "continue" }); 
    this.finishButton = page.getByRole("button", { name: "Finish" });
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async verifyCartItem(itemName: string) {
    await expect(this.productName).toHaveText(itemName, { timeout: 10000 });
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async verifyOverviewPage() {
    await expect(this.page.locator(".title")).toHaveText("Checkout: Overview");
  }

  async confirmOrder() {
    await this.finishButton.click();
  }

  async getConfirmationMessage(): Promise<string | null> {
    return await this.page.locator(".complete-header").textContent();
  }
}
