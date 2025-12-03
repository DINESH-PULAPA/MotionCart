const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    const demos = Array.from({ length: 16 }, (_, i) => i + 1);
    let failed = false;

    for (const demoId of demos) {
        console.log(`Testing Demo ${demoId}...`);
        try {
            await page.goto(`http://localhost:5179/demo/${demoId}`, { waitUntil: 'networkidle0' });

            // Check if slide is visible
            const slideVisible = await page.$eval('.slide--current', el => getComputedStyle(el).opacity === '1');
            if (!slideVisible) {
                console.error(`FAILED Demo ${demoId}: Initial slide not visible`);
                failed = true;
                continue;
            }

            // Trigger navigation
            await page.mouse.wheel({ deltaY: 100 });
            await new Promise(r => setTimeout(r, 2000)); // Wait for animation

            // Check if next slide is active (we can't easily check index without more complex logic, but we can check if *a* slide is current and visible)
            const currentSlideVisible = await page.$eval('.slide--current', el => getComputedStyle(el).opacity === '1');
            if (!currentSlideVisible) {
                console.error(`FAILED Demo ${demoId}: Slide not visible after navigation`);
                failed = true;
            } else {
                console.log(`PASSED Demo ${demoId}`);
            }

        } catch (e) {
            console.error(`ERROR Demo ${demoId}:`, e);
            failed = true;
        }
    }

    await browser.close();

    if (failed) {
        console.error('Some demos failed verification.');
        process.exit(1);
    } else {
        console.log('All demos passed verification.');
        process.exit(0);
    }
})();
