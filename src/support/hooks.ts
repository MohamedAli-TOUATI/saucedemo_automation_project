import { Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import { pageFixture } from "./pageFixtures";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: false,timeout: 60000 });
  const page = await browser.newPage();
  pageFixture.page = page;
});
Before(function ({ pickle }) {
  
  const featureFile = pickle.uri; //src/features/cart.feature
  this.featureName = path.basename(featureFile, ".feature"); 
});


