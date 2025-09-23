import { When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../support/pageFixtures";
import { CheckoutPage } from "../pages/checkoutPage";
import * as testData from "../test-data/checkout.json";
import { expect } from "@playwright/test";

const checkoutPage = new CheckoutPage(pageFixture.page);

When("User proceeds to checkout {string}", async function (dataKey: string) {
  const data = testData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);

  await checkoutPage.goToCart();
  await checkoutPage.verifyCartItem(data.itemName);
  await checkoutPage.clickCheckout();
});

When("User enters valid checkout information {string}", async function (dataKey: string) {
  const data = testData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);

  await checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.postalCode);
  await checkoutPage.verifyOverviewPage();
});

When("User confirms the order", async function () {
  await checkoutPage.confirmOrder();
});

Then("User should see the confirmation message {string}", async function (dataKey: string) {
  const data = testData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);

  const message = await checkoutPage.getConfirmationMessage();
  expect(message).toContain(data.message);
});
