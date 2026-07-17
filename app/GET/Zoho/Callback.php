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

        try {
            // 接続環境・データセンターは管理画面の設定フォーム（ACMS_POST_Config）で
            // 事前に config へ保存済み。initialize() 内の環境解決がそれを参照する。
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
}
