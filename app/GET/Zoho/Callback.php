<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

use SQL;
use Acms\Services\Facades\Database;
use Acms\Services\Facades\Logger;
use Acms\Services\Facades\Common;
use Acms\Services\Facades\Session;
use Acms\Services\Facades\Config;
use Acms\Plugins\Zoho\GET\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Enums\ZohoDataCenter;
use Acms\Plugins\Zoho\Services\Zoho\Enums\ZohoEnvironment;

class Callback extends Zoho
{
    public function get()
    {
        $grantToken = $this->Get->get('code');
        $session = Session::handle();
        $clientId = $session->get('zoho_client_id');
        $clientSecret = $session->get('zoho_client_secret');
        $redirectUrl = $session->get('zoho_redirect_url');
        $session->delete('zoho_client_id');
        $session->delete('zoho_client_secret');
        $session->delete('zoho_redirect_url');
        $session->save();

        // データセンターは Multi-DC コールバックの location / accounts-server から自動判定する
        // （Zoho公式のMulti-DC対応で、判定の正確性が確認済み）。
        // 接続環境（production/sandbox/developer）は Organizations API（GET /crm/v8/org）の
        // type フィールドで確定する。Zoho公式仕様上、この API はアクセストークンの実際の環境に
        // 関わらず常に本番ドメイン（www.zohoapis.{domain}）に対して呼び出す必要があるため、
        // 判定用に一度 SDK を明示的に production 環境で初期化し直してから呼び出す
        // （config 由来の値のまま呼ぶと、前回の認証結果次第でドメインがぶれるため）。
        $location = $this->Get->get('location', '');
        $accountsServer = $this->Get->get('accounts-server', '');

        try {
            $zohoClient = new ZohoClient();

            // 認可コード交換の accounts サーバーを正しく選ぶため、まず location から DC を判定して反映する。
            $dataCenter = ZohoClient::detectDataCenter($location, $accountsServer);
            if ($dataCenter !== null) {
                $zohoClient->setDataCenter($dataCenter);
            } else {
                $dataCenter = ZohoDataCenter::US;
                Logger::warning('【Zoho plugin】データセンターを自動判定できませんでした。既定(us)で続行します。', [
                    'location' => (string) $location,
                    'accounts_server' => (string) $accountsServer,
                ]);
            }

            $zohoClientExists = $zohoClient->initialize(
                $clientId,
                $clientSecret,
                $redirectUrl,
                $grantToken
            );
            // 初期化
            if ($zohoClientExists === null) {
                throw new \RuntimeException('Zohoクライアントの初期化に失敗しました。');
            }

            // Organizations API は環境に関わらず必ず production ドメインに対して呼ぶ（Zoho公式仕様）。
            $zohoClient->setEnvironment(ZohoEnvironment::Production);
            $zohoClient->initialize();
            $orgType = (new ZohoApi($zohoClient))->org()->getEnvironmentType();
            $environment = ZohoClient::sanitizeEnvironment($orgType);

            // 確定した接続環境・DC・トークンIDを config へ保存（表示・次回認証・以降の API 呼び出しで参照）。
            // upsertBlogConfig は config テーブルを直接書き換えるだけで、a-blog cms コアの
            // 永続コンフィグキャッシュ（Cache::config()、config-bid-{BID} タグ）は更新されない。
            // forgetCache を呼ばないと、このリクエスト以降に発行される別プロセスのリクエスト
            // （管理画面のモジュール一覧取得など）が古いキャッシュを読み続けてしまう。
            $this->upsertBlogConfig(BID, 'zoho_data_center', $dataCenter->value);
            $this->upsertBlogConfig(BID, 'zoho_environment', $environment->value);
            $this->upsertBlogConfig(BID, 'zoho_token_id', (string) $zohoClient->getTokenId());
            Config::forgetCache(BID);

            // ユーザー名取得は、確定した環境で SDK を明示的に初期化し直してから行う。
            $zohoClient->setEnvironment($environment);
            $zohoClient->setDataCenter($dataCenter);
            $zohoClient->initialize();

            $userInfo = (new ZohoApi($zohoClient))->user()->getCurrentUser();
            $userName = $userInfo['email'] ?? null;
            if ($userName !== null) {
                $zohoClient->updateTokenUserName($zohoClient->getTokenId(), $userName);
            }

            Logger::info('【Zoho plugin】OAuth認証が完了しました。', [
                'environment' => $environment->value,
                'data_center' => $dataCenter->value,
            ]);
        } catch (\RuntimeException $e) {
            Logger::error('【Zoho plugin】OAuth認証処理でエラーが発生しました。', Common::exceptionArray($e));
            $this->addError($e->getMessage());
        } catch (\InvalidArgumentException $e) {
            Logger::error('【Zoho plugin】OAuth認証処理でエラーが発生しました。', Common::exceptionArray($e));
            $this->addError($e->getMessage());
        }
        $base_uri = acmsLink(array(
            'bid' => BID,
            'admin' => 'app_zoho_index',
        ));

        redirect($base_uri);
    }

    /**
     * ブログ基底 config（config_set_id=null）へ 1 キーを upsert する。
     *
     * loadBlogConfig が読むスコープ（config_blog_id=bid, config_set_id=null）へ、既存行を
     * 削除してから挿入する。再認証で同一キーが重複しないようにするため delete→insert とする。
     */
    private function upsertBlogConfig(int $bid, string $key, string $value): void
    {
        $DB = Database::singleton(dsn());

        $delete = SQL::newDelete('config');
        $where = SQL::newWhere();
        $where->addWhereOpr('config_blog_id', $bid);
        $where->addWhereOpr('config_key', $key);
        $delete->addWhere($where);
        $DB->query($delete->get(dsn()), 'exec');

        $insert = SQL::newInsert('config');
        $insert->addInsert('config_key', $key);
        $insert->addInsert('config_value', $value);
        $insert->addInsert('config_blog_id', $bid);
        $DB->query($insert->get(dsn()), 'exec');
    }
}
