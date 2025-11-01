const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

async function makeArchive() {
  const outputPath = path.resolve(process.cwd(), 'artifact.zip');
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => resolve(outputPath));
    archive.on('error', (err) => reject(err));
    archive.pipe(output);

    // Add important project files
    archive.file('package.json', { name: 'package.json' });
    archive.file('index.js', { name: 'index.js' });
    archive.directory('lib/', 'lib');
    archive.file('README.md', { name: 'README.md' });

    archive.finalize();
  });
}

if (require.main === module) {
  makeArchive()
    .then((p) => console.log(`Artifact created: ${p}`))
    .catch((err) => {
      console.error('Failed to create artifact', err);
      process.exit(1);
    });
}

module.exports = makeArchive;
