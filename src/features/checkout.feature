Feature: Checkout

Background:
  Given User navigates to the application

@checkout @TC005 @regression
Scenario: User adds a product to the cart and proceeds to payment
  Given User navigates to the application
  And User login with "validUser"
  When User adds "Item" to the cart
  And User proceeds to checkout "Item"
  And User enters valid checkout information "UserInformations"
  And User confirms the order
  Then User should see the confirmation message "ConfirmationMessage"