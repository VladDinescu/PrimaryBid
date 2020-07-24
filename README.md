# PrimaryBid Cypress Test



## Setup
1. Clone the repo
2. Install dependencies `npm install`
3. Create a cypress.env.json file inside the project root giving values to the following constants:
  * authUsername = `(ASK the PrimaryBid Employees - Environment Username)`
  * authPassword = `(ASK PrimaryBid Employees - Environment Password)`
  * baseURL = `(ASK PrimaryBid Employees - URL to test environment)`
  * about = `/about`
  * news = `/news`
  * faqs = `/faqs`
  * signup = `/user/signup`
  * signupForm=`/user/personal-details?step=2`
  * signupSelectBroker = `/user/select-broker`
  * signupLegal = `/legal`
  * signupVetting = `/user/vetting`
  * signupPersonalDetails = `/user/personal-details`
  * invalidEmail = `Any String without @ and .domain`
  * validPassword = `Random String`
  * invalidPassword = `Random String different than validPassword`
  
## Running your tests
1. Using the Cypress UI:
    - Open a terminal and type: `npm run cypress`
    - Press on any of the 3 test files to execute them

2. Using CLI:
    - To run all tests: `npm run cypress:all`
    - To run all Navigation tests: `cypress:navigation`
    - To run all News tests: `npm run cypress:news`
    - To run all Sign Up tests: `npm run cypress:signUp`

## Notes
This Framework can still be refined:
 - Abstracting test steps using methods. (Reducing the number of lines inside tests - Not developed due to short work time frame)
 - Reading from a file (Web Element locators)

