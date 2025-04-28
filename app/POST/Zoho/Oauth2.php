<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use AcmsLogger;
use Acms\Services\Facades\Session;

class OAuth2 extends ACMS_POST
{
    public function post()
    {
        $clientId = $this->Post->get('zoho_client_id', '');
        $clientSecret = $this->Post->get('zoho_client_secret', '');
        $redirectUrl = $this->Post->get('zoho_redirect_url', '');
        $scope = 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL'; // 必要なスコープに調整

        if (
            !empty($clientId) &&
            is_string($clientId) &&
            !empty($redirectUrl) &&
            is_string($redirectUrl)
        ) {
            $session = Session::handle();
            $session->set('zoho_client_id', $clientId);
            $session->set('zoho_client_secret', $clientSecret);
            $session->set('zoho_redirect_url', $redirectUrl);
            $session->save();

            $url = 'https://accounts.zoho.com/oauth/v2/auth?' . http_build_query([
                'scope' => $scope,
                'client_id' => $clientId,
                'response_type' => 'code',
                'access_type' => 'offline', // refreshToken をもらうために必須
                'redirect_uri' => $redirectUrl,
                'prompt' => 'consent' // ユーザーに毎回同意画面を出す（オプション）
            ]);

            header('Location: ' . $url);
            exit;
        }

        $this->Post;
    }
}
