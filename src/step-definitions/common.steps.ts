import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../support/pageFixtures";
import * as loginData from "../test-data/login.json";
import * as cartData from "../test-data/cart.json";
import * as checkoutData from "../test-data/checkout.json";
import { CommonPage } from "../pages/commonPage";

Given("User navigates to the application", async function () {
  const commonPage = new CommonPage(pageFixture.page);
  commonPage.navigateToApp();
});

When("User login with {string}",{timeout: 10000}, async function (dataKey: string) {
  const data = loginData[dataKey];
  if (!data) throw new Error(`No data found for key "${dataKey}"`);
  const commonPage = new CommonPage(pageFixture.page);
  await commonPage.userLogin(data.username, data.password);
});

Then("User should see the list of products", async function () {
  const commonPage = new CommonPage(pageFixture.page);
  commonPage.verifyProductsPageVisible();
});

When("User adds {string} to the cart", async function (dataKey: string) {
  const commonPage = new CommonPage(pageFixture.page);
  let testData: any;

  switch (this.featureName?.toLowerCase()) {
    case "cart":
      testData = cartData[dataKey];
      break;
    case "checkout":
      testData = checkoutData[dataKey];
      break;
    default:
      throw new Error(`Unsupported feature name: ${this.featureName}`);
  }

  if (!testData) {
    throw new Error(`No data found for key "${dataKey}" in feature "${this.featureName}"`);
  }

  console.log(`🛒 Adding item "${testData.itemName}" to the cart...`);
  await commonPage.addItemToCart(testData.itemName);
  console.log(`✅ Item "${testData.itemName}" added successfully.`);
});
