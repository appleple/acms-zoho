<?php

namespace Acms\Plugins\Zoho;
use ZCRMRestClient;
use ZohoOAuth;
use DB;
use SQL;

class Api
{
  public function __construct()
  {
    $grantToken = config('zoho_grant_token');
    $refreshToken = config('zoho_refresh_token');
    ZCRMRestClient::initialize();
    $oAuthClient = ZohoOAuth::getClientInstance();
    $this->client = $oAuthClient;
    if ($refreshToken) {
        $userIdentifier = "info@basecamp-nagoya.jp";
        $oAuthTokens = $oAuthClient->generateAccessTokenFromRefreshToken($refreshToken, $userIdentifier);
        if ($oAuthTokens) {
            $this->updateRefreshToken($oAuthTokens->getRefreshToken());
        }
    } else {
        $oAuthTokens = $oAuthClient->generateAccessToken($grantToken);
        $this->updateRefreshToken($oAuthTokens->getRefreshToken());
    }
  }

  public function getAccessToken()
  {
    $userIdentifier = "info@basecamp-nagoya.jp";
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
