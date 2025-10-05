Feature: Shopping Cart

  Background:
  Given User navigates to the application
  
  @cart @TC004 @regression
  Scenario: User adds a product to the cart
    When User login with "validUser"
    When User adds "Item" to the cart
    Then The cart badge should show "countBadge"
    When User removes "Item" from the cart
    Then the "Item" should not be in the cart
    And The cart badge should show "emptyBadge"