const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    await page.setViewport({ width: 1200, height: 800 });

    console.log('Navigating to /demo/1 ...');
    await page.goto('http://localhost:5179/demo/1', { waitUntil: 'networkidle0' });

    // Check initial active slide (index 0)
    const initialOpacity = await page.$eval('.slide--current', el => getComputedStyle(el).opacity);
    console.log('Initial Slide Opacity:', initialOpacity);
    if (initialOpacity !== '1') {
        console.error('FAILED: Initial slide not visible');
    }

    // Trigger scroll down (next slide)
    console.log('Triggering scroll down...');
    await page.mouse.wheel({ deltaY: 100 });

    // Wait for animation (1.5s duration)
    await new Promise(r => setTimeout(r, 2000));

    // Check if slide changed (index 1 should be active)
    // We need to find which slide has .slide--current
    const activeSlideIndex = await page.evaluate(() => {
        const slides = document.querySelectorAll('.slide');
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('slide--current')) return i;
        }
        return -1;
    });

    console.log(`Active Slide Index after scroll: ${activeSlideIndex}`);

    if (activeSlideIndex === 1) {
        console.log('PASSED: Scrolled to next slide');
    } else {
        console.error(`FAILED: Did not scroll to next slide. Active index: ${activeSlideIndex}`);
    }

    await browser.close();
})();
