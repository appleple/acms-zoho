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
        $environment = $session->get('zoho_auth_env');
        $session->delete('zoho_client_id');
        $session->delete('zoho_client_secret');
        $session->delete('zoho_redirect_url');
        $session->delete('zoho_auth_env');
        $session->save();

        if (!in_array($environment, ZohoClient::ENVIRONMENTS, true)) {
            $environment = 'production';
        }

        try {
            // 認証対象の環境をクライアントに指定してトークン交換する。DC・API ドメインは環境ごとに
            // 異なるため、使用中環境ではなく「認証対象の環境」で解決する必要がある。
            $zohoClient = new ZohoClient();
            $zohoClient->setEnvironment((string) $environment);
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

            // 認証対象環境のトークンIDを保存（環境ごとに別キー）。再認証で重複しないよう delete → insert。
            $DB = Database::singleton(dsn());
            $configKey = 'zoho_token_id_' . $environment;

            $delete = SQL::newDelete('config');
            $deleteWhere = SQL::newWhere();
            $deleteWhere->addWhereOpr('config_blog_id', BID);
            $deleteWhere->addWhereOpr('config_key', $configKey);
            $delete->addWhere($deleteWhere);
            $DB->query($delete->get(dsn()), 'exec');

            $SQL = SQL::newInsert('config');
            $SQL->addInsert('config_key', $configKey);
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
