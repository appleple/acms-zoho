<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use AcmsLogger;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;

class OAuth2 extends ACMS_POST
{
    public function post()
    {
        // $userEmail = $this->Post->get('zoho_user_email', '');
        $clientId = $this->Post->get('zoho_client_id', '');
        $clientSecret = $this->Post->get('zoho_client_secret', '');
        $grantToken = $this->Post->get('zoho_grant_token', '');
        $redirectUrl = $this->Post->get('zoho_redirect_Url', '');

        $zohoClient = new ZohoClient();

        try {
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

            // 認証処理を実行
            $token = $zohoClient->authorize();
        } catch (\RuntimeException $e) {
            AcmsLogger::error($e->getMessage());
        } catch (\InvalidArgumentException $e) {
            AcmsLogger::error($e->getMessage());
        }


        return $this->Post;
    }
}
