import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from "../support/pageFixtures";
import * as testData from "../test-data/checkout.json";

When("User proceeds to checkout {string}", async function (dataKey: string) {
  const data = testData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);
  await pageFixture.page.locator('[data-test="shopping-cart-link"]').click();
  const cartItem = pageFixture.page.locator(".inventory_item_name");
  await expect(cartItem).toHaveText(data.itemName, { timeout: 10000 });
  await pageFixture.page.getByRole("button", { name: "Checkout" }).click();
});

When(
  "User enters valid checkout information {string}",
  async function (dataKey: string) {
    const data = testData[dataKey];
    if (!data) throw new Error(`No data found for key "${dataKey}"`);
    await pageFixture.page
      .locator('[placeholder="First Name"]')
      .fill(data.firstName);
    await pageFixture.page
      .locator('[placeholder="Last Name"]')
      .fill(data.lastName);
    await pageFixture.page
      .locator('[placeholder="Zip/Postal Code"]')
      .fill(data.postalCode);
    await pageFixture.page.getByRole("button", { name: "continue" }).click();
    await expect(pageFixture.page.locator(".title")).toHaveText(
      "Checkout: Overview",
    );
  },
);

When("User confirms the order", async function () {
  await pageFixture.page.getByRole("button", { name: "Finish" }).click();
});

Then(
  "User should see the confirmation message {string}",
  async function (dataKey: string) {
    const data = testData[dataKey];
    if (!data) throw new Error(`No data found for key "${dataKey}"`);
    const confirmationMessage = await pageFixture.page
      .locator(".complete-header")
      .textContent();
    expect(confirmationMessage).toContain(data.message);
  },
);
