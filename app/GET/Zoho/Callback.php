<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

use ACMS_GET;
use DB;
use SQL;
use AcmsLogger;
use Acms\Services\Facades\Session;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;

class Callback extends ACMS_GET
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

            $DB = DB::singleton(dsn());
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

            AcmsLogger::info('【Zoho plugin】OAuth認証が完了しました。');

        } catch (\RuntimeException $e) {
            AcmsLogger::error('【Zoho plugin】OAuth認証処理でエラーが発生しました。', [
                'message' => $e->getMessage(),
            ]);
        } catch (\InvalidArgumentException $e) {
            AcmsLogger::error('【Zoho plugin】OAuth認証処理でエラーが発生しました。', [
                'message' => $e->getMessage(),
            ]);
        }
        $base_uri = acmsLink(array(
            'bid' => BID,
            'admin' => 'app_zoho_index',
        ));

        redirect($base_uri);
    }
}
