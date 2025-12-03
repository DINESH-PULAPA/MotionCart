const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log('Navigating to http://localhost:5179 ...');
    await page.goto('http://localhost:5179', { waitUntil: 'networkidle0' });

    const initialUrl = page.url();
    console.log(`Initial URL: ${initialUrl}`);

    // Click on Demo 2 button (index 1)
    console.log('Clicking on Demo 2...');
    const demoButtons = await page.$$('.frame__demo');
    if (demoButtons.length < 2) {
        console.error('FAILED: Could not find demo buttons');
        await browser.close();
        process.exit(1);
    }

    await demoButtons[1].click();
    await new Promise(r => setTimeout(r, 1000)); // Wait for transition

    const newUrl = page.url();
    console.log(`New URL: ${newUrl}`);

    if (initialUrl !== newUrl) {
        console.error('FAILED: URL changed!');
    } else {
        console.log('PASSED: URL remained constant.');
    }

    // Verify content changed (check for active class on button)
    const activeDemo = await page.evaluate(() => {
        const active = document.querySelector('.frame__demo--current');
        return active ? active.textContent : null;
    });
    console.log(`Active Demo Button: ${activeDemo}`);

    if (activeDemo === '02') {
        console.log('PASSED: Active demo updated to 02.');
    } else {
        console.error(`FAILED: Active demo is ${activeDemo}, expected 02.`);
    }

    await browser.close();
})();
