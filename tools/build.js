/**
 * 配布バージョン作成プログラム
 */

const fs = require('fs-extra');
const co = require('co');
const { zipPromise } = require('./lib/system.js');

const { version } = require('../package.json');

const renames = [
  {
    from: 'gitignore.txt',
    to: '.gitignore',
  },
];

co(function* () {
  try {
    /**
     * ready plugins files
     */
    const copyFiles = fs.readdirSync('./app');
    fs.mkdirsSync('Zoho');
    fs.mkdirsSync(`build/v${version}`);

    /**
     * copy app directory files only
     */
    console.log('Copy app directory files.');
    copyFiles.forEach((file) => {
      fs.copySync(`./app/${file}`, `Zoho/${file}`);
    });

    /**
     * Rename files
     */
    console.log('Rename files.');
    console.log(renames);
    renames.forEach(({ from, to }) => {
      if (fs.existsSync(`Zoho/${from}`)) {
        fs.moveSync(`Zoho/${from}`, `Zoho/${to}`);
      }
    });

    yield zipPromise('Zoho', `./build/v${version}/Zoho.zip`);
    fs.copySync(`./build/v${version}/Zoho.zip`, './build/Zoho.zip');
  } catch (err) {
    console.log(err);
  } finally {
    fs.removeSync('Zoho');
  }
});
