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
     * @var bool
     */
    public $authorized;

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

    public function authorize($grantToken)
    {
        $this->client->generateAccessToken($grantToken);
    }

    public function deauthorize()
    {
        ZohoOAuth::getPersistenceHandlerInstance()->deleteOAuthTokens($this->userEmailId);
    }

    public function getAccessToken()
    {
        try {
            $accessToken = $this->client->getAccessToken($this->userEmailId);
        } catch (Exception $e) {
            $accessToken = null;
        }
        return $accessToken;
    }
}
