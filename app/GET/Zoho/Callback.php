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
        $environment = $session->get('zoho_environment');
        $dataCenter = $session->get('zoho_data_center');
        $session->delete('zoho_client_id');
        $session->delete('zoho_client_secret');
        $session->delete('zoho_redirect_url');
        $session->delete('zoho_environment');
        $session->delete('zoho_data_center');
        $session->save();

        // 管理画面で選択された接続環境・データセンター（許可値以外は既定へフォールバック）。
        if (!in_array($environment, ZohoClient::ENVIRONMENTS, true)) {
            $environment = 'production';
        }
        if (!in_array($dataCenter, ZohoClient::DATA_CENTERS, true)) {
            $dataCenter = 'us';
        }

        try {
            // 接続環境を config に保存してから初期化する。initialize() 内の環境解決が
            // この値を参照するため、トークン交換を正しい環境で行うには先に永続化が必要。
            $this->saveBlogConfig('zoho_environment', (string) $environment);
            $this->saveBlogConfig('zoho_data_center', (string) $dataCenter);

            $zohoClient = new ZohoClient();
            $zohoClientExists = $zohoClient->initialize(
                $clientId,
                $clientSecret,
                $redirectUrl,
                $grantToken
            );
            // 初期化
            if (!$zohoClientExists) {
                throw new \RuntimeException('Zohoクライアントの初期化に失敗しました。');
            }

            $DB = Database::singleton(dsn());
            $SQL = SQL::newInsert('config');
            $SQL->addInsert('config_key', 'zoho_token_id');
            $SQL->addInsert('config_value', $zohoClient->getTokenId());
            $SQL->addInsert('config_blog_id', BID);
            $DB->query($SQL->get(dsn()), 'exec');

            $userInfo = (new ZohoApi($zohoClient))->user()->getCurrentUser();
            $userName = $userInfo['email'] ?? null;
            if ($userName) {
                $zohoClient->updateTokenUserName($zohoClient->getTokenId(), $userName);
            }

            Logger::info('【Zoho plugin】OAuth認証が完了しました。');
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
     * config テーブルにブログ単位の設定値を保存する（delete → insert で冪等・重複行を防ぐ）。
     *
     * @param string $key config キー
     * @param string $value 保存する値
     * @return void
     */
    private function saveBlogConfig(string $key, string $value): void
    {
        $db = Database::singleton(dsn());

        $delete = SQL::newDelete('config');
        $where = SQL::newWhere();
        $where->addWhereOpr('config_blog_id', BID);
        $where->addWhereOpr('config_key', $key);
        $delete->addWhere($where);
        $db->query($delete->get(dsn()), 'exec');

        $insert = SQL::newInsert('config');
        $insert->addInsert('config_key', $key);
        $insert->addInsert('config_value', $value);
        $insert->addInsert('config_blog_id', BID);
        $db->query($insert->get(dsn()), 'exec');
    }
}
