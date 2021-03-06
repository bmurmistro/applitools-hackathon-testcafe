const batchId = `bid_${String(Math.random()).slice(2)}`;
module.exports = {
    apiKey: process.env.APPLITOOLS_API_KEY || 'your APPLITOOLS_API_KEY',
    batchName: '[Team Name] Testcafe Batch',
    appName: '[Team Name] Testcafe App',
    batchId,
    browser: [
        // Add browsers with different viewports
        {width: 800, height: 600, name: 'chrome'},
        {width: 700, height: 500, name: 'firefox'},
        {width: 1600, height: 1200, name: 'ie11'},
        {width: 1024, height: 768, name: 'edgechromium'},
        {width: 800, height: 600, name: 'safari'},
        // Add mobile emulation devices in Portrait mode
        {deviceName: 'iPhone X', screenOrientation: 'portrait'},
        {deviceName: 'Pixel 2', screenOrientation: 'portrait'}
    ],
    // specify Eyes concurrency level
    testConcurrency: 30
}
