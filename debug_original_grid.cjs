const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    console.log('Navigating to original...');
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

    const styles = await page.evaluate(() => {
        const el = document.querySelector('.frame__demos');
        const style = window.getComputedStyle(el);
        return {
            display: style.display,
            gridTemplateColumns: style.gridTemplateColumns,
            gridTemplateRows: style.gridTemplateRows,
            height: style.height,
            width: style.width,
            childCount: el.children.length
        };
    });

    console.log('Original Styles:', JSON.stringify(styles, null, 2));
    await browser.close();
})();
