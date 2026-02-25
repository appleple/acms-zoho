'use strict';

const { systemCmd } = require('./lib/system.js');

(async () => {
  try {
    await systemCmd('pnpm install --frozen-lockfile');
    await systemCmd('cd app && rm -rf vendor');
    await systemCmd('cd app && composer install');
  } catch (err) {
    console.log(err);
  }
})();
