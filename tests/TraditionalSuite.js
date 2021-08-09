// next line is optional, just for IDEs autocomplete :
/// <reference types="@applitools/eyes-testcafe" />
import { ClientFunction, Selector } from 'testcafe';
import Eyes from '@applitools/eyes-testcafe';
const baseUrl = process.env.BASE_URL;
const {appName} = require('../applitools.config.js')

// Initialize the eyes
const eyes = new Eyes();


// Set page used in the test
//fixture`Testcafe Demo App`.page`https://demo.applitools.com`
fixture `${appName}`.page `${baseUrl}`;
    // Call Close on eyes to let the server know it should display the results
    //.afterEach(async () => eyes.close())
    //.after(async () => {
        // Wait and collect all test results
        // we pass false to this method to suppress the exception that is thrown if we
        // find visual differences
        //let allTestResults = await eyes.waitForResults(false)
        // Print results
        //console.log(allTestResults)
    //});

// Assert Text of Login Form
test("Login Form", async t => {
    await t
        .expect(Selector(".auth-header").innerText).contains("Login Form");
});

// Assert Text of UserName Label
test("Username", async t => {
    await t
        .expect(Selector("form > div:nth-child(1) > label").innerText).contains("Username");
});

// Assert Text of UserName Element

test("Enter your username", async t => {
    await t
        .expect(Selector("#username").getAttribute('placeholder')).eql("Enter your username");
});

// Assert Text of Password Label
test("Password", async t => {
    await t
        .expect(Selector("form > div:nth-child(2) > label").innerText).contains("Password");
});

// Assert Text of Password Element
test("Enter your password", async t => {
    await t
        .expect(Selector("#password").getAttribute('placeholder')).eql("Enter your password");
});

// Assert Text of Login Element
test("Log In", async t => {
    await t
        .expect(Selector("#log-in").innerText).contains("Log In");
});

// Assert Text of Remember Me Element
test("Remember Me", async t => {
    await t
        .expect(Selector(".form-check-label").innerText).contains("Remember Me");
});

// Assert User Icon is Visible
test("Logo", async t => {
    await t
        .expect(Selector(".logo-w > a > img").visible).ok();
});

// Assert User Icon is Visible
test("User icon is visible", async t => {
    await t
        .expect(Selector(".pre-icon.os-icon.os-icon-user-male-circle").visible).ok();
});

// Assert Fingerprint Icon is Visible
test("Fingerprint icon is visible", async t => {
    await t
        .expect(Selector(".pre-icon.os-icon.os-icon-fingerprint").visible).ok();
});

// Assert Twitter Icon is Visible
test("Twitter icon is visible", async t => {
    await t
        .expect(Selector("a:nth-child(1) > img").visible).ok();
});

// Assert Facebook Icon is Visible
test("Facebook icon is visible", async t => {
    await t
        .expect(Selector("a:nth-child(2) > img").visible).ok();
});

// Assert Linkdin Icon is Visible
test("LinkedIn icon is visible", async t => {
    await t
        .expect(Selector("a:nth-child(3) > img").visible).ok();
});

// Assert CheckBox isn't selected
test("Checkbox isn't checked", async t => {
    await t
        .expect(Selector(".form-check-input").checked).notOk();
});

test("Both Username and Password must be present", async t => {
    await t
        .click(Selector("#log-in"))
        .expect(Selector(".alert-warning").innerText).contains("Both Username and Password must be present");
});

test("Password must be present", async t => {
    await t
        .typeText(Selector("#username"), "demo@applitools.com")
        .click(Selector("#log-in"))
        .expect(Selector(".alert-warning").innerText).contains("Password must be present");
});

test("Username must be present", async t => {
    await t
        .selectText(Selector("#password"))
        .pressKey("delete")
        .typeText(Selector("#password"), "password")
        .click(Selector("#log-in"))
        .expect(Selector(".alert-warning").innerText).contains("Username must be present");
});

test("Should log you in", async t => {
    const getURL = ClientFunction(() => window.location.href);
    await t
        .typeText(Selector("#username"), "demo@applitools.com")
        .typeText(Selector("#password"), "password")
        .click(Selector("#log-in"))
        .expect(getURL()).eql("https://demo.applitools.com/hackathonApp.html");
});
