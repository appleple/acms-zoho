<?php

namespace Acms\Plugins\Zoho;

use Exception;
use ZCRMRestClient;
use ZohoOAuth;
use Acms\Services\Facades\Config;
use Acms\Services\Facades\Storage;
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
        $this->client = ZohoOAuth::getClientInstance();
    }

    /**
     * 認証
     * @param string $grantToken
     */
    public function authorize(string $grantToken)
    {
        if (!$this->tokenPersistenceFileExists()) {
            $this->createTokenPersistenceFile();
        }
        $tokens = $this->client->generateAccessToken($grantToken);
        $userEmailId = $tokens->getUserEmailId();
        $this->saveUserEmailId($userEmailId);
    }

    /**
     * 認証解除
     */
    public function deauthorize()
    {
        if (!$this->tokenPersistenceFileExists()) {
            return;
        }
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
        if (!$this->tokenPersistenceFileExists()) {
            return null;
        }
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
     * @param string $userEmailId
     */
    protected function saveUserEmailId(string $userEmailId = '')
    {
        $config = new Field();
        $config->set('zoho_user_identifier', $userEmailId);
        Config::saveConfig($config, BID);
    }

    /**
     * 認証情報保存用ファイルが存在するかどうか
     * @return bool
     */
    public function tokenPersistenceFileExists(): bool
    {
        $persistencePath = ZohoOAuth::getConfigValue("token_persistence_path");
        if (empty($persistencePath)) {
            return false;
        }
        $persistenceFilePath = $persistencePath . self::PERSISTENCE_FILE_NAME;

        return Storage::exists($persistenceFilePath);
    }

    /**
     * 認証情報保存用ファイルを作成する
     */
    public function createTokenPersistenceFile()
    {
        $persistencePath = ZohoOAuth::getConfigValue("token_persistence_path");
        if (empty($persistencePath)) {
            return;
        }
        $persistenceFilePath = $persistencePath . self::PERSISTENCE_FILE_NAME;
        Storage::put($persistenceFilePath, '');
    }
}
