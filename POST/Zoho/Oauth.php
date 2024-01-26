<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use Storage;
use App;
use Config;
use AcmsLogger;
use Common;

class oAuth extends ACMS_POST
{
    public function post()
    {
        /** @var Acms\Plugins\Zoho\Api $client */
        $client = App::make('zoho.api');
        try {
            $this->writeSettings();

            $grantToken = $this->Post->get('zoho_grant_token', '');
            $client->authorize($grantToken);
        } catch (\Exception $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error('【Zoho plugin】認証に失敗しました。', Common::exceptionArray($e));
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
            $this->addError('認証に失敗しました。grantトークンが古い可能性があります。');
        }
        return $this->Post;
    }

    private function writeSettings()
    {
        $config = Config::loadDefaultField();
        $config->overload(Config::loadBlogConfig(BID));

        $configFilePath = PLUGIN_LIB_DIR. 'Zoho/configuration.properties';
        $configFileDestPath = PLUGIN_LIB_DIR. 'Zoho/vendor/zohocrm/php-sdk/src/resources/configuration.properties';
        $oauthConfigFilePath = PLUGIN_LIB_DIR. 'Zoho/oauth_configuration.properties';
        $oauthConfigFileDestPath = PLUGIN_LIB_DIR. 'Zoho/vendor/zohocrm/php-sdk/src/resources/oauth_configuration.properties';

        if (Storage::exists($configFilePath) && Storage::exists($configFileDestPath)) {
            $configFile = Storage::get($configFilePath);
            $configFile = preg_replace('/{mail}/', $config->get('zoho_user_identifier'), $configFile);
            Storage::put($configFileDestPath, $configFile);
        }
        if (Storage::exists($oauthConfigFilePath) && Storage::exists($oauthConfigFileDestPath)) {
            $oauthConfigFile = Storage::get($oauthConfigFilePath);
            $oauthConfigFile = preg_replace('/{client_id}/', $config->get('zoho_client_id'), $oauthConfigFile);
            $oauthConfigFile = preg_replace('/{client_secret}/', $config->get('zoho_client_secret'), $oauthConfigFile);
            $oauthConfigFile = preg_replace('/{mail}/', $config->get('zoho_user_identifier'), $oauthConfigFile);
            Storage::put($oauthConfigFileDestPath, $oauthConfigFile);
        }
    }
}
