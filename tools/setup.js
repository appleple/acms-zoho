'use strict';

const { systemCmd } = require('./lib/system.js');

try {
  systemCmd('pnpm install --frozen-lockfile');
  systemCmd('cd app && rm -rf vendor');
  systemCmd('cd app && composer install');
} catch (err) {
  console.log(err);
}
