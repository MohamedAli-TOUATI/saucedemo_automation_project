Feature: SauceDemo Login

Background:
  Given User navigates to the application

@login @TC001 @smoke
Scenario: Login with valid user
When User login with "validUser"
Then User should "expectedResult"



@login @TC002 @regression
Scenario: Login with invalid user
When User login with "invalidUser"
Then User should "expectedResult"


    
