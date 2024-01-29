<?php

namespace Acms\Plugins\Zoho;

use Exception;
use ZCRMRestClient;
use ZohoOAuth;
use Acms\Services\Facades\Storage;

class Api
{

    /**
     * @var string
     */
    private const PERSISTENCE_FILE_NAME = 'zcrm_oauthtokens.txt';

    /**
     * @var string
     */
    public $userEmailId;

    /**
     * @var \ZohoOAuthClient
     */
    public $client;

    /**
     * Api constructor.
     * @param string $userEmailId
     */
    public function __construct(string $userEmailId)
    {
        ZCRMRestClient::initialize();

        $persistencePath = ZohoOAuth::getConfigValue("token_persistence_path");
        $persistenceFilePath = $persistencePath . self::PERSISTENCE_FILE_NAME;

        if (Storage::exists($persistenceFilePath) === false) {
            // 認証情報保存用ファイルが存在しない場合は空ファイルを作成する
            Storage::put($persistenceFilePath, '');
        }

        $this->userEmailId = $userEmailId;
        $this->client = ZohoOAuth::getClientInstance();
    }

    /**
     * 認証
     * @param string $grantToken
     */
    public function authorize(string $grantToken)
    {
        $this->client->generateAccessToken($grantToken);
    }

    /**
     * 認証解除
     */
    public function deauthorize()
    {
        ZohoOAuth::getPersistenceHandlerInstance()->deleteOAuthTokens($this->userEmailId);
    }

    /**
     * アクセストークン取得
     * @return string|null
     */
    public function getAccessToken(): ?string
    {
        try {
            $accessToken = $this->client->getAccessToken($this->userEmailId);
        } catch (Exception $e) {
            $accessToken = null;
        }
        return $accessToken;
    }
}
