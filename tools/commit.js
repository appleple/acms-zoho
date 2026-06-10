'use strict';

const { systemCmd } = require('./lib/system.js');

// package.json
const { version } = require('../package.json');

try {
  systemCmd('git add -A');
  systemCmd(`git commit -m "v${version}"`);
  systemCmd(`git tag v${version}`);
  systemCmd('git push');
  systemCmd('git push --tags');
} catch (err) {
  console.log(err);
}
