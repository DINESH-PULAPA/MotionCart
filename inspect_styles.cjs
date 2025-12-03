const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    async function getStyles(url) {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'networkidle0' });

        return await page.evaluate(() => {
            const getComputed = (selector, props) => {
                const el = document.querySelector(selector);
                if (!el) return `Element ${selector} not found`;
                const style = window.getComputedStyle(el);
                return props.reduce((acc, prop) => ({ ...acc, [prop]: style[prop] }), {});
            };

            return {
                title: getComputed('.frame__title-main', ['font-size', 'line-height', 'height', 'margin-bottom']),
                backLink: getComputed('.frame__back', ['font-size', 'line-height', 'height', 'padding', 'margin']),
                prevLink: getComputed('.frame__prev', ['font-size', 'line-height', 'height', 'padding', 'margin']),
                demosNav: getComputed('.frame__demos', ['height', 'padding', 'margin', 'grid-gap', 'line-height']),
                slidesNav: getComputed('.slides-nav', ['height', 'padding', 'margin']),
                frame: getComputed('.frame', ['grid-template-rows', 'grid-gap'])
            };
        });
    }

    try {
        const originalStyles = await getStyles('http://localhost:8080');
        const reactStyles = await getStyles('http://localhost:5179');

        const comparison = {
            original: originalStyles,
            react: reactStyles
        };

        fs.writeFileSync('style_comparison.json', JSON.stringify(comparison, null, 2));
        console.log('Style comparison saved to style_comparison.json');

        // Log differences
        console.log('\n--- COMPARISON ---');
        for (const section in originalStyles) {
            console.log(`\n[${section}]`);
            const o = originalStyles[section];
            const r = reactStyles[section];

            if (typeof o === 'string') {
                console.log(`Original: ${o}`);
                console.log(`React:    ${r}`);
                continue;
            }

            for (const prop in o) {
                if (o[prop] !== r[prop]) {
                    console.log(`${prop}:`);
                    console.log(`  Original: ${o[prop]}`);
                    console.log(`  React:    ${r[prop]}`);
                }
            }
        }

    } catch (err) {
        console.error(err);
    } finally {
        await browser.close();
    }
})();
