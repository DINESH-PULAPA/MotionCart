const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    async function getElements(url) {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'networkidle0' });

        return await page.evaluate(() => {
            const extract = (selector) => {
                const els = Array.from(document.querySelectorAll(selector));
                return els.map(el => {
                    const rect = el.getBoundingClientRect();
                    const style = window.getComputedStyle(el);
                    return {
                        text: el.innerText.trim(),
                        x: rect.x,
                        y: rect.y,
                        width: rect.width,
                        height: rect.height,
                        font: style.fontFamily,
                        fontSize: style.fontSize,
                        lineHeight: style.lineHeight,
                        color: style.color
                    };
                });
            };

            return {
                title: extract('.frame__title-main'),
                backLink: extract('.frame__back'),
                prevLink: extract('.frame__prev'),
                demosLabel: extract('.frame__demos span'),
                demoLinks: extract('.frame__demo'),
                navButtons: extract('.slides-nav__item')
            };
        });
    }

    try {
        const original = await getElements('http://localhost:8080');
        const react = await getElements('http://localhost:5179');

        const report = { original, react, diffs: [] };

        // Compare
        for (const key in original) {
            const orgItems = original[key];
            const rctItems = react[key];

            orgItems.forEach((org, i) => {
                const rct = rctItems[i];
                if (!rct) {
                    report.diffs.push({ element: key, index: i, error: 'Missing in React' });
                    return;
                }

                const diff = {};
                let hasDiff = false;

                ['x', 'y', 'width', 'height'].forEach(prop => {
                    if (Math.abs(org[prop] - rct[prop]) > 0.5) { // 0.5px tolerance
                        diff[prop] = { original: org[prop], react: rct[prop], delta: rct[prop] - org[prop] };
                        hasDiff = true;
                    }
                });

                ['fontSize', 'lineHeight', 'font'].forEach(prop => {
                    if (org[prop] !== rct[prop]) {
                        diff[prop] = { original: org[prop], react: rct[prop] };
                        hasDiff = true;
                    }
                });

                if (hasDiff) {
                    report.diffs.push({ element: key, index: i, text: org.text, diff });
                }
            });
        }

        fs.writeFileSync('audit_report.json', JSON.stringify(report, null, 2));
        console.log('Audit complete. Found ' + report.diffs.length + ' discrepancies.');
        if (report.diffs.length > 0) {
            console.log(JSON.stringify(report.diffs, null, 2));
        }

    } catch (err) {
        console.error(err);
    } finally {
        await browser.close();
    }
})();
