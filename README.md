# Prerequisites:
- JAVA is installed and JAVA_HOME environment path is set
- NODE is installed with version 18.15.0
- CHROME BWOSER is available in the system

# Steps to run tests:
1. Go to root folder geocomply:
    > cd geocomply
2. Install node modules:
    > npm install
3. Execute test:
    > npm run test
4. Generate and open test report:
    > npm run report
    
# Test Script Architecture:
2. WDIO framework:
    - ./package.json: specifying needed npm package for wdio, and set of run scripts (test, report)
    - ./ts.config.json: standard typescript configuration
    - ./wdio.conf.ts: standard wdio configuration to set test files, baseUrl, chromdriver service, mocha framework, allure reporters, onPrepare hook to delete previous run generated allure reporting, afterTest hook to takescreen of test failures to include in the report. 
1. Page Object Pattern:
    - ./tests/pageobjects/page.ts: base page class that contains function common to all page. E.g: goto function to open a web age
    - ./tests/pageobjects/upload.page.ts: upload page class extending base page to page objects and action functions
2. Test class:
    - ./tests/spec/upload.test.ts: test files to test Upload Feature
3. Allure reports:
    - ./allure-results: directory that contains generated test results
    - ./allure-report: directory that contains generated html report server
