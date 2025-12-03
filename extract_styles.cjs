const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5179', { waitUntil: 'networkidle0' });

    const styles = await page.evaluate(() => {
        const result = {
            fonts: new Set(),
            fontSizes: new Set(),
            colors: new Set(),
            backgroundColors: new Set(),
            mediaQueries: [],
            elementStyles: {}
        };

        // Extract Media Queries
        for (const sheet of document.styleSheets) {
            try {
                for (const rule of sheet.cssRules) {
                    if (rule instanceof CSSMediaRule) {
                        result.mediaQueries.push({
                            condition: rule.conditionText,
                            cssText: rule.cssText
                        });
                    }
                }
            } catch (e) {
                // Ignore cross-origin issues
            }
        }

        // Extract Computed Styles
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const style = getComputedStyle(el);
            result.fonts.add(style.fontFamily);
            result.fontSizes.add(style.fontSize);
            result.colors.add(style.color);
            result.backgroundColors.add(style.backgroundColor);

            // Capture specific element styles of interest
            const tagName = el.tagName.toLowerCase();
            const classes = Array.from(el.classList).join('.');
            const id = el.id ? '#' + el.id : '';
            const selector = `${tagName}${id}${classes ? '.' + classes : ''}`;

            if (!result.elementStyles[selector]) {
                result.elementStyles[selector] = {
                    fontFamily: style.fontFamily,
                    fontSize: style.fontSize,
                    color: style.color,
                    backgroundColor: style.backgroundColor,
                    display: style.display,
                    position: style.position,
                    width: style.width,
                    height: style.height
                };
            }
        });

        return {
            fonts: Array.from(result.fonts),
            fontSizes: Array.from(result.fontSizes).sort((a, b) => parseFloat(a) - parseFloat(b)),
            colors: Array.from(result.colors),
            backgroundColors: Array.from(result.backgroundColors),
            mediaQueries: result.mediaQueries,
            elementStyles: result.elementStyles
        };
    });

    console.log(JSON.stringify(styles, null, 2));
    await browser.close();
})();
