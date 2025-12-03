const { exec } = require('child_process');

const commitMsg = `Auto-save: ${new Date().toISOString()}`;

exec('git add .', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error adding files: ${err}`);
        return;
    }
    exec(`git commit -m "${commitMsg}"`, (err, stdout, stderr) => {
        if (err) {
            // Ignore empty commit errors
            if (err.message.includes('nothing to commit')) {
                console.log('Nothing to commit.');
            } else {
                console.error(`Error committing: ${err}`);
            }
            return;
        }
        console.log(`Saved state: ${commitMsg}`);
    });
});
