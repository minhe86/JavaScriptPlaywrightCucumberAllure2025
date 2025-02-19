Playwright Automation Framework with CucumberJS & Allure Reporting
This repository contains an automation framework built using Playwright, JavaScript (ESM), CucumberJS, and Allure reporting for testing web applications.

This is still an ongoing project, current purpose is for skills pickup and demonstration. Play Playwright with Cucumber(BDD) by this project which is using cucumber runner now, try to cover passing test data via different ways: cucumber step argument, data table, csv file; support dynamic page creation, dynamic getLocators ...... will add more features soon, like api testing, accessibility testing... will also try to use playright runner using playwright.config.js to compare later....


Prerequisites
Ensure that you have the following installed:
Node.js (version >=14)
npm is recommended


Setup
1. Clone the Repository and Install Dependencies
Run the following command to install all the required dependencies:
    npm install

2. Configuration
Cucumber Configuration (cucumber.mjs): This file contains configurations specific to Cucumber, such as the location of feature files and the step definition files.

3. Configure Allure Reporting
To generate Allure reports after the tests run, make sure you have Allure installed globally or you can install it via npm install -g allure-commandline.

4. Running Tests
You can run your tests using the following command:
    npm run test
This will:
    Run the tests using CucumberJS.
    Generate the Allure report results inside the allure-results/ directory.

5. Viewing the Allure Report
After running the tests, you can generate and view the Allure report by running the following command:
    npm run report
This will open a web server and display the Allure report in your browser.


Screenshots
Passed Allure Result:


Failed Allure Result