import { Locator, Page, expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productsPrice: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator(".inventory_item_name");
    this.productsPrice = page.locator(".inventory_item_price");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async sortProductsByPrice(option: string) {
    await this.sortDropdown.selectOption(option);
    await expect(this.page.locator(".inventory_item_price").first()).toHaveText(
      "$7.99",
    );
  }

  async verifyPricesAreSortedAscending() {
    const count = await this.productsPrice.count();
    await this.page.waitForTimeout(500);
    let prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const priceText = await this.productsPrice.nth(i).innerText();
      prices.push(parseFloat(priceText.replace("$", "")));
    }

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  }
}
