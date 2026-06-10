'use strict';

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const archiver = require('archiver');

/**
 * Run system command
 *
 * @param {string} cmdString
 * @returns {string} stdout
 */
exports.systemCmd = (cmdString) => {
  console.log(cmdString);
  const stdout = execSync(cmdString, { encoding: 'utf-8', stdio: ['inherit', 'pipe', 'inherit'] });
  if (stdout) {
    console.log(stdout);
  }
  return stdout;
};

exports.systemDirList = (directory) => fs.promises.readdir(directory);

/**
 * Create a zip archive of a directory.
 *
 * @param {string} src  source directory
 * @param {string} dist output zip path
 * @returns {Promise<void>}
 */
exports.zipPromise = (src, dist) =>
  new Promise((resolve, reject) => {
    const archive = archiver('zip', {});
    const output = fs.createWriteStream(dist);

    // listen for all archive data to be written
    output.on('close', () => {
      console.log(archive.pointer() + ' total bytes');
      console.log('Archiver has been finalized and the output file descriptor has closed.');
      resolve();
    });

    // good practice to catch this error explicitly
    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    // srcディレクトリをZohoディレクトリ名で配置
    archive.directory(src, 'Zoho').finalize();
  });
