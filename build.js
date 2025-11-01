const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

async function makeArchive() {
  const outputPath = path.resolve(process.cwd(), 'artifact.zip');
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`Archive finalized. Total bytes: ${archive.pointer()}`);
      resolve(outputPath);
    });
    archive.on('error', (err) => reject(err));
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Warning:', err.message);
      } else {
        reject(err);
      }
    });
    
    archive.pipe(output);

    // Add important project files (check existence first)
    const filesToAdd = ['package.json', 'index.js', 'README.md'];
    filesToAdd.forEach(file => {
      if (fs.existsSync(file)) {
        archive.file(file, { name: file });
        console.log(`Added: ${file}`);
      } else {
        console.warn(`Skipping missing file: ${file}`);
      }
    });

    // Add lib directory if it exists
    if (fs.existsSync('lib')) {
      archive.directory('lib/', 'lib');
      console.log('Added: lib/');
    } else {
      console.warn('Skipping missing directory: lib/');
    }

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
