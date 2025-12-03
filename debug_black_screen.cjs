const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));

    console.log('Navigating to http://localhost:5179 ...');
    await page.goto('http://localhost:5179', { waitUntil: 'networkidle0' });

    // Check Frame
    const frame = await page.$('.frame');
    if (frame) {
        const frameStyle = await page.evaluate(el => {
            const style = getComputedStyle(el);
            return {
                zIndex: style.zIndex,
                backgroundColor: style.backgroundColor,
                width: style.width,
                height: style.height
            };
        }, frame);
        console.log('Frame Style:', frameStyle);
    }

    // Check Slide 0
    const slide = await page.$('.slide--current');
    if (slide) {
        const slideInfo = await page.evaluate(el => {
            const rect = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            const inner = el.querySelector('.slide__img');
            const innerRect = inner ? inner.getBoundingClientRect() : null;
            const innerStyle = inner ? getComputedStyle(inner) : null;

            return {
                rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
                opacity: style.opacity,
                visibility: style.visibility,
                display: style.display,
                zIndex: style.zIndex,
                innerRect: innerRect ? { width: innerRect.width, height: innerRect.height } : null,
                bgImage: innerStyle ? innerStyle.backgroundImage : null
            };
        }, slide);
        console.log('Current Slide Info:', slideInfo);

        // Try to fetch the image
        if (slideInfo.bgImage) {
            const urlMatch = slideInfo.bgImage.match(/url\("?(.*?)"?\)/);
            if (urlMatch) {
                const imageUrl = urlMatch[1];
                console.log(`Fetching image: ${imageUrl}`);
                try {
                    const response = await page.goto(imageUrl);
                    console.log(`Image fetch status: ${response.status()}`);
                } catch (e) {
                    console.error(`Failed to fetch image: ${e.message}`);
                }
            }
        }
    } else {
        console.error('No current slide found!');
    }

    await browser.close();
})();
