const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log('Navigating to root / ...');
    await page.goto('http://localhost:5179', { waitUntil: 'networkidle0' });

    // Check redirect
    const url = page.url();
    console.log(`Current URL: ${url}`);
    if (!url.endsWith('/demo/1')) {
        console.error('FAILED: Did not redirect to /demo/1');
        process.exit(1);
    } else {
        console.log('PASSED: Redirected to /demo/1');
    }

    // Check active class on 01
    const active01 = await page.$eval('.frame__demo--current', el => el.textContent.trim());
    if (active01 !== '01') {
        console.error(`FAILED: Active demo is ${active01}, expected 01`);
    } else {
        console.log('PASSED: Demo 01 is active');
    }

    // Click 02
    console.log('Clicking Demo 02...');
    const link02 = await page.$('a[href="/demo/2"]');
    if (link02) {
        await link02.click();
        // Wait for URL change
        await new Promise(r => setTimeout(r, 500));

        const newUrl = page.url();
        console.log(`New URL: ${newUrl}`);

        if (!newUrl.endsWith('/demo/2')) {
            console.error('FAILED: Did not navigate to /demo/2');
        } else {
            console.log('PASSED: Navigated to /demo/2');
        }

        // Check active class on 02
        const active02 = await page.$eval('.frame__demo--current', el => el.textContent.trim());
        if (active02 !== '02') {
            console.error(`FAILED: Active demo is ${active02}, expected 02`);
        } else {
            console.log('PASSED: Demo 02 is active');
        }
    } else {
        console.error('FAILED: Could not find link for 02');
    }

    await browser.close();
})();
