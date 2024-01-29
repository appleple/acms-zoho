<?php

namespace Acms\Plugins\Zoho;

use Exception;
use ZCRMRestClient;
use ZohoOAuth;
use Acms\Services\Facades\Storage;
use Acms\Services\Facades\Config;
use Field;

class Api
{

    /**
     * @var string
     */
    private const PERSISTENCE_FILE_NAME = 'zcrm_oauthtokens.txt';

    /**
     * @var \ZohoOAuthClient
     */
    public $client;

    /**
     * Api constructor.
     */
    public function __construct()
    {

        ZCRMRestClient::initialize();

        $persistencePath = ZohoOAuth::getConfigValue("token_persistence_path");
        $persistenceFilePath = $persistencePath . self::PERSISTENCE_FILE_NAME;

        if (Storage::exists($persistenceFilePath) === false) {
            // 認証情報保存用ファイルが存在しない場合は空ファイルを作成する
            Storage::put($persistenceFilePath, '');
        }

        $this->client = ZohoOAuth::getClientInstance();
    }

    /**
     * 認証
     * @param string $grantToken
     */
    public function authorize(string $grantToken)
    {
        $tokens = $this->client->generateAccessToken($grantToken);
        $userEmailId = $tokens->getUserEmailId();
        $this->saveUserEmailId($userEmailId);
    }

    /**
     * 認証解除
     */
    public function deauthorize()
    {
        $userEmailId = ZCRMRestClient::getCurrentUserEmailID();
        ZohoOAuth::getPersistenceHandlerInstance()->deleteOAuthTokens($userEmailId);
        $this->saveUserEmailId('');
    }

    /**
     * アクセストークン取得
     * @return string|null
     */
    public function getAccessToken(): ?string
    {
        $userEmailId = ZCRMRestClient::getCurrentUserEmailID();

        try {
            $accessToken = $this->client->getAccessToken($userEmailId);
        } catch (Exception $e) {
            $accessToken = null;
        }
        return $accessToken;
    }

    /**
     * OAuth認証ユーザーのメールアドレスを保存する
     * @return string|null
     */
    protected function saveUserEmailId(string $userEmailId = '')
    {
        $config = new Field();
        $config->set('zoho_user_identifier', $userEmailId);
        Config::saveConfig($config, BID);
    }
}
