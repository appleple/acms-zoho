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
        $this->writeSettings();
        /** @var \Acms\Plugins\Zoho\Api $client */
        $client = App::make('zoho.api');

        $grantToken = $this->Post->get('zoho_grant_token', '');
        try {
            $client->authorize($grantToken);
            if (class_exists('AcmsLogger')) {
                AcmsLogger::info('【Zoho plugin】OAuth認証に成功しました。');
            }
            $this->redirect(acmsLink([
                'bid' => BID,
                'admin' => 'app_zoho_index',
            ]));
        } catch (\Exception $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error('【Zoho plugin】OAuth認証に失敗しました。', Common::exceptionArray($e));
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
            $this->addError('認証に失敗しました。認証トークンが古い可能性があります。');
        }
        return $this->Post;
    }

    private function writeSettings()
    {
        $config = Config::loadDefaultField();
        $config->overload(Config::loadBlogConfig(BID));

        $oauthConfigFilePath = PLUGIN_LIB_DIR. 'Zoho/oauth_configuration.properties';
        $oauthConfigFileDestPath = PLUGIN_LIB_DIR. 'Zoho/vendor/zohocrm/php-sdk/src/resources/oauth_configuration.properties';

        if (Storage::exists($oauthConfigFilePath) && Storage::exists($oauthConfigFileDestPath)) {
            $oauthConfigFile = Storage::get($oauthConfigFilePath);
            $oauthConfigFile = preg_replace('/{client_id}/', $config->get('zoho_client_id'), $oauthConfigFile);
            $oauthConfigFile = preg_replace('/{client_secret}/', $config->get('zoho_client_secret'), $oauthConfigFile);
            $oauthConfigFile = preg_replace('/{token_persistence_path}/', env('ZOHO_TOKEN_PERSISTENCE_PATH'), $oauthConfigFile);
            Storage::put($oauthConfigFileDestPath, $oauthConfigFile);
        }
    }
}
