import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from "../support/pageFixtures";
import * as testData from "../test-data/cart.json";
import { CartPage } from "../pages/cartPage";

Then("The cart badge should show {string}",{timeout:10000}, async function (dataKey: string) {
  const cartePage = new CartPage(pageFixture.page);
  const data = testData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);
  const badgeText = await cartePage.getCartBadgeText();
  await cartePage.page.waitForTimeout(1000); // 
  console.log(`Badge actuel pour ${dataKey} :`, badgeText);
  
  expect(badgeText).toBe(data.count);
});

When("User removes {string} from the cart", async function (dataKey: string) {
  const cartePage = new CartPage(pageFixture.page);
  const data = testData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);
  await cartePage.openCart();

  const removed = await cartePage.removeItem(data.itemName);

  if (!removed) {
    console.log(`❌ Item "${data.itemName}" does not exist in the cart`);
  }
});

Then(
  "the {string} should not be in the cart",
  async function (dataKey: string) {
    const cartePage = new CartPage(pageFixture.page);
    const data = testData[dataKey];
    if (!data) throw new Error(`No data found for key "${dataKey}"`);
    await cartePage.openCart();
    const exist = await cartePage.isItemInCart(data.itemName);
    expect(exist).toBe(false);
  },
);



