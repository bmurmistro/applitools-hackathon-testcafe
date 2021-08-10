// next line is optional, just for IDEs autocomplete :
/// <reference types="@applitools/eyes-testcafe" />
import { ClientFunction, Selector } from 'testcafe';
import Eyes from '@applitools/eyes-testcafe';
const baseUrl = process.env.BASE_URL;
const {appName} = require('../applitools.config.js')
const batchId = `bid_${String(Math.random()).slice(2)}`;

// Initialize the eyes
const eyes = new Eyes();

// Set page used in the test
fixture`${appName}`
    .page(baseUrl)
    .beforeEach( async t => {
        await eyes.open({
            batchId,
            t, // pass testcafe controller
            // we are getting this from the applitools.config.js
            //appName: 'Demo App - Testcafe - Ultrafast' ,
            testName: t.testRun.test.name,
        });
    })
    // Call Close on eyes to let the server know it should display the results
    .afterEach(async () => eyes.close())
    .after(async () => {
        // Wait and collect all test results
        // we pass false to this method to suppress the exception that is thrown if we
        // find visual differences
        let allTestResults = await eyes.waitForResults(false)
        // Print results
        console.log(allTestResults)
    });

test('Display Elements of Authentication Page', async t => {
    // visual Validation
    await eyes.checkWindow({
        target: 'window',
    });
});

test('Login Attempt no username and no password', async t => {
    await t
        .click(Selector("#log-in"));
        // visual Validation
    await eyes.checkWindow({
         target: 'window',
     });
});

test('Login Attempt Only Username', async t => {
    await t
        .typeText(Selector("#username"), "demo@applitools.com")
        .click(Selector("#log-in"));
        // visual Validation
    await eyes.checkWindow({
         target: 'window',
     });
    await t
        .selectText(Selector("#username"))
        .pressKey("delete");
});

test('Login Attempt Only Password', async t => {
    await t
        .typeText(Selector("#password"), "password")
        .click(Selector("#log-in"));
        // visual Validation
    await eyes.checkWindow({
         target: 'window',
    });
    await t
        .selectText(Selector("#password"))
        .pressKey("delete");
});

test('Login Attempt Success', async t => {
    await t
        .typeText(Selector("#username"), "demo@applitools.com")
        .typeText(Selector("#password"), "password")
        .click(Selector("#log-in"));
    // visual Validation
    await eyes.checkWindow({
       target: 'window',
    });
});