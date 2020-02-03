const cmd = require('node-cmd');
const fs = require('fs-extra');
const co = require('co');
const archiver = require('archiver');

const pkg = fs.readJsonSync('./package.json');

/**
 * Run system command
 *
 * @param cmdString
 * @returns {Promise}
 */
const systemCmd = cmdString => new Promise((resolve) => {
  cmd.get(
    cmdString,
    (data, err, stderr) => {
      console.log(cmdString);
      console.log(data);
      if (err) {
        console.log(err);
      }
      if (stderr) {
        console.log(stderr);
      }
      resolve(data);
    }
  );
});

const zipPromise = (src, dist) => new Promise((resolve, reject) => {
  const archive = archiver.create('zip', {});
  const output = fs.createWriteStream(dist);

  // listen for all archive data to be written
  output.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log('Archiver has been finalized and the output file descriptor has closed.');
    resolve();
  });

  // good practice to catch this error explicitly
  archive.on('error', (err) => {
    reject(err);
  });

  archive.pipe(output);
  archive.directory(src).finalize();
});

co(function* () {
  try {
    fs.mkdirsSync('Zoho');
    fs.mkdirsSync('build');
    fs.copySync('./composer.json', 'Zoho/composer.json');
    fs.copySync('./composer.lock', 'Zoho/composer.lock');
    fs.copySync('./LICENSE', 'Zoho/LICENSE');
    fs.copySync('./README.md', 'Zoho/README.md');
    fs.copySync('./Engine.php', 'Zoho/Engine.php');
    fs.copySync('./Api.php', 'Zoho/Api.php');
    fs.copySync('./Hook.php', 'Zoho/Hook.php');
    fs.copySync('./theme', 'Zoho/theme');
    fs.copySync('./ServiceProvider.php', 'Zoho/ServiceProvider.php');
    fs.copySync('./GET/Zoho/Admin.php', 'Zoho/GET/Zoho/Admin.php');
    fs.copySync('./POST/Zoho/Deauthorize.php', 'Zoho/POST/Zoho/Deauthorize.php');
    fs.copySync('./POST/Zoho/Oauth.php', 'Zoho/POST/Zoho/Oauth.php');
    yield systemCmd('cd ./Zoho; composer install');
    fs.copySync('./fix/ZohoHTTPConnector.php', 'Zoho/vendor/zohocrm/php-sdk/src/com/zoho/crm/library/common/ZohoHTTPConnector.php');
    yield zipPromise('Zoho', './build/Zoho.zip');
    fs.removeSync('Zoho');
    yield systemCmd('git add -A');
    yield systemCmd(`git commit -m "v${pkg.version}"`);
    yield systemCmd('git push');
  } catch (err) {
    console.log(err);
  }
});
