const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Headless false to see what's happening
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));

    try {
        console.log('Navigating to Demo 1...');
        await page.goto('http://localhost:5179/demo/1', { waitUntil: 'networkidle0' });

        // Go to last slide (index 4)
        console.log('Navigating to last slide...');
        for (let i = 0; i < 4; i++) {
            await page.mouse.wheel({ deltaY: 100 });
            await new Promise(r => setTimeout(r, 1500)); // Wait for animation
        }

        // Verify we are on slide 5
        // (We can't easily verify index without exposing it, but we can assume we are there)

        console.log('Switching to Demo 11 (fewer slides)...');
        // Click the link for Demo 11
        await page.click('a[href="/demo/11"]');

        await new Promise(r => setTimeout(r, 1000)); // Wait for transition

        // Check visibility
        const slideVisible = await page.evaluate(() => {
            const current = document.querySelector('.slide--current');
            if (!current) return false;
            return getComputedStyle(current).opacity === '1';
        });

        console.log(`Slide visible after switch: ${slideVisible}`);

        if (!slideVisible) {
            console.error('FAILED: Black screen detected.');

            // Debug info
            const debug = await page.evaluate(() => {
                const slides = document.querySelectorAll('.slide');
                return {
                    count: slides.length,
                    currentExists: !!document.querySelector('.slide--current'),
                    opacities: Array.from(slides).map(s => getComputedStyle(s).opacity)
                };
            });
            console.log('Debug Info:', debug);
        } else {
            console.log('PASSED: Slide is visible.');
        }

        // Test rapid switching
        console.log('Testing rapid switching...');
        for (let i = 1; i <= 5; i++) {
            console.log(`Switching to Demo ${i}...`);
            await page.click(`a[href="/demo/${i}"]`);
            await new Promise(r => setTimeout(r, 200)); // Fast switch
        }

        await new Promise(r => setTimeout(r, 1000));
        const finalVisible = await page.evaluate(() => {
            const current = document.querySelector('.slide--current');
            if (!current) return false;
            return getComputedStyle(current).opacity === '1';
        });
        console.log(`Slide visible after rapid switching: ${finalVisible}`);


    } catch (e) {
        console.error('Error:', e);
    } finally {
        await browser.close();
    }
})();
