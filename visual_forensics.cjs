const puppeteer = require('puppeteer');
const fs = require('fs');
const { PNG } = require('pngjs');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 }); // Fixed viewport

    const elementsToCapture = [
        { name: 'title', selector: '.frame__title-main' },
        { name: 'article_link', selector: '.frame__back' },
        { name: 'prev_link', selector: '.frame__prev' },
        { name: 'demos_nav', selector: '.frame__demos' },
        { name: 'slides_nav', selector: '.slides-nav' },
        { name: 'first_demo_link', selector: '.frame__demo:nth-child(2)' }, // First link after span
        { name: 'nav_prev_button', selector: '.slides-nav__item--prev' }
    ];

    async function captureElements(url, prefix) {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Extract computed grid styles and specific element details
        const details = await page.evaluate(() => {
            const frame = document.querySelector('.frame');
            const title = document.querySelector('.frame__title');
            const back = document.querySelector('.frame__back');
            const frameStyle = window.getComputedStyle(frame);
            const titleStyle = window.getComputedStyle(title);

            return {
                gridTemplateColumns: frameStyle.gridTemplateColumns,
                gridTemplateRows: frameStyle.gridTemplateRows,
                gridTemplateAreas: frameStyle.gridTemplateAreas,
                titleWidth: title.getBoundingClientRect().width,
                titleComputedWidth: titleStyle.width,
                backLeft: back.getBoundingClientRect().left,
                gap: frameStyle.gap
            };
        });
        console.log(`[${prefix}] Layout Details:`, JSON.stringify(details, null, 2));

        const results = {};

        for (const el of elementsToCapture) {
            try {
                const elementHandle = await page.$(el.selector);
                if (elementHandle) {
                    const box = await elementHandle.boundingBox();
                    // Skip screenshots to avoid crashes
                    results[el.name] = { box };
                } else {
                    console.log(`Element ${el.name} not found in ${prefix}`);
                }
            } catch (e) {
                console.error(`Error capturing ${el.name} in ${prefix}:`, e);
            }
        }
        return results;
    }

    const original = await captureElements('http://localhost:8080', 'original');
    const react = await captureElements('http://localhost:5179', 'react');

    await browser.close();

    const logData = elementsToCapture.map(el => {
        const org = original[el.name];
        const rct = react[el.name];

        if (!org || !rct) return null;

        return {
            element: el.name,
            original: org.box,
            react: rct.box,
            diff: {
                x: rct.box.x - org.box.x,
                y: rct.box.y - org.box.y,
                w: rct.box.width - org.box.width,
                h: rct.box.height - org.box.height
            }
        };
    }).filter(Boolean);

    console.log(JSON.stringify(logData, null, 2));

})();
