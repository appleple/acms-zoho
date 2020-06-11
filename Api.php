<?php

namespace Acms\Plugins\Zoho;

use ZCRMRestClient;
use ZohoOAuth;
use DB;
use SQL;
use Config;
use Exception;

class Api
{
    protected $config;

    public function __construct($refreshToken)
    {
        ZCRMRestClient::initialize();
        $this->config = Config::loadDefaultField();
        $this->config->overload(Config::loadBlogConfig(BID));

        $oAuthClient = ZohoOAuth::getClientInstance();
        $this->client = $oAuthClient;
        $this->authorized = 'false';
        $userIdentifier = $this->config->get('zoho_user_identifier');
        if (!$refreshToken) {
            return;
        }
        try {
            $oAuthTokens = $oAuthClient->refreshAccessToken($refreshToken, $userIdentifier);
        } catch (Exception $e) {
            $DB = DB::singleton(dsn());
            $RemoveSQL = SQL::newDelete('config');
            $RemoveSQL->addWhereOpr('config_blog_id', BID);
            $RemoveSQL->addWhereOpr('config_key', 'zoho_refresh_token');
            $DB->query($RemoveSQL->get(dsn()), 'exec');
            $oAuthTokens = null;
        }
        if ($oAuthTokens) {
            $this->updateRefreshToken($oAuthTokens->getRefreshToken());
            $this->authorized = 'true';
        }
    }

    public function authorize()
    {
        $oAuthClient = ZohoOAuth::getClientInstance();
        $grantToken = $this->config->get('zoho_grant_token');
        $oAuthTokens = $oAuthClient->generateAccessToken($grantToken);
        $this->updateRefreshToken($oAuthTokens->getRefreshToken());
    }

    public function getAccessToken()
    {
        $userIdentifier = $this->config->get('zoho_user_identifier');
        return $this->client->getAccessToken($userIdentifier);
    }

    public function updateRefreshToken($refreshToken)
    {
        $DB = DB::singleton(dsn());
        $RemoveSQL = SQL::newDelete('config');
        $RemoveSQL->addWhereOpr('config_blog_id', BID);
        $RemoveSQL->addWhereOpr('config_key', 'zoho_refresh_token');
        $DB->query($RemoveSQL->get(dsn()), 'exec');
        $InsertSQL = SQL::newInsert('config');
        $InsertSQL->addInsert('config_key', 'zoho_refresh_token');
        $InsertSQL->addInsert('config_value', $refreshToken);
        $InsertSQL->addInsert('config_blog_id', BID);
        $DB->query($InsertSQL->get(dsn()), 'exec');
    }
}
