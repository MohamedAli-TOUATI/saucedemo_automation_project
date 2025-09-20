Feature: SauceDemo Login

Background:
  Given User navigates to the application

@TC001 @smoke
Scenario Outline: Login with valid user
When User login with "<userCredential>"
Then User should "<expectedResult>"

Examples:
  | index | userCredential | expectedResult |
  | 1     | validUser      | see list of products |

@TC002 @regression
Scenario Outline: Login with invalid user
When User login with "<userCredential>"
Then User should "<expectedResult>"

Examples:
  | index | userCredential | expectedResult       |
  | 2     | invalidUser    | see error message "errorMessage" |
    
