'use strict';

const fs = require('fs-extra');
const { systemCmd } = require('./lib/system.js');

// const fixes = [
//   {
//     from: '../app/fix/ZohoHTTPConnector.php',
//     to: '../app/vendor/zohocrm/php-sdk/src/com/zoho/crm/library/common/ZohoHTTPConnector.php',
//   },
//   {
//     from: '../app/fix/Logger.php',
//     to: '../app/vendor/zohocrm/php-sdk/src/com/zoho/crm/library/exception/Logger.php',
//   },
//   {
//     from: '../app/fix/ZohoOAuthException.php',
//     to: '../app/vendor/zohocrm/php-sdk/src/com/zoho/oauth/common/ZohoOAuthException.php',
//   },
//   {
//     from: '../app/fix/ZCRMException.php',
//     to: '../app/vendor/zohocrm/php-sdk/src/com/zoho/crm/library/exception/ZCRMException.php',
//   },
//   {
//     from: '../app/fix/ZohoOAuthTokens.php',
//     to: '../app/vendor/zohocrm/php-sdk/src/com/zoho/oauth/common/ZohoOAuthTokens.php',
//   },
//   {
//     from: '../app/fix/ZohoOAuthClient.php',
//     to: '../app/vendor/zohocrm/php-sdk/src/com/zoho/oauth/client/ZohoOAuthClient.php',
//   },
//   {
//     from: '../app/fix/ZohoOAuthConstants.php',
//     to: '../app/vendor/zohocrm/php-sdk/src/com/zoho/oauth/common/ZohoOAuthConstants.php',
//   },
// ];

(async () => {
  try {
    await systemCmd('pnpm install --frozen-lockfile');
    await systemCmd('cd app && rm -rf vendor');
    await systemCmd('cd app && composer install');

    /**
     * fix files
     */
    // console.log('fix library files.');
    // console.log(fixes);
    // fixes.forEach(({ from, to }) => {
    //   fs.copySync(from, to);
    // });
  } catch (err) {
    console.log(err);
  }
})();
