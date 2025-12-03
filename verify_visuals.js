import puppeteer from 'puppeteer';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set viewport to a fixed size for consistent comparison
        await page.setViewport({ width: 1280, height: 800 });

        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
        page.on('requestfailed', request => {
            console.log(`REQUEST FAILED: ${request.url()} ${request.failure().errorText}`);
        });

        console.log('Capturing Original...');
        await page.goto('http://localhost:8080', { waitUntil: 'networkidle0', timeout: 30000 });
        const originalBuffer = await page.screenshot();
        fs.writeFileSync('original.png', originalBuffer);

        console.log('Capturing React Port...');
        await page.goto('http://localhost:5179', { waitUntil: 'networkidle0', timeout: 30000 });
        const reactBuffer = await page.screenshot();
        fs.writeFileSync('react.png', reactBuffer);

        await browser.close();

        const img1 = PNG.sync.read(originalBuffer);
        const img2 = PNG.sync.read(reactBuffer);

        console.log(`Original: ${img1.width}x${img1.height}`);
        console.log(`React: ${img2.width}x${img2.height}`);

        if (img1.width !== img2.width || img1.height !== img2.height) {
            console.error("FAILURE: Image dimensions do not match!");
            process.exit(1);
        }

        const { width, height } = img1;
        const diff = new PNG({ width, height });

        const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        fs.writeFileSync('diff.png', PNG.sync.write(diff));

        console.log(`Mismatch: ${numDiffPixels} pixels`);

        if (numDiffPixels === 0) {
            console.log("SUCCESS: 100% Match!");
        } else {
            console.log("FAILURE: Visual mismatch detected.");
        }
    } catch (err) {
        console.error("Fatal Error:", err);
        process.exit(1);
    }
})();
