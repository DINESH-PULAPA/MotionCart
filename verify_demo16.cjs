const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    console.log('Navigating to /demo/16 ...');
    await page.goto('http://localhost:5179/demo/16', { waitUntil: 'networkidle0' });

    // Check if decos exist
    const decoCount = await page.$$eval('.deco', decos => decos.length);
    console.log('Deco count:', decoCount);

    if (decoCount === 0) {
        console.error('FAILED: No deco elements found');
    }

    // Trigger navigation
    console.log('Triggering scroll down...');
    await page.mouse.wheel({ deltaY: 100 });

    // Wait and check periodically
    for (let i = 0; i < 10; i++) {
        await new Promise(r => setTimeout(r, 500));
        const opacity = await page.$eval('.slide--current', el => getComputedStyle(el).opacity);
        console.log(`Time ${i * 0.5}s: Current slide opacity: ${opacity}`);
        if (opacity === '1') {
            console.log('PASSED: Slide became visible');
            await browser.close();
            process.exit(0);
        }
    }

    console.error('FAILED: Slide never became visible');
    await browser.close();
    process.exit(1);
})();
