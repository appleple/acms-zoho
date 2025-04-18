<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use com\zoho\api\authenticator\OAuthBuilder;
use com\zoho\crm\api\InitializeBuilder;
use com\zoho\crm\api\dc\USDataCenter;
use com\zoho\api\logger\LogBuilder;
use com\zoho\api\logger\Levels;
use com\zoho\api\authenticator\OAuthToken;
use \com\zoho\crm\api\Initializer;
// use com\zoho\crm\api\SDKConfigBuilder;
// use com\zoho\crm\api\ProxyBuilder;
use com\zoho\crm\api\exception\SDKException;

use Acms\Plugins\Zoho\Services\Zoho\Store\File as ZohoFileStore;

class Client
{
    private $tokenStore;

    private $tokenId;

    private $userName;

    private $clientId;

    private $clientSecret;

    private $refreshToken = null;

    private $accessToken = null;

    private $grantToken = null;

    private $expiryTime;

    private $redirectUrl;

    private $apiDomain;

    public function __construct()
    {
        $tokenStore = env('ZOHO_TOKEN_STORE', 'file');
        if ($tokenStore !== 'file' && $tokenStore !== 'database') {
            throw new \InvalidArgumentException('ZOHO_TOKEN_STORE は file または database である必要があります。');
        }
        $this->tokenStore = $tokenStore;
    }

    public function getTokenStore()
    {
        return $this->tokenStore;
    }

    public function setTokenId($id)
    {
        $this->tokenId = $id;
    }

    public function getTokenId()
    {
        return $this->tokenId;
    }

    public function initialize(string $clientId, string $clientSecret, string $redirectUrl, ?string $refreshToken = null, ?string $grantToken = null): bool
    {
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->redirectUrl = $redirectUrl;

        if($refreshToken) {
            $this->refreshToken = $refreshToken;
        } else if ($grantToken) {
            $this->grantToken = $grantToken;
        }

        try {
            /**
             * Domain: USDataCenter、EUDataCenter、INDataCenter、CNDataCenter、AUDataCenter
             * Enviroment: PRODUCTION()、DEVELOPER()、SANDBOX()
            */
            $environment = USDataCenter::PRODUCTION();

            $logger = (new LogBuilder())
                ->level(Levels::INFO)
                ->filePath("/var/www/html/acms-301/php_sdk_log.log")
                ->build();

            $token = $this->buildToken(true);

            /**
             * database, file
             * customは一旦対応しない(redisが必要なら実装)
             */
            $tokenStore = null;
            if ($this->tokenStore === 'file') {
                $tokenPresistencePath = env('ZOHO_TOKEN_PERSISTENCE_PATH');
                if ($tokenPresistencePath === '' || !is_string($tokenPresistencePath)) {
                    // 永続化トークンのパスが未設定
                    return false;
                }

                $fileStore = new ZohoFileStore($tokenPresistencePath);
                $tokenStore = $fileStore->getStore();
            }

            (new InitializeBuilder())
                ->environment($environment)
                ->token($token)
                ->store($tokenStore)
                // ->SDKConfig($sdkConfig)
                // ->resourcePath($resourcePath)
                ->logger($logger)
                // ->requestProxy($requestProxy)
                ->initialize();

            // refreshTokenの取得
            // $tokens = $tokenStore->getTokens();
            // $refreshToken = $tokens[0]->getRefreshToken();
            // var_dump($refreshToken);
            return true;

        } catch (SDKException $e) {
            throw new \RuntimeException("Zoho SDK Error: " . $e->getMessage(), $e->getCode(), $e);
            return false;
        }
    }

    public function authorize(): OAuthToken
    {
        if (empty($this->grantToken)) {
            throw new \InvalidArgumentException('grantToken が必要です。');
        }

        return $this->buildToken(true);
    }

    public function deauthorize(): bool
    {
        try {
            // 初期化済みであることを確認
            if (!Initializer::getInitializer()) {
                throw new \RuntimeException('Zohoクライアントが初期化されていません。');
            }

            // トークンを取得
            $token = $this->buildToken();  // refreshToken を使う場合

            // 初期化解除
            Initializer::removeUserConfiguration($token);

            // FileStore からトークン削除
            $fileStore = new ZohoFileStore(env('ZOHO_TOKEN_PERSISTENCE_PATH'));
            if ($this->tokenId) {
                $fileStore->removeTokenById($this->tokenId);
            } else {
                // トークンIDが設定されていない場合、現在のリフレッシュトークンに関連するトークンを検索して削除
                $tokens = $fileStore->getStore()->getTokens();
                foreach ($tokens as $token) {
                    if ($token->getRefreshToken() === $this->refreshToken) {
                        $fileStore->removeTokenById($token->getId());
                        break;
                    }
                }
            }

            return true;
        } catch (SDKException $e) {
            throw new \RuntimeException("トークンの無効化に失敗: " . $e->getMessage(), $e->getCode(), $e);
        }
    }

    private function buildToken(bool $useGrant = false): OAuthToken
    {

        $builder = (new OAuthBuilder())
            ->clientId($this->clientId)
            ->clientSecret($this->clientSecret)
            ->redirectURL($this->redirectUrl);

        if ($useGrant && $this->grantToken) {
            return $builder->grantToken($this->grantToken)->build();
        }

        if ($this->refreshToken) {
            return $builder->refreshToken($this->refreshToken)->build();
        }

        // どちらも渡されていない場合は例外をスロー
        throw new \InvalidArgumentException('grantToken または refreshToken が必要です。');
    }
}
