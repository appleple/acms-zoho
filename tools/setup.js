'use strict';

const fs = require('fs-extra');
const { systemCmd } = require('./lib/system.js');

const fixes = [
  {
    from: 'ZohoHTTPConnector.php',
    to: 'zohocrm/php-sdk/src/com/zoho/crm/library/common/ZohoHTTPConnector.php',
  },
  {
    from: 'Logger.php',
    to: 'zohocrm/php-sdk/src/com/zoho/crm/library/exception/Logger.php',
  },
];

(async () => {
  try {
    await systemCmd('npm ci');
    await systemCmd('composer install');

    /**
     * fix files
     */
    console.log('fix library files.');
    console.log(fixes);
    fixes.forEach(({ from, to }) => {
      fs.copySync(`fix/${from}`, `vendor/${to}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
