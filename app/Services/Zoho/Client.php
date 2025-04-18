<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use com\zoho\api\authenticator\OAuthBuilder;
use com\zoho\api\authenticator\store\FileStore;
use com\zoho\crm\api\InitializeBuilder;
use com\zoho\crm\api\dc\USDataCenter;
use com\zoho\api\logger\LogBuilder;
use com\zoho\api\logger\Levels;
use com\zoho\api\authenticator\OAuthToken;
use \com\zoho\crm\api\Initializer;
// use com\zoho\crm\api\SDKConfigBuilder;
// use com\zoho\crm\api\ProxyBuilder;
use com\zoho\crm\api\exception\SDKException;

class Client
{
    private $userEmail;

    private $clientId;

    private $clientSecret;

    private $redirectUrl;

    private $refreshToken = null;

    private $grantToken = null;

    public function __construct(string $userEmail, string $clientId, string $clientSecret, string $redirectUrl, ?string $refreshToken = null, ?string $grantToken = null)
    {
        $this->userEmail = $userEmail;
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->redirectUrl = $redirectUrl;
        $this->refreshToken = $refreshToken;
        $this->grantToken = $grantToken;
    }

    public function initialize(): bool
    {
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
            $tokenStore = '';
            if (true) {
                $tokenPresistencePath = env('ZOHO_TOKEN_PERSISTENCE_PATH');
                if ($tokenPresistencePath === '' || !is_string($tokenPresistencePath)) {
                    // 永続化トークンのパスが未設定
                    return false;
                }
                $tokenStore = new FileStore($tokenPresistencePath);
            } else {
                // Todo: 未実装
                $tokenStore = (new DBBuilder())
                    ->host("hostName")
                    ->databaseName("dataBaseName")
                    ->userName("userName")
                    ->password("password")
                    ->portNumber("portNumber")
                    ->tableName("tableName")
                    ->build();
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

            // 初期化後に、生成されたトークンにIDを設定し保存する
            if (!empty($this->userEmail) && Initializer::getInitializer()) {
                try {
                    // トークンを取得
                    $tokens = $tokenStore->getTokens();
                    if (!empty($tokens)) {
                        // 新しく作成されたトークンを見つける（最初のものを使用）
                        $latestToken = $tokens[0];
                        // IDを設定
                        $latestToken->setId($this->userEmail);
                        // トークンを保存
                        $tokenStore->saveToken($latestToken);
                    }
                } catch (\Exception $e) {
                    // IDの設定に失敗しても続行
                }
            }

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

    public function deauthorize(): void
    {
        try {
            // 初期化済みであることを確認
            if (!Initializer::getInitializer()) {
                throw new \RuntimeException('Zohoクライアントが初期化されていません。');
            }

            $token = $this->buildToken();
            Initializer::removeUserConfiguration($token);

            var_dump('削除できました');

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
