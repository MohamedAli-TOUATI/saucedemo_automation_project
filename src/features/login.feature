Feature: SauceDemo Login

Background:
  Given User navigates to the application

@TC001 @smoke @regression
Scenario Outline: Login functionality
When User login with "<userCredential>"
Then User should "<expectedResult>" 

Examples:
  |index| userCredential |expectedResult
  | 1 | validUser | see list of products
  | 2 | invalidUser | see error message "errorMessage"
    
