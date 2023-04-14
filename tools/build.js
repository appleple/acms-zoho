/**
 * 配布バージョン作成プログラム
 */

const fs = require('fs-extra');
const co = require('co');
const { zipPromise } = require('./lib/system.js');

const { version } = require('../package.json');

const ignores = [
  '.git',
  '.gitignore',
  '.gitattributes',
  'node_modules',
  '.editorconfig',
  '.eslintrc.js',
  '.node-version',
  '.husky',
  'build',
  '.prettierrc.js',
  'composer.json',
  'composer.lock',
  'package-lock.json',
  'package.json',
  'phpcs.xml',
  'phpmd.xml',
  '.phplint-cache',
  'phpmd.log',
  'tools',
  'fix',
];

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
    const copyFiles = fs.readdirSync('.');
    fs.mkdirsSync('Zoho');
    fs.mkdirsSync(`build/v${version}`);

    /**
     * copy plugins files
     */
    copyFiles.forEach((file) => {
      fs.copySync(`./${file}`, `Zoho/${file}`);
    });

    /**
     * Ignore files
     */
    console.log('Remove unused files.');
    console.log(ignores);
    ignores.forEach((path) => {
      fs.removeSync(`Zoho/${path}`);
    });

    /**
     * Rename files
     */
    console.log('Rename files.');
    console.log(renames);
    renames.forEach(({ from, to }) => {
      fs.moveSync(`Zoho/${from}`, `Zoho/${to}`);
    });

    yield zipPromise('Zoho', `./build/v${version}/Zoho.zip`);
    fs.copySync(`./build/v${version}/Zoho.zip`, './build/Zoho.zip');
  } catch (err) {
    console.log(err);
  } finally {
    fs.removeSync('Zoho');
  }
});
