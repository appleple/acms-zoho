<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use SQL;
use DB;

use com\zoho\api\authenticator\OAuthBuilder;
use com\zoho\crm\api\InitializeBuilder;
use com\zoho\crm\api\dc\USDataCenter;
use com\zoho\api\logger\LogBuilder;
use com\zoho\api\logger\Levels;
use com\zoho\api\authenticator\Token;
use \com\zoho\crm\api\Initializer;
// use com\zoho\crm\api\SDKConfigBuilder;
// use com\zoho\crm\api\ProxyBuilder;
use com\zoho\crm\api\exception\SDKException;

use Acms\Plugins\Zoho\Services\Zoho\Store\File as ZohoFileStore;
use Acms\Plugins\Zoho\Services\Zoho\Store;
use Error;

class Client
{
    /** @var string $tokenStore ストアの種類 */
    private $tokenStore = 'file';

    private $tokenPresistencePath = '/var/www/html/';

    /** @var Store $store ストア情報 */
    private $store;

    private $dataCenterDomain = 'jp';

    private $dataCenterEnv = 'production';

    private $loggerFilePath;

    private $loggerLevel = 'info';

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
        $tokenStore = null;
        if (env('ZOHO_TOKEN_STORE')) {
            $tokenStore = env('ZOHO_TOKEN_STORE');
        }
        if ($tokenStore !== 'file' && $tokenStore !== 'database') {
            throw new \InvalidArgumentException('ZOHO_TOKEN_STORE は file または database である必要があります。');
        }

        /**
         * 最新のトークン情報を取得
         */
        if($tokenStore === 'file' && env('ZOHO_TOKEN_PERSISTENCE_PATH')) {
            $this->tokenPresistencePath = env('ZOHO_TOKEN_PERSISTENCE_PATH');
            if ($this->tokenPresistencePath === '' || !is_string($this->tokenPresistencePath)) {
                // ファイルストアのパスが未設定
                return false;
            }
            $this->store = new ZohoFileStore($this->tokenPresistencePath);
        }
        $this->tokenStore = $tokenStore;
    }

    public function getTokenStore()
    {
        return $this->tokenStore;
    }

    public function getTokenPresistencePath()
    {
        return $this->tokenPresistencePath;
    }

    public function getStore()
    {
        return $this->store;
    }

    public function getTokenId()
    {
        return $this->tokenId;
    }

    public function getRefreshToken()
    {
        return $this->refreshToken;
    }

    public function getAccessToken()
    {
        return $this->accessToken;
    }

    /**
     * register service
     * パラメーターがない場合、DBからトークンIDを検索して初期化
     *
     * @param string|null $clientId
     * @param string|null $clientSecret
     * @param string|null $redirectUrl
     * @param string|null $grantToken
     * @return string|null アクセストークンまたはnull
     */
    public function initialize(?string $clientId = null, ?string $clientSecret = null, ?string $redirectUrl = null, ?string $grantToken = null)
    {
        if ($clientId && $clientSecret && $redirectUrl) {
            $this->clientId = $clientId;
            $this->clientSecret = $clientSecret;
            $this->redirectUrl = $redirectUrl;
            $this->grantToken = $grantToken;
        } else {
            $tokenId = $this->getTokenIdByBid(BID);
            if(!$tokenId) {
                '認証されていません';
                return null;
            }
            $this->tokenId = $tokenId;
            $token = $this->store->findTokenById($tokenId);
            if(!$token) {
                'トークンがストアから削除された可能性があります。再認証してください。';
                return null;
            }

            $this->clientId = $token->getClientId();
            $this->clientSecret = $token->getClientSecret();
            $this->redirectUrl = $token->getRedirectUrl();
            $this->refreshToken = $token->getRefreshToken();
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

            $token = $this->buildToken(!!$grantToken);

            /**
             * トークンの初期化
             * アクセストークンが切れている場合、リフレッシュトークンを使用して新しいアクセストークンを取得
             */
            (new InitializeBuilder())
                ->environment($environment)
                ->token($token)
                ->store($this->store->getStore())
                // ->SDKConfig($sdkConfig)
                // ->resourcePath($resourcePath)
                ->logger($logger)
                // ->requestProxy($requestProxy)
                ->initialize();

            $authorizedToken = '';
            if(!!$grantToken && $authorizedToken = $this->store->findTokenByGrantToken($this->grantToken)) {
                $this->tokenId = $authorizedToken->getId();
                $this->refreshToken = $authorizedToken->getRefreshToken();
                $this->accessToken = $authorizedToken->getAccessToken();
            } else {
                $updateToken = $this->store->findTokenById($this->getTokenId());
                $this->refreshToken = $updateToken->getRefreshToken();
                $this->accessToken = $updateToken->getAccessToken();
            }

            return $this->accessToken;
        } catch (SDKException $e) {
            throw new \RuntimeException("Zoho SDK Error: " . $e->getMessage(), $e->getCode(), $e);
            return null;
        }
    }

    public function deauthorize(): bool
    {
        try {
            // 初期化済みであることを確認
            if (!Initializer::getInitializer()) {
                throw new \RuntimeException('Zohoクライアントが初期化されていません。');
            }

            // トークンを取得
            $token = $this->buildToken();

            // 初期化解除
            Initializer::removeUserConfiguration($token);

            // FileStore からトークン削除
            $fileStore = new ZohoFileStore(env('ZOHO_TOKEN_PERSISTENCE_PATH'));
            if ($this->tokenId) {
                $fileStore->removeTokenById($this->tokenId);
            } else {
                // トークンIDが設定されていない場合、現在のリフレッシュトークンに関連するトークンを検索して削除
                $fileStore->removeTokenByRefreshToken($this->refreshToken);
            }

            return true;
        } catch (SDKException $e) {
            throw new \RuntimeException("トークンの無効化に失敗: " . $e->getMessage(), $e->getCode(), $e);
        }
    }

    /**
     * トークンの発行
     *
     * @param bool $useGrantToken グラントトークンを使用するかどうか
     *
     * @return Token
     */
    private function buildToken(bool $useGrantToken = false): Token
    {
        $builder = (new OAuthBuilder())
            ->clientId($this->clientId)
            ->clientSecret($this->clientSecret)
            ->redirectURL($this->redirectUrl);

        $token = null;
        if ($useGrantToken && $this->grantToken) {
            $token = $builder->grantToken($this->grantToken)->build();
        } else if ($this->refreshToken) {
            $token = $builder->refreshToken($this->refreshToken)->build();
        }
        else {
            throw new \InvalidArgumentException('grantTokenまたはrefreshTokenが必要です。認証情報を確認してください。');
        }

        return $token;
    }

    public function getTokenIdByBid(int $bid) {
        $sql = SQL::newSelect('config', 'config_value');
        $where = SQL::newWhere();
        $where->addWhereOpr('config_blog_id', $bid);
        $where->addWhereOpr('config_key', 'zoho_token_id');
        $sql->addWhere($where);

        $tokenId = DB::query($sql->get(dsn()), 'row');

        if($tokenId['config_value']) {
            return $tokenId['config_value'];
        }
        return null;
    }

    // private function getCurrentUserEmail(string $accessToken): string
    // {
    //     $url = 'https://accounts.zoho.com/oauth/user/info';
    //     $headers = [
    //         'Authorization: Bearer ' . $accessToken,
    //         'Content-Type: application/json'
    //     ];

    //     $ch = curl_init();
    //     curl_setopt($ch, CURLOPT_URL, $url);
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //     $response = curl_exec($ch);
    //     $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    //     curl_close($ch);

    //     if ($httpCode !== 200) {
    //         throw new \Exception('ユーザー情報の取得に失敗しました。');
    //     }

    //     $userData = json_decode($response, true);
    //     return $userData['Email'] ?? '';
    // }
}
