const fs = require('fs');
const { PNG } = require('pngjs');

function createComparison() {
    try {
        const img1 = PNG.sync.read(fs.readFileSync('original.png'));
        const img2 = PNG.sync.read(fs.readFileSync('react.png'));
        const { width, height } = img1;

        const dst = new PNG({ width: width * 2, height });

        PNG.bitblt(img1, dst, 0, 0, width, height, 0, 0);
        PNG.bitblt(img2, dst, 0, 0, width, height, width, 0);

        fs.writeFileSync('comparison.png', PNG.sync.write(dst));
        console.log('Comparison image created: comparison.png');
    } catch (e) {
        console.error('Error creating comparison:', e);
    }
}

createComparison();
