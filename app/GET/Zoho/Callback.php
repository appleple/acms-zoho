<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

use SQL;
use Acms\Services\Facades\Database;
use Acms\Services\Facades\Logger;
use Acms\Services\Facades\Common;
use Acms\Services\Facades\Session;
use Acms\Plugins\Zoho\GET\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;

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

        // 接続環境（production/sandbox/developer）とデータセンターは、いずれも認証時に Zoho から
        // 自動判定する（手動設定は不要）。DC は Multi-DC コールバックの location / accounts-server で、
        // 環境は認証応答の api_domain（本番 www / サンドボックス sandbox / 開発者 developer）で確定する。
        $location = $this->Get->get('location', '');
        $accountsServer = $this->Get->get('accounts-server', '');

        try {
            $zohoClient = new ZohoClient();

            // 認可コード交換の accounts サーバーを正しく選ぶため、まず location から DC を判定して反映する。
            $dataCenter = ZohoClient::detectDataCenter($location, $accountsServer);
            if ($dataCenter !== null) {
                $zohoClient->setDataCenter($dataCenter);
            } else {
                $dataCenter = 'us';
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

            // 認証応答の api_domain から接続環境を確定する（org 選択の結果が api_domain に表れる）。
            $environment = ZohoClient::detectEnvironment($zohoClient->getApiDomain());

            // 確定した接続環境・DC・トークンIDを config へ保存（表示・次回認証・以降の API 呼び出しで参照）。
            $this->upsertBlogConfig(BID, 'zoho_data_center', $dataCenter);
            $this->upsertBlogConfig(BID, 'zoho_environment', $environment);
            $this->upsertBlogConfig(BID, 'zoho_token_id', (string) $zohoClient->getTokenId());

            // ユーザー名取得は、確定した環境で SDK を初期化し直してから行う。
            // グラント交換直後は SDK 内部の環境が交換前の値のままで、選んだ org のドメインと不一致に
            // なり得るため（例: 既定 production のままサンドボックス org を選ぶと sandbox ドメインに繋がらない）。
            $zohoClient->setEnvironment($environment);
            $zohoClient->setDataCenter($dataCenter);
            $zohoClient->initialize();

            $userInfo = (new ZohoApi($zohoClient))->user()->getCurrentUser();
            $userName = $userInfo['email'] ?? null;
            if ($userName !== null) {
                $zohoClient->updateTokenUserName($zohoClient->getTokenId(), $userName);
            }

            Logger::info('【Zoho plugin】OAuth認証が完了しました。', [
                'environment' => $environment,
                'data_center' => $dataCenter,
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
