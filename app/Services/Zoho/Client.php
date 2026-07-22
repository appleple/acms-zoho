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
use Acms\Plugins\Zoho\Services\Zoho\Enums\ZohoEnvironment;
use Acms\Plugins\Zoho\Services\Zoho\Enums\ZohoDataCenter;

class Client
{
    /** @var string $tokenStore ストアの種類 */
    private $tokenStore = 'file';

    private $tokenPresistencePath = '';

    /** @var Store $store ストア情報 */
    private $store;

    /**
     * @var ZohoDataCenter|null 認証コールバックで判定した DC を、当該リクエスト内の環境解決で優先させる上書き値。
     * config への保存は同一リクエストの loadBlogConfig キャッシュに反映されないため、この上書きで確実に効かせる。
     */
    private ?ZohoDataCenter $dataCenterOverride = null;

    /**
     * @var ZohoEnvironment|null Organizations API の type から確定した接続環境を、当該リクエスト内の
     * 環境解決で優先させる上書き値。DC 同様、config 保存値のキャッシュに依らず確実に効かせるために使う。
     */
    private ?ZohoEnvironment $environmentOverride = null;

    private $loggerFilePath = 'php_zoho_sdk.log';

    private $tokenId;

    private $clientId;

    private $clientSecret;

    private $refreshToken = null;

    private $accessToken = null;

    private $grantToken = null;

    private $redirectUrl;

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
        if ((bool) $clientId && (bool) $clientSecret && (bool) $redirectUrl && (bool) $grantToken) {
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
            if ($token === null) {
                Logger::error('【Zoho plugin】トークンがストアから削除された可能性があります。再認証してください。');
                return null;
            }

            $this->clientId = $token->getClientId();
            $this->clientSecret = $token->getClientSecret();
            $this->redirectUrl = $token->getRedirectURL();
            $this->refreshToken = $token->getRefreshToken();
            // grant token は一度しか使用できない。直前に grant token 経由で初期化していても、
            // 保存済みトークンでの再初期化（この分岐）では必ず refreshToken を使わせるため破棄する。
            $this->grantToken = null;
        }

        try {
            // 接続先の Zoho 環境（データセンター × 本番/サンドボックス/開発者）は env で切り替える。
            // 既定は US / production（従来動作）。詳細は resolveEnvironment() を参照。
            $environment = $this->resolveEnvironment();

            $logger = (new LogBuilder())
                ->level(Levels::INFO)
                ->filePath($this->loggerFilePath)
                ->build();

            $token = $this->buildToken((bool) $this->grantToken);

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
            if ((bool) $grantToken && ($authorizedToken = $this->store->findTokenByGrantToken($this->grantToken)) !== null) {
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
     * データセンター enum → SDK の DataCenter クラス。
     *
     * match は enum の全ケースを網羅する必要があり、default 節を持たない。これにより
     * ZohoDataCenter に新しいケースが追加された際、対応漏れがあれば実行時に
     * UnhandledMatchError で即座に検知できる。
     *
     * @return class-string<USDataCenter>|class-string<EUDataCenter>|class-string<INDataCenter>|class-string<CNDataCenter>|class-string<AUDataCenter>|class-string<JPDataCenter>|class-string<CADataCenter>|class-string<SADataCenter>
     */
    private static function dataCenterClass(ZohoDataCenter $dataCenter): string
    {
        return match ($dataCenter) {
            ZohoDataCenter::US => USDataCenter::class,
            ZohoDataCenter::EU => EUDataCenter::class,
            ZohoDataCenter::IN => INDataCenter::class,
            ZohoDataCenter::CN => CNDataCenter::class,
            ZohoDataCenter::AU => AUDataCenter::class,
            ZohoDataCenter::JP => JPDataCenter::class,
            ZohoDataCenter::CA => CADataCenter::class,
            ZohoDataCenter::SA => SADataCenter::class,
        };
    }

    /**
     * 接続先の Zoho 環境（データセンター × 環境）を解決する。
     *
     * 設定は認証時に自動判定され、config テーブルに保存される:
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
        // 接続環境・データセンターはいずれも認証時に Zoho から自動判定する。当該リクエスト内では
        // override を優先し、未設定時は config 保存値（前回認証で保存）→ 既定（us / production）にフォールバックする。
        $dcClass = self::dataCenterClass($this->dataCenterOverride ?? self::getDataCenter(BID));

        return match ($this->environmentOverride ?? self::getEnvironment(BID)) {
            ZohoEnvironment::Sandbox => $dcClass::SANDBOX(),
            ZohoEnvironment::Developer => $dcClass::DEVELOPER(),
            ZohoEnvironment::Production => $dcClass::PRODUCTION(),
        };
    }

    /**
     * 現在の接続環境を返す。未設定・不正値は Production。
     * 値は Organizations API の type から判定して保存したブログ設定（zoho_environment）から読む。
     */
    public static function getEnvironment(int $bid): ZohoEnvironment
    {
        $value = strtolower(trim((string) Config::loadBlogConfig($bid)->get('zoho_environment', ZohoEnvironment::Production->value)));

        return ZohoEnvironment::tryFrom($value) ?? ZohoEnvironment::Production;
    }

    /**
     * 選択中のデータセンターを返す。未設定・不正値は US。
     */
    public static function getDataCenter(int $bid): ZohoDataCenter
    {
        $value = strtolower(trim((string) Config::loadBlogConfig($bid)->get('zoho_data_center', ZohoDataCenter::US->value)));

        return ZohoDataCenter::tryFrom($value) ?? ZohoDataCenter::US;
    }

    /**
     * 当該リクエスト内の環境解決で優先させる DC を設定する（認証コールバックの自動判定結果を渡す）。
     * null を渡すと override を解除し、config 保存値／既定にフォールバックする。
     */
    public function setDataCenter(?ZohoDataCenter $dataCenter): void
    {
        $this->dataCenterOverride = $dataCenter;
    }

    /**
     * 当該リクエスト内の環境解決で優先させる接続環境を設定する
     * （Organizations API の type から判定した値、または一時的に Production へ固定する用途で使う）。
     * null を渡すと override を解除し、config 保存値／既定にフォールバックする。
     */
    public function setEnvironment(?ZohoEnvironment $environment): void
    {
        $this->environmentOverride = $environment;
    }

    /**
     * Organizations API（GET /crm/v8/org）が返す type フィールドの値を検証・正規化する。
     *
     * Zoho 公式仕様上、この API はアクセストークンの実際の環境に関わらず常に本番ドメイン
     * （www.zohoapis.{domain}）に対して呼び出す必要がある（呼び出し側で SDK を production
     * に固定してから呼ぶ）。レスポンスの type フィールドが、そのアクセストークンに紐づく
     * 実際の環境を示す。bigin や未知の値・取得失敗（null）時は Production にフォールバックする。
     *
     * @param string|null $type Organizations API レスポンスの type（Choice::getValue()）
     */
    public static function sanitizeEnvironment(?string $type): ZohoEnvironment
    {
        $value = strtolower(trim((string) $type));
        return ZohoEnvironment::tryFrom($value) ?? ZohoEnvironment::Production;
    }

    /**
     * Zoho OAuth コールバックの location / accounts-server から、対応する DC を判定する。
     *
     * Zoho は Multi-DC 対応として、認可を共通ドメイン（accounts.zoho.com）から開始しても
     * ユーザーの地域へリダイレクトし、コールバックに location（DC コード）と accounts-server
     * （地域別 accounts URL）を返す。これにより DC を手動設定せずに特定できる。
     * location は ZohoDataCenter の値と一致（us/eu/in/cn/au/jp/ca/sa）。未知（uk 等）や
     * 欠落時は accounts-server のホストから逆引きし、それでも不明なら null（呼び出し側で既定にフォールバック）。
     *
     * @param string|null $location       コールバックの location パラメータ
     * @param string|null $accountsServer  コールバックの accounts-server パラメータ
     * @return ZohoDataCenter|null 判定した DC。判定不能時は null
     */
    public static function detectDataCenter(?string $location, ?string $accountsServer): ?ZohoDataCenter
    {
        $loc = strtolower(trim((string) $location));
        $dataCenter = ZohoDataCenter::tryFrom($loc);
        if ($dataCenter !== null) {
            return $dataCenter;
        }

        // location が未知でも、accounts-server のホストが SDK の DC 別 accounts URL と一致すれば救済する。
        $host = strtolower((string) parse_url((string) $accountsServer, PHP_URL_HOST));
        if ($host !== '') {
            foreach (ZohoDataCenter::cases() as $candidate) {
                $knownHost = strtolower((string) parse_url(self::oauthAccountsBaseUrl($candidate), PHP_URL_HOST));
                if ($knownHost !== '' && $knownHost === $host) {
                    return $candidate;
                }
            }
        }

        return null;
    }

    /**
     * OAuth 認可リダイレクトに使う accounts のベース URL（例: https://accounts.zoho.com）を、
     * 指定データセンターに合わせて返す。accounts URL は本番/サンドボックス/開発者で共通
     * （DC のみで決まる）ため、SDK が持つ DC 別の accounts URL から導出する。
     */
    public static function oauthAccountsBaseUrl(ZohoDataCenter $dataCenter): string
    {
        $dcClass = self::dataCenterClass($dataCenter);
        // 例: https://accounts.zoho.com/oauth/v2/token → https://accounts.zoho.com
        $tokenUrl = $dcClass::PRODUCTION()->getAccountsUrl();

        return (string) preg_replace('#/oauth/v2/token$#', '', $tokenUrl);
    }

    public function getTokenIdByBid(int $bid)
    {
        $sql = SQL::newSelect('config', 'config_value');
        $where = SQL::newWhere();
        $where->addWhereOpr('config_blog_id', $bid);
        $where->addWhereOpr('config_key', 'zoho_token_id');
        $sql->addWhere($where);

        $tokenId = Database::query($sql->get(dsn()), 'row');

        if ((bool) $tokenId && (bool) $tokenId['config_value']) {
            return $tokenId['config_value'];
        }
        return null;
    }
}
