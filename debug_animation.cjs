const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    console.log('Navigating to /demo/1 ...');
    await page.goto('http://localhost:5179/demo/1', { waitUntil: 'networkidle0' });

    // Get slide 0 (current)
    const slide0 = await page.$('.slide:nth-child(1)');

    console.log('Triggering scroll down...');
    await page.mouse.wheel({ deltaY: 100 });

    // Wait a bit for animation to start and React to potentially re-render
    await new Promise(r => setTimeout(r, 200));

    // Check opacity of slide 0
    const opacity = await page.evaluate(el => el.style.opacity, slide0);
    console.log(`Slide 0 opacity during animation: "${opacity}"`);

    if (opacity === '0') {
        console.error('FAILED: Slide 0 opacity became 0 during animation (likely React re-render issue)');
        process.exit(1);
    } else {
        console.log('PASSED: Slide 0 opacity is not 0 (likely 1 or unset)');
    }

    await browser.close();
})();
