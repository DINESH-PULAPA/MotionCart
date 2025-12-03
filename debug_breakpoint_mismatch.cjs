const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const widths = [840, 847, 848, 849, 860];
    const urls = [
        { name: 'Original', url: 'http://localhost:8080' },
        { name: 'React', url: 'http://localhost:5179' }
    ];

    console.log('Checking breakpoints...');

    for (const width of widths) {
        console.log(`\nTesting Width: ${width}px`);
        await page.setViewport({ width, height: 800 });

        for (const site of urls) {
            await page.goto(site.url, { waitUntil: 'networkidle0' });
            const layout = await page.evaluate(() => {
                const frame = document.querySelector('.frame');
                const style = window.getComputedStyle(frame);
                return style.gridTemplateAreas;
            });

            // Simplify output
            const isDesktop = layout.includes('title back prev demos') || layout.includes('title_back_prev_demos');
            console.log(`${site.name}: ${isDesktop ? 'DESKTOP (1 line)' : 'MOBILE (2+ lines)'} (${layout.replace(/\n/g, ' ').substring(0, 20)}...)`);
        }
    }

    await browser.close();
})();
