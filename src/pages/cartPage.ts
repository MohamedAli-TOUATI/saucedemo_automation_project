import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartItems = page.locator(".inventory_item_name");
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCartBadgeText(): Promise<string> {
    const badge = this.cartBadge;
    // attendre que l'élément existe et soit visible
    if ((await badge.count()) === 0) {
        await badge.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    }

    if ((await badge.count()) === 0) {
        return ""; // toujours pas trouvé
    }
    return (await badge.textContent())?.trim() ?? "";
  }

  async removeItem(itemName: string) {
    const count = await this.cartItems.count();
    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i).textContent();
      if (name?.trim() === itemName) {
        await this.page.getByRole("button", { name: "remove" }).nth(i).click();
        return true;
      }
    }
    return false;
  }

  async isItemInCart(itemName: string): Promise<boolean> {
    const itemLocator = this.page.locator('[data-test="inventory-item-name"]', {
      hasText: itemName,
    });
    return (await itemLocator.count()) > 0;
  }
}
