const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    const screenshotDir = path.join(__dirname, 'verification_screenshots');
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
    }

    const demos = Array.from({ length: 16 }, (_, i) => i + 1);
    const results = [];

    for (const demoId of demos) {
        console.log(`\n--- Testing Demo ${demoId} ---`);
        try {
            await page.goto(`http://localhost:5179/demo/${demoId}`, { waitUntil: 'networkidle0' });

            // Initial State Check
            const initialMetrics = await page.evaluate(() => {
                const current = document.querySelector('.slide--current');
                if (!current) return { error: 'No .slide--current found' };
                const style = getComputedStyle(current);
                const inner = current.querySelector('.slide__img');
                const innerStyle = inner ? getComputedStyle(inner) : null;
                return {
                    opacity: style.opacity,
                    visibility: style.visibility,
                    zIndex: style.zIndex,
                    bgImage: innerStyle ? innerStyle.backgroundImage : 'none',
                    transform: style.transform
                };
            });
            console.log(`Demo ${demoId} Start:`, initialMetrics);
            await page.screenshot({ path: path.join(screenshotDir, `demo_${demoId}_01_start.png`) });

            // Trigger Navigation
            await page.mouse.wheel({ deltaY: 100 });
            await new Promise(r => setTimeout(r, 2000)); // Wait for animation

            // After Navigation Check
            const afterMetrics = await page.evaluate(() => {
                const current = document.querySelector('.slide--current');
                if (!current) return { error: 'No .slide--current found' };
                const style = getComputedStyle(current);
                const inner = current.querySelector('.slide__img');
                const innerStyle = inner ? getComputedStyle(inner) : null;
                return {
                    opacity: style.opacity,
                    visibility: style.visibility,
                    zIndex: style.zIndex,
                    bgImage: innerStyle ? innerStyle.backgroundImage : 'none',
                    transform: style.transform
                };
            });
            console.log(`Demo ${demoId} After Nav:`, afterMetrics);
            await page.screenshot({ path: path.join(screenshotDir, `demo_${demoId}_02_nav.png`) });

            // Simple heuristic for pass/fail
            if (afterMetrics.opacity === '1' && afterMetrics.visibility === 'visible') {
                results.push({ id: demoId, status: 'OK' });
            } else {
                results.push({ id: demoId, status: 'FAIL', reason: 'Opacity/Visibility issue' });
                console.error(`!!! Demo ${demoId} seems broken.`);
            }

        } catch (e) {
            console.error(`ERROR Demo ${demoId}:`, e);
            results.push({ id: demoId, status: 'ERROR', reason: e.message });
        }
    }

    await browser.close();

    console.log('\n--- Summary ---');
    console.table(results);
})();
