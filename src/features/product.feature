Feature: Product Browsing

Background:
  Given User navigates to the application

@product @TC003 @smoke
Scenario: User can see the product list and sort products by price low to high
  When User login with "validUser"
  Then User should see the list of products
  And User sorts products by "Value"
  Then The products should be displayed in ascending order of price

