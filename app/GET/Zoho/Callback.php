<?php

namespace Acms\Plugins\GoogleCalendar\GET\Zoho;

use ACMS_GET;
use DB;
use SQL;
use AcmsLogger;
use Acms\Services\Facades\Session;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Store\File as ZohoFileStore;

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
                null,
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

        } catch (\RuntimeException $e) {
            AcmsLogger::error($e->getMessage());
        } catch (\InvalidArgumentException $e) {
            AcmsLogger::error($e->getMessage());
        }
        $base_uri = acmsLink(array(
            'bid' => BID,
            'admin' => 'app_zoho_index',
        ));
        redirect($base_uri);
    }
}
