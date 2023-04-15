import type { Options } from '@wdio/types'
import * as fs from 'fs';

export const config: Options.Testrunner = {

    // ====================
    // Runner Configuration
    // ====================    
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },  

    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.ts'
    ],
    // Patterns to exclude.
    exclude: [
        './test/specs/**/example.e2e.ts'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    baseUrl: 'https://demo.guru99.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    // services: ['devtools'],
    services: [
        ['chromedriver', {
            logFileName: 'wdio-chromedriver.log', // default
            outputDir: 'driver-logs', // overwrites the config.outputDir
            args: ['--silent']
        }]
    ],
    
    // Framework supported: Mocha, Jasmine, and Cucumber
    framework: 'mocha',
    reporters: ['spec',['allure', {outputDir: 'allure-results',
                                disableWebdriverStepsReporting: false,
                                disableWebdriverScreenshotsReporting: false,}]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Preparing for worker process
    onPrepare: async function () {
        try {
            for (let dir of ['allure-report', 'allure-results']) {
                console.log(`--- deleting ${dir} directory if exists...`);
                if (fs.existsSync(dir)) {
                    fs.rmSync(dir, {recursive: true, force: true});
                }
            }  
        } catch (error) {
            console.log(error);
        }
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
}
