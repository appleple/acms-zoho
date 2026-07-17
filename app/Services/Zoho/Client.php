<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use SQL;
use Acms\Services\Facades\Database;
use Acms\Services\Facades\Config;
use Acms\Services\Facades\Logger;
use com\zoho\api\authenticator\OAuthBuilder;
use com\zoho\crm\api\InitializeBuilder;
use com\zoho\crm\api\dc\USDataCenter;
use com\zoho\crm\api\dc\EUDataCenter;
use com\zoho\crm\api\dc\INDataCenter;
use com\zoho\crm\api\dc\CNDataCenter;
use com\zoho\crm\api\dc\AUDataCenter;
use com\zoho\crm\api\dc\JPDataCenter;
use com\zoho\crm\api\dc\CADataCenter;
use com\zoho\crm\api\dc\SADataCenter;
use com\zoho\crm\api\dc\Environment;
use com\zoho\api\logger\LogBuilder;
use com\zoho\api\logger\Levels;
use com\zoho\api\authenticator\Token;
use com\zoho\crm\api\Initializer;
use com\zoho\crm\api\exception\SDKException;
use Acms\Plugins\Zoho\Services\Zoho\Store\CustomFileStore;
use Acms\Plugins\Zoho\Services\Zoho\Store;

class Client
{
    /** @var list<string> 選択可能な接続環境（config: zoho_environment） */
    public const ENVIRONMENTS = ['production', 'sandbox', 'developer'];

    /** @var list<string> 選択可能なデータセンター（config: zoho_data_center） */
    public const DATA_CENTERS = ['us', 'eu', 'in', 'cn', 'au', 'jp', 'ca', 'sa'];

    /** @var string $tokenStore ストアの種類 */
    private $tokenStore = 'file';

    private $tokenPresistencePath = '';

    /** @var Store $store ストア情報 */
    private $store;

    private $dataCenterEnv = 'production';

    private $loggerFilePath = 'php_zoho_sdk.log';

    private $loggerLevel = 'info';

    private $tokenId;

    private $clientId;

    private $clientSecret;

    private $refreshToken = null;

    private $accessToken = null;

    private $grantToken = null;

    private $redirectUrl;

    /**
     * @var string|null 認証/認証解除の対象環境。設定時は使用中環境より優先される
     *                  （例: Callback で「認証中の環境」のトークン交換を正しい環境で行うため）。
     */
    private $environmentOverride = null;

    public function __construct()
    {
        $scriptDir = defined('SCRIPT_DIR') ? SCRIPT_DIR : ($_SERVER['DOCUMENT_ROOT'] ?? '');
        $defaultTokenPath = $scriptDir . 'private/zoho_tokens.csv';
        $defaultLogPath = $scriptDir . 'private/' . $this->loggerFilePath;

        $this->loggerFilePath = env('ZOHO_LOGGER_FILE_PATH', $defaultLogPath);
        $tokenPersistencePath = env('ZOHO_TOKEN_PERSISTENCE_PATH', '');
        $this->tokenPresistencePath = $tokenPersistencePath !== '' ? $tokenPersistencePath : $defaultTokenPath;

        $this->store = new CustomFileStore($this->tokenPresistencePath);
    }

    public function getTokenStore(): string
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

    public function setTokenId(int $tokenId): void
    {
        $this->tokenId = $tokenId;
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
    public function initialize(
        ?string $clientId = null,
        ?string $clientSecret = null,
        ?string $redirectUrl = null,
        ?string $grantToken = null
    ) {
        if ($clientId && $clientSecret && $redirectUrl && $grantToken) {
            $this->clientId = $clientId;
            $this->clientSecret = $clientSecret;
            $this->redirectUrl = $redirectUrl;
            $this->grantToken = $grantToken;
        } else {
            // tokenIdが既にセットされている場合はそれを使用、なければBIDから取得
            $tokenId = $this->tokenId ?? $this->getTokenIdByBid(BID);
            if (!$tokenId) {
                Logger::error('【Zoho plugin】認証されていません。');
                return null;
            }
            $this->tokenId = $tokenId;
            if (!$this->store) {
                Logger::error('【Zoho plugin】トークンストアが初期化されていません。環境変数 ZOHO_TOKEN_PERSISTENCE_PATH を確認してください。');
                return null;
            }
            $token = $this->store->findTokenById($tokenId);
            if (!$token) {
                Logger::error('【Zoho plugin】トークンがストアから削除された可能性があります。再認証してください。');
                return null;
            }

            $this->clientId = $token->getClientId();
            $this->clientSecret = $token->getClientSecret();
            $this->redirectUrl = $token->getRedirectUrl();
            $this->refreshToken = $token->getRefreshToken();
        }

        try {
            // 接続先の Zoho 環境（データセンター × 本番/サンドボックス/開発者）は env で切り替える。
            // 既定は US / production（従来動作）。詳細は resolveEnvironment() を参照。
            $environment = $this->resolveEnvironment();

            $logger = (new LogBuilder())
                ->level(Levels::INFO)
                ->filePath($this->loggerFilePath)
                ->build();

            $token = $this->buildToken(!!$this->grantToken);

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
            if (!!$grantToken && $authorizedToken = $this->store->findTokenByGrantToken($this->grantToken)) {
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
        }
    }

    /**
     * トークンのユーザー名を更新する
     *
     * @param string $tokenId
     * @param string $userName
     * @return void
     */
    public function updateTokenUserName(string $tokenId, string $userName): void
    {
        $this->store->updateUserName($tokenId, $userName);
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
            $fileStore = new CustomFileStore($this->tokenPresistencePath);
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
        } elseif ($this->refreshToken) {
            $token = $builder->refreshToken($this->refreshToken)->build();
        } else {
            throw new \InvalidArgumentException('grantTokenまたはrefreshTokenが必要です。認証情報を確認してください。');
        }

        return $token;
    }

    /**
     * データセンター文字列 → SDK の DataCenter クラス。未知の値は US にフォールバック。
     *
     * @param string $dataCenter us / eu / in / cn / au / jp / ca / sa
     * @return class-string<USDataCenter>|class-string<EUDataCenter>|class-string<INDataCenter>|class-string<CNDataCenter>|class-string<AUDataCenter>|class-string<JPDataCenter>|class-string<CADataCenter>|class-string<SADataCenter>
     */
    private static function dataCenterClass(string $dataCenter): string
    {
        return match (strtolower(trim($dataCenter))) {
            'eu' => EUDataCenter::class,
            'in' => INDataCenter::class,
            'cn' => CNDataCenter::class,
            'au' => AUDataCenter::class,
            'jp' => JPDataCenter::class,
            'ca' => CADataCenter::class,
            'sa' => SADataCenter::class,
            default => USDataCenter::class,
        };
    }

    /**
     * 接続先の Zoho 環境（データセンター × 環境）を解決する。
     *
     * 設定は拡張アプリ管理画面（ブログ設定）から選択され、config テーブルに保存される:
     *   - zoho_environment  … production(既定) / sandbox / developer
     *   - zoho_data_center  … us(既定) / eu / in / cn / au / jp / ca / sa
     *
     * トークンは「環境 × データセンター」固有のため、ここで指定する環境と、ストアに保存された
     * トークンを発行した環境は必ず一致させること（不一致時は SDK が SDKException を投げる）。
     * 未設定時は US / production（従来動作と同一・後方互換）。
     *
     * @return Environment SDK 初期化（InitializeBuilder::environment）に渡す環境インスタンス
     */
    private function resolveEnvironment(): Environment
    {
        $environment = $this->activeEnvironment();
        $dcClass = self::dataCenterClass(self::getDataCenter(BID, $environment));

        // 環境文字列 → 各 DataCenter クラスの静的メソッド
        return match ($environment) {
            'sandbox' => $dcClass::SANDBOX(),
            'developer' => $dcClass::DEVELOPER(),
            default => $dcClass::PRODUCTION(),
        };
    }

    /**
     * 認証/認証解除の対象環境を明示指定する（使用中環境より優先）。
     * Callback / Deauthorize が「操作対象の環境」でトークン交換・解除を行うために使う。
     */
    public function setEnvironment(?string $environment): void
    {
        $this->environmentOverride = $environment !== null && in_array($environment, self::ENVIRONMENTS, true)
            ? $environment
            : null;
    }

    /**
     * 実際に使用する環境。オーバーライド（認証対象）があればそれ、無ければ使用中環境。
     */
    private function activeEnvironment(): string
    {
        return $this->environmentOverride ?? self::getEnvironment(BID);
    }

    /**
     * 選択中の接続環境（production / sandbox / developer）を返す。未設定・不正値は production。
     * 値は管理画面の設定フォーム（ACMS_POST_Config）が保存したブログ設定から読む。
     */
    public static function getEnvironment(int $bid): string
    {
        $value = strtolower(trim((string) Config::loadBlogConfig($bid)->get('zoho_environment', 'production')));

        return in_array($value, self::ENVIRONMENTS, true) ? $value : 'production';
    }

    /**
     * データセンター（us / eu / …）を返す。未設定・不正値は us。
     *
     * 環境ごとに `zoho_data_center_{env}` を持つ。$environment 省略時は使用中環境。
     * 環境別キーが未設定なら、旧単一キー `zoho_data_center`（既存インストール互換）→ us の順で解決。
     */
    public static function getDataCenter(int $bid, ?string $environment = null): string
    {
        $environment ??= self::getEnvironment($bid);
        $config = Config::loadBlogConfig($bid);

        $value = (string) $config->get('zoho_data_center_' . $environment, '');
        if ($value === '') {
            $value = (string) $config->get('zoho_data_center', 'us'); // 旧単一キー（後方互換）
        }
        $value = strtolower(trim($value));

        return in_array($value, self::DATA_CENTERS, true) ? $value : 'us';
    }

    /**
     * OAuth 認可リダイレクトに使う accounts のベース URL（例: https://accounts.zoho.com）を、
     * 指定データセンターに合わせて返す。accounts URL は本番/サンドボックス/開発者で共通
     * （DC のみで決まる）ため、SDK が持つ DC 別の accounts URL から導出する。
     *
     * @param string $dataCenter 認証フォームで選択されたデータセンター
     */
    public static function oauthAccountsBaseUrl(string $dataCenter): string
    {
        $dcClass = self::dataCenterClass($dataCenter);
        // 例: https://accounts.zoho.com/oauth/v2/token → https://accounts.zoho.com
        $tokenUrl = $dcClass::PRODUCTION()->getAccountsUrl();

        return (string) preg_replace('#/oauth/v2/token$#', '', $tokenUrl);
    }

    /**
     * 使用中環境のトークンIDを返す（従来 API 互換）。
     */
    public function getTokenIdByBid(int $bid)
    {
        return $this->getTokenIdForEnvironment($bid, self::getEnvironment($bid));
    }

    /**
     * 指定環境のトークンIDを config テーブルから取得する。
     *
     * 環境別キー `zoho_token_id_{env}` を読み、無ければ（既存インストール互換）本番環境に限り
     * 旧単一キー `zoho_token_id` を参照する。
     * ※ トークンIDは認証コールバックで raw SQL 保存されるため、コンフィグキャッシュの遅延を避けて
     *   ここでも raw SQL で読む（環境/DC は ACMS_POST_Config 保存なので loadBlogConfig 側で読む）。
     *
     * @return string|null
     */
    public function getTokenIdForEnvironment(int $bid, string $environment)
    {
        $value = $this->configValueByBid($bid, 'zoho_token_id_' . $environment);
        if ($value === null && $environment === 'production') {
            $value = $this->configValueByBid($bid, 'zoho_token_id'); // 旧単一キー（後方互換）
        }

        return $value;
    }

    /**
     * config テーブルからブログ単位の設定値を1件取得（raw SQL）。未設定なら null。
     *
     * @return string|null
     */
    private function configValueByBid(int $bid, string $key)
    {
        $sql = SQL::newSelect('config', 'config_value');
        $where = SQL::newWhere();
        $where->addWhereOpr('config_blog_id', $bid);
        $where->addWhereOpr('config_key', $key);
        $sql->addWhere($where);

        $row = Database::query($sql->get(dsn()), 'row');
        if (is_array($row) && isset($row['config_value']) && $row['config_value'] !== '') {
            return (string) $row['config_value'];
        }

        return null;
    }
}
