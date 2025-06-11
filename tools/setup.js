'use strict';

const fs = require('fs-extra');
const { systemCmd } = require('./lib/system.js');

const fixes = [
  {
    from: 'fix/ZohoHTTPConnector.php',
    to: 'vendor/zohocrm/php-sdk/src/com/zoho/crm/library/common/ZohoHTTPConnector.php',
  },
  {
    from: 'fix/Logger.php',
    to: 'vendor/zohocrm/php-sdk/src/com/zoho/crm/library/exception/Logger.php',
  },
  {
    from: 'fix/ZohoOAuthException.php',
    to: 'vendor/zohocrm/php-sdk/src/com/zoho/oauth/common/ZohoOAuthException.php',
  },
  {
    from: 'fix/ZCRMException.php',
    to: 'vendor/zohocrm/php-sdk/src/com/zoho/crm/library/exception/ZCRMException.php',
  },
  {
    from: 'fix/ZohoOAuthTokens.php',
    to: 'vendor/zohocrm/php-sdk/src/com/zoho/oauth/common/ZohoOAuthTokens.php',
  },
  {
    from: 'fix/ZohoOAuthClient.php',
    to: 'vendor/zohocrm/php-sdk/src/com/zoho/oauth/client/ZohoOAuthClient.php',
  },
  {
    from: 'fix/ZohoOAuthConstants.php',
    to: 'vendor/zohocrm/php-sdk/src/com/zoho/oauth/common/ZohoOAuthConstants.php',
  },
  {
    from: 'fix/APIRquest.php',
    to: 'vendor/zohocrm/php-sdk/src/com/zoho/crm/library/api/APIRequest.php',
  },
];

(async () => {
  try {
    await systemCmd('npm ci');
    await systemCmd('rm -rf vendor');
    await systemCmd('composer install');

    /**
     * fix files
     */
    console.log('fix library files.');
    console.log(fixes);
    fixes.forEach(({ from, to }) => {
      fs.copySync(from, to);
    });
  } catch (err) {
    console.log(err);
  }
})();
