/**
 * 配布バージョン作成プログラム
 */

const fs = require('node:fs');
const { zipPromise } = require('./lib/system.js');

const { version } = require('../package.json');

const renames = [
  {
    from: 'gitignore.txt',
    to: '.gitignore',
  },
];

(async () => {
  try {
    /**
     * ready plugins files
     */
    const copyFiles = fs.readdirSync('./app');
    fs.mkdirSync('Zoho', { recursive: true });
    fs.mkdirSync(`build/v${version}`, { recursive: true });

    /**
     * copy app directory files only
     */
    console.log('Copy app directory files.');
    copyFiles.forEach((file) => {
      fs.cpSync(`./app/${file}`, `Zoho/${file}`, { recursive: true });
    });

    /**
     * Rename files
     */
    console.log('Rename files.');
    console.log(renames);
    renames.forEach(({ from, to }) => {
      if (fs.existsSync(`Zoho/${from}`)) {
        fs.renameSync(`Zoho/${from}`, `Zoho/${to}`);
      }
    });

    await zipPromise('Zoho', `./build/v${version}/Zoho.zip`);
    fs.cpSync(`./build/v${version}/Zoho.zip`, './build/Zoho.zip');
  } catch (err) {
    console.log(err);
  } finally {
    fs.rmSync('Zoho', { recursive: true, force: true });
  }
})();
