const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    console.log('Navigating to /demo/2 ...');
    await page.goto('http://localhost:5179/demo/2', { waitUntil: 'networkidle0' });

    // Check initial active slide (should be first image of demo 2 set, which is 6.jpg)
    // But in our implementation, we reset current index to 0 for each demo, so it should be the first slide of the demo.
    // The image URL should contain "6.jpg"
    const initialSlideBg = await page.$eval('.slide--current .slide__img', el => el.style.backgroundImage);
    console.log('Initial Slide BG:', initialSlideBg);

    if (!initialSlideBg.includes('6.jpg')) {
        console.error('FAILED: Initial slide does not contain 6.jpg');
        process.exit(1);
    }

    // Trigger scroll down (next slide)
    console.log('Triggering scroll down...');
    await page.mouse.wheel({ deltaY: 100 });

    // Wait for animation (1.5s duration)
    await new Promise(r => setTimeout(r, 2000));

    // Check if slide changed (index 1 should be active, which corresponds to 7.jpg)
    const activeSlideBg = await page.$eval('.slide--current .slide__img', el => el.style.backgroundImage);
    console.log('Active Slide BG after scroll:', activeSlideBg);

    if (activeSlideBg.includes('7.jpg')) {
        console.log('PASSED: Scrolled to next slide (7.jpg)');
    } else {
        console.error('FAILED: Did not scroll to next slide');
        process.exit(1);
    }

    await browser.close();
})();
