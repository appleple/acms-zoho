<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use Storage;
use Acms\Plugins\Zoho\Api;

class oAuth extends ACMS_POST
{
    public function post()
    {
        $client = new Api();
        try {
            $this->writeSettings();
            $client->authorize();
            $this->redirect(acmsLink(array(
                'bid' => BID,
                'admin' => 'app_zoho_index',
            )));
        } catch (\Exception $e) {
            $this->addError('認証に失敗しました。grantトークンが古い可能性があります。');
        }
        return $this->Post;
    }

    private function writeSettings()
    {
        $configFilePath = PLUGIN_LIB_DIR. 'Zoho/configuration.properties';
        $configFileDestPath = PLUGIN_LIB_DIR. 'Zoho/vendor/zohocrm/php-sdk/src/resources/configuration.properties';
        $oauthConfigFilePath = PLUGIN_LIB_DIR. 'Zoho/oauth_configuration.properties';
        $oauthConfigFileDestPath = PLUGIN_LIB_DIR. 'Zoho/vendor/zohocrm/php-sdk/src/resources/oauth_configuration.properties';

        if (Storage::exists($configFilePath) && Storage::exists($configFileDestPath)) {
            $configFile = Storage::get($configFilePath);
            $configFile = preg_replace('/{mail}/', config('zoho_user_identifier'), $configFile);
            Storage::put($configFileDestPath, $configFile);
        }
        if (Storage::exists($oauthConfigFilePath) && Storage::exists($oauthConfigFileDestPath)) {
            $oauthConfigFile = Storage::get($oauthConfigFilePath);
            $oauthConfigFile = preg_replace('/{client_id}/', config('zoho_client_id'), $oauthConfigFile);
            $oauthConfigFile = preg_replace('/{client_secret}/', config('zoho_client_secret'), $oauthConfigFile);
            $oauthConfigFile = preg_replace('/{redirect_uri}/', config('zoho_redirect_uri'), $oauthConfigFile);
            Storage::put($oauthConfigFileDestPath, $oauthConfigFile);
        }
    }
}
